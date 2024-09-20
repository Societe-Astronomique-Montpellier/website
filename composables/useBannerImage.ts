import type { ImageField } from "@prismicio/client";
import { isFilled } from "@prismicio/helpers";
import type {
  EmptyImageFieldImage,
  FilledImageFieldImage,
} from "@prismicio/types";
import type { PrismicPlugin } from "@prismicio/vue";

export const useBannerImage = (
  imageField: ImageField<"banner" | "mobile"> | undefined,
  isMobile: boolean,
): FilledImageFieldImage | EmptyImageFieldImage | undefined => {
  if (!isFilled.image(imageField) || typeof imageField === undefined) {
    const prismic: PrismicPlugin = usePrismic();
    // filter : my.[custom-type].[image-field]
    // const { data: defaultBanner } = useAsyncData('defaultBanner', async (): Promise<T> => await prismic.client.getByID<AllDocumentTypes>('xx')) as ImageField
    // todo return default img
  }

  return isMobile ? imageField?.mobile : imageField?.banner;
};
