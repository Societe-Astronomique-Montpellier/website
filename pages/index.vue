<script setup lang="ts">
// https://tailwindflex.com/tag/call-to-action?page=6

import * as prismic from '@prismicio/client'

// Layout
import type {
  AllDocumentTypes,
  BlockHeroDocument,
  BlockTestimonialDocument,
  BlockCtaDocument,
  HomepageDocument,
  HomepageDocumentData
} from "~/prismicio-types";

definePageMeta({
  layout: 'home',
});

// Components
const BlockHeroPresentation = defineAsyncComponent(() => import('@/components/home/BlockHeroPresentation.vue'))
const BlockTestimonial = defineAsyncComponent(() => import('~/components/home/BlockTestimonial.vue'))
const BlockThematics = defineAsyncComponent(() => import('@/components/home/BlockThemes.vue'))
const BlockCta = defineAsyncComponent(() => import('@/components/home/BlockCta.vue'))

// Prismic
// const { client } = usePrismic<AllDocumentTypes>()
const client = prismic.createClient<AllDocumentTypes>('societe-astronomique-montpellier')

const { data: home, error} = await useAsyncData(
  "home",
  async () => {
    const response = await client.getSingle<HomepageDocument>('homepage', {
      lang: 'fr-fr',
      fetchLinks: [
        'block_hero.title',
        'block_hero.subtitle',
        'block_hero.image',
        'block_testimonial.title',
        'block_testimonial.content',
        'block_testimonial.testimonial_text_1',
        'block_testimonial.testimonial_text_2',
        'block_testimonial.testimonial_text_3',
        'block_testimonial.testimonial_vignette_1',
        'block_testimonial.testimonial_vignette_2',
        'block_testimonial.testimonial_vignette_3',
        // 'block_thematic.title',
        // 'block_thematic.subtitle',
        // 'block_thematic.image',
        // 'block_thematic.link',
        'block_cta.title',
        'block_cta.subtitle',
        'block_cta.image',
        'block_cta.resume',
        'block_cta.content',
        'block_cta.display_button_link',
        'block_cta.link'
      ]
    })

    const relatedBlockHero = response.data.block_hero as typeof response.data.block_hero & {
      data: Pick<BlockHeroDocument['data'], 'title' | 'subtitle' | 'image'>
    }

    const relatedBlockTestimonial = response.data.block_testimonial as typeof response.data.block_testimonial & {
      data: Pick<BlockTestimonialDocument['data'], 'title' | 'content' | 'testimonial_text_1' | 'testimonial_text_2' | 'testimonial_text_3' | 'testimonial_vignette_1' | 'testimonial_vignette_2' | 'testimonial_vignette_3'>
    }

    const relatedBlockCta = response.data.block_cta as typeof response.data.block_cta & {
      data: Pick<BlockCtaDocument['data'], 'title' | 'subtitle' | 'image' | 'resume' | 'content' | 'display_button_link' | 'link'>
    }
    return {
      data: response.data,
      blocks: {
        hero: relatedBlockHero,
        testimonial: relatedBlockTestimonial,
        cta: relatedBlockCta
      }
    }
  }
);

useHead({
  title: computed(() => `${home.value?.data.meta_title} | ${home.value?.data.titre}`),
  meta: [
    { name: 'description', content: `${home.value?.data.meta_description}`}
  ],
})

useSeoMeta({
  title: computed(() => `${home.value?.data.meta_title} | ${home.value?.data.titre}`),
  ogTitle: '',

})
</script>

<template>
  <div v-if="home">
    <BlockHeroPresentation
      :block="home.blocks.hero"
    />


    <BlockTestimonial
      :block="home.blocks.testimonial"
    />

    <!-- thematics block -->
    <BlockThematics
    />
    
    <!-- Features -->
    <BlockCta
      :block="home.blocks.cta"
    />
    
    <!-- Evenements -->

    <!-- contact -->
  </div>
  <div v-else-if="error">
    <pre>{{ error }}</pre>
  </div>

</template>
