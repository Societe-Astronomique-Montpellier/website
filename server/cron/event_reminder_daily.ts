import { defineCronHandler } from "#nuxt/cron";
import { createClient, filter, asDate } from "@prismicio/client";
import type { AllDocumentTypes, EventDocument } from "~/prismicio-types";
import nodemailer from "nodemailer";

export default defineCronHandler(
  () => "0 7 * * *",
  async () => {
    const config = useRuntimeConfig();
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Start of the day: YYYY-MM-DDT00:00:00Z
    const todayStart = `${today}T00:00:00Z`;

    // End of the day: YYYY-MM-DDT23:59:59Z
    const todayEnd = `${today}T23:59:59Z`;

    /**
     * Prismic events
     */
    const client = createClient(config.apiPrismicRepository);
    const listEvents: EventDocument[] =
      (await client.getAllByType<AllDocumentTypes>("event", {
        lang: "fr-FR",
        filters: [
          filter.dateBetween("my.event.time_start", todayStart, todayEnd),
        ],
        orderings: {
          field: "my.event.time_start",
          direction: "asc",
        },
      })) as EventDocument[];

    if (0 === listEvents.length) {
      return;
    }

    /**
     * HTML Message
     */
    let messageHtml: string = `<p>Les évènements aujourd'hui: </p><ul>`;
    listEvents.forEach((event: EventDocument) => {
      const location = event.data.place_event_txt;
      messageHtml += `<li>${event?.data?.title} le ${asDate(event.data?.time_start)?.toLocaleDateString()} à à ${asDate(event.data?.time_start)?.toLocaleTimeString()}, ${location}</li>`;
    });
    messageHtml += `</ul>`;
    messageHtml += `<p>Ceci est un mail automatique, vous pouvez y répondre directement, le message sera transmis sur la sam-liste.</p>`;

    /**
     * Send email
     */
    const transporter = nodemailer.createTransport({
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

    const mail = {
      from: `"Societe-Astronomique-Montpellier" <${config.smtpUser}>`,
      to: config.smtpMailingList,
      replyTo: config.smtpMailingList,
      subject: `[SAM] Rappel évènement(s) aujourd'hui`,
      html: messageHtml,
      headers: {
        "List-ID": `"sam-liste" <${config.smtpMailingList}>`,
        // "List-Unsubscribe": `<mailto:${config.smtpMailingList}?subject=unsubscribe>`,
      },
    };
    transporter.sendMail(mail, (err, info) => console.log(err || info));
  },
);
