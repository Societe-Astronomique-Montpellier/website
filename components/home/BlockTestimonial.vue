<script setup lang="ts">
export interface Props {
  block: any
}
const props = defineProps<Props>()
const { block } = toRefs(props)

</script>

<template>
    <div class="grid gap-6 text-center md:grid-cols-3 lg:gap-12 ">
    </div>
  <!--Background-->
  <section
      class="rounded-md p-6 text-center shadow-lg md:p-12 md:text-left"
  >
    <div class="mx-auto text-center md:max-w-xl lg:max-w-3xl " v-if="block">
      <h3 class="mb-6 text-3xl font-bold">{{ block.data.title }}</h3>
      <div
          class="mb-6 pb-2 text-neutral-600 dark:text-neutral-300 md:mb-12 md:pb-0">
        <prismic-rich-text :field="block.data.content" />
      </div>
    </div>

    <div class="flex justify-center">
      <div class="max-w-3xl">
        <div
            class="m-4 block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800 dark:shadow-black/20">
          <!--Testimonial-->
          <div class="md:flex md:flex-row">
            <div
                class="mx-auto mb-6 flex w-36 items-center justify-center md:mx-0 md:w-96 lg:mb-0">
              <prismic-image
                  :field="block.data.testimonial_vignette_1"
                  class="rounded-full shadow-md dark:shadow-black/30"
              />
            </div>
            <div class="md:ms-6">
              <p
                  class="mb-6 font-light text-neutral-500 dark:text-neutral-300">
                {{ block.data.testimonial_text_1 }}
              </p>
              <p
                  class="mb-6 font-light text-neutral-500 dark:text-neutral-300">
                {{ block.data.testimonial_text_2 }}
              </p>
              <p
                  class="mb-6 font-light text-neutral-500 dark:text-neutral-300">
                {{ block.data.testimonial_text_3 }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>
