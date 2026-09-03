<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-24 sm:py-32 space-y-5">
    <!-- Conteneur Spinner -->
    <div class="relative flex items-center justify-center">
      <!-- Halo lumineux en arrière-plan -->
      <div class="absolute w-12 h-12 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-xl animate-pulse" />

      <!-- Spinner principal avec border-2 -->
      <div class="w-12 h-12 border-2 border-slate-200 dark:border-slate-800 border-t-indigo-600 dark:border-t-indigo-500 rounded-full animate-spin" />
    </div>

    <!-- Texte de chargement -->
    <p class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest animate-pulse">
      {{ t('layout.loading') }}
    </p>
  </div>
</template>

<style scoped>

</style>