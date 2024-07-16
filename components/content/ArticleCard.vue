<script setup lang="ts">
import type {PageArticleDocument} from "@/prismicio-types";

export interface Props {
  item: PageArticleDocument
}

const props = defineProps<Props>()
const { item } = toRefs(props)
</script>

<template>
  <!-- component -->
  <NuxtLink
      v-if="item"
      class="text-indigo-400 mt-3"
      :to="item.uid"
  >
    <div class="rounded-lg h-64 overflow-hidden .hover:scale-110">
      <!--    780*520-->
      <prismic-image v-if="item.data.banner_image" :field="item.data.banner_image" class="object-cover object-center h-full w-full" />
    </div>
    <h2 class="text-xl font-medium title-font text-white mt-5">{{ item.data.title }}</h2>
  </NuxtLink>
</template>
