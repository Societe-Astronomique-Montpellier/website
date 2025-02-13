import { createClient, asText } from "@prismicio/client";
import type { AllDocumentTypes, EventDocument } from "~/prismicio-types";
import { formatDate } from "~/utils/dateFormatter";

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

      /**
       * Build ical event raw string
       */
      const createdDate = new Date()
        .toISOString()
        .replace(/-/g, "")
        .replace(/:/g, "")
        .replace(/\.\d{3}/, "");

      const title = document.data.title;
      const description = asText(document.data?.resume);
      const location = document.data.place_event_txt;
      const dateStart = formatDate(document.data?.time_start);
      const dateEnd = formatDate(document.data?.time_end);
      const icalData: string = `BEGIN:VCALENDAR\nPRODID:-//My own caldav script\nVERSION:2.0\nBEGIN:VEVENT\nCREATED:${createdDate}\nUID:${document.id}\nSUMMARY:${title}\nLOCATION:${location}\nDTSTART;TZID=Europe/Paris:${dateStart}\nDTSTAMP;TZID=Europe/Paris:${dateStart}\nDTEND;TZID=Europe/Paris:${dateEnd}\nDESCRIPTION:${description}\nEND:VEVENT\nEND:VCALENDAR`;

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

      const ncResponse: Response = await fetch(
        `${nextcloudUrl}/remote.php/dav/calendars/${nextcloudLogin}/${nextcloudAgenda}/${document.id}.ics`,
        requestOptions,
      );

      if (!ncResponse.ok) {
        event.node.res.statusCode = 400;
        return {
          status: 400,
          message: `Error from nextcloud: ${ncResponse.statusText}`,
        };
      }

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
