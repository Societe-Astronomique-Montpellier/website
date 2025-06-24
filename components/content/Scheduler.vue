<script setup lang="ts">
import { ScheduleXCalendar } from "@schedule-x/vue";
import {
  createCalendar,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";

import { createResizePlugin } from "@schedule-x/resize";
import { createScrollControllerPlugin } from "@schedule-x/scroll-controller";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import type { CalendarEvent, CalendarType } from "@schedule-x/calendar";
import type { ISamEvent, IListSamEvents } from "~/types/calendarEvent";

const props = defineProps<{
  listEvents: IListSamEvents;
  listTypeCalendars: Record<string, CalendarType> | undefined;
}>();
const { listEvents, listTypeCalendars } = toRefs(props);

const { isMobile } = useDevice();
const colorMode = useColorMode();

const eventsServicePlugin = createEventsServicePlugin();
const isDark: ComputedRef<boolean> = computed<boolean>(
  () => "dark" === colorMode.value,
);

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
    calendars: listTypeCalendars.value,
    isDark: isDark.value,
  }),
);

onMounted(async () => {
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
  }, 1000);
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
