import type { HTMLMapSerializer } from '@prismicio/helpers';
import { Icon } from '#components'

export const useRichTextSerializer = (): HTMLMapSerializer => {
    const IconArrow = h(Icon, { name: 'material-symbols-light:arrow-right-alt-rounded' })

    return {
        paragraph: ({ children }) => `<p class="text-justify text-base leading-8 mt-2 my-5">${children}</p>`,
        heading1: ({ children }) => `<h1>${children}</h1>`,
        heading2: ({ children }) => `<h2 class="text-gray-900 font-bold text-4xl mb-2">${children}</h2>`,
        heading3: ({ children }) => `<h3 class="text-gray-900 font-semibold text-2xl mb-2">${children}</h3>`,
        heading4: ({ children }) => `<h4 class="text-gray-900 font-medium text-2xl mb-2">${children}</h4>`,
        heading5: ({ children }) => `<h5>${children}</h5>`,
        heading6: ({ children }) => `<h6>${children}</h6>`,
        strong: ({ children }) => `<strong>${children}</strong>`,
        em: ({ children }) => `<em>${children}</em>`,
        image: ({ node }) => {
            if (!node.url) {
                return '<p>Error: Missing image URL</p>';
            }
            return `<img src="${node.url}" alt="${node.alt || 'Image description'}" class="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105" />`;
        },
        // list
        list:  ({ children }) => `<ul class="mb-6 font-light text-gray-500 lg:mb-8 ">${children}</ul>`,
        listItem: ({ children }) => `<li class="mb-6 font-light text-neutral-500"><span class="iconify i-material-symbols:arrow-right-alt text-indigo-400" aria-hidden="true" style=""></span> ${children}</li>`,

        // embed
        preformatted: ({ children }) => `<blockquote class="border-l-4 text-base italic leading-8 my-5 p-5 text-indigo-600">${children}</blockquote>`
    }
}