<script setup lang="ts">
import { reactive } from "vue";
const { t } = useI18n();

export interface Props {
  topics?: string[] | undefined;
}
const props = defineProps<Props>();
const { topics } = toRefs(props);

interface IFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
  token: string;
}

const formData: IFormData = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
  honeypot: "",
  token: "",
});

const isLoading: Ref<boolean> = ref(false);
const tokenReponse: Ref<string> = ref('')
type FormFeedbackType = "incomplete" | "consent" | "invalid" | null;
const errMessage: Ref<FormFeedbackType> = ref(null);

const emit = defineEmits<{
  submit: [formData: IFormData];
}>();

const submitForm = async (): Promise<void> => {
  isLoading.value = true;

  if (formData.honeypot.trim()) {
    isLoading.value = false;
    return;
  }

  if (
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.message.trim()
  ) {
    errMessage.value = "incomplete";
    isLoading.value = false;
    return;
  }

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (formData.email && !regex.test(formData.email)) {
    errMessage.value = "invalid";
    isLoading.value = false;
    return;
  }

  tokenReponse.value = await $fetch("/api/validateTurnstile", {
    method: "POST",
    body: {
      token: formData.token,
    },
  });

  setTimeout(() => {
    isLoading.value = false;
    emit("submit", { ...formData });
  }, 1000);
};
</script>

<template>
  <div
    v-if="errMessage"
    class="mt-2 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
    role="alert"
    tabindex="-1"
    aria-labelledby="hs-soft-color-danger-label"
  >
    <span id="hs-soft-color-danger-label" class="font-bold">Danger</span>
    {{ $t(`form.postSubmit.${errMessage}`) }}
  </div>
  <form action="#" class="space-y-8" @submit.prevent="submitForm">
    <div>
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
        >{{ $t("form.contact.name.label") }}
        <span class="text-red-700">*</span></label
      >
      <input
        id="name"
        v-model="formData.name"
        type="text"
        name="name"
        class="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
        :placeholder="t('form.contact.name.placeholder')"
        required
      />
    </div>
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
        >{{ $t("form.contact.email.label") }}
        <span class="text-red-700">*</span></label
      >
      <input
        id="email"
        v-model="formData.email"
        type="email"
        name="email"
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
        :placeholder="t('form.contact.email.placeholder')"
        required
      />
    </div>
    <div>
      <label for="subject" class="block mb-2 text-sm font-medium text-gray-900"
        >{{ $t("form.contact.subject.label") }}
        <span class="text-red-700">*</span></label
      >
      <select
        id="subject"
        v-model="formData.subject"
        name="subject"
        class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
        required
      >
        <option v-for="topic in topics" :key="topic" :value="topic">
          {{ topic }}
        </option>
      </select>
    </div>
    <div class="sm:col-span-2">
      <label for="message" class="block mb-2 text-sm font-medium text-gray-900"
        >{{ $t("form.contact.message.label") }}
        <span class="text-red-700">*</span></label
      >
      <textarea
        id="message"
        v-model="formData.message"
        rows="6"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
      ></textarea>
    </div>
    <div class="hidden">
      <input v-model="formData.honeypot" type="text" />
    </div>
    <NuxtTurnstile v-model="formData.token" />
    <button
      type="submit"
      :aria-label="t('form.contact.submit.label')"
      class="md:justify-center inline-block rounded bg-gray-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
    >
      {{
        isLoading
          ? $t("form.postSubmit.loading")
          : $t("form.contact.submit.label")
      }}
    </button>
  </form>
</template>

<style scoped></style>
