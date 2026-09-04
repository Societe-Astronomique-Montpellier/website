// composables/usePrismicSeo.ts
import { asImageSrc, asText, isFilled } from "@prismicio/client";
import type { ImageField, KeyTextField, RichTextField } from "@prismicio/client";
import { computed, type ComputedRef } from "vue";

type PrismicTextLike = KeyTextField | RichTextField | null | undefined;
type PrismicImageLike = ImageField | null | undefined;

/** Extrait le texte d'un champ Prismic, qu'il soit TextField (string) ou RichTextField (RTNode[]). */
function extractText(field: PrismicTextLike): string {
    if (isFilled.keyText(field as KeyTextField)) {
        return field as string;
    }
    if (isFilled.richText(field as RichTextField)) {
        return asText(field as RichTextField) ?? "";
    }
    return "";
}

/** Retourne le texte du premier champ rempli parmi une liste (ordre = priorité de fallback). */
function firstFilledText(fields: PrismicTextLike[]): string {
    for (const field of fields) {
        const value = extractText(field);
        if (value) return value;
    }
    return "";
}

/** Retourne l'URL de la première image remplie parmi une liste. */
function firstFilledImage(fields: PrismicImageLike[]): string | undefined {
    for (const field of fields) {
        if (isFilled.image(field)) {
            return asImageSrc(field) ?? undefined;
        }
    }
    return undefined;
}

export interface UsePrismicSeoOptions {
    title: () => PrismicTextLike[];
    description: () => PrismicTextLike[];
    image: () => PrismicImageLike[];
    defaultImage?: string;
}

export interface UsePrismicSeoReturn {
    title: ComputedRef<string>;
    description: ComputedRef<string>;
    image: ComputedRef<string>;
}

export const usePrismicSeo = (options: UsePrismicSeoOptions): UsePrismicSeoReturn => {
    const title = computed<string>(() => firstFilledText(options.title()));
    const description = computed<string>(() => firstFilledText(options.description()));
    const image = computed<string>(
        () => firstFilledImage(options.image()) ?? options.defaultImage ?? "",
    );

    return { title, description, image };
};
