<script setup lang="ts">
import type {PageArticleDocument, PageThematiqueDocument} from "~/prismicio-types";

export interface Props {
  item: PageArticleDocument
  parentItem: PageThematiqueDocument
}

const props = defineProps<Props>()
const { item, parentItem } = toRefs(props)
</script>

<template>
  <!-- component -->
  <div class="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 rounded-lg h-64 overflow-hidden">
    <prismic-link
      v-if="item"
      class="transition duration-300 ease-in-out"
      :field="item"
    >
      <article class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto">
        <prismic-image v-if="item.data.image_banner.id" :field="item.data.image_banner" class="absolute bg-cover inset-0 h-full w-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
        <h4 class="z-10 gap-y-1 overflow-hidden mt-3 text-2xl leading-6 text-gray-300">{{ item.data.title }}</h4>
      </article>
    </prismic-link>
  </div>
</template>
