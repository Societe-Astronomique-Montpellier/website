<script setup lang="ts">
// https://tailwindflex.com/tag/call-to-action?page=6
// Layout
definePageMeta({
  layout: 'home',
});

// Components
const BlockHeroPresentation = defineAsyncComponent(() => import('@/components/home/BlockHeroPresentation.vue'))
const BlockTestimonial = defineAsyncComponent(() => import('~/components/home/BlockTestimonial.vue'))
const BlockThematics = defineAsyncComponent(() => import('@/components/home/BlockThemes.vue'))
const BlockCta = defineAsyncComponent(() => import('@/components/home/BlockCta.vue'))

// Interfaces
import type { IPrismicDocument } from '@/types/prismic'
import type { IBlock } from '@/types/block';

//import { useFillCommonProperties } from '@/composables/useFillCommonProperties';

let blockHeroRef: IBlock = reactive({
  id: null,
  uid: null,
  title: null,
  subtitle: null,
  image: undefined
});
let blockTestimonialRef: IBlock = reactive({
  id: null,
  uid: null,
  title: null,
  image: undefined,
  content: null,
})
let blockThematicsIdsRef: Ref<string[]> = ref([])
let blockCtaRef: IBlock = reactive({
  id: null,
  uid: null,
  title: null,
  subtitle: null,
  image: undefined,
  content: null,
  showButton: false,
  link: null
});


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
        'sam_block_thematic.title',
        'sam_block_thematic.subtitle',
        'sam_block_thematic.image',
        'sam_block_thematic.link',
        'sam_block_cta.title',
        'sam_block_cta.subtitle',
        'sam_block_cta.image',
        'sam_block_cta.resume',
        'sam_block_cta.content',
        'sam_block_cta.show_button',
        'sam_block_cta.link',
      ]
    })
    
    if (document.data.hero) {
      Object.keys(blockHeroRef).forEach(key => key in document.data.hero.data && (blockHeroRef[key] = document.data.hero.data[key]));
      blockHeroRef.id = document.data.hero.id;
    }

    if (document.data.testimonial) {
      Object.keys(blockTestimonialRef).forEach(key => key in document.data.testimonial.data && (blockTestimonialRef[key] = document.data.testimonial.data[key]));
      blockTestimonialRef.id = document.data.testimonial.id;
    }

    if (document.data.group_thematics) {
      console.log(document.data.thematic.group_thematics)
    }

    if (document.data.block_cta) {
      Object.keys(blockTestimonialRef).forEach(key => key in document.data.block_cta.data && (blockCtaRef[key] = document.data.block_cta.data[key]));
      blockCtaRef.id = document.data.block_cta.id;
    }
    
    return document;
  }
);

</script>

<template>
  <div v-if="document">
    <BlockHeroPresentation
      :data="blockHeroRef" 
    />

    <BlockTestimonial
      :data="blockTestimonialRef"
    />

    <!-- thematics block -->
<!--    <BlockThematics-->
<!--      :blockIds="blockThematicsIdsRef"-->
<!--      title="Nos thématiques"-->
<!--    />-->
    
    <!-- Features -->
    <BlockCta
      :data="blockCtaRef"
    />
    
    <!-- Evenements -->
  </div>
  <div v-else-if="pending">
    <p>Veuillez patienter durant le chargement des données</p>
  </div>
  <div v-else-if="error">
    ERROR !!!!!!!!!!!!!
  </div>

</template>
