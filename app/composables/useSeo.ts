// composables/useSeo.ts
import { toValue, type MaybeRefOrGetter } from "vue";

type RuntimeConfig = ReturnType<typeof useRuntimeConfig>;

export interface ISeoItem {
  title: MaybeRefOrGetter<string>;
  description: MaybeRefOrGetter<string>;
  image: MaybeRefOrGetter<string>;
}

export const useSeo = (item: ISeoItem): void => {
  const { t, locale } = useI18n();
  const url: URL = useRequestURL();
  const config: RuntimeConfig = useRuntimeConfig();

  const facebookAppId: number = config.public.facebookAppId;
  const titleName: string = t("layout.title");

  useHead({
    htmlAttrs: {
      lang: (): string => locale.value,
    },
    link: [
      { rel: "icon", type: "image/png", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
    ],
  });

  useSeoMeta({
    fbAppId: facebookAppId,
    title: (): string => toValue(item.title),
    description: (): string => toValue(item.description),
    ogUrl: url.toString(),
    ogType: "website",
    ogTitle: (): string => toValue(item.title),
    ogDescription: (): string => toValue(item.description),
    ogImage: (): string => toValue(item.image),
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogLocale: (): string => locale.value,
    ogSiteName: titleName,
    twitterCard: "summary_large_image",
    twitterSite: titleName,
    twitterTitle: (): string => toValue(item.title),
    twitterDescription: (): string => toValue(item.description),
    twitterImage: (): string => toValue(item.image),
  });
};