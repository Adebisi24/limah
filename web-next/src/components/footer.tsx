import Link from 'next/link';

const EXPLORE = [
  { label: 'Interior Design', href: '/interior-design' },
  { label: 'Home Organization', href: '/organization' },
  { label: 'Shopping', href: '/shopping' },
  { label: 'Latest Stories', href: '/collection/design-ideas' },
];
const ROOMS = [
  { label: 'Bedroom', href: '/rooms/bedroom' },
  { label: 'Living Room', href: '/rooms/living-room' },
  { label: 'Kitchen', href: '/rooms/kitchen' },
  { label: 'Bathroom', href: '/rooms/bathroom' },
];
const SHOPPING = [
  { label: 'Shopping Finds', href: '/shopping/finds' },
  { label: 'Best Products', href: '/shopping/best-products' },
  { label: 'Buying Guides', href: '/shopping/buying-guides' },
  { label: 'Shop the Look', href: '/shopping/shop-the-look' },
];
const COMPANY = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Editorial Policy', href: '/editorial-policy' },
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-paper">
      <div className="container-nn py-10 md:py-14">
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-[24px] font-medium tracking-[-0.02em]">
              Nest <span className="italic text-moss-deep">Nabber</span>
            </p>
            <p className="mt-3 max-w-[260px] text-[13.5px] leading-relaxed text-stone">
              A home and interiors publication: room-by-room inspiration,
              practical organization advice, and carefully considered shopping
              guides.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span
                aria-disabled="true"
                title="Account link pending"
                aria-label="Instagram — account link pending"
                className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-line text-ink-soft transition-colors hover:border-charcoal hover:text-charcoal"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-[17px] w-[17px]"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="2.5"
                    y="2.5"
                    width="15"
                    height="15"
                    rx="4"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="3.6"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <circle cx="14.6" cy="5.4" r="0.9" fill="currentColor" />
                </svg>
              </span>
              <span
                aria-disabled="true"
                title="Account link pending"
                aria-label="Pinterest — account link pending"
                className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-line text-ink-soft transition-colors hover:border-charcoal hover:text-charcoal"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-[17px] w-[17px]"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="7.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M9 14.5l2-6.2M8.2 9.2a2.6 2.6 0 113.8 1.5c-.9.7-2 .5-2.4-.4"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          <nav aria-label="Explore">
            <p className="eyebrow">Explore</p>
            <ul className="mt-3 space-y-2">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13.5px] text-ink-soft transition-colors hover:text-charcoal"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Rooms">
            <p className="eyebrow">Rooms</p>
            <ul className="mt-3 space-y-2">
              {ROOMS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13.5px] text-ink-soft transition-colors hover:text-charcoal"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Shopping">
            <p className="eyebrow">Shopping</p>
            <ul className="mt-3 space-y-2">
              {SHOPPING.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13.5px] text-ink-soft transition-colors hover:text-charcoal"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company and policies">
            <p className="eyebrow">Company</p>
            <ul className="mt-3 space-y-2">
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13.5px] text-ink-soft transition-colors hover:text-charcoal"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t border-line-soft">
        <div className="container-nn flex flex-col gap-2 py-5 text-[12px] text-stone md:flex-row md:items-center md:justify-between">
          <p>© 2026 Nest Nabber. All rights reserved.</p>
          <p>
            Some links are affiliate links — see our{' '}
            <Link
              href="/affiliate-disclosure"
              className="underline decoration-line underline-offset-2 hover:decoration-charcoal"
            >
              affiliate disclosure
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
