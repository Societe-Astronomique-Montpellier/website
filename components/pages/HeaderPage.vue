<script setup lang="ts">
import type {ImageField} from "@prismicio/client";
import type {ComputedRef, Prop} from "vue";

export interface IProps {
  image?: ImageField<never> | undefined | null,
  imageStr?: string | undefined | null
}

const props = withDefaults(defineProps<IProps>(), {
  image: null,
  imageStr: null
})
const { image, imageStr } = toRefs(props);

const imageUrl: ComputedRef<null | string | undefined> = computed(() => (null !== image.value) ? image.value?.url : imageStr.value)
const alt: ComputedRef<string> = computed(() => image.value?.alt ?? '')
</script>

<template>
  <div
    class="bg-cover bg-center text-center overflow-hidden rounded"
    :style="`min-height: 450px; background-image: url(${ imageUrl }); background-color: bg-indigo-500` "
    :title="alt"
  >
  </div>
</template>

<style scoped>

</style>