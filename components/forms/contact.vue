<script setup lang="ts">

import {reactive} from "vue";
const { t } = useI18n();

interface IFormData {
  name: string,
  email: string,
  subject: string,
  message: string
}

const formData: IFormData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const rules = computed(() => {
  return {
    name: {
      required: '',
      minLength: ''
    },
    email: {
      required: '',
      email: ''
    },
    subject: {
      required: '',
      minLength: '' //minLength(5)
    },
    message: {
      required: ''
    }
  }
})

const emit = defineEmits(['submit-form']);
const submitContactForm = async () => emit('submit-form', {...formData})

</script>

<template>
  <form action="#" class="space-y-8" @submit.prevent="submitContactForm">
    <div>
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ $t('form.contact.name.label') }}</label>
      <input
          v-model="formData.name"
          type="text"
          id="name"
          name="name"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          :placeholder="t('form.contact.name.placeholder')"
          required
      >
    </div>
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ $t('form.contact.email.label') }}</label>
      <input
          v-model="formData.email"
          type="email"
          id="email"
          name="email"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          :placeholder="t('form.contact.email.placeholder')"
          required>
    </div>
    <div>
      <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ $t('form.contact.subject.label') }}</label>
      <input
          v-model="formData.subject"
          type="text"
          id="subject"
          name="subject"
          class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          :placeholder="t('form.contact.subject.placeholder')"
          required
      >
    </div>
    <div class="sm:col-span-2">
      <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{{ $t('form.contact.message.label') }}</label>
      <textarea
        id="message"
        rows="6"
        v-model="formData.message"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      ></textarea>
    </div>
    <button
        type="submit"
        :aria-label="t('form.contact.submit.label')"
        disabled
        class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >{{ $t('form.contact.submit.label') }}</button>
  </form>
</template>

<style scoped>

</style>