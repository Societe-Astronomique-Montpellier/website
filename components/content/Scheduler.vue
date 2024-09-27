<script setup lang="ts">
import { ScheduleXCalendar } from "@schedule-x/vue";
import {
  createCalendar,
  viewMonthGrid,
  viewMonthAgenda,
} from "@schedule-x/calendar";

import { createResizePlugin } from "@schedule-x/resize";
import { createScrollControllerPlugin } from "@schedule-x/scroll-controller";

const { locale } = useI18n();

const calendarApp = ref(
  createCalendar({
    locale: locale.value,
    selectedDate: new Date().toISOString(),
    views: [viewMonthGrid, viewMonthAgenda],
    defaultView: viewMonthGrid.name,
    plugins: [
      createResizePlugin(),
      createScrollControllerPlugin({
        initialScroll: "08:00",
      }),
    ],
    events: [
      {
        id: 1,
        title: 'Event 2',
        start: '2024-09-20',
        end: '2023-09-20',
      },
    ],
    calendars: {
      work: {
        colorName: "work",
        lightColors: {
          container: "#fff",
          onContainer: "#000",
          main: "#fff",
        },
      },
    },
  }),
);
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
