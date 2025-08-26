import path from "path";
import { createClient, asText } from "@prismicio/client";
import { formatDate } from "~/utils/dateFormatter";
import { formatFrenchLongDate } from "~/utils/dateLongFrenchFormatter";
import { createTransport } from "nodemailer";
// tslint:disable-next-line: no-var-requires
import hbs from "nodemailer-express-handlebars";

import type { NodemailerExpressHandlebarsOptions } from "nodemailer-express-handlebars";
import type { H3Event } from "h3";
import type { AllDocumentTypes, EventDocument } from "~/prismicio-types";

/**
 * Build iCal document
 * @param document
 */
const buildIcalEvent = (document: EventDocument): string => {
  const createdDate = new Date()
    .toISOString()
    .replace(/-/g, "")
    .replace(/:/g, "")
    .replace(/\.\d{3}/, "");

  const title = document.data.title;
  const description = truncateAtWhitespace(asText(document.data?.resume), 70);
  const location = document.data.place_event_txt;
  const dateStart = formatDate(document.data?.time_start);
  const dateEnd = formatDate(document.data?.time_end) ?? dateStart;
  return `BEGIN:VCALENDAR\nCALSCALE:GREGORIAN\nVERSION:2.0\nPRODID:-//SAM Agenda script//FR\nBEGIN:VEVENT\nCREATED:${createdDate}\nDTSTAMP:${dateStart}\nUID:${document.id}\nDTSTART;TZID=Europe/Paris:${dateStart}\nDTEND;TZID=Europe/Paris:${dateEnd}\nSTATUS:CONFIRMED\nSUMMARY:${title}\nLOCATION:${location}\nDESCRIPTION:${description}\nEND:VEVENT\nBEGIN:VTIMEZONE\nTZID:Europe/Paris\nBEGIN:DAYLIGHT\nTZOFFSETFROM:+0100\nTZOFFSETTO:+0200\nTZNAME:CEST\nDTSTART:19700329T020000\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\nEND:DAYLIGHT\nBEGIN:STANDARD\nTZOFFSETFROM:+0200\nTZOFFSETTO:+0100\nTZNAME:CET\nDTSTART:19701025T030000\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\nEND:STANDARD\nEND:VTIMEZONE\nEND:VCALENDAR`;
};

/**
 * Send iCalDocument to nextcloud
 *
 * @param url
 * @param login
 * @param password
 * @param agenda
 * @param documentId
 * @param icalData
 */
const sendToNextCloud = async (
  url: string,
  login: string,
  password: string,
  agenda: string,
  documentId: string,
  icalData: string,
): Promise<void> => {
  /**
   * HTTP headers
   */
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/calendar");
  myHeaders.append(
    "Authorization",
    `Basic ${Buffer.from(`${login}:${password}`).toString("base64")}`,
  );

  /**
   * Request to nextcloud
   */
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: icalData,
  };

  const urlIcs: string = `${url}/remote.php/dav/calendars/${login}/${agenda}/${documentId}.ics`;
  // const ncResponse: Response = await fetch(urlIcs, requestOptions);
  //
  // if (!ncResponse.ok) {
  //   throw new Error(
  //     `Nextcloud error: ${ncResponse.status} ${ncResponse.statusText}`,
  //   );
  // }
};

/**
 * Send email Notification
 * @param config
 * @param document
 */
const sendMailNotification = async (
  config: ReturnType<typeof useRuntimeConfig>,
  document: EventDocument,
): Promise<void> => {
  // Transporter
  const transporter = createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: true,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPwd,
    },
  });

  // Verification
  await transporter.verify();

  // Templating
  const handlebarOptions: NodemailerExpressHandlebarsOptions = {
    viewEngine: {
      extname: ".hbs",
      partialsDir: path.resolve("server/templates/emails/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("server/templates/emails/"),
    extName: ".hbs",
  } as NodemailerExpressHandlebarsOptions;
  transporter.use("compile", hbs(handlebarOptions));

  // Options emails
  const mailOptions = {
    from: `"Societe-Astronomique-Montpellier" <${config.smtpUser}>`,
    to: config.smtpMailingList,
    subject: `Nouvel évènement: ${document.data.title}`,
    template: "new_event",
    context: {
      documentUid: document.uid,
      title: document.data.title,
      location: document.data.place_event_txt,
      dateStart: formatFrenchLongDate(document.data?.time_start),
      dateEnd: formatFrenchLongDate(document.data?.time_end),
    },
    headers: {
      "List-ID": `"sam-liste" <${config.smtpMailingList}>`,
      "List-Unsubscribe": `<mailto:${config.smtpMailingList}?subject=unsubscribe>`,
    },
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

/**
 * MAIN
 */
export default defineEventHandler(
  async (event: H3Event): Promise<{ status: number; message: string }> => {
    const config = useRuntimeConfig();

    try {
      const body = await readBody<{
        secret: string;
        domain: string;
        documents: string[];
      }>(event);

      // Check prismic secret
      if (config.prismicEventSecret !== body.secret) {
        throw createError({
          statusCode: 403,
          statusMessage: "Forbidden: Invalid secret",
        });
      }

      const client = createClient<AllDocumentTypes>(body.domain);
      const document: EventDocument = await client.getByID<EventDocument>(
        body.documents[0] ?? "",
      );

      if (!document) {
        throw createError({
          statusCode: 400,
          statusMessage: "Bad Request: Missing document ID",
        });
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
          message: `L'envoie de notification n'a pas été activé pour le document "${document.data.title}".`,
        };
      }

      // Send to nextcloud
      const icalData: string = buildIcalEvent(document);
      await sendToNextCloud(
        config.nextcloudUrl,
        config.nextcloudLogin,
        config.nextcloudPassword,
        "sam-agenda",
        document.id,
        icalData,
      );

      // Send email
      await sendMailNotification(config, document);

      return { status: 201, message: `Event "${document.data.title}" added.` };
    } catch (error: unknown) {
      return {
        status: (error as { statusCode?: number }).statusCode ?? 500,
        message: (error as Error).message ?? "Internal Server Error",
      };
    }
  },
);

const truncateAtWhitespace = (str: string, maxLength: number = 75): string => {
  if (str.length <= maxLength) return str;

  // Find the last whitespace character within the maxLength
  const lastWhitespaceIndex = str.lastIndexOf(" ", maxLength);

  // If there is no whitespace within the maxLength, return the whole string
  return lastWhitespaceIndex === -1
    ? str
    : str.substring(0, lastWhitespaceIndex);
};
