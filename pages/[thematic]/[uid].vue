<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
import * as prismic from "@prismicio/client";
import type {AllDocumentTypes, PageArticleDocument} from "~/prismicio-types";

definePageMeta({
  layout: 'page',
});
const route = useRoute();
const { thematic, uid } = route.params as { thematic: string, uid: string }

const client = prismic.createClient<AllDocumentTypes>('societe-astronomique-montpellier')
const { data: article, error} = await useAsyncData(
    uid,
    () => client.getByUID<PageArticleDocument>('page_article', uid)
)

import { useRichTextSerializer } from '@/composables/useRichTextSerializer'
const richTextSerializer = useRichTextSerializer();
</script>

<template>
  <div class="max-w-screen-lg w-full mx-auto relative" v-if="article">
    <div class="bg-cover bg-center text-center overflow-hidden rounded"
         :style="`min-height: 650px; background-image: url(${article.data.image_banner.url }); background-color: bg-indigo-500` "
         title="">
    </div>
    <div class="max-w-3xl mx-auto">
      <div
          class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
        <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
          <h2 class="text-gray-900 font-bold text-4xl mb-2">{{ article?.data.title }}</h2>
          <h3 class="text-gray-900 font-semibold text-2xl mb-2">{{ article?.data.subtitle }}</h3>
          <p class="text-gray-700 text-xs mt-5">Écrit par:
            <a href="#"
               class="text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
              {{ article.data.author }}
            </a> le
            <a href="#"
               class="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
              14/07/2024
            </a>,
          </p>

          <prismic-rich-text
            :field="article.data.content"
            :serializer="richTextSerializer"
          ></prismic-rich-text>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>