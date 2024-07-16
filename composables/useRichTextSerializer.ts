import type { HTMLMapSerializer } from '@prismicio/helpers';

export const useRichTextSerializer = (): HTMLMapSerializer => {
    return {
        paragraph: ({ children }) => `<p class="text-justify leading-8 mt-2 my-5">${children}</p>`,
        heading1: ({ children }) => `<h1>${children}</h1>`,
        heading2: ({ children }) => `<h2>${children}</h2>`,
        heading3: ({ children }) => `<h3>${children}</h3>`,
        heading4: ({ children }) => `<h4>${children}</h4>`,
        heading5: ({ children }) => `<h5>${children}</h5>`,
        heading6: ({ children }) => `<h5>${children}</h5>`,
        strong: ({ children }) => `<strong>${children}</strong>`,
        em: ({ children }) => `<em>${children}</em>`,
        image: ({ node }) => {
            if (!node.url) {
                return '<p>Error: Missing image URL</p>';
            }
            return `<img src="${node.url}" alt="${node.alt || 'Image description'}" class="transition duration-300 ease-in-out hover:shadow-lg hover:scale-110" />`;
        },
        // list
        // listItem
        // embed
        // preformatted: ({ children }) => `<blockquote class="border-l-4 text-base italic leading-8 my-5 p-5 text-indigo-600">${children</blockquote>`
    }
}