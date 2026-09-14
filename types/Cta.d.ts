import type { BlockCtaDocument, BlockCtaDarkDocument } from '~/prismicio-types'

type BlockCtaFields =
    | "suptitle"
    | "title"
    | "subtitle"
    | "image"
    | "resume"
    | "content"
    | "display_button_link"
    | "link"

export type RelatedBlockCta = BlockCtaDocument & {
    data: Pick<BlockCtaDocument["data"], BlockCtaFields>
}

export type RelatedBlockCtaDark = BlockCtaDarkDocument & {
    data: Pick<BlockCtaDarkDocument["data"], BlockCtaFields>
}

// Union pour la props qui accepte plusieurs types de documents
export type RelatedCtaHome = RelatedBlockCta | RelatedBlockCtaDark