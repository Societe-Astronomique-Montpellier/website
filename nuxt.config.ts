import { apiEndpoint, repositoryName } from "./slicemachine.config.json";

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  typescript: {
    typeCheck: true
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/prismic",
    "@nuxt/icon",
    "@nuxtjs/leaflet",
    "@nuxtjs/device",
    "@nuxtjs/i18n",
    "@nuxtjs/robots",
    "@nuxtjs/html-validator",
    "@nuxt/image",
    "@stefanobartoletti/nuxt-social-share",
    'nuxt-delay-hydration',
    ["@nuxtjs/robots", {
      rules: [
        { UserAgent: "*" },
        { Allow: "*" },
      ],
    }],
  ],
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
        {
          type: 'event',
          path: '/agenda/:uid'
        },
        {
          type: 'page_thematique',
          path: '/:uid',
        },
        {
          type: 'page_article',
          path: '/article/:uid',
          // resolvers: {
          //   thematic: 'page_thematique.uid'
          // }
        }
      ]
    }
  },
  i18n: {
    detectBrowserLanguage: false,
    vueI18n: './i18n/i18n.config.ts'
  },
  imports: {
    dirs: [
      'composables',
      'composables/**',
      'types/*.d.ts'
    ]
  },
  delayHydration: {
    mode: 'mount',
    debug: process.env.NODE_ENV === 'development'
  },
  css: [
    '@/assets/css/main.css',
    '@fontsource/raleway',
    '@fontsource/raleway/200.css',
    '@fontsource/raleway/200-italic.css',
    'leaflet/dist/leaflet.css',
    '@fancyapps/ui/dist/fancybox/fancybox.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app:{
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      ],
      htmlAttrs: {
        lang: 'fr'
      }
    }	  
  },
  socialShare: {
    baseUrl: 'https://demo-sam.netlify.app/',
    styled: false,
    label: false,
    icon: true
  },
  compatibilityDate: '2024-07-04',
  runtimeConfig: {
    apiEndpoint: process.env.NUXT_PRISMIC_ENDPOINT,
    apiPrismicRepository: process.env.NUXT_PRISMIC_REPOSITORY,
    public: {
      facebookAppId: 1602972866638341
    }
  }
})