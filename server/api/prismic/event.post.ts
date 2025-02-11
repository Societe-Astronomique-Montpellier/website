import { createClient } from "@prismicio/client";
import type { AllDocumentTypes, EventDocument } from "~/prismicio-types";

export default defineEventHandler(
  async (event): Promise<{ message: string }> => {
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
      event.res.statusCode = 403;
      return { message: "Forbidden: Invalid secret" };
    }

    // Get document data
    const { domain, documents } = body;
    const client = createClient<AllDocumentTypes>(domain);
    try {
      const document: EventDocument = await client.getByID<EventDocument>(
        documents[0],
      );

      if (!document) {
        event.res.statusCode = 400;
        return { message: "Bad Request: Missing document ID" };
      }

      const randomUid = [...Array(30)]
        .map(() => Math.random().toString(36)[2])
        .join("");

      const calendarEvent = `
        BEGIN:VCALENDAR
        PRODID:-//My own caldav script
        VERSION:2.0
        BEGIN:VEVENT
        CREATED:${new Date().toISOString().replace(/-/g, "").replace(/:/g, "")}
        UID:${randomUid}
        SUMMARY:${document.data.title}
        LOCATION:${document.data.place_event_txt}
        DTSTART:${document.data?.time_start?.toString().replace(" ", "T")}
        DTSTAMP:20250306T204500Z
        DTEND:${document.data?.time_end?.toString().replace(" ", "T")}
        DESCRIPTION:${document.data.resume}
        END:VEVENT
        END:VCALENDAR
      `;

      const ncResponse = await fetch(
        `${nextcloudUrl}/remote.php/dav/calendars/sam-technique/sam-agenda/${randomUid}.ics`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "text/calendar; charset=utf-8",
            Authorization: `Basic ${Buffer.from(`${nextcloudLogin}:${nextcloudPassword}`).toString("base64")}`,
          },
          body: calendarEvent,
        },
      );

      if (!ncResponse.ok) {
        return { message: "Error from nextcloud" };
      }
      const data: string = await ncResponse.text();
      return { message: data };
    } catch (error: any) {
      event.res.statusCode = 500;
      return {
        message: error?.message,
      };
    }
  },
);
