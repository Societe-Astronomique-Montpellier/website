import { defineCronHandler } from "#nuxt/cron";
import { createClient, filter, asDate } from "@prismicio/client";
import type { AllDocumentTypes, EventDocument } from "~/prismicio-types";
import { createTransport } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

export default defineCronHandler(
  () => "0 7 * * 1",
  async () => {
    const config = useRuntimeConfig();

    const today = new Date().toISOString().split("T")[0];

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekStr = nextWeek.toISOString().split("T")[0];

    /**
     * Prismic events
     */
    const client = createClient(config.apiPrismicRepository);
    const listEvents: EventDocument[] =
      (await client.getAllByType<AllDocumentTypes>("event", {
        lang: "fr-FR",
        filters: [
          filter.dateBetween("my.event.time_start", today, nextWeekStr),
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
    // let messageHtml: string = `<p>Les événements de la semaine: </p><ul>`;
    // listEvents.forEach((event: EventDocument) => {
    //   const location = event.data.place_event_txt;
    //   messageHtml += `<li>${event?.data?.title} le ${asDate(event.data?.time_start)?.toLocaleDateString()} à ${asDate(event.data?.time_start)?.toLocaleTimeString()}, ${location}</li>`;
    // });
    // messageHtml += `</ul>`;
    // messageHtml += `<p>Ceci est un mail automatique, vous pouvez y répondre directement, le message sera transmis sur la sam-liste.</p>`;

    /**
     * Send email
     */
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
    };
    transporter.use("compile", hbs(handlebarOptions));
    const mail = {
      from: `"Societe-Astronomique-Montpellier" <${config.smtpUser}>`,
      to: config.smtpMailingList,
      replyTo: config.smtpMailingList,
      subject: `[SAM] Au programme cette semaine`,
      template: "weekly",
      context: {
        events: listEvents.map((event: EventDocument) => {
          return {
            title: event?.data?.title,
            dateStart: asDate(event.data?.time_start)?.toLocaleDateString(),
            timeStart: asDate(event.data?.time_start)?.toLocaleTimeString(),
            location: event.data.place_event_txt,
          };
        }),
      },
      headers: {
        "List-ID": `"sam-liste" <${config.smtpMailingList}>`,
        // "List-Unsubscribe": `<mailto:${config.smtpMailingList}?subject=unsubscribe>`,
      },
    };
    transporter.sendMail(mail, (err, info) => console.log(err || info));
  },
);
