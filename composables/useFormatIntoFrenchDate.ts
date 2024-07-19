import * as prismic from "@prismicio/client";
import type {DateField, TimestampField} from "@prismicio/types";

export const useFormatIntoFrenchDate = (date: DateField | TimestampField | undefined): string => {
    // if (typeof date === DateField) {
    //
    // }
    //
    // if (date instanceof TimestampField) {
    //
    // }

    const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('fr-FR', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit'
    })

    const prismicDate: Date | null = prismic.asDate(date);
    return dateFormatter.format(prismicDate || undefined)
}