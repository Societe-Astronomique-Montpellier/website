<script setup lang="ts">
export interface Props {
  block: any
}
const props = defineProps<Props>()
const { block } = toRefs(props)

</script>

<template>
<section class="bg-white dark:bg-gray-900">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <prismic-rich-text :field="block.data.content" class="max-w-2xl mb-4 font-extrabold tracking-tight leading-none text-4xl md:text-5xl xl:text-5xl" />
            <div class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                <p class="mb-6 font-light text-neutral-500 dark:text-neutral-300">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  {{ block.data.testimonial_text_1 }}
                </p>

                <p class="mb-6 font-light text-neutral-500 dark:text-neutral-300">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                  {{ block.data.testimonial_text_2 }}
                </p>

                <p class="mb-6 font-light text-neutral-500 dark:text-neutral-300">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                {{ block.data.testimonial_text_3 }}
              </p>

            </div>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex rounded-lg">
          <prismic-image
            :field="block.data.testimonial_vignette_1"
            class="rounded-lg shadow-md dark:shadow-black/30"
          />
            
        </div>                
    </div>
</section>


</template>

<style scoped>

</style>
