import type {RichTextField, ImageField, LinkField} from "@prismicio/client";

type Nullable<T> = T | undefined | null;
type Undefined<T> = T | undefined;

interface IPrismicImage {
    alt: Nullable<string>,
    copyright: Nullable<string>,
    dimensions?: {
        width: Nullable<number>,
        height: Nullable<number>
    },
    id : string,
    url: string
}

interface IBlock {
    id: Nullable<string>,
    uid?: Nullable<string>,
    title: RichTextField | null,
    subtitle?: Nullable<RichTextField>,
    image?: Undefined<ImageField>,
    resume?: Nullable<RichTextField>,
    content?: Nullable<RichTextField>,
    showButton?: Nullable<boolean>,
    link?: Nullable<LinkField>
}

interface IListBlocks {
    id: Nullable<string>,
    uid?: Nullable<string>,
    blocks: Nullable<Array<IBlock>>
}

export { IBlock, IListBlocks }