<script setup lang="ts">
import type { PageThematiqueDocument } from "@/prismicio-types";
import { useRichTextSerializer } from "@/composables/useRichTextSerializer";
import type { ImageField } from "@prismicio/client";
import type {
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/types";

const { isMobile } = useDevice();

export interface Props {
  item: PageThematiqueDocument;
}

const props = defineProps<Props>();
const { item } = toRefs(props);

const richTextSerializer = useRichTextSerializer();
const imageVignette = computed<
  ImageField | FilledImageFieldImage | EmptyImageFieldImage
>(() => item.value.data.image_vignette.vignette);
</script>

<template>
  <div
    v-show="item"
    class="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 rounded-md h-64 overflow-hidden"
  >
    <!--    780*520-->
    <prismic-link :field="item" :aria-label="item.data.title">
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
    </prismic-link>
  </div>

  <h3 class="z-10 gap-y-1 overflow-hidden mt-4 text-2xl leading-6 text-white">
    {{ item.data.title }}
  </h3>
  <prismic-rich-text
    :field="item.data.resume"
    :serializer="richTextSerializer"
    class="text-gray-400"
  />

  <div class="flex flex-wrap items-baseline">
    <prismic-link
      class="text-indigo-400 inline-flex items-center mt-3"
      :field="item"
      :aria-label="item.data.title"
    >
      {{ $t("layout.moreInfo") }}&nbsp;<Icon
        name="material-symbols:arrow-right-alt"
        size="20"
      />
    </prismic-link>
  </div>
</template>
