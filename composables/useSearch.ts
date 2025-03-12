import type { PrismicPlugin } from "@prismicio/vue";
import { debounce } from "~/utils/debounce";
import type { AllDocumentTypes } from "~/prismicio-types";
import type { Query } from "@prismicio/client";
import type { SearchDocumentType } from "~/types/search";

export const useSearch = () => {
  const searchQuery: Ref<string> = ref("");
  const prismic: PrismicPlugin = usePrismic();
  const lang = useLang();

  const {
    data: results,
    pending: loading,
    refresh,
  } = useAsyncData<SearchDocumentType[]>("fetchContent", async () => {
    if (searchQuery.value.trim() === "" || 3 > searchQuery.value.trim().length)
      return [];
    const response: Query<AllDocumentTypes> = await prismic.client.get({
      lang: lang.value,
      filters: [
        prismic.filter.fulltext("document", searchQuery.value.trim()),
        prismic.filter.not("document.tags", ["block"]),
        prismic.filter.any("document.type", [
          "page_article",
          "page_thematique",
          "event",
          "page_editoriale",
        ]),
      ],
      orderings: {
        field: "document.last_publication_date",
      },
      pageSize: 10,
    });

    return response.results as unknown as SearchDocumentType[];
  });

  const debouncedFetch = debounce(async (): Promise<void> => {
    if (searchQuery.value.trim() === "") {
      results.value = [];
      return;
    }
    await refresh();
  }, 300); // Debounce delay of 300ms

  // Watch for changes in searchQuery and call the debounced function
  watch(searchQuery, () => {
    debouncedFetch();
  });

  return {
    searchQuery,
    results,
    loading,
    refresh,
  };
};
