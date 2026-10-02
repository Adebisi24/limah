import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllArticlesLite } from '@/lib/articles';
import {
  StandardCard,
  CompactCard,
  SectionHeader,
  TextLinkCard,
  Arrow,
} from '@/components/cards';
import { NewsletterBand, Breadcrumbs } from '@/components/chrome';

interface RoomConfig {
  name: string;
  intro: string;
  featuredSlug: string;
  styles: { label: string; href: string }[];
}

const ROOMS: Record<string, RoomConfig> = {
  bedroom: {
    name: 'Bedroom',
    intro:
      'The room you spend a third of your life in deserves better than an afterthought. Ideas, organization, advice, and the shopping guides to build the room you actually want to be in — all in one place.',
    featuredSlug: '15-modern-luxury-bedroom-ideas',
    styles: [
      { label: 'Modern', href: '/collection/modern' },
      { label: 'Minimalist', href: '/collection/minimalist' },
      { label: 'Organic Modern', href: '/collection/organic-modern' },
      { label: 'Luxury', href: '/collection/luxury' },
      { label: 'Scandinavian', href: '/collection/scandinavian' },
      { label: 'Traditional', href: '/collection/traditional' },
    ],
  },
  'living-room': {
    name: 'Living Room',
    intro:
      'The room the house performs in. Layouts, the sofa decision, and the decor finishes that make it look like it was always this way.',
    featuredSlug: 'living-room-layout-ideas-that-feel-effortless',
    styles: [
      { label: 'Modern', href: '/collection/modern' },
      { label: 'Organic Modern', href: '/collection/organic-modern' },
      { label: 'Minimalist', href: '/collection/minimalist' },
      { label: 'Luxury', href: '/collection/luxury' },
    ],
  },
  kitchen: {
    name: 'Kitchen',
    intro:
      'The room that runs the house. Countertop rules, cabinet zones, and storage that keeps the daily kitchen working without looking like a system.',
    featuredSlug: 'kitchen-counter-organization-9-ideas',
    styles: [
      { label: 'Modern', href: '/collection/modern' },
      { label: 'Scandinavian', href: '/collection/scandinavian' },
    ],
  },
  bathroom: {
    name: 'Bathroom',
    intro:
      'Small rooms, big systems. The vertical moves, towel rotations, and finds that fit a room with no spare cabinet.',
    featuredSlug: '7-small-bathroom-organization-ideas',
    styles: [
      { label: 'Modern', href: '/collection/modern' },
      { label: 'Minimalist', href: '/collection/minimalist' },
    ],
  },
};

export function generateMetadata({
  params,
}: {
  params: Promise<{ room: string }>;
}): Promise<Metadata> {
  const room = params.then((p) => p.room);
  return Promise.resolve(room).then((r) => {
    const cfg = ROOMS[r];
    return cfg
      ? { title: cfg.name, description: cfg.intro }
      : { title: 'Rooms' };
  });
}

export default async function RoomHubPage({
  params,
}: {
  params: Promise<{ room: string }>;
}) {
  const { room } = await params;
  const cfg = ROOMS[room];
  if (!cfg) notFound();

  const all = await getAllArticlesLite();
  const inRoom = all.filter(
    (article) => article.room === room || article.collections.includes(room),
  );

  const featured = inRoom.find((a) => a.slug === cfg.featuredSlug) ?? inRoom[0];
  const ideas = inRoom
    .filter((a) => a.format === 'inspiration' && a.slug !== featured?.slug)
    .slice(0, 8);
  const organization = all
    .filter(
      (a) =>
        a.collections.includes('home-organization') &&
        (a.room === room || a.collections.includes(room)),
    )
    .slice(0, 3);
  const advice = inRoom
    .filter(
      (a) => a.format === 'howto' && !a.tags.includes(`${room}-organization`),
    )
    .slice(0, 3);
  const looks = inRoom.filter((a) => a.format === 'shop-the-look').slice(0, 3);
  const finds = inRoom.filter((a) => a.format === 'finds').slice(0, 4);
  const bestProducts = inRoom
    .filter((a) => a.format === 'best-products')
    .slice(0, 3);
  const guides = inRoom.filter((a) => a.format === 'buying-guide').slice(0, 4);
  const latest = inRoom.filter((a) => a.slug !== featured?.slug).slice(0, 6);

  const subnav: { label: string; href: string; show: boolean }[] = [
    { label: 'Ideas', href: '#ideas', show: ideas.length > 0 },
    {
      label: 'Organization',
      href: '#organization',
      show: organization.length > 0,
    },
    { label: 'Advice', href: '#advice', show: advice.length > 0 },
    {
      label: 'Shopping',
      href: '#shopping',
      show: looks.length + finds.length + bestProducts.length > 0,
    },
  ];

  const guideLinks = guides.length
    ? guides.map((g) => ({
        title: g.title,
        href: `/story/${g.slug}`,
        desc: g.subtitle ?? undefined,
      }))
    : [];

  return (
    <>
      {/* 2 — Title + intro */}
      <section className="border-b border-line bg-paper">
        <div className="container-nn max-w-[860px] py-12 sm:py-16">
          <Breadcrumbs
            items={[{ label: 'Rooms', href: '/rooms' }, { label: cfg.name }]}
          />
          <h1 className="mt-4 font-serif text-[40px] font-medium leading-[1.06] tracking-[-0.02em] text-charcoal sm:text-[52px]">
            {cfg.name}
          </h1>
          <p className="mt-5 max-w-[620px] text-[15.5px] leading-relaxed text-stone">
            {cfg.intro}
          </p>
          <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-moss-deep">
            {inRoom.length} stories in this room
          </p>
        </div>
      </section>

      {/* 3 — Subnavigation */}
      {subnav.some((s) => s.show) && (
        <div className="sticky top-[64px] z-40 border-b border-line bg-ivory/95 backdrop-blur lg:top-[100px]">
          <div className="container-nn flex gap-1 overflow-x-auto">
            {subnav
              .filter((s) => s.show)
              .map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  className="whitespace-nowrap px-4 py-3.5 text-[13px] font-medium text-stone transition-colors hover:text-charcoal"
                >
                  {s.label}
                </a>
              ))}
          </div>
        </div>
      )}

      <div className="container-nn">
        {/* 4 — Featured story */}
        {featured && (
          <section className="pt-14">
            <SectionHeader
              eyebrow="Featured"
              title={`The ${cfg.name}, Starting Here`}
            />
            <div className="grid items-center gap-8 lg:grid-cols-[1.35fr_1fr]">
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
                <h2 className="card-title mt-2 text-[28px]">
                  <Link
                    href={`/story/${featured.slug}`}
                    className="transition-colors hover:text-clay-deep"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-3 text-[14.5px] leading-relaxed text-stone">
                  {featured.description}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 5 — Ideas */}
        {ideas.length > 0 && (
          <section className="pt-16" id="ideas">
            <SectionHeader
              eyebrow="Inspiration"
              title={`${cfg.name} Ideas`}
              link={{ label: 'All Ideas', href: `/rooms/${room}` }}
            />
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {ideas.map((a) => (
                <StandardCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        {/* 6 — Explore by Style */}
        {cfg.styles.length > 0 && (
          <section className="pt-16">
            <SectionHeader eyebrow="By Style" title="Explore by Style" />
            <div className="grid gap-3 sm:grid-cols-3">
              {cfg.styles.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group flex items-center justify-between border border-line bg-paper px-5 py-4 transition-colors hover:border-charcoal"
                >
                  <span className="font-serif text-[17px] font-medium text-charcoal group-hover:text-clay-deep">
                    {s.label}
                  </span>
                  <span className="text-stone transition-transform group-hover:translate-x-1">
                    <Arrow className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 7 — Organization */}
        {organization.length > 0 && (
          <section className="pt-16" id="organization">
            <SectionHeader
              eyebrow="Organization"
              title={`${cfg.name} Organization`}
              link={{ label: 'All Organization', href: '/organization' }}
            />
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {organization.map((a) => (
                <StandardCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        {/* 8 — Advice */}
        {advice.length > 0 && (
          <section className="pt-16" id="advice">
            <SectionHeader
              eyebrow="Practical Advice"
              title={`${cfg.name} Advice`}
            />
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {advice.map((a) => (
                <StandardCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        {/* 9 — Shop the Look */}
        {looks.length > 0 && (
          <section className="pt-16" id="shopping">
            <SectionHeader
              eyebrow="Shop the Look"
              title={`Shop This ${cfg.name}`}
              link={{ label: 'All Looks', href: '/shopping/shop-the-look' }}
            />
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {looks.map((a) => (
                <StandardCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        {/* 10 — Finds */}
        {finds.length > 0 && (
          <section className="pt-16">
            <SectionHeader
              eyebrow="Shopping Finds"
              title={`${cfg.name} Finds`}
              link={{ label: 'All Finds', href: '/shopping/finds' }}
            />
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {finds.map((a) => (
                <StandardCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        {/* 11 — Best Products */}
        {bestProducts.length > 0 && (
          <section className="pt-16">
            <SectionHeader
              eyebrow="Best Products"
              title={`Best ${cfg.name} Products`}
              link={{
                label: 'All Best Products',
                href: '/shopping/best-products',
              }}
            />
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {bestProducts.map((a) => (
                <StandardCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        {/* 12 — Buying Guides (text links) */}
        {guideLinks.length > 0 && (
          <section className="pt-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <SectionHeader eyebrow="Before You Buy" title="Buying Guides" />
                <p className="-mt-3 max-w-[360px] text-[14.5px] leading-relaxed text-stone">
                  The frameworks for the bigger {cfg.name.toLowerCase()}{' '}
                  purchases — read these before the product pages.
                </p>
              </div>
              <div>
                {guideLinks.map((g) => (
                  <TextLinkCard
                    key={g.href}
                    href={g.href}
                    title={g.title}
                    desc={g.desc}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 13 — Latest stories */}
        {latest.length > 0 && (
          <section className="pt-16">
            <SectionHeader
              eyebrow="Fresh"
              title={`Latest ${cfg.name} Stories`}
            />
            <div className="grid grid-cols-1 gap-x-5 gap-y-8 min-[430px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {latest.map((a) => (
                <CompactCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* 14 — Newsletter */}
      <NewsletterBand />
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(ROOMS).map((room) => ({ room }));
}
