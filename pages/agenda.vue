<script setup lang="ts">
definePageMeta({
  layout: 'page',
});
const BlockListCards = defineAsyncComponent(() => import('@/components/home/BlockListCards.vue'))

</script>

<template>
  <section>
    <div class="max-w-screen-xl w-full mx-auto relative">
      <div class="bg-cover bg-center text-center overflow-hidden rounded"
           :style="`min-height: 150px; background-color: bg-indigo-500` "
           title="Woman holding a mug">
      </div>
      <div class="max-w-3xl mx-auto">
        <div
            class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
          <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <h2 class="text-gray-900 font-bold text-4xl mb-2 font-raleway">Agenda</h2>
          </div>
        </div>
      </div>

      <BlockListCards
        title-block="Evenements à venir"
        :items="[]"
      />

      <BlockListCards
        title-block="Evenements passés"
        :items="[]"
      />
    </div>
  </section>
</template>

<style scoped>

</style>