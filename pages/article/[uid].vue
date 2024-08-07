<script setup lang="ts">
import {useSeo} from "~/composables/useSeo";
import {isFilled} from "@prismicio/helpers";
import type { PageArticleDocument } from "~/prismicio-types";

const prismic = usePrismic();

const HeaderPage = defineAsyncComponent(() => import('@/components/pages/HeaderPage.vue'))

definePageMeta({
  layout: 'page',
});

const route = useRoute();
const { thematic, uid } = route.params as { thematic: string, uid: string }

const { data: article, error} = useAsyncData(
    uid,
    async () => await prismic.client.getByUID<PageArticleDocument>('page_article', uid)
)

import { useRichTextSerializer } from '@/composables/useRichTextSerializer'
const richTextSerializer = useRichTextSerializer();
import { useFormatIntoFrenchDate } from "@/composables/useFormatIntoFrenchDate";
import type {ComputedRef} from "vue";
const formatedDate = useFormatIntoFrenchDate(article.value?.last_publication_date, 'short');

const metaTitle: ComputedRef<string> = computed<string>(() => (isFilled.keyText(article.value?.data.meta_title)) ? `${article.value?.data.meta_title}` : `${article.value?.data.title}`);
const metaDescription: ComputedRef<string> = computed<string>(() => `${article.value?.data.meta_description}`);
const metaImage: ComputedRef<string> = computed<string>(() => (isFilled.image(article.value?.data.meta_image)) ? `${article.value?.data.meta_image.url}` : `${article.value?.data.image_banner.url}`)

useSeo({
  title: `${metaTitle.value}`,
  description: `${metaDescription.value}`,
  image: `${metaImage.value}`,
  imageAlt: `${article.value?.data.meta_image.alt}`,
})
</script>

<template>
  <div class="max-w-screen-lg w-full mx-auto relative" v-if="article">
    <HeaderPage
      :image="article.data.image_banner"
    />
    <div class="max-w-3xl mx-auto">
      <div
          class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
        <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
          <h1 class="text-gray-900 font-bold text-4xl mb-2">{{ article?.data.title }}</h1>
          <h2 class="text-gray-900 font-semibold text-2xl mb-2">{{ article?.data.subtitle }}</h2>

          <prismic-rich-text
            :field="article.data.content"
            :serializer="richTextSerializer"
          ></prismic-rich-text>

          <p class="text-gray-700 text-xs mt-5">
            <span class="font-medium hover:text-gray-900 transition duration-500 ease-in-out">
              {{ $t('page.author') }} {{ article.data.author }}
            </span> le
            <span class="font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                {{ formatedDate }}
              </span>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>