<script setup lang="ts">
import type { ComputedRef } from "vue";
import type { ImageField, LinkField } from "@prismicio/client";
import { useRichTextSerializer } from "@/composables/useRichTextSerializer";

const ImageCopyright = defineAsyncComponent(
  () => import("@/components/Layouts/imageCopyright.vue"),
);
const richTextSerializer = useRichTextSerializer();

export interface Props {
  block: any;
}
const props = defineProps<Props>();
const { block } = toRefs(props);

const { isMobile } = useDevice();
const optimizedImage: ComputedRef<ImageField> = computed<ImageField>(() =>
  isMobile
    ? block?.value.data.testimonial_vignette_1?.mobile
    : block?.value.data.testimonial_vignette_1,
);
</script>

<template>
  <section class="dark:bg-slate-800">
    <!-- dark:bg-gray-900 --->
    <div
      class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
    >
      <div class="mr-auto place-self-center lg:col-span-7">
        <Icon v-show="false" name="material-symbols:arrow-right-alt" />
        <prismic-rich-text
          :field="block.data.content"
          :serializer="richTextSerializer"
          class="max-w-2xl mb-6 font-light text-gray-500 dark:text-slate-400 lg:mb-8 md:text-lg lg:text-xl"
        />
        <div
          class="max-w-2xl mb-6 font-light text-gray-500 dark:text-slate-400 lg:mb-8 md:text-lg lg:text-xl"
        >
          <!-- dark:text-gray-400 -->
          <p class="mb-6 font-light text-gray-500 dark:text-slate-400">
            <!--  dark:text-neutral-300 -->
            <Icon name="material-symbols:arrow-right-alt" />
            {{ block.data.testimonial_text_1 }}
          </p>

          <p class="mb-6 font-light text-gray-500 dark:text-slate-400">
            <Icon name="material-symbols:arrow-right-alt" />
            {{ block.data.testimonial_text_2 }}
          </p>

          <p class="mb-6 font-light text-gray-500 dark:text-slate-400">
            <Icon name="material-symbols:arrow-right-alt" />
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
</template>

<style scoped></style>
