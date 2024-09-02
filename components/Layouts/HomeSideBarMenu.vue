<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
<!--  <div-->
<!--      class="relative bg-gray-50 dark:bg-slate-900 w-screen h-screen pattern"-->
<!--  >-->
    <nav
        class="z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-indigo-700 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed top-2/4 -translate-y-2/4 left-6 min-h-[auto] min-w-[64px] flex-col rounded-lg border"
    >
      <a
        href="#status"
        class="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 bg-indigo-700 text-indigo-700 dark:bg-sky-900 dark:text-sky-50"
      >
        <!-- HeroIcon - User -->
        <Icon name="material-symbols:earthquake" size="24" />
        <small class="text-center text-xs font-medium"> {{ t('layout.sideMenu.status') }} </small>
      </a>
      <hr class="dark:border-gray-700/60" />
      <a
        href="#thematiques"
        class="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-indigo-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
      >
        <Icon name="material-symbols:all-inbox-outline" size="24" />
        <small class="text-center text-xs font-medium"> {{ t('layout.sideMenu.thematiques') }} </small>
      </a>
      <hr class="dark:border-gray-700/60" />
      <a
        href="#mise-en-avant"
        class="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-indigo-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
      >
        <Icon name="material-symbols:attach-email-outline" size="20" />
        <small class="text-center text-xs font-medium"> {{ t('layout.sideMenu.mise-en-avant') }} </small>
      </a>
      <hr class="dark:border-gray-700/60" />
      <a
        href="#evenements"
        class="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-indigo-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
      >
        <Icon name="material-symbols:calendar-clock-outline" size="20" />
        <small class="text-center text-xs font-medium"> {{ t('layout.sideMenu.evenements') }} </small>
      </a>

      <hr class="dark:border-gray-700/60" />
      <a
          href="#contact"
          class="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-indigo-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
      >
        <!-- HeroIcon - Cog-6-tooth -->
        <Icon name="material-symbols:attach-email-outline" size="20" />

        <small class="text-center text-xs font-medium"> {{ t('layout.sideMenu.contact') }} </small>
      </a>
    </nav>
<!--  </div>-->
</template>

<style scoped>

</style>