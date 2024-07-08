<script setup lang="ts">
// https://tailwindflex.com/tag/call-to-action?page=6
// Layout
import type {HomepageDocumentData} from "~/prismicio-types";
// Interfaces
import type {IPrismicDocument} from '@/types/prismic'
import type {IBlock} from '@/types/block';

definePageMeta({
  layout: 'home',
});

// Components
const BlockHeroPresentation = defineAsyncComponent(() => import('@/components/home/BlockHeroPresentation.vue'))
const BlockTestimonial = defineAsyncComponent(() => import('~/components/home/BlockTestimonial.vue'))
const BlockThematics = defineAsyncComponent(() => import('@/components/home/BlockThemes.vue'))
const BlockCta = defineAsyncComponent(() => import('@/components/home/BlockCta.vue'))

let blockHeroRef: IBlock = reactive({
  uid: null,
  title: null,
  subtitle: null,
  image: undefined
});
let blockTestimonialRef: IBlock = reactive({
  uid: null,
  title: null,
  image: undefined,
  content: null,
})
let blockThematicsIdsRef: Ref<string[]> = ref([])
let blockCtaRef: IBlock = reactive({
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
const { data, pending, error } = await useAsyncData(
  "home", 
  async (): Promise<HomepageDocumentData> => {
    // blockHeroRef.id = documents.data.bloc_hero.id;
      // blockHeroRef.uid = documents.data.bloc_hero.uid

      // blockHeroRef.subtitle = documents.data.bloc_hero.data.subtitle;
      // blockHeroRef.image = documents.data.bloc_hero.data.image;

    return await client.getSingle('homepage', {
      lang: 'fr-fr',
      fetchLinks: [
        'block_hero.title',
        'block_hero.subtitle',
        'block_hero.image',
        'block_testimonial.title',
        'block_testimonial.content',
        'block_testimonial.image',
        'block_thematic.title',
        'block_thematic.subtitle',
        'block_thematic.image',
        'block_thematic.link',
        'block_cta.title',
        'block_cta.subtitle',
        'block_cta.image',
        'block_cta.resume',
        'block_cta.content',
        'block_cta.show_button',
        'block_cta.link',
      ]
    });
  }
);

</script>

<template>
  <div v-if="data">
    <BlockHeroPresentation
      :data="blockHeroRef"
    />

<!--    <BlockTestimonial-->
<!--      :data="blockHeroRef"-->
<!--    />-->

    <!-- thematics block -->
<!--    <BlockThematics-->
<!--      :blockIds="blockThematicsIdsRef"-->
<!--      title="Nos thématiques"-->
<!--    />-->
    
    <!-- Features -->
<!--    <BlockCta-->
<!--      :data="blockCtaRef"-->
<!--    />-->
    
    <!-- Evenements -->
  </div>
  <div v-else-if="pending">
    <p>Veuillez patienter durant le chargement des données</p>
  </div>
  <div v-else-if="error">
    <pre>{{ error }}</pre>
  </div>

</template>
