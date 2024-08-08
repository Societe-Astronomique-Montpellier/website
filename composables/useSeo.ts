import type {RuntimeConfig} from "@nuxt/schema";
import defaultImg from '../public/images/SAM_0054-1038x576.jpg'

export interface IItem {
    title: string,
    description?: string,
    image?: any,
    imageAlt?: string | null
}
export const useSeo = (item: IItem): void => {
    const { t, locale } = useI18n();
    const url: URL = useRequestURL()
    const config: RuntimeConfig = useRuntimeConfig();

    const facebookAppId: string = config.public.facebookAppId as string;

    const titleName: string = t('layout.title')

    useHead({
        title: (): string => `${item.title.slice(70)}`,
        meta: [
            { name: 'title', content: `${item.title} | ${titleName}` },
            { name: 'description', content: item.description }
        ],
        htmlAttrs: {
            lang: locale
        },
        link: [
            {
                rel: 'icon',
                type: 'image/png',
                href: '/favicon.ico'
            }
        ]
    });

    useSeoMeta({
        fbAppId: facebookAppId,
        ogUrl: `${url}`,
        ogType: 'website',
        ogTitle: `${item.title} | ${titleName}`,
        ogDescription: item.title,
        ogImage: item.image ?? defaultImg,
        ogImageAlt: item.imageAlt,
        ogLocale: locale,
        ogSiteName: titleName,
        twitterCard: 'summary_large_image',
        twitterSite: titleName,
        twitterTitle: `${item.title} | ${titleName}`,
        twitterDescription: item.description,
        twitterImage: item.image ?? defaultImg,
        twitterImageAlt: item.imageAlt
    })
}