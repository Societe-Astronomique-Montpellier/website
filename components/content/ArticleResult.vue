<script setup lang="ts">
import type { PageArticleDocument } from "~/prismicio-types";
import { isFilled } from "@prismicio/helpers";

export interface Props {
  item: PageArticleDocument;
}

const props = defineProps<Props>();
const { item } = toRefs(props);
</script>

<template>
  <prismic-link
    :field="item"
    role="button"
    class="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
  >
    <div class="mr-4 grid place-items-center">
      <prismic-image
        v-if="isFilled.image(item.data?.image_vignette)"
        :field="item?.data?.image_vignette.mobile"
        class="relative inline-block h-16 w-16 !rounded-full object-cover object-center"
        loading="lazy"
      />
    </div>
    <div>
      <h6 class="text-slate-800 font-medium">
        {{ item?.data?.title }}
      </h6>
      <p class="text-slate-500 text-sm">
        {{ item?.data?.subtitle }}
      </p>
    </div>
  </prismic-link>
</template>

<style scoped></style>
