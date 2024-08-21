<script setup lang="ts">
import { Fancybox as NativeFancybox } from '@fancyapps/ui'
import { onMounted, onUpdated, onUnmounted,  ref } from "vue"

export interface Props {
  options?: object
}
const props = defineProps<Props>()
const { options } = toRefs(props)

const container = ref(null);

onMounted(() => {
  const containerElement = container.value;
  NativeFancybox.bind(containerElement, '[data-fancybox]', {
    // ...(options || {})
  });
});

onUpdated(() => {
  const containerElement = container.value;
  NativeFancybox.unbind(containerElement);
  NativeFancybox.close();

  NativeFancybox.bind(containerElement, '[data-fancybox]', {
    // ...(options || {})
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

<style scoped>

</style>