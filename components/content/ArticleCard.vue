<script setup lang="ts">

import type {PageArticleDocument, PageThematiqueDocument} from "~/prismicio-types";

export interface Props {
  item: PageArticleDocument
  parentItem: PageThematiqueDocument
}

const props = defineProps<Props>()
const { item, parentItem } = toRefs(props)

const articleLink = computed(() => `/${parentItem.value.uid}/${item.value.uid}`)

</script>

<template>
  <!-- component -->
  <NuxtLink
    v-if="item"
    class="text-indigo-400 mt-3"
    :to="articleLink"
  >
    <div class="rounded-lg h-64 overflow-hidden transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 ">
      <!--    780*520-->
      <prismic-image v-if="item.data.image_banner.id" :field="item.data.image_banner" class="object-cover object-center h-full w-full" />
    </div>
    <h2 class="text-xl font-medium title-font text-white mt-5">{{ item.data.title }}</h2>
  </NuxtLink>
</template>
