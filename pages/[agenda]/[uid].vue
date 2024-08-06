<script setup lang="ts">
import type { KeyTextField } from "@prismicio/client";

const prismic = usePrismic()
const route = useRoute();
import type {AllDocumentTypes, EventDocument, EventsDocument} from "~/prismicio-types";

definePageMeta({
  layout: 'page',
});

const { agenda, uid } = route.params as { agenda: string, uid: string }

const Breadcrumbs = defineAsyncComponent(() => import('@/components/Layouts/Breadcrumbs.vue'))
const HeaderPage = defineAsyncComponent(() => import('@/components/pages/HeaderPage.vue'))
const Map = defineAsyncComponent(() => import('@/components/content/Map.vue'));

import { useRichTextSerializer } from '@/composables/useRichTextSerializer'
import { useFormatIntoFrenchDate } from "~/composables/useFormatIntoFrenchDate";
import { useCoordinates } from "@/composables/useCoordinates";
import { useSeo } from "@/composables/useSeo";
import type {ComputedRef} from "vue";
import {isFilled} from "@prismicio/helpers";

const centerMap: [number, number] = useCoordinates('babotte');

const fetchedPointData: Ref<[number, number]> = ref([0, 0]);
const { data: event, error } = useAsyncData(
  uid,
  async () => {
    const response = await prismic.client.getByUID<EventDocument>('event', uid, {lang: 'fr-fr'});
    fetchedPointData.value = [response.data.place_event.longitude, response.data.place_event.latitude]
    return response;
  }
)

const { data: parentAgenda } = await useAsyncData(
    'parentAgenda',
    async () => await prismic.client.getByUID<AllDocumentTypes>('events', agenda, {'lang': 'fr-fr'}) as EventsDocument
)

const markerCoordinates = computed(() => {
  return fetchedPointData.value[0] &&  fetchedPointData.value[1] ? fetchedPointData.value : centerMap
})

const richTextSerializer = useRichTextSerializer();
const startDate = useFormatIntoFrenchDate(event.value?.data.time_start, 'long');
const endDate = useFormatIntoFrenchDate(event.value?.data.time_end, 'long');

const metaTitle: ComputedRef<string> = computed<string>(() => (isFilled.keyText(event.value?.data.meta_title)) ? `${event.value?.data.meta_title}` : `${event.value?.data.title}`);
const metaDescription: ComputedRef<string> = computed<string>(() => `${event.value?.data.meta_description}`);
const imgBanner = computed(() => (isFilled.image(event.value?.data.image_banner)) ? event.value?.data.image_banner : null)

if (event.value) {
  useSeo({
    title: `${metaTitle.value}`,
    description: `${metaDescription.value}`,
    image: null, // imgBanner ?? `${event.value?.data.image_vignette.Vignette.url}`,
    imageAlt: null // `${event.value?.data.image_vignette.Vignette.alt}`,
  })
}


</script>

<template>
  <section v-if="event">
    <div class="max-w-screen-xl w-full mx-auto relative mb-2"> <!-- max-w-screen-lg -->
      <HeaderPage :image="imgBanner" />
      <div class="max-w-3xl mx-auto">
        <div
          class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <Breadcrumbs v-if="parentAgenda && event" :listIds="[parentAgenda.id, event.id]" :currentUid="event.uid" />
            <h2 class="text-gray-900 font-bold text-4xl mb-2 font-raleway">{{ event.data.title }}</h2>
            <div class="my-8 grid gap-6 px-4">
              <prismic-rich-text
                :field="event.data.resume"
                :serializer="richTextSerializer"
              />

              <div class="flex items-center gap-4">
                <Icon size="24" name="material-symbols:calendar-clock" />
                <p class="block antialiased font-sans text-base leading-relaxed text-inherit ">
                  {{ startDate }}<span v-if="event.data.time_end"> au {{ endDate }}</span>
                </p>
              </div>

              <div class="flex items-center gap-4">
                <Icon size="24" name="hugeicons:image-composition" />
                <p class="block antialiased font-sans text-base leading-relaxed text-inherit ">{{ event.data.place_event_txt }}</p>
              </div>

              <div class="flex items-center gap-4" v-if="event.data.link">
                <Icon size="24" name="material-symbols:add-link" />
                <p class="block antialiased font-sans text-base leading-relaxed text-inherit ">
                  <prismic-link
                    :field="event.data.link"
                    class="text-indigo-400 inline-flex items-center mt-3"
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

      <Map
        v-if="event"
        :itemMarker="markerCoordinates"
      />
    </div>
  </section>
</template>

<style scoped>

</style>