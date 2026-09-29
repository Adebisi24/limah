/**
 * Seed runner:  npx tsx src/db/seed/index.ts
 * Wipes and reloads articles, products, and offers with the launch content.
 */
import 'dotenv/config';
import { db } from '@/db';
import { articles, offers, products } from '@/db/schema';
import { productSeeds } from './products';
import { fullArticles } from './full-articles';
import { secondaryArticles } from './secondary-articles';
import type { ArticleSeed } from './seed-types';

async function main() {
  console.log('Seeding Nest Nabber content…');

  await db.delete(offers);
  await db.delete(articles);
  await db.delete(products);

  await db.insert(products).values(
    productSeeds.map((p) => ({
      name: p.name,
      brand: p.brand,
      imageUrl: p.img,
      imageAlt: p.alt,
      description: p.desc,
      specs: p.specs ?? null,
    })),
  );
  const productRows = await db.select().from(products).orderBy(products.id);
  const idByName = new Map(productRows.map((p) => [p.name, p.id]));

  const allArticles: ArticleSeed[] = [...fullArticles, ...secondaryArticles];

  await db.insert(offers).values(
    productSeeds.flatMap((p) =>
      p.offers.map((o) => ({
        productId: idByName.get(p.name) ?? 0,
        retailer: o.retailer,
        price: o.price,
        affiliateUrl: o.url,
        availability: o.availability ?? 'in-stock',
      })),
    ),
  );

  const resolvedArticles = allArticles.map((a) => ({
    ...a,
    body: a.body.map((block: any) => {
      if (
        block.type === 'product' ||
        block.type === 'quickPicks' ||
        block.type === 'quickShop' ||
        block.type === 'quickBrowse' ||
        block.type === 'comparison'
      ) {
        return resolveProductIds(block, idByName);
      }
      return block;
    }),
  }));

  await db.insert(articles).values(
    resolvedArticles.map((a) => ({
      slug: a.slug,
      format: a.format,
      title: a.title,
      subtitle: a.subtitle,
      category: a.category,
      room: a.room,
      keywords: a.keywords,
      imageUrl: a.image,
      imageAlt: a.imageAlt,
      description: a.description,
      author: a.author,
      publishedAt: new Date(a.publishedAt),
      updatedAt: a.updatedAt ? new Date(a.updatedAt) : null,
      body: a.body,
      tags: a.tags,
      featured: a.featured ?? false,
      popular: a.popular ?? false,
    })),
  );

  console.log(`  articles: ${allArticles.length}`);
  console.log('Seed complete.');
  process.exit(0);
}

function resolveProductIds(block: any, idByName: Map<number | string, number>) {
  const toId = (name: string): number => {
    const id = idByName.get(name);
    if (!id) throw new Error(`Unknown product in body: ${name}`);
    return id;
  };
  if (block.type === 'product')
    return { ...block, productId: toId(block.productId) };
  if (block.type === 'quickPicks')
    return {
      ...block,
      picks: block.picks.map((p: any) => ({
        ...p,
        productId: toId(p.productId),
      })),
    };
  if (block.type === 'quickShop' || block.type === 'quickBrowse')
    return {
      ...block,
      items: block.items.map((i: any) => ({
        ...i,
        productId: toId(i.productId),
      })),
    };
  if (block.type === 'comparison')
    return {
      ...block,
      rows: block.rows.map((r: any) => ({
        ...r,
        productId: toId(r.productId),
      })),
    };
  return block;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
