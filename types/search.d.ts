import type { PrismicDocument } from "@prismicio/client";

import type {
  PageThematiqueDocumentData,
  PageArticleDocumentData,
  EventDocumentData,
  PageEditorialeDocumentData,
} from "~/prismicio-types";

export type SearchDocumentType =
  | PrismicDocument<PageThematiqueDocumentData>
  | PrismicDocument<PageArticleDocumentData>
  | PrismicDocument<EventDocumentData>
  | PrismicDocument<PageEditorialeDocumentData>;
