<script setup lang="ts">
// https://tailwindcomponents.com/component/content-2
import type {
  EventDocument,
  PageArticleDocument,
  PageThematiqueDocument,
} from "~~/prismicio-types";
import type { KeyTextField } from "@prismicio/client";

import { useDynamicCardComponent } from "~/composables/useDynamicCardComponent.ts";

export interface Props {
  titleBlock: KeyTextField | undefined;
  contentBlock?: KeyTextField | undefined;
  items?: Array<PageThematiqueDocument | EventDocument | PageArticleDocument>;
}

const props = defineProps<Props>();
const { items } = toRefs(props);
const { getComponent } = useDynamicCardComponent();
</script>

<template>

  <section class="mt-12 pt-10 border-t border-slate-200 dark:border-slate-800">
    <!-- En-tête de section -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h3 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {{ titleBlock }}
        </h3>
      </div>
      <span class="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
      {{ items?.length }} thèmes
    </span>
    </div>

    <!-- Grille de sous-pages (Cartes) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Exemple de carte d'un sous-thème (à boucler avec v-for="child in children") -->
      <article
        v-for="(item, index) in items"
        :key="index"
        class="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all duration-200"
      >
        <component :is="getComponent(item.type)" v-if="item" :item="item" />
      </article>
      <slot name="content-block-bottom"></slot>
    </div>
  </section>
</template>

<style scoped></style>
