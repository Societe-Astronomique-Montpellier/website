<script setup lang="ts">
import type {ComputedRef} from "vue";
import type {ImageField} from "@prismicio/client";

const ImageCopyright = defineAsyncComponent(() => import('@/components/Layouts/imageCopyright.vue'))

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
      <prismic-rich-text :field="block.data.content" class="max-w-2xl mb-4 font-extrabold tracking-tight leading-10 text-4xl md:text-5xl xl:text-5xl text-left" />
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
    </div>
      <div class="lg:mt-0 lg:col-span-5 lg:flex rounded-lg">
        <ImageCopyright :image="optimizedImage" />
      </div>
  </div>
</section>


</template>

<style scoped>

</style>
