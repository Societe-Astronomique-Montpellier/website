<script setup lang="ts">
export interface Props {
  id: string
}

const props = defineProps<Props>()

const { id } = toRefs(props)

import type { IPrismicDocument } from '@/types/prismic'

const { client } = usePrismic();
const { data: blockHero, pending, error } = await useAsyncData(
  "blockHero",
  (): Promise<IPrismicDocument> => client.getByID(id.value, {lang: 'fr-fr'})
);

import {
  Collapse,
  Ripple,
  initTWE,
} from "tw-elements";
initTWE({ Collapse, Ripple });

</script>

<template>
  <div
    v-if="blockHero"
    class="relative h-96 overflow-hidden bg-cover bg-no-repeat p-12 text-center lg:h-screen"
    :style="{backgroundImage: `url(${blockHero.data.image.url})`}"
  >
    <div
        class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
      <div class="flex h-full items-center justify-center">
        <div class="text-white">
          <h2 class="mb-6 text-xl font-semibold">
            <prismic-text :field="blockHero.data.subtitle" />
          </h2>
          <h1 class="mb-4 text-4xl font-semibold">
            <prismic-text :field="blockHero.data.title" />
          </h1>

        </div>
      </div>
    </div>
  </div>
</template>

