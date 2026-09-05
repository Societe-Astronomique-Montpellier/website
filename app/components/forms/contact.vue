<script setup lang="ts">
import type {ContactFormData} from "~~/types/Form/ContactFormData.ts";
import {ContactSchema} from "~~/types/Form/ContactFormData.ts";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";

// Nuxt components
const { t } = useI18n();

// -- Props
export interface Props {
  topics?: string[] | undefined;
  isLoading: boolean
}
const { topics, isLoading } = defineProps<Props>();

// Definition form
const { handleSubmit, errors, defineField } = useForm<ContactFormData>({
  validationSchema: toTypedSchema(ContactSchema),
});

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [subject, subjectAttrs] = defineField('subject')
const [message, messageAttrs] = defineField('message')
const [turnstileToken, turnstileTokenAttrs] = defineField('turnstileToken');


// -- Emits
const emit = defineEmits<{
  submitForm: [form: ContactFormData];
}>();

const onInternalSubmit = handleSubmit((values) => {
  emit("submitForm", values);
})

</script>

<template>
  <form class="space-y-8" @submit.prevent="onInternalSubmit" novalidate>
    <div>
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
        >{{ $t("form.contact.name.label") }}
        <span class="text-red-700">*</span></label
      >
      <input
        id="name"
        v-model="name"
        v-bind="nameAttrs"
        type="text"
        name="name"
        class="shadow-sm border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-gray-500 dark:shadow-sm-light"
        :class="errors.name
          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500'
          : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500'"
        :placeholder="t('form.contact.name.placeholder')"
        :aria-invalid="!!errors.name"
        :aria-describedby="errors.name ? 'name-error' : undefined"
      />
      <p v-if="errors.name" id="name-error" class="mt-1 text-sm text-red-600">
        {{ errors.name }}
      </p>
    </div>
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
        >{{ $t("form.contact.email.label") }}
        <span class="text-red-700">*</span></label
      >
      <input
        id="email"
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        name="email"
        class="shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-gray-500 dark:shadow-sm-light"
        :class="errors.email
          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500'
          : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500'"
        :placeholder="t('form.contact.email.placeholder')"
        :aria-invalid="!!errors.email"
        :aria-describedby="errors.email ? 'email-error' : undefined"
      />
      <p v-if="errors.email" id="email-error" class="mt-1 text-sm text-red-600">
        {{ errors.email }}
      </p>
    </div>
    <div>
      <label for="subject" class="block mb-2 text-sm font-medium text-gray-900"
        >{{ $t("form.contact.subject.label") }}
        <span class="text-red-700">*</span></label
      >
      <select
        id="subject"
        v-model="subject"
        v-bind="subjectAttrs"
        name="subject"
        class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border shadow-sm dark:bg-gray-700 dark:placeholder-gray-400 dark:text-gray-500 dark:shadow-sm-light"
        :class="errors.subject
          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500'
          : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500'"
        :aria-invalid="!!errors.subject"
        :aria-describedby="errors.subject ? 'subject-error' : undefined"
      >
        <option value="" disabled>{{ t('form.contact.subject.placeholder') }}</option>
        <option v-for="topic in topics" :key="topic" :value="topic">
          {{ topic }}
        </option>
      </select>
      <p v-if="errors.subject" id="subject-error" class="mt-1 text-sm text-red-600">
        {{ errors.subject }}
      </p>
    </div>
    <div class="sm:col-span-2">
      <label for="message" class="block mb-2 text-sm font-medium text-gray-900"
        >{{ $t("form.contact.message.label") }}
        <span class="text-red-700">*</span></label
      >
      <textarea
        id="message"
        v-model="message"
        v-bind="messageAttrs"
        rows="6"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border dark:bg-gray-700 dark:placeholder-gray-400 dark:text-gray-500"
        :class="errors.message
          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500'
          : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500'"
        :aria-invalid="!!errors.message"
        :aria-describedby="errors.message ? 'message-error' : undefined"
      ></textarea>
      <p v-if="errors.message" id="message-error" class="mt-1 text-sm text-red-600">
        {{ errors.message }}
      </p>
    </div>

    <div>
      <NuxtTurnstile v-model="turnstileToken" v-bind="turnstileTokenAttrs" />
      <p v-if="errors.turnstileToken" class="mt-1 text-sm text-red-600">
        {{ errors.turnstileToken }}
      </p>
    </div>

    <button
      type="submit"
      :disabled="isLoading"
      :aria-label="t('form.contact.submit.label')"
      class="md:justify-center inline-block rounded bg-gray-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Icon name="ph:check-circle-bold" size="12" />
      {{
        isLoading
          ? $t("form.postSubmit.loading")
          : $t("form.contact.submit.label")
      }}
    </button>
  </form>
</template>

<style scoped></style>
