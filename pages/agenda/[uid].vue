<script setup lang="ts">
definePageMeta({
  layout: 'page',
});

import type {ComputedRef} from "vue";
import {asImageSrc, isFilled} from "@prismicio/helpers";
import type {EmptyImageFieldImage, FilledImageFieldImage} from "@prismicio/types";
import type {ImageField} from "@prismicio/client";
import type {AllDocumentTypes, EventDocument, EventsDocument} from "~/prismicio-types";

const prismic = usePrismic()
const route = useRoute();
const { t } = useI18n()
const { isMobile } = useDevice();

const Breadcrumbs = defineAsyncComponent(() => import('@/components/Layouts/Breadcrumbs.vue'))
const HeaderPage = defineAsyncComponent(() => import('@/components/pages/HeaderPage.vue'))
const Fancybox = defineAsyncComponent(() => import("@/components/content/Fancybox.vue"));
const Map = defineAsyncComponent(() => import('@/components/content/Map.vue'));

const fetchedPointData: Ref<[number, number]> = ref([0, 0]);
const { uid } = route.params as { uid: string }

const { data: event, error } = useAsyncData(
  uid,
  async () => {
    const [response, parentAgenda] = await Promise.all([
      await prismic.client.getByUID<EventDocument>('event', uid, {lang: 'fr-fr'}) as EventDocument,
      await prismic.client.getSingle<EventsDocument>('events', {lang: 'fr-fr'}) as EventsDocument
    ])

    fetchedPointData.value = [response.data.place_event.longitude, response.data.place_event.latitude]

    return {
      event: response,
      parentAgenda: parentAgenda
    }
  }
)


const richTextSerializer = useRichTextSerializer();
// const shareSocialMedia = useSocialShareMedia();
const startDate = useFormatIntoFrenchDate(event.value?.event.data.time_start, 'long');
const endDate = useFormatIntoFrenchDate(event.value?.event.data.time_end, 'long');
const centerMap: [number, number] = useCoordinates('babotte');

const markerCoordinates = computed(() => {
  return fetchedPointData.value[0] &&  fetchedPointData.value[1] ? fetchedPointData.value : centerMap
})

const imageBanner = computed<ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined>(() => useBannerImage(event.value?.event.data.image_banner, isMobile))
const metaTitle: ComputedRef<string> = computed<string>(() => (isFilled.keyText(event.value?.event.data.meta_title)) ? `${event.value?.event.data.meta_title}` : `${event.value?.event.data.title}`);
const metaDescription: ComputedRef<string> = computed<string>(() => `${event.value?.event.data.meta_description}`);
const metaImage = computed(() => asImageSrc(event.value?.event.data.image_vignette.mobile))

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: metaImage
})
</script>

<template>
  <section v-if="event">
    <div class="max-w-screen-xl w-full mx-auto relative mb-2"> <!-- max-w-screen-lg -->
      <HeaderPage :image="imageBanner" />
      <div class="max-w-3xl mx-auto">
        <div
          class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <Breadcrumbs v-if="event.parentAgenda && event.event" :listIds="[event.parentAgenda.id, event.event.id]" :currentUid="event.event.uid" />
            <h1 class="text-gray-900 font-bold text-4xl mb-2 font-raleway">{{ event.event.data.title }}</h1>
            <div :class="(isMobile) ? `my-4 grid gap-4 px-1`: `my-8 grid grid-cols-[50px_1fr] gap-4 px-2`">
              <div class="flex flex-col space-y-4 mt-3" data-side v-if="!isMobile">
<!--                <SocialShare-->
<!--                  v-for="network in shareSocialMedia"-->
<!--                  :key="network"-->
<!--                  :network="network.social_network"-->
<!--                >-->
<!--                </SocialShare>-->
              </div>
              <div data-content>
                <Fancybox>
                  <prismic-rich-text
                    :field="event.event.data.resume"
                    :serializer="richTextSerializer"
                  />
                </Fancybox>

                <div class="flex items-center gap-4">
                  <Icon size="24" name="material-symbols:calendar-clock" />
                  <p class="block antialiased font-sans text-base leading-relaxed text-inherit ">
                    {{ startDate }}<span v-if="event.event.data.time_end"> au {{ endDate }}</span>
                  </p>
                </div>

                <div class="flex items-center gap-4">
                  <Icon size="24" name="hugeicons:image-composition" />
                  <p class="block antialiased font-sans text-base leading-relaxed text-inherit ">{{ event.event.data.place_event_txt }}</p>
                </div>

                <div class="flex items-center gap-4" v-if="event.event.data.link">
                  <Icon size="24" name="material-symbols:add-link" />
                  <p class="block antialiased font-sans text-base leading-relaxed text-inherit ">
                    <prismic-link
                        :field="event.event.data.link"
                        class="text-indigo-400 inline-flex items-center mt-3"
                        :aria-label="t('layout.moreInfo')"
                    >
                      {{ $t('layout.moreInfo') }}
                      <Icon name="material-symbols:arrow-right-alt" />
                    </prismic-link>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <Map
        v-if="event"
        :itemMarker="markerCoordinates"
      />
    </div>
  </section>
</template>

<style scoped>

</style>