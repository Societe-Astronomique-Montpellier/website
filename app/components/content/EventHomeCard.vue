<script setup lang="ts">
import type {EventDocument} from "~~/prismicio-types";
import {useHomeAgendaDateDisplay} from "~/composables/useHomeAgendaDateDisplay.ts";

const lang = useLang();

// -- Props
export interface Props {
  item: EventDocument;
}
const { item } = defineProps<Props>();

const objDateStart = useHomeAgendaDateDisplay(item.data.time_start, lang.value);
const { getKeyByValue } = useFindKeyFromArray();
const { listCalendars } = useCalendarTypes()
const colorAccessType: ComputedRef<string> = computed(() => getKeyByValue(listCalendars.value, "title", item.data.access_type, "tailwind") ?? "teal-400");
</script>

<template>
  <article class="py-8 first:pt-0 last:pb-0 px-4 -mx-4 rounded-2xl transition-all duration-300 hover:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-8 group">
    <div class="flex items-start sm:items-center gap-8 min-w-0">
      <div v-if="objDateStart" class="flex flex-col items-center justify-center shrink-0 text-center w-16 p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-indigo-500/40 transition-colors duration-300">
        <span :class="`text-xs font-bold uppercase tracking-widest ${colorAccessType}`">{{ objDateStart?.month_str }}</span>
        <span class="text-3xl font-black text-white mt-0.5">{{ objDateStart?.day }}</span>
      </div>

      <div class="space-y-2 min-w-0">
        <div class="flex items-center gap-4 text-xs font-medium text-slate-400">
          <span :class="`${colorAccessType} font-semibold`">{{ item?.data.access_type }}</span>
          <span>•</span>
          <span>{{ objDateStart?.hours }}:{{objDateStart?.minutes }}</span>
        </div>

        <h3 :class="`text-xl sm:text-2xl font-bold text-white group-hover:${colorAccessType} transition-colors duration-300`">
          <PrismicLink :field="item">
            {{ item.data.title }}
          </PrismicLink>
        </h3>

        <p class="text-sm text-slate-400 leading-relaxed">
          {{ item.data.place_event_txt }}
        </p>
      </div>
    </div>

    <PrismicLink :field="item" :class="`inline-flex items-center gap-2 text-sm font-semibold text-slate-300 group-hover:${colorAccessType} transition-colors duration-300 shrink-0`">
      <span>Détails</span>
      <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
      </svg>
    </PrismicLink>
  </article>
</template>

<style scoped>

</style>