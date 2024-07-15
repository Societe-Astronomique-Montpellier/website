<script setup lang="ts">
import * as prismic from "@prismicio/client";
import type {AllDocumentTypes, PageThematiqueDocument} from "~/prismicio-types";

definePageMeta({
  layout: 'page',
});
const route = useRoute();
const {  } = route.params as { uid: string }
const { thematic, uid } = route.params as { thematic: string, uid: string }

const client = prismic.createClient<AllDocumentTypes>('societe-astronomique-montpellier')

const { data: page_thematique, error} = await useAsyncData(
    uid,
    () => client.getByUID<PageThematiqueDocument>('page_thematique', uid)
)
</script>

<template>
  <div class="max-w-screen-lg w-full mx-auto relative">
    <div class="bg-cover bg-center text-center overflow-hidden rounded"
         style="min-height: 500px; background-image: url('https://images.prismic.io/societe-astronomique-montpellier/Zo93gx5LeNNTxA6B_P1310003.JPG?auto=format,compress')"
         title="Woman holding a mug">
    </div>
    <div class="max-w-3xl mx-auto">
      <div
          class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
        <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
          <h2 class="text-gray-900 font-bold text-4xl mb-2">L'observatoire des Pises</h2>
          <h3 class="text-gray-900 font-semibold text-2xl mb-2">Entre nature et firmament</h3>
          <p class="text-gray-700 text-xs mt-2">Écrit par:
            <a href="#"
               class="text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
              Laurent Outang
            </a> le
            <a href="#"
               class="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
              14/07/2024
            </a>,


          </p>

          <p class="text-base leading-8 my-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>

          <h3 class="text-2xl font-bold my-5">#1. What is Lorem Ipsum?</h3>

          <p class="text-base leading-8 my-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>

          <blockquote class="border-l-4 text-base italic leading-8 my-5 p-5 text-indigo-600">Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s
          </blockquote>

          <p class="text-base leading-8 my-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>


          <a href="#"
             class="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
            #Election
          </a>,
          <a href="#"
             class="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
            #people
          </a>,
          <a href="#"
             class="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
            #Election2020
          </a>,
          <a href="#"
             class="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
            #trump
          </a>,<a href="#"
                  class="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
          #Joe
        </a>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>