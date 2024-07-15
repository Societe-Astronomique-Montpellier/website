import type { HTMLMapSerializer } from '@prismicio/helpers';

export const useRichTextSerializer = (): HTMLMapSerializer => {
    return {
        paragraph: ({ children }) => `<p class="text-base leading-8 my-5">${children}</p>`,
        // preformatted: ({ children }) => `<blockquote class="border-l-4 text-base italic leading-8 my-5 p-5 text-indigo-600">${children</blockquote>`
    }
}