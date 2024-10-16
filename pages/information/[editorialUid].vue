<script setup lang="ts">
import type { PageEditorialeDocument } from "~/prismicio-types";
import type { ImageField } from "@prismicio/client";
import type {
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/types";
import type { ComputedRef } from "vue";
import { asImageSrc, isFilled } from "@prismicio/helpers";

definePageMeta({
  layout: "page",
});

const route = useRoute();
const prismic = usePrismic();
const { t } = useI18n();
const { isMobile } = useDevice();

const HeaderPage = defineAsyncComponent(
  () => import("~/components/pages/HeaderPage.vue"),
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
const metaImage = asImageSrc(editorial.value?.data.meta_image);

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
    <div v-if="editorial" class="max-w-screen-xl w-full mx-auto relative mb-2">
      <Breadcrumbs :list-ids="[editorial?.id]" :current-uid="editorialUid" />
      <h1 class="text-gray-900 dark:text-slate-400 font-bold text-4xl my-8 text-center">
        {{ editorial?.data.title }}
      </h1>
      <HeaderPage :image="imageBanner" />
      <div class="max-w-screen-md mx-auto">
        <div
          class="rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white dark:bg-slate-800 relative top-0 p-5 sm:p-10">
            <h2
              v-if="isFilled.keyText(editorial?.data.subtitle)"
              class="text-gray-900 dark:text-slate-400 font-semibold text-2xl mb-2 leading-normal"
            >
              {{ editorial?.data.subtitle }}
            </h2>
            <Icon v-show="false" name="material-symbols:arrow-right-alt" />
            <div class="my-4 grid gap-4 px-1">
              <div data-content>
                <Fancybox>
                  <prismic-rich-text
                    :field="editorial.data.content"
                    :serializer="richTextSerializer"
                  ></prismic-rich-text>
                </Fancybox>
                <p class="text-gray-700 text-xs mt-5">
                  <span
                    id="span_author"
                    class="font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                  >
                    {{ $t("page.author") }} {{ editorial?.data.author }}
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
