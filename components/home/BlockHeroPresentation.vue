<script setup lang="ts">
import type { ComputedRef } from "vue";
import type {ImageField, LinkField} from "@prismicio/client";

const { t } = useI18n();

export interface Props {
  block: any;
}

const props = defineProps<Props>();
const { block } = toRefs(props);
const { isMobile } = useDevice();

const currentIndex: Ref<number> = ref(0);
const slideInterval: Ref<number | undefined> = ref(undefined);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const title: ComputedRef<string> = computed<string>(() => t("layout.title"));
const nbImages: ComputedRef<number> = computed<number>(
  () => block.value.data.carousel.length,
);
const listImages: ComputedRef<ImageField[]> = computed<ImageField[]>(() => {
  return block.value.data.carousel.map((image: any, index: number) => {
    return !isMobile ? image.image.normal : image.image.mobile;
  });
});

const nextSlide = () =>
  (currentIndex.value = (currentIndex.value + 1) % nbImages.value);
const prevSlide = () =>
  (currentIndex.value =
    (currentIndex.value - 1 + nbImages.value) % nbImages.value);
const startAutoSlide = () =>
  (slideInterval.value = window.setInterval(nextSlide, 10000));

onMounted(() => startAutoSlide());
onUnmounted(() => {
  if (slideInterval.value !== undefined) {
    clearInterval(slideInterval.value);
  }
});
</script>

<template>
  <div v-if="block" class="w-full h-screen overflow-hidden relative">
    <!-- Slider container -->
    <div class="w-full h-full flex transition-transform duration-1000">
      <div class="w-full h-full relative">
        <div
          v-for="(image, index) in listImages"
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
          <prismic-image
            v-if="image"
            :field="image"
            :alt="image.alt"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <div
        v-if="!isMobile"
        class="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-30 p-4"
      >
        <h1 class="mb-4 text-6xl font-semibold">{{ block.data.title }}</h1>
        <h2 class="mb-6 text-4xl">{{ block.data.subtitle }}</h2>
        <div class="inline-flex gap-10 mt-10">
          <prismic-link
            :field="block?.data.button_left as LinkField"
            type="button"
            class="md:justify-center inline-flex text-2xl items-center justify-center px-5 py-3 mr-3 font-medium text-white rounded-lg border border-gray-700 bg-gray-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-center m-1"
          >
            {{ block.data.text_button_left }}
            <Icon
              name="material-symbols:arrow-right-alt"
              class="w-5 h-5 ml-2"
              size="20"
            />
          </prismic-link>

          <prismic-link
            :field="block?.data.button_right as LinkField"
            type="button"
            class="md:justify-center inline-flex items-center justify-center px-5 py-3 ml-3 text-2xl font-medium text-center text-white border border-gray-300 rounded-lg text-grey-700 hover:bg-indigo-700 hover:text-white"
          >
            {{ block.data.text_button_right }}
          </prismic-link>

        </div>


      </div>
    </div>
  </div>
  <div
    v-if="isMobile"
    class="text-gray-400 bg-gray-900 body-font mb-4 mt-0 text-base items-center text-center font-light leading-relaxed h-full w-full p-2"
  >
    <h1 class="mt-2 text-2xl">
      {{ block.data.title }}
    </h1>
    <h2 class="text-xl mt-2 italic">
      {{ block.data.subtitle }}
    </h2>
  </div>
</template>

<style>
.transition-opacity {
  transition: opacity 1s ease-in-out;
}
</style>
