<script setup lang="ts">
// https://tailwindcomponents.com/component/content-2
import type {EventDocument, EventsDocument, PageArticleDocument, PageThematiqueDocument} from "~/prismicio-types";
import type {KeyTextField} from "@prismicio/client";

export interface Props {
  titleBlock: KeyTextField | undefined
  contentBlock?: KeyTextField | undefined
  items?: Array<PageThematiqueDocument | EventDocument | PageArticleDocument>
  parentItem?: PageThematiqueDocument | EventsDocument | null
}

const props = defineProps<Props>()
const { items, parentItem } = toRefs(props)

import { useDynamicCardComponent } from '@/composables/useDynamicCardComponent';
const { getComponent } = useDynamicCardComponent();

</script>

<template>
  <section class="text-gray-400 bg-gray-900 body-font">
    <div class="container px-5 py-16 mx-auto">
      <div class="flex flex-col">
        <div class="h-1 bg-gray-800 rounded overflow-hidden">
          <div class="w-24 h-full bg-indigo-500"></div>
        </div>
        <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
          <h3 class="sm:w-2/5 text-white font-medium title-font text-2xl mb-2 sm:mb-0">{{ titleBlock }}</h3>
          <slot name="content-block-top"></slot>
        </div>
      </div>
      <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
        <div class="p-4 md:w-1/3 sm:mb-0 mb-6" v-for="(item, index) in items" :key="index">
          <component
            v-if="item && parentItem"
            :is="getComponent(item.type)"
            :item="item"
            :parentItem="parentItem"
          />
          <component
            v-else-if="null === parentItem && item"
            :is="getComponent(item.type)"
            :item="item"
          />
        </div>
      </div>
      <slot name="content-block-bottom"></slot>
    </div>
  </section>
</template>

<style scoped>
</style>
