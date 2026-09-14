import type {ImageField} from "@prismicio/client";
import type {BlockHeroDocument} from "../prismicio-types";

interface BlockHeroData {
    title?: string;
    subtitle?: string;
    background_image?: ImageField;
    title_part_1?: string;
    title_part_2?: string;
    carousel: BlockHeroDocument["data"]["carousel"];
    button_left?: BlockHeroDocument["data"]["button_left"];
    text_button_left?: string;
    button_right?: BlockHeroDocument["data"]["button_right"];
    text_button_right?: string;
}

export interface RelatedBlockHero {
    data: BlockHeroData;
}