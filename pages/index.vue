<script setup lang="ts">
// https://tailwindflex.com/tag/call-to-action?page=6
const prismic = usePrismic()

// Layout
import type {
  AllDocumentTypes,
  BlockCtaDocument,
  BlockHeroDocument,
  BlockTestimonialDocument, EventDocument,
  BlockContactDocument,
  HomepageDocument, PageThematiqueDocument, EventsDocument
} from "~/prismicio-types";

definePageMeta({
  layout: 'home',
});

const dateNow: Ref<string> = ref(new Date().toISOString().split('T')[0]);

// Components
const BlockHeroPresentation = defineAsyncComponent(() => import('@/components/home/BlockHeroPresentation.vue'))
const BlockTestimonial = defineAsyncComponent(() => import('~/components/home/BlockTestimonial.vue'))
const BlockListCards = defineAsyncComponent(() => import('~/components/home/BlockListCards.vue'))
const BlockCta = defineAsyncComponent(() => import('@/components/home/BlockCta.vue'))
const BlockContact = defineAsyncComponent(() => import('@/components/home/BlockContact.vue'))

// Prismic
const { data: home, error} = await useAsyncData(
  "home",
  async () => {
    const response = await prismic.client.getSingle<HomepageDocument>('homepage', {
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
        'data.block_thematiques',
//        'item.thematics_list',

        'block_cta.title',
        'block_cta.subtitle',
        'block_cta.image',
        'block_cta.resume',
        'block_cta.content',
        'block_cta.display_button_link',
        'block_cta.link',
        // Contact
        'block_contact.title',
        'block_contact.subtitle',
        'block_contact.content',
        'block_contact.link'
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

    const relatedBlockContact = response.data.block_contact as typeof response.data.block_contact & {
      data: Pick<BlockContactDocument['data'], 'title' | 'subtitle' | 'content' | 'link'>
    }

    const listThematicsId: Array<string> = response.data.block_thematiques.map((block: any) => block.thematics_list.id)

    const thematics = await prismic.client.getAllByIDs<AllDocumentTypes>(listThematicsId) as PageThematiqueDocument[];
    const agenda = await prismic.client.getSingle('events', {lang: 'fr-fr'}) as EventsDocument;
    const events = await prismic.client.getAllByType<AllDocumentTypes>('event', {
      filters: [ prismic.filter.dateAfter('my.event.time_start', dateNow.value) ],
      orderings: {
        field: 'my.event.time_start',
        direction: 'asc'
      },
      limit: 3
    }) as EventDocument[]
    return {
      data: response.data,
      agendaHome: agenda,
      blocks: {
        hero: relatedBlockHero,
        testimonial: relatedBlockTestimonial,
        thematics: thematics,
        cta: relatedBlockCta,
        events: events,
        contact: relatedBlockContact
      }
    }
  }
);

useHead({
  title: computed<string>(() => `${home.value?.data.meta_title} | ${home.value?.data.titre}`),
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
  <a id="hero" />
  <div v-if="home">
    <BlockHeroPresentation
      :block="home.blocks.hero"
    />

    <a id="testimonial" />
    <BlockTestimonial
      :block="home.blocks.testimonial"
    />

    <!-- thematics block -->
    <a id="thematics" />
    <BlockListCards
      :titleBlock="home.data.block_thematics_title"
      :items="home.blocks.thematics"
      :parentItem=null
    >
      <template v-slot:content-block-top>
        <p v-if="home.data.bloc_thematic_text" class="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">{{ home.data.bloc_thematic_text }}</p>
      </template>
    </BlockListCards>

<!--    -->
    <!-- Call to action -->
    <a id="cta" />
    <BlockCta
      :block="home.blocks.cta"
    />

    <!-- Evenements -->
    <a id="events" />
    <BlockListCards
      :titleBlock="home.data.block_events_title"
      :items="home.blocks.events"
      :parentItem="home.agendaHome"
    >
      <template v-slot:content-block-bottom>
        <NuxtLink to="/agenda" class="text-indigo-400 inline-flex items-start mt-4 text-xl">
          {{ home.data.block_events_text }}&nbsp;<Icon name="material-symbols:arrow-right-alt" size="20" />
        </NuxtLink>
      </template>
    </BlockListCards>

    <!-- contact -->
    <BlockContact :block="home.blocks.contact" />
  </div>
  <div v-else-if="error">
    <pre>{{ error }}</pre>
  </div>

</template>
