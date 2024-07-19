<script setup lang="ts">
import * as prismic from "@prismicio/client";
import type {AllDocumentTypes, EventDocument} from "~/prismicio-types";

definePageMeta({
  layout: 'page',
});

const route = useRoute();
const { uid } = route.params as { uid: string }

const client = prismic.createClient<AllDocumentTypes>('societe-astronomique-montpellier')
const { data: agenda, error } = useAsyncData(uid, async () => await client.getByUID<EventDocument>('event', uid, {lang: 'fr-fr'}))
const markerCoord: [number, number] = [agenda.value?.data.place_event.longitude as number, agenda.value?.data.place_event.latitude as number]

const Map = defineAsyncComponent(() => import('@/components/content/Map.vue'));

import { useRichTextSerializer } from '@/composables/useRichTextSerializer'
import { useFormatIntoFrenchDate } from "~/composables/useFormatIntoFrenchDate";


const richTextSerializer = useRichTextSerializer();
const formatedDate = useFormatIntoFrenchDate(agenda.value?.data.time_start);

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
                <p class="block antialiased font-sans text-base leading-relaxed text-inherit ">{{ formatedDate }}</p>
              </div>

              <div class="flex items-center gap-4">
                <Icon size="24" name="hugeicons:image-composition" />
                <p class="block antialiased font-sans text-base leading-relaxed text-inherit ">{{ agenda.data.place_event_txt }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <client-only>
        <Map
          :marker="markerCoord"
        />
      </client-only>
    </div>
  </section>
</template>

<style scoped>

</style>