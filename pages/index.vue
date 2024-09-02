<script setup lang="ts">
// https://tailwindflex.com/tag/call-to-action?page=6
import type {ComputedRef} from "vue";

const prismic = usePrismic()
import { useSeo } from '@/composables/useSeo';

// Layout
import type {
  AllDocumentTypes,
  BlockCtaDocument,
  BlockHeroDocument,
  BlockTestimonialDocument, EventDocument,
  BlockContactDocument,
  HomepageDocument, PageThematiqueDocument, EventsDocument
} from "~/prismicio-types";
import {isFilled} from "@prismicio/helpers";

definePageMeta({
  layout: 'home',
});

// Components
const BlockHeroPresentation = defineAsyncComponent(() => import('@/components/home/BlockHeroPresentation.vue'))
const BlockTestimonial = defineAsyncComponent(() => import('~/components/home/BlockTestimonial.vue'))
const BlockListCards = defineAsyncComponent(() => import('~/components/home/BlockListCards.vue'))
const BlockCta = defineAsyncComponent(() => import('@/components/home/BlockCta.vue'))
const BlockContact = defineAsyncComponent(() => import('@/components/home/BlockContact.vue'))

// Prismic
const { data: home, error} = useAsyncData(
  "home",
  async () => {
    const response = await prismic.client.getSingle<HomepageDocument>('homepage', {
      lang: 'fr-fr',
      fetchLinks: [
        'block_hero.title',
        'block_hero.subtitle',
        'block_hero.carousel',
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

    /**
     * Blocks
     */
    const relatedBlockHero = response.data.block_hero as typeof response.data.block_hero & {
      data: Pick<BlockHeroDocument['data'], 'title' | 'subtitle' | 'carousel'>
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

    /**
     * Content-types data
     */
    const dateNow = new Date().toISOString().split('T')[0];
    const [thematics, agenda, events] = await Promise.all([
      await prismic.client.getAllByIDs<AllDocumentTypes>(listThematicsId) as PageThematiqueDocument[],
      await prismic.client.getSingle('events', {lang: 'fr-fr'}) as EventsDocument,
      await prismic.client.getAllByType<AllDocumentTypes>('event', {
        filters: [ prismic.filter.dateAfter('my.event.time_start', dateNow) ],
        orderings: {
          field: 'my.event.time_start',
          direction: 'asc'
        },
        limit: 3
      }) as EventDocument[]
    ])

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

const metaTitle: ComputedRef<string> = computed<string>(() => !isFilled.keyText(home.value?.data.meta_title) ? `${home.value?.data.meta_title}` : `Société Astronomique de Montpellier`);
const metaDescription: ComputedRef<string> = computed<string>(() => (isFilled.keyText(home.value?.data.meta_description)) ? `${home.value?.data.meta_description}` : ``);

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: '',
});
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
    <BlockListCards
      :titleBlock="home.data.block_thematics_title"
      :items="home.blocks.thematics"
      :parentItem=null
    >
      <template v-slot:content-block-top>
        <p v-if="home.data.bloc_thematic_text" class="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">{{ home.data.bloc_thematic_text }}</p>
      </template>
    </BlockListCards>

    <!-- Call to action -->
    <BlockCta
      :block="home.blocks.cta"
    />

    <!-- Evenements -->
    <BlockListCards
      :titleBlock="home.data.block_events_title"
      :items="home.blocks.events"
      :parentItem="home.agendaHome"
    >
      <template v-slot:content-block-bottom>
        <NuxtLink to="/agenda" class="text-indigo-400 inline-flex items-start mt-4 text-xl" aria-label="agenda">
          {{ home.data.block_events_text }}&nbsp;<Icon name="material-symbols:arrow-right-alt" size="20" />
        </NuxtLink>
      </template>
    </BlockListCards>

    <!-- contact -->
    <BlockContact :block="home.blocks.contact" />
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>

</template>
