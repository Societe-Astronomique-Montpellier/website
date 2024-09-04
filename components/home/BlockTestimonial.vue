<script setup lang="ts">
import type {ComputedRef} from "vue";
import type {ImageField} from "@prismicio/client";
import { useRichTextSerializer } from '@/composables/useRichTextSerializer'

const ImageCopyright = defineAsyncComponent(() => import('@/components/Layouts/imageCopyright.vue'))
const richTextSerializer = useRichTextSerializer();

export interface Props {
  block: any
}
const props = defineProps<Props>()
const { block } = toRefs(props)

const { isMobile } = useDevice();
const optimizedImage: ComputedRef<ImageField> = computed<ImageField>(() => isMobile ? block?.value.data.testimonial_vignette_1?.mobile : block?.value.data.testimonial_vignette_1)
</script>

<template>
<section class="bg-white"> <!-- dark:bg-gray-900 --->
  <div class="bg-white grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    <div class="mr-auto place-self-center lg:col-span-7">
      <Icon name="material-symbols:arrow-right-alt" v-show="false" />
      <prismic-rich-text
        :field="block.data.content"
        :serializer="richTextSerializer"
        class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl"
      />
      <div class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl "> <!-- dark:text-gray-400 -->
        <p class="mb-6 font-light text-gray-500"> <!--  dark:text-neutral-300 -->
            <Icon name="material-symbols:arrow-right-alt" /> {{ block.data.testimonial_text_1 }}
        </p>

        <p class="mb-6 font-light text-gray-500">
            <Icon name="material-symbols:arrow-right-alt" /> {{ block.data.testimonial_text_2 }}
        </p>

        <p class="mb-6 font-light text-gray-500">
            <Icon name="material-symbols:arrow-right-alt" /> {{ block.data.testimonial_text_3 }}
        </p>
      </div>
      <div v-if="block.data.link">
        <NuxtLink
            :to="block.data.link"
            :aria-label="block.data.link_label"
            type="button"
            class="md:justify-center inline-block rounded bg-gray-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        >
          {{ block.data.link_label }}
        </NuxtLink>
      </div>
    </div>
      <div class="lg:mt-0 lg:col-span-5 lg:flex rounded-lg">
        <ImageCopyright :image="optimizedImage" />
      </div>
  </div>
</section>


</template>

<style scoped>

</style>
