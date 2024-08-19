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

    const facebookAppId: number = config.public.facebookAppId;

    const titleName: string = t('layout.title')

    // useServerHead({
    //     title: () => item.title.slice(70),
    //     meta: [
    //         { name: 'title', content: `${item.title} | ${titleName}` },
    //         { name: 'description', content: item.description }
    //     ],
    // });

    useHead({
        htmlAttrs: {
            lang: ():string => locale.value
        },
        link: [
            { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        ]
    })

    useSeoMeta({
        fbAppId: facebookAppId,
        title: `${item.title} | ${titleName}`,
        description: item.description,
        ogUrl: `${url}`,
        ogType: 'website',
        ogTitle: `${item.title} | ${titleName}`,
        ogDescription: item.title,
        ogImage: item.image ?? defaultImg,
        ogImageAlt: item.imageAlt ?? '',
        ogLocale: locale.value,
        ogSiteName: titleName,
        twitterCard: 'summary_large_image',
        twitterSite: (): string =>  titleName,
        twitterTitle: `${item.title} | ${titleName}`,
        twitterDescription: (): string => (undefined !== item.description) ? item.description : '',
        twitterImage: item.image ?? defaultImg,
        twitterImageAlt: () =>  item.imageAlt
    })

    useServerSeoMeta({
        fbAppId: facebookAppId,
        title: `${item.title} | ${titleName}`,
        description: item.description,
        ogUrl: `${url}`,
        ogType: 'website',
        ogTitle: `${item.title} | ${titleName}`,
        ogDescription: item.title,
        ogImage: item.image ?? defaultImg,
        ogImageAlt: item.imageAlt ?? '',
        ogLocale: locale.value,
        ogSiteName: titleName,
        twitterCard: 'summary_large_image',
        twitterSite: (): string =>  titleName,
        twitterTitle: `${item.title} | ${titleName}`,
        twitterDescription: (): string => (undefined !== item.description) ? item.description : '',
        twitterImage: item.image ?? defaultImg,
        twitterImageAlt: () =>  item.imageAlt
    })
}