<script setup lang="ts">
// https://tailwindflex.com/@ron-hicks/blog-page
// https://flowbite.com/blocks/publisher/blog-templates/

import * as prismic from "@prismicio/client";
import type {AllDocumentTypes, EventDocument, PageArticleDocument, PageThematiqueDocument} from "~/prismicio-types";
import BlockListCards from "~/components/home/BlockListCards.vue";

definePageMeta({
  layout: 'page',
});
const route = useRoute();
const { uid } = route.params as { uid: string }

const client = prismic.createClient<AllDocumentTypes>('societe-astronomique-montpellier')

const { data: page_thematique, error} = await useAsyncData(
    uid,
    () => client.getByUID<PageThematiqueDocument>('page_thematique', uid)
)

const articles = await client.getAllByType<AllDocumentTypes>('page_article', {
  orderings: {
    field: 'my.page_article.date_event',
    direction: 'desc'
  },
}) as PageArticleDocument[]
// query {
//   allArticles(where: {category:"XniT7xIAACgAk6zG"}) {
//     totalCount
//   }
// }
</script>

<template>
  <div v-if="page_thematique">
    <div class="max-w-screen-xl mx-auto sm:p-10 md:p-16 relative">
      <div class="relative h-[400px] overflow-hidden rounded-lg bg-cover bg-center text-center"
           :style="`min-height: 500px; background-image: url(${page_thematique.data.image_banner.url})`"
           title="Woman holding a mug"
      >
        <div class="flex h-full text-white">
          <h1 class="text-3xl mb-2 font-semibold">{{ page_thematique.data.title }}</h1>
        </div>
      </div>
      <div class="max-w-3xl mx-auto">
        <div
            class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
<!--            <h1 href="#" class="text-gray-900 font-bold text-3xl mb-2">{{ page_thematique.data.title }}</h1>-->
            <p class="text-gray-700 text-xs mt-2">Par&nbsp;
              <a href="#"
                 class="text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                {{ page_thematique.data.author }}
              </a> In
              <span>{{ page_thematique.last_publication_date }}</span>
            </p>

            <prismic-rich-text :field="page_thematique.data.content" class="text-base leading-8 my-5" />

<!--            <a href="#"-->
<!--               class="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">-->
<!--              #Election-->
<!--            </a>,-->
<!--            <a href="#"-->
<!--               class="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">-->
<!--              #people-->
<!--            </a>,-->
<!--            <a href="#"-->
<!--               class="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">-->
<!--              #Election2020-->
<!--            </a>,-->
<!--            <a href="#"-->
<!--               class="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">-->
<!--              #trump-->
<!--            </a>,<a href="#"-->
<!--                    class="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">-->
<!--            #Joe-->
<!--          </a>-->
          </div>
        </div>
      </div>

      <BlockListCards
        title-block="Articles"
        :items="articles"
      />
    </div>
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>
</template>

<style scoped>

</style>