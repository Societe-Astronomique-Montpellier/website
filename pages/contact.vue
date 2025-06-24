<script setup lang="ts">
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
const { t } = useI18n();
const lang = useLang();

const HeaderPageTitle = defineAsyncComponent(
  () => import("@/components/pages/HeaderPageTitle.vue"),
);
const Breadcrumbs = defineAsyncComponent(
  () => import("@/components/Layouts/Breadcrumbs.vue"),
);
const Fancybox = defineAsyncComponent(
  () => import("@/components//content/Fancybox.vue"),
);
const FormContact = defineAsyncComponent(
  () => import("@/components/forms/contact.vue"),
);

const richTextSerializer = useRichTextSerializer();

interface IContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  turnstileToken: string;
}

const submittedForm: Ref<boolean> = ref(false);
const submitedFormMessage: Ref<string | null> = ref(null);

const { data: contact } = useLazyAsyncData(
  "contact",
  async () =>
    await prismic.client.getSingle<ContactDocument>("contact", {
      lang: lang.value,
    }),
);

const listTopics: ComputedRef<string[] | undefined> = computed(() =>
  contact.value?.data.subjects.map(
    (s: ContactDocumentDataSubjectsItem) => s.subject as string,
  ),
);

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

const handleContactFormSubmission = async (formData: IContactFormData) => {
  setTimeout(async () => {
    try {
      const response: any = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (true === response.succes) {
        submittedForm.value = true;
        submitedFormMessage.value = response.message;
      } else {
        submittedForm.value = false;
        submitedFormMessage.value = t("form.postSubmit.send_err");
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      submittedForm.value = false;
      submitedFormMessage.value = t("form.postSubmit.send_err");
    }
  }, 200);
};

useSeo({
  title: metaTitle,
  description: metaDescription,
  image: undefined,
});
</script>

<template>
  <section
    v-if="contact"
    class="sm:px-5 md:px-40 lg:px-40 flex flex-1 justify-center"
  >
    <div class="max-w-screen-xl w-full mx-auto relative mb-2">
      <HeaderPageTitle :title="contact?.data.title" />

      <div class="flex flex-wrap gap-4 sm:px-2 md:px-4 lg:px-4 mx-auto">
        <div
          class="rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white dark:bg-slate-800 relative top-0 p-5">
            <Breadcrumbs :list-ids="[contact.id]" :current-uid="''" />
            <div class="my-4 grid gap-4 px-1">
              <div data-content>
                <Fancybox>
                  <Icon
                    v-show="false"
                    name="material-symbols:arrow-right-alt"
                  />
                  <prismic-rich-text
                    :field="contact?.data.content"
                    :serializer="richTextSerializer"
                  ></prismic-rich-text>
                </Fancybox>

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
    </div>
  </section>
</template>

<style scoped></style>
