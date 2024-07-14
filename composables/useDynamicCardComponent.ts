import { defineAsyncComponent } from 'vue';
import type {EventDocument, PageArticleDocument, PageThematiqueDocument} from "@/prismicio-types";

const components = {
  ThematicCard: defineAsyncComponent(() => import('@/components/content/ThematicCard.vue')),
  ArticleCard: defineAsyncComponent(() => import('@/components/content/ArticleCard.vue')),
  EventCard: defineAsyncComponent(() => import('@/components/content/EventCard.vue')),
}

export function useDynamicCardComponent() {
  function getComponent(item: PageThematiqueDocument | PageArticleDocument | EventDocument) {
	let component;  
    switch(item.type) {
		case 'page_thematique': component = components.ThematicCard; break;
		case 'page_article': component = components.ArticleCard; break;
		case 'event': component = components.EventCard; break;
	}
    /**if (item implements PageThematiqueDocument) {
      return components.ThematicCard;
    }
    
    if (item implements PageArticleDocument) {
      return components.ArticleCard;
    }
    
    if (item implements EventDocument) {
      return components.EventCard;
    }*/
      
    return component;
  }

  return { getComponent };
}
