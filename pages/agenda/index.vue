<script setup lang="ts">
import type {
  AllDocumentTypes,
  EventDocument,
  EventsDocument,
} from "~/prismicio-types";
import type { ComputedRef } from "vue";
import type { ImageField } from "@prismicio/client";
import type {
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/types";
import { asImageSrc, isFilled } from "@prismicio/helpers";
import type { IListSamEvents } from "~/types/calendarEvent";
import type { CalendarTypeEventList } from "~/types/calendarTypeEvent";
import type { CalendarType } from "@schedule-x/calendar";
import defaultImg from "../public/logo.png";

definePageMeta({
  layout: "page",
});

const prismic = usePrismic();
const lang = useLang();
const { t } = useI18n();
const { isMobile } = useDevice();

const listEvents: IListSamEvents = reactive({ events: [] });
const listCalendars: Ref<CalendarTypeEventList> = ref([
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
  },
]);

// transform CalendarTypeEventList into Record<string, CalendarType for @schedule-x/calendar
const calendars: ComputedRef<Record<string, CalendarType>> = computed(() => {
  return listCalendars.value.reduce<Record<string, CalendarType>>(
    (acc, event) => {
      acc[event.id] = {
        colorName: event.id,
        lightColors: event.lightColors,
        darkColors: event.darkColors,
      };
      return acc;
    },
    {} as Record<string, CalendarType>,
  );
});

const HeaderPageTitle = defineAsyncComponent(
  () => import("@/components/pages/HeaderPageTitle.vue"),
);
const Breadcrumbs = defineAsyncComponent(
  () => import("@/components/Layouts/Breadcrumbs.vue"),
);
const Fancybox = defineAsyncComponent(
  () => import("@/components//content/Fancybox.vue"),
);
const ScheduleSam = defineAsyncComponent(
  () => import("@/components/content/Scheduler.vue"),
);

const currentDate = new Date();
const monthsAgo = new Date();
monthsAgo.setMonth(currentDate.getMonth() - 1);

const [{ data: events, error: eventsError }, { data: agenda }] =
  await Promise.all([
    useAsyncData(
      "events",
      async () =>
        (await prismic.client.getAllByType<AllDocumentTypes>("event", {
          lang: lang.value,
          filters: [
            prismic.filter.dateAfter(
              "my.event.time_start",
              monthsAgo.toISOString().split("T")[0],
            ),
          ],
          orderings: {
            field: "my.event.time_start",
            direction: "asc",
          },
        })) as EventDocument[],
    ),
    useAsyncData(
      "agenda",
      async () =>
        (await prismic.client.getSingle("events", {
          lang: lang.value,
        })) as EventsDocument,
    ),
  ]);

if (eventsError.value) {
  throw createError({
    statusCode: eventsError.value?.statusCode,
    statusMessage: eventsError.value?.statusMessage,
  });
}

const richTextSerializer = useRichTextSerializer();
const { getKeyByValue } = useFindKeyFromArray();

events?.value?.forEach((event: EventDocument) => {
  listEvents?.events?.push({
    id: event.id,
    uid: event.uid,
    title: event.data.title as string,
    start: useFormatScheduleDate(event?.data.time_start),
    end: event?.data.time_end
      ? useFormatScheduleDate(event?.data.time_end)
      : useFormatScheduleDate(event?.data.time_start),
    description: prismic.asText(event.data.resume) as string,
    location: event.data.place_event_txt as string,
    access_type_txt: event.data.access_type,
    access_type:
      getKeyByValue(
        listCalendars.value,
        "title",
        event.data.access_type,
        "id",
      ) ?? "allpublic",
  });
});

const imageBanner = computed<
  ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined
>(() => useBannerImage(agenda?.value?.data.image_banner, isMobile));

const metaTitle: ComputedRef<string> = computed<string>(() =>
  isFilled.keyText(agenda?.value?.data.meta_title)
    ? `${agenda?.value?.data.meta_title}`
    : `${agenda?.value?.data.title}`,
);
const metaDescription: ComputedRef<string> = computed<string>(() =>
  !isFilled.keyText(agenda?.value?.data.meta_description)
    ? `${agenda?.value?.data.meta_description}`
    : `${agenda?.value?.data.title}`,
);

const metaImage: ComputedRef<string> = computed<string>(() =>
  isFilled.image(agenda.value?.data.meta_image)
    ? `${asImageSrc(agenda.value?.data.meta_image)}`
    : defaultImg,
);

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: metaImage,
});
</script>

<template>
  <section
    v-if="agenda"
    class="sm:px-5 md:px-40 lg:px-40 flex flex-1 justify-center"
  >
    <div class="max-w-screen-xl w-full mx-auto relative mb-2">
      <HeaderPageTitle :title="agenda.data.title" :image="imageBanner" />

      <div class="flex flex-wrap gap-4 sm:px-2 md:px-4 lg:px-4 mx-auto">
        <div
          class="rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white dark:bg-slate-800 relative top-0 p-5">
            <Breadcrumbs :list-ids="[agenda.id]" :current-uid="agenda.uid" />
            <div class="my-4 grid gap-4 px-1">
              <div data-content>
                <Fancybox>
                  <prismic-rich-text
                    :field="agenda.data.content"
                    :serializer="richTextSerializer"
                  />
                </Fancybox>
              </div>

              <div
                class="grid sm:grid-cols-1 sm:gap-2 md:grid-cols-2 lg:grid-cols-2 md:gap-4"
              >
                <div
                  v-for="typeCal in listCalendars"
                  :key="typeCal.id"
                  class="rounded-xl shadow-md p-4 transition hover:scale-105 bg-green-100 border-l-4 border-green-500 text-green-700"
                  :style="{
                    backgroundColor: typeCal.lightColors.container,
                    color: typeCal.lightColors.onContainer,
                    borderColor: typeCal.lightColors.main,
                  }"
                >
                  <p class="text-lg mb-2 font-semibold">{{ typeCal.title }}</p>
                  <p class="text-sm">{{ typeCal.description }}</p>
                </div>
              </div>
            </div>

            <ClientOnly fallback-tag="span" :fallback="t('layout.loading')">
              <ScheduleSam
                :list-events="listEvents"
                :list-type-calendars="calendars"
              />
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
