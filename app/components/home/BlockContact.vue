<script setup lang="ts">
import { useHomeRichTextSerializer } from "~/composables/useHomeRichTextComponents.ts";

const prismic = usePrismic();

// -- Props
export interface IProps {
  block: any;
}
const { block } = defineProps<IProps>();

// -- Components
const Map = defineAsyncComponent(() => import("~/components/content/Map.vue"));

// -- Composables
const centerMap: [number, number] = useCoordinates("babote");
const homeRichTextSerializer = useHomeRichTextSerializer();
</script>

<template>
  <section
    v-show="block"
    class="animate-scroll-reveal animate-scroll bg-slate-950 rounded-3xl p-8 sm:p-14 lg:p-20 space-y-12 border border-slate-800/80 shadow-xl"
  >
    <div class="space-y-3 pb-10 border-b border-slate-800">
      <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
        {{ block.data.title }}
      </h2>
      <prismic-rich-text
        class="text-slate-400 text-sm sm:text-base leading-relaxed"
        :field="block.data.subtitle"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

      <!-- Carte iframe -->
      <div class="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-inner group">
        <Map :item-marker="centerMap" class="w-full h-80 sm:h-96 lg:h-[440px] border-0 transition-all duration-500" />
      </div>

      <div class="lg:col-span-5 space-y-10">
        <div class="space-y-8">
          <prismic-rich-text
            :field="block.data.content"
            :serializer="homeRichTextSerializer"
          />
        </div>

        <div class="pt-6 border-t border-slate-800 space-y-6">
<!--          <a-->
<!--              href="https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=%3B43.607399%2C3.877192"-->
<!--              target="_blank"-->
<!--              rel="noopener noreferrer"-->
<!--              class="inline-flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5"-->
<!--          >-->
<!--            <span>Calculer l'itinéraire vers la Babote</span>-->
<!--            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>-->
<!--            </svg>-->
<!--          </a>-->

          <prismic-rich-text
            :field="block.data.content_bottom"
            class="text-xs text-slate-400 leading-relaxed"
          />
        </div>

      </div>

    </div>

  </section>
</template>

<style scoped></style>
