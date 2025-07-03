<script setup lang="ts">
import type { ComputedRef } from "vue";
import { asImageSrc, isFilled } from "@prismicio/helpers";
import type {
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/types";
import { asLink, type ImageField } from "@prismicio/client";
import type {
  AllDocumentTypes,
  EventDocument,
  EventsDocument,
} from "~/prismicio-types";
import defaultImg from "../public/logo.png";
import { computed } from "#imports";

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
const HeaderPageTitle = defineAsyncComponent(
  () => import("@/components/pages/HeaderPageTitle.vue"),
);
const Fancybox = defineAsyncComponent(
  () => import("@/components/content/Fancybox.vue"),
);

const Map = defineAsyncComponent(() => import("@/components/content/Map.vue"));

const { uid } = route.params as { uid: string };

const [{ data: event, error: eventError }, { data: agenda }] =
  await Promise.all([
    useAsyncData(uid, async () =>
      prismic.client.getByUID<EventDocument>("event", uid, {
        lang: lang.value,
      }),
    ),
    useAsyncData(
      "agenda",
      async () =>
        (await prismic.client.getSingle("events", {
          lang: lang.value,
        })) as EventsDocument,
    ),
  ]);

//   return {

//     startDate: useFormatIntoFrenchDate(response.data.time_start, "long"),
//     endDate:
//       null !== response.data.time_end
//         ? useFormatIntoFrenchDate(response.data.time_end, "long")
//         : null,
//   };
// });

if (eventError.value) {
  throw createError({
    statusCode: eventError.value?.statusCode,
    statusMessage: eventError.value?.statusMessage,
  });
}

const richTextSerializer = useRichTextSerializer();
const centerMap: [number, number] = useCoordinates("babotte");

const markerCoordinates = computed<[number, number]>(() => {
  return event.value?.data.place_event.latitude &&
    event.value?.data.place_event.longitude
    ? [
        unref(event.value?.data.place_event.latitude),
        unref(event.value?.data.place_event.longitude),
      ]
    : centerMap;
});

const startDate: ComputedRef<string> = computed<string>(() =>
  useFormatIntoFrenchDate(event.value?.data.time_start, "long"),
);
const endDate: ComputedRef<string> = computed<string>(
  () => useFormatIntoFrenchDate(event.value?.data.time_end, "long") ?? null,
);

const imageBanner = computed<
  ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined
>(() => useBannerImage(event.value?.data.image_banner, isMobile));

const metaTitle: ComputedRef<string> = computed<string>(() =>
  isFilled.keyText(event.value?.data.meta_title)
    ? `${event.value?.data.meta_title}`
    : `${event.value?.data.title}`,
);
const metaDescription: ComputedRef<string> = computed<string>(
  () => `${event.value?.data.meta_description}`,
);
const metaImage: ComputedRef<string> = computed<string>(() =>
  isFilled.image(event.value?.data.meta_image)
    ? `${asImageSrc(event.value?.data.meta_image)}`
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
    v-if="event"
    class="sm:px-5 md:px-40 lg:px-40 flex flex-1 justify-center"
  >
    <div class="max-w-screen-xl w-full mx-auto relative mb-2">
      <HeaderPageTitle :title="event.data.title" :image="imageBanner" />
      <div class="flex flex-wrap gap-4 sm:px-2 md:px-4 lg:px-4 mx-auto">
        <div
          class="rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white dark:bg-slate-800 relative top-0 p-5">
            <Breadcrumbs
              v-if="agenda && event"
              :list-ids="[agenda.id, event.id]"
              :current-uid="event.uid"
            />

            <div class="my-4 grid gap-4 px-1">
              <div data-content>
                <Fancybox :is-caroussel="event.data.carrousel">
                  <prismic-rich-text
                    :field="event.data.resume"
                    :serializer="richTextSerializer"
                  />
                </Fancybox>

                <div class="md:flex-row">
                  <button
                    type="button"
                    class="justify-center px-3 py-2.5 text-md font-medium text-white inline-flex items-center bg-gray-700 focus:ring-4 disabled cursor-not-allowed focus:outline-none rounded-lg text-center m-1 w-full md:w-auto"
                  >
                    <Icon size="18" name="material-symbols:calendar-clock" />
                    <span v-if="startDate">&nbsp;{{ startDate }}</span>
                    <span v-if="endDate">&nbsp;au {{ endDate }}</span>
                  </button>

                  <button
                    type="button"
                    class="justify-center px-3 py-2.5 text-2sm font-medium text-white inline-flex items-center bg-gray-700 focus:ring-4 cursor-not-allowed focus:outline-none rounded-lg text-center m-1 w-full md:w-auto"
                  >
                    <Icon size="18" name="hugeicons:image-composition" />
                    &nbsp;{{ event.data.place_event_txt }}
                  </button>

                  <prismic-link
                    v-if="asLink(event.data.link)"
                    type="button"
                    :field="event.data.link"
                    class="justify-center px-3 py-2.5 text-2sm font-medium text-white inline-flex items-center bg-gray-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center m-1 w-full md:w-auto"
                    :aria-label="t('layout.moreInfo')"
                  >
                    {{ $t("layout.moreInfo") }}
                    <Icon name="material-symbols:arrow-right-alt" />
                  </prismic-link>
                </div>

                <Map v-if="event" :item-marker="markerCoordinates" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
