<script setup lang="ts">
import * as prismic from "@prismicio/client";
import type {AllDocumentTypes, EventDocument} from "~/prismicio-types";

definePageMeta({
  layout: 'page',
});

const route = useRoute();
const { uid } = route.params as { uid: string }

const Map = defineAsyncComponent(() => import('@/components/content/Map.vue'));

import { useRichTextSerializer } from '@/composables/useRichTextSerializer'
import { useFormatIntoFrenchDate } from "~/composables/useFormatIntoFrenchDate";
import { useCoordinates } from "@/composables/useCoordinates";
const centerMap: [number, number] = useCoordinates('babotte');

const fetchedPointData: Ref<[number, number]> = ref([0, 0]);
const client = prismic.createClient<AllDocumentTypes>('societe-astronomique-montpellier')
const { data: agenda, error } = useAsyncData(uid, async () => {
  const response = await client.getByUID<EventDocument>('event', uid, {lang: 'fr-fr'});
  fetchedPointData.value = [response.data.place_event.longitude, response.data.place_event.latitude]

  return response;
})

const markerCoordinates = computed(() => {
  return fetchedPointData.value[0] &&  fetchedPointData.value[1] ? fetchedPointData.value : centerMap
})

const richTextSerializer = useRichTextSerializer();
const startDate = useFormatIntoFrenchDate(agenda.value?.data.time_start, 'long');
const endDate = useFormatIntoFrenchDate(agenda.value?.data.time_end, 'long');

useHead({
  title: computed(() => `${agenda.value?.data.meta_title}`),
  meta: [
    { name: 'description', content: `${agenda.value?.data.meta_description}`}
  ],
})
</script>

<template>
  <section v-if="agenda">
    <div class="max-w-screen-xl w-full mx-auto relative"> <!-- max-w-screen-lg -->
      <div
        v-if="agenda.data.image_banner.url" class="bg-cover bg-center text-center overflow-hidden rounded"
        :style="`min-height: 650px; background-image: url(${agenda.data.image_banner.url }); background-color: bg-indigo-500` "
      >
      </div>
      <div class="max-w-3xl mx-auto">
        <div
            class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <h2 class="text-gray-900 font-bold text-4xl mb-2 font-raleway">{{ agenda.data.title }}</h2>

            <div class="my-8 grid gap-6 px-4">
              <prismic-rich-text
                  :field="agenda.data.resume"
                  :serializer="richTextSerializer"
              />
              <div class="flex items-center gap-4">
                <Icon size="24" name="material-symbols:calendar-clock" />
                <p class="block antialiased font-sans text-base leading-relaxed text-inherit ">
                  {{ startDate }}<span v-if="agenda.data.time_end"> au {{ endDate }}</span>
                </p>
              </div>

              <div class="flex items-center gap-4">
                <Icon size="24" name="hugeicons:image-composition" />
                <p class="block antialiased font-sans text-base leading-relaxed text-inherit ">{{ agenda.data.place_event_txt }}</p>
              </div>

              <div class="flex items-center gap-4" v-if="agenda.data.link">
                <Icon size="24" name="material-symbols:add-link" />
                <p class="block antialiased font-sans text-base leading-relaxed text-inherit ">
                  <prismic-link
                    :field="agenda.data.link"
                    class="text-indigo-400 inline-flex items-center mt-3"
                   >
                    Plus d'information
                    <Icon name="material-symbols:arrow-right-alt" />
                  </prismic-link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <pre>{{ markerCoordinates }}</pre>
      <Map
        v-if="agenda"
        :itemMarker="markerCoordinates"
      />
    </div>
  </section>
</template>

<style scoped>

</style>