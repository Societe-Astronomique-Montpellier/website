<script setup lang="ts">
import { ScheduleXCalendar } from "@schedule-x/vue";
import {
  CalendarApp,
  createCalendar,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createResizePlugin } from "@schedule-x/resize";
import { createScrollControllerPlugin } from "@schedule-x/scroll-controller";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import type { CalendarEvent } from "@schedule-x/calendar";
import type { ISamEvent, IListSamEvents } from "~/types/calendarEvent";

const props = defineProps<{
  listEvents: IListSamEvents;
}>();
const { listEvents } = toRefs(props);

const { isMobile } = useDevice();

const eventsServicePlugin = createEventsServicePlugin();

const calendarApp = shallowRef(
  createCalendar({
    selectedDate: new Date().toISOString().split("T")[0],
    views: [createViewWeek(), createViewMonthAgenda(), createViewMonthGrid()],
    defaultView: isMobile
      ? createViewMonthAgenda().name
      : createViewMonthGrid().name,
    plugins: [
      createResizePlugin(),
      createScrollControllerPlugin({
        initialScroll: "08:00",
      }),
      createEventModalPlugin(),
      eventsServicePlugin,
    ],
    locale: "fr-FR",
    calendars: {
      members: {
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
      },
      subscribers: {
        colorName: "subscribers",
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
      },
      allpublic: {
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
      },
    },
  }),
);

onMounted(() => {
  setTimeout(() => {
    listEvents?.value.events?.forEach((event: ISamEvent) => {
      eventsServicePlugin.add({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end ?? event.start,
        description: event.description ?? "",
        location: event.location ?? "",
        people: [event.access_type_txt],
        calendarId: event.access_type,
      } as CalendarEvent);
    });
  }, 500);
});
</script>

<template>
  <div>
    <ClientOnly>
      <ScheduleXCalendar :calendar-app="calendarApp" />
    </ClientOnly>
  </div>
</template>

<style scoped>
.sx-vue-calendar-wrapper {
  height: 700px;
  max-height: 90vh;
  width: 100%;
}
</style>
