<script setup lang="ts">

import type {BlockTestimonialDocument, BlockTestimonialDocumentData} from "~/prismicio-types";

export interface Props {
  block: BlockTestimonialDocumentData
}
const props = defineProps<Props>()
const { block } = toRefs(props)

</script>

<template>
  <!--Background-->
<!--  <section-->
<!--    v-if="block"-->
<!--      class="rounded-md p-6 text-center shadow-lg md:p-12 md:text-left"-->
<!--      style=""-->
<!--  >-->
<!--    <div class="flex justify-center">-->
<!--      <div class="max-w-3xl">-->
<!--        <div-->
<!--            class="m-4 block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800 dark:shadow-black/20">-->
<!--          &lt;!&ndash;Testimonial&ndash;&gt;-->
<!--          <div class="md:flex md:flex-row">-->
<!--            <div-->
<!--                class="mx-auto mb-6 flex w-36 items-center justify-center md:mx-0 md:w-96 lg:mb-0">-->
<!--              <prismic-image-->
<!--                v-if="undefined !== block.image"-->
<!--                :field="block.image"-->
<!--                class="rounded-full shadow-md dark:shadow-black/30"-->
<!--              />-->
<!--            </div>-->
<!--            <div class="md:ms-6">-->
<!--            <p-->
<!--              class="mb-2 text-xl font-semibold text-neutral-800 dark:text-neutral-200">-->
<!--              <prismic-text :field="block.title" />-->
<!--            </p>-->
<!--              <p-->
<!--                class="mb-6 font-light text-neutral-500 dark:text-neutral-300"-->
<!--              >-->
<!--                <prismic-rich-text :field="block.content" />-->
<!--              </p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </section>-->

</template>

<style scoped>

</style>
