import { createClient } from "@prismicio/client";
import type { AllDocumentTypes, EventDocument } from "~/prismicio-types";
import { formatDate } from "~/utils/dateFormatter";

export default defineEventHandler(
  async (event): Promise<{ status: number; message: string }> => {
    const config = useRuntimeConfig();
    // Prismic
    const secret = config.prismicEventSecret;

    // Nextcloud
    const nextcloudUrl = config.nextcloudUrl;
    const nextcloudLogin = config.nextcloudLogin;
    const nextcloudPassword = config.nextcloudPassword;

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

      const dateStart = formatDate(document.data?.time_start);
      const dateEnd = formatDate(document.data?.time_end);

      const icalData = `BEGIN:VCALENDAR
        PRODID:-//My own caldav script
        VERSION:2.0
        BEGIN:VEVENT
        CREATED:${new Date().toISOString().replace(/-/g, "").replace(/:/g, "")}
        UID:${document.id}
        SUMMARY:${document.data.title}
        LOCATION:${document.data.place_event_txt}
        DTSTART:${dateStart}
        DTEND:${dateEnd}
        DESCRIPTION:${document.data.resume}
        END:VEVENT
        END:VCALENDAR
      `;

      const ncResponse = await fetch(
        `${nextcloudUrl}/remote.php/dav/calendars/${nextcloudLogin}/sam-agenda/${document.id}.ics`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "text/calendar; charset=utf-8",
            Authorization: `Basic ${Buffer.from(`${nextcloudLogin}:${nextcloudPassword}`).toString("base64")}`,
          },
          body: icalData,
        },
      );

      console.error(ncResponse);

      if (!ncResponse.ok) {
        event.node.res.statusCode = 400;
        return {
          status: 400,
          message: `Error from nextcloud: ${ncResponse.statusText}`,
        };
      }
      const data: string = await ncResponse.text();

      event.node.res.statusCode = 201;
      return { status: 201, message: data };
    } catch (error: any) {
      event.node.res.statusCode = 500;
      return {
        status: 500,
        message: error?.message,
      };
    }
  },
);
