import type {PrismicPlugin} from "@prismicio/vue";
import type {HeaderDocument} from "~/prismicio-types";
import type {PrismicDocumentWithoutUID} from "@prismicio/types";

export const useSocialShareMedia = () => {
    const prismic: PrismicPlugin = usePrismic();
    const { locale } = useI18n()
    return useAsyncData(
        '$shareSocialMedia',
        async (): Promise<PrismicDocumentWithoutUID> => await prismic.client.getSingle<HeaderDocument>('header', {
            lang: locale.value,
            fetch: 'my.header.share_social_media'
        })
    ).data.value?.data.share_social_media.filter((i: any) => true === i.display_social_network);
}
