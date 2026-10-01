import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { Article, ArticleFormat, BodyBlock, Product, Room } from './types';

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || '9tacupln',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-09-24',
  useCdn: false,
  perspective: 'published',
});
// Static export needs cacheable requests. A build-specific header changes the
// Next.js fetch-cache key so published edits and deletions appear on every build.
const fetchOptions = {
  cache: 'force-cache' as const,
  headers: {
    'X-Nest-Nabber-Build': process.env.SANITY_BUILD_ID || 'development',
  },
};
const image = (value: any) =>
  value?.asset
    ? createImageUrlBuilder(client)
        .image(value)
        .width(1400)
        .auto('format')
        .url()
    : typeof value === 'string'
      ? value
      : '/placeholder.svg';
const formats: Record<string, ArticleFormat> = {
  inspiration: 'inspiration',
  howto: 'howto',
  finds: 'finds',
  best: 'best-products',
  guide: 'buying-guide',
  look: 'shop-the-look',
};

/** Reads the existing Limah dataset only. No seeds, writes or provisioning. */
export async function loadSanityContent(): Promise<{
  articles: Article[];
  products: Product[];
}> {
  const data = await client.fetch(
    `{
    "articleCount": count(*[_type == "article" && defined(slug.current)]),
    "products": *[_type == "product"] | order(_id asc)
  }`,
    {},
    fetchOptions,
  );
  // Keep each response below Next.js's 2 MiB cache limit as the library grows.
  const articleDocuments: any[] = [];
  const pageSize = 20;
  for (let start = 0; start < data.articleCount; start += pageSize) {
    const page = await client.fetch(
      `*[_type == "article" && defined(slug.current)] | order(_id asc)[${start}...${start + pageSize}]{
        ..., "slug":slug.current, "roomSlug":room->slug.current, "roomName":room->title,
        "authorName":author->name, "authorBio":author->bio,
        "styleTags":styles[]->slug.current,
        "relatedSlugs":related[]->slug.current,
        "planLinks":planLinks[]->{title,"slug":slug.current}
      }`,
      {},
      fetchOptions,
    );
    articleDocuments.push(...page);
  }
  const ids = new Map<string, number>(
    data.products.map((p: any, i: number) => [p._id, i + 1]),
  );
  const products: Product[] = data.products.map((p: any, i: number) => ({
    id: i + 1,
    name: p.title,
    brand: p.brand ?? null,
    imageUrl: image(p.image),
    imageAlt: p.image?.alt ?? p.title,
    description: p.description ?? null,
    specs: p.specs
      ? Object.fromEntries(p.specs.map((s: any) => [s.label, s.value]))
      : null,
    offers: (p.retailers ?? []).map((r: any) => ({
      retailer: r.name,
      price: typeof r.price === 'number' ? r.price : null,
      currency: r.currency || 'USD',
      affiliateUrl: r.url,
      availability: r.unavailable ? 'unavailable' : 'in-stock',
    })),
  }));
  function designBlock(b: any): BodyBlock {
    const type = b._type.replace(/^nn/, '');
    const result: any = {
      ...b,
      type: type.charAt(0).toLowerCase() + type.slice(1),
    };
    if (b.image) {
      result.src = image(b.image);
      result.alt = b.image.alt ?? b.title ?? '';
    }
    if (b.product) result.productId = ids.get(b.product._ref);
    for (const field of ['items', 'picks', 'rows'])
      if (b[field])
        result[field] = b[field].map((v: any) =>
          typeof v === 'string'
            ? v
            : {
                ...v,
                productId: v.product ? ids.get(v.product._ref) : v.productId,
              },
        );
    return result;
  }
  const articles: Article[] = articleDocuments.map((a: any) => {
    const format = formats[a.kind] ?? 'inspiration';
    const body: BodyBlock[] = [];
    if (a.designBlocks?.length) body.push(...a.designBlocks.map(designBlock));
    else {
      if (a.body?.length) body.push({ type: 'portableText', value: a.body });
      for (const [i, idea] of (a.ideas ?? []).entries())
        body.push({
          type: 'idea',
          number: i + 1,
          title: idea.title,
          src: image(idea.image),
          alt: idea.image?.alt ?? idea.title,
          text: [idea.text || ''],
        });
      for (const section of a.guideSections ?? []) {
        if (section.title) body.push({ type: 'heading', text: section.title });
        if (section.text) body.push({ type: 'prose', text: section.text });
        if (section.image)
          body.push({
            type: 'image',
            src: image(section.image),
            alt: section.image.alt ?? section.title,
          });
        if (section.checklist?.length)
          body.push({
            type: 'checklist',
            title: section.title,
            items: section.checklist,
          });
      }
      for (const p of a.products ?? []) {
        const productId = ids.get(p.product?._ref);
        if (productId)
          body.push({
            type: 'product',
            productId,
            label: p.label,
            text: [p.explanation, p.whyItWorks, p.lookFor].filter(Boolean),
            ...(format === 'best-products'
              ? {
                  pros: p.pros,
                  cons: p.cons,
                  details: p.details,
                  bestFor: p.bestFor,
                }
              : {}),
            ...(format === 'shop-the-look'
              ? {
                  status:
                    data.products.find((x: any) => x._id === p.product._ref)
                      ?.matchType ?? 'similar',
                }
              : {}),
          });
      }
      if (a.methodology)
        body.push(
          { type: 'heading', text: 'How we selected these products' },
          { type: 'prose', text: a.methodology },
        );
    }
    return {
      slug: a.slug,
      format,
      title: a.title,
      subtitle: a.excerpt ?? null,
      category: a.category ?? a.roomName ?? 'Interior Design',
      room: (a.roomSlug ?? 'whole-home') as Room,
      keywords: a.keywords ?? null,
      imageUrl: image(a.hero),
      imageAlt: a.hero?.alt ?? a.title,
      description: a.seoDescription ?? a.excerpt ?? null,
      author: a.authorName ?? 'Nest Nabber Editors',
      authorBio: a.authorBio,
      publishedAt: new Date(a.publishedAt),
      updatedAt: a.updatedAt ? new Date(a.updatedAt) : null,
      body,
      tags: [...(a.tags ?? []), ...(a.styleTags ?? [])],
      popular: a.popular ?? false,
      related: a.relatedSlugs ?? [],
      planLinks: a.planLinks?.map((p: any) => ({
        title: p.title,
        href: '/story/' + p.slug,
      })),
      seoTitle: a.seoTitle,
    };
  });
  return { articles, products };
}

export async function getSiteSettings() {
  const defaults = {
    contactEmail: 'abdullahiabdulrafiu001@gmail.com',
    featuredArticle: undefined as string | undefined,
    latestArticles: [] as string[],
  };
  if (process.env.CONTENT_MODE !== 'sanity') return defaults;
  const settings = await client.fetch(
    `*[_type=="siteSettings"][0]{contactEmail,"featuredArticle":featuredArticle->slug.current,"latestArticles":latestArticles[]->slug.current}`,
    {},
    fetchOptions,
  );
  return {
    ...defaults,
    ...Object.fromEntries(
      Object.entries(settings ?? {}).filter(([, v]) => v != null),
    ),
  } as typeof defaults;
}
