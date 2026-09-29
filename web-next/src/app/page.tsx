import Link from 'next/link';
import { getSiteSettings } from '@/lib/sanity-content';
import { getAllArticlesLite } from '@/lib/articles';
import {
  StandardCard,
  SectionHeader,
  TextLinkCard,
  Arrow,
} from '@/components/cards';
import { NewsletterBand } from '@/components/chrome';
import { px, photo as p } from '@/db/seed/media';

const ROOMS = [
  {
    name: 'Bedroom',
    href: '/rooms/bedroom',
    image: px(p.luxuryA, 900, 600),
    alt: 'Warm modern bedroom with layered bedding',
  },
  {
    name: 'Living Room',
    href: '/rooms/living-room',
    image: px(p.livingA, 900, 600),
    alt: 'Bright living room with a centered sofa',
  },
  {
    name: 'Kitchen',
    href: '/rooms/kitchen',
    image: px(p.kitchenB, 900, 600),
    alt: 'Contemporary kitchen in warm wood',
  },
  {
    name: 'Bathroom',
    href: '/rooms/bathroom',
    image: px(p.bathA, 900, 600),
    alt: 'Bright white bathroom with a tub',
  },
];

export default async function HomePage() {
  const all = await getAllArticlesLite();
  const bySlug = (slug: string) => all.find((a) => a.slug === slug);

  const settings = await getSiteSettings();
  const featured =
    bySlug(settings.featuredArticle || '15-modern-luxury-bedroom-ideas') ??
    all[0];
  const latestIdeas = (
    settings.latestArticles.length
      ? settings.latestArticles
          .map(bySlug)
          .filter((a): a is NonNullable<typeof a> => !!a)
      : all.filter((a) => a.format === 'inspiration')
  ).slice(0, 6);
  const designFeature = bySlug('12-warm-neutral-bedroom-ideas');
  const designSupport = [
    bySlug('15-small-bedroom-ideas-that-maximize-space'),
    bySlug('living-room-layout-ideas-that-feel-effortless'),
  ].filter(Boolean);
  const organization = all
    .filter((a) => a.category === 'Home Organization')
    .slice(0, 3);
  const finds = all.filter((a) => a.format === 'finds').slice(0, 4);
  const stl = bySlug('shop-this-modern-luxury-bedroom');
  const productPicks = all
    .filter((a) => a.format === 'best-products')
    .slice(0, 3);
  const guides = all.filter((a) => a.format === 'buying-guide').slice(0, 3);
  const popular = all.filter((a) => a.popular).slice(0, 4);
  const roomCount = (room: string) => all.filter((a) => a.room === room).length;

  if (!featured)
    return (
      <section className="container-nn py-16">
        <h1 className="h-display text-4xl">Nest Nabber</h1>
        <p className="nn-p mt-5">
          New stories are on their way. Explore our rooms and shopping sections.
        </p>
      </section>
    );

  return (
    <>
      {/* 2 — Featured Story */}
      <section className="border-b border-line bg-ivory">
        <div className="container-nn grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.25fr_1fr]">
          <Link href={`/story/${featured.slug}`} className="group block">
            <div className="card-media aspect-[3/2]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.imageUrl}
                alt={featured.imageAlt ?? featured.title}
              />
            </div>
          </Link>
          <div>
            <p className="eyebrow">{featured.category} · Design Ideas</p>
            <h1 className="mt-3 font-serif text-[36px] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-[46px]">
              <Link
                href={`/story/${featured.slug}`}
                className="transition-colors hover:text-clay-deep"
              >
                {featured.title}
              </Link>
            </h1>
            <p className="mt-4 max-w-[480px] text-[16px] leading-relaxed text-stone">
              {featured.description}
            </p>
            <Link href={`/story/${featured.slug}`} className="btn-primary mt-7">
              Read Story
              <Arrow className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3 — Latest Ideas (6 cards, 3 × 2) */}
      <section className="container-nn pt-16">
        <SectionHeader
          eyebrow="Fresh from the Studio"
          title="Latest Ideas"
          link={{ label: 'View All', href: '/collection/design-ideas' }}
        />
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {latestIdeas.map((a) => (
            <StandardCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* 4 — Find Ideas for Your Room (2 × 2) */}
      <section className="container-nn pt-16">
        <SectionHeader
          eyebrow="Start With a Room"
          title="Find Ideas for Your Room"
          link={{ label: 'All Rooms', href: '/rooms' }}
        />
        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2">
          {ROOMS.map((room) => (
            <Link key={room.name} href={room.href} className="group block">
              <div className="card-media aspect-[16/9]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={room.image} alt={room.alt} loading="lazy" />
              </div>
              <div className="mt-4 flex items-baseline justify-between border-b border-line-soft pb-4 transition-colors group-hover:border-charcoal">
                <h3 className="font-serif text-[22px] font-medium text-charcoal transition-colors group-hover:text-clay-deep">
                  {room.name}
                </h3>
                <span className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-stone group-hover:text-charcoal">
                  {roomCount(room.href.split('/')[2])} stories
                  <Arrow className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5 — Interior Design Inspiration: 1 large + 2 supporting */}
      <section className="container-nn pt-16">
        <SectionHeader
          eyebrow="Interior Design"
          title="Interior Design Inspiration"
          link={{ label: 'Explore', href: '/interior-design' }}
        />
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-[1.55fr_1fr]">
          {designFeature && (
            <Link href={`/story/${designFeature.slug}`} className="group block">
              <div className="card-media aspect-[16/10]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={designFeature.imageUrl}
                  alt={designFeature.imageAlt ?? designFeature.title}
                  loading="lazy"
                />
              </div>
              <p className="eyebrow mt-4">{designFeature.category}</p>
              <h3 className="card-title mt-2 text-[26px] transition-colors group-hover:text-clay-deep sm:text-[30px]">
                {designFeature.title}
              </h3>
              {designFeature.description && (
                <p className="mt-3 max-w-[520px] text-[14.5px] leading-relaxed text-stone">
                  {designFeature.description}
                </p>
              )}
            </Link>
          )}
          <div className="flex flex-col gap-8">
            {designSupport.map(
              (a) =>
                a && (
                  <Link
                    key={a.slug}
                    href={`/story/${a.slug}`}
                    className="group flex gap-4"
                  >
                    <div className="card-media aspect-[3/2] w-[136px] shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.imageUrl}
                        alt={a.imageAlt ?? a.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="eyebrow">{a.category}</p>
                      <h3 className="card-title mt-1.5 text-[17px] transition-colors group-hover:text-clay-deep">
                        {a.title}
                      </h3>
                    </div>
                  </Link>
                ),
            )}
          </div>
        </div>
      </section>

      {/* 6 — Make Your Home Work Better (Organization, 3 cards) */}
      <section className="container-nn pt-16">
        <SectionHeader
          eyebrow="Home Organization"
          title="Make Your Home Work Better"
          link={{ label: 'All Organization', href: '/organization' }}
        />
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {organization.map((a) => (
            <StandardCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* 7 — Home Finds Worth Discovering (Shopping Finds, 4 cards) */}
      <section className="container-nn pt-16">
        <SectionHeader
          eyebrow="Shopping Finds"
          title="Home Finds Worth Discovering"
          link={{ label: 'Browse Finds', href: '/shopping/finds' }}
        />
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {finds.map((a) => (
            <StandardCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* 8 — Shop the Look (large visual module) */}
      {stl && (
        <section className="container-nn pt-16">
          <div className="grid overflow-hidden rounded-[4px] border border-line lg:grid-cols-[1.7fr_1fr]">
            <Link href={`/story/${stl.slug}`} className="group block">
              <div className="card-media h-full aspect-[16/9] lg:aspect-auto lg:min-h-[420px]">
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
              <h2 className="mt-3 font-serif text-[30px] font-medium leading-tight sm:text-[34px]">
                A modern luxury bedroom,
                <br />
                piece by piece
              </h2>
              <p className="mt-4 max-w-[360px] text-[14.5px] leading-relaxed text-ivory/80">
                {stl.subtitle}
              </p>
              <Link
                href={`/story/${stl.slug}`}
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-[3px] border border-ivory/40 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-ivory hover:text-charcoal"
              >
                {stl.title}
                <Arrow className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 9 — Our Product Picks (Best Products, 3 cards) */}
      <section className="container-nn pt-16">
        <SectionHeader
          eyebrow="Best Products"
          title="Our Product Picks"
          link={{ label: 'All Best Products', href: '/shopping/best-products' }}
        />
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {productPicks.map((a) => (
            <StandardCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* 10 — Before You Buy (Buying Guides, lighter) */}
      <section className="container-nn pt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeader eyebrow="Buying Guides" title="Before You Buy" />
            <p className="-mt-3 max-w-[380px] text-[14.5px] leading-relaxed text-stone">
              The frameworks, measurements, and checklists to make the bigger
              purchases deliberately — before you open a single product page.
            </p>
            <Link
              href="/shopping/buying-guides"
              className="link-quiet mt-5 inline-flex items-center gap-2"
            >
              All Buying Guides
              <Arrow />
            </Link>
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

      {/* 11 — Popular Right Now (4 stories) */}
      <section className="container-nn pt-16">
        <SectionHeader eyebrow="Readers Are On" title="Popular Right Now" />
        <ol className="grid gap-x-10 md:grid-cols-2">
          {popular.map((a, i) => (
            <li key={a.slug} className="border-b border-line-soft">
              <Link
                href={`/story/${a.slug}`}
                className="group flex items-baseline gap-5 py-5"
              >
                <span className="font-serif text-[30px] italic leading-none text-clay">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
                    {a.category}
                  </span>
                  <span className="mt-1 block font-serif text-[19px] font-medium leading-snug text-charcoal transition-colors group-hover:text-clay-deep">
                    {a.title}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* 12 — Newsletter */}
      <NewsletterBand />
      {/* 13 — Full Footer (in layout) */}
    </>
  );
}
