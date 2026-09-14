// composables/useCalendarTypes.ts
import type { CalendarTypeEventList } from "~~/types/calendarTypeEvent";

export function useCalendarTypes() {
    const { t } = useI18n()

    const listCalendars = computed<CalendarTypeEventList>(() => [
        {
            id: "members",
            title: t("type_events.members.title"),
            description: t("type_events.members.description"),
            colorName: "members",
            lightColors: {
                main: "#f91c45",
                container: "#ffd2dc",
                onContainer: "#59000d",
            },
            darkColors: {
                main: "#ffc0cc",
                onContainer: "#ffdee6",
                container: "#a24258",
            },
            tailwind: "text-[#f91c45]"
        },
        {
            id: "allpublic",
            title: t("type_events.allpublic.title"),
            description: t("type_events.allpublic.description"),
            colorName: "allpublic",
            lightColors: {
                main: "#1cf9b0",
                container: "#dafff0",
                onContainer: "#004d3d",
            },
            darkColors: {
                main: "#c0fff5",
                onContainer: "#e6fff5",
                container: "#42a297",
            },
            tailwind: "text-[#1cf9b0]"
        },
        {
            id: "private",
            title: t("type_events.private.title"),
            description: t("type_events.private.description"),
            colorName: "private",
            lightColors: {
                main: "#f9d71c",
                container: "#fff5aa",
                onContainer: "#594800",
            },
            darkColors: {
                main: "#fff5c0",
                onContainer: "#fff5de",
                container: "#a29742",
            },
            tailwind: "text-[#f9d71c]"
        },
        {
            id: "astronomicals",
            title: t("type_events.astronomicals.title"),
            description: t("type_events.astronomicals.description"),
            colorName: "astronomicals",
            lightColors: {
                main: "#1c7df9",
                container: "#d2e7ff",
                onContainer: "#002859",
            },
            darkColors: {
                main: "#c0dfff",
                onContainer: "#dee6ff",
                container: "#426aa2",
            },
            tailwind: "text-[#1c7df9]"
        },
        {
            id: "meetings",
            title: t("type_events.meetings.title"),
            description: t("type_events.meetings.description"),
            colorName: "meetings",
            lightColors: {
                main: "#6750a4",
                container: "#eaddff",
                onContainer: "#625b71",
            },
            darkColors: {
                main: "#6750a4",
                container: "#eaddff",
                onContainer: "#625b71",
            },
            tailwind: "text-[#6750a4]"
        },
    ])

    return { listCalendars }
}