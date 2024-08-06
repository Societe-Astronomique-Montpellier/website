<script setup lang="ts">
import type {EventDocument, EventsDocument} from "@/prismicio-types";
import type {ImageField} from "@prismicio/client";

const { t } = useI18n();

export interface Props {
  item: EventDocument,
  parentItem: EventsDocument
}

const props = defineProps<Props>()
const { item } = toRefs(props)

import {useFormatIntoFrenchDate} from "~/composables/useFormatIntoFrenchDate";
const startDate = useFormatIntoFrenchDate(item.value?.data.time_start, 'short');

const imageVignette = computed<ImageField>(() => (item.value.data.image_vignette.hasOwnProperty('Vignette') ? item.value.data.image_vignette.Vignette : item.value.data.image_vignette ))

</script>

<template>

  <div v-if="item" class="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 rounded-md h-64 overflow-hidden">
    <!--    780*520-->
    <prismic-link :field="item">
      <div class="relative">
        <prismic-image v-if="imageVignette" :field="imageVignette" class="object-cover object-center h-full w-full" />
        <div v-if="item.data.time_start" class="mt-1 absolute inset-0 z-10 flex justify-center items-center text-xl text-white bg-gradient-to-t from-gray-900">{{ startDate }}</div>
      </div>

    </prismic-link>
  </div>

  <h4 class="z-10 gap-y-1 overflow-hidden mt-3 text-2xl leading-8 text-white">{{ item.data.title }}</h4>
  <div class="flex flex-wrap items-baseline">
    <prismic-link
      class="text-indigo-400 inline-flex items-start mt-5"
      :field="item"
    >
      {{ $t('layout.moreInfo') }}&nbsp;<Icon name="material-symbols:arrow-right-alt" size="20" />
    </prismic-link>

  </div>
</template>