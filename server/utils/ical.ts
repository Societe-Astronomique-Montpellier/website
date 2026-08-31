import { asText } from "@prismicio/client";
import type { RichTextField } from "@prismicio/client";
import type { EventDocument } from "~~/prismicio-types";
import {formatDate} from "#server/utils/dateFormatter.ts";

/**
 * Truncate a string at the last whitespace before maxLength
 * @param str
 * @param maxLength
 */
const truncateAtWhitespace = (str: string, maxLength: number = 75): string => {
    if (str.length <= maxLength) return str;

    // Find the last whitespace character within the maxLength
    const lastWhitespaceIndex = str.lastIndexOf(" ", maxLength);

    // If there is no whitespace within the maxLength, return the whole string
    return lastWhitespaceIndex === -1
        ? str
        : str.substring(0, lastWhitespaceIndex);
};

/**
 * Build iCal document
 * @param document
 */
export const buildIcalEvent = (document: EventDocument): string => {
    const createdDate = new Date()
        .toISOString()
        .replace(/-/g, "")
        .replace(/:/g, "")
        .replace(/\.\d{3}/, "");

    const title = document.data.title;
    const description = truncateAtWhitespace(asText(document.data?.resume as RichTextField), 70);
    const location = document.data.place_event_txt;
    const dateStart = formatDate(document.data?.time_start);
    const dateEnd = formatDate(document.data?.time_end) ?? dateStart;
    return `BEGIN:VCALENDAR\nCALSCALE:GREGORIAN\nVERSION:2.0\nPRODID:-//SAM Agenda script//FR\nBEGIN:VEVENT\nCREATED:${createdDate}\nDTSTAMP:${dateStart}\nUID:${document.id}\nDTSTART;TZID=Europe/Paris:${dateStart}\nDTEND;TZID=Europe/Paris:${dateEnd}\nSTATUS:CONFIRMED\nSUMMARY:${title}\nLOCATION:${location}\nDESCRIPTION:${description}\nEND:VEVENT\nBEGIN:VTIMEZONE\nTZID:Europe/Paris\nBEGIN:DAYLIGHT\nTZOFFSETFROM:+0100\nTZOFFSETTO:+0200\nTZNAME:CEST\nDTSTART:19700329T020000\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\nEND:DAYLIGHT\nBEGIN:STANDARD\nTZOFFSETFROM:+0200\nTZOFFSETTO:+0100\nTZNAME:CET\nDTSTART:19701025T030000\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\nEND:STANDARD\nEND:VTIMEZONE\nEND:VCALENDAR`;
};