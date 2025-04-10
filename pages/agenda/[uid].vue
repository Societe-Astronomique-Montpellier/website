<script setup lang="ts">
import type { ComputedRef } from "vue";
import { asImageSrc, isFilled } from "@prismicio/helpers";
import type {
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/types";
import {asLink, type ImageField} from "@prismicio/client";
import type { EventDocument, EventsDocument } from "~/prismicio-types";

definePageMeta({
  layout: "page",
});

const prismic = usePrismic();
const route = useRoute();
const { t } = useI18n();
const lang = useLang();
const { isMobile } = useDevice();

const Breadcrumbs = defineAsyncComponent(
  () => import("@/components/Layouts/Breadcrumbs.vue"),
);
const HeaderPage = defineAsyncComponent(
  () => import("@/components/pages/HeaderPage.vue"),
);
const Fancybox = defineAsyncComponent(
  () => import("@/components/content/Fancybox.vue"),
);
const Map = defineAsyncComponent(() => import("@/components/content/Map.vue"));

const fetchedPointData: Ref<[number, number]> = ref([0, 0]);
const { uid } = route.params as { uid: string };

const { data, error } = useAsyncData(uid, async () => {
  const [response, parentAgenda] = await Promise.all([
    (await prismic.client.getByUID<EventDocument>("event", uid, {
      lang: lang.value,
    })) as EventDocument,
    (await prismic.client.getSingle<EventsDocument>("events", {
      lang: lang.value,
    })) as EventsDocument,
  ]);

  fetchedPointData.value = [
    response.data.place_event.latitude,
    response.data.place_event.longitude,
  ];

  return {
    event: response,
    parentAgenda: parentAgenda,
    startDate: useFormatIntoFrenchDate(response.data.time_start, "long"),
    endDate:
      null !== response.data.time_end
        ? useFormatIntoFrenchDate(response.data.time_end, "long")
        : null,
  };
});

if (error.value) {
  throw createError({
    statusCode: error.value?.statusCode,
    statusMessage: error.value?.statusMessage,
  });
}

const richTextSerializer = useRichTextSerializer();
const centerMap: [number, number] = useCoordinates("babotte");

const markerCoordinates = computed(() => {
  return fetchedPointData.value[0] && fetchedPointData.value[1]
    ? fetchedPointData.value
    : centerMap;
});

const imageBanner = computed<
  ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined
>(() => useBannerImage(data.value?.event.data.image_banner, isMobile));
const metaTitle: ComputedRef<string> = computed<string>(() =>
  isFilled.keyText(data.value?.event.data.meta_title)
    ? `${data.value?.event.data.meta_title}`
    : `${data.value?.event.data.title}`,
);
const metaDescription: ComputedRef<string> = computed<string>(
  () => `${data.value?.event.data.meta_description}`,
);
const metaImage = asImageSrc(data.value?.event.data.meta_image);

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: metaImage,
});
</script>

<template>
  <section v-if="data">
    <div class="max-w-screen-xl w-full mx-auto relative mb-2">
      <!-- max-w-screen-lg -->
      <Breadcrumbs
        v-if="data.parentAgenda && data.event"
        :list-ids="[data.parentAgenda.id, data.event.id]"
        :current-uid="data.event.uid"
      />
      <h1
        class="text-gray-900 dark:text-slate-400 font-bold text-4xl my-8 text-center"
        :aria-label="data.event.data.title as string"
      >
        {{ data.event.data.title }}
      </h1>
      <HeaderPage :image="imageBanner" />
      <div class="max-w-screen-md mx-auto">
        <div
          class="rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white dark:bg-slate-800 relative top-0 p-5 sm:p-10">
            <div class="my-4 grid gap-4 px-1">
              <div data-content>
                <Fancybox :is-caroussel="data.event.data.carrousel">
                  <prismic-rich-text
                    :field="data.event.data.resume"
                    :serializer="richTextSerializer"
                  />
                </Fancybox>

                <div class="md:flex-row">
                  <button
                    type="button"
                    class="justify-center px-3 py-2.5 text-md font-medium text-white inline-flex items-center bg-gray-700 focus:ring-4 disabled cursor-not-allowed focus:outline-none rounded-lg text-center m-1 w-full md:w-auto"
                  >
                    <Icon size="18" name="material-symbols:calendar-clock" />
                    <span v-if="data.startDate">&nbsp;{{ data.startDate }}</span
                    ><span v-if="data.endDate"> au {{ data.endDate }}</span>
                  </button>

                  <button
                    type="button"
                    class="justify-center px-3 py-2.5 text-2sm font-medium text-white inline-flex items-center bg-gray-700 focus:ring-4 cursor-not-allowed focus:outline-none rounded-lg text-center m-1 w-full md:w-auto"
                  >
                    <Icon size="18" name="hugeicons:image-composition" />
                    &nbsp;{{ data.event.data.place_event_txt }}
                  </button>

                  <prismic-link
                    type="button"
                    v-if="asLink(data.event.data.link)"
                    :field="data.event.data.link"
                    class="justify-center px-3 py-2.5 text-2sm font-medium text-white inline-flex items-center bg-gray-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center m-1 w-full md:w-auto"
                    :aria-label="t('layout.moreInfo')"
                  >
                    {{ $t("layout.moreInfo") }}
                    <Icon name="material-symbols:arrow-right-alt" />
                  </prismic-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Map v-if="data.event" :item-marker="markerCoordinates" />
    </div>
  </section>
</template>

<style scoped></style>
