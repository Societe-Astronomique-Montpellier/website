import { apiEndpoint, repositoryName } from "./slicemachine.config.json";

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  sourcemap: { server: true, client: false },
  build: {
    analyze: true,
  },
  nitro: {
    preset: "node-server",
  },
  typescript: {
    typeCheck: true,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/prismic",
    "@nuxt/icon",
    "@nuxtjs/leaflet",
    "@nuxtjs/device",
    "@nuxtjs/i18n",
    "@nuxtjs/robots",
    "@nuxt/image",
    "@stefanobartoletti/nuxt-social-share",
    "nuxt-delay-hydration",
    "@nuxt/eslint",
    [
      "@nuxtjs/robots",
      {
        rules: [{ UserAgent: "*" }, { Allow: "*" }],
      },
    ],
    [
      "nuxt-mail",
      {
        message: {
          to: "contact@societe-astronomique-montpellier.fr",
        },
        smtp: {
          host: process.env.NUXT_SAM_SMTP_HOST || "smtp.test.fr",
          port: Number(process.env.NUXT_SAM_SMTP_PORT) || 587,
          auth: {
            user: process.env.NUXT_SAM_SMTP_USER || "",
            pass: process.env.NUXT_SAM_SMTP_PWD || "",
          },
          secure: false,
        },
      },
    ],
    "@nuxt/scripts",
    "@nuxtjs/turnstile",
    "@nuxtjs/color-mode",
  ],
  prismic: {
    endpoint: apiEndpoint || repositoryName, // process.env.NUXT_PRISMIC_ENDPOINT, // apiEndpoint || repositoryName,
    linkResolver: "~/prismic/linkResolver",
    preview: false,
    toolbar: false,
  },
  i18n: {
    detectBrowserLanguage: false,
    locales: ["fr-fr"],
    defaultLocale: "fr-fr",
    vueI18n: "./i18n/i18n.config.ts",
  },
  imports: {
    dirs: ["composables", "composables/**", "types/*.d.ts"],
  },
  image: {
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
    },
  },
  delayHydration: {
    mode: "mount",
    debug: process.env.NODE_ENV === "development",
  },
  css: [
    "@/assets/css/main.css",
    "@fontsource/raleway",
    "@fontsource/raleway/200.css",
    "@fontsource/raleway/200-italic.css",
    "leaflet/dist/leaflet.css",
    "@fancyapps/ui/dist/fancybox/fancybox.css",
    "@schedule-x/theme-default/dist/index.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  turnstile: {
    siteKey: process.env.NUXT_TURNSTILE_PUBLIC_KEY,
  },
  eslint: {},
  colorMode: {
    preference: "light",
    fallback: "light",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storage: "localStorage", // or 'sessionStorage' or 'cookie'
    storageKey: "nuxt-color-mode",
  },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          type: "image/png",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
      ],
      htmlAttrs: {
        lang: "fr",
      },
    },
  },
  socialShare: {
    baseUrl: "https://www.societe-astronomique-montpellier.fr/",
    styled: false,
    label: false,
    icon: true,
  },
  compatibilityDate: "2024-10-31",
  runtimeConfig: {
    apiEndpoint: process.env.NUXT_PRISMIC_ENDPOINT,
    apiPrismicRepository: process.env.NUXT_PRISMIC_REPOSITORY,
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_PRIVATE_KEY,
    },
    public: {
      facebookAppId: 1602972866638341,
      facebookSam: "https://www.facebook.com/societeastronomiquemontpellier/",
      twitterSam: "https://x.com/astro_mtp",
      youtubeSam: "https://www.youtube.com/@societeastronomiquedemontp2598",
      instagramSam: "",
      githubSam: "https://github.com/Societe-Astronomique-Montpellier/website",
    },
  },
});
