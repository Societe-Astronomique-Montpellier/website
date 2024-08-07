<script setup lang="ts">
const { t } = useI18n();
export interface Props {
  block: any
}

const props = defineProps<Props>()
const { block } = toRefs(props)
const { isMobile } = useDevice();

import logo from '@/assets/images/logo.png'
const title = computed<string>(() => t('layout.title'))
</script>

<template>
  <div
    v-if="block"
    class="relative h-96 overflow-hidden bg-cover bg-scroll  bg-no-repeat p-12 text-center lg:h-screen"
    :style="{backgroundImage: `url(${block?.data?.image?.url})`}"
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
          <nuxt-img :src="logo" class="h-48 rounded-full" :title="title" :aria-label="title" />
        </div>
      </div>
    </div>
  </div>
  <div class="text-gray-400 bg-gray-900 body-font mb-4 mt-0 text-base items-center text-center font-light leading-relaxed h-full w-full p-2" v-if="isMobile">
    <h1 class="mt-2 text-2xl">
      {{ block.data.title }}
    </h1>
    <h2 class="text-xl italic">
      {{ block.data.subtitle }}
    </h2>

  </div>
</template>