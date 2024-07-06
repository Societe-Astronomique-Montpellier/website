type Nullable<T> = T | undefined | null;

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
    id: string,
    uid: Nullable<string>,
    title: string,
    subtitle: Nullable<Array>,
    image: Nullable<IPrismicImage>,
    resume: Nullable<Array>,
    content: Array,
    showButton: Nullable<boolean>,
    link: Nullable<Array>
}

export { IPrismicImage, IBlock } 