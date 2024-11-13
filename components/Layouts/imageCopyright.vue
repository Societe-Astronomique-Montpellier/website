<script setup lang="ts">
import type { ImageField } from "@prismicio/client";

export interface Props {
  image: ImageField<never> | undefined;
}
const props = defineProps<Props>();
const { image } = toRefs(props);
</script>

<template>
  <figure v-if="image" class="max-w-fit cursor-pointer">
    <prismic-image
      :field="image"
      class="transition duration-300 ease-in-out rounded shadow-md dark:shadow-black/30 hover:scale-105"
      :width="image.dimensions?.width"
      :height="image.dimensions?.height"
      loading="lazy"
    />
    <figcaption
      v-if="image.alt || image.copyright"
      class="mt-2 italic text-sm text-gray-500"
    >
      <span v-if="image.alt">{{ image.alt }}&nbsp;</span>
      <span v-if="image.copyright"
        >&ndash;&nbsp;Photo &copy; {{ image.copyright }}</span
      >
    </figcaption>
  </figure>
</template>

<style scoped></style>
