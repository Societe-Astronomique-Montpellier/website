import {defineNuxtPlugin} from 'nuxt/app';

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labs from "vuetify/labs/components";

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      ...components,
      ...labs      
    },
    directives,
    icons: {}
  })

  nuxtApp.vueApp.use(vuetify);
})
