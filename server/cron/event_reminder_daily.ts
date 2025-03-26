import { defineCronHandler } from "#nuxt/cron";
import { createClient, filter, asDate } from "@prismicio/client";
import type { AllDocumentTypes, EventDocument } from "~/prismicio-types";
import { createTransport } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import type { NodemailerExpressHandlebarsOptions } from "nodemailer-express-handlebars";
import path from "path";

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
    } as NodemailerExpressHandlebarsOptions;
    transporter.use("compile", hbs(handlebarOptions));

    const mail = {
      from: `"Societe-Astronomique-Montpellier" <${config.smtpUser}>`,
      to: config.smtpMailingList,
      replyTo: config.smtpMailingList,
      subject: `[SAM] Rappel évènement(s) aujourd'hui`,
      template: "daily",
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
