<script setup lang="ts">
import type { ComputedRef } from "vue";
import { useRichTextSerializer } from "~/composables/useRichTextSerializer.ts";
import type { ImageField } from "@prismicio/client";
import type {BlockCtaDocument} from "~~/prismicio-types";
import type {EmptyImageFieldImage, FilledImageFieldImage} from "@prismicio/types";

const { t } = useI18n();
const ImageCopyright = defineAsyncComponent(() => import("~/components/Layouts/imageCopyright.vue"));

export interface Props {
  block: BlockCtaDocument;
}
const { block } = defineProps<Props>();

// RichText serializer
const richTextSerializer = useHomeRichTextSerializer();

const { isMobile } = useDevice();
const optimizedImage: ComputedRef<EmptyImageFieldImage | FilledImageFieldImage | undefined> = computed(() => isMobile ? block?.data.image?.mobile : block?.data.image.resize);
</script>

<template>
  <section
      class="animate-scroll-reveal animate-scroll group bg-slate-950 rounded-3xl p-8 sm:p-14 lg:p-20 space-y-12 border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-950/20"
  >
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

      <div class="lg:col-span-6 space-y-8">
        <div class="space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-emerald-400">{{ block.data.suptitle }}</span>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight group-hover:text-emerald-50 transition-colors duration-300">
            {{ block.data.title }}
          </h2>
        </div>

        <prismic-rich-text
          :field="block.data.resume"
          :serializer="richTextSerializer"
        />
        <prismic-rich-text
          :field="block.data.content"
          :serializer="richTextSerializer"
        />

        <div class="pt-2" v-if="true === block.data.display_button_link">

          <PrismicLink
            :field="block.data.link"
            :aria-label="block.data.link.text"
            class="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:-translate-y-0.5"
          />
        </div>
      </div>

      <div class="lg:col-span-6 relative h-80 sm:h-[440px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <prismic-image :field="optimizedImage as ImageField" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
        <div class="absolute bottom-6 left-6 right-6 text-xs text-slate-300 backdrop-blur-md bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 transition-all duration-300 group-hover:bg-slate-900/90 group-hover:border-emerald-500/40">
          📍 Parc National des Cévennes — Ciel noir préservé
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>

</style>