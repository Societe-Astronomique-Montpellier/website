// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    typeCheck: true
  },

  modules: [
    "@nuxtjs/prismic",
  ],

  prismic: { endpoint: process.env.NUXT_PRISMIC_ENDPOINT },

  build: {
    transpile: ['vuetify']
  },

  compatibilityDate: '2024-07-04'
})