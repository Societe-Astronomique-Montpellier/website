<script setup lang="ts">
import type { ComputedRef } from "vue";
import type { ImageField, KeyTextField, LinkField } from "@prismicio/client";
import type {RelatedBlockHero} from "~~/types/Hero";

const { t } = useI18n();

interface CarouselItem {
  image: ImageField;
  title: KeyTextField;
  label: KeyTextField;
}

interface Props {
  block: RelatedBlockHero;
}
const { block } = defineProps<Props>();
const { isMobile } = useDevice();

const slides: ComputedRef<CarouselItem[]> = computed(() => block.data.carousel);
const nbImages: ComputedRef<number> = computed(() => block.data.carousel.length);
const hasMultipleSlides = computed<boolean>(() => nbImages.value > 1);

/**
 * NEW SLIDE
 */
const currentSlide: Ref<number> = ref(0);
const slideTitle: ComputedRef<KeyTextField | undefined> = computed(() => slides.value.at(currentSlide.value)?.title);
const slideDesc: ComputedRef<KeyTextField | undefined> = computed(() => slides.value.at(currentSlide.value)?.label);

const getCssClassZIndox = (index: number): string => (index === currentSlide.value) ? "z-10": "z-0";

const autoSlideInterval = ref<ReturnType<typeof setInterval> | null>(null);
const SLIDE_DURATION = 5000;

const prevSlide = (): void => {
  currentSlide.value = (currentSlide.value - 1 + nbImages.value) % nbImages.value;
};
const nextSlide = (): void => {
  currentSlide.value = (currentSlide.value + 1) % nbImages.value;
};

const startAutoSlide = (): void => {
  if (hasMultipleSlides.value) {
    autoSlideInterval.value = setInterval(nextSlide, SLIDE_DURATION);
  }
};

const stopAutoSlide = (): void => {
  if (autoSlideInterval.value) {
    clearInterval(autoSlideInterval.value);
    autoSlideInterval.value = null;
  }
};

// Lifecycle
onMounted(() => {
  startAutoSlide();
});

</script>

<template>
  <header class="relative w-full min-h-screen flex items-center justify-center bg-slate-950 text-white overflow-hidden">

    <!-- Conteneur des slides -->
    <div class="absolute inset-0 w-full h-full">

      <div
        v-for="(item, index) in block.data.carousel"
        :key="index"
        :class="`absolute inset-0 w-full h-full transition-opacity duration-1000 opacity-100 ${getCssClassZIndox(index)}`"
      >
        <PrismicImage
          :field="item.image"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-slate-950/40"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
      </div>
    </div>

    <!-- Contenu du Hero -->
    <div class="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-32 flex flex-col justify-center min-h-screen">

      <div class="max-w-3xl space-y-8">

        <div class="flex flex-wrap items-center gap-4">
        <span class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-500/20 backdrop-blur-md text-indigo-300 text-xs font-bold tracking-wider uppercase border border-indigo-500/30">
          <span class="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
          Fondée en 1979
        </span>
          <span class="text-slate-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm px-3 py-1.5 rounded-full bg-slate-900/40">
          Siège : Tour de la Babote
        </span>
        </div>

        <div class="space-y-4">
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
            {{ block.data.title }}
          </h1>
          <p class="text-2xl sm:text-3xl font-extrabold text-indigo-400 leading-snug">
            {{ slideTitle }}
          </p>
        </div>

        <p class="text-lg sm:text-xl text-slate-200 leading-loose max-w-2xl font-light">
          {{ slideDesc }}
        </p>

        <div class="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
          <prismic-link
            v-if="block.data.button_left"
            :field="block.data.button_left"
            type="button"
            class="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-base font-bold transition-all duration-300 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-0.5 shrink-0"
            :title="block.data.text_button_left"
          >
            {{ block.data.text_button_left }}
            <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </prismic-link>

          <prismic-link
            v-if="block.data.button_right"
            :field="block.data.button_right"
            class="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md text-white text-base font-semibold border border-slate-700/60 hover:border-slate-500 transition-all duration-300 shrink-0"
            :title="block.data.text_button_right"
          >
            {{ block.data.text_button_right }}
          </prismic-link>
        </div>
      </div>

    </div>

    <!-- Commandes du Carrousel -->
    <div class="absolute bottom-10 left-6 right-6 sm:left-10 sm:right-10 z-30 flex items-center justify-between max-w-7xl mx-auto">
      <div class="flex items-center gap-3">
        <button aria-label="Slide 1" class="w-10 h-1.5 rounded-full bg-indigo-500 transition-all duration-300"></button>
        <button aria-label="Slide 2" class="w-3 h-1.5 rounded-full bg-slate-600 hover:bg-slate-400 transition-all duration-300"></button>
        <button aria-label="Slide 3" class="w-3 h-1.5 rounded-full bg-slate-600 hover:bg-slate-400 transition-all duration-300"></button>
      </div>

      <div class="flex items-center gap-3">
        <button aria-label="Précédent" @click="prevSlide" class="p-3 rounded-full bg-slate-900/60 hover:bg-slate-800 text-white backdrop-blur-md border border-slate-700/50 hover:border-slate-500 transition-all duration-300 hover:scale-105 active:scale-95">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button aria-label="Suivant" @click="nextSlide" class="p-3 rounded-full bg-slate-900/60 hover:bg-slate-800 text-white backdrop-blur-md border border-slate-700/50 hover:border-slate-500 transition-all duration-300 hover:scale-105 active:scale-95">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

  </header>
</template>

<style>

</style>
