<script setup lang="ts">
import * as prismic from '@prismicio/client'
import type { AllDocumentTypes, PageThematiqueDocument } from "~/prismicio-types";

const client = prismic.createClient<AllDocumentTypes>('societe-astronomique-montpellier')
const {data: thematics, error } = await useAsyncData(
  "thematics",
  async () => await client.getAllByType<AllDocumentTypes>('page_thematique', { lang: 'fr-fr'}) as PageThematiqueDocument[]
);
</script>

<template>
  <header class="lg:px-16 px-4 flex flex-wrap items-center py-4 shadow-sm">
    <div class="flex-1 flex justify-between items-center mix-blend-screen">
      <a href="#" class="text-4xl text-gray-400 font-extrabold">YOGA</a>
    </div>

    <label for="menu-toggle" class="pointer-cursor md:hidden block">
      <svg class="fill-current text-gray-600"
           xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <title>menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
      </svg>
    </label>
    <input class="hidden" type="checkbox" id="menu-toggle" />

    <div class="hidden md:flex md:items-center md:w-auto w-full" id="menu">
      <nav>
        <ul class="md:flex items-center justify-between text-base text-gray-600 pt-4 md:pt-0">
          <li><NuxtLink class="md:p-4 py-3 px-0 block" to="/">Accueil</NuxtLink></li>
          <li v-for="thematic in thematics">
            <prismic-link :id="thematic.id" class="md:p-4 py-3 px-0 block">{{ thematic.data.title }}</prismic-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>

</style>
