<script setup lang="ts">

import type {BlockTestimonialDocument, BlockTestimonialDocumentData} from "~/prismicio-types";

export interface Props {
  block: any
}
const props = defineProps<Props>()
const { block } = toRefs(props)

</script>

<template>
  <!--Background-->
  <div class="mx-auto text-center md:max-w-xl lg:max-w-3xl " v-if="block">
    <h3 class="mb-6 text-3xl font-bold">{{ block.data.title }}</h3>
    <div
        class="mb-6 pb-2 text-neutral-600 dark:text-neutral-300 md:mb-12 md:pb-0">
      <prismic-rich-text :field="block.data.content" />
    </div>
  </div>

  <div class="grid gap-6 text-center md:grid-cols-3 lg:gap-12 bg-gray-600">
    <div class="mb-12 md:mb-0">
      <div class="mb-6 flex justify-center">
<!--        <prismic-image-->
<!--          :field="block.data.testimonial_vignette_1"-->
<!--          class="w-32 rounded-full shadow-lg dark:shadow-black/30"-->
<!--        />-->
      </div>
      <p class="mb-4 text-neutral-600 dark:text-neutral-300">
        {{ block.data.testimonial_text_1 }}
      </p>
    </div>
    <div class="mb-12 md:mb-0">
      <div class="mb-6 flex justify-center">
<!--        <prismic-image-->
<!--          :field="block.data.testimonial_vignette_3"-->
<!--          class="w-32 rounded-full shadow-lg dark:shadow-black/30"-->
<!--        />-->
      </div>
      <p class="mb-4 text-neutral-600 dark:text-neutral-300">
<!--        <prismic-text :field="block.data.testimonial_text_2" />-->
        {{ block.data.testimonial_text_2 }}
      </p>
    </div>
    <div class="mb-0">
      <div class="mb-6 flex justify-center">
<!--        <prismic-image-->
<!--          :field="block.data.testimonial_vignette_3"-->
<!--          class="w-32 rounded-full shadow-lg dark:shadow-black/30"-->
<!--        />-->
      </div>
      <p class="mb-4 text-neutral-600 dark:text-neutral-300">
<!--        <prismic-text :field="block.data.testimonial_text_3" />-->
        {{ block.data.testimonial_text_3 }}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
