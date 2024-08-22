import type {RuntimeConfig} from "@nuxt/schema";
import defaultImg from '../public/logo.png'
import {asImageSrc} from "@prismicio/helpers";

export interface IItem {
    title: string | Ref<string>,
    description: string | Ref<string>,
    image: any | Ref<any>,
}
export const useSeo = (item: IItem): void => {
    const { t, locale } = useI18n();
    const url: URL = useRequestURL()
    const config: RuntimeConfig = useRuntimeConfig();

    const facebookAppId: number = config.public.facebookAppId;
    const titleName: string = t('layout.title')

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
        title: (): string => unref(item.title),
        description: (): string => unref(item.description),
        ogUrl: `${url}`,
        ogType: 'website',
        ogTitle: (): string => unref(item.title),
        ogDescription: (): string => unref(item.description),
        ogImage: (): any => unref(item.image) ?? defaultImg,
        // ogImageAlt: (): string => item.imageAlt ?? '',
        ogLocale: locale.value,
        ogSiteName: (): string =>  titleName,
        twitterCard: 'summary_large_image',
        twitterSite: (): string => titleName,
        twitterTitle: (): string => unref(item.title),
        twitterDescription: (): string =>  unref(item.description),
        twitterImage: (): any => unref(item.image) ?? defaultImg,
        // twitterImageAlt: (): string => item.imageAlt
    })
}