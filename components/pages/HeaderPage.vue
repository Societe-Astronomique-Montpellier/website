<script setup lang="ts">
import type {ImageField} from "@prismicio/client";
import type {Prop} from "vue";

export interface IProps {
  image: ImageField<never> | undefined
}
const props = defineProps<IProps>()
const { image } = toRefs(props);

const alt: ComputedRef<string> = computed(() => image.value?.alt ?? '')
</script>

<template>
  <div
    class="bg-cover bg-center text-center overflow-hidden rounded"
    :style="`min-height: 650px; background-image: url(${ image.url }); background-color: bg-indigo-500` "
    :title="alt"
    v-if="image"
  >
  </div>
</template>

<style scoped>

</style>