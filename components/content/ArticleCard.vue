<script setup lang="ts">
import type {
  PageArticleDocument,
} from "~/prismicio-types";
import type { ImageField, KeyTextField } from "@prismicio/client";
import { isFilled } from "@prismicio/helpers";

export interface Props {
  item: PageArticleDocument;
}

const props = defineProps<Props>();
const { item } = toRefs(props);

const imageVignette = computed<ImageField>(
  () => item.value.data.image_vignette.vignette,
);

const title: ComputedRef<KeyTextField> = computed<KeyTextField>(() =>
  isFilled.keyText(item.value.data.title_vignette)
    ? item.value.data.title_vignette
    : item.value.data.title,
);
</script>

<template>
  <div
    v-show="item"
    class="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 rounded-md h-64 overflow-hidden"
  >
    <prismic-link :field="item" :aria-label="item.data.title">
      <div class="relative">
        <prismic-image
          v-if="imageVignette"
          :field="imageVignette"
          class="object-cover object-center h-full w-full"
          width="300"
          height="200"
          :aria-placeholder="[300, 200]"
          fit="cover"
          loading="lazy"
        />
        <h3
          class="mt-1 absolute inset-0 z-10 flex justify-center items-center text-xl text-white bg-gradient-to-t from-gray-900"
        >
          {{ title }}
        </h3>
      </div>
    </prismic-link>
  </div>
</template>
