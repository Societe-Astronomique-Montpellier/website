<script setup lang="ts">
// https://tailwindcomponents.com/component/content-2
import type { EventDocument, PageArticleDocument, PageThematiqueDocument } from "~/prismicio-types";
import type {KeyTextField} from "@prismicio/client";

export interface Props {
  titleBlock: KeyTextField | undefined
  contentBlock?: KeyTextField | undefined
  items?: Array<PageThematiqueDocument | EventDocument | PageArticleDocument>
}

const props = defineProps<Props>()
const { items } = toRefs(props)

import { useDynamicCardComponent } from '@/composables/useDynamicCardComponent';
const { getComponent } = useDynamicCardComponent();

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
          <slot name="content-block"></slot>
        </div>
      </div>
      <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
        <div class="p-4 md:w-1/3 sm:mb-0 mb-6" v-for="(item, index) in items" :key="index">
          <component
              v-if="item"
              :is="getComponent(item.type)"
              v-bind="item"
              :item="item"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
