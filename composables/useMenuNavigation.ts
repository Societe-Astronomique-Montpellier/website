import type { PrismicPlugin } from "@prismicio/vue";
import type { HeaderDocument } from "~/prismicio-types";

export const useMenuNavigation = () => {
  const prismic: PrismicPlugin = usePrismic();
  const lang = useLang();

  const { data: menuNavigation } = useAsyncData(
    "$menuNavigation",
    async () =>
      await prismic.client.getSingle<HeaderDocument>("header", {
        lang: lang.value,
      }),
  );
  return menuNavigation;
};
