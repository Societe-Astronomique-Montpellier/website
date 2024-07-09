<script setup lang="ts">
import { type Content } from '@prismicio/client'

export interface Props {
  block: PropType<Content.BlockHeroDocument>
}

const props = defineProps<Props>()
const { block } = toRefs(props)

import {
  Collapse,
  Ripple,
  initTWE,
} from "tw-elements";

initTWE({ Collapse, Ripple });

</script>

<template>
  <div
    class="relative h-96 overflow-hidden bg-cover bg-no-repeat p-12 text-center lg:h-screen"
    :style="{backgroundImage: `url(${block?.data?.image?.url})`}"
  >
    <div
        class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
      <div class="flex h-full items-center justify-center">
        <div class="text-white">
          <h2 class="mb-6 text-xl font-semibold">
            <prismic-text :field="block.data.subtitle" />
          </h2>
          <h1 class="mb-4 text-4xl font-semibold">
            <prismic-text :field="block.data.title" />
          </h1>

        </div>
      </div>
    </div>
  </div>
</template>

