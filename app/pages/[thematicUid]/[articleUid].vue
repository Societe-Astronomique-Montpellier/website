<script setup lang="ts">
import { asImageSrc, isFilled } from "@prismicio/helpers";
import type { ComputedRef } from "vue";
import type { ImageField } from "@prismicio/client";
import type {
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/types";
import type {
  PageArticleDocument,
  PageThematiqueDocument,
} from "~~/prismicio-types";
import defaultImg from "~~/public/logo.png";

definePageMeta({
  layout: "page",
});

const prismic = usePrismic();
const { isMobile } = useDevice();
const route = useRoute();
const lang = useLang();

const HeaderPageTitle = defineAsyncComponent(() => import("~/components/pages/HeaderPageTitle.vue"),);
const AsideSocialShare = defineAsyncComponent(() => import('@/components/Layouts/AsideSocialShare.vue'))
const Breadcrumbs = defineAsyncComponent(() => import("~/components/Layouts/Breadcrumbs.vue"));
const Fancybox = defineAsyncComponent(() => import("~/components/content/Fancybox.vue"));
const Loading = defineAsyncComponent(() => import("@/components/Layouts/Loading.vue"))

const { thematicUid, articleUid } = route.params as {
  thematicUid: string;
  articleUid: string;
};

const [{ data: article, error: errorArticle, pending }, { data: parentThematic }] =
  await Promise.all([
    useAsyncData(
      articleUid,
      async () =>
        await prismic.client.getByUID<PageArticleDocument>(
          "page_article",
          articleUid,
          { lang: lang.value },
        ),
    ),
    useAsyncData(
      thematicUid,
      async () =>
        await prismic.client.getByUID<PageThematiqueDocument>(
          "page_thematique",
          thematicUid,
          { lang: lang.value },
        ),
    ),
  ]);

if (errorArticle.value) {
  throw createError({
    statusCode: errorArticle.value?.statusCode,
    statusMessage: errorArticle.value?.statusMessage,
  });
}

const richTextSerializer = useRichTextSerializer();

const formatedDate = useState("formatedDate", () =>
  useFormatIntoFrenchDate(article.value?.last_publication_date, "short"),
);
const imageBanner = computed<
  ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined
>(() => useBannerImage(article.value?.data.image_banner, isMobile));

const { title: metaTitle, description: metaDescription, image: metaImage } = usePrismicSeo({
  title: () => [
    article.value?.data.meta_title,
    article.value?.data.title,
  ],
  description: () => [
    article.value?.data.meta_description,
    article.value?.data.title,
  ],
  image: () => [article.value?.data.meta_image],
  defaultImage: defaultImg as string,
});

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: metaImage,
});
</script>

<template>
  <section v-if="pending">
    <Loading />
  </section>

  <section v-if="article && parentThematic" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl">
      <HeaderPageTitle :title="article?.data.title" :image="imageBanner" />
    </header>

    <Breadcrumbs
      :list-ids="[parentThematic?.id, article?.id]"
      :current-uid="articleUid"
    />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <main class="lg:col-span-2 space-y-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <article class="prose dark:prose-invert max-w-none">
          <h2
            v-if="isFilled.keyText(article.data.subtitle)"
            class="text-gray-900 dark:text-slate-400 font-semibold text-2xl mb-2"
          >
            {{ article?.data.subtitle }}
          </h2>

          <Fancybox :is-caroussel="article?.data.carrousel">
            <prismic-rich-text
                :field="article.data.content"
                :serializer="richTextSerializer"
            ></prismic-rich-text>
          </Fancybox>

        </article>
      </main>

      <aside class="space-y-6 lg:sticky lg:top-6">
        <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
          <AsideSocialShare :currentUrlPage="useRequestURL().href" />

          <p class="text-sm italic text-slate-400 dark:text-slate-500 pt-2" v-if="article.data.author">
            Rédigé par {{ article.data.author }} le {{ formatedDate }}
          </p>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped></style>
