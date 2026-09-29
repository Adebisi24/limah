import type { ArticleFormat, BodyBlock, Room } from '@/lib/types';

type ProductBlock = Extract<BodyBlock, { type: 'product' }>;
type QuickPicksBlock = Extract<BodyBlock, { type: 'quickPicks' }>;
type QuickShopBlock = Extract<BodyBlock, { type: 'quickShop' }>;
type QuickBrowseBlock = Extract<BodyBlock, { type: 'quickBrowse' }>;
type ComparisonBlock = Extract<BodyBlock, { type: 'comparison' }>;

/**
 * In seeds, products are referenced by name (string).
 * The seed runner resolves them to database ids before insert.
 */
export type SeedBlock =
  | Exclude<
      BodyBlock,
      | ProductBlock
      | QuickPicksBlock
      | QuickShopBlock
      | QuickBrowseBlock
      | ComparisonBlock
    >
  | (Omit<ProductBlock, 'productId'> & { productId: string })
  | (Omit<QuickPicksBlock, 'picks'> & {
      picks: { productId: string; reason: string; retailer?: string }[];
    })
  | (Omit<QuickShopBlock, 'items'> & {
      items: { productId: string; note?: string }[];
    })
  | (Omit<QuickBrowseBlock, 'items'> & {
      items: { productId: string; name: string; note: string }[];
    })
  | (Omit<ComparisonBlock, 'rows'> & {
      rows: { productId: string; cells: string[] }[];
    });

export interface ArticleSeed {
  slug: string;
  format: ArticleFormat;
  title: string;
  subtitle: string;
  category: string;
  room: Room;
  keywords: string;
  image: string;
  imageAlt: string;
  description: string;
  author: string;
  publishedAt: string; // ISO date
  updatedAt?: string | null;
  tags: string[];
  featured?: boolean;
  popular?: boolean;
  body: SeedBlock[];
}
