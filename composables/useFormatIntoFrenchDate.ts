import * as prismic from "@prismicio/client";
import type { DateField, TimestampField } from "@prismicio/types";

export const useFormatIntoFrenchDate = (
  date: DateField | TimestampField | undefined,
  format: string | null,
): string => {
  const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat("fr-FR", {
    month: "short",
    day: "numeric",
    year: "numeric",
    // second: '2-digit'
  });

  if ("long" === format) {
    const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
      "fr-FR",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      },
    );
  }

  const prismicDate: Date | null = prismic.asDate(date);
  return dateFormatter.format(prismicDate || undefined);
};
