<script setup lang="ts">
import type { ComputedRef } from "vue";
import { asImageSrc, isFilled } from "@prismicio/helpers";
import type {
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/client";
import { asLink, type ImageField } from "@prismicio/client";
import type {
  EventDocument,
  EventsDocument,
} from "~~/prismicio-types";
import defaultImg from "~~/public/logo.png";
import { computed } from "#imports";

definePageMeta({
  layout: "page",
});

const prismic = usePrismic();
const route = useRoute();
const { t } = useI18n();
const lang = useLang();
const { isMobile } = useDevice();
const requestUrl = useRequestURL();

const Breadcrumbs = defineAsyncComponent(
  () => import("~/components/Layouts/Breadcrumbs.vue"),
);
const HeaderPageTitle = defineAsyncComponent(
  () => import("~/components/pages/HeaderPageTitle.vue"),
);
const Fancybox = defineAsyncComponent(
  () => import("~/components/content/Fancybox.vue"),
);

const Map = defineAsyncComponent(() => import("~/components/content/Map.vue"));

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
const endDate: ComputedRef<string | null> = computed<string>(
    () => useFormatIntoFrenchDate(event.value?.data.time_end, "long") ?? null,
);

const imageBanner = computed<
  ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined
>(() => useBannerImage(event.value?.data.image_banner, isMobile));

const icsUrl: ComputedRef<string> = computed(() => new URL(`/agenda/add/${event.value?.uid}`, requestUrl.origin).href);

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
  <section v-if="event" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl">
      <HeaderPageTitle :title="event.data.title" :image="imageBanner" />
    </header>

    <nav aria-label="Breadcrumb" class="mb-6">
      <Breadcrumbs
        v-if="agenda && event"
        :list-ids="[agenda.id, event.id]"
        :current-uid="event.uid"
      />
    </nav>

    <!-- Grille Principale (Content + Sidebar) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

      <!-- Colonne Principale : Description & Médias -->
      <main class="lg:col-span-2 space-y-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <article class="prose dark:prose-invert max-w-none">
          <Fancybox :is-caroussel="event.data.carrousel">
            <prismic-rich-text
              :field="event.data.resume"
              :serializer="richTextSerializer"
            />
          </Fancybox>
        </article>

        <!-- Section Carte -->
        <section class="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span>Localisation</span>
          </h2>
          <div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 h-72">
            <Map v-if="event" :item-marker="markerCoordinates" />
          </div>
        </section>
      </main>

      <!-- Barre Latérale : Métadonnées & Actions -->
      <aside class="space-y-6 lg:sticky lg:top-6">
        <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white">Détails de l'événement</h2>

          <dl class="space-y-4 text-sm">
            <!-- Dates -->
            <div class="flex items-start gap-3">
              <div class="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                <!-- Icone Calendrier -->
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <dt class="font-medium text-slate-500 dark:text-slate-400">Date et heure</dt>
                <dd class="font-semibold text-slate-900 dark:text-white mt-0.5">
                  <time >{{ startDate }}</time>
                  <time v-if="endDate"> au {{ endDate }}</time>
                </dd>
              </div>
            </div>

            <!-- Lieu -->
            <div class="flex items-start gap-3">
              <div class="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                <!-- Icone Localisation -->
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div>
                <dt class="font-medium text-slate-500 dark:text-slate-400">Lieu</dt>
                <dd class="font-semibold text-slate-900 dark:text-white mt-0.5">
                  {{ event.data.place_event_txt }}
                </dd>
              </div>
            </div>
          </dl>

          <!-- Actions -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <prismic-link
              v-if="asLink(event.data.link)"
              type="button"
              :field="event.data.link"
              class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              :aria-label="t('layout.moreInfo')"
            >
              {{ t("layout.moreInfo") }}
              <Icon name="material-symbols:arrow-right-alt" />
            </prismic-link>


            <a :href="`/agenda/add/${event.uid}`"
               class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Ajouter à mon agenda</span>
            </a>

            <Qrcode
              :value="icsUrl"
            />
          </div>
        </div>
      </aside>

    </div>
  </section>


  <section
    v-show="false"
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
                    --> {{ t("layout.moreInfo") }}
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
