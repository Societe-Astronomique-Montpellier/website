<script setup lang="ts">
import {useSeo} from "~/composables/useSeo";
import type {EmptyImageFieldImage, FilledImageFieldImage} from "@prismicio/types";
import type {ImageField} from "@prismicio/client";

definePageMeta({
  layout: 'page',
});

const { t, locale } = useI18n();
const mail = useMail()

const HeaderPage = defineAsyncComponent(() => import('@/components/pages/HeaderPage.vue'))
const FormContact = defineAsyncComponent(() => import('@/components/forms/contact.vue'))

interface IFormData {
  name: string,
  email: string,
  subject: string,
  message: string
}
const submittedFormData: Ref<IFormData | null> = ref(null)
const submittedForm: Ref<boolean> = ref(false)
const submitedFormMessage: Ref<string | null> = ref(null)
const imageBanner = computed<ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined>(() => useBannerImage(undefined, false))

const handleContactFormSubmission = async (formData: IFormData) => {
  submittedFormData.value = formData;
  console.log(submittedFormData)
  setTimeout(async () => {
    try {
      mail.send({
        from: formData.email,
        subject: formData.subject,
        text: formData.message
      })
      submittedForm.value = true
    } catch (err) {
      submittedForm.value = true
    }
  }, 1000)
}

// useSeo({
//   title: t('contact.title'),
//   description: t('contact.subtitle'),
//   image: null,
// })
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
              <FormContact @submit="handleContactFormSubmission" v-if="!submittedForm" />
              <div v-if="submittedForm">
                <div class="mt-2 bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500" role="alert" tabindex="-1" aria-labelledby="hs-soft-color-success-label">
                  <Icon name="clarity:success-standard-line" size="12" /> {{ submitedFormMessage }}
                </div>
                <div class="mt-2 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert" tabindex="-1" aria-labelledby="hs-soft-color-danger-label">
                  <span id="hs-soft-color-danger-label" class="font-bold">Danger</span> {{ submitedFormMessage }}
                </div>
                <div class="mt-2 bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500" role="alert" tabindex="-1" aria-labelledby="hs-soft-color-warning-label">
                  <span id="hs-soft-color-warning-label" class="font-bold">Warning</span> {{ submitedFormMessage }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>