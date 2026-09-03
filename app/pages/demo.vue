<script setup lang="ts">

</script>

<template>
  <!-- 1. HISTOIRE & IDENTITÉ (Statuts de l'association) -->
  <section id="association" class="bg-slate-950 rounded-3xl p-8 sm:p-14 lg:p-20 border border-slate-800/80">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

      <!-- Texte & Objectifs Statutaires -->
      <div class="lg:col-span-7 space-y-8">
        <div class="space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-indigo-400">Fondée en 1979</span>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Notre association a pour but de :
          </h2>
        </div>

        <ul class="space-y-5 text-slate-300 text-base sm:text-lg leading-relaxed font-light">
          <li class="flex items-start gap-4">
            <span class="text-indigo-400 font-bold text-xl shrink-0">→</span>
            <span>Réunir ceux qui s'intéressent pratiquement ou théoriquement à l'astronomie.</span>
          </li>
          <li class="flex items-start gap-4">
            <span class="text-indigo-400 font-bold text-xl shrink-0">→</span>
            <span>Mettre l'étude de l'Astronomie et ses activités connexes à la portée de tous.</span>
          </li>
          <li class="flex items-start gap-4">
            <span class="text-indigo-400 font-bold text-xl shrink-0">→</span>
            <span>Favoriser les travaux des astronomes amateurs et les échanges entre Associations poursuivant les mêmes buts.</span>
          </li>
        </ul>

        <div class="pt-4">
          <a
              href="/statuts"
              class="inline-flex items-center gap-3 py-3.5 px-7 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold border border-slate-700/60 transition-all shadow-md"
          >
            <span>Consulter les statuts</span>
            <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Photo Plaque Commémorative Tour de la Babote -->
      <div class="lg:col-span-5 space-y-3">
        <div class="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
          <img
              src="https://images.prismic.io/societe-astronomique-montpellier/Zo99wB5LeNNTxA8i_Montpellier_-_Tour_de_la_Babote.jpg?auto=format%2Ccompress&rect=0%2C341%2C2490%2C2668&w=800"
              alt="Plaque commémorative de la Tour de la Babote — Société Astronomique de Montpellier"
              class="w-full h-auto object-cover"
          />
        </div>
        <p class="text-xs text-slate-400 text-center italic">
          Plaque commémorative de la tour de la Babote
        </p>
      </div>

    </div>
  </section>
</template>

<style scoped>

</style>