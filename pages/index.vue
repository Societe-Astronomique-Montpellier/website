<script setup lang="ts">
// https://tailwindflex.com/tag/call-to-action?page=6
// Layout
definePageMeta({
  layout: 'home',
});

// Components
const HeroPresentation = defineAsyncComponent(() => import('@/components/home/HeroPresentation.vue'))
const Testimonial = defineAsyncComponent(() => import('@/components/home/Testimonial.vue'))
const BlockThematics = defineAsyncComponent(() => import('@/components/home/BlockThemes.vue'))
const BlockCta = defineAsyncComponent(() => import('@/components/home/BlockCta.vue'))

interface IBlockThematic {
  thematics: {
    id: string
  };
}

const blockThematicsIdsRef: Ref<string[]> = ref([])

// Prismic
import type { IPrismicDocument } from '@/types/prismic'

const { client } = usePrismic()
const { data: document, pending, error } = await useAsyncData(
  "home", 
  async (): Promise<IPrismicDocument> => {
    const document = await client.getSingle('sam_homepage', {lang: 'fr-fr'})
    if (document.data.group_thematics) {
      document.data.group_thematics.forEach((block: IBlockThematic) => blockThematicsIdsRef.value.push(block.thematics.id))
    }
    
    return document;
  }
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
    <BlockThematics
      :blockIds="blockThematicsIdsRef"
      title="Nos thématiques"
    />
    
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
