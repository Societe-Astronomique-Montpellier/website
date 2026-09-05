<script setup lang="ts">
definePageMeta({
  layout: "home",
});
</script>

<template>
  <!-- HERO CAROUSEL FULL PAGE -->
  <header class="relative w-full min-h-screen flex items-center justify-center bg-slate-950 text-white overflow-hidden">

    <!-- Conteneur des slides -->
    <div class="absolute inset-0 w-full h-full">

      <!-- Slide 1 (Active) : Tour de la Babote -->
      <div class="absolute inset-0 w-full h-full transition-opacity duration-1000 opacity-100 z-10">
        <img
            src="https://images.prismic.io/societe-astronomique-montpellier/Zo99wB5LeNNTxA8i_Montpellier_-_Tour_de_la_Babote.jpg?auto=format%2Ccompress&rect=0%2C341%2C2490%2C2668&w=1920"
            alt="Tour de la Babote — Siège de la Société Astronomique de Montpellier"
            class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-slate-950/65"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
      </div>

      <!-- Slide 2 : Observatoire des Pises -->
      <div class="absolute inset-0 w-full h-full transition-opacity duration-1000 opacity-0 z-0">
        <img
            src="https://images.prismic.io/societe-astronomique-montpellier/Zo99wh5LeNNTxA8i_Observatoire_des_Pises.jpg?auto=format%2Ccompress&w=1920"
            alt="Observatoire des Pises"
            class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-slate-950/65"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
      </div>

      <!-- Slide 3 : Astrophotographie / Ciel étoilé -->
      <div class="absolute inset-0 w-full h-full transition-opacity duration-1000 opacity-0 z-0">
        <img
            src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1920&q=80"
            alt="Ciel étoilé et voie lactée"
            class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-slate-950/65"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
      </div>

    </div>

    <!-- Contenu du Hero -->
    <div class="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-32 flex flex-col justify-center min-h-screen">

      <div class="max-w-3xl space-y-8">

        <div class="flex flex-wrap items-center gap-4">
        <span class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-500/20 backdrop-blur-md text-indigo-300 text-xs font-bold tracking-wider uppercase border border-indigo-500/30">
          <span class="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
          Fondée en 1979
        </span>
          <span class="text-slate-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm px-3 py-1.5 rounded-full bg-slate-900/40">
          Siège : Tour de la Babote
        </span>
        </div>

        <div class="space-y-4">
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
            Société Astronomique de Montpellier
          </h1>
          <p class="text-2xl sm:text-3xl font-extrabold text-indigo-400 leading-snug">
            Partager la passion de l'astronomie & la découverte du ciel
          </p>
        </div>

        <p class="text-lg sm:text-xl text-slate-200 leading-loose max-w-2xl font-light">
          Que vous soyez débutant ou passionné confirmé, rejoignez notre communauté pour explorer le ciel profond, maîtriser vos instruments et participer à nos observations sous les étoiles.
        </p>

        <div class="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
          <a
              href="#association"
              class="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-base font-bold transition-all duration-300 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-0.5 shrink-0"
          >
            <span>Découvrir l'association</span>
            <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>

          <a
              href="#agenda"
              class="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md text-white text-base font-semibold border border-slate-700/60 hover:border-slate-500 transition-all duration-300 shrink-0"
          >
            <span>Voir l'agenda</span>
          </a>
        </div>

      </div>

    </div>

    <!-- Commandes du Carrousel -->
    <div class="absolute bottom-10 left-6 right-6 sm:left-10 sm:right-10 z-30 flex items-center justify-between max-w-7xl mx-auto">
      <div class="flex items-center gap-3">
        <button aria-label="Slide 1" class="w-10 h-1.5 rounded-full bg-indigo-500 transition-all duration-300"></button>
        <button aria-label="Slide 2" class="w-3 h-1.5 rounded-full bg-slate-600 hover:bg-slate-400 transition-all duration-300"></button>
        <button aria-label="Slide 3" class="w-3 h-1.5 rounded-full bg-slate-600 hover:bg-slate-400 transition-all duration-300"></button>
      </div>

      <div class="flex items-center gap-3">
        <button aria-label="Précédent" class="p-3 rounded-full bg-slate-900/60 hover:bg-slate-800 text-white backdrop-blur-md border border-slate-700/50 hover:border-slate-500 transition-all duration-300 hover:scale-105 active:scale-95">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button aria-label="Suivant" class="p-3 rounded-full bg-slate-900/60 hover:bg-slate-800 text-white backdrop-blur-md border border-slate-700/50 hover:border-slate-500 transition-all duration-300 hover:scale-105 active:scale-95">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

  </header>


  <!-- CORPS DE PAGE -->
  <main class="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-24 space-y-36 text-slate-200 font-sans overflow-hidden">

    <!-- 1. HISTOIRE & STATUTS -->
    <section
        id="association"
        class="animate-scroll-reveal animate-scroll bg-slate-100 text-slate-800 rounded-3xl p-8 sm:p-14 lg:p-20 shadow-xl border border-slate-200/80 transition-all duration-500 hover:shadow-2xl hover:border-slate-300"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <!-- Contenu statutaire -->
        <div class="lg:col-span-7 space-y-8">
          <h2 class="text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Fondée en 1979, notre association a pour but de
          </h2>

          <ul class="space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed font-light">
            <li class="flex items-start gap-3">
              <span class="text-indigo-600 font-medium shrink-0">→</span>
              <span>Réunir ceux qui s'intéressent pratiquement ou théoriquement à l'astronomie</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-indigo-600 font-medium shrink-0">→</span>
              <span>Mettre l'étude de l'Astronomie et ses activités connexes à la portée de tous</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-indigo-600 font-medium shrink-0">→</span>
              <span>Favoriser les travaux des astronomes amateurs et les échanges entre Associations poursuivants les mêmes buts</span>
            </li>
          </ul>

          <div class="pt-2">
            <a
                href="/statuts"
                class="inline-flex items-center justify-center py-3.5 px-7 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Consulter les statuts
            </a>
          </div>
        </div>

        <!-- Photo de la plaque commémorative avec zoom hover -->
        <div class="lg:col-span-5 space-y-3 group cursor-pointer">
          <div class="rounded-xl overflow-hidden shadow-md bg-white p-2 border border-slate-200 transition-all duration-500 group-hover:shadow-xl group-hover:border-slate-300">
            <img
                src="https://images.prismic.io/societe-astronomique-montpellier/ZzSJEK8jQArT0y7C_ZqzZxkaF0TcGIplS_77039-catala-plaques-commemoratives-a-la-torre-de-la-babota-montpeller.webp?auto=format,compress"
                alt="Plaque commémorative de la tour de la Babote"
                class="w-full h-auto object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <p class="text-xs text-slate-500 text-center italic transition-colors duration-300 group-hover:text-slate-800">
            Plaque commémorative de la tour de la Babote - Photo © Inconnu
          </p>
        </div>

      </div>
    </section>


    <!-- 2. NOS PÔLES D'ACTIVITÉ -->
    <section
        class="animate-scroll-reveal animate-scroll bg-slate-900 rounded-3xl p-8 sm:p-14 lg:p-20 space-y-16 border border-slate-800/60 shadow-xl"
    >
      <div class="space-y-4 pb-10 border-b border-slate-800">
        <span class="text-xs font-bold uppercase tracking-widest text-indigo-400">Savoir-faire & Pratique</span>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Nos thématiques
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

        <!-- Card 1 -->
        <div class="group bg-slate-950/50 rounded-2xl p-6 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-950 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-950/30 flex flex-col justify-between">
          <div class="space-y-6">
            <div class="h-56 rounded-xl overflow-hidden border border-slate-800 relative">
              <img
                  src="https://images.prismic.io/societe-astronomique-montpellier/Zo95MB5LeNNTxA6c_20211011_160139.jpg?auto=format%2Ccompress&rect=598%2C0%2C2700%2C1800&w=780&h=520"
                  alt="Observation visuelle"
                  class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <span class="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-indigo-300">Pratique & Matériel</span>
            </div>

            <div class="space-y-3">
              <h3 class="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
                Activités
              </h3>
              <p class="text-slate-400 text-sm leading-loose">
                Initiation à la manipulation des lunettes et télescopes, collimation, repérage des constellations et observation du système solaire et du ciel profond.
              </p>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="group bg-slate-950/50 rounded-2xl p-6 border border-slate-800/80 hover:border-amber-500/50 hover:bg-slate-950 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-950/20 flex flex-col justify-between">
          <div class="space-y-6">
            <div class="h-56 rounded-xl overflow-hidden border border-slate-800 relative">
              <img
                  src="https://images.prismic.io/societe-astronomique-montpellier/Z-RNj3dAxsiBv8bQ_Image1.jpg?auto=format,compress&rect=0,241,5778,3852&w=780&h=520"
                  alt="Astrophotographie"
                  class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <span class="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-amber-300">Technique & Image</span>
            </div>

            <div class="space-y-3">
              <h3 class="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors duration-300">
                Science participative
              </h3>
              <p class="text-slate-400 text-sm leading-loose">
                La Science Participative Citoyenne : Une Collaboration Innovante entre Citoyens et Chercheurs
              </p>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="group bg-slate-950/50 rounded-2xl p-6 border border-slate-800/80 hover:border-emerald-500/50 hover:bg-slate-950 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-950/20 flex flex-col justify-between">
          <div class="space-y-6">
            <div class="h-56 rounded-xl overflow-hidden border border-slate-800 relative">
              <img
                  src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=700&q=80"
                  alt="Conférences et cours"
                  class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <span class="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-emerald-300">Savoirs & Conférences</span>
            </div>

            <div class="space-y-3">
              <h3 class="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                Soirées à thème
              </h3>
              <p class="text-slate-400 text-sm leading-loose">
                Présentations thématiques le mardi soir : mécanique céleste, astrophysique, histoire de l'astronomie et actualité spatiale.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>


    <!-- 3. ÉVÉNEMENT À LA UNE : FOIRE AUX ASSOCIATIONS -->
    <section
        class="animate-scroll-reveal animate-scroll group relative bg-gradient-to-br from-indigo-50 via-slate-50 to-indigo-100/60 rounded-3xl p-8 sm:p-14 lg:p-20 border border-indigo-200/80 hover:border-indigo-300 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 overflow-hidden text-slate-800"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        <div class="lg:col-span-7 space-y-8">
          <div class="flex flex-wrap items-center gap-4">
          <span class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-600 text-white text-xs font-bold tracking-wider uppercase shadow-md shadow-indigo-600/20">
            <span class="w-2.5 h-2.5 rounded-full bg-indigo-200 animate-ping"></span>
            À la une
          </span>
            <span class="text-slate-500 text-xs font-semibold tracking-wider uppercase">
            Montpellier — Tour de la Babote
          </span>
          </div>

          <div class="space-y-4">
            <h2 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-indigo-950 transition-colors duration-300">
              Foire aux associations
            </h2>
            <p class="text-xl sm:text-2xl font-bold text-indigo-700">
              & Soirée d'accueil des nouveaux membres
            </p>
          </div>

          <p class="text-slate-600 text-base sm:text-lg leading-loose">
            Envie de découvrir le ciel étoilé, de vous initier aux instruments d'observation ou d'échanger avec des passionnés ? Rejoignez la Société Astronomique de Montpellier au cœur de son siège historique pour le lancement de la nouvelle saison.
          </p>

          <div class="pt-4 flex flex-wrap items-center gap-5">
            <a
                href="#agenda"
                class="inline-flex items-center gap-3 py-4 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5"
            >
              <span>Consulter l'agenda complet</span>
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="lg:col-span-5 relative h-80 sm:h-[380px] rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
          <div class="w-full h-full rounded-xl overflow-hidden relative">
            <img
                src="https://images.prismic.io/societe-astronomique-montpellier/Zo99wB5LeNNTxA8i_Montpellier_-_Tour_de_la_Babote.jpg?auto=format%2Ccompress&rect=0%2C341%2C2490%2C2668&w=800"
                alt="Siège de la SAM - Tour de la Babote"
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 text-xs font-semibold text-white backdrop-blur-md bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/50 shadow-md">
              📍 Venez nous rencontrer à notre stand de la foire des associations de Montpellier
            </div>
          </div>
        </div>

      </div>
    </section>


    <!-- 4. L'OBSERVATOIRE DES PISES -->
    <section
        class="animate-scroll-reveal animate-scroll group bg-slate-950 rounded-3xl p-8 sm:p-14 lg:p-20 space-y-12 border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-950/20"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <div class="lg:col-span-6 space-y-8">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-400">Réserve Internationale de Ciel Étoilé (RICE)</span>
            <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight group-hover:text-emerald-50 transition-colors duration-300">
              L'Observatoire des Pises
            </h2>
          </div>

          <p class="text-slate-300 text-base sm:text-lg leading-loose">
            Niché à 1 300 mètres d'altitude au cœur du Parc National des Cévennes, notre site d'observation bénéficie d'une obscurité exceptionnelle, préservée de la pollution lumineuse.
          </p>

          <p class="text-slate-400 text-sm sm:text-base leading-loose">
            Équipé de coupole, d'instruments permanents et de plates-formes pour le matériel des adhérents, il accueille nos missions de photographie et nos week-ends d'observation.
          </p>

          <div class="pt-2">
            <a
                href="/observatoire-des-pises"
                class="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:-translate-y-0.5"
            >
              <span>Découvrir l'Observatoire des Pises</span>
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="lg:col-span-6 relative h-80 sm:h-[440px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <img
              src="https://images.prismic.io/societe-astronomique-montpellier/ZyIw7K8jQArT0Bci_image4.jpeg?auto=format,compress"
              alt="Observatoire des Pises dans les Cévennes"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
          <div class="absolute bottom-6 left-6 right-6 text-xs text-slate-300 backdrop-blur-md bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 transition-all duration-300 group-hover:bg-slate-900/90 group-hover:border-emerald-500/40">
            📍 Parc National des Cévennes — Ciel noir préservé
          </div>
        </div>

      </div>
    </section>


    <!-- 5. PROCHAINS ÉVÉNEMENTS -->
    <section
        id="agenda"
        class="animate-scroll-reveal animate-scroll bg-slate-900 rounded-3xl p-8 sm:p-14 lg:p-20 space-y-12 border border-slate-800/60 shadow-xl"
    >
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-slate-800">
        <div class="space-y-3">
          <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Prochains événements
          </h2>
          <p class="text-slate-400 text-sm sm:text-base leading-relaxed">
            Réunions du mardi soir, ateliers techniques et nuits d'observation.
          </p>
        </div>

        <a href="/agenda" class="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors duration-300 shrink-0 group">
          <span>Voir tout l'agenda</span>
          <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </a>
      </div>

      <div class="divide-y divide-slate-800/80">

        <!-- Événement 1 -->
        <article class="py-8 first:pt-0 last:pb-0 px-4 -mx-4 rounded-2xl transition-all duration-300 hover:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-8 group">
          <div class="flex items-start sm:items-center gap-8 min-w-0">

            <div class="flex flex-col items-center justify-center shrink-0 text-center w-16 p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-indigo-500/40 transition-colors duration-300">
              <span class="text-xs font-bold uppercase tracking-widest text-indigo-400">SEP</span>
              <span class="text-3xl font-black text-white mt-0.5">15</span>
            </div>

            <div class="space-y-2 min-w-0">
              <div class="flex items-center gap-4 text-xs font-medium text-slate-400">
                <span class="text-indigo-300 font-semibold">Réunion mensuelle</span>
                <span>•</span>
                <span>20h15 - 22h45</span>
              </div>

              <h3 class="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
                <a href="/agenda/reunion-rentree-2026">
                  Réunion de rentrée 2026 & Accueil des nouveaux membres
                </a>
              </h3>

              <p class="text-sm text-slate-400 leading-relaxed">
                Tour de la Babote, Montpellier
              </p>
            </div>
          </div>

          <a href="/agenda/reunion-rentree-2026" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 group-hover:text-indigo-400 transition-colors duration-300 shrink-0">
            <span>Détails</span>
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>
        </article>

        <!-- Événement 2 -->
        <article class="py-8 first:pt-0 last:pb-0 px-4 -mx-4 rounded-2xl transition-all duration-300 hover:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-8 group">
          <div class="flex items-start sm:items-center gap-8 min-w-0">

            <div class="flex flex-col items-center justify-center shrink-0 text-center w-16 p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-emerald-500/40 transition-colors duration-300">
              <span class="text-xs font-bold uppercase tracking-widest text-emerald-400">OCT</span>
              <span class="text-3xl font-black text-white mt-0.5">03</span>
            </div>

            <div class="space-y-2 min-w-0">
              <div class="flex items-center gap-4 text-xs font-medium text-slate-400">
                <span class="text-emerald-300 font-semibold">Observation Publique</span>
                <span>•</span>
                <span>21h00 - 01h00</span>
              </div>

              <h3 class="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                <a href="#">
                  Nuit des Étoiles d'Automne & Observation de la Lune
                </a>
              </h3>

              <p class="text-sm text-slate-400 leading-relaxed">
                Observatoire des Pises (Cévennes)
              </p>
            </div>
          </div>

          <a href="#" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 group-hover:text-emerald-400 transition-colors duration-300 shrink-0">
            <span>Détails</span>
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>
        </article>

      </div>
    </section>


    <!-- 6. ACCÈS & CONTACT -->
    <section
        class="animate-scroll-reveal animate-scroll bg-slate-950 rounded-3xl p-8 sm:p-14 lg:p-20 space-y-12 border border-slate-800/80 shadow-xl"
    >
      <div class="space-y-3 pb-10 border-b border-slate-800">
        <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Nous rencontrer
        </h2>
        <p class="text-slate-400 text-sm sm:text-base leading-relaxed">
          Société Astronomique de Montpellier — Siège social à la Tour de la Babote
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        <!-- Carte iframe -->
        <div class="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-inner group">
          <iframe
              class="w-full h-80 sm:h-96 lg:h-[440px] border-0 grayscale hover:grayscale-0 transition-all duration-500"
              src="https://www.openstreetmap.org/export/embed.html?bbox=3.873200416564942%2C43.60533501659972%2C3.881182670593262%2C43.60946282806222&amp;layer=mapnik&amp;marker=43.607399%2C3.877192"
              loading="lazy"
              title="Carte OpenStreetMap - Tour de la Babote"
          ></iframe>
        </div>

        <div class="lg:col-span-5 space-y-10">
          <div class="space-y-8">

            <div class="space-y-2">
              <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-400">Adresse du siège</h3>
              <p class="text-slate-200 text-base sm:text-lg leading-relaxed">
                66 square de la Babote, 34000 Montpellier
              </p>
            </div>

            <div class="space-y-2">
              <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-400">Permanences & Réunions</h3>
              <p class="text-slate-200 text-base sm:text-lg leading-relaxed">
                Tous les <strong class="text-white">mardi soir dès 20h30</strong>
              </p>
              <p class="text-xs text-slate-400 leading-normal">
                (Hors vacances scolaires & sorties terrain)
              </p>
            </div>

            <div class="space-y-2">
              <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-400">Transports en commun</h3>
              <p class="text-slate-200 text-base sm:text-lg leading-relaxed">
                Tram 1 & 2 — Arrêt <em class="text-white not-italic font-semibold">Comédie</em><br>
                Tram 3 & 4 — Arrêt <em class="text-white not-italic font-semibold">Observatoire</em>
              </p>
            </div>

          </div>

          <div class="pt-6 border-t border-slate-800 space-y-6">
            <a
                href="https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=%3B43.607399%2C3.877192"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5"
            >
              <span>Calculer l'itinéraire vers la Babote</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </a>

            <p class="text-xs text-slate-400 leading-relaxed">
              <strong class="text-slate-300 font-semibold">Visite touristique ?</strong> Pour visiter l'édifice historique, veuillez contacter l'Office de tourisme de Montpellier.
            </p>
          </div>

        </div>

      </div>

    </section>

  </main>
</template>

<style scoped>

</style>