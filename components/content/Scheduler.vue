<script setup>
import { ScheduleXCalendar } from "@schedule-x/vue";
import {
  createCalendar,
  viewDay,
  viewWeek,
  viewMonthGrid,
  viewMonthAgenda,
} from "@schedule-x/calendar";

import { createResizePlugin } from "@schedule-x/resize";
import { createScrollControllerPlugin } from "@schedule-x/scroll-controller";

const { locale } = useI18n();

const calendarApp = ref(
  createCalendar({
    locale: locale.value,
    selectedDate: "2024-09-27",
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    defaultView: viewWeek.name,
    plugins: [
      createResizePlugin(),
      createScrollControllerPlugin({
        initialScroll: "08:00",
      }),
    ],
    events: [
      {
        id: 1,
        title: "Event 2",
        start: "2024-09-20",
        end: "2023-09-20",
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
    calendarApp.value.events.set([
      {
        id: 1,
        title: "Event 1",
        start: "2024-09-19",
        end: "2024-09-19",
      },
      {
        id: 2,
        title: "Event 2",
        start: "2024-09-26",
        end: "2024-10-11",
      },
    ]);
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
