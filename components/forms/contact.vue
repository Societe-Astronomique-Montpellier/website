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

const emit = defineEmits<{
  submit: [formData: IFormData]
}>();
const submitForm = () => emit('submit', {...formData})
</script>

<template>
  <form action="#" class="space-y-8" @submit.prevent="submitForm">
    <div>
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900">{{ $t('form.contact.name.label') }}</label>
      <input
          v-model="formData.name"
          type="text"
          id="name"
          name="name"
          class="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          :placeholder="t('form.contact.name.placeholder')"
          required
      >
    </div>
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">{{ $t('form.contact.email.label') }}</label>
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
      <label for="subject" class="block mb-2 text-sm font-medium text-gray-900">{{ $t('form.contact.subject.label') }}</label>
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
      <label for="message" class="block mb-2 text-sm font-medium text-gray-900">{{ $t('form.contact.message.label') }}</label>
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
      class="md:justify-center inline-block rounded bg-gray-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
    >{{ $t('form.contact.submit.label') }}</button>
  </form>
</template>

<style scoped>

</style>