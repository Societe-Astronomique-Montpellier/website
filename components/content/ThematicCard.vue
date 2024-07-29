<script setup lang="ts">
import type {PageThematiqueDocument} from "@/prismicio-types";

export interface Props {
  item: PageThematiqueDocument
}

const props = defineProps<Props>()
const { item } = toRefs(props)

import { useRichTextSerializer } from '@/composables/useRichTextSerializer'
const richTextSerializer = useRichTextSerializer();

</script>

<template>
  <div v-if="item" class="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 h-64 overflow-hidden">
<!--    780*520-->
    <prismic-link
      :field="item"
    >
      <prismic-image v-if="item.data.image_vignette" :field="item.data.image_vignette" class="object-cover object-center h-full w-full" />
    </prismic-link>
  </div>
  <h2 class="text-xl font-medium title-font text-white mt-5">{{ item.data.title }}</h2>
  <prismic-rich-text
    :field="item.data.resume"
    :serializer="richTextSerializer"
  />

  <prismic-link
    class="text-indigo-400 inline-flex items-center mt-3"
    :field="item"
  >
    Plus d'information&nbsp;<Icon name="material-symbols:arrow-right-alt" size="20" />
  </prismic-link>
</template>

<style scoped>

</style>
