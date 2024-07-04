<script setup lang="ts">

// Layout
definePageMeta({
  layout: 'home',
});

// Components
const HeroPresentation = defineAsyncComponent(() => import('@/components/home/HeroPresentation.vue'))

// Prismic
import type { IPrismicDocument } from '@/types/prismic'

const { client } = usePrismic()
const { data: document, pending, error } = await useAsyncData(
  "home", 
  (): Promise<IPrismicDocument> => client.getSingle('sam_homepage', {lang: 'fr-fr'})  
);
 
</script>

<template>
  <div v-if="document"> 
    <HeroPresentation
      :id="document.data.hero.id" 
      :type="document.data.hero.type"
    />
  </div>
  <div v-else>
    <p>Load data...</p>
  </div>	
</template>

<style scoped>

</style>
