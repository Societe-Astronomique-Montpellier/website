<script setup lang="ts">
// https://tailwindflex.com/tag/call-to-action?page=6
// Layout
import type {
  AllDocumentTypes,
  BlockHeroDocument,
  BlockHeroDocumentData,
  HomepageDocument,
  HomepageDocumentData
} from "~/prismicio-types";

definePageMeta({
  layout: 'home',
});

// Components
// const BlockHeroPresentation = defineAsyncComponent(() => import('@/components/home/BlockHeroPresentation.vue'))
// const BlockTestimonial = defineAsyncComponent(() => import('~/components/home/BlockTestimonial.vue'))
// const BlockThematics = defineAsyncComponent(() => import('@/components/home/BlockThemes.vue'))
// const BlockCta = defineAsyncComponent(() => import('@/components/home/BlockCta.vue'))

// Prismic
const { client } = usePrismic()
const { data: home, error} = await useAsyncData<HomepageDocument>("home", () => client.getSingle<HomepageDocument>('homepage', {
      lang: 'fr-fr',
      fetchLinks: [
        'block_hero.title',
        'block_hero.subtitle',
        'block_hero.image',
        // 'block_testimonial.title',
        // 'block_testimonial.content',
        // 'block_testimonial.image',
        // 'block_thematic.title',
        // 'block_thematic.subtitle',
        // 'block_thematic.image',
        // 'block_thematic.link',
        // 'block_cta.title',
        // 'block_cta.subtitle',
        // 'block_cta.image',
        // 'block_cta.resume',
        // 'block_cta.content',
        // 'block_cta.show_button',
        // 'block_cta.link'
      ]
    })
);

const relatedBlockHero = home.data.block_hero as typeof home.data.block_hero & {
  data: Pick<BlockHeroDocument['data'], 'title' | 'subtitle' | 'image'>
}

</script>

<template>
  <div v-if="home">
<!--    <BlockHeroPresentation-->
<!--      :block="home.data.bloc_hero as BlockHeroDocumentData"-->
<!--    />-->


<!--    <BlockTestimonial-->
<!--      :block="blockHeroRef"-->
<!--    />-->

    <!-- thematics block -->
<!--    <BlockThematics-->
<!--      :block="blockThematicsIdsRef"-->
<!--      title="Nos thématiques"-->
<!--    />-->
    
    <!-- Features -->
<!--    <BlockCta-->
<!--      :block="blockCtaRef"-->
<!--    />-->
    
    <!-- Evenements -->
  </div>
  <div v-else-if="error">
    <pre>{{ error }}</pre>
  </div>

</template>
