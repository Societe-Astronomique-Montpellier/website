<script setup lang="ts">
import * as prismic from "@prismicio/client";
import type {AllDocumentTypes, EventDocument, EventsDocument} from "~/prismicio-types";
import type {PrismicDocument} from "@prismicio/types";

definePageMeta({
  layout: 'page',
});

const BlockListCards = defineAsyncComponent(() => import('@/components/home/BlockListCards.vue'))

const dateNow: Ref<string> = ref(new Date().toISOString().split('T')[0]);
const client = prismic.createClient<AllDocumentTypes>('societe-astronomique-montpellier')
const { data: list_events, error } = useAsyncData(
    'list_events',
    async () => {
      const agenda = await client.getSingle('events', {lang: 'fr-fr'}) as EventsDocument

      const futurEvents = await client.getAllByType<AllDocumentTypes>('event', {
        lang: 'fr-fr',
        filters: [
          prismic.filter.dateAfter('my.event.time_start', dateNow.value),
        ],
        orderings: {
          field: 'my.event.time_start',
          direction: 'asc'
        }
      }) as EventDocument[]

      const pastEvents = await client.getAllByType<AllDocumentTypes>('event', {
        lang: 'fr-fr',
        filters: [ prismic.filter.dateBefore('my.event.time_start', dateNow.value) ],
        orderings: {
          field: 'my.event.time_start',
          direction: 'desc'
        }
      }) as EventDocument[]

      return {
        agenda: agenda,
        next: futurEvents,
        past: pastEvents
      }
  }
)

import { useRichTextSerializer } from '@/composables/useRichTextSerializer'
const richTextSerializer = useRichTextSerializer();

useHead({
  title: computed(() => `${list_events.value?.agenda.data.meta_title} | ${list_events.value?.agenda.data.title}`),
  meta: [
    { name: 'description', content: `${list_events.value?.agenda.data.meta_title}`}
  ],
})
</script>

<template>
  <section>
    <div class="max-w-screen-xl w-full mx-auto relative">
      <div class="bg-cover bg-center text-center overflow-hidden rounded"
           :style="`min-height: 650px; background-image: url(${list_events?.agenda.data.image_banner.url }); background-color: bg-indigo-500` "
           title="Woman holding a mug">
      </div>
      <div class="max-w-3xl mx-auto">
        <div
            class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <h2 class="text-gray-900 font-bold text-4xl mb-2 font-raleway">{{ list_events?.agenda.data.title }}</h2>
          </div>

          <prismic-rich-text
            :field="list_events?.agenda.data.content"
            :serializer="richTextSerializer"
          />
        </div>
      </div>

      <BlockListCards
        title-block="Evenements à venir"
        :items="list_events?.next"
        :parentItem="list_events?.agenda"
      />

      <BlockListCards
        title-block="Evenements passés"
        :items="list_events?.past"
        :parentItem="list_events?.agenda"
      />
    </div>
  </section>
</template>

<style scoped>

</style>