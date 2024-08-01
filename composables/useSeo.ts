import type {Image} from "@prismicio/types-internal/lib/customtypes";

export interface IItem {
    title: string,
    description?: string,
    image?: any,
    imageAlt?: string | null
}
export const useSeo = (item: IItem): void => {
    const { t, locale } = useI18n();
    const config = useRuntimeConfig();

    const facebookAppId: string = config.public.facebookAppId as string;

    const titleName = t('layout.title')
    useHead({
        title: () => `${item.title} | ${titleName}`,
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
        ogUrl: '',
        ogType: 'website',
        ogTitle: `${item.title} | ${titleName}`,
        ogDescription: item.title,
        ogImage: '',
        ogImageAlt: '',
        ogLocale: locale,
        ogSiteName: '',
        twitterCard: 'summary_large_image',
        twitterSite: '',
        twitterTitle: `${item.title} | ${titleName}`,
        twitterDescription: item.description,
        twitterImage: '',
        twitterImageAlt: ''
    })
}