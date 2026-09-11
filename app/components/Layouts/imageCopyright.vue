<script setup lang="ts">
import type { ImageField } from "@prismicio/client";

export interface Props {
  image: ImageField<never> | undefined;
}
const props = defineProps<Props>();
const { image } = toRefs(props);
</script>

<template>
  <div  v-if="image"  class="rounded-xl overflow-hidden shadow-md bg-white p-2 border border-slate-200 transition-all duration-500 group-hover:shadow-xl group-hover:border-slate-300">
    <figure class="max-w-fit cursor-pointer">
      <prismic-image
          :field="image"
          class="transition duration-300 ease-in-out rounded shadow-md dark:shadow-black/30 hover:scale-105"
          :width="image.dimensions?.width"
          :height="image.dimensions?.height"
          loading="lazy"
      />

    </figure>
  </div>
  <figcaption
      v-if="image.alt || image.copyright"
      class="text-xs text-slate-500 text-center italic transition-colors duration-300 group-hover:text-slate-800"
  >
    <span v-if="image.alt">{{ image.alt }}&nbsp;</span>
    <span v-if="image.copyright"
    >&ndash;&nbsp;Photo &copy; {{ image.copyright }}</span
    >
  </figcaption>

</template>

<style scoped></style>
