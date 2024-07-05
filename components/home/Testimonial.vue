<script setup lang="ts">
import type {IPrismicDocument} from "~/types/prismic";

export interface Props {
  id: string
}
const props = defineProps<Props>()
const { id } = toRefs(props)

const { client } = usePrismic();
const { data: blockTestimonial, pending, error } = await useAsyncData(
    "blockTestimonial",
    (): Promise<IPrismicDocument> => client.getByID(id.value, {lang: 'fr-fr'})
);
</script>

<template>
  <!--Background-->
  <section
    v-if="blockTestimonial"
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
              <img
                  :src="blockTestimonial.data.image.url"
                  class="rounded-full shadow-md dark:shadow-black/30"
                  :alt="blockTestimonial.data.image.alt" />
            </div>
            <div class="md:ms-6">
            <p
              class="mb-2 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
              {{ blockTestimonial.data.title[0].text }}
            </p>
              <p
                class="mb-6 font-light text-neutral-500 dark:text-neutral-300"
              >
                {{ blockTestimonial.data.content[0].text }}
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
