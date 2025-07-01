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
} from "~/prismicio-types";
import defaultImg from "../public/logo.png";

definePageMeta({
  layout: "page",
});

const prismic = usePrismic();
const { isMobile } = useDevice();
const route = useRoute();
const lang = useLang();

const HeaderPageTitle = defineAsyncComponent(
  () => import("~/components/pages/HeaderPageTitle.vue"),
);
const Breadcrumbs = defineAsyncComponent(
  () => import("~/components/Layouts/Breadcrumbs.vue"),
);
const Fancybox = defineAsyncComponent(
  () => import("~/components/content/Fancybox.vue"),
);

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
  <section class="sm:px-5 md:px-40 lg:px-40 flex flex-1 justify-center">
    <div
      v-if="errorArticle"
      class="max-w-screen-xl w-full mx-auto relative mt-3 mb-2 flex items-center p-3 text-sm bg-red-100 border border-red-400 text-red-700 rounded-md"
      role="alert"
    >
      <Icon
        name="material-symbols:error-outline-rounded"
        class="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        size="18"
      />
      <span class="sr-only">Erreur</span>
      <div>Une erreur est survenue lors de la récupération des données.</div>
    </div>

    <div v-if="article" class="max-w-screen-xl w-full mx-auto relative mb-2">
      <HeaderPageTitle :title="article?.data.title" :image="imageBanner" />
      <div class="flex flex-wrap gap-4 sm:px-2 md:px-4 lg:px-4 mx-auto">
        <div
          class="rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white dark:bg-slate-800 relative top-0 p-5">
            <Breadcrumbs
              v-if="parentThematic && article"
              :list-ids="[parentThematic?.id, article.id]"
              :current-uid="articleUid"
            />

            <h2
              v-if="isFilled.keyText(article.data.subtitle)"
              class="text-gray-900 dark:text-slate-400 font-semibold text-2xl mb-2"
            >
              {{ article?.data.subtitle }}
            </h2>

            <p
              class="text-[#9e9eb7] text-sm italic font-normal leading-normal pb-3 pt-1"
            >
              <span v-if="article?.data.author"
                >{{ $t("page.author") }}{{ article?.data.author }},
              </span>
              <span v-if="formatedDate">{{ formatedDate }}</span>
            </p>

            <div class="my-4 grid gap-4 px-1">
              <div data-content>
                <Fancybox :is-caroussel="article?.data.carrousel">
                  <prismic-rich-text
                    :field="article.data.content"
                    :serializer="richTextSerializer"
                  ></prismic-rich-text>
                </Fancybox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
