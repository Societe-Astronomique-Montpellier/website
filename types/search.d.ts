import type { PrismicDocument } from "@prismicio/client";

import type {
  PageThematiqueDocumentData,
  PageArticleDocumentData,
  EventsDocumentData,
  EventDocumentData,
  ContactDocumentData,
} from "~/prismicio-types";

export type SearchDocumentType =
  | PrismicDocument<PageThematiqueDocumentData>
  | PrismicDocument<PageArticleDocumentData>
  | PrismicDocument<EventsDocumentData>
  | PrismicDocument<EventDocumentData>
  | PrismicDocument<ContactDocumentData>;
