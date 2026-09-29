import Link from 'next/link';
import { getAllArticlesLite } from '@/lib/articles';
import {
  StandardCard,
  SectionHeader,
  TextLinkCard,
  Arrow,
} from '@/components/cards';
import { NewsletterBand } from '@/components/chrome';
import { px, photo as p } from '@/db/seed/media';

export const metadata = {
  title: 'Shopping',
  description:
    'Four ways to shop with Nest Nabber: fast finds, honest best-product comparisons, buying guides, and rooms you can shop piece by piece.',
};

const SHOPPING_TYPES = [
  {
    label: 'Shopping Finds',
    href: '/shopping/finds',
    desc: 'Fast, visual product discovery. Short editorial notes, current prices, no long comparisons — the finds worth your cart.',
  },
  {
    label: 'Best Products',
    href: '/shopping/best-products',
    desc: 'Comparisons and decision support. A short list of the best options in a category, with trade-offs named and specs verified.',
  },
  {
    label: 'Buying Guides',
    href: '/shopping/buying-guides',
    desc: 'The framework before you buy. Measurements, categories, and checklists so the big purchases are deliberate, not impulsive.',
  },
  {
    label: 'Shop the Look',
    href: '/shopping/shop-the-look',
    desc: 'Rooms you can recreate. Every piece in a styled room, listed with exact-product or similar-look honesty.',
  },
];

const SHOP_ROOMS = [
  {
    name: 'Bedroom',
    href: '/rooms/bedroom',
    image: px(p.luxuryA, 800, 533),
    alt: 'Warm modern bedroom',
  },
  {
    name: 'Living Room',
    href: '/rooms/living-room',
    image: px(p.livingD, 800, 533),
    alt: 'Curved sofa in a light living room',
  },
  {
    name: 'Kitchen',
    href: '/rooms/kitchen',
    image: px(p.kitchenB, 800, 533),
    alt: 'Warm wood kitchen',
  },
  {
    name: 'Bathroom',
    href: '/rooms/bathroom',
    image: px(p.bathC, 800, 533),
    alt: 'Modern bathroom with towel rail',
  },
];

export default async function ShoppingLanding() {
  const all = await getAllArticlesLite();
  const featured = all.find(
    (a) => a.slug === '15-amazon-bedroom-finds-worth-discovering',
  );
  const finds = all.filter((a) => a.format === 'finds').slice(0, 4);
  const stl = all.find((a) => a.slug === 'shop-this-modern-luxury-bedroom');
  const bestProducts = all
    .filter((a) => a.format === 'best-products')
    .slice(0, 3);
  const guides = all.filter((a) => a.format === 'buying-guide').slice(0, 3);
  const latest = all
    .filter((a) =>
      ['finds', 'best-products', 'buying-guide', 'shop-the-look'].includes(
        a.format,
      ),
    )
    .slice(0, 6);

  return (
    <>
      {/* 2 — Title + intro */}
      <section className="border-b border-line bg-paper">
        <div className="container-nn max-w-[820px] py-14 text-center sm:py-16">
          <p className="eyebrow">Shopping at Nest Nabber</p>
          <h1 className="mt-3 font-serif text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-[48px]">
            Shop the Home, Thoughtfully
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-relaxed text-stone">
            Shopping at Nest Nabber starts with the editorial, not the product
            grid. Four ways to shop — each built to end with a purchase you
            actually meant to make.
          </p>
        </div>
      </section>

      {/* 3 — Four shopping types */}
      <section className="container-nn pt-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SHOPPING_TYPES.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group flex flex-col border border-line bg-paper p-6 transition-colors hover:border-charcoal"
            >
              <h2 className="font-serif text-[20px] font-medium text-charcoal transition-colors group-hover:text-clay-deep">
                {t.label}
              </h2>
              <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-stone">
                {t.desc}
              </p>
              <span className="mt-5 flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.13em] text-moss-deep group-hover:text-clay-deep">
                Browse
                <Arrow className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4 — Featured shopping story */}
      {featured && (
        <section className="container-nn pt-16">
          <SectionHeader eyebrow="Featured" title="Featured Shopping Story" />
          <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
            <Link href={`/story/${featured.slug}`} className="group block">
              <div className="card-media aspect-[16/10]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.imageUrl}
                  alt={featured.imageAlt ?? featured.title}
                />
              </div>
            </Link>
            <div>
              <p className="eyebrow">{featured.category}</p>
              <h3 className="card-title mt-2 text-[28px]">
                <Link
                  href={`/story/${featured.slug}`}
                  className="transition-colors hover:text-clay-deep"
                >
                  {featured.title}
                </Link>
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-stone">
                {featured.description}
              </p>
              <Link
                href={`/story/${featured.slug}`}
                className="link-quiet mt-5 inline-flex items-center gap-2"
              >
                Read the Finds
                <Arrow />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 5 — Latest shopping finds */}
      <section className="container-nn pt-16">
        <SectionHeader
          eyebrow="Shopping Finds"
          title="Latest Shopping Finds"
          link={{ label: 'All Finds', href: '/shopping/finds' }}
        />
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {finds.map((a) => (
            <StandardCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* 6 — Shop by room */}
      <section className="container-nn pt-16">
        <SectionHeader
          eyebrow="By Room"
          title="Shop by Room"
          link={{ label: 'All Rooms', href: '/rooms' }}
        />
        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {SHOP_ROOMS.map((room) => (
            <Link key={room.name} href={room.href} className="group block">
              <div className="card-media aspect-[3/2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={room.image} alt={room.alt} loading="lazy" />
              </div>
              <h3 className="mt-3 flex items-center justify-between font-serif text-[19px] font-medium text-charcoal group-hover:text-clay-deep">
                {room.name}
                <Arrow className="h-3.5 w-3.5 text-stone transition-transform group-hover:translate-x-1 group-hover:text-charcoal" />
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 7 — Shop the Look feature */}
      {stl && (
        <section className="container-nn pt-16">
          <div className="grid overflow-hidden rounded-[4px] border border-line lg:grid-cols-[1.7fr_1fr]">
            <Link href={`/story/${stl.slug}`} className="block">
              <div className="card-media aspect-[16/9] lg:aspect-auto lg:min-h-[400px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={stl.imageUrl}
                  alt={stl.imageAlt ?? stl.title}
                  loading="lazy"
                />
              </div>
            </Link>
            <div className="flex flex-col justify-center bg-moss-deep p-8 text-ivory sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory/70">
                Shop the Look
              </p>
              <h2 className="mt-3 font-serif text-[30px] font-medium leading-tight">
                A styled room,
                <br />
                piece by piece
              </h2>
              <p className="mt-4 max-w-[360px] text-[14.5px] leading-relaxed text-ivory/80">
                We shop our own stories. Every look is listed with exact
                products where we can source them — and honest “similar look”
                marks where we can’t.
              </p>
              <Link
                href="/shopping/shop-the-look"
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-[3px] border border-ivory/40 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-ivory hover:text-charcoal"
              >
                All Shop the Look
                <Arrow className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 8 — Best products */}
      <section className="container-nn pt-16">
        <SectionHeader
          eyebrow="Best Products"
          title="Our Best Products"
          link={{ label: 'All Comparisons', href: '/shopping/best-products' }}
        />
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {bestProducts.map((a) => (
            <StandardCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* 9 — Buying guides */}
      <section className="container-nn pt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeader eyebrow="Before You Buy" title="Buying Guides" />
            <p className="-mt-3 max-w-[380px] text-[14.5px] leading-relaxed text-stone">
              The least sales-heavy corner of the site: the frameworks,
              measurements, and mistakes that make big purchases go right.
            </p>
          </div>
          <div>
            {guides.map((g) => (
              <TextLinkCard
                key={g.slug}
                href={`/story/${g.slug}`}
                title={g.title}
                desc={g.subtitle ?? undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Latest shopping stories */}
      <section className="container-nn pt-16">
        <SectionHeader
          eyebrow="Keep Browsing"
          title="Latest Shopping Stories"
        />
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((a) => (
            <StandardCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* 11 — Newsletter */}
      <NewsletterBand />
    </>
  );
}
