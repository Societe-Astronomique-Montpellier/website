<script setup lang="ts">
// Layout
import type {
  AllDocumentTypes,
  BlockCtaDocument,
  BlockHeroDocument,
  BlockTestimonialDocument,
  EventDocument,
  BlockContactDocument,
  HomepageDocument,
  PageThematiqueDocument,
  EventsDocument,
} from "~~/prismicio-types";

import defaultImg from "../../public/logo.png";
import type { ImageField } from "@prismicio/client";

const route = useRoute();
const prismic = usePrismic();

definePageMeta({
  layout: "home",
});

// Components
const Loading = defineAsyncComponent(() => import('@/components/Layouts/Loading.vue'))

const BlockHeroPresentation = defineAsyncComponent(() => import("~/components/home/BlockHeroPresentation.vue"));
const BlockTestimonial = defineAsyncComponent(() => import("~/components/home/BlockTestimonial.vue"));
const BlockThematics = defineAsyncComponent(() => import("~/components/home/BlockThematics.vue"));
const BlockCta = defineAsyncComponent(() => import("~/components/home/BlockCta.vue"));
const BlockCtaDark = defineAsyncComponent(() => import("~/components/home/BlockCtaDark.vue"));
const BlockAgenda = defineAsyncComponent(() => import('@/components/home/BlockAgenda.vue'))
const BlockContact = defineAsyncComponent(() => import("~/components/home/BlockContact.vue"));

interface BlockHeroData {
  title?: string;
  subtitle?: string;
  background_image?: ImageField;
  title_part_1?: string;
  title_part_2?: string;
  carousel: BlockHeroDocument["data"]["carousel"];
  button_left?: BlockHeroDocument["data"]["button_left"];
  text_button_left?: string;
  button_right?: BlockHeroDocument["data"]["button_right"];
  text_button_right?: string;
}

interface RelatedBlockHero {
  data: BlockHeroData;
}

// Prismic
const { data: home, error, pending } = useAsyncData("home", async () => {
  const currentLang = useLang();
  const response = await prismic.client.getSingle<HomepageDocument>(
    "homepage",
    {
      lang: currentLang.value,
      fetchLinks: [
        "block_hero.title",
        "block_hero.subtitle",
        "block_hero.background_image",
        "block_hero.title_part_1",
        "block_hero.title_part_2",
        "block_hero.carousel",
        "block_hero.button_left",
        "block_hero.text_button_left",
        "block_hero.button_right",
        "block_hero.text_button_right",
        "block_testimonial.title",
        "block_testimonial.content",
        "block_testimonial.testimonial_text_1",
        "block_testimonial.testimonial_text_2",
        "block_testimonial.testimonial_text_3",
        "block_testimonial.testimonial_vignette_1",
        "block_testimonial.testimonial_vignette_2",
        "block_testimonial.testimonial_vignette_3",
        "block_testimonial.link_label",
        "block_testimonial.link",
        "data.block_thematiques",
        "block_cta.suptitle",
        "block_cta.title",
        "block_cta.subtitle",
        "block_cta.image",
        "block_cta.resume",
        "block_cta.content",
        "block_cta.display_button_link",
        "block_cta.link",
        // "block_cta_dark.suptitle",
        // "block_cta_dark.title",
        // "block_cta_dark.subtitle",
        // "block_cta_dark.image",
        // "block_cta_dark.resume",
        // "block_cta_dark.content",
        // "block_cta_dark.display_button_link",
        // "block_cta_dark.link",
        // Contact
        "block_contact.title",
        "block_contact.subtitle",
        "block_contact.content",
        "block_contact.content_bottom",
        "block_contact.link",
      ],
    },
  );

  /**
   * Blocks
   */
  const relatedBlockHero = response.data.block_hero as RelatedBlockHero;

  const relatedBlockTestimonial = response.data
    .block_testimonial as typeof response.data.block_testimonial & {
    data: Pick<
      BlockTestimonialDocument["data"],
      | "title"
      | "content"
      | "testimonial_text_1"
      | "testimonial_text_2"
      | "testimonial_text_3"
      | "testimonial_vignette_1"
      | "testimonial_vignette_2"
      | "testimonial_vignette_3"
      | "link_label"
      | "link"
    >;
  };

  const relatedBlockCta = response.data
    .block_cta as typeof response.data.block_cta & {
    data: Pick<
      BlockCtaDocument["data"],
      | "suptitle"
      | "title"
      | "subtitle"
      | "image"
      | "resume"
      | "content"
      | "display_button_link"
      | "link"
    >;
  };

  const relatedBlockCtaDark = response.data
      .block_cta_dark as typeof response.data.block_cta_dark & {
    data: Pick<
        BlockCtaDocument["data"],
        | "suptitle"
        | "title"
        | "subtitle"
        | "image"
        | "resume"
        | "content"
        | "display_button_link"
        | "link"
    >;
  };

  const relatedBlockContact = response.data
    .block_contact as typeof response.data.block_contact & {
    data: Pick<
      BlockContactDocument["data"],
      "title" | "subtitle" | "content" | "content_bottom" | "link"
    >;
  };

  const listThematicsId: Array<string> = response.data.block_thematiques.map(
    (block: any) => block.thematics_list.id,
  );

  /**
   * Content-types data
   */
  const dateNow: string = new Date().toISOString().split("T")[0] ?? "";
  const [thematics, agenda, events] = await Promise.all([
    (await prismic.client.getAllByIDs<AllDocumentTypes>(
      listThematicsId,
    )) as PageThematiqueDocument[],
    (await prismic.client.getSingle("events", {
      lang: currentLang.value,
    })) as EventsDocument,
    (await prismic.client.getAllByType<AllDocumentTypes>("event", {
      filters: [prismic.filter.dateAfter("my.event.time_start", dateNow)],
      orderings: {
        field: "my.event.time_start",
        direction: "asc",
      },
      limit: 3,
      lang: currentLang.value,
    })) as EventDocument[],
  ]);

  return {
    data: response.data,
    agendaHome: agenda,
    blocks: {
      hero: relatedBlockHero,
      testimonial: relatedBlockTestimonial,
      thematics: thematics,
      cta: relatedBlockCta,
      cta_dark: relatedBlockCtaDark,
      events: events,
      contact: relatedBlockContact,
    },
  };
});

// SEO
const { title: metaTitle, description: metaDescription, image: metaImage } = usePrismicSeo({
  title: () => [
    `${home.value?.data.meta_title}`,
    `Société Astronomique de Montpellier`,
  ],
  description: () => [
    `${home.value?.data.meta_description}`,
    `Société Astronomique de Montpellier`,
  ],
  image: () => [home.value?.data.meta_image],
  defaultImage: defaultImg as string,
});

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: metaImage,
});
</script>

<template>
  <div v-if="pending">
    <Loading />
  </div>
  <div v-else-if="home">
    <BlockHeroPresentation :block="home.blocks.hero" />

    <main class="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-24 space-y-36 text-slate-200 font-sans overflow-hidden">
      <BlockTestimonial :block="home.blocks.testimonial" />

      <BlockThematics
        :items="home.blocks.thematics"
        :title="home.data.block_thematics_title"
        :subtitle="home.data.bloc_thematic_text"
      />

      <BlockCta :block="home.blocks.cta" />
      <BlockCtaDark :block="home.blocks.cta_dark" />

      <BlockAgenda
        :title-block="home.data.block_events_title"
        :sub-title-block="home.data.block_events_text"
        :items="home.blocks.events"
        :agenda="home.agendaHome"
      />

      <BlockContact :block="home.blocks.contact" />

    </main>
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>
</template>

<style scoped>
.transition-opacity {
  transition: opacity 1s ease-in-out;
}
</style>
