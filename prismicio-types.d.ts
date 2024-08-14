// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

/**
 * Content for Bloc de contact documents
 */
interface BlockContactDocumentData {
  /**
   * Titre field in *Bloc de contact*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Titre du bloc
   * - **API ID Path**: block_contact.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Sous-titre field in *Bloc de contact*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Sous-titre du bloc
   * - **API ID Path**: block_contact.subtitle
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  subtitle: prismic.RichTextField;

  /**
   * Contenu field in *Bloc de contact*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Texte de contenu du bloc
   * - **API ID Path**: block_contact.content
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  content: prismic.RichTextField;

  /**
   * Lien field in *Bloc de contact*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: block_contact.link
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;
}

/**
 * Bloc de contact document from Prismic
 *
 * - **API ID**: `block_contact`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlockContactDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<BlockContactDocumentData>,
    "block_contact",
    Lang
  >;

type BlockCtaDocumentDataSlicesSlice = never;

/**
 * Content for Bloc CallTo Action documents
 */
interface BlockCtaDocumentData {
  /**
   * Titre field in *Bloc CallTo Action*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Titre
   * - **API ID Path**: block_cta.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Sous-titre field in *Bloc CallTo Action*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: block_cta.subtitle
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  subtitle: prismic.KeyTextField;

  /**
   * Image field in *Bloc CallTo Action*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: block_cta.image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<"mobile">;

  /**
   * Résumé field in *Bloc CallTo Action*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: block_cta.resume
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  resume: prismic.RichTextField;

  /**
   * Contenu field in *Bloc CallTo Action*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: block_cta.content
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  content: prismic.RichTextField;

  /**
   * Masquer bouton de lien field in *Bloc CallTo Action*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: true
   * - **API ID Path**: block_cta.display_button_link
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  display_button_link: prismic.BooleanField;

  /**
   * Lien field in *Bloc CallTo Action*
   *
   * - **Field Type**: Link
   * - **Placeholder**: Lien
   * - **API ID Path**: block_cta.link
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;

  /**
   * Slice Zone field in *Bloc CallTo Action*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: block_cta.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<BlockCtaDocumentDataSlicesSlice>;
}

/**
 * Bloc CallTo Action document from Prismic
 *
 * - **API ID**: `block_cta`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlockCtaDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<BlockCtaDocumentData>,
    "block_cta",
    Lang
  >;

type BlockHeroDocumentDataSlicesSlice = never;

/**
 * Content for Bloc de présentation documents
 */
interface BlockHeroDocumentData {
  /**
   * Titre field in *Bloc de présentation*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: block_hero.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Sous-titre field in *Bloc de présentation*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: block_hero.subtitle
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  subtitle: prismic.KeyTextField;

  /**
   * Image field in *Bloc de présentation*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: block_hero.image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<"mobile">;

  /**
   * Slice Zone field in *Bloc de présentation*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: block_hero.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<BlockHeroDocumentDataSlicesSlice>;
}

/**
 * Bloc de présentation document from Prismic
 *
 * - **API ID**: `block_hero`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlockHeroDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<BlockHeroDocumentData>,
    "block_hero",
    Lang
  >;

type BlockTestimonialDocumentDataSlicesSlice = never;

/**
 * Content for Bloc testimonial documents
 */
interface BlockTestimonialDocumentData {
  /**
   * Titre field in *Bloc testimonial*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: block_testimonial.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Contenu field in *Bloc testimonial*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: block_testimonial.content
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  content: prismic.RichTextField;

  /**
   * Testimonial texte 1 field in *Bloc testimonial*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: block_testimonial.testimonial_text_1
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  testimonial_text_1: prismic.KeyTextField;

  /**
   * Testimonial vignette 1 field in *Bloc testimonial*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: block_testimonial.testimonial_vignette_1
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  testimonial_vignette_1: prismic.ImageField<"mobile">;

  /**
   * Testimonial texte 2 field in *Bloc testimonial*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: block_testimonial.testimonial_text_2
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  testimonial_text_2: prismic.KeyTextField;

  /**
   * Testimonial vignette 2 field in *Bloc testimonial*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: block_testimonial.testimonial_vignette_2
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  testimonial_vignette_2: prismic.ImageField<never>;

  /**
   * Testimonial texte 3 field in *Bloc testimonial*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: block_testimonial.testimonial_text_3
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  testimonial_text_3: prismic.KeyTextField;

  /**
   * Testimonial vignette 3 field in *Bloc testimonial*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: block_testimonial.testimonial_vignette_3
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  testimonial_vignette_3: prismic.ImageField<never>;

  /**
   * Slice Zone field in *Bloc testimonial*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: block_testimonial.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<BlockTestimonialDocumentDataSlicesSlice>;
}

/**
 * Bloc testimonial document from Prismic
 *
 * - **API ID**: `block_testimonial`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlockTestimonialDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<BlockTestimonialDocumentData>,
    "block_testimonial",
    Lang
  >;

type EventDocumentDataSlicesSlice = never;

/**
 * Content for Evenement documents
 */
interface EventDocumentData {
  /**
   * Titre field in *Evenement*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: event.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Bannière image field in *Evenement*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: event.image_banner
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image_banner: prismic.ImageField<"banner" | "mobile">;

  /**
   * Vignette field in *Evenement*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: event.image_vignette
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image_vignette: prismic.ImageField<"vignette" | "mobile">;

  /**
   * Contenu field in *Evenement*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Contenu
   * - **API ID Path**: event.resume
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  resume: prismic.RichTextField;

  /**
   * Date & Heure de début field in *Evenement*
   *
   * - **Field Type**: Timestamp
   * - **Placeholder**: Date & Heure de début
   * - **API ID Path**: event.time_start
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#timestamp
   */
  time_start: prismic.TimestampField;

  /**
   * Date & Heure de fin field in *Evenement*
   *
   * - **Field Type**: Timestamp
   * - **Placeholder**: Date & Heure de fin
   * - **API ID Path**: event.time_end
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#timestamp
   */
  time_end: prismic.TimestampField;

  /**
   * Lieu de l'évenement field in *Evenement*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: event.place_event_txt
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  place_event_txt: prismic.KeyTextField;

  /**
   * Coordonnées géographiques field in *Evenement*
   *
   * - **Field Type**: GeoPoint
   * - **Placeholder**: *None*
   * - **API ID Path**: event.place_event
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#geopoint
   */
  place_event: prismic.GeoPointField;

  /**
   * Lien field in *Evenement*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: event.link
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;

  /**
   * Slice Zone field in *Evenement*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: event.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<EventDocumentDataSlicesSlice> /**
   * Meta Title field in *Evenement*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: event.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Evenement*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: event.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;
}

/**
 * Evenement document from Prismic
 *
 * - **API ID**: `event`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type EventDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<EventDocumentData>, "event", Lang>;

type EventsDocumentDataSlicesSlice = never;

/**
 * Content for Events documents
 */
interface EventsDocumentData {
  /**
   * Title field in *Events*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: events.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Banniere field in *Events*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: events.image_banner
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image_banner: prismic.ImageField<"banner" | "mobile">;

  /**
   * Contenu field in *Events*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: events.content
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  content: prismic.RichTextField;

  /**
   * Slice Zone field in *Events*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: events.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<EventsDocumentDataSlicesSlice> /**
   * Meta Title field in *Events*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: events.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Events*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: events.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Events*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: events.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Events document from Prismic
 *
 * - **API ID**: `events`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type EventsDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<EventsDocumentData>, "events", Lang>;

/**
 * Item in *Bloc de configuration → Navigation en-tête*
 */
export interface HeaderDocumentDataHeaderNavigationItem {
  /**
   * Label du lien field in *Bloc de configuration → Navigation en-tête*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Titre du lien
   * - **API ID Path**: header.header_navigation[].label_header
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  label_header: prismic.KeyTextField;

  /**
   * Lien vers la page field in *Bloc de configuration → Navigation en-tête*
   *
   * - **Field Type**: Link
   * - **Placeholder**: Lien du header
   * - **API ID Path**: header.header_navigation[].link_header
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link_header: prismic.LinkField;
}

/**
 * Item in *Bloc de configuration → Partage sur réseaux sociaux*
 */
export interface HeaderDocumentDataShareSocialMediaItem {
  /**
   * Nom réseau social field in *Bloc de configuration → Partage sur réseaux sociaux*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: header.share_social_media[].social_network
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  social_network: prismic.KeyTextField;

  /**
   * Affichage field in *Bloc de configuration → Partage sur réseaux sociaux*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: header.share_social_media[].display_social_network
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  display_social_network: prismic.BooleanField;
}

/**
 * Content for Bloc de configuration documents
 */
interface HeaderDocumentData {
  /**
   * Titre field in *Bloc de configuration*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Titre du bloc
   * - **API ID Path**: header.content
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  content: prismic.KeyTextField;

  /**
   * Logo field in *Bloc de configuration*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: header.logo
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  logo: prismic.ImageField<"menu" | "homepage">;

  /**
   * Navigation en-tête field in *Bloc de configuration*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: header.header_navigation[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  header_navigation: prismic.GroupField<
    Simplify<HeaderDocumentDataHeaderNavigationItem>
  >;

  /**
   * Partage sur réseaux sociaux field in *Bloc de configuration*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: header.share_social_media[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  share_social_media: prismic.GroupField<
    Simplify<HeaderDocumentDataShareSocialMediaItem>
  >;
}

/**
 * Bloc de configuration document from Prismic
 *
 * - **API ID**: `header`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HeaderDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<HeaderDocumentData>,
    "header",
    Lang
  >;

/**
 * Item in *Page d'accueil → Bloc thématiques*
 */
export interface HomepageDocumentDataBlockThematiquesItem {
  /**
   * Liste des thématiques field in *Page d'accueil → Bloc thématiques*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.block_thematiques[].thematics_list
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  thematics_list: prismic.ContentRelationshipField<"page_thematique">;
}

type HomepageDocumentDataSlicesSlice = never;

/**
 * Content for Page d'accueil documents
 */
interface HomepageDocumentData {
  /**
   * Titre field in *Page d'accueil*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.titre
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  titre: prismic.KeyTextField;

  /**
   * Bloc Hero field in *Page d'accueil*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.block_hero
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  block_hero: prismic.ContentRelationshipField<"block_hero">;

  /**
   * Bloc testimonial field in *Page d'accueil*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.block_testimonial
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  block_testimonial: prismic.ContentRelationshipField<"block_testimonial">;

  /**
   * Titre bloc thématiques field in *Page d'accueil*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.block_thematics_title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  block_thematics_title: prismic.KeyTextField;

  /**
   * Texte bloc thématique field in *Page d'accueil*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Texte bloc thématique
   * - **API ID Path**: homepage.bloc_thematic_text
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  bloc_thematic_text: prismic.KeyTextField;

  /**
   * Bloc thématiques field in *Page d'accueil*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.block_thematiques[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  block_thematiques: prismic.GroupField<
    Simplify<HomepageDocumentDataBlockThematiquesItem>
  >;

  /**
   * Call to action field in *Page d'accueil*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.block_cta
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  block_cta: prismic.ContentRelationshipField<"block_cta">;

  /**
   * Titre bloc évenements field in *Page d'accueil*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.block_events_title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  block_events_title: prismic.KeyTextField;

  /**
   * Texte bloc évenements field in *Page d'accueil*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.block_events_text
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  block_events_text: prismic.KeyTextField;

  /**
   * Bloc de contact field in *Page d'accueil*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.block_contact
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  block_contact: prismic.ContentRelationshipField<"block_contact">;

  /**
   * Slice Zone field in *Page d'accueil*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice> /**
   * Meta Title field in *Page d'accueil*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: homepage.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Page d'accueil*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: homepage.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Page d'accueil*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Page d'accueil document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<HomepageDocumentData>,
    "homepage",
    Lang
  >;

/**
 * Item in *Page article → Galerie d'images*
 */
export interface PageArticleDocumentDataImagesGalleryItem {
  /**
   * Image field in *Page article → Galerie d'images*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: page_article.images_gallery[].image_gallery
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image_gallery: prismic.ImageField<never>;
}

type PageArticleDocumentDataSlicesSlice = never;

/**
 * Content for Page article documents
 */
interface PageArticleDocumentData {
  /**
   * Titre field in *Page article*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: page_article.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Thématique field in *Page article*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: page_article.thematic
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  thematic: prismic.ContentRelationshipField<"page_thematique">;

  /**
   * Sous-titre field in *Page article*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: page_article.subtitle
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  subtitle: prismic.KeyTextField;

  /**
   * Bannière field in *Page article*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: page_article.image_banner
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image_banner: prismic.ImageField<"banner" | "mobile">;

  /**
   * Vignette (page d'accueil) field in *Page article*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: page_article.image_vignette
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image_vignette: prismic.ImageField<"vignette" | "mobile">;

  /**
   * Contenu field in *Page article*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: page_article.content
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  content: prismic.RichTextField;

  /**
   * Auteur field in *Page article*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: page_article.author
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  author: prismic.KeyTextField;

  /**
   * Galerie d'images field in *Page article*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: page_article.images_gallery[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  images_gallery: prismic.GroupField<
    Simplify<PageArticleDocumentDataImagesGalleryItem>
  >;

  /**
   * Slice Zone field in *Page article*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: page_article.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<PageArticleDocumentDataSlicesSlice> /**
   * Meta Title field in *Page article*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: page_article.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Page article*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: page_article.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Page article*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: page_article.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Page article document from Prismic
 *
 * - **API ID**: `page_article`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageArticleDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<PageArticleDocumentData>,
    "page_article",
    Lang
  >;

type PageThematiqueDocumentDataSlicesSlice = never;

/**
 * Content for Page thématique documents
 */
interface PageThematiqueDocumentData {
  /**
   * Titre field in *Page thématique*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: page_thematique.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Sous-titre field in *Page thématique*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: page_thematique.subtitle
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  subtitle: prismic.KeyTextField;

  /**
   * Vignette (page d'accueil) field in *Page thématique*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: page_thematique.image_vignette
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image_vignette: prismic.ImageField<"vignette" | "mobile">;

  /**
   * Bannière field in *Page thématique*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: page_thematique.image_banner
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image_banner: prismic.ImageField<"banner" | "mobile">;

  /**
   * En-tête field in *Page thématique*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: page_thematique.resume
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  resume: prismic.RichTextField;

  /**
   * Contenu field in *Page thématique*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: page_thematique.content
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  content: prismic.RichTextField;

  /**
   * Auteur field in *Page thématique*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: page_thematique.author
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  author: prismic.KeyTextField;

  /**
   * Slice Zone field in *Page thématique*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: page_thematique.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<PageThematiqueDocumentDataSlicesSlice> /**
   * Meta Title field in *Page thématique*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: page_thematique.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Page thématique*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: page_thematique.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;
}

/**
 * Page thématique document from Prismic
 *
 * - **API ID**: `page_thematique`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageThematiqueDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<PageThematiqueDocumentData>,
    "page_thematique",
    Lang
  >;

export type AllDocumentTypes =
  | BlockContactDocument
  | BlockCtaDocument
  | BlockHeroDocument
  | BlockTestimonialDocument
  | EventDocument
  | EventsDocument
  | HeaderDocument
  | HomepageDocument
  | PageArticleDocument
  | PageThematiqueDocument;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      BlockContactDocument,
      BlockContactDocumentData,
      BlockCtaDocument,
      BlockCtaDocumentData,
      BlockCtaDocumentDataSlicesSlice,
      BlockHeroDocument,
      BlockHeroDocumentData,
      BlockHeroDocumentDataSlicesSlice,
      BlockTestimonialDocument,
      BlockTestimonialDocumentData,
      BlockTestimonialDocumentDataSlicesSlice,
      EventDocument,
      EventDocumentData,
      EventDocumentDataSlicesSlice,
      EventsDocument,
      EventsDocumentData,
      EventsDocumentDataSlicesSlice,
      HeaderDocument,
      HeaderDocumentData,
      HeaderDocumentDataHeaderNavigationItem,
      HeaderDocumentDataShareSocialMediaItem,
      HomepageDocument,
      HomepageDocumentData,
      HomepageDocumentDataBlockThematiquesItem,
      HomepageDocumentDataSlicesSlice,
      PageArticleDocument,
      PageArticleDocumentData,
      PageArticleDocumentDataImagesGalleryItem,
      PageArticleDocumentDataSlicesSlice,
      PageThematiqueDocument,
      PageThematiqueDocumentData,
      PageThematiqueDocumentDataSlicesSlice,
      AllDocumentTypes,
    };
  }
}
