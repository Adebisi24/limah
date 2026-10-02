import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { listArticles } from '@/lib/articles';
import { StandardCard, SectionHeader } from '@/components/cards';
import { NewsletterBand, Breadcrumbs } from '@/components/chrome';

const TYPES: Record<
  string,
  {
    collection: string;
    title: string;
    intro: string;
    eyebrow: string;
  }
> = {
  finds: {
    collection: 'shopping-finds',
    title: 'Shopping Finds',
    eyebrow: 'Fast Discovery',
    intro:
      'The fast lane: short editorial notes, current prices at real retailers, and no 2,000-word comparison in sight. If a find earns a spot, it earns it by living in a real room.',
  },
  'best-products': {
    collection: 'best-products',
    title: 'Best Products',
    eyebrow: 'Comparison & Decision Support',
    intro:
      'The short answer to long search histories. Each guide compares a small list of the best options in a category — with trade-offs named, specs verified, and prices at every retailer we could find.',
  },
  'buying-guides': {
    collection: 'buying-guides',
    title: 'Buying Guides',
    eyebrow: 'The Framework First',
    intro:
      'The least sales-heavy corner of the site. Guides explain the measurements, categories, and mistakes before they mention a single product — so you buy deliberately, not impulsively.',
  },
  'shop-the-look': {
    collection: 'shop-the-look',
    title: 'Shop the Look',
    eyebrow: 'Rooms, Piece by Piece',
    intro:
      'A styled room is a shopping list with better photos. Every look is listed piece by piece, with exact products where we can source them and honest “similar look” marks where we can’t.',
  },
};

export function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const type = params.then((p) => p.type);
  return Promise.resolve(type).then((t) => {
    const cfg = TYPES[t];
    return cfg
      ? {
          title: cfg.title,
          description: cfg.intro,
        }
      : { title: 'Shopping' };
  });
}

export default async function ShoppingTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const cfg = TYPES[type];
  if (!cfg) notFound();

  const articles = await listArticles({
    collection: cfg.collection,
    limit: 500,
  });

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-nn max-w-[820px] py-12 text-center sm:py-16">
          <Breadcrumbs
            items={[
              { label: 'Shopping', href: '/shopping' },
              { label: cfg.title },
            ]}
          />
          <p className="eyebrow">{cfg.eyebrow}</p>
          <h1 className="mt-3 font-serif text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-[48px]">
            {cfg.title}
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[15.5px] leading-relaxed text-stone">
            {cfg.intro}
          </p>
        </div>
      </section>

      <section className="container-nn py-14">
        <SectionHeader
          eyebrow={`${articles.length} Stories`}
          title={`${cfg.title}, at a Glance`}
        />
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <StandardCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <NewsletterBand />
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(TYPES).map((type) => ({ type }));
}
