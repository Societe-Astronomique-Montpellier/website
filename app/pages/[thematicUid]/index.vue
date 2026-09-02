<script setup lang="ts">
import { isFilled } from "@prismicio/helpers";
import type { ImageField } from "@prismicio/client";
import type {
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/types";
import type { PageThematiqueDocument } from "~~/prismicio-types";
import defaultImg from "~~/public/logo.png";

definePageMeta({
  layout: "page",
});


const route = useRoute();
const prismic = usePrismic();
const lang = useLang();
const { isMobile } = useDevice();

const { thematicUid } = route.params as { thematicUid: string };
const { data: dataThematic, error, pending } = await useAsyncData(
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
const AsideSocialShare = defineAsyncComponent(() => import('@/components/Layouts/AsideSocialShare.vue'))

const richTextSerializer = useRichTextSerializer();

const imageBanner = computed<
  ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined
>(() =>
  useBannerImage(
    dataThematic.value?.page_thematic?.data.image_banner,
    isMobile,
  ),
);

const { title: metaTitle, description: metaDescription, image: metaImage } = usePrismicSeo({
  title: () => [
    dataThematic.value?.page_thematic?.data.meta_title,
    dataThematic.value?.page_thematic?.data.title,
  ],
  description: () => [
    dataThematic.value?.page_thematic?.data.meta_description,
    dataThematic.value?.page_thematic?.data.title,
  ],
  image: () => [dataThematic.value?.page_thematic?.data.meta_image],
  defaultImage: defaultImg as string,
});

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: metaImage,
});
</script>

<template>
  <section
    v-if="dataThematic"
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
  >
    <header class="mb-8 overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl">
      <HeaderPageTitle
        :title="dataThematic?.page_thematic.data.title"
        :image="imageBanner"
      />
    </header>
    <nav aria-label="Breadcrumb" class="mb-6">
      <Breadcrumbs
        :list-ids="[dataThematic?.page_thematic.id]"
        :current-uid="dataThematic?.page_thematic.uid"
      />
    </nav>


    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <main class="lg:col-span-2 space-y-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <article class="prose dark:prose-invert max-w-none">

          <h2
            v-if="isFilled.keyText(dataThematic?.page_thematic.data.subtitle)"
            class="text-gray-900 dark:text-slate-400 font-semibold text-2xl mb-2 leading-normal"
            :aria-label="dataThematic?.page_thematic.data.subtitle"
          >
            {{ dataThematic?.page_thematic.data.subtitle }}
          </h2>

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
        </article>
      </main>

      <aside class="space-y-6 lg:sticky lg:top-6">
        <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
          <AsideSocialShare :currentUrlPage="useRequestURL().href" />

          <p class="text-sm italic text-slate-400 dark:text-slate-500 pt-2" v-if="dataThematic.page_thematic.data.author">
            Rédigé par {{ dataThematic.page_thematic.data.author }} le {{ dataThematic.publication_date }}
          </p>
        </div>
      </aside>

    </div>
    <ListChildren :thematic="dataThematic.page_thematic" />
  </section>
</template>

<style scoped></style>
