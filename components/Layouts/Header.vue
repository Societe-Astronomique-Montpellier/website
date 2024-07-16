<script setup lang="ts">
// import { useNavigationHeader } from "@/composables/useNavigationHeader";
// const navigation = useNavigationHeader();

import * as prismic from "@prismicio/client";
import type {AllDocumentTypes, HeaderDocument} from "~/prismicio-types";

const client = prismic.createClient<AllDocumentTypes>('societe-astronomique-montpellier')
const { data: navigation, error } = useAsyncData(
    'navigation',
    () => client.getSingle<HeaderDocument>('header', { lang: 'fr-fr'})
)
</script>

<template>
<!--  <pre>{{ navigation?.data.header_navigation }}</pre>-->
  <header class="lg:px-16 px-4 flex flex-wrap items-center py-4 shadow-sm">
    <div class="flex-1 flex justify-between items-center mix-blend-screen">
      <a href="#" class="text-4xl text-gray-400 font-extrabold">[ SAM ]</a>
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
          <li v-for="(item, index) in navigation?.data.header_navigation" :key="index"  class="text-lg m-6 group relative w-max">
             <prismic-link :field="item.link_header">
               {{ item.label_header }}
               <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
               <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
             </prismic-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>

</style>
