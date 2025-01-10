// import enCustom from '@/i18n/locales/en.json';
import frCustom from "@/i18n/locales/fr.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "fr",
  globalInjection: true,
  messages: {
    fr: frCustom,
  },
}));
