<script setup lang="ts">
import type { ComputedRef } from "vue";
import { asImageSrc, isFilled } from "@prismicio/helpers";
import type { ImageField } from "@prismicio/client";
import type {
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/types";
import type { PageThematiqueDocument } from "~/prismicio-types";

definePageMeta({
  layout: "page",
});

// https://tailwindflex.com/@ron-hicks/blog-page
// https://flowbite.com/blocks/publisher/blog-templates/
const route = useRoute();
const prismic = usePrismic();
const lang = useLang();
const { isMobile } = useDevice();

const { thematicUid } = route.params as { thematicUid: string };
const { data: dataThematic, error } = await useAsyncData(
  thematicUid,
  async () => {
    const thematic = (await prismic.client.getByUID<PageThematiqueDocument>(
      "page_thematique",
      thematicUid,
      { lang: lang.value },
    )) as PageThematiqueDocument;

    return {
      page_thematic: thematic,
      publication_date:
        useFormatIntoFrenchDate(thematic.last_publication_date, "short") ??
        useFormatIntoFrenchDate(thematic.first_publication_date, "short"),
    };
  },
);

if (error.value) {
  throw createError({
    statusCode: error.value?.statusCode,
    statusMessage: error.value?.statusMessage,
  });
}

const Breadcrumbs = defineAsyncComponent(
  () => import("~/components/Layouts/Breadcrumbs.vue"),
);
const HeaderPageTitle = defineAsyncComponent(
  () => import("~/components/pages/HeaderPageTitle.vue"),
);
const Fancybox = defineAsyncComponent(
  () => import("~/components/content/Fancybox.vue"),
);
const ListChildren = defineAsyncComponent(
  () => import("~/components/thematic/list_children.vue"),
);

const richTextSerializer = useRichTextSerializer();

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

const metaImage = asImageSrc(
  dataThematic?.value?.page_thematic.data.meta_image,
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

    <div
      v-if="dataThematic"
      class="max-w-screen-xl w-full mx-auto relative mb-2"
    >
      <HeaderPageTitle
        :title="dataThematic?.page_thematic.data.title"
        :image="imageBanner"
      />

      <div class="flex flex-wrap gap-4 sm:px-2 md:px-4 lg:px-4 mx-auto">
        <div
          class="rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white dark:bg-slate-800 relative top-0 p-5">
            <Breadcrumbs
              :list-ids="[dataThematic?.page_thematic.id]"
              :current-uid="dataThematic?.page_thematic.uid"
            />

            <h2
              v-if="isFilled.keyText(dataThematic?.page_thematic.data.subtitle)"
              class="text-gray-900 dark:text-slate-400 font-semibold text-2xl mb-2 leading-normal"
              :aria-label="dataThematic?.page_thematic.data.subtitle"
            >
              {{ dataThematic?.page_thematic.data.subtitle }}
            </h2>

            <p
              class="text-[#9e9eb7] text-sm italic font-normal leading-normal pb-3 pt-1"
            >
              <span v-if="dataThematic.page_thematic.data.author"
                >{{ $t("page.author")
                }}{{ dataThematic.page_thematic.data.author }},
              </span>
              <span v-if="dataThematic.publication_date">{{
                dataThematic.publication_date
              }}</span>
            </p>

            <div class="my-4 grid gap-4 px-1">
              <div data-content>
                <Fancybox>
                  <Icon
                    v-show="false"
                    name="material-symbols:arrow-right-alt"
                  />
                  <prismic-rich-text
                    :field="dataThematic.page_thematic.data.content"
                    :serializer="richTextSerializer"
                  />
                </Fancybox>
              </div>
            </div>
          </div>
          <ListChildren :thematic="dataThematic.page_thematic" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
