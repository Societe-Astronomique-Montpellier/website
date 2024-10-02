import * as prismic from "@prismicio/client";
import type { DateField, TimestampField } from "@prismicio/types";

export const useFormatIntoFrenchDate = (
  date: DateField | TimestampField | undefined,
  format: string | null,
): string => {
  const prismicDate: Date | null = prismic.asDate(date);
  let paramsDate = {};
  let lang = "fr-FR";
  format = format ?? "short";
  switch (format) {
    case "short": {
      paramsDate = {
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      break;
    }
    case "long":
      paramsDate = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      break;
    case "onlynumeric":
      lang = "en";
      paramsDate = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        hour12: false,
        minute: "2-digit",
      };
      break;
  }

  const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
    lang,
    paramsDate,
  );
  return dateFormatter.format(prismicDate || undefined);
};
