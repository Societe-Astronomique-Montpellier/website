import * as prismic from "@prismicio/client";
import type { DateField, TimestampField } from "@prismicio/types";

export function formatDate(
  dateString: DateField | TimestampField | undefined,
): string | null {
  const prismicDate: Date | null = prismic.asDate(dateString);
  if (prismicDate === null) {
    return null;
  }

  const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/Paris",
  });
  const formattedDateParts = formatter.formatToParts(prismicDate || new Date());

  let formattedDate = "";
  formattedDateParts.forEach((part) => {
    if (part.type === "literal") {
      return;
    }
    formattedDate += part.value;
  });

  return `${formattedDate.slice(0, 8)}T${formattedDate.slice(8)}`;
}
