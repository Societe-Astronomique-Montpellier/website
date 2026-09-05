<script setup lang="ts">
import type {
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/types";
import type { ImageField } from "@prismicio/client";
import type {
  ContactDocument,
  ContactDocumentDataSubjectsItem,
} from "~~/prismicio-types";
import type { ComputedRef } from "vue";
import defaultImg from "../../public/logo.png";

definePageMeta({
  layout: "page",
});

const prismic = usePrismic();
const { t } = useI18n();
const lang = useLang();

const HeaderPageTitle = defineAsyncComponent(() => import("~/components/pages/HeaderPageTitle.vue"));
const Loading = defineAsyncComponent(() => import("@/components/Layouts/Loading.vue"))
const Breadcrumbs = defineAsyncComponent(() => import("~/components/Layouts/Breadcrumbs.vue"));
const Fancybox = defineAsyncComponent(() => import("~/components//content/Fancybox.vue"));
const FormContact = defineAsyncComponent(() => import("~/components/forms/contact.vue"));
const AsideSocialShare = defineAsyncComponent(() => import("@/components/Layouts/AsideSocialShare.vue"))

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

const { data: contact, pending } = useLazyAsyncData(
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

const { title: metaTitle, description: metaDescription, image: metaImage } = usePrismicSeo({
  title: () => [
    `${contact.value?.data.meta_title}`,
    `Société Astronomique de Montpellier`,
  ],
  description: () => [
    `${contact.value?.data.meta_description}`,
    `Société Astronomique de Montpellier`,
  ],
  image: () => [contact.value?.data.meta_image],
  defaultImage: defaultImg as string,
});
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
  image: metaImage,
});
</script>

<template>
  <section v-if="pending">
    <Loading />
  </section>
  <section
    v-if="contact"
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
  >
    <header class="mb-8 overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl">
      <HeaderPageTitle :title="contact?.data.title" />
    </header>

    <Breadcrumbs
      :list-ids="[contact.id]" :current-uid="''"
    />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <main class="lg:col-span-2 space-y-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <article class="prose dark:prose-invert max-w-none">
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
        </article>
      </main>
      <aside class="space-y-6 lg:sticky lg:top-6">
        <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
          <AsideSocialShare :currentUrlPage="useRequestURL().href" />

          <prismic-rich-text
            :field="contact?.data.content_aside"
            :serializer="richTextSerializer"
          ></prismic-rich-text>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped></style>
