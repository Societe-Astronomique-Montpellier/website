<script setup lang="ts">
import type {PageThematiqueDocument} from "~~/prismicio-types";
import type {ImageField} from "@prismicio/client";
import type {EmptyImageFieldImage, FilledImageFieldImage} from "@prismicio/types";
import {useRichTextSerializer} from "~/composables/useRichTextSerializer.ts";

export interface Props {
  thematic: PageThematiqueDocument
}
const { thematic } = defineProps<Props>()

const richTextSerializer = useRichTextSerializer();

const imageVignette = computed<
    ImageField | FilledImageFieldImage | EmptyImageFieldImage
>(() => thematic?.data.image_vignette.vignette);
</script>

<template>
  <prismic-link
    :field="thematic"
  >
    <div class="group bg-slate-950/50 rounded-2xl p-6 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-950 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-950/30 flex flex-col justify-between">
      <div class="space-y-6">
        <div v-if="imageVignette" class="h-56 rounded-xl overflow-hidden border border-slate-800 relative">
          <prismic-image
              :field="imageVignette"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          <span
            class="hidden absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-indigo-300">
          </span>
        </div>

        <div class="space-y-3">
          <h3 class="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
            {{ thematic.data.title }}
          </h3>

          <prismic-rich-text
            :field="thematic.data.resume"
            :serializer="richTextSerializer"
          />
        </div>
      </div>
    </div>
  </prismic-link>


</template>

<style scoped>

</style>