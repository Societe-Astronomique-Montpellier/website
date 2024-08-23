import {type LinkResolverFunction} from '@prismicio/client';
import type {FilledContentRelationshipField} from "@prismicio/client/src/types/value/contentRelationship";

const linkResolver: LinkResolverFunction = (document: any): string|null => {
    if ('page_thematique' === document.type) {
        const thematicUid = document.uid;
        return `/${thematicUid}`;
    }

    if ('page_article' === document.type) {
        const thematicUid = document.data.thematic.uid;
        return `/${thematicUid}/${document.uid}`;
    }

    if ('events' === document.type) {
        return `/agenda`;
    }

    if ('event' === document.type) {
        return `/agenda/${document.uid}`;
    }

    if ('homepage' === document.type) {
        return "/"
    }
    return null
}

export default linkResolver;