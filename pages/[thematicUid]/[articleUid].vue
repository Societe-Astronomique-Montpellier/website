<script setup lang="ts">
definePageMeta({
  layout: 'page',
});

import {asImageSrc, isFilled} from "@prismicio/helpers";
import type {ComputedRef} from "vue";
import type {ImageField} from "@prismicio/client";
import type {EmptyImageFieldImage, FilledImageFieldImage} from "@prismicio/types";
import type { PageArticleDocument, PageThematiqueDocument} from "~/prismicio-types";

const prismic = usePrismic();
const { isMobile } = useDevice()
const route = useRoute();
const { locale } = useI18n()

const HeaderPage = defineAsyncComponent(() => import('~/components/pages/HeaderPage.vue'))
const Breadcrumbs = defineAsyncComponent(() => import('~/components/Layouts/Breadcrumbs.vue'))
const Fancybox = defineAsyncComponent(() => import("~/components/content/Fancybox.vue"));

const { thematicUid, articleUid } = route.params as { thematicUid: string, articleUid: string }
const { data: article, error} = useAsyncData(
    articleUid,
    async () => await prismic.client.getByUID<PageArticleDocument>('page_article', articleUid, {lang: locale.value})
)

const { data: parentThematic} = useAsyncData(
    thematicUid,
    async () => await prismic.client.getByUID<PageThematiqueDocument>('page_thematique', thematicUid, { lang: locale.value })
)

const richTextSerializer = useRichTextSerializer();

const formatedDate = useState('formatedDate', () => useFormatIntoFrenchDate(article.value?.last_publication_date, 'short'));
const imageBanner = computed<ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined>(() => useBannerImage(article.value?.data.image_banner, isMobile))

const metaTitle: ComputedRef<string> = computed<string>(() => {
  return (!isFilled.keyText(article.value?.data.meta_title))
    ? `${article.value?.data.meta_title}`
    : `${article.value?.data.title}`
});
const metaDescription: ComputedRef<string> = computed<string>(() => `${article.value?.data.meta_description}`);
const metaImage = computed(() => asImageSrc(article.value?.data.meta_image))

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: metaImage,
})
</script>

<template>
  <div class="max-w-screen-lg w-full mx-auto relative mb-2" v-if="article">
    <Breadcrumbs v-if="parentThematic && article" :listIds="[parentThematic?.id, article.id]" :currentUid="articleUid" />
    <h1 class="text-gray-900 font-bold text-4xl my-8 text-center">{{ article?.data.title }}</h1>
    <HeaderPage
        :image="imageBanner"
    />
    <div class="max-w-3xl mx-auto">
      <div
          class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
        <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10  leading-normal">
          <h2 v-if="isFilled.keyText(article.data.subtitle)" class="text-gray-900 font-semibold text-2xl mb-2">{{ article?.data.subtitle }}</h2>
          <Icon name="material-symbols:arrow-right-alt" v-show="false" />
          <div class="my-4 grid gap-4 px-1">
            <div data-content>
              <Fancybox
                :isCaroussel="article?.data.carrousel"
              >
                <prismic-rich-text
                    :field="article.data.content"
                    :serializer="richTextSerializer"
                ></prismic-rich-text>
              </Fancybox>
              <p class="text-gray-700 text-xs mt-5">
            <span id="span_author" class="font-medium hover:text-gray-900 transition duration-500 ease-in-out">
              {{ $t('page.author') }} {{ article?.data.author }}
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