<script setup lang="ts">
import type { SearchDocumentType } from "~/types/search";
const { t } = useI18n();

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
    {{ $t("search.show_result", nbItems as number) }}
  </p>
  <div
    class="p-4 rounded-md transition-colors duration-200"
  >
    <div v-for="(item, index) in items" :key="index">
      <component :is="getResultComponent(item.type)" v-if="item" :item="item" />
    </div>
  </div>
</template>

<style scoped></style>
