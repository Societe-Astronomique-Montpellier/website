<script setup lang="ts">
import Breadcrumbs from "~/components/Layouts/Breadcrumbs.vue";

const prismic = usePrismic();
const { t } = useI18n();
import type {AllDocumentTypes, EventDocument, EventsDocument} from "~/prismicio-types";

definePageMeta({
  layout: 'page',
});

const HeaderPage = defineAsyncComponent(() => import('@/components/pages/HeaderPage.vue'))
const BlockListCards = defineAsyncComponent(() => import('@/components/home/BlockListCards.vue'))
const dateNow: Ref<string> = ref(new Date().toISOString().split('T')[0]);

const { data: list_events, error } = useAsyncData(
    'list_events',
    async () => {
      const agenda = await prismic.client.getSingle('events', {lang: 'fr-fr'}) as EventsDocument

      const futurEvents = await prismic.client.getAllByType<AllDocumentTypes>('event', {
        lang: 'fr-fr',
        filters: [
          prismic.filter.dateAfter('my.event.time_start', dateNow.value),
        ],
        orderings: {
          field: 'my.event.time_start',
          direction: 'asc'
        }
      }) as EventDocument[]

      const pastEvents = await prismic.client.getAllByType<AllDocumentTypes>('event', {
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
import {useSeo} from "~/composables/useSeo";
const richTextSerializer = useRichTextSerializer();

const titleBlockNext = computed<string>(() => t('agenda.titleBlockNext'))
const titleBlockPast = computed<string>(() => t('agenda.titleBlockPast'))

useSeo({
  title: `${list_events.value?.agenda.data.meta_title}`,
  description: `${list_events.value?.agenda.data.meta_title}`,
  canonicalUrl: `${process.env.BASE_URL}/${list_events.value?.agenda.uid}`,
  image: `${list_events.value?.agenda.data.meta_image.url}`,
  imageAlt: `${list_events.value?.agenda.data.meta_image.alt}`
})
</script>

<template>
  <section v-if="list_events">
    <div class="max-w-screen-xl w-full mx-auto relative mb-2">
      <HeaderPage
       :image="list_events?.agenda.data.image_banner"
      />
      <div class="max-w-3xl mx-auto">
        <div
          class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <Breadcrumbs v-if="list_events" :listIds="[list_events.agenda.id]" :currentUid="list_events.agenda.uid" />
            <h2 class="text-gray-900 font-bold text-4xl mb-2 font-raleway">{{ list_events?.agenda.data.title }}</h2>
            <div class="my-8 grid gap-6 px-4">
              <prismic-rich-text
                  :field="list_events?.agenda.data.content"
                  :serializer="richTextSerializer"
              />
            </div>
          </div>
        </div>
      </div>

      <BlockListCards
        :title-block="titleBlockNext"
        :items="list_events?.next"
        :parentItem="list_events?.agenda"
      />

      <BlockListCards
        :title-block="titleBlockPast"
        :items="list_events?.past"
        :parentItem="list_events?.agenda"
      />
    </div>
  </section>
</template>

<style scoped>

</style>