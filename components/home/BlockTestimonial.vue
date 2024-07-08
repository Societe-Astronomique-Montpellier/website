<script setup lang="ts">
import type {IPrismicDocument} from "~/types/prismic";
import type {IBlock} from "~/types/block";

export interface Props {
  data: IBlock
}
const props = defineProps<Props>()
const { data } = toRefs(props)

</script>

<template>
  <!--Background-->
  <section
    v-if="data"
      class="rounded-md p-6 text-center shadow-lg md:p-12 md:text-left"
      style=""
  >
    <div class="flex justify-center">
      <div class="max-w-3xl">
        <div
            class="m-4 block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800 dark:shadow-black/20">
          <!--Testimonial-->
          <div class="md:flex md:flex-row">
            <div
                class="mx-auto mb-6 flex w-36 items-center justify-center md:mx-0 md:w-96 lg:mb-0">
              <prismic-image
                v-if="undefined !== data.image"
                :field="data.image"
                class="rounded-full shadow-md dark:shadow-black/30"
              />
            </div>
            <div class="md:ms-6">
            <p
              class="mb-2 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
              <prismic-text :field="data.title" />
            </p>
              <p
                class="mb-6 font-light text-neutral-500 dark:text-neutral-300"
              >
                <prismic-rich-text :field="data.content" />
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
