import legacy from '@/data/legacy-articles.json';
import aliases from '@/data/legacy-slugs.json';
import type { Article, ArticleFormat, Room } from './types';
const formats: Record<string, ArticleFormat> = {
  inspiration: 'inspiration',
  finds: 'finds',
  best: 'best-products',
  guide: 'buying-guide',
  look: 'shop-the-look',
};
export const legacyAliases: Record<string, string> = aliases;
export function legacyArticles(): Article[] {
  if (process.env.CONTENT_MODE === 'sanity') return [];
  return legacy
    .filter((a) => legacyAliases[a.slug] === a.slug)
    .map((a) => ({
      slug: a.slug,
      format: formats[a.kind],
      title: a.title,
      subtitle: a.excerpt,
      category: a.category,
      room: (a.room.replaceAll(' ', '-') === 'interior-design'
        ? 'whole-home'
        : a.room.replaceAll(' ', '-')) as Room,
      keywords: null,
      imageUrl: a.image,
      imageAlt: a.alt,
      description: a.excerpt,
      author: 'Nest Nabber Editors',
      publishedAt: new Date('2026-01-01'),
      updatedAt: null,
      body: [
        {
          type: 'prose',
          text: 'Archived demo story from the earlier project. Full editorial copy has not been imported.',
        },
        { type: 'prose', text: a.excerpt },
      ],
      tags: [],
      popular: false,
    }));
}
