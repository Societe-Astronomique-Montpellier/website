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

import { useRichTextSerializer } from '@/composables/useRichTextSerializer'
const richTextSerializer = useRichTextSerializer();

// useHead({
//   title: computed(() => `${agenda.value.data.meta_title} | ${agenda.data.title}`),
//   meta: [
//     { name: 'description', content: `${agenda.value?.data.meta_description}`}
//   ],
// })
</script>

<template>
  <section v-if="agenda">
    <div class="max-w-screen-xl w-full mx-auto relative"> <!-- max-w-screen-lg -->
      <div class="bg-cover bg-center text-center overflow-hidden rounded"
           :style="`min-height: 650px; background-image: url(${agenda.data.image_banner.url }); background-color: bg-indigo-500` "
           title="Woman holding a mug">
      </div>
      <div class="max-w-3xl mx-auto">
        <div
            class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <h2 class="text-gray-900 font-bold text-4xl mb-2 font-raleway">{{ agenda.data.title }}</h2>
            <p class="text-gray-700 text-s mt-2">

              <span class="text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">

              </span> le
              <span
                  class="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                {{ agenda.last_publication_date }}
              </span>
            </p>

            <Icon size="24" name="material-symbols:person-edit-outline" /> {{ agenda.data.place_event }}
            <Icon size="24" name="material-symbols:person-edit-outline" /> {{ agenda.last_publication_date }}

            <prismic-rich-text
              :field="agenda.data.resume"
              :serializer="richTextSerializer"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>