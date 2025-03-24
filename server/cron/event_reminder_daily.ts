import { defineCronHandler } from "#nuxt/cron";
import { createClient, filter, asDate } from "@prismicio/client";
import type { AllDocumentTypes, EventDocument } from "~/prismicio-types";
import nodemailer from "nodemailer";

export default defineCronHandler("daily", async () => {
  const config = useRuntimeConfig();
  const today = new Date().toISOString().split('T')[0];
  /**
   * Prismic events
   */
  const client = createClient(config.apiPrismicRepository);
  const listEvents: EventDocument[] =
    (await client.getAllByType<AllDocumentTypes>("event", {
      lang: "fr-FR",
      filters: [filter.date("my.event.time_start", today)],
      orderings: {
        field: "my.event.time_start",
        direction: "asc",
      },
    })) as EventDocument[];

  /**
   * HTML Message
   */
  let messageHtml: string = `<p>Les événements de la semaine: </p><ul>`;
  listEvents.forEach((event: EventDocument) => {
    const location = event.data.place_event_txt;
    messageHtml += `<li>- ${event?.data?.title} le ${asDate(event.data?.time_start)?.toLocaleDateString()} à à ${asDate(event.data?.time_start)?.toLocaleTimeString()}, ${location}</li>`;
  });
  messageHtml += `</ul>`;

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
    to: "stephane.meaudre@gmail.com", //config.smtpMailingList,
    replyTo: config.smtpMailingList,
    subject: `[SAM] Rappel évenements aujourd'hui`,
    html: messageHtml,
    headers: {
      "List-ID": `"sam-liste" <${config.smtpMailingList}>`,
      // "List-Unsubscribe": `<mailto:${config.smtpMailingList}?subject=unsubscribe>`,
    },
  };
  transporter.sendMail(mail, (err, info) => console.log(err || info));
});
