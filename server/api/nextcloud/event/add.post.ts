import { createClient, asText } from "@prismicio/client";
import type { AllDocumentTypes, EventDocument } from "~/prismicio-types";
import { formatDate } from "~/utils/dateFormatter";
import { formatFrenchLongDate } from "~/utils/dateLongFrenchFormatter";
import { createTransport } from "nodemailer";
// tslint:disable-next-line: no-var-requires
import hbs from "nodemailer-express-handlebars";
import type { NodemailerExpressHandlebarsOptions } from "nodemailer-express-handlebars";
import path from "path";

export default defineEventHandler(
  async (event): Promise<{ status: number; message: string }> => {
    const config = useRuntimeConfig();
    // Prismic
    const secret = config.prismicEventSecret;

    // Nextcloud
    const nextcloudUrl: string = config.nextcloudUrl;
    const nextcloudLogin: string = config.nextcloudLogin;
    const nextcloudPassword: string = config.nextcloudPassword;
    const nextcloudAgenda: string = "sam-agenda";

    const body = await readBody(event);
    const requestSecret = body.secret;

    // Check secret
    if (secret !== requestSecret) {
      event.node.res.statusCode = 403;
      return { status: 403, message: "Forbidden: Invalid secret" };
    }

    // Get document data
    const { domain, documents } = body;
    const client = createClient<AllDocumentTypes>(domain);
    try {
      const document: EventDocument = await client.getByID<EventDocument>(
        documents[0],
      );

      if (!document) {
        event.node.res.statusCode = 400;
        return {
          status: 400,
          message: "Bad Request: Missing document ID",
        };
      }

      if ("event" !== document.type) {
        return {
          status: 204,
          message: "",
        };
      }

      const sendNotification = document.data.send_notification;
      if (!sendNotification) {
        return {
          status: 200,
          message: "",
        };
      }

      /**
       * Build ical event raw string
       */
      const createdDate = new Date()
        .toISOString()
        .replace(/-/g, "")
        .replace(/:/g, "")
        .replace(/\.\d{3}/, "");

      const title = document.data.title;
      const description = truncateAtWhitespace(
        asText(document.data?.resume),
        70,
      );
      const location = document.data.place_event_txt;
      const dateStart = formatDate(document.data?.time_start);
      const dateEnd = formatDate(document.data?.time_end) ?? dateStart;
      const icalData: string = `BEGIN:VCALENDAR\nCALSCALE:GREGORIAN\nVERSION:2.0\nPRODID:-//SAM Agenda script//FR\nBEGIN:VEVENT\nCREATED:${createdDate}\nDTSTAMP:${dateStart}\nUID:${document.id}\nDTSTART;TZID=Europe/Paris:${dateStart}\nDTEND;TZID=Europe/Paris:${dateEnd}\nSTATUS:CONFIRMED\nSUMMARY:${title}\nLOCATION:${location}\nDESCRIPTION:${description}\nEND:VEVENT\nBEGIN:VTIMEZONE\nTZID:Europe/Paris\nBEGIN:DAYLIGHT\nTZOFFSETFROM:+0100\nTZOFFSETTO:+0200\nTZNAME:CEST\nDTSTART:19700329T020000\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\nEND:DAYLIGHT\nBEGIN:STANDARD\nTZOFFSETFROM:+0200\nTZOFFSETTO:+0100\nTZNAME:CET\nDTSTART:19701025T030000\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\nEND:STANDARD\nEND:VTIMEZONE\nEND:VCALENDAR`;

      /**
       * HTTP headers
       */
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "text/calendar");
      myHeaders.append(
        "Authorization",
        `Basic ${Buffer.from(`${nextcloudLogin}:${nextcloudPassword}`).toString("base64")}`,
      );

      /**
       * Request to nextcloud
       */
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: icalData,
      };

      const urlIcs: string = `${nextcloudUrl}/remote.php/dav/calendars/${nextcloudLogin}/${nextcloudAgenda}/${document.id}.ics`;
      const ncResponse: Response = await fetch(urlIcs, requestOptions);

      if (!ncResponse.ok) {
        event.node.res.statusCode = 400;
        return {
          status: 400,
          message: `Error from nextcloud: ${ncResponse.statusText}`,
        };
      }

      const transporter = createTransport({
        host: config.smtpHost,
        port: config.smtpPort,
        secure: true,
        auth: {
          user: config.smtpUser,
          pass: config.smtpPwd,
        },
      });

      transporter.verify((err): void => {
        if (err) {
          throw new Error(err.message);
        }
      });

      const handlebarOptions = {
        viewEngine: {
          extname: ".hbs",
          partialsDir: path.resolve("server/templates/emails/"),
          defaultLayout: false,
        },
        viewPath: path.resolve("server/templates/emails/"),
        extName: ".hbs",
      } as NodemailerExpressHandlebarsOptions;
      transporter.use("compile", hbs(handlebarOptions));

      const mail = {
        from: `"Societe-Astronomique-Montpellier" <${config.smtpUser}>`,
        to: config.smtpMailingList,
        subject: `Nouvel évènement: ${title}`,
        template: "new_event",
        context: {
          documentUid: document.uid,
          title: title,
          location: location,
          dateStart: formatFrenchLongDate(document.data?.time_start),
          dateEnd: formatFrenchLongDate(document.data?.time_end),
        },
        headers: {
          "List-ID": `"sam-liste" <${config.smtpMailingList}>`,
          "List-Unsubscribe": `<mailto:${config.smtpMailingList}?subject=unsubscribe>`,
        },
      };
      transporter.sendMail(mail, (err, info) => console.log(err || info));

      event.node.res.statusCode = 201;
      return { status: 201, message: `Event "${title}" added.` };
    } catch (error: any) {
      event.node.res.statusCode = 500;
      return {
        status: 500,
        message: error?.message,
      };
    }
  },
);

const truncateAtWhitespace = (str: string, maxLength: number = 75): string => {
  if (str.length <= maxLength) {
    return str;
  }

  // Find the last whitespace character within the maxLength
  const lastWhitespaceIndex = str.lastIndexOf(" ", maxLength);

  // If there is no whitespace within the maxLength, return the whole string
  if (lastWhitespaceIndex === -1) {
    return str;
  }

  // Cut the string at the last whitespace character
  return str.substring(0, lastWhitespaceIndex);
};
