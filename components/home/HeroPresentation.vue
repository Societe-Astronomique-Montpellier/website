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

//const getHeight = () => (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)+64;
</script>

<template>
  <div
    v-if="blockHero"
    class="h-screen  bg-cover bg-no-repeat"
    :style="{backgroundImage: `url(${blockHero.data.image.url})`, height: '2100px' }"
  >
    <div class="text-h2 font-weight-regular text-white">
      <prismic-text :field="blockHero.data.subtitle" wrapper="h2" />
      <prismic-text :field="blockHero.data.title" wrapper="h1" />
    </div>
  </div>
</template>

