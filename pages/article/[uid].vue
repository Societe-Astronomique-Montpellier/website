<script setup lang="ts">
definePageMeta({
  layout: 'page',
});

import {isFilled} from "@prismicio/helpers";
import type {ComputedRef} from "vue";
import type {ImageField} from "@prismicio/client";
import type {EmptyImageFieldImage, FilledImageFieldImage} from "@prismicio/types";
import type {AllDocumentTypes, PageArticleDocument, PageThematiqueDocument} from "~/prismicio-types";

const prismic = usePrismic();
const { isMobile } = useDevice()
const route = useRoute();

const HeaderPage = defineAsyncComponent(() => import('@/components/pages/HeaderPage.vue'))
const Breadcrumbs = defineAsyncComponent(() => import('@/components/Layouts/Breadcrumbs.vue'))
const Fancybox = defineAsyncComponent(() => import("@/components/content/Fancybox.vue"));


const { thematic, uid } = route.params as { thematic: string, uid: string }

const { data: article, error} = useAsyncData(
    uid,
    async () => await prismic.client.getByUID<PageArticleDocument>('page_article', uid)
)

const { data: parentThematic } = await useAsyncData(
    'parentThematic',
    async () => await prismic.client.getByUID<AllDocumentTypes>('page_thematique', thematic, {'lang': 'fr-fr'}) as PageThematiqueDocument
)

const richTextSerializer = useRichTextSerializer();
const shareSocialMedia = useSocialShareMedia();

const formatedDate = useState('formatedDate', () => useFormatIntoFrenchDate(article.value?.last_publication_date, 'short'));
const imageBanner = computed<ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined>(() => useBannerImage(article.value?.data.image_banner, isMobile))

const metaTitle: ComputedRef<string> = computed<string>(() => (isFilled.keyText(article.value?.data.meta_title)) ? `${article.value?.data.meta_title}` : `${article.value?.data.title}`);
const metaDescription: ComputedRef<string> = computed<string>(() => `${article.value?.data.meta_description}`);
const metaImage: ComputedRef<string> = computed<string>(() => (isFilled.image(article.value?.data.meta_image)) ? `${article.value?.data.meta_image.url}` : `${article.value?.data.image_vignette.vignette.url}`)

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: metaImage,
})
</script>

<template>
  <div class="max-w-screen-lg w-full mx-auto relative" v-if="article">
    <HeaderPage
      :image="imageBanner"
    />
    <div class="max-w-3xl mx-auto">
      <div
          class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
        <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
          <Breadcrumbs v-if="parentThematic && article" :listIds="[parentThematic.id, article.id]" :currentUid="article.uid" />
          <h1 class="text-gray-900 font-bold text-4xl mb-2">{{ article?.data.title }}</h1>
          <h2 class="text-gray-900 font-semibold text-2xl mb-2">{{ article?.data.subtitle }}</h2>
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
            <<div data-content>
              <Fancybox>
                <prismic-rich-text
                  :field="article.data.content"
                  :serializer="richTextSerializer"
                ></prismic-rich-text>
              </Fancybox>


              <p class="text-gray-700 text-xs mt-5">
              <span id="span_author" class="font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                {{ $t('layout.knowMore') }} {{ article?.data.author }}
              </span> le
                <span id="span_date" class="font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                {{ formatedDate }}
              </span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>