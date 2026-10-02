import type { Article, ArticleFormat, BodyBlock, Product } from './types';
import { loadSanityContent } from './sanity-content';
let cached: Promise<{ articles: Article[]; products: Product[] }>;
function content() {
  return (cached ??= loadSanityContent());
}
export function productIdsFromBody(body: BodyBlock[]) {
  const ids = new Set<number>();
  for (const b of body) {
    if (b.type === 'product') ids.add(b.productId);
    if (b.type === 'quickPicks') b.picks.forEach((p) => ids.add(p.productId));
    if (b.type === 'quickShop' || b.type === 'quickBrowse')
      b.items.forEach((p) => ids.add(p.productId));
    if (b.type === 'comparison') b.rows.forEach((p) => ids.add(p.productId));
  }
  return [...ids];
}
export async function getProductsByIds(ids: number[]) {
  return new Map(
    (await content()).products
      .filter((p) => ids.includes(p.id))
      .map((p) => [p.id, p]),
  );
}
export async function getArticleBySlug(slug: string) {
  const article = (await getReadableArticles()).find((a) => a.slug === slug);
  return article
    ? {
        article,
        productMap: await getProductsByIds(productIdsFromBody(article.body)),
      }
    : null;
}
export interface ArticleFilter {
  format?: ArticleFormat;
  formats?: ArticleFormat[];
  room?: string;
  tag?: string;
  collection?: string;
  excludeSlug?: string;
  limit?: number;
}
export async function listArticles(f: ArticleFilter = {}) {
  return (await getAllArticlesLite())
    .filter(
      (a) =>
        (!f.format || a.format === f.format) &&
        (!f.formats || f.formats.includes(a.format)) &&
        (!f.room || a.room === f.room) &&
        (!f.tag || a.tags.includes(f.tag)) &&
        (!f.collection || a.collections.includes(f.collection)) &&
        a.slug !== f.excludeSlug,
    )
    .slice(0, f.limit ?? 30);
}
export async function listByTag(tag: string, limit = 24) {
  return listArticles({ tag, limit });
}
export async function getAllArticlesLite() {
  return [...(await content()).articles].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );
}

export async function getReadableArticles() {
  return getAllArticlesLite();
}
