<script setup lang="ts">
// https://tailwindflex.com/@ron-hicks/blog-page
// https://flowbite.com/blocks/publisher/blog-templates/
import type {ComputedRef} from "vue";

const route = useRoute();
const prismic = usePrismic()
const { t } = useI18n();
const { isMobile } = useDevice()

definePageMeta({
  layout: 'page',
});

import type {
  AllDocumentTypes,
  PageArticleDocument,
  PageThematiqueDocument,
} from "~/prismicio-types";

const Breadcrumbs = defineAsyncComponent(() => import('@/components/Layouts/Breadcrumbs.vue'))
const HeaderPage = defineAsyncComponent(() => import('@/components/pages/HeaderPage.vue'))
const BlockListCards = defineAsyncComponent(() => import('~/components/home/BlockListCards.vue'))

// RichText serializer
import { useRichTextSerializer } from '@/composables/useRichTextSerializer'
import { useFormatIntoFrenchDate } from "@/composables/useFormatIntoFrenchDate";
import { useSeo } from "@/composables/useSeo";
import {isFilled} from "@prismicio/helpers";
import type {ImageField} from "@prismicio/client";
import type {EmptyImageFieldImage, FilledImageFieldImage} from "@prismicio/types";
import {useBannerImage} from "@/composables/useBannerImage";

const { uid } = route.params as { uid: string }

const { data: page_thematique, error} = useLazyAsyncData(
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
      thematic: response,
      publication_date: response.last_publication_date ?? response.first_publication_date,
      articles: articles
    };
  }
)


const knowMoreLabel = computed<string>(() => t('layout.knowMore'))

const richTextSerializer = useRichTextSerializer();
const formatedDate = useState('formatedDate', () => useFormatIntoFrenchDate(page_thematique.value?.publication_date, 'short'));

const imageBanner = computed<ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined>(() => useBannerImage(page_thematique.value?.thematic.data.image_banner, isMobile))
const metaTitle: ComputedRef<string> = computed<string>(() => !isFilled.keyText(page_thematique.value?.thematic.data.meta_title) ? `${page_thematique.value?.thematic.data.meta_title}` : `${page_thematique.value?.thematic.data.title}`);
const metaDescription: ComputedRef<string> = computed<string>(() => `${page_thematique.value?.thematic.data.meta_description}`);


// const metaImage: ComputedRef<string | null> = computed<string | null>(() => (isFilled.image(page_thematique.value?.thematic.data.image_vignette)) ? `${page_thematique.value?.thematic.data.image_vignette.Vignette.url}` : null)
if (metaTitle.value) {
  useSeo({
    title: `${metaTitle.value}`,
    description: `${metaDescription.value}`,
    image: null,
    imageAlt: null
  })
}

</script>

<template>
  <section v-if="page_thematique">
    <div class="max-w-screen-xl w-full mx-auto relative  mb-2"> <!-- max-w-screen-lg -->
      <HeaderPage :image="imageBanner" />
      <div class="max-w-screen-md mx-auto">
        <div
          class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <Breadcrumbs :listIds="[page_thematique.thematic.id]" :currentUid="page_thematique.thematic.uid" />
            <h1 class="text-gray-900 font-bold text-4xl mb-2 font-raleway">{{ page_thematique.thematic.data.title }}</h1>
            <h2 class="text-gray-900 font-semibold text-2xl mb-2 leading-normal">{{ page_thematique.thematic.data.subtitle }}</h2>

            <Icon name="material-symbols:arrow-right-alt" v-show="false" />
            <div class="my-8 grid gap-6 px-2">
              <prismic-rich-text
                :field="page_thematique.thematic.data.content"
                :serializer="richTextSerializer"
              />

              <div class="text-gray-700 text-xs mt-5">
                <span id="span_author" class="font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                  {{ $t('page.author')}} {{ page_thematique?.thematic.data.author }}
                </span> le
                <span id="span_date" class="font-medium hover:text-gray-900 transition duration-500 ease-in-out" v-if="formatedDate">
                  {{ formatedDate }}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <BlockListCards
        v-if="0 < page_thematique.articles.length"
        :title-block="knowMoreLabel"
        :items="page_thematique.articles"
        :parentItem="page_thematique.thematic"
      />
    </div>
  </section>
</template>

<style scoped>

</style>
