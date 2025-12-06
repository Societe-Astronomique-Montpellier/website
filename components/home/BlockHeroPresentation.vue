<script setup lang="ts">
import type { ComputedRef } from "vue";
import type { LinkField } from "@prismicio/client";

const { t } = useI18n();

export interface Props {
  block: any;
  hasDemo: boolean;
}

const props = defineProps<Props>();
const { block, hasDemo } = toRefs(props);
const { isMobile } = useDevice();

const nbImages: ComputedRef<number> = computed<number>(
  () => block.value.data.carousel.length,
);

/**
 * SLIDE LEGACY
 */
const currentIndex: Ref<number> = ref(0);
const slideInterval: Ref<number | undefined> = ref(undefined);
const nextSlideLegacy = () =>
  (currentIndex.value = (currentIndex.value + 1) % nbImages.value);
const startAutoSlideLegacy = () =>
  (slideInterval.value = window.setInterval(nextSlideLegacy, 10000));

/**
 * NEW SLIDE
 */
const currentSlide = ref<number>(0);
const totalSlides = ref<number>(0);
const slideTitle = ref<string>("");
const slideDesc = ref<string>("");
const autoSlideInterval = ref<NodeJS.Timeout | null>(null);

const SLIDE_DURATION = 4000;

const showSlide = (index: number): void => {
  const slides = document.querySelectorAll<HTMLElement>("#hero-slider .slide");

  slides.forEach((slide, i) => {
    const isActive = i === index;
    slide.classList.toggle("opacity-100", isActive);
    slide.classList.toggle("opacity-0", !isActive);
    slide.classList.toggle("active", isActive);

    if (isActive) {
      const target = slide.getAttribute("data-target");
      const desc = slide.getAttribute("data-desc");
      if (target) slideTitle.value = target;
      if (desc) slideDesc.value = desc;
    }
  });
};

const nextSlide = (): void => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides.value;
  showSlide(currentSlide.value);
};

const startAutoSlide = (): void => {
  autoSlideInterval.value = setInterval(nextSlide, SLIDE_DURATION);
};

const stopAutoSlide = (): void => {
  if (autoSlideInterval.value) {
    clearInterval(autoSlideInterval.value);
    autoSlideInterval.value = null;
  }
};

onMounted(() => {
  if (hasDemo.value) {
    const slides = document.querySelectorAll<HTMLElement>(
      "#hero-slider .slide",
    );
    totalSlides.value = slides.length;

    if (slides.length > 0) {
      showSlide(0);
      startAutoSlide();
    }
  } else {
    startAutoSlideLegacy();
  }
});

onUnmounted(() =>
  hasDemo.value ? stopAutoSlide() : clearInterval(slideInterval.value),
);
</script>

<template>
  <div
    v-show="block && !hasDemo"
    :class="
      !isMobile ? `w-full h-screen overflow-hidden relative` : `overflow-hidden`
    "
  >
    <!-- Slider container -->
    <div
      :class="
        !isMobile ? `w-full h-full flex transition-transform duration-1000` : ``
      "
    >
      <delay-hydration>
        <div v-if="!isMobile" class="w-full h-full relative">
          <div
            v-for="(item, index) in block.data.carousel"
            :key="index"
            :class="[
              'absolute inset-0 transition-opacity duration-1000',
              {
                'opacity-0': currentIndex !== index,
                'opacity-100': currentIndex === index,
              },
            ]"
            class="w-full h-full"
          >
            <NuxtImg
              v-if="item.image"
              :src="item.image.url as string"
              :alt="item.image.alt as string"
              :width="item.image.dimensions?.width"
              :height="item.image.dimensions?.height"
              class="w-full h-full object-cover"
              loading="lazy"
            ></NuxtImg>
          </div>
        </div>
      </delay-hydration>

      <div
        :class="
          !isMobile
            ? `absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-30 p-4`
            : `text-gray-400 bg-gray-900 body-font mb-4 mt-0 text-base items-center text-center font-light leading-relaxed h-full w-full`
        "
      >
        <h1
          v-if="!isMobile"
          :class="
            !isMobile
              ? `mb-4 text-6xl font-semibold dark:text-slate-400`
              : `mt-2 text-2xl`
          "
        >
          {{ block.data.title }}
        </h1>
        <delay-hydration>
          <div v-if="isMobile" class="object-fill m-0">
            <NuxtImg
              src="sam_babote_rs.webp"
              class="object-fill"
              :alt="t('layout.title')"
              loading="lazy"
              width="780"
              height="520"
              priority
            ></NuxtImg>
          </div>
        </delay-hydration>
        <h2
          :class="
            !isMobile
              ? `mb-6 text-4xl dark:text-slate-300`
              : `text-xl mt-2 italic`
          "
        >
          {{ block.data.subtitle }}
        </h2>

        <div class="inline-flex gap-10 my-5 md:flex-row">
          <prismic-link
            :field="block?.data.button_left as LinkField"
            type="button"
            class="md:justify-center inline-flex text-xl items-center justify-center px-4 py-3 mr-3 font-medium text-white rounded-lg border border-gray-700 bg-gray-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-center m-1"
            :title="block.data.text_button_left"
          >
            {{ block.data.text_button_left }}
          </prismic-link>

          <prismic-link
            :field="block?.data.button_right as LinkField"
            class="md:justify-center inline-flex items-center justify-center px-4 py-3 ml-3 text-xl font-medium text-center text-grey-700"
            :title="block.data.text_button_right"
          >
            {{ block.data.text_button_right }}
            <Icon
              name="material-symbols:arrow-right-alt"
              class="w-5 h-5 ml-2"
              size="20"
            />
          </prismic-link>
        </div>
      </div>
    </div>
  </div>

  <div v-show="block && hasDemo">
    <section
      id="hero"
      class="bg-gray-900 relative pt-32 pb-12 lg:pt-44 lg:pb-24 overflow-hidden min-h-[85vh] flex items-center"
    >
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent-500/10 blur-[100px] rounded-full -z-10 pointer-events-none"
      ></div>

      <div
        class="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center"
      >
        <div
          class="lg:col-span-5 text-center lg:text-left z-20 relative animate-fade-in-up"
        >
          <h1
            class="text-5xl lg:text-7xl font-heading font-extrabold leading-tight mb-6 text-white tracking-tight"
          >
            {{ block.data.title_part_1 }} <br />
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-white to-accent-400"
            >
              {{ block.data.title_part_2 }}.</span
            >
          </h1>

          <p class="text-lg text-slate-300 mb-8 leading-relaxed font-light">
            {{ block.data.subtitle }}
          </p>

          <div
            class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <prismic-link
              :field="block?.data.button_left as LinkField"
              type="button"
              class="bg-accent-600 hover:bg-accent-500 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-accent-500/20 flex items-center justify-center gap-2 border-gray-700 bg-gray-700 hover:bg-indigo-800"
              :title="block.data.text_button_left"
            >
              <span>🔭</span> {{ block.data.text_button_left }}
            </prismic-link>
          </div>

          <p class="mt-6 text-xs text-slate-500 font-sans hidden">
            ★ Aucune installation requise • Résultat immédiat • 100% en ligne
          </p>
        </div>

        <div
          class="lg:col-span-7 relative h-[500px] lg:h-[600px] w-full group animate-fade-in-up"
          style="animation-delay: 0.2s"
        >
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] border border-white/5 rounded-full animate-spin-slow -z-10"
          ></div>

          <div
            class="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-space-900/30 backdrop-blur-sm shadow-2xl"
          >
            <div id="hero-slider" class="relative w-full h-full">
              <div
                v-for="(slide, index) in block.data.carousel"
                :key="index"
                class="absolute inset-0 transition-opacity duration-1000 opacity-0 slide"
                :data-target="slide.title"
                :data-desc="slide.label"
              >
                <NuxtImg
                  :src="slide.image.url as string"
                  :alt="slide.image.alt as string"
                  class="w-full h-full object-cover opacity-80"
                />
              </div>

              <div
                class="absolute inset-0 bg-gradient-to-t from-space-950 via-transparent to-transparent"
              ></div>
            </div>

            <div
              class="absolute inset-0 pointer-events-none p-6 flex flex-col justify-end"
            >
              <div
                class="backdrop-blur-md bg-black/60 p-6 rounded-2xl border border-white/10 max-w-md animate-fade-in-up shadow-xl"
              >
                <h3
                  id="slide-title"
                  class="text-2xl font-heading font-bold text-white mb-2"
                >
                  {{ block.data.carousel[0].title }}
                </h3>
                <p id="slide-desc" class="text-slate-300">
                  {{ block.data.carousel[0].label }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.transition-opacity {
  transition: opacity 1s ease-in-out;
}
</style>
