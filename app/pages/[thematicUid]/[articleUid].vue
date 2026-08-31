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
const Breadcrumbs = defineAsyncComponent(() => import("~/components/Layouts/Breadcrumbs.vue"));
const Fancybox = defineAsyncComponent(() => import("~/components/content/Fancybox.vue"));

const { thematicUid, articleUid } = route.params as {
  thematicUid: string;
  articleUid: string;
};

const [{ data: article, error: errorArticle }, { data: parentThematic }] =
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

const metaTitle: ComputedRef<string> = computed<string>(() => {
  return isFilled.keyText(article.value?.data.meta_title)
    ? `${article.value?.data.meta_title}`
    : `${article.value?.data.title}`;
});
const metaDescription: ComputedRef<string> = computed<string>(() => {
  return isFilled.keyText(article.value?.data.meta_description)
    ? `${article.value?.data.meta_description}`
    : `${article.value?.data.title}`;
});

const metaImage: ComputedRef<string> = computed<string>(() =>
  isFilled.image(article.value?.data.meta_image)
    ? `${asImageSrc(article.value?.data.meta_image)}`
    : defaultImg,
);

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: metaImage,
});
</script>

<template>
  <section v-if="article" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl">
      <HeaderPageTitle :title="article?.data.title" :image="imageBanner" />
    </header>

    <nav aria-label="Breadcrumb" class="mb-6">
      <Breadcrumbs
        v-if="parentThematic && article"
        :list-ids="[parentThematic?.id, article.id]"
        :current-uid="articleUid"
      />
    </nav>

    <div class="grid grid-cols-1 gap-8 items-start">
      <main class="space-y-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <article class="prose dark:prose-invert max-w-none">
          <h2
            v-if="isFilled.keyText(article.data.subtitle)"
            class="text-gray-900 dark:text-slate-400 font-semibold text-2xl mb-2"
          >
            {{ article?.data.subtitle }}
          </h2>

          <p
            class="text-[#9e9eb7] text-sm italic font-normal leading-normal pb-3 pt-1"
          >
              <span v-if="article.data.author" >
                {{ $t("page.author") }}{{ article.data.author }},
              </span>
            <span v-if="formatedDate">{{ formatedDate }}</span>
          </p>

          <Fancybox :is-caroussel="article?.data.carrousel">
            <prismic-rich-text
                :field="article.data.content"
                :serializer="richTextSerializer"
            ></prismic-rich-text>
          </Fancybox>

        </article>
      </main>
    </div>
  </section>
</template>

<style scoped></style>
