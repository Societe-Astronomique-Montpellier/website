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

definePageMeta({
  layout: "page",
});

const prismic = usePrismic();
const { isMobile } = useDevice();
const route = useRoute();
const lang = useLang();

const HeaderPage = defineAsyncComponent(
  () => import("~/components/pages/HeaderPage.vue"),
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
const { data: article, error } = useAsyncData(
  articleUid,
  async () =>
    await prismic.client.getByUID<PageArticleDocument>(
      "page_article",
      articleUid,
      { lang: lang.value },
    ),
);

const { data: parentThematic } = useAsyncData(
  thematicUid,
  async () =>
    await prismic.client.getByUID<PageThematiqueDocument>(
      "page_thematique",
      thematicUid,
      { lang: lang.value },
    ),
);
if (error.value) {
  throw createError({
    statusCode: error.value?.statusCode,
    statusMessage: error.value?.statusMessage,
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

const metaImage = asImageSrc(article.value?.data.meta_image);

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: metaImage,
});
</script>

<template>
  <section>
    <div
      v-if="error"
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

    <div v-if="article" class="max-w-screen-lg w-full mx-auto relative mb-2">
      <Breadcrumbs
        v-if="parentThematic && article"
        :list-ids="[parentThematic?.id, article.id]"
        :current-uid="articleUid"
      />
      <h1
        class="text-gray-900 dark:text-slate-400 font-bold text-4xl my-8 text-center"
        :aria-label="article?.data.title as string"
      >
        {{ article?.data.title }}
      </h1>
      <HeaderPage :image="imageBanner" />
      <div class="max-w-screen-md mx-auto">
        <div
          class="rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div
            class="bg-white dark:bg-slate-800 relative top-0 p-5 sm:p-10 leading-normal"
          >
            <h2
              v-if="isFilled.keyText(article.data.subtitle)"
              class="text-gray-900 dark:text-slate-400 font-semibold text-2xl mb-2"
            >
              {{ article?.data.subtitle }}
            </h2>
            <Icon v-show="false" name="material-symbols:arrow-right-alt" />
            <div class="my-4 grid gap-4 px-1">
              <div data-content>
                <Fancybox :is-caroussel="article?.data.carrousel">
                  <prismic-rich-text
                    :field="article.data.content"
                    :serializer="richTextSerializer"
                  ></prismic-rich-text>
                </Fancybox>
                <p class="text-gray-700 dark:text-slate-400 text-xs mt-5">
                  <span
                    id="span_author"
                    class="font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                  >
                    {{ $t("page.author") }} {{ article?.data.author }}
                  </span>
                  le
                  <span
                    id="span_date"
                    class="font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                  >
                    {{ formatedDate }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
