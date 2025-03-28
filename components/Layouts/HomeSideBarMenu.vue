<script setup lang="ts">
// https://www.creative-tim.com/twcomponents/component/floating-side-bar
import { reactive, type Ref } from "vue";
const { t } = useI18n();
const { isMobile } = useDevice();

const iconSize: Ref<number> = ref(20);
const iconSizeMobile: Ref<number> = ref(16);
const isVisible: Ref<boolean> = ref(false);

const displayBtn = computed<string>(() =>
  isVisible.value ? "visible" : "hidden",
);
const backToTopLabel = computed<string>(() => t("layout.backToTop"));
const displayIconSize: ComputedRef<number> = computed<number>(() =>
  isMobile ? iconSizeMobile.value : iconSize.value,
);

interface IItem {
  path: string;
  label: string;
  icon: string;
}
const items: IItem[] = reactive([
  {
    path: "#status",
    label: t("layout.sideMenu.status"),
    icon: "material-symbols-light:text-ad-outline",
  },
  {
    path: "#thematiques",
    label: t("layout.sideMenu.thematiques"),
    icon: "material-symbols-light:stacked-inbox-outline",
  },
  {
    path: "#mise-en-avant",
    label: t("layout.sideMenu.mise-en-avant"),
    icon: "material-symbols-light:label-important-outline",
  },
  {
    path: "#evenements",
    label: t("layout.sideMenu.evenements"),
    icon: "material-symbols-light:calendar-clock-outline",
  },
  {
    path: "#contact",
    label: t("layout.sideMenu.contact"),
    icon: "material-symbols-light:attach-email-outline",
  },
]);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleScroll = () => {
  isVisible.value = window.scrollY > 200;
};

const navClasses: ComputedRef<string> = computed<string>(() =>
  isMobile
    ? "flex-inline bottom-0 md:w-auto w-full"
    : "-translate-y-2/4 flex-col top-2/4 left-3 rounded-lg border",
);
</script>

<template>
  <nav
    :class="`
      z-50 shrink-0 grow-0 justify-around gap-1 border-t border-indigo-700
      bg-slate-800/50 p-2 shadow-lg backdrop-blur-lg
      dark:border-slate-600/60 dark:bg-slate-800/50
      fixed min-h-[auto] min-w-[64px] flex ${navClasses}`"
  >
    <div v-for="(item, index) in items" :key="index">
      <a
        class="flex aspect-square min-h-[32px] w-12 flex-col items-center justify-center gap-1 rounded-md p-1 text-grey-700 dark:text-slate-400 hover:bg-indigo-700 hover:text-white"
        :href="item.path"
        :title="item.label"
        :aria-label="item.label"
      >
        <Icon :name="item.icon" :size="displayIconSize" />
      </a>
      <hr
        class="border-gray-700/60 dark:border-gray-700/60"
        :class="isMobile ? `divide-x` : ``"
      />
    </div>

    <button
      :class="`flex aspect-square min-h-[32px] w-12 flex-col items-center justify-center gap-1 rounded-md p-1 text-grey-700 dark:text-slate-400 hover:bg-indigo-700 hover:text-white ${displayBtn}`"
      type="button"
      :aria-label="backToTopLabel"
      @click="scrollToTop"
    >
      <Icon
        name="material-symbols-light:arrow-upward"
        :size="displayIconSize"
      />
    </button>
  </nav>

  <!--      <a-->
  <!--        href="#status"-->
  <!--        class="-->
  <!--        flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5-->
  <!--        text-indigo-700 hover:bg-indigo-700 hover:text-white-->
  <!--        "-->
  <!--      >-->
  <!--        &lt;!&ndash; HeroIcon - User &ndash;&gt;-->
  <!--        <Icon name="material-symbols:earthquake" size="24" />-->
  <!--        <small class="text-center text-xs font-medium"> {{ t('layout.sideMenu.status') }} </small>-->
  <!--      </a>-->
  <!--      <hr class="dark:border-gray-700/60" />-->

  <!--      <hr class="dark:border-gray-700/60" />-->
  <!--      <a-->
  <!--          href="#contact"-->
  <!--          class="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5-->
  <!--          text-indigo-700 hover:bg-gray-100 "-->
  <!--      >-->
  <!--        &lt;!&ndash; HeroIcon - Cog-6-tooth &ndash;&gt;-->
  <!--        <Icon name="material-symbols:attach-email-outline" size="24" />-->

  <!--        <small class="text-center text-xs font-medium"> {{ t('layout.sideMenu.contact') }} </small>-->
  <!--      </a>-->
</template>

<style scoped></style>
