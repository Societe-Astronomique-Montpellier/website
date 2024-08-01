<script setup lang="ts">
import {useSeo} from "~/composables/useSeo";
const { t } = useI18n();

const HeaderPage = defineAsyncComponent(() => import('@/components/pages/HeaderPage.vue'))
const FormContact = defineAsyncComponent(() => import('@/components/forms/contact.vue'))

definePageMeta({
  layout: 'page',
});

const defaultBanner: Ref<string> = ref('https://media.istockphoto.com/id/2085364237/fr/photo/close-up-of-business-woman-hand-typing-on-laptop-computer-keyboard-with-reflection-on-digital.jpg?s=2048x2048&w=is&k=20&c=aoZxQqTDghkzHYMcY7Wj60DTbOZcSlV63g03Wt-E23s=')

useSeo({
  title: t('contact.title'),
  description: t('contact.subtitle'),
  canonicalUrl: `${process.env.BASE_URL}/`,
  image: null,
  imageAlt: null
})
</script>

<template>
  <section>
    <div class="max-w-screen-xl w-full mx-auto relative mb-2">
      <HeaderPage :imageStr="defaultBanner" />
      <div class="max-w-3xl mx-auto">
        <div
            class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <h2 class="text-gray-900 font-bold text-4xl mb-2 font-raleway">{{ $t('contact.title') }}</h2>
            <div class="my-8 grid gap-6 px-4">
              <p class="text-justify text-base leading-8 mt-2 my-5">
                {{ $t('contact.subtitle') }}
              </p>
              <FormContact />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>