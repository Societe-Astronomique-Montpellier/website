import type { LinkResolverFunction } from "@prismicio/client";
// import {type LinkResolverFunction} from '@prismicio/client';

const linkResolver: LinkResolverFunction = (document: any): string | null => {
  if ("page_thematique" === document.type) {
    const thematicUid = document.uid;
    return `/${thematicUid}`;
  }

  if ("page_article" === document.type) {
    const thematicUid = document.data.thematic.uid;
    return `/${thematicUid}/${document.uid}`;
  }

  if ("page_editoriale" === document.type) {
    const editorialUid = document.uid;
    return `/information/${editorialUid}`;
  }

  if ("events" === document.type) {
    return `/agenda`;
  }

  if ("event" === document.type) {
    return `/agenda/${document.uid}`;
  }

  if ("homepage" === document.type) {
    return "/";
  }
  return null;
};

export default linkResolver;
