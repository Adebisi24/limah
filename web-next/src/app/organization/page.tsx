import Link from 'next/link';
import { listArticles } from '@/lib/articles';
import { StandardCard, SectionHeader } from '@/components/cards';
import { NewsletterBand } from '@/components/chrome';

export const metadata = {
  title: 'Home Organization',
  description:
    'Room-by-room organization: bedroom, kitchen, bathroom, and closet systems — plus storage ideas and decluttering methods that hold.',
};

const CATEGORIES = [
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

export default async function OrganizationPage() {
  const orgArticles = await listArticles({
    collection: 'home-organization',
    limit: 500,
  });
  const featured = orgArticles.find(
    (a) => a.slug === '15-small-bedroom-storage-ideas',
  );
  const rest = orgArticles.filter((a) => a.slug !== featured?.slug).slice(0, 6);

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-nn max-w-[820px] py-12 sm:py-16">
          <p className="eyebrow">Section</p>
          <h1 className="mt-3 font-serif text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-[46px]">
            Home Organization
          </h1>
          <p className="mt-5 max-w-[560px] text-[15.5px] leading-relaxed text-stone">
            A home works when every object has a home it belongs to.
            Room-by-room systems, storage that decorates, and decluttering
            methods built to survive real calendars.
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
        <SectionHeader
          eyebrow="Room by Room"
          title="Latest Organization Stories"
        />
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <StandardCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <NewsletterBand />
    </>
  );
}
