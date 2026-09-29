import type { Article } from './types';
import { FORMAT_LABELS, SHOPPING_FORMATS } from './types';
export function filterArticles(
  articles: Article[],
  { q, group }: { q: string; group: string },
) {
  const words = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return articles
    .filter((a) => {
      const haystack = [
        a.title,
        a.subtitle,
        a.keywords,
        a.category,
        a.room.replaceAll('-', ' '),
        FORMAT_LABELS[a.format],
        ...a.tags,
      ]
        .join(' ')
        .toLowerCase();
      const org = /organiz|storage|declutter/.test(
        [a.category, a.keywords, ...a.tags].join(' ').toLowerCase(),
      );
      return (
        words.every((w) => haystack.includes(w)) &&
        (group === 'all' ||
          (group === 'design' && ['inspiration', 'howto'].includes(a.format)) ||
          (group === 'organization' && org) ||
          (group === 'shopping' && SHOPPING_FORMATS.includes(a.format)))
      );
    })
    .slice(0, 30);
}
