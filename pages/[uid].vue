<script setup lang="ts">
import * as prismic from "@prismicio/client";
import type {AllDocumentTypes, PageThematiqueDocument} from "~/prismicio-types";

definePageMeta({
  layout: 'page',
});
const route = useRoute();
const { uid } = route.params as { uid: string }

const client = prismic.createClient<AllDocumentTypes>('societe-astronomique-montpellier')

const { data: page_thematique, error} = await useAsyncData(
    uid,
    () => client.getByUID<PageThematiqueDocument>('page_thematique', uid)
)
// query {
//   allArticles(where: {category:"XniT7xIAACgAk6zG"}) {
//     totalCount
//   }
// }
</script>

<template>
  <div v-if="page_thematique">
    <h2>{{ page_thematique.data.title }}</h2>
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>
</template>

<style scoped>

</style>