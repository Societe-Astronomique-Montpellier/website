<script setup lang="ts">
import type { ComputedRef } from "vue";
import type { ImageField, LinkField } from "@prismicio/client";
import { useRichTextSerializer } from "@/composables/useRichTextSerializer";

const ImageCopyright = defineAsyncComponent(
  () => import("@/components/Layouts/imageCopyright.vue"),
);
const richTextSerializer = useRichTextSerializer();
const { isMobile } = useDevice();

interface Props {
  block: any;
  hasDemo: boolean;
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
  <section v-show="block && !hasDemo" class="dark:bg-slate-800">
    <!-- dark:bg-gray-900 --->
    <div
      class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
    >
      <div class="mr-auto place-self-center lg:col-span-7">
        <Icon v-show="false" name="material-symbols:arrow-right-alt" />
        <prismic-rich-text
          :field="block.data.content"
          :serializer="richTextSerializer"
          class="max-w-2xl mb-6 font-light text-gray-600 dark:text-slate-400 lg:mb-8 md:text-lg lg:text-xl"
        />
        <div
          class="max-w-2xl mb-6 font-light text-gray-600 dark:text-slate-400 lg:mb-8 md:text-lg lg:text-xl"
        >
          <!-- dark:text-gray-400 -->
          <p class="mb-6 font-light text-gray-600 dark:text-slate-400">
            <!--  dark:text-neutral-300 -->
            <Icon
              name="material-symbols:arrow-right-alt"
              class="text-indigo-400"
            />
            {{ block.data.testimonial_text_1 }}
          </p>

          <p class="mb-6 font-light text-gray-600 dark:text-slate-400">
            <Icon
              name="material-symbols:arrow-right-alt"
              class="text-indigo-400"
            />
            {{ block.data.testimonial_text_2 }}
          </p>

          <p class="mb-6 font-light text-gray-600 dark:text-slate-400">
            <Icon
              name="material-symbols:arrow-right-alt"
              class="text-indigo-400"
            />
            {{ block.data.testimonial_text_3 }}
          </p>
        </div>
        <div v-if="block.data.link" class="mt-8 flex justify-center">
          <prismic-link
            :field="block?.data.link as LinkField"
            :aria-label="block.data.link_label"
            type="button"
            class="px-3 py-2.5 text-2sm font-medium text-white inline-flex items-center bg-gray-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center m-1"
          >
            {{ block.data.link_label }}
          </prismic-link>
        </div>
      </div>
      <div class="lg:mt-0 lg:col-span-5 lg:flex rounded-lg">
        <ImageCopyright :image="optimizedImage" />
      </div>
    </div>
  </section>

  <section
    v-show="block && hasDemo"
    ref="testimonialSection"
    :class="[
      'transition-all duration-1000 ease-out dark:bg-slate-800  py-12 lg:py-24',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
    ]"
  >
    <div
      class="grid max-w-screen-xl px-4 mx-auto lg:gap-12 lg:grid-cols-12 items-center group"
    >
      <div class="mr-auto place-self-center lg:col-span-7 order-2 lg:order-1">
        <prismic-rich-text
          v-if="block.data.content"
          :field="block.data.content"
          :serializer="richTextSerializer"
          class="max-w-2xl mb-8 text-gray-900 dark:text-white font-extrabold text-3xl lg:text-5xl tracking-tight"
        />

        <div class="max-w-2xl space-y-6 mb-10">
          <div
            v-for="i in [1, 2, 3]"
            :key="i"
            class="flex items-start space-x-4 group/item transition-all duration-300 hover:translate-x-3"
          >
            <Icon
              name="material-symbols:arrow-right-alt"
              class="flex-shrink-0 mt-1 text-indigo-400 text-2xl transition-transform duration-300 group-hover/item:scale-125"
            />
            <p
              class="text-gray-600 dark:text-slate-400 font-light md:text-lg lg:text-xl leading-relaxed"
            >
              {{
                block.data[`testimonial_text_${i}` as keyof typeof block.data]
              }}
            </p>
          </div>
        </div>

        <div v-if="block.data.link" class="flex">
          <prismic-link
            :field="block.data.link"
            :aria-label="block.data.link_label"
            class="px-8 py-4 text-sm font-bold text-white bg-gray-800 dark:bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 active:scale-95 inline-flex items-center"
          >
            {{ block.data.link_label }}
            <Icon
              name="material-symbols:chevron-right"
              class="ml-2 text-lg transition-transform group-hover:translate-x-1"
            />
          </prismic-link>
        </div>
      </div>

      <div
        class="lg:mt-0 lg:col-span-5 flex rounded-2xl overflow-hidden order-1 lg:order-2 mb-8 lg:mb-0 shadow-2xl shadow-gray-900/10"
      >
        <ImageCopyright
          :image="optimizedImage"
          class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
