import type {
  AllDocumentTypes,
  EventDocument,
  PageArticleDocument,
} from "~/prismicio-types";
import type { PrismicPlugin } from "@prismicio/vue";

export const useArticlesByThematic = () => {
  const prismic: PrismicPlugin = usePrismic();
  const { locale } = useI18n();

  const fetchChildrenPages = async (thematicId: string) => {
    console.log()
    const dateNow = new Date().toISOString().split("T")[0];
    const [dataArticles, dataEvents] = await Promise.all([
      (await prismic.client.getAllByType<AllDocumentTypes>("page_article", {
        filters: [prismic.filter.at("my.page_article.thematic", thematicId)],
        orderings: {
          field: "my.page_article.position",
          direction: "asc",
        },
        lang: locale.value,
      })) as PageArticleDocument[],
      (await prismic.client.getAllByType<AllDocumentTypes>("event", {
        lang: locale.value,
        filters: [
          prismic.filter.dateAfter("my.event.time_start", dateNow),
          prismic.filter.at("my.event.activite_periodique", true),
        ],
        orderings: {
          field: "my.event.time_start",
          direction: "asc",
        },
      })) as EventDocument[],
    ]);

    return {
      dataArticles,
      dataEvents,
    };
  };

  return {
    fetchChildrenPages,
  };
};
