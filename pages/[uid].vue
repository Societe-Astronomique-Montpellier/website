<script setup lang="ts">
// https://tailwindflex.com/@ron-hicks/blog-page
// https://flowbite.com/blocks/publisher/blog-templates/
const runtimeConfig = useRuntimeConfig()
import * as prismic from "@prismicio/client";
import type {
  AllDocumentTypes,
  EventDocument,
  PageArticleDocument,
  PageThematiqueDocument,
  PageThematiqueDocumentData
} from "~/prismicio-types";

const BlockListCards = defineAsyncComponent(() => import('~/components/home/BlockListCards.vue'))

definePageMeta({
  layout: 'page',
});
const route = useRoute();
const { uid } = route.params as { uid: string }

const client = prismic.createClient<AllDocumentTypes>('societe-astronomique-montpellier');
// const { client } = usePrismic();
// Page data
const { data: page_thematique, error} = await useAsyncData(
    uid,
    async () => {
      const response = await client.getByUID<PageThematiqueDocument>('page_thematique', uid)

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
        data: response.data,
        publication_date: response.last_publication_date ?? response.first_publication_date,
        articles: articles
      };
    }
)

// List articles


useHead({
  title: computed(() => `${page_thematique.value?.data.meta_title} | ${page_thematique.value?.data.title}`),
  meta: [
    { name: 'description', content: `${page_thematique.value?.data.meta_description}`}
  ],
})

// RichText serializer
import { useRichTextSerializer } from '@/composables/useRichTextSerializer'
const richTextSerializer = useRichTextSerializer();

/**
 * TODO : move into composables
 */
const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

// const formatDate = (date) => {
//   const date = prismic.asDate(date)
//   return dateFormatter.format(date || undefined)
// }
</script>

<template>
  <section v-if="page_thematique">
    <div class="max-w-screen-xl w-full mx-auto relative"> <!-- max-w-screen-lg -->
      <div class="bg-cover bg-center text-center overflow-hidden rounded"
           :style="`min-height: 650px; background-image: url(${page_thematique.data.image_banner.url }); background-color: bg-indigo-500` "
           title="Woman holding a mug">
      </div>
      <div class="max-w-3xl mx-auto">
        <div
            class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <h2 class="text-gray-900 font-bold text-4xl mb-2 font-raleway">{{ page_thematique.data.title }}</h2>
            <h3 class="text-gray-900 font-semibold text-2xl mb-2 leading-normal">{{ page_thematique.data.subtitle }}</h3>
            <p class="text-gray-700 text-s mt-2">

              <span class="text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                <Icon size="24" name="material-symbols:person-edit-outline" /> {{ page_thematique.data.author }}
              </span> le
              <span
                 class="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                {{ page_thematique.publication_date }}
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

      <span v-for="(item, index) in page_thematique.articles" :key="index">
        {{ item}}
      </span>

      <BlockListCards
        v-if="page_thematique.articles"
        title-block="En savoir plus"
        :items="page_thematique.articles"
      />
    </div>
  </section>
</template>

<style scoped>

</style>
