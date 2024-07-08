import type {ContentRelationshipField} from "@prismicio/client";
import {FilledContentRelationshipField} from "@prismicio/client/src/types/value/contentRelationship";
import type {BlockHeroDocumentDataSlicesSlice} from "~/prismicio-types";

type Nullable<T> = T | undefined | null;


export interface IPrismicDocument {
  id: string;
  uid: Nullable<string>;
  type: string;
  data: {
    bloc_hero: ContentRelationshipField | EmptyFiel
  //   bloc_testimonial?: any, //ContentRelationshipField | EmptyLinkField,
  //   bloc_thematiques?: any,
  //   block_cta?: any, //ContentRelationshipField | EmptyLinkField,
  }
}
