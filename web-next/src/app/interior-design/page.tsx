import Link from 'next/link';
import { listArticles } from '@/lib/articles';
import { StandardCard, SectionHeader } from '@/components/cards';
import { NewsletterBand } from '@/components/chrome';

export const metadata = {
  title: 'Interior Design',
  description:
    'Design ideas, styles, color, furniture, lighting, and small-space solutions — the interior design section of Nest Nabber.',
};

const CATEGORIES = [
  { label: 'Design Ideas', href: '/collection/design-ideas' },
  { label: 'Design Styles', href: '/collection/design-styles' },
  { label: 'Color & Paint', href: '/collection/color-paint' },
  { label: 'Furniture', href: '/collection/furniture' },
  { label: 'Lighting', href: '/collection/lighting' },
  { label: 'Small Spaces', href: '/collection/small-spaces' },
  { label: 'Design Trends', href: '/collection/design-trends' },
];
const STYLES = [
  { label: 'Modern', href: '/collection/modern' },
  { label: 'Minimalist', href: '/collection/minimalist' },
  { label: 'Organic Modern', href: '/collection/organic-modern' },
  { label: 'Luxury', href: '/collection/luxury' },
  { label: 'Scandinavian', href: '/collection/scandinavian' },
  { label: 'Traditional', href: '/collection/traditional' },
];

export default async function InteriorDesignPage() {
  const all = await listArticles({
    collection: 'interior-design',
    limit: 20,
  });
  const featured = all.find(
    (a) => a.slug === '8-bedroom-lighting-ideas-that-set-the-mood',
  );
  const rest = all.filter((a) => a.slug !== featured?.slug).slice(0, 8);

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-nn max-w-[820px] py-12 sm:py-16">
          <p className="eyebrow">Section</p>
          <h1 className="mt-3 font-serif text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-[46px]">
            Interior Design
          </h1>
          <p className="mt-5 max-w-[560px] text-[15.5px] leading-relaxed text-stone">
            Ideas, styles, and the details that make a room feel finished. Every
            story is written for a real room — with the trade-offs named, not
            the showroom version.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="rounded-full border border-line bg-ivory px-4 py-2 text-[12.5px] font-medium text-ink-soft transition-colors hover:border-charcoal"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featured && (
        <section className="container-nn pt-14">
          <SectionHeader eyebrow="Featured" title="The Featured Story" />
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

      <section className="container-nn pt-16">
        <SectionHeader eyebrow="Explore by Style" title="Design Styles" />
        <div className="grid gap-3 sm:grid-cols-3">
          {STYLES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-center justify-between border border-line bg-paper px-5 py-4 transition-colors hover:border-charcoal"
            >
              <span className="font-serif text-[17px] font-medium text-charcoal group-hover:text-clay-deep">
                {s.label}
              </span>
              <span className="text-stone transition-transform group-hover:translate-x-1">
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  className="h-3 w-3"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 6h7M6.5 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-nn pt-16">
        <SectionHeader eyebrow="Fresh Ideas" title="Latest Design Stories" />
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((a) => (
            <StandardCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <NewsletterBand />
    </>
  );
}
