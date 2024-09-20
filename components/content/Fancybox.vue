<script setup lang="ts">
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import { onMounted, onUpdated, onUnmounted, ref } from "vue";

export interface Props {
  isCaroussel?: boolean | undefined;
}
const props = withDefaults(defineProps<Props>(), {
  isCaroussel: false,
});
const { isCaroussel } = toRefs(props);

const container = ref(null);

onMounted(() => {
  const containerElement = container.value;
  NativeFancybox.bind(containerElement, "[data-fancybox]", {
    Carousel: { infinite: isCaroussel.value },
    groupAll: isCaroussel.value,
  });
});

onUpdated(() => {
  const containerElement = container.value;
  NativeFancybox.unbind(containerElement);
  NativeFancybox.close();

  NativeFancybox.bind(containerElement, "[data-fancybox]", {
    Carousel: { infinite: isCaroussel.value },
    groupAll: isCaroussel.value,
  });
});

onUnmounted(() => {
  NativeFancybox.destroy();
});
</script>

<template>
  <div ref="container">
    <slot></slot>
  </div>
</template>

<style scoped></style>
