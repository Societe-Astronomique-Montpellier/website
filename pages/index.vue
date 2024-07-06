<script setup lang="ts">
// https://tailwindflex.com/tag/call-to-action?page=6
// Layout
definePageMeta({
  layout: 'home',
});

// Components
const BlockHeroPresentation = defineAsyncComponent(() => import('@/components/home/BlockHeroPresentation.vue'))
const Testimonial = defineAsyncComponent(() => import('@/components/home/Testimonial.vue'))
const BlockThematics = defineAsyncComponent(() => import('@/components/home/BlockThemes.vue'))
const BlockCta = defineAsyncComponent(() => import('@/components/home/BlockCta.vue'))

// Interfaces
import type { IPrismicDocument } from '@/types/prismic'
import type { IBlock } from '@/types/block';

//import { useFillCommonProperties } from '@/composables/useFillCommonProperties';

let blockHeroRef: IBlock = reactive({
  id: '',
  uid: null,
  title: '',
  subtitle: null,
  image: null,
  content: [], 
  resume: null, 
  showButton: null,
  link: null
});
let blockTestimonialRef: IBlock = reactive({
  id: '',
  uid: null,
  title: '',
  subtitle: null,
  image: null,
  content: [], 
  resume: null, 
  showButton: null,
  link: null
})
let blockCtaRef: IBlock = reactive({
  id: '',
  uid: null,
  title: '',
  subtitle: null,
  image: null,
  content: [], 
  resume: null, 
  showButton: null,
  link: null
});

let blockThematicsIdsRef: Ref<string[]> = ref([])

// Prismic
const { client } = usePrismic()
const { data: document, pending, error } = await useAsyncData(
  "home", 
  async (): Promise<IPrismicDocument> => {
    const document = await client.getSingle('sam_homepage', {
      lang: 'fr-fr',
      fetchLinks: [
        'sam_block_hero.title',
        'sam_block_hero.subtitle',
        'sam_block_hero.image',
        'sam_block_testimonial.title',
        'sam_block_testimonial.content',
        'sam_block_testimonial.image',
        'sam_block_cta.title',
        'sam_block_cta.image',
        'sam_block_cta.subtitle',
        'sam_block_cta.content',
        'sam_block_cta.link',
      ]
    })
    
    if (document.data.hero) {
      Object.keys(blockHeroRef).forEach(key => key in document.data.hero.data && (blockHeroRef[key] = document.data.hero.data[key]));
      blockHeroRef.id = document.data.hero.id;
      //const { fillCommonProperties } = useFillCommonProperties<IBlock, T>();
      //fillCommonProperties(blockHeroRef, sourceObject);
    }

    if (document.data.group_thematics) {
      // document.data.group_thematics.forEach((block: IBlockThematic) => blockThematicsIdsRef.value.push(block.thematics.id))
    }
    
    return document;
  }
);

</script>

<template>
  <div v-if="document">
    {{ blockHeroRef }}
    <HeroPresentation
      :data="blockHeroRef" 
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
