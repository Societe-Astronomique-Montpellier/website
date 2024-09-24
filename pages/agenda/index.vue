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

definePageMeta({
  layout: "page",
});

const prismic = usePrismic();
const { t, locale } = useI18n();
const { isMobile } = useDevice();

const HeaderPage = defineAsyncComponent(
  () => import("~/components/pages/HeaderPage.vue"),
);
const Breadcrumbs = defineAsyncComponent(
  () => import("~/components/Layouts/Breadcrumbs.vue"),
);
const Fancybox = defineAsyncComponent(
  () => import("~/components/content/Fancybox.vue"),
);
const BlockListCards = defineAsyncComponent(
  () => import("~/components/home/BlockListCards.vue"),
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data: list_events, error } = useAsyncData("list_events", async () => {
  const dateNow = new Date().toISOString().split("T")[0];
  const [agenda, futurEvents, pastEvents] = await Promise.all([
    (await prismic.client.getSingle("events", {
      lang: locale.value,
    })) as EventsDocument,
    (await prismic.client.getAllByType<AllDocumentTypes>("event", {
      lang: locale.value,
      filters: [prismic.filter.dateAfter("my.event.time_start", dateNow)],
      orderings: {
        field: "my.event.time_start",
        direction: "asc",
      },
    })) as EventDocument[],
    (await prismic.client.getAllByType<AllDocumentTypes>("event", {
      lang: locale.value,
      filters: [prismic.filter.dateBefore("my.event.time_start", dateNow)],
      orderings: {
        field: "my.event.time_start",
        direction: "desc",
      },
    })) as EventDocument[],
  ]);

  return {
    agenda: agenda,
    next: futurEvents,
    past: pastEvents,
  };
});
const richTextSerializer = useRichTextSerializer();

const titleBlockNext: ComputedRef<string> = computed<string>(() =>
  t("agenda.titleBlockNext"),
);
const titleBlockPast: ComputedRef<string> = computed<string>(() =>
  t("agenda.titleBlockPast"),
);

const imageBanner = computed<
  ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined
>(() => useBannerImage(list_events.value?.agenda.data.image_banner, isMobile));

const metaTitle: ComputedRef<string> = computed<string>(() =>
  isFilled.keyText(list_events.value?.agenda.data.meta_title)
    ? `${list_events.value?.agenda.data.meta_title}`
    : `${list_events.value?.agenda.data.title}`,
);
const metaDescription: ComputedRef<string> = computed<string>(() =>
  !isFilled.keyText(list_events.value?.agenda.data.meta_description)
    ? `${list_events.value?.agenda.data.meta_description}`
    : `${list_events.value?.agenda.data.title}`,
);
const metaImage = computed(() =>
  asImageSrc(list_events.value?.agenda.data.meta_image),
);

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: metaImage,
});
</script>

<template>
  <section v-if="list_events">
    <div class="max-w-screen-xl w-full mx-auto relative mb-2">
      <Breadcrumbs
        v-if="list_events"
        :list-ids="[list_events.agenda.id]"
        :current-uid="list_events.agenda.uid"
      />
      <h1 class="text-gray-900 font-bold text-4xl my-8 text-center">
        {{ list_events?.agenda.data.title }}
      </h1>
      <HeaderPage :image="imageBanner" />
      <div class="max-w-3xl mx-auto">
        <div
          class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <div class="my-4 grid gap-4 px-1">
              <div data-content>
                <Fancybox>
                  <prismic-rich-text
                    :field="list_events?.agenda.data.content"
                    :serializer="richTextSerializer"
                  />
                </Fancybox>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BlockListCards
        :title-block="titleBlockNext"
        :items="list_events?.next"
        :parent-item="list_events?.agenda"
      />

      <BlockListCards
        :title-block="titleBlockPast"
        :items="list_events?.past"
        :parent-item="list_events?.agenda"
      />
    </div>
  </section>
</template>

<style scoped></style>
