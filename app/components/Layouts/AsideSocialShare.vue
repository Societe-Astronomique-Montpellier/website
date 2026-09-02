<script setup lang="ts">
import type {HeaderDocument, HeaderDocumentDataShareSocialMediaItem} from "~~/prismicio-types";
import type {PrismicPlugin} from "@prismicio/vue";

const { t } = useI18n()
const prismic: PrismicPlugin = usePrismic();
const lang = useLang();

// -- Props
interface Props {
  currentUrlPage: string;
}

const props = defineProps<Props>();
const { currentUrlPage } = toRefs(props);

const copyText = ref(t('layout.copy.copy'))

// Data
const { data: shareSocialMedia, pending } = useAsyncData(
    `listSocialMedia`,
    async () => {
      const items = await prismic.client.getSingle<HeaderDocument>("header", {
        lang: lang.value,
        fetch: "my.header.share_social_media",
      })

      return items?.data.share_social_media.filter(item => true === item?.display_social_network) || null;
    }
)

// -- Methods
const pasteLink = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(currentUrlPage.value)
    copyText.value = t('layout.copy.copied')

    setTimeout(() => {
      copyText.value = t('layout.copy.copy')
    }, 2000)
  } catch (err) {
    copyText.value = 'Erreur'

    setTimeout(() => {
      copyText.value = t('layout.copy.copy')
    }, 2000)
  }
}


const gridColsMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
}

</script>

<template>
  <div class="flex items-center justify-between">
    <h3 class="text-xl font-bold text-slate-900 dark:text-white">
      Partager
    </h3>
  </div>

  <!-- Action Principale : Champ avec Bouton Copier -->
  <div class="relative flex items-center">
    <input
      type="text"
      id="share-url-input"
      readonly
      :value="currentUrlPage"
      class="w-full text-xs bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 rounded-xl py-2.5 pl-3 pr-24 font-mono select-all focus:outline-none"
    />
    <button
      type="button"
      id="copy-btn"
      @click="pasteLink"
      class="absolute right-1 px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
    >
      <Icon name="bi:copy" size="12" />
      <span id="copy-text">{{ copyText }}</span>
    </button>
  </div>

  <div v-if="!pending" :class="`grid ${gridColsMap[shareSocialMedia?.length ?? 1] ?? 'grid-cols-2'} gap-2 pt-1`">
    <SocialShare
      v-for="(network, i) in shareSocialMedia"
      :key="i"
      :network="network.social_network ?? ''"
      class="flex items-center justify-center p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 dark:bg-slate-800 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400 text-slate-700 dark:text-slate-300 transition-colors"
    />
  </div>
</template>

<style scoped>

</style>