<script setup lang="ts">
import type {PageEditorialeDocument} from "~/prismicio-types";
import type {ImageField} from "@prismicio/client";
import type {EmptyImageFieldImage, FilledImageFieldImage} from "@prismicio/types";
import type {ComputedRef} from "vue";
import {asImageSrc, isFilled} from "@prismicio/helpers";

definePageMeta({
  layout: 'page',
});

const route = useRoute();
const prismic = usePrismic()
const { t } = useI18n();
const { isMobile } = useDevice()

const HeaderPage = defineAsyncComponent(() => import('~/components/pages/HeaderPage.vue'))
const Breadcrumbs = defineAsyncComponent(() => import('~/components/Layouts/Breadcrumbs.vue'))
const Fancybox = defineAsyncComponent(() => import("~/components/content/Fancybox.vue"));

const { editorialUid } = route.params as { editorialUid: string }
const { data: editorial, error} = useAsyncData(
    editorialUid,
    async () => await prismic.client.getByUID<PageEditorialeDocument>('page_editoriale', editorialUid)
)

const richTextSerializer = useRichTextSerializer();
const formatedDate = useState('formatedDate', () => useFormatIntoFrenchDate(editorial.value?.last_publication_date, 'short'));
const imageBanner = computed<ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined>(() => useBannerImage(editorial.value?.data.image_banner, isMobile))

const metaTitle: ComputedRef<string> = computed<string>(() => {
  return (!isFilled.keyText(editorial.value?.data.meta_title))
      ? `${editorial.value?.data.meta_title}`
      : `${editorial.value?.data.title}`
});
const metaDescription: ComputedRef<string> = computed<string>(() => `${editorial.value?.data.meta_description}`);
const metaImage = computed(() => asImageSrc(editorial.value?.data.meta_image))

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: metaImage,
})
</script>

<template>
  <div class="max-w-screen-lg w-full mx-auto relative" v-if="editorial">
    <Breadcrumbs :listIds="[editorial?.id]" :currentUid="editorialUid" />
    <h1 class="text-gray-900 font-bold text-4xl my-8 text-center">{{ editorial?.data.title }}</h1>
    <HeaderPage
      :image="imageBanner"
    />
    <div class="max-w-3xl mx-auto">
      <div
          class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
        <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">

          <h2 v-if="isFilled.keyText(editorial?.data.subtitle)" class="text-gray-900 font-semibold text-2xl mb-2 leading-normal">{{ editorial?.data.subtitle }}</h2>
          <Icon name="material-symbols:arrow-right-alt" v-show="false" />
          <div class="my-4 grid gap-4 px-1">
            <div data-content>
              <Fancybox>
                <prismic-rich-text
                    :field="editorial.data.content"
                    :serializer="richTextSerializer"
                ></prismic-rich-text>
              </Fancybox>
              <p class="text-gray-700 text-xs mt-5">
            <span id="span_author" class="font-medium hover:text-gray-900 transition duration-500 ease-in-out">
              {{ $t('page.author') }} {{ editorial?.data.author }}
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