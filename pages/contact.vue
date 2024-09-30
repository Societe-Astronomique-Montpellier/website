<script setup lang="ts">
import { useSeo } from "~/composables/useSeo";
import type {
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/types";
import type { ImageField } from "@prismicio/client";
import type {
  ContactDocument,
  ContactDocumentDataSubjectsItem,
} from "~/prismicio-types";
import type { ComputedRef } from "vue";
import { isFilled } from "@prismicio/helpers";

definePageMeta({
  layout: "page",
});

const prismic = usePrismic();
const { t, locale } = useI18n();
const mail = useMail();

const HeaderPage = defineAsyncComponent(
  () => import("@/components/pages/HeaderPage.vue"),
);
const FormContact = defineAsyncComponent(
  () => import("@/components/forms/contact.vue"),
);

interface IFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
const submittedFormData: Ref<IFormData | null> = ref(null);

const listTopics = ref<string[]>([]);
const submittedForm: Ref<boolean> = ref(false);
const submitedFormMessage: Ref<string | null> = ref(null);

const { data: contact, error } = useLazyAsyncData(
  "contact",
  async () =>
    await prismic.client.getSingle<ContactDocument>("contact", {
      lang: locale.value,
    }),
);

const richTextSerializer = useRichTextSerializer();

if (contact.value?.data.subjects) {
  contact.value?.data.subjects.forEach((s: ContactDocumentDataSubjectsItem) =>
    listTopics.value.push(s.subject as string),
  );
}
computed<ImageField | FilledImageFieldImage | EmptyImageFieldImage | undefined>(
  () => useBannerImage(undefined, false),
);

const metaTitle: ComputedRef<string> = computed<string>(() =>
  !isFilled.keyText(contact.value?.data.meta_title)
    ? `${contact.value?.data.meta_title}`
    : `Société Astronomique de Montpellier`,
);

const metaDescription: ComputedRef<string> = computed<string>(() =>
  isFilled.keyText(contact.value?.data.meta_description)
    ? `${contact.value?.data.meta_description}`
    : ``,
);

const handleContactFormSubmission = async (formData: IFormData) => {
  submittedFormData.value = formData;
  setTimeout(async () => {
    try {
      mail.send({
        from: formData.email,
        subject: `[${formData.name}]: ${formData.subject}`,
        text: formData.message,
      });
      submittedForm.value = true;
      submitedFormMessage.value = t("form.postSubmit.send");
    } catch (err) {
      submittedForm.value = false;
      submitedFormMessage.value = t("form.postSubmit.err");
    }
  }, 1000);
};

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: undefined,
});
</script>

<template>
  <section v-if="contact">
    <div class="max-w-screen-xl w-full mx-auto relative mb-2">
      <h1 class="text-gray-900 font-bold text-4xl my-8 text-center">
        {{ contact?.data.title }}
      </h1>
      <HeaderPage />
      <div class="max-w-3xl mx-auto">
        <div
          class="bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white relative top-0 p-5 sm:p-10">
            <div class="my-8 grid gap-6 px-2">
              <div class="my-4 grid gap-4 px-1">
                <div data-content>
                  <prismic-rich-text
                    :field="contact?.data.content"
                    :serializer="richTextSerializer"
                  ></prismic-rich-text>
                </div>

                <div v-if="submittedForm">
                  <div
                    class="mt-2 bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
                    role="alert"
                    tabindex="-1"
                    aria-labelledby="hs-soft-color-success-label"
                  >
                    <Icon name="clarity:success-standard-line" size="12" />
                    {{ submitedFormMessage }}
                  </div>
                </div>
              </div>

              <DelayHydration>
                <FormContact
                  v-if="!submittedForm"
                  :topics="listTopics"
                  @submit="handleContactFormSubmission"
                />
              </DelayHydration>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
