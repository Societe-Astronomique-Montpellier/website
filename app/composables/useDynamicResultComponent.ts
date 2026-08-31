import { defineAsyncComponent } from "vue";

export function useDynamicResultComponent(): {
  getResultComponent: (
    dataType: string,
  ) => Promise<Component | null> | undefined;
} {
  interface IComponentMap {
    [dataType: string]: string;
  }

  const components: IComponentMap = {
    page_thematique: "ThematicResult",
    page_article: "ArticleResult",
    event: "EventResult",
    page_editoriale: "EditorialResult",
  };

  const importedComponentPromise = shallowRef<Promise<Component | null>>();

  function getResultComponent(
    dataType: string,
  ): Promise<Component | null> | undefined {
    if (!importedComponentPromise.value) {
      const componentName = components[dataType];
      if (!componentName) {
        throw new Error(`Component not found for data type: ${dataType}`);
      }
      importedComponentPromise.value = defineAsyncComponent(async () => {
        const component = await import(`@/components/content/${componentName}.vue`);
        return component.default || component;
      });
    }

    return importedComponentPromise.value;
  }

  return {
    getResultComponent,
  };
}
