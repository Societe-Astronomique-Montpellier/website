<script setup lang="ts">
import type { ImageField } from "@prismicio/client";
import type { ComputedRef } from "vue";
import defaultImg from "~/public/sam_babote_rs.webp";
import { isFilled } from "@prismicio/helpers";

const { isMobile } = useDevice();

export interface IProps {
  image?: ImageField<never> | undefined | null;
}

const props = withDefaults(defineProps<IProps>(), {
  image: null,
});
const { image } = toRefs(props);

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
    class="bg-cover bg-center text-center overflow-hidden rounded"
    :style="`min-height: ${minHeight}; background-image: url(${imageUrl}); background-color: bg-indigo-700`"
    :title="alt"
  ></div>
</template>

<style scoped></style>
