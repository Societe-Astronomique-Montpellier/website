<script setup lang="ts">
import type { ComputedRef } from "vue";
import type { ImageField, LinkField } from "@prismicio/client";
import { useRichTextSerializer } from "~/composables/useRichTextSerializer.ts";
import {useHomeRichTextSerializer} from "~/composables/useHomeRichTextComponents.ts";

const ImageCopyright = defineAsyncComponent(
  () => import("~/components/Layouts/imageCopyright.vue"),
);
const richTextSerializer = useHomeRichTextSerializer();
const { isMobile } = useDevice();

interface Props {
  block: any;
}

const props = defineProps<Props>();
const { block, hasDemo } = toRefs(props);

const testimonialSection = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
  // Correction ici : on définit bien 'entries' comme argument de la callback
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          // Optionnel : on arrête d'observer une fois que c'est apparu
          if (testimonialSection.value) {
            observer.unobserve(testimonialSection.value);
          }
        }
      });
    },
    {
      threshold: 0.15, // Déclenche quand 15% du bloc est visible
    },
  );

  if (testimonialSection.value) {
    observer.observe(testimonialSection.value);
  }
});

const optimizedImage: ComputedRef<ImageField> = computed<ImageField>(() =>
  isMobile
    ? block?.value.data.testimonial_vignette_1?.mobile
    : block?.value.data.testimonial_vignette_1,
);
</script>

<template>
  <section
    id="association"
    class="animate-scroll-reveal animate-scroll bg-slate-100 text-slate-800 rounded-3xl p-8 sm:p-14 lg:p-20 shadow-xl border border-slate-200/80 transition-all duration-500 hover:shadow-2xl hover:border-slate-300"
  >
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

      <!-- Contenu statutaire -->
      <div class="lg:col-span-7 space-y-8">
        <prismic-rich-text
          :field="block.data.content"
          :serializer="richTextSerializer"
          class="text-2xl sm:text-4xl font-bold text-slate-900 leading-tight"
        />
        <ul class="space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed font-light">
          <li class="flex items-start gap-3 mb-6 font-light text-gray-600 dark:text-slate-400">
            <span class="text-indigo-600 font-medium shrink-0">→</span>
            <span>{{ block.data.testimonial_text_1 }}</span>
          </li>
          <li class="flex items-start gap-3 mb-6 font-light text-gray-600 dark:text-slate-400">
            <span class="text-indigo-600 font-medium shrink-0">→</span>
            <span>{{ block.data.testimonial_text_2 }}</span>
          </li>
          <li class="flex items-start gap-3 mb-6 font-light text-gray-600 dark:text-slate-400">
            <span class="text-indigo-600 font-medium shrink-0">→</span>
            <span>{{ block.data.testimonial_text_3 }}</span>
          </li>
        </ul>

        <div v-if="block.data.link" class="pt-2">
          <prismic-link
              :field="block?.data.link as LinkField"
              :aria-label="block.data.link_label"
              type="button"
              class="inline-flex items-center justify-center py-3.5 px-7 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            {{ block.data.link_label }}
          </prismic-link>
        </div>

      </div>
      <div class="lg:col-span-5 space-y-3 group cursor-pointer">
        <ImageCopyright :image="optimizedImage" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
