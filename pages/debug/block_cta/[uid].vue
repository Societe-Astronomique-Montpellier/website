<script setup lang="ts">

import * as prismic from "@prismicio/client";
import type {AllDocumentTypes} from "~/prismicio-types";

const BlockCta = defineAsyncComponent(() => import('@/components/home/BlockCta.vue'))

const route = useRoute();
const { uid } = route.params as { uid: string }

const client = prismic.createClient<AllDocumentTypes>('societe-astronomique-montpellier');
const { data, error } = useAsyncData(uid, async () => await client.getByUID('block_cta', uid,  { lang: 'fr-fr'}))

definePageMeta({
  layout: 'home',
});
</script>

<template>

  <BlockCta
   :block="data"
  />

</template>

<style scoped>

</style>