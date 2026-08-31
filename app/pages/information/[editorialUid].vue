<script setup lang="ts">
import type { PageEditorialeDocument } from "~~/prismicio-types";
import type { ImageField } from "@prismicio/client";
import type {
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/types";
import type { ComputedRef } from "vue";
import { asImageSrc, isFilled } from "@prismicio/helpers";
import defaultImg from "../public/logo.png";

definePageMeta({
  layout: "page",
});

const route = useRoute();
const prismic = usePrismic();
const lang = useLang();
const { t } = useI18n()
const { isMobile } = useDevice();

const HeaderPageTitle = defineAsyncComponent(
  () => import("~/components/pages/HeaderPageTitle.vue"),
);
const Breadcrumbs = defineAsyncComponent(
  () => import("~/components/Layouts/Breadcrumbs.vue"),
);
const Fancybox = defineAsyncComponent(
  () => import("~/components/content/Fancybox.vue"),
);

const { editorialUid } = route.params as { editorialUid: string };
const { data: editorial, error } = useAsyncData(
  editorialUid,
  async () =>
    await prismic.client.getByUID<PageEditorialeDocument>(
      "page_editoriale",
      editorialUid,
      {
        lang: lang.value,
      },
    ),
);

const richTextSerializer = useRichTextSerializer();
const formatedDate = useState("formatedDate", () =>
  useFormatIntoFrenchDate(editorial.value?.last_publication_date, "short"),
);
const imageBanner = computed<
  ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined
>(() => useBannerImage(editorial.value?.data.image_banner, isMobile));

const metaTitle: ComputedRef<string> = computed<string>(() => {
  return isFilled.keyText(editorial.value?.data.meta_title)
    ? `${editorial.value?.data.meta_title}`
    : `${editorial.value?.data.title}`;
});
const metaDescription: ComputedRef<string> = computed<string>(
  () => `${editorial.value?.data.meta_description}`,
);
const metaImage: ComputedRef<string> = computed<string>(() =>
  isFilled.image(editorial.value?.data.meta_image)
    ? `${asImageSrc(editorial.value?.data.meta_image)}`
    : defaultImg,
);

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: metaImage,
});
</script>

<template>
  <section v-if="editorial" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8 overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl">
      <HeaderPageTitle :title="editorial?.data.title" :image="imageBanner" />
    </header>

    <nav aria-label="Breadcrumb" class="mb-6">
      <Breadcrumbs
        :list-ids="[editorial?.id]"
        :current-uid="editorialUid"
      />
    </nav>

    <div class="grid grid-cols-1 gap-8 items-start">
      <main class="space-y-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <article class="prose dark:prose-invert max-w-none">
          <h2
            v-if="isFilled.keyText(editorial?.data.subtitle)"
            class="text-gray-900 dark:text-slate-400 font-semibold text-2xl mb-2 leading-normal"
          >
            {{ editorial?.data.subtitle }}
          </h2>

          <p
            class="text-[#9e9eb7] text-sm italic font-normal leading-normal pb-3 pt-1"
          >
            <span v-if="editorial?.data.author">{{ t("page.author") }}{{ editorial?.data.author }},</span>
            <span v-if="formatedDate">{{ formatedDate }}</span>
          </p>

          <div data-content>
            <Fancybox>
              <Icon v-show="false" name="material-symbols:arrow-right-alt" />
              <prismic-rich-text
                :field="editorial.data.content"
                :serializer="richTextSerializer"
              ></prismic-rich-text>
            </Fancybox>
          </div>
        </article>
      </main>
    </div>
  </section>
</template>

<style scoped></style>
