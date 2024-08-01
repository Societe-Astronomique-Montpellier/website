import type {Image} from "@prismicio/types-internal/lib/customtypes";

export interface IItem {
    title: string,
    description?: string,
    canonicalUrl: string,
    image?: any,
    imageAlt?: string | null
}
export const useSeo = (item: IItem): void => {
    const { t, locale } = useI18n();
    const config = useRuntimeConfig();

    const facebookAppId: string = config.public.facebookAppId as string;

    const titleName: string = t('layout.title')
    useHead({
        title: (): string => `${item.title} | ${titleName}`,
        meta: [
            { name: 'title', content: `${item.title} | ${titleName}` },
            { name: 'description', content: item.description }
        ],
        htmlAttrs: {
            lang: locale
        },
    });

    useSeoMeta({
        fbAppId: facebookAppId,
        ogUrl: item.canonicalUrl,
        ogType: 'website',
        ogTitle: `${item.title} | ${titleName}`,
        ogDescription: item.title,
        ogImage: item.image,
        ogImageAlt: item.imageAlt,
        ogLocale: locale,
        ogSiteName: titleName,
        twitterCard: 'summary_large_image',
        twitterSite: titleName,
        twitterTitle: `${item.title} | ${titleName}`,
        twitterDescription: item.description,
        twitterImage: '',
        twitterImageAlt: ''
    })
}