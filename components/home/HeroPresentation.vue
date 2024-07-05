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
  <v-parallax
    v-if="blockHero"
    cover
    :src="blockHero.data.image.url"
  >
    <v-row
      class="w-auto fill-height"
      align="center"
      justify="center"
    >
      <div class="text-h2 text-white">
        <prismic-text :field="blockHero.data.subtitle" wrapper="h2" />
        <prismic-text :field="blockHero.data.title" wrapper="h1" />
      </div>  
    </v-row>
  </v-parallax>
</template>

