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
  <section v-if="page_thematique">
    <div class="relative w-full h-96">
      
      <prismic-image v-if="page_thematique.data.image_banner" :field="page_thematique.data.image_banner" class="absolute h-full w-full object-cover object-center" />
      <div class="absolute inset-0 h-full w-full bg-black/50"></div>
      <div class="relative pt-28 text-center">
        <h2 class="block antialiased tracking-normal font-sans font-semibold leading-[1.3] text-white mb-4 text-3xl lg:text-4xl">{{ page_thematique.data.title }}</h2>
        <p class="block antialiased font-sans text-xl font-normal leading-relaxed text-white mb-9 opacity-70">{{ page_thematique.data.subtitle }}</p>
      </div>
    </div>
    <div class="-mt-16 mb-8 px-8 ">
      <div class="container mx-auto">

        <p class="text-gray-700 text-xs mt-2">Rédigé par :
          <span
              class="text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
              Laurent Outant
          </span> le 14/07/2024
        </p>        


        <div class="py-12 flex text-justify-center rounded-xl border border-white bg-white shadow-md shadow-black/5 saturate-200">

          <div class="my-8 grid gap-6 px-4">
            <div class="flex items-center border-t border-blueGray-200 leading-loose gap-4 mt-4">
              <prismic-rich-text :field="page_thematique.data.content" class="" />
            </div>
          </div>
          <div class="py-4">

          </div>
        </div>
      </div>
    </div>

<pre>{{ articles }}</pre>
    <BlockThematics
      titleBlock="Nos articles"
      :items="articles"
    />
    
  </section>



</template>

<style scoped>

</style>
