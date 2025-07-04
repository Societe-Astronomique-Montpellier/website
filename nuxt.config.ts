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
    defaultLocale: "fr",
    locales: [
      {
        code: "fr",
        iso: "fr-FR",
        name: "Français",
        file: "fr.json",
        flag: "🇫🇷",
      },
    ],
    lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
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
  compatibilityDate: "2025-07-03",
  runtimeConfig: {
    apiEndpoint: process.env.NUXT_PRISMIC_ENDPOINT,
    apiPrismicRepository: process.env.NUXT_PRISMIC_REPOSITORY,
    prismicEventSecret: process.env.NUXT_PRISMIC_EVENT_SECRET,
    smtpHost: process.env.NUXT_SMTP_HOST,
    smtpPort: parseInt(process.env.NUXT_SMTP_PORT || "465", 10),
    smtpUser: process.env.NUXT_SMTP_USER,
    smtpPwd: process.env.NUXT_SMTP_PWD,
    smtpMailingList: process.env.NUXT_SMTP_MAILLIST,
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_PRIVATE_KEY,
    },
    nextcloudUrl: process.env.NUXT_NEXTCLOUD_URL,
    nextcloudLogin: process.env.NUXT_NEXTCLOUD_LOGIN,
    nextcloudPassword: process.env.NUXT_NEXTCLOUD_PASSWORD,
    public: {
      facebookAppId: 726636013855878,
      facebookSam: "https://www.facebook.com/profile.php?id=61577575791459",
      twitterSam: "https://x.com/astro_mtp",
      youtubeSam: "https://www.youtube.com/@societeastronomiquedemontp2598",
      instagramSam: "",
      githubSam: "https://github.com/Societe-Astronomique-Montpellier/website",
    },
  },
});
