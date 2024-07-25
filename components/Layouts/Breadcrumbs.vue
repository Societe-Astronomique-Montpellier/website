<script setup lang="ts">
import type {AllDocumentTypes, EventsDocument, PageArticleDocument, PageThematiqueDocument} from "~/prismicio-types";

const prismic = usePrismic();

export interface IProps {
  listIds: Array<string>
}

const props = defineProps<IProps>()
const { listIds } = toRefs(props)

const { data: items, error } = await useAsyncData(
  'items',
  async () => await prismic.client.getAllByIDs<AllDocumentTypes>(listIds.value, {'lang': 'fr-fr'})
)


</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 mt-2 mb-4 ">
      <NuxtLink to="/">
        <Icon name="material-symbols-light:home" />  <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Accueil</span>
      </NuxtLink>


      <li v-for="(item, index) in items" :key="index">
        <prismic-link
          :field="item"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400"
        >
          <Icon name="material-symbols-light:arrow-forward-ios-rounded" />
          <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{{ item.uid }}</span>
        </prismic-link>
      </li>
<!--      <li class="inline-flex items-center">-->
<!--        <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">-->
<!--          <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">-->
<!--            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>-->
<!--          </svg>-->
<!--          Accueil-->
<!--        </a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <div class="flex items-center">-->
<!--          <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">-->
<!--            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>-->
<!--          </svg>-->
<!--          <a href="#" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Page thématique</a>-->
<!--        </div>-->
<!--      </li>-->
<!--      <li aria-current="page">-->
<!--        <div class="flex items-center">-->
<!--          <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">-->
<!--            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>-->
<!--          </svg>-->
<!--          <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Article</span>-->
<!--        </div>-->
<!--      </li>-->
    </ol>
  </nav>
</template>

<style scoped>

</style>