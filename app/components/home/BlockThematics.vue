<script setup lang="ts">

import type {EventDocument, PageArticleDocument, PageThematiqueDocument} from "~~/prismicio-types";
import type {KeyTextField} from "@prismicio/client";

// -- Props
export interface Props {
  title: KeyTextField | undefined;
  subtitle: KeyTextField | undefined;
  items?: Array<PageThematiqueDocument | EventDocument | PageArticleDocument>;
}
const { title, subtitle, items } = defineProps<Props>()

// -- Components
const ThematicHomeCard = defineAsyncComponent(() => import('@/components/content/ThematicHomeCard.vue'))

</script>

<template>
  <section
    class="animate-scroll-reveal animate-scroll bg-slate-900 rounded-3xl p-8 sm:p-14 lg:p-20 space-y-16 border border-slate-800/60 shadow-xl"
  >
    <div class="space-y-4 pb-10 border-b border-slate-800">
      <span class="text-xs font-bold uppercase tracking-widest text-indigo-400">{{ subtitle }}</span>
      <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
        {{ title }}
      </h2>
    </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <ThematicHomeCard
          v-for="(item, index) in items"
          :key="index"
          :thematic="item"
        />
      </div>
    </section>
</template>

<style scoped>

</style>