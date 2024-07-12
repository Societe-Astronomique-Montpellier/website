<script setup lang="ts">
import type {PageThematiqueDocument} from "@/prismicio-types";

export interface Props {
  item: PageThematiqueDocument
}

const props = defineProps<Props>()
const { item } = toRefs(props)
</script>

<template>
  <div class="rounded-lg h-64 overflow-hidden">
<!--    780*520-->
    <prismic-image v-if="item.data.image_vignette" :field="item.data.image_vignette" class="object-cover object-center h-full w-full" />
  </div>
  <h2 class="text-xl font-medium title-font text-white mt-5">{{ item.data.title }}</h2>
  <prismic-rich-text :field="item.data.resume" class="text-base leading-relaxed mt-2" />

  <NuxtLink
    class="text-indigo-400 inline-flex items-center mt-3"
    :to="item.uid"
  >
    Plus d'information
    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7"></path>
    </svg>
  </NuxtLink>
</template>

<style scoped>

</style>