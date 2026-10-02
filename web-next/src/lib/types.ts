export type ArticleFormat =
  | 'inspiration'
  | 'howto'
  | 'finds'
  | 'best-products'
  | 'buying-guide'
  | 'shop-the-look';

export type Room =
  'bedroom' | 'living-room' | 'kitchen' | 'bathroom' | 'whole-home';

export type Availability = 'in-stock' | 'unavailable';

export interface Offer {
  retailer: string;
  price: number | null;
  currency: string;
  affiliateUrl: string;
  availability: Availability;
}

export interface Product {
  id: number;
  name: string;
  brand: string | null;
  imageUrl: string;
  imageAlt: string | null;
  description: string | null;
  specs: Record<string, string> | null;
  offers: Offer[];
}

/* ---------- Article body blocks (CMS-structured, component-driven) ---------- */

export type BodyBlock =
  | { type: 'portableText'; value: any[] }
  | { type: 'prose'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | {
      type: 'idea';
      number: number;
      title: string;
      src: string;
      alt: string;
      text: string[];
    }
  | { type: 'tip'; title?: string; text: string }
  | {
      type: 'cta';
      eyebrow?: string;
      title: string;
      text: string;
      href: string;
      ctaLabel: string;
      src?: string;
      alt?: string;
    }
  | {
      type: 'contextLinks';
      title: string;
      links: { title: string; href: string }[];
    }
  | {
      type: 'product';
      productId: number;
      label?: string;
      text: string[];
      pros?: string[];
      cons?: string[];
      bestFor?: string;
      details?: string;
      status?: 'exact' | 'similar';
    }
  | {
      type: 'quickPicks';
      title?: string;
      intro?: string;
      picks: { productId: number; reason: string; retailer?: string }[];
    }
  | {
      type: 'quickShop';
      title?: string;
      items: { productId: number; note?: string }[];
    }
  | {
      type: 'quickBrowse';
      title?: string;
      items: { productId: number; name: string; note: string }[];
    }
  | {
      type: 'comparison';
      title: string;
      caption?: string;
      columns: string[];
      rows: { productId: number; cells: string[] }[];
    }
  | { type: 'checklist'; title: string; items: string[] }
  | { type: 'diagram'; variant: 'lighting' };

export interface Article {
  authorBio?: string;
  related?: string[];
  planLinks?: { title: string; href: string }[];
  seoTitle?: string;
  slug: string;
  format: ArticleFormat;
  title: string;
  subtitle: string | null;
  category: string;
  collections: string[];
  room: Room;
  keywords: string | null;
  imageUrl: string;
  imageAlt: string | null;
  description: string | null;
  author: string;
  publishedAt: Date;
  updatedAt: Date | null;
  body: BodyBlock[];
  tags: string[];
  popular: boolean;
}

export const FORMAT_LABELS: Record<ArticleFormat, string> = {
  inspiration: 'Design Ideas',
  howto: 'Advice',
  finds: 'Shopping Finds',
  'best-products': 'Best Products',
  'buying-guide': 'Buying Guide',
  'shop-the-look': 'Shop the Look',
};

export const SHOPPING_FORMATS: ArticleFormat[] = [
  'finds',
  'best-products',
  'buying-guide',
  'shop-the-look',
];
