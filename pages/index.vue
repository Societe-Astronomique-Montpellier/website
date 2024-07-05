<script setup lang="ts">

// Layout
definePageMeta({
  layout: 'home',
});

// Components
const HeroPresentation = defineAsyncComponent(() => import('@/components/home/HeroPresentation.vue'))
const Testimonial = defineAsyncComponent(() => import('@/components/home/Testimonial.vue'))

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
    />

    <Testimonial
      :id="document.data.testimonial.id"
    />
  </div>
  <div v-else>
    <p>Load data...</p>
  </div>	
</template>

<style scoped>

</style>
