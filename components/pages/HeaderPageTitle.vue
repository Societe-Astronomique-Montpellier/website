<script setup lang="ts">
import type { ImageField, KeyTextField } from "@prismicio/client";
import type { ComputedRef } from "vue";
import defaultImg from "public/sam_babote_rs.webp";
import { isFilled } from "@prismicio/helpers";

const { isMobile } = useDevice();

export interface IProps {
  title?: KeyTextField | undefined;
  image?: ImageField<never> | undefined | null;
}

const props = withDefaults(defineProps<IProps>(), {
  title: null,
  image: null,
});
const { title, image } = toRefs(props);

const imageUrl: ComputedRef<null | string | undefined> = computed(() =>
  isFilled.image(image.value) ? image.value?.url : defaultImg,
);
const minHeight: ComputedRef<string> = computed<string>(() =>
  isMobile ? "350px" : "450px",
);
const alt: ComputedRef<string> = computed(() => image.value?.alt ?? "");
</script>

<template>
  <div
    class="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded"
    :style="`min-height: ${minHeight}; background-image: url(${imageUrl}); background-color: bg-indigo-700`"
    :title="alt"
  >
    <div v-if="title" class="flex p-4">
      <h1
        class="text-white tracking-light text-4xl font-bold leading-tight"
        :aria-label="title"
      >
        {{ title }}
      </h1>
    </div>
  </div>
</template>

<style scoped></style>
