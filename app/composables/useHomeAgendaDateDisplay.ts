import type { DateField, TimestampField } from '@prismicio/client'
import { asDate } from '@prismicio/client'

export interface ParsedDate {
    seconds: string
    minutes: string
    hours: string
    day: string
    month: string
    year: string
}

export function useHomeAgendaDateDisplay(
    field: DateField | TimestampField | null | undefined,
    locale: string = 'fr-FR'
): ComputedRef<ParsedDate | null> {
    return computed(() => {
        // Résolution de la valeur si c'est une ref, un getter ou une valeur directe
        const fieldValue = toValue(field)

        // Utilisation du helper officiel Prismic pour convertir le champ en Date JS
        const date = asDate(fieldValue)

        if (!date || isNaN(date.getTime())) {
            return null
        }

        const rawMonthStr = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date)
        const monthStr = rawMonthStr.replace('.', '').toLowerCase()

        // Helper pour formater les nombres sur 2 chiffres avec zéro initial
        const pad = (num: number): string => String(num).padStart(2, '0')

        return {
            seconds: pad(date.getSeconds()),
            minutes: pad(date.getMinutes()),
            hours: pad(date.getHours()),
            day: pad(date.getDate()),
            month: pad(date.getMonth() + 1),
            month_str: monthStr,
            year: String(date.getFullYear())
        }
    })
}