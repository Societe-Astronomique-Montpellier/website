import type { Ref } from "vue";
import { ref, watchEffect } from "vue";

export const useLang = (): Ref<string | undefined> => {
  const { locale, locales } = useI18n();
  const lang: Ref<string | undefined> = ref("fr-FR"); // Default language

  watchEffect((): void => {
    lang.value =
      (locales.value.find((l): boolean => l.code === locale.value)
        ?.iso as string) ?? "fr-FR";
  });

  return lang;
};
