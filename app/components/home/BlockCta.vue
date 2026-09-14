<script setup lang="ts">
import type { ComputedRef } from "vue";
import { useRichTextSerializer } from "~/composables/useRichTextSerializer.ts";
import {isFilled} from "@prismicio/helpers";
import type { RelatedCtaHome } from "~~/types/Cta";
import type { ImageField } from "@prismicio/client";

const { t } = useI18n();
const ImageCopyright = defineAsyncComponent(() => import("~/components/Layouts/imageCopyright.vue"));

export interface Props {
  block: RelatedCtaHome;
}
const { block } = defineProps<Props>();

// RichText serializer
const richTextSerializer = useRichTextSerializer();

const { isMobile } = useDevice();
const optimizedImage: ComputedRef<ImageField> = computed<ImageField>(() => isMobile ? block?.data.image?.mobile : block?.data.image.resize);
</script>

<template>
  <section
    v-if="block"
    class="animate-scroll-reveal animate-scroll group relative bg-gradient-to-br from-indigo-50 via-slate-50 to-indigo-100/60 rounded-3xl p-8 sm:p-14 lg:p-20 border border-indigo-200/80 hover:border-indigo-300 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 overflow-hidden text-slate-800"
  >
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

      <div class="lg:col-span-7 space-y-8">
        <div class="flex flex-wrap items-center gap-4">
          <span class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-60 text-white text-xs font-bold tracking-wider uppercase shadow-md shadow-indigo-600/20">
            <span class="w-2.5 h-2.5 rounded-full bg-indigo-200 animate-ping"></span>
            À la une
          </span>
          <span class="text-slate-500 text-xs font-semibold tracking-wider uppercase">
            {{ block.data?.suptitle }}
          </span>
        </div>

        <div class="space-y-4">
          <h2 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-indigo-950 transition-colors duration-300">
            {{ block.data.title }}
          </h2>
          <p v-if="isFilled.keyText(block.data?.subtitle)" class="text-xl sm:text-2xl font-bold text-indigo-700">
            {{ block.data?.subtitle }}
          </p>
        </div>

        <prismic-rich-text
          :field="block.data.resume"
          :serializer="richTextSerializer"
        />
        <prismic-rich-text
          :field="block.data.content"
          :serializer="richTextSerializer"
        />

        <div
          v-if="true === block.data.display_button_link"
          class="pt-4 flex flex-wrap items-center gap-5"
        >

          <prismic-link
            :field="block.data.link"
            :aria-label="t('layout.moreInfo')"
            class="inline-flex items-center gap-3 py-4 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5"
          >
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
            {{ $t("layout.moreInfo") }}
          </prismic-link>
        </div>
      </div>

      <div class="lg:col-span-5 relative h-80 sm:h-[380px] rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
        <div class="w-full h-full rounded-xl overflow-hidden relative">
          <prismic-image :field="optimizedImage" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
        </div>
      </div>

    </div>
  </section>
</template>
