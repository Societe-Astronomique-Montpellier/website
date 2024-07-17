<script setup lang="ts">
import type {EventDocument} from "@/prismicio-types";

export interface Props {
  item: EventDocument
}

const props = defineProps<Props>()
const { item } = toRefs(props)
</script>

<template>
    <div v-if="item" class="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 rounded-lg h-64 overflow-hidden">
  <!--    780*520-->
      <prismic-image v-if="item.data.image_vignette" :field="item.data.image_vignette" class="object-cover object-center h-full w-full" />
    </div>
    <h2 class="text-xl font-medium title-font text-white mt-5">{{ item.data.title }}</h2>  
    <div class="flex items-center flex-wrap">
        <NuxtLink
            class="text-indigo-400 inline-flex items-center mt-3"
            :to="item.uid"
        >
            Plus d'information
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
        </NuxtLink>
        <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
            <Icon name="material-symbols:calendar-month" />{{ item.data.date_event }}
        </span>

    </div>
  </template>
  
