<script setup lang="ts">
// https://tailwindflex.com/@ron-hicks/blog-page
// https://flowbite.com/blocks/publisher/blog-templates/
const prismic = usePrismic()

import type {
  AllDocumentTypes,
  PageArticleDocument,
  PageThematiqueDocument,
} from "~/prismicio-types";

const Breadcrumbs = defineAsyncComponent(() => import('@/components/Layouts/Breadcrumbs.vue'))
const HeaderPage = defineAsyncComponent(() => import('@/components/pages/HeaderPage.vue'))
const BlockListCards = defineAsyncComponent(() => import('~/components/home/BlockListCards.vue'))

definePageMeta({
  layout: 'page',
});
const route = useRoute();
const { uid } = route.params as { uid: string }

const { data: page_thematique, error} = await useAsyncData(
  uid,
  async () => {
    const response = await prismic.client.getByUID<PageThematiqueDocument>('page_thematique', uid)

    const articles = await prismic.client.getAllByType<AllDocumentTypes>('page_article', {
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
</script>

<template>
  <section v-if="page_thematique">
    <div class="max-w-screen-xl w-full mx-auto relative"> <!-- max-w-screen-lg -->
      <HeaderPage
        :image="page_thematique.thematic.data.image_banner"
      />
      <div class="max-w-screen-md mx-auto">
        <div
            class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <Breadcrumbs :listIds="[page_thematique.thematic.id]" />
            <h2 class="text-gray-900 font-bold text-4xl mb-2 font-raleway">{{ page_thematique.thematic.data.title }}</h2>
            <h3 class="text-gray-900 font-semibold text-2xl mb-2 leading-normal">{{ page_thematique.thematic.data.subtitle }}</h3>
            <prismic-rich-text
              :field="page_thematique.thematic.data.content"
              :serializer="richTextSerializer"
            />
            <p class="text-gray-700 text-xs mt-5">
              <span class="font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                Rédigé par {{ page_thematique.thematic.data.author }}
              </span> le
              <span class="font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                {{ formatedDate }}
              </span>
            </p>
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
