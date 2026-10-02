import { fullArticles } from '@/db/seed/full-articles';
import { secondaryArticles } from '@/db/seed/secondary-articles';
import { productSeeds } from '@/db/seed/products';
import type { SeedBlock } from '@/db/seed/seed-types';
import type { Article, BodyBlock, Product } from './types';
export const demoProducts: Product[] = productSeeds.map((p, i) => ({
  id: i + 1,
  name: p.name,
  brand: p.brand,
  imageUrl: p.img,
  imageAlt: p.alt,
  description: p.desc,
  specs: p.specs ?? null,
  offers: p.offers.map((o) => ({
    retailer: o.retailer,
    price: o.price,
    currency: 'USD',
    affiliateUrl: o.url,
    availability: o.availability ?? 'in-stock',
  })),
}));
const ids = new Map(demoProducts.map((p) => [p.name, p.id]));
function id(name: string): number {
  const value = ids.get(name);
  if (!value) throw new Error('Unknown supplied product: ' + name);
  return value;
}
export function resolveBlock(b: SeedBlock): BodyBlock {
  switch (b.type) {
    case 'product':
      return { ...b, productId: id(b.productId) };
    case 'quickPicks':
      return {
        ...b,
        picks: b.picks.map((p) => ({ ...p, productId: id(p.productId) })),
      };
    case 'quickBrowse':
      return {
        ...b,
        items: b.items.map((p) => ({ ...p, productId: id(p.productId) })),
      };
    case 'quickShop':
      return {
        ...b,
        items: b.items.map((p) => ({ ...p, productId: id(p.productId) })),
      };
    case 'comparison':
      return {
        ...b,
        rows: b.rows.map((p) => ({ ...p, productId: id(p.productId) })),
      };
    default:
      return b;
  }
}
export const demoArticles: Article[] = [
  ...fullArticles,
  ...secondaryArticles,
].map((a) => ({
  slug: a.slug,
  format: a.format,
  title: a.title,
  subtitle: a.subtitle,
  category: a.category,
  collections: a.tags,
  room: a.room,
  keywords: a.keywords,
  imageUrl: a.image,
  imageAlt: a.imageAlt,
  description: a.description,
  author: a.author,
  publishedAt: new Date(a.publishedAt),
  updatedAt: a.updatedAt ? new Date(a.updatedAt) : null,
  body: a.body.map(resolveBlock),
  tags: a.tags,
  popular: a.popular ?? false,
}));
