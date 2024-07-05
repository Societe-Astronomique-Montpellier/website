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
  css: [
    'vuetify/lib/styles/main.sass',
    'vuetify/dist/vuetify.min.css', 
    '@/assets/scss/app.scss'    
  ],	  
  build: {
    transpile: ['vuetify']
  },
  app:{
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',      
    }	  
  },
  compatibilityDate: '2024-07-04'
})
