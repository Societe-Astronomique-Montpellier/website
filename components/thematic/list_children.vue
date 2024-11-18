<script setup lang="ts">
import type {
  EventDocument,
  PageArticleDocument,
  PageThematiqueDocument,
} from "~/prismicio-types";

const { t } = useI18n();

const articles = ref<PageArticleDocument[]>([]);
const events = ref<EventDocument[]>([]);

export interface IProps {
  thematic: PageThematiqueDocument;
}
const props = defineProps<IProps>();
const { thematic } = toRefs(props);

const { fetchChildrenPages } = useArticlesByThematic();
const { dataArticles, dataEvents } = await fetchChildrenPages(
  thematic.value.id,
);
articles.value = dataArticles || [];
events.value = dataEvents || [];

const BlockListCards = defineAsyncComponent(
  () => import("~/components/home/BlockListCards.vue"),
);

const labelListArticles: string = t("activity.type.permanent");
const labelListEvents: string = t("activity.type.period");
const labelKnowMore: string = t("layout.knowMore");
</script>

<template>
  <BlockListCards
    v-show="articles?.length"
    :title-block="
      'activites' === thematic.uid ? labelListArticles : labelKnowMore
    "
    :items="articles"
  />

  <BlockListCards
    v-show="events?.length && 'activites' === thematic.uid"
    :title-block="labelListEvents"
    :items="events"
  />
</template>

<style scoped></style>
