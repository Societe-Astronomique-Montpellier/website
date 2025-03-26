import * as prismic from "@prismicio/client";
import type { DateField, TimestampField } from "@prismicio/types";

export function formatFrenchLongDate(
  dateString: DateField | TimestampField | undefined,
): string | null {
  const prismicDate: Date | null = prismic.asDate(dateString);
  const lang = "fr-FR";

  const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Paris",
  });
  return dateFormatter.format(prismicDate || undefined);
}
