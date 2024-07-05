<script setup lang="ts">
const year: Ref<string | number> = ref('2024')
</script>

<template>
  <footer class="bg-zinc-50 text-center dark:bg-neutral-700 lg:text-left">
    <div class="bg-black/5 p-4 text-center text-surface dark:text-white">
      © {{ year }} Copyright:
      <a href="https://tw-elements.com/">Société Astronomique de Montpellier</a>
    </div>
  </footer>
</template>