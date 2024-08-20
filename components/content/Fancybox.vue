<script setup lang="ts">
import { Fancybox as NativeFancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox.css'
import { onMounted, onUpdated, onUnmounted,  ref } from "vue"

export interface Props {
  options?: object
}
const props = defineProps<Props>()
const { options } = toRefs(props)

const container = ref();

onMounted(() => {
  NativeFancybox.bind(container.value, '[data-fancybox]', {
    // ...(options || {})
  });
});

onUpdated(() => {
  NativeFancybox.unbind(container.value);
  NativeFancybox.close();

  NativeFancybox.bind(container.value, '[data-fancybox]', {
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