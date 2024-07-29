<script setup lang="ts">
import type {EventDocument, EventsDocument} from "@/prismicio-types";

export interface Props {
  item: EventDocument,
  parentItem: EventsDocument
}

const props = defineProps<Props>()
const { item, parentItem } = toRefs(props)
import {useFormatIntoFrenchDate} from "~/composables/useFormatIntoFrenchDate";

</script>

<template>

  <div v-if="item" class="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 rounded-lg h-64 overflow-hidden">
    <!--    780*520-->
    <prismic-link :field="item">
      <prismic-image v-if="item.data.image_vignette" :field="item.data.image_vignette" class="object-cover object-center h-full w-full" />
    </prismic-link>

  </div>
  <h2 class="text-xl font-medium title-font text-white mt-5">{{ item.data.title }}</h2>
  <div class="flex flex-wrap items-baseline">
    <span class="text-gray-400 mr-3 inline-flex items-start lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1">
      <Icon name="material-symbols:calendar-month" />
        {{ useFormatIntoFrenchDate(item.data.time_start, 'short') }}

    </span>
    <prismic-link
      class="text-indigo-400 inline-flex items-end mt-3"
      :field="item"
    >
      Plus d'information
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </prismic-link>

  </div>
</template>