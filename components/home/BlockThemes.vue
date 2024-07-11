<script setup lang="ts">
import type {PageThematiqueDocument} from "~/prismicio-types";

export interface Props {
  titleBlock: string | undefined
  contentBlock?: string | undefined
  items?: Array<PageThematiqueDocument>
}

const props = defineProps<Props>()
const { items } = toRefs(props)

</script>

<template>
  <section class="text-gray-400 bg-gray-900 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col">
        <div class="h-1 bg-gray-800 rounded overflow-hidden">
          <div class="w-24 h-full bg-indigo-500"></div>
        </div>
        <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
          <h1 class="sm:w-2/5 text-white font-medium title-font text-2xl mb-2 sm:mb-0">{{ titleBlock }}</h1>
          <p v-if="contentBlock" class="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">{{ contentBlock }}</p>
        </div>
      </div>
      <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">

        <!-- Create a component card -->
        <div class="p-4 md:w-1/3 sm:mb-0 mb-6" v-for="thematic in items">
          <div class="rounded-lg h-64 overflow-hidden">
            <prismic-image :field="thematic.data.image_vignette" class="object-cover object-center h-full w-full" />
          </div>
          <h2 class="text-xl font-medium title-font text-white mt-5">{{ thematic.data.title }}</h2>
          <prismic-rich-text :field="thematic.data.resume" class="text-base leading-relaxed mt-2" />
          <NuxtLink
            class="text-indigo-400 inline-flex items-center mt-3"
          >
            Plus d'information
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </NuxtLink>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
</style>