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
import { useKeyFromValue } from "~/composables/useFindKeyByValue";

definePageMeta({
  layout: "page",
});

const prismic = usePrismic();
const { locale, t } = useI18n();
const { isMobile } = useDevice();

const listEvents: IListSamEvents = reactive({ events: [] });
const listTypeEvents: Ref<Record<string, string | undefined>> = ref({
  allpublic: "Évenement public",
  subscribers: "Évenement soumis à inscription",
  members: "Réservé aux membres",
});

const HeaderPage = defineAsyncComponent(
  () => import("@/components/pages/HeaderPage.vue"),
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

const [
  { data: events, error: eventsError },
  { data: agenda, error: agendaError },
] = await Promise.all([
  useAsyncData(
    "events",
    async () =>
      (await prismic.client.getAllByType<AllDocumentTypes>("event", {
        lang: locale.value,
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
        lang: locale.value,
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
const { getKeyFromValue } = useKeyFromValue<typeof listTypeEvents.value>();

events?.value?.forEach((event: EventDocument) => {
  listEvents?.events?.push({
    id: event.id,
    uid: event.uid,
    title: event.data.title as string,
    start: useFormatScheduleDate(event?.data.time_start),
    end: (event?.data.time_end) ? useFormatScheduleDate(event?.data.time_end) : useFormatScheduleDate(event?.data.time_start),
    description: prismic.asText(event.data.resume) as string,
    location: event.data.place_event_txt as string,
    access_type_txt: (event.data.access_type as string) ?? "Évenement public",
    access_type:
      getKeyFromValue(listTypeEvents.value, event.data.access_type) ??
      "allpublic",
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
const metaImage = asImageSrc(agenda?.value?.data.meta_image);

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: metaImage,
});
</script>

<template>
  <section v-if="agenda">
    <div class="max-w-screen-xl w-full mx-auto relative mb-2">
      <Breadcrumbs :list-ids="[agenda.id]" :current-uid="agenda.uid" />
      <h1
        class="text-gray-900 dark:text-slate-400 font-bold text-4xl my-8 text-center"
        :aria-label="agenda.data.title as string"
      >
        {{ agenda.data.title }}
      </h1>
      <HeaderPage :image="imageBanner" />
      <div class="max-w-3xl mx-auto">
        <div
          class="rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white dark:bg-slate-800 relative top-0 p-5 sm:p-10">
            <div class="my-4 grid gap-4 px-1">
              <div data-content>
                <Fancybox>
                  <prismic-rich-text
                    :field="agenda.data.content"
                    :serializer="richTextSerializer"
                  />
                </Fancybox>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClientOnly fallback-tag="span" :fallback="t('layout.loading')">
        <ScheduleSam
          :list-events="listEvents"
          :list-type-events="listTypeEvents"
        />
      </ClientOnly>
    </div>
  </section>
</template>

<style scoped></style>
