import { apiEndpoint, repositoryName } from "./slicemachine.config.json";

export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/prismic", "@nuxt/icon", "@nuxtjs/leaflet"],
  prismic: {
    endpoint: apiEndpoint || repositoryName, // process.env.NUXT_PRISMIC_ENDPOINT, // apiEndpoint || repositoryName,
    preview: '/api/preview',
    clientConfig: {
      routes: [
        {
          type: 'homepage',
          uid: 'sam_homepage',
          path: '/'
        },
        {
          type: 'events',
          uid: 'agenda',
          path: '/agenda'
        },
        // {
        //   type: 'event',
        //   resolvers: {
        //     category: 'agenda'
        //   },
        //   path: '/:agenda/:uid'
        // },
        {
          type: 'page_thematique',
          path: '/:uid',
        },
        // {
        //   type: 'page_article',
        //   path: '/:thematic/:uid',
        //   resolvers: {
        //     thematic: ':thematicUid'
        //   }
        // }
      ]
    }
  },
  imports: {
    dirs: [
      'composables',
      'composables/**',
      'types/*.d.ts'
    ]
  },
  css: ['@/assets/css/main.css', 'leaflet/dist/leaflet.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app:{
    head: {
      title: 'Société Astronomique de Montpellier',
      htmlAttrs: {
        lang: 'fr'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }]
    }	  
  },
  compatibilityDate: '2024-07-04',
  runtimeConfig: {
    apiEndpoint: process.env.NUXT_PRISMIC_ENDPOINT,
    apiPrismicRepository: process.env.NUXT_PRISMIC_REPOSITORY
  }
})