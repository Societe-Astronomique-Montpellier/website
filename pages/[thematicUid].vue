<script setup lang="ts">
// https://tailwindflex.com/@ron-hicks/blog-page
// https://flowbite.com/blocks/publisher/blog-templates/

import * as prismic from "@prismicio/client";
import type {
  AllDocumentTypes,
  PageArticleDocument,
  PageThematiqueDocument,
} from "~/prismicio-types";

const BlockListCards = defineAsyncComponent(() => import('~/components/home/BlockListCards.vue'))

definePageMeta({
  layout: 'page',
});
const route = useRoute();
const { thematicUid } = route.params as { thematicUid: string }

const client = prismic.createClient<AllDocumentTypes>('societe-astronomique-montpellier');
const { data: page_thematique, error} = await useAsyncData(
    thematicUid,
    async () => {
      const response = await client.getByUID<PageThematiqueDocument>('page_thematique', thematicUid)

      const articles = await client.getAllByType<AllDocumentTypes>('page_article', {
        filters: [
          // prismic.filter.at('document.type', 'page_thematique'),
          prismic.filter.at('my.page_article.thematic', response.id)
        ],
        orderings: {
          field: 'my.page_article.date_modification',
          direction: 'desc'
        },
      }) as PageArticleDocument[]

      return {
        thematic: response,
        publication_date: response.last_publication_date ?? response.first_publication_date,
        articles: articles
      };
    }
)

useHead({
  title: computed(() => `${page_thematique.value?.thematic.data.meta_title} | ${page_thematique.value?.thematic.data.title}`),
  meta: [
    { name: 'description', content: `${page_thematique.value?.thematic.data.meta_description}`}
  ],
})

// RichText serializer
import { useRichTextSerializer } from '@/composables/useRichTextSerializer'
const richTextSerializer = useRichTextSerializer();

import { useFormatIntoFrenchDate } from "@/composables/useFormatIntoFrenchDate";
const formatedDate = useFormatIntoFrenchDate(page_thematique.value?.publication_date, 'short');
/**
 * TODO : move into composables
 */


// const formatDate = (date) => {
//   const date = prismic.asDate(date)
//   return dateFormatter.format(date || undefined)
// }
</script>

<template>
  <section v-if="page_thematique">
    <div class="max-w-screen-xl w-full mx-auto relative"> <!-- max-w-screen-lg -->
      <div class="bg-cover bg-center text-center overflow-hidden rounded"
           :style="`min-height: 650px; background-image: url(${page_thematique.thematic.data.image_banner.url }); background-color: bg-indigo-500` "
           :title="page_thematique.thematic.data.image_banner.alt ?? ''">
      </div>
      <div class="max-w-3xl mx-auto">
        <div
            class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <h2 class="text-gray-900 font-bold text-4xl mb-2 font-raleway">{{ page_thematique.thematic.data.title }}</h2>
            <h3 class="text-gray-900 font-semibold text-2xl mb-2 leading-normal">{{ page_thematique.thematic.data.subtitle }}</h3>
            <p class="text-gray-700 text-s mt-2">

              <span class="text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                <Icon size="24" name="material-symbols:person-edit-outline" /> {{ page_thematique.thematic.data.author }}
              </span> le
              <span
                 class="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                {{ formatedDate }}
              </span>
            </p>

            <prismic-rich-text
              :field="page_thematique.thematic.data.content"
              :serializer="richTextSerializer"
            />

<!--            p => text-base leading-8 my-5-->
<!--            hx => text-2xl font-bold my-5-->
<!--            blockquote => border-l-4 text-base italic leading-8 my-5 p-5 text-indigo-600-->
          </div>
        </div>
      </div>

      <BlockListCards
        v-if="page_thematique.articles"
        title-block="En savoir plus"
        :items="page_thematique.articles"
        :parentItem="page_thematique.thematic"
      />
    </div>
  </section>
</template>

<style scoped>

</style>
