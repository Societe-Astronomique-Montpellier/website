<script setup lang="ts">
definePageMeta({
  layout: 'page',
});

// https://tailwindflex.com/@ron-hicks/blog-page
// https://flowbite.com/blocks/publisher/blog-templates/
import type {ComputedRef} from "vue";

const route = useRoute();
const prismic = usePrismic()
const { t } = useI18n();
const { isMobile } = useDevice()

import {isFilled} from "@prismicio/helpers";
import type {ImageField} from "@prismicio/client";
import type {EmptyImageFieldImage, FilledImageFieldImage} from "@prismicio/types";
import type {
  AllDocumentTypes,
  PageArticleDocument,
  PageThematiqueDocument,
} from "~/prismicio-types";

const Breadcrumbs = defineAsyncComponent(() => import('@/components/Layouts/Breadcrumbs.vue'))
const HeaderPage = defineAsyncComponent(() => import('@/components/pages/HeaderPage.vue'))
const BlockListCards = defineAsyncComponent(() => import('~/components/home/BlockListCards.vue'))

// RichText serializer
import { useSocialShareMedia } from "@/composables/useSocialShareMedia";
import { useRichTextSerializer } from '@/composables/useRichTextSerializer'
import { useFormatIntoFrenchDate } from "@/composables/useFormatIntoFrenchDate";
import { useSeo } from "@/composables/useSeo";
import { useBannerImage } from "@/composables/useBannerImage";

const { uid } = route.params as { uid: string }

const { data, error} = useAsyncData(
  uid,
  async () => {
    const response = await prismic.client.getByUID<PageThematiqueDocument>('page_thematique', uid)
    const articles = await prismic.client.getAllByType<AllDocumentTypes>('page_article', {
      filters: [
        // prismic.filter.at('document.type', 'page_thematique'),
        prismic.filter.at('my.page_article.thematic', response.id)
      ],
      orderings: {
        field: 'my.page_article.date_modification',
        direction: 'desc'
      },
    }) as PageArticleDocument[]

    return {
      page_thematic: response,
      publication_date: response.last_publication_date ?? response.first_publication_date,
      articles: articles
    };
  }
)

const knowMoreLabel = computed<string>(() => t('layout.knowMore'))
const shareSocialMedia = useSocialShareMedia();
const richTextSerializer = useRichTextSerializer();
const formatedDate = useState('formatedDate', () => useFormatIntoFrenchDate(data.value?.publication_date, 'short'));

const imageBanner = computed<ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined>(() => useBannerImage(data.value?.page_thematic.data.image_banner, isMobile))
const metaTitle = computed<string>(() => !isFilled.keyText(data.value?.page_thematic.data.meta_title) ? `${data.value?.page_thematic.data.meta_title}` : `${data.value?.page_thematic.data.title}`);
const metaDescription = computed<string>(() => `${data.value?.page_thematic.data.meta_description}`);

useSeo({
  title: metaTitle.value,
  description: metaDescription.value,
  image: data.value?.page_thematic.data.image_vignette.vignette,
  imageAlt: null
})
</script>

<template>
  <section v-if="data">
    <div class="max-w-screen-xl w-full mx-auto relative  mb-2"> <!-- max-w-screen-lg -->
      <HeaderPage :image="imageBanner" />
      <div class="max-w-screen-md mx-auto">
        <div
          class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10" >
            <Breadcrumbs :listIds="[data.page_thematic.id]" :currentUid="data.page_thematic.uid" />
            <h1 class="text-gray-900 font-bold text-4xl mb-2 font-raleway">{{ data.page_thematic.data.title }}</h1>
            <h2 class="text-gray-900 font-semibold text-2xl mb-2 leading-normal">{{ data.page_thematic.data.subtitle }}</h2>

            <Icon name="material-symbols:arrow-right-alt" v-show="false" />
            <div :class="(isMobile) ? `my-4 grid gap-4 px-1`: `my-8 grid grid-cols-[50px_1fr] gap-4 px-2`">
              <div class="flex flex-col space-y-4 mt-3" data-side v-if="!isMobile">
                <SocialShare
                  v-for="network in shareSocialMedia"
                  :key="network"
                  :network="network.social_network"
                >
                </SocialShare>
              </div>
              <div data-content>
                <prismic-rich-text
                  :field="data.page_thematic.data.content"
                  :serializer="richTextSerializer"
                />

                <div class="text-gray-700 text-xs mt-5">
                  <span id="span_author" class="font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                    {{ $t('page.author')}} {{ data.page_thematic.data.author }}
                  </span> le
                    <span id="span_date" class="font-medium hover:text-gray-900 transition duration-500 ease-in-out" v-if="formatedDate">
                    {{ formatedDate }}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      <BlockListCards
        v-if="0 < data.articles.length"
        :title-block="knowMoreLabel"
        :items="data.articles"
        :parentItem="data.page_thematic"
      />
    </div>
  </section>
</template>

<style scoped>

</style>
