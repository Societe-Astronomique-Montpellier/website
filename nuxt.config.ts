import { apiEndpoint, repositoryName } from "./slicemachine.config.json";
// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/prismic"
  ],
  prismic: { endpoint: apiEndpoint || repositoryName },
  imports: {
    dirs: [
      'composables',
      'composables/**',
      'types/*.d.ts'
    ]
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app:{
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',      
    }	  
  },
  compatibilityDate: '2024-07-04'
})