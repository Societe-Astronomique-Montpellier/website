<script setup lang="ts">
import type {PageArticleDocument} from "@/prismicio-types";

export interface Props {
    item: PageArticleDocument
}

const props = defineProps<Props>()
const { item } = toRefs(props)
</script>

<template>

</template>