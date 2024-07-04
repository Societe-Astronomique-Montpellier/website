<script setup lang="ts">
export interface Props {
  id: string,
  type: string
}

const props = defineProps<Props>()

const { id } = toRefs(props)
const { type } = toRefs(props)

import type { IPrismicDocument } from '@/types/prismic'

const { client } = usePrismic();
const { data: block, pending, error } = await useAsyncData(
  "block", 
  (): Promise<IPrismicDocument> => client.getByID(id.value, {lang: 'fr-fr'})
);

//const title = computed(() => asText(block.data.title))
//const subtitle = computed(() => asText(block.data.subtitile))
const getHeight = () => (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)+64;
</script>

<template>
  <v-parallax
    cover
    :src="block.data.image.url"
    :height="getHeight()"
    v-if="block"
  >
    <v-row
      class="w-auto fill-height"
      align="center"
      justify="center"
    >
      <div class="text-h2">
        <h2><prismic-text :field="block.data.subtitle" wrapper="h2" /></h2>
        <h1><prismic-text :field="block.data.title" wrapper="h1" /></h1>
      </div>  
    </v-row>
  </v-parallax>
</template>

<style scoped>

</style>
