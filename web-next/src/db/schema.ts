import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

/**
 * Editorial content is the source of truth for articles.
 * Products + offers model the commerce layer:
 *  - Product  → what the item is (name, brand, image, description, specs)
 *  - Offer    → where it can be bought (retailer, price, affiliate URL, availability)
 *  - Recommendation → article body block that references a product and picks offer(s)
 */
export const articles = pgTable('articles', {
  id: serial().primaryKey(),
  slug: text().notNull().unique(),
  format: text().notNull(), // inspiration | howto | finds | best-products | buying-guide | shop-the-look
  title: text().notNull(),
  subtitle: text(),
  category: text().notNull(),
  room: text(), // bedroom | living-room | kitchen | bathroom | whole-home
  keywords: text(),
  imageUrl: text().notNull(),
  imageAlt: text(),
  description: text(),
  author: text().notNull(),
  publishedAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp(),
  body: jsonb().$type<unknown[]>().notNull().default([]),
  tags: text().array().notNull().default([]),
  featured: boolean().notNull().default(false),
  popular: boolean().notNull().default(false),
});

export const products = pgTable('products', {
  id: serial().primaryKey(),
  name: text().notNull(),
  brand: text(),
  imageUrl: text().notNull(),
  imageAlt: text(),
  description: text(),
  specs: jsonb().$type<Record<string, string>>(),
});

export const offers = pgTable('offers', {
  id: serial().primaryKey(),
  productId: integer()
    .notNull()
    .references(() => products.id),
  retailer: text().notNull(),
  price: numeric('price', { precision: 10, scale: 2, mode: 'number' }),
  currency: text().notNull().default('USD'),
  affiliateUrl: text().notNull(),
  availability: text().notNull().default('in-stock'), // in-stock | unavailable
  lastChecked: timestamp().notNull().defaultNow(),
});

export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: serial().primaryKey(),
  email: text().notNull().unique(),
  createdAt: timestamp().notNull().defaultNow(),
});

export type ArticleRow = typeof articles.$inferSelect;
export type ProductRow = typeof products.$inferSelect;
export type OfferRow = typeof offers.$inferSelect;
