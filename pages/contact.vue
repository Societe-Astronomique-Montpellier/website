<script setup lang="ts">
import {useSeo} from "~/composables/useSeo";
const { t } = useI18n();

const HeaderPage = defineAsyncComponent(() => import('@/components/pages/HeaderPage.vue'))
const FormContact = defineAsyncComponent(() => import('@/components/forms/contact.vue'))

definePageMeta({
  layout: 'page',
});

const submittedFormData: Ref<boolean | null> = ref(null)

import {useBannerImage} from "@/composables/useBannerImage";
import type {EmptyImageFieldImage, FilledImageFieldImage} from "@prismicio/types";
import type {ImageField} from "@prismicio/client";
const imageBanner = computed<ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined>(() => useBannerImage(undefined, false))

const handleContactFormSubmission = async (formData: any) => {
  // submittedFormData.value = submitFormData;
  setTimeout(async () => {
    try {
      console.log(formData)
    } catch (err) {}
  }, 1000)
}

useSeo({
  title: t('contact.title'),
  description: t('contact.subtitle'),
  image: null,
  imageAlt: null
})
</script>

<template>
  <section>
    <div class="max-w-screen-xl w-full mx-auto relative mb-2">
      <HeaderPage />
      <div class="max-w-3xl mx-auto">
        <div
            class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <h1 class="text-gray-900 font-bold text-4xl mb-2 font-raleway">{{ $t('contact.title') }}</h1>
            <div class="my-8 grid gap-6 px-2">
              <p class="text-justify text-base leading-8 mt-2 my-5">
                {{ $t('contact.subtitle') }}
              </p>
              <FormContact @submit="handleContactFormSubmission" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>