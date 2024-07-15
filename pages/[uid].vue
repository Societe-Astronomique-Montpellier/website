<script setup lang="ts">
// https://tailwindflex.com/@ron-hicks/blog-page
// https://flowbite.com/blocks/publisher/blog-templates/

import * as prismic from "@prismicio/client";
import type {AllDocumentTypes, EventDocument, PageArticleDocument, PageThematiqueDocument} from "~/prismicio-types";

const BlockThematics = defineAsyncComponent(() => import('~/components/home/BlockListCards.vue'))

definePageMeta({
  layout: 'page',
});
const route = useRoute();
const { uid } = route.params as { uid: string }

const client = prismic.createClient<AllDocumentTypes>('societe-astronomique-montpellier')
// Page data
const { data: page_thematique, error} = await useAsyncData(
    uid,
    () => client.getByUID<PageThematiqueDocument>('page_thematique', uid)
)

// RichText serializer
import { useRichTextSerializer } from '@/composables/useRichTextSerializer'
const richTextSerializer = useRichTextSerializer();


// List articles
const articles = await client.getAllByType<AllDocumentTypes>('page_article', {
  orderings: {
    field: 'my.page_article.date_event',
    direction: 'desc'
  },
}) as PageArticleDocument[]


const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

const formatDate = (item: PageThematiqueDocument | null) => {
  const date = prismic.asDate(item?.last_publication_date || item?.first_publication_date)
  return dateFormatter.format(date || undefined)
}
</script>

<template>
  <section v-if="page_thematique">
    <div class="max-w-screen-lg w-full mx-auto relative">
      <div class="bg-cover bg-center text-center overflow-hidden rounded"
           :style="`min-height: 650px; background-image: url(${page_thematique.data.image_banner.url })`"
           title="Woman holding a mug">
      </div>
      <div class="max-w-3xl mx-auto">
        <div
            class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <h2 class="text-gray-900 font-bold text-4xl mb-2 font-raleway">{{ page_thematique.data.title }}</h2>
            <h3 class="text-gray-900 font-semibold text-2xl mb-2">{{ page_thematique.data.subtitle }}</h3>
            <p class="text-gray-700 text-xs mt-2">Écrit par:
              <a href="#"
                 class="text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                {{ page_thematique.data.author }}
              </a> le
              <span
                 class="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                {{ formatDate(page_thematique) }}
              </span>
            </p>

            <prismic-rich-text
              :field="page_thematique.data.content"
              :serializer="richTextSerializer"
            />

<!--            p => text-base leading-8 my-5-->
<!--            hx => text-2xl font-bold my-5-->
<!--            blockquote => border-l-4 text-base italic leading-8 my-5 p-5 text-indigo-600-->

          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
