<script setup lang="ts">
import type { NuxtError } from "#app";

export interface Props {
  error: NuxtError;
}

const props = defineProps<Props>();
const { error } = toRefs(props);

definePageMeta({
  layout: "error",
});
</script>

<template>
  <div class="w-full h-screen overflow-hidden relative">
    <div
      class="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-30 p-4"
    >
      <div class="inline-flex gap-10 my-5 md:flex-row">
        <h1>Errror {{ error?.statusCode }}</h1>
        <h2>{{ error?.statusMessage }}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
