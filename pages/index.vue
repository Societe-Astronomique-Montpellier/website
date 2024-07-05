<script setup lang="ts">
// https://tailwindflex.com/tag/call-to-action?page=6
// Layout
definePageMeta({
  layout: 'home',
});

// Components
const HeroPresentation = defineAsyncComponent(() => import('@/components/home/HeroPresentation.vue'))
const Testimonial = defineAsyncComponent(() => import('@/components/home/Testimonial.vue'))
const BlockCta = defineAsyncComponent(() => import('@/components/home/BlockCta.vue'))

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

    <!-- thematics block -->
    <p>Liste des thématiques à venir...</p>
    
    <!-- Features -->
    <BlockCta
      :id="document.data.block_cta.id"
    />  
    
    <!-- Evenements -->
  </div>
  <div v-else>
    <p>Load data...</p>
  </div>	
</template>
