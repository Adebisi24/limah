import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { listArticles } from '@/lib/articles';
import { StandardCard, SectionHeader } from '@/components/cards';
import { NewsletterBand, Breadcrumbs } from '@/components/chrome';

interface CollectionDef {
  title: string;
  desc: string;
  tags: string[];
  family: { label: string; href: string }[];
  crumb: { label: string; href: string };
}

const DESIGN_FAMILY = [
  { label: 'Design Ideas', href: '/collection/design-ideas' },
  { label: 'Design Styles', href: '/collection/design-styles' },
  { label: 'Color & Paint', href: '/collection/color-paint' },
  { label: 'Furniture', href: '/collection/furniture' },
  { label: 'Lighting', href: '/collection/lighting' },
  { label: 'Small Spaces', href: '/collection/small-spaces' },
  { label: 'Design Trends', href: '/collection/design-trends' },
];
const STYLE_FAMILY = [
  { label: 'Modern', href: '/collection/modern' },
  { label: 'Minimalist', href: '/collection/minimalist' },
  { label: 'Organic Modern', href: '/collection/organic-modern' },
  { label: 'Luxury', href: '/collection/luxury' },
  { label: 'Scandinavian', href: '/collection/scandinavian' },
  { label: 'Traditional', href: '/collection/traditional' },
];
const ORG_FAMILY = [
  { label: 'Bedroom Organization', href: '/collection/bedroom-organization' },
  { label: 'Kitchen Organization', href: '/collection/kitchen-organization' },
  { label: 'Bathroom Organization', href: '/collection/bathroom-organization' },
  { label: 'Closet Organization', href: '/collection/closet-organization' },
  { label: 'Storage Ideas', href: '/collection/storage-ideas' },
  { label: 'Decluttering', href: '/collection/decluttering' },
  {
    label: 'Small-Space Organization',
    href: '/collection/small-space-organization',
  },
];

const COLLECTIONS: Record<string, CollectionDef> = {
  'design-ideas': {
    title: 'Design Ideas',
    desc: "Room-by-room ideas and styling moves — the 'what would make this room better' side of interior design, photographed and explained.",
    tags: ['design-ideas'],
    family: DESIGN_FAMILY,
    crumb: { label: 'Interior Design', href: '/interior-design' },
  },
  'design-styles': {
    title: 'Design Styles',
    desc: 'The style families we keep coming back to — modern, minimalist, warm neutral, Scandinavian, and traditional — explained in rooms, not adjectives.',
    tags: ['design-styles'],
    family: DESIGN_FAMILY,
    crumb: { label: 'Interior Design', href: '/interior-design' },
  },
  'color-paint': {
    title: 'Color & Paint',
    desc: 'Palettes, paint picks, and the rules for using color in a home that should feel calm — starting with the warm neutral family.',
    tags: ['color-paint'],
    family: DESIGN_FAMILY,
    crumb: { label: 'Interior Design', href: '/interior-design' },
  },
  furniture: {
    title: 'Furniture',
    desc: 'The big pieces: beds, sofas, headboards, and frames — how to choose them, how to place them, and which ones earn their floor space.',
    tags: ['furniture'],
    family: DESIGN_FAMILY,
    crumb: { label: 'Interior Design', href: '/interior-design' },
  },
  lighting: {
    title: 'Lighting',
    desc: 'The most under-decided part of a room. Light layers, lamp heights, color temperature, and the setups that make a room feel calm at night.',
    tags: ['lighting'],
    family: DESIGN_FAMILY,
    crumb: { label: 'Interior Design', href: '/interior-design' },
  },
  'small-spaces': {
    title: 'Small Spaces',
    desc: 'Ideas and systems for rooms that are smaller than their ambitions — vertical storage, slim furniture, and the visual moves that add space.',
    tags: ['small-spaces', 'small-space-organization'],
    family: DESIGN_FAMILY,
    crumb: { label: 'Interior Design', href: '/interior-design' },
  },
  'design-trends': {
    title: 'Design Trends',
    desc: 'The directions worth following — and the ones worth skipping. Trends covered the way we cover everything: with trade-offs named.',
    tags: ['design-trends', 'modern', 'luxury', 'organic-modern'],
    family: DESIGN_FAMILY,
    crumb: { label: 'Interior Design', href: '/interior-design' },
  },
  modern: {
    title: 'Modern Interiors',
    desc: 'Clean lines, low profiles, and warm materials — the modern rooms we are building right now.',
    tags: ['modern'],
    family: STYLE_FAMILY,
    crumb: { label: 'Design Styles', href: '/collection/design-styles' },
  },
  minimalist: {
    title: 'Minimalist Interiors',
    desc: 'The edited room, kept warm: fewer objects, more texture, and the one accent each room needs.',
    tags: ['minimalist'],
    family: STYLE_FAMILY,
    crumb: { label: 'Design Styles', href: '/collection/design-styles' },
  },
  'organic-modern': {
    title: 'Organic Modern',
    desc: 'Modern by line, warm by material: curves, bouclé, wood, and the softened version of contemporary.',
    tags: ['organic-modern'],
    family: STYLE_FAMILY,
    crumb: { label: 'Design Styles', href: '/collection/design-styles' },
  },
  luxury: {
    title: 'Luxury Interiors',
    desc: 'Modern luxury without the gold: the tonal palettes, layered light, and confident objects that make a room feel quietly expensive.',
    tags: ['luxury'],
    family: STYLE_FAMILY,
    crumb: { label: 'Design Styles', href: '/collection/design-styles' },
  },
  scandinavian: {
    title: 'Scandinavian Interiors',
    desc: 'Pale wood, paper light, and one texture — the Scandi formula, room by room.',
    tags: ['scandinavian'],
    family: STYLE_FAMILY,
    crumb: { label: 'Design Styles', href: '/collection/design-styles' },
  },
  traditional: {
    title: 'Traditional Interiors',
    desc: 'The soft traditional room: crisp sheets, proper headboards, and heritage details without the formality.',
    tags: ['traditional'],
    family: STYLE_FAMILY,
    crumb: { label: 'Design Styles', href: '/collection/design-styles' },
  },
  'warm-neutral': {
    title: 'Warm Neutral Interiors',
    desc: 'The sand-to-taupe family, built properly: the base paint, the wood tones, and the 10% that keeps it from going flat.',
    tags: ['warm-neutral'],
    family: STYLE_FAMILY,
    crumb: { label: 'Design Styles', href: '/collection/design-styles' },
  },
  'bedroom-organization': {
    title: 'Bedroom Organization',
    desc: 'Storage systems for the bedroom: under the bed, in the closet, on the nightstand — and the rules that keep them organized.',
    tags: ['bedroom-organization'],
    family: ORG_FAMILY,
    crumb: { label: 'Home Organization', href: '/organization' },
  },
  'kitchen-organization': {
    title: 'Kitchen Organization',
    desc: 'Zones instead of categories: the cooking cabinet, the dish cabinet, and the countertop rules that keep the kitchen working.',
    tags: ['kitchen-organization'],
    family: ORG_FAMILY,
    crumb: { label: 'Home Organization', href: '/organization' },
  },
  'bathroom-organization': {
    title: 'Bathroom Organization',
    desc: 'Small bathroom systems: the under-sink reset, the towel rotation, and the three-tier rule that keeps the whole room working.',
    tags: ['bathroom-organization'],
    family: ORG_FAMILY,
    crumb: { label: 'Home Organization', href: '/organization' },
  },
  'closet-organization': {
    title: 'Closet Organization',
    desc: 'The height-sorted hang, the drawer audit, and the over-door space — a closet rebuilt around how clothes are actually used.',
    tags: ['closet-organization'],
    family: ORG_FAMILY,
    crumb: { label: 'Home Organization', href: '/organization' },
  },
  'storage-ideas': {
    title: 'Storage Ideas',
    desc: 'Where the things go: under-bed systems, vertical cabinets, matched basket families, and storage that decorates while it stores.',
    tags: ['storage-ideas'],
    family: ORG_FAMILY,
    crumb: { label: 'Home Organization', href: '/organization' },
  },
  decluttering: {
    title: 'Decluttering',
    desc: 'Decluttering that survives: 45-minute passes, the three-box decision, and the maintenance that stops the clutter coming back.',
    tags: ['decluttering'],
    family: ORG_FAMILY,
    crumb: { label: 'Home Organization', href: '/organization' },
  },
  'small-space-organization': {
    title: 'Small-Space Organization',
    desc: 'Organization for rooms that are smaller than their ambitions — vertical, hidden, and multi-job by design.',
    tags: ['small-space-organization'],
    family: ORG_FAMILY,
    crumb: { label: 'Home Organization', href: '/organization' },
  },
};

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = params.then((p) => p.slug);
  return Promise.resolve(slug).then((s) => {
    const def = COLLECTIONS[s];
    return def
      ? { title: def.title, description: def.desc }
      : { title: 'Collection' };
  });
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const def = COLLECTIONS[slug];
  if (!def) notFound();

  const all = await listArticles({ limit: 60 });
  const articles = all
    .filter((a) => def.tags.some((t) => a.tags.includes(t)))
    .slice(0, 12);

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-nn max-w-[820px] py-12 sm:py-16">
          <Breadcrumbs items={[def.crumb, { label: def.title }]} />
          <h1 className="mt-4 font-serif text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-[46px]">
            {def.title}
          </h1>
          <p className="mt-5 max-w-[560px] text-[15.5px] leading-relaxed text-stone">
            {def.desc}
          </p>
        </div>
      </section>

      <section className="container-nn py-12">
        <div
          className="mb-10 flex flex-wrap gap-2"
          aria-label="More in this family"
        >
          {def.family.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className={`rounded-full border px-4 py-2 text-[12.5px] font-medium transition-colors ${
                f.href === `/collection/${slug}`
                  ? 'border-charcoal bg-charcoal text-paper'
                  : 'border-line bg-paper text-ink-soft hover:border-charcoal'
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>

        {articles.length > 0 ? (
          <>
            <SectionHeader
              eyebrow={`${articles.length} Stories`}
              title="From This Collection"
            />
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <StandardCard key={a.slug} article={a} />
              ))}
            </div>
          </>
        ) : (
          <p className="border border-line bg-paper p-8 text-[15px] text-stone">
            More stories are on the way for this section. Meanwhile, browse the{' '}
            <Link href={def.crumb.href} className="text-link">
              {def.crumb.label}
            </Link>{' '}
            hub for everything we have published here so far.
          </p>
        )}
      </section>

      <NewsletterBand />
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(COLLECTIONS).map((slug) => ({ slug }));
}
