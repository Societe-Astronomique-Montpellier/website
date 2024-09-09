import type {PrismicPlugin} from "@prismicio/vue";
import type {HeaderDocument} from "~/prismicio-types";

export const useMenuNavigation = () => {
    const prismic: PrismicPlugin = usePrismic();
    const { locale } = useI18n()

    const { data: menuNavigation, error } = useAsyncData('$menuNavigation', async () => await prismic.client.getSingle<HeaderDocument>('header', {lang: locale.value}));
    return menuNavigation
}