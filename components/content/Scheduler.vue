<script setup lang="ts">
import { ScheduleXCalendar } from "@schedule-x/vue";
import {
  createCalendar,
  viewWeek,
  viewMonthGrid,
  viewMonthAgenda,
} from "@schedule-x/calendar";
import { createResizePlugin } from "@schedule-x/resize";
import { createScrollControllerPlugin } from "@schedule-x/scroll-controller";

import type { ISamEvent, IListSamEvents } from "~/types/calendarEvent";

const props = defineProps<{
  listEvents: IListSamEvents;
}>();
const { listEvents } = toRefs(props);

const calendarApp = shallowRef(
  createCalendar({
    selectedDate: new Date().toISOString().split("T")[0],
    views: [viewWeek, viewMonthGrid, viewMonthAgenda],
    defaultView: viewMonthGrid.name,
    plugins: [
      createResizePlugin(),
      createScrollControllerPlugin({
        initialScroll: "08:00",
      }),
    ],
    locale: "fr-FR",
    calendars: {
      work: {
        colorName: "work",
        lightColors: {
          container: "#fff",
          onContainer: "#000",
          main: "#fff",
        },
        darkColors: {
          container: "#000",
          onContainer: "#fff",
          main: "#000",
        },
      },
    },
  }),
);

onMounted(() => {
  setTimeout(() => {
    listEvents?.value.events?.forEach(
      (event: ISamEvent) => console.log(event),
      // calendarApp.value.events.set(event as calendarEvent),
    );
  }, 500);
});
</script>

<template>
  <div>
    <ClientOnly>
      <ScheduleXCalendar :calendar-app="calendarApp">
        <!--        <template #timeGridEvent="{ calendarEvent }">-->
        <!--          <div class="event">-->
        <!--            {{ calendarEvent.title }}-->
        <!--          </div>-->
        <!--        </template>-->
      </ScheduleXCalendar>
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
