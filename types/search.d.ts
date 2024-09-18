import { PrismicDocument } from '@prismicio/client'

import { PageThematiqueDocumentData } from "~/prismicio-types";
import { PageArticleDocumentData } from "~/prismicio-types";
import { EventsDocumentData } from "~/prismicio-types";
import { EventDocumentData } from "~/prismicio-types";
import { ContactDocumentData } from "~/prismicio-types";

export type SearchDocumentType = PrismicDocument<PageThematiqueDocumentData>
    | PrismicDocument<PageArticleDocumentData>
    | PrismicDocument<EventsDocumentData>
    | PrismicDocument<EventDocumentData>
    | PrismicDocument<ContactDocumentData>