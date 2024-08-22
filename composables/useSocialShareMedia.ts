import type {PrismicPlugin} from "@prismicio/vue";
import type {AllDocumentTypes, HeaderDocument} from "~/prismicio-types";
import type {PrismicDocumentWithoutUID} from "@prismicio/types";

export const useSocialShareMedia = () => {
    const prismic: PrismicPlugin = usePrismic();
    const { data: confHeader } = useAsyncData(
        'confHeader',
        async (): Promise<PrismicDocumentWithoutUID> => await prismic.client.getSingle<HeaderDocument>('header', {
            lang: 'fr-fr',
            fetch: 'my.header.share_social_media',
            filters: [
                prismic.filter.at('my.header.share_social_media.display_social_network', true),
                // prismic.filter.at('my.header.share_social_media.display_social_network', 'Affiché')
            ]
        })
    )
    return confHeader.value?.data.share_social_media;
}
