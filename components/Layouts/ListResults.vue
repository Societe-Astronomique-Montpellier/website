<script setup lang="ts">
import type { SearchDocumentType } from "~/types/search";

export interface Props {
  nbItems?: number;
  items?: Array<SearchDocumentType>;
}

const props = defineProps<Props>();
const { nbItems, items } = toRefs(props);
const { getResultComponent } = useDynamicResultComponent();
</script>

<template>
  <p class="text-justify text-base leading-8 mt-2 my-2 dark:text-slate-400">
    {{ nbItems }} résultats trouvés:
  </p>
  <div class="relative flex flex-col bg-white dark:bg-slate-900 shadow-sm">
    <nav class="flex min-w-[240px] flex-col gap-1 p-1.5">
      <div v-for="(item, index) in items" :key="index">
        <component
          :is="getResultComponent(item.type)"
          v-if="item"
          :item="item"
        />
      </div>
    </nav>
  </div>
</template>

<style scoped>
</style>