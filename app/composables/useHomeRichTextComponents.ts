import type { HTMLMapSerializer } from "@prismicio/helpers";

export const useHomeRichTextSerializer = (): HTMLMapSerializer => {
    return {
        heading2: ({ children }) =>
            `<h2 class="text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">${children}</h2>`,

        heading3: ({ children }) =>
            `<h3 class="text-xs font-bold uppercase tracking-wider text-indigo-400">${children}</h3>`,

        paragraph: ({ children }) =>
            `<p class="text-slate-200 text-base sm:text-lg leading-relaxed">${children}</p>`,

        list: ({ children }) =>
            `<ul class="space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed font-light">${children}</ul>`,

        listItem: ({ children }) =>
            `<li class="flex items-start gap-3"><span class="text-indigo-600 font-medium shrink-0">→</span><span>${children}</span></li>`,

        hyperlink: ({ node, children }) => {
            const isExternal = /^https?:\/\//.test(node.data.url ?? "");
            const attrs = isExternal ? `target="_blank" rel="noopener noreferrer"` : "";
            return `<a href="${node.data.url}" class="text-indigo-700 underline underline-offset-2 hover:text-indigo-900 transition-colors duration-300" ${attrs}>${children}</a>`;
        },
    }
};