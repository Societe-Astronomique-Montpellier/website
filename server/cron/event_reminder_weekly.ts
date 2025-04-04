import { defineCronHandler } from "#nuxt/cron";
import { createClient, filter } from "@prismicio/client";
import type { AllDocumentTypes, EventDocument } from "~/prismicio-types";
import { createTransport } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import type { NodemailerExpressHandlebarsOptions } from "nodemailer-express-handlebars";
import path from "path";
import { formatFrenchLongDate } from "~/utils/dateLongFrenchFormatter";

export default defineCronHandler(
  () => "0 7 * * 1",
  async (): Promise<void> => {
    const config = useRuntimeConfig();

    const today: string = new Date().toISOString().split("T")[0];

    const nextWeek: Date = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekStr: string = nextWeek.toISOString().split("T")[0];

    /**
     * Prismic events
     */
    const client = createClient<AllDocumentTypes>(config.apiPrismicRepository);
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
      subject: `Au programme cette semaine`,
      template: "weekly",
      context: {
        events: listEvents.map((event: EventDocument) => {
          return {
            title: event?.data?.title,
            dateStart: formatFrenchLongDate(event.data?.time_start),
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
