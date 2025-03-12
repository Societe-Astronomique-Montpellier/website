import type { PrismicPlugin } from "@prismicio/vue";
import type {
  HeaderDocument,
  Simplify,
  HeaderDocumentDataShareSocialMediaItem,
} from "~/prismicio-types";

export const useSocialShareMedia = () => {
  const prismic: PrismicPlugin = usePrismic();
  const lang = useLang();

  const shareSocialMedia = ref<
    Simplify<HeaderDocumentDataShareSocialMediaItem>[] | undefined | null
  >(null);
  const { data: shareSocialMediaData } = useLazyAsyncData(
    "shareSocialMedia",
    async () =>
      await prismic.client.getSingle<HeaderDocument>("header", {
        lang: lang.value,
        fetch: "my.header.share_social_media",
      }),
  );

  shareSocialMedia.value =
    shareSocialMediaData?.value?.data.share_social_media.filter(
      (i: HeaderDocumentDataShareSocialMediaItem) =>
        true === i.display_social_network,
    ) || null;

  return { shareSocialMedia };
};
