<script setup lang="ts">
import type {KeyTextField} from "@prismicio/client";
import type {EventDocument} from "~~/prismicio-types";
import EventHomeCard from "~/components/content/EventHomeCard.vue";

const { t } = useI18n()

interface Props {
  titleBlock: KeyTextField,
  subTitleBlock: KeyTextField,
  items: EventDocument[]
}

const { titleBlock, subTitleBlock, items } = defineProps<Props>()
</script>

<template>
  <section
      id="agenda"
      class="animate-scroll-reveal animate-scroll bg-slate-900 rounded-3xl p-8 sm:p-14 lg:p-20 space-y-12 border border-slate-800/60 shadow-xl"
  >
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-slate-800">
      <div class="space-y-3">
        <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {{  titleBlock }}
        </h2>
        <p class="text-slate-400 text-sm sm:text-base leading-relaxed">
          {{ subTitleBlock }}
        </p>
      </div>

      <NuxtLink
        to="agenda"
        class="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors duration-300 shrink-0 group"
      >
        <span>{{ t('agenda.link') }}</span>
        <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7m0 0l-7 7m7-7H3"/>
        </svg>
      </NuxtLink>
    </div>

    <div class="divide-y divide-slate-800/80">
      <EventHomeCard v-for="(event, index) in items" :key="index" :item="event" />
    </div>
  </section>
</template>

<style scoped>

</style>