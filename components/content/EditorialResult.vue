<script setup lang="ts">
import type { PageEditorialeDocument } from "~/prismicio-types";
import { isFilled } from "@prismicio/helpers";

export interface Props {
  item: PageEditorialeDocument;
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
    <div>
      <h6 class="text-slate-800 font-medium">
        {{ item?.data?.title }}
      </h6>
    </div>
  </prismic-link>
</template>

<style scoped></style>
