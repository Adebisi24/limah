import { sanityClient } from 'sanity:client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { defineQuery } from 'groq';
import demo from '../data/demo.json';
export type Article = {
  id: string;
  slug: string;
  title: string;
  kind: string;
  room: string;
  category: string;
  excerpt: string;
  image: string;
  alt: string;
  credit?: string;
  caption?: string;
  images?: string[];
  demo?: boolean;
  body?: any[];
  ideas?: any[];
  products?: any[];
  author?: string;
  publishedAt?: string;
  methodology?: string;
  guideSections?: any[];
  seoTitle?: string;
  seoDescription?: string;
  related?: string[];
  planLinks?: { title: string; slug: string }[];
};
export const labels: Record<string, string> = {
  inspiration: 'Inspiration',
  finds: 'Shopping Finds',
  best: 'Best Products',
  guide: 'Buying Guide',
  look: 'Shop the Look',
};
const query = defineQuery(
  `*[_type == "article" && defined(slug.current)] | order(publishedAt desc){"id":_id,"slug":slug.current,title,kind,seoTitle,seoDescription,guideSections[]{_key,title,text,checklist,image},"room":room->title,excerpt,hero,body,ideas[]{_key,title,text,image},products[]{_key,label,explanation,whyItWorks,lookFor,pros,cons,details,product->{title,image,retailers,matchType}},"author":author->name,publishedAt,methodology,"related":related[]->slug.current,"planLinks":planLinks[]->{title,"slug":slug.current}}`,
);
let cached: Promise<Article[]>;
export function getArticles(): Promise<Article[]> {
  return (cached ??= (async () => {
    if (import.meta.env.CONTENT_MODE !== 'sanity') return demo as Article[];
    const rows = await sanityClient.fetch<any[]>(
      query,
      {},
      { perspective: 'published' },
    );
    return rows.map((a) => ({
      ...a,
      room: (a.room || 'interior design').toLowerCase(),
      category: labels[a.kind] || 'Inspiration',
      image: img(a.hero),
      alt: a.hero?.alt || a.title,
      credit: a.hero?.credit,
      caption: a.hero?.caption,
      guideSections: a.guideSections?.map((x: any) => ({
        ...x,
        image: x.image?.asset ? img(x.image) : undefined,
      })),
      ideas: a.ideas?.map((x: any) => ({
        ...x,
        image: img(x.image),
        alt: x.image?.alt,
        credit: x.image?.credit,
      })),
      products: a.products
        ?.filter((x: any) => x.product)
        .map((x: any) => ({ ...x, ...x.product, image: img(x.product.image) })),
    }));
  })());
}
function img(source: any) {
  return source?.asset
    ? createImageUrlBuilder(sanityClient)
        .image(source)
        .width(1400)
        .auto('format')
        .url()
    : '/placeholder.svg';
}
export function related(
  all: Article[],
  current: Article,
  kind: 'shopping' | 'inspiration' | 'look' | 'finds',
  count: number,
) {
  const pool = all.filter(
    (a) =>
      a.id !== current.id &&
      (kind === 'shopping'
        ? ['finds', 'best', 'guide'].includes(a.kind)
        : a.kind === kind),
  );
  const preferred = current.related || [];
  return pool
    .sort(
      (a, b) =>
        Number(preferred.includes(b.slug)) -
          Number(preferred.includes(a.slug)) ||
        Number(b.room === current.room) - Number(a.room === current.room),
    )
    .slice(0, count);
}
export const href = (a: Article) => '/articles/' + a.slug + '/';

let settingsCache: Promise<any>;
export function getSettings(): Promise<any> {
  return (settingsCache ??= loadSettings());
}
async function loadSettings() {
  const defaults = {
    brandName: 'Nest Nabber',
    description:
      'Thoughtful interiors, useful ideas, and beautiful finds. Make yourself at home with Nest Nabber.',
    contactEmail: 'abdullahiabdulrafiu001@gmail.com',
    featuredArticle: undefined as string | undefined,
    latestArticles: [] as string[],
  };
  if (import.meta.env.CONTENT_MODE !== 'sanity') return defaults;
  const settings = await sanityClient.fetch(
    defineQuery(
      `*[_type == "siteSettings"][0]{brandName,description,contactEmail,"featuredArticle":featuredArticle->slug.current,"latestArticles":latestArticles[]->slug.current}`,
    ),
    {},
    { perspective: 'published' },
  );
  return {
    ...defaults,
    ...Object.fromEntries(
      Object.entries(settings || {}).filter(([, v]) => v != null),
    ),
  };
}
