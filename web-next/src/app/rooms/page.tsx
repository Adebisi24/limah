import Link from 'next/link';
import { getAllArticlesLite } from '@/lib/articles';
import { Arrow } from '@/components/cards';
import { NewsletterBand } from '@/components/chrome';
import { px, photo as p } from '@/db/seed/media';

export const metadata = {
  title: 'Rooms',
  description:
    'Browse Nest Nabber by room: bedroom, living room, kitchen, and bathroom — ideas, organization, and shopping for each.',
};

const ROOMS = [
  {
    name: 'Bedroom',
    href: '/rooms/bedroom',
    slug: 'bedroom',
    image: px(p.luxuryA, 1100, 733),
    alt: 'Warm modern bedroom with layered bedding',
    blurb:
      'The first full ecosystem: ideas, storage, lighting, and the shopping guides to match.',
  },
  {
    name: 'Living Room',
    href: '/rooms/living-room',
    slug: 'living-room',
    image: px(p.livingA, 1100, 733),
    alt: 'Bright spacious living room',
    blurb:
      'Layouts, the sofa decision, and the decor finds that finish a room.',
  },
  {
    name: 'Kitchen',
    href: '/rooms/kitchen',
    slug: 'kitchen',
    image: px(p.kitchenB, 1100, 733),
    alt: 'Warm wood contemporary kitchen',
    blurb:
      'Countertop systems, cabinet zones, and storage that keeps the kitchen working.',
  },
  {
    name: 'Bathroom',
    href: '/rooms/bathroom',
    slug: 'bathroom',
    image: px(p.bathA, 1100, 733),
    alt: 'Bright white bathroom',
    blurb:
      'Small-bathroom systems and the finds that fit rooms with no spare cabinet.',
  },
];

export default async function RoomsPage() {
  const all = await getAllArticlesLite();
  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-nn max-w-[820px] py-12 sm:py-16">
          <p className="eyebrow">Browse by Room</p>
          <h1 className="mt-3 font-serif text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-[46px]">
            Rooms
          </h1>
          <p className="mt-5 max-w-[560px] text-[15.5px] leading-relaxed text-stone">
            Every room is a destination: the ideas, the organization, the
            advice, and the shopping — curated in one place instead of scattered
            across the site.
          </p>
        </div>
      </section>

      <section className="container-nn py-14">
        <div className="grid gap-10 sm:grid-cols-2">
          {ROOMS.map((room) => (
            <Link key={room.slug} href={room.href} className="group block">
              <div className="card-media aspect-[3/2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={room.image} alt={room.alt} loading="lazy" />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <div>
                  <h2 className="font-serif text-[26px] font-medium text-charcoal transition-colors group-hover:text-clay-deep">
                    {room.name}
                  </h2>
                  <p className="mt-2 max-w-[420px] text-[14px] leading-relaxed text-stone">
                    {room.blurb}
                  </p>
                  <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-moss-deep">
                    {all.filter((a) => a.room === room.slug).length} stories
                  </p>
                </div>
                <span className="text-stone transition-all group-hover:translate-x-1 group-hover:text-charcoal">
                  <Arrow className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <NewsletterBand />
    </>
  );
}
