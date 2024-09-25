<script setup lang="ts">
import type { ComputedRef } from "vue";
import { asImageSrc, isFilled } from "@prismicio/helpers";
import type { ImageField } from "@prismicio/client";
import type {
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/types";
import type {
  AllDocumentTypes,
  PageArticleDocument,
  PageThematiqueDocument,
} from "~/prismicio-types";

definePageMeta({
  layout: "page",
});

// https://tailwindflex.com/@ron-hicks/blog-page
// https://flowbite.com/blocks/publisher/blog-templates/
const route = useRoute();
const prismic = usePrismic();
const { t, locale } = useI18n();
const { isMobile } = useDevice();

const Breadcrumbs = defineAsyncComponent(
  () => import("~/components/Layouts/Breadcrumbs.vue"),
);
const HeaderPage = defineAsyncComponent(
  () => import("~/components/pages/HeaderPage.vue"),
);
const Fancybox = defineAsyncComponent(
  () => import("~/components/content/Fancybox.vue"),
);
const BlockListCards = defineAsyncComponent(
  () => import("~/components/home/BlockListCards.vue"),
);

const richTextSerializer = useRichTextSerializer();

// RichText serializer
const { thematicUid } = route.params as { thematicUid: string };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data: dataThematic, error } = useLazyAsyncData(
  thematicUid,
  async () => {
    const thematic = (await prismic.client.getByUID<PageThematiqueDocument>(
      "page_thematique",
      thematicUid,
      { lang: locale.value },
    )) as PageThematiqueDocument;
    return {
      page_thematic: thematic,
      publication_date:
        useFormatIntoFrenchDate(thematic.last_publication_date, "short") ??
        useFormatIntoFrenchDate(thematic.first_publication_date, "short"),
    };
  },
);

const { data: articles, execute } = useAsyncData(
  "articles",
  async () => {
    return (await prismic.client.getAllByType<AllDocumentTypes>(
      "page_article",
      {
        filters: [
          prismic.filter.at(
            "my.page_article.thematic",
            dataThematic.value?.page_thematic.id as string,
          ),
        ],
        orderings: {
          field: "my.page_article.date_modification",
          direction: "desc",
        },
        lang: locale.value,
      },
    )) as PageArticleDocument[];
  },
  { immediate: false },
);

watch(dataThematic, async (newValue) => {
  if (newValue) {
    await execute();
  }
});

const knowMoreLabel = computed<string>(() => t("layout.knowMore"));
const imageBanner = computed<
  ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined
>(() =>
  useBannerImage(
    dataThematic.value?.page_thematic?.data.image_banner,
    isMobile,
  ),
);

const metaTitle: ComputedRef<string> = computed<string>(() =>
  isFilled.keyText(dataThematic.value?.page_thematic?.data.meta_title)
    ? `${dataThematic.value?.page_thematic?.data.meta_title}`
    : `${dataThematic.value?.page_thematic?.data.title}`,
);
const metaDescription: ComputedRef<string> = computed<string>(() =>
  isFilled.keyText(dataThematic.value?.page_thematic?.data.meta_description)
    ? `${dataThematic.value?.page_thematic?.data.meta_description}`
    : `${dataThematic.value?.page_thematic?.data.title}`,
);

const metaImage = asImageSrc(dataThematic.value?.page_thematic.data.meta_image)

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: metaImage,
});
</script>

<template>
  <section v-if="dataThematic">
    <div class="max-w-screen-xl w-full mx-auto relative mb-2">
      <!-- max-w-screen-lg -->
      <Breadcrumbs
        :list-ids="[dataThematic?.page_thematic.id]"
        :current-uid="dataThematic?.page_thematic.uid"
      />
      <h1
        class="text-gray-900 font-bold text-4xl my-8 text-center"
        aria-label="title"
      >
        {{ dataThematic?.page_thematic.data.title }}
      </h1>
      <HeaderPage :image="imageBanner" />
      <div class="max-w-screen-md mx-auto">
        <div
          class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <h2
              v-if="isFilled.keyText(dataThematic?.page_thematic.data.subtitle)"
              class="text-gray-900 font-semibold text-2xl mb-2 leading-normal"
              aria-label="subtitle"
            >
              {{ dataThematic?.page_thematic.data.subtitle }}
            </h2>

            <Icon v-show="false" name="material-symbols:arrow-right-alt" />
            <div class="`my-4 grid gap-4 px-1`">
              <div data-content>
                <Fancybox>
                  <prismic-rich-text
                    :field="dataThematic.page_thematic.data.content"
                    :serializer="richTextSerializer"
                  />
                </Fancybox>

                <div class="text-gray-700 text-xs mt-5">
                  <span
                    id="span_author"
                    class="font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                  >
                    {{ $t("page.author") }}
                    {{ dataThematic.page_thematic.data.author }}
                  </span>
                  le
                  <span
                    v-if="dataThematic.publication_date"
                    id="span_date"
                    class="font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                  >
                    {{ dataThematic.publication_date }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BlockListCards
        v-if="articles?.length"
        :title-block="knowMoreLabel"
        :items="articles"
        :parent-item="dataThematic.page_thematic"
      />
    </div>
  </section>
</template>

<style scoped></style>
