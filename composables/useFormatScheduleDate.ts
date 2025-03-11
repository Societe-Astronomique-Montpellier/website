import * as prismic from "@prismicio/client";
import type { DateField, TimestampField } from "@prismicio/types";

export const useFormatScheduleDate = (
  dateString: DateField | TimestampField | undefined,
): string | null => {
  const prismicDate: Date | null = prismic.asDate(dateString);
  if (prismicDate === null) {
    return null;
  }

  const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });
  const formattedParts = formatter.formatToParts(prismicDate || new Date());

  const dateParts: { [key: string]: string } = {};
  formattedParts.forEach((part) => {
    dateParts[part.type] = part.value;
  });

  return `${dateParts.year}-${dateParts.month}-${dateParts.day} ${dateParts.hour}:${dateParts.minute}`;
};
