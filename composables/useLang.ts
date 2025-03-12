import type { Ref } from "vue";
import { ref, watchEffect } from "vue";

export const useLang = (): Ref<string> => {
  const { locale, locales } = useI18n();
  const lang = ref("fr-FR"); // Default language

  watchEffect(() => {
    lang.value =
      locales.value.find((l) => l.code === locale.value)?.iso ?? "fr-FR";
  });

  return lang;
};
