<script setup lang="ts">
import type {ComputedRef} from "vue";
import type {AllDocumentTypes, HeaderDocument} from "~/prismicio-types";

const { t } = useI18n();
const prismic = usePrismic()

export interface Props {
  block: any
}

const props = defineProps<Props>()
const { block } = toRefs(props)
const { isMobile } = useDevice();

const { data: header, error } = useAsyncData(
    'header',
    async () => await prismic.client.getSingle<AllDocumentTypes>('header', { lang: 'fr-fr'}) as HeaderDocument
)

const title: ComputedRef<string> = computed<string>(() => t('layout.title'))
const optimizedBgdImage: ComputedRef<string> = computed<string>(() => isMobile ? block?.value.data.image?.mobile?.url : block?.value.data.image?.url)
</script>

<template>
  <div
    v-if="block"
    class="relative h-96 overflow-hidden bg-cover bg-scroll  bg-no-repeat p-12 text-center lg:h-screen"
    :style="{backgroundImage: `url(${optimizedBgdImage})`}"
  >
    <div
        class="absolute bg-scroll bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden">
      <div class="flex h-full items-center justify-center">
        <div class="text-white" v-if="!isMobile">
          <h1 class="mb-4 text-6xl font-semibold">
            {{ block.data.title }}
          </h1>
          <h2 class="mb-6 text-4xl">
            {{ block.data.subtitle }}
          </h2>
        </div>
        <div v-else>
          <prismic-image v-if="header?.data.logo" :field="header?.data.logo.homepage" class="h-48 rounded-full" :title="title" :aria-label="title" />
        </div>
      </div>
    </div>
  </div>
  <div class="text-gray-400 bg-gray-900 body-font mb-4 mt-0 text-base items-center text-center font-light leading-relaxed h-full w-full p-2" v-if="isMobile">
    <h1 class="mt-2 text-2xl">
      {{ block.data.title }}
    </h1>
    <h2 class="text-xl mt-2 italic">
      {{ block.data.subtitle }}
    </h2>

  </div>
</template>