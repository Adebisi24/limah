import Link from 'next/link';
import type { Article } from '@/lib/types';
import { CompactCard, SectionHeader, TextLinkCard, Arrow } from './cards';
import { NewsletterForm } from './newsletter';

/* ---------------- Breadcrumbs ---------------- */
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-stone">
        <li>
          <Link href="/" className="hover:text-charcoal">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="text-line">
              /
            </span>
            {item.href ? (
              <Link href={item.href} className="hover:text-charcoal">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-charcoal">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ---------------- Byline ---------------- */
export function formatDate(d: Date | null, withYear = true): string {
  if (!d) return '';
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    ...(withYear ? { year: 'numeric' } : {}),
  });
}

export function Byline({ article }: { article: Article }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-stone">
      <span className="font-medium text-charcoal">By {article.author}</span>
      <span aria-hidden="true">·</span>
      <span>Published {formatDate(article.publishedAt)}</span>
      {article.updatedAt && (
        <>
          <span aria-hidden="true">·</span>
          <span>Updated {formatDate(article.updatedAt)}</span>
        </>
      )}
    </div>
  );
}

/* ---------------- Affiliate disclosure ---------------- */
export function Disclosure() {
  return (
    <div
      className="module-border mb-8 border-l-2 border-l-moss p-4 sm:p-5"
      role="note"
      aria-label="Affiliate disclosure"
    >
      <p className="text-[13px] leading-relaxed text-stone">
        <span className="font-semibold uppercase tracking-[0.12em] text-moss-deep">
          Disclosure —{' '}
        </span>
        Some links on this page are affiliate links, which means Nest Nabber may
        earn a small commission if you make a purchase. Prices are checked at
        time of publishing and can change; we only include products we would
        recommend to our own homes.{' '}
        <Link
          href="/affiliate-disclosure"
          className="underline decoration-line underline-offset-2 hover:decoration-charcoal"
        >
          Read the full disclosure
        </Link>
        .
      </p>
    </div>
  );
}

/* ---------------- In-article CTA module (Shop the Look / Best Products etc.) ---------------- */
export function CtaBlock({
  eyebrow,
  title,
  text,
  href,
  ctaLabel,
  src,
  alt,
}: {
  eyebrow?: string;
  title: string;
  text: string;
  href: string;
  ctaLabel: string;
  src?: string;
  alt?: string;
}) {
  return (
    <aside className="my-10 overflow-hidden border border-line bg-paper">
      <div className="grid md:grid-cols-[1.1fr_1fr]">
        {src && (
          <div className="card-media aspect-[16/10] md:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt ?? title}
              loading="lazy"
              className="h-full"
            />
          </div>
        )}
        <div className="flex flex-col justify-center p-6 sm:p-8">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h3 className="mt-2 font-serif text-[24px] font-medium leading-snug text-charcoal">
            {title}
          </h3>
          <p className="mt-3 text-[14.5px] leading-relaxed text-stone">
            {text}
          </p>
          <Link href={href} className="btn-primary mt-6 w-fit">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </aside>
  );
}

/* ---------------- Contextual links ---------------- */
export function ContextLinks({
  title,
  links,
}: {
  title: string;
  links: { title: string; href: string }[];
}) {
  return (
    <div className="my-10">
      <p className="eyebrow mb-3">{title}</p>
      <ul className="divide-y divide-line-soft border-y border-line-soft">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex items-center justify-between gap-4 py-3.5 font-serif text-[16.5px] font-medium text-charcoal transition-colors hover:text-clay-deep"
            >
              {l.title}
              <span className="text-stone transition-all group-hover:translate-x-1 group-hover:text-charcoal">
                <Arrow />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Author bio ---------------- */
export function AuthorBio({ article }: { article: Article }) {
  const bio = article.authorBio || `Articles by ${article.author}.`;
  const initials = article.author
    .split(' ')
    .map((n) => n[0])
    .join('');
  return (
    <section
      className="module-border mt-12 p-6 sm:p-8"
      aria-label="About the author"
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-moss/15 font-serif text-[17px] font-medium text-moss-deep"
        >
          {initials}
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
            About the author
          </p>
          <p className="mt-1 font-serif text-[17px] font-medium text-charcoal">
            {article.author}
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-stone">{bio}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Related content sections ---------------- */
export function RelatedGrid({
  eyebrow,
  title,
  articles,
  link,
}: {
  eyebrow: string;
  title: string;
  articles: Article[];
  link?: { label: string; href: string };
}) {
  if (!articles.length) return null;
  return (
    <section className="mt-16">
      <SectionHeader eyebrow={eyebrow} title={title} link={link} />
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 min-[430px]:grid-cols-2 md:grid-cols-4">
        {articles.map((a) => (
          <CompactCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}

export function PlanYourRoom({
  links,
}: {
  links: { title: string; href: string }[];
}) {
  return (
    <section className="mt-16">
      <SectionHeader eyebrow="Keep Planning" title="Plan Your Room" />
      <div className="grid gap-x-10 md:grid-cols-2">
        {links.map((l) => (
          <TextLinkCard key={l.href} href={l.href} title={l.title} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- Newsletter band ---------------- */
export function NewsletterBand() {
  return (
    <section className="newsletter-band" aria-label="Newsletter">
      <h2>Get More Beautiful Home Ideas</h2>
      <p className="newsletter-benefit">
        Interior inspiration, organization ideas and curated finds.
      </p>
      <NewsletterForm />
    </section>
  );
}

/* ---------------- Original explanatory diagram: bedroom light layers ---------------- */
export function LightingDiagram() {
  return (
    <figure
      className="my-10 border border-line bg-paper p-5 sm:p-7"
      role="img"
      aria-label="Diagram of the three layers of bedroom lighting: ambient from the ceiling, task at bedside height, and accent washing the headboard wall"
    >
      <svg
        viewBox="0 0 560 240"
        fill="none"
        className="w-full"
        aria-hidden="true"
      >
        {/* room */}
        <rect
          x="20"
          y="20"
          width="520"
          height="190"
          stroke="#22211f"
          strokeWidth="1.5"
        />
        {/* bed */}
        <rect
          x="200"
          y="120"
          width="160"
          height="70"
          stroke="#22211f"
          strokeWidth="1.5"
        />
        <rect
          x="200"
          y="100"
          width="160"
          height="20"
          fill="#efeade"
          stroke="#22211f"
          strokeWidth="1.5"
        />
        {/* ambient */}
        <circle cx="280" cy="52" r="14" stroke="#596553" strokeWidth="1.5" />
        <path
          d="M280 66v10M262 82l-14 14M298 82l14 14"
          stroke="#596553"
          strokeWidth="1.2"
          strokeDasharray="3 4"
        />
        <text
          x="316"
          y="56"
          fontSize="12"
          fill="#22211f"
          fontFamily="Georgia, serif"
        >
          Ambient — the ceiling, dimmed low
        </text>
        {/* task left */}
        <rect
          x="120"
          y="128"
          width="26"
          height="62"
          stroke="#a9765d"
          strokeWidth="1.5"
        />
        <path
          d="M112 128h42l-8-16h-26z"
          fill="#f7f4ee"
          stroke="#a9765d"
          strokeWidth="1.5"
        />
        <path
          d="M114 150h38"
          stroke="#a9765d"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <text
          x="60"
          y="120"
          fontSize="12"
          fill="#22211f"
          fontFamily="Georgia, serif"
        >
          Task — bedside, 16–20 in above the mattress
        </text>
        {/* accent right */}
        <rect
          x="420"
          y="88"
          width="12"
          height="24"
          stroke="#596553"
          strokeWidth="1.5"
        />
        <path
          d="M426 112v40"
          stroke="#596553"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <path
          d="M404 76q22-18 44 0"
          stroke="#596553"
          strokeWidth="1.2"
          strokeDasharray="3 4"
        />
        <text
          x="330"
          y="196"
          fontSize="12"
          fill="#22211f"
          fontFamily="Georgia, serif"
        >
          Accent — a sconce washing the headboard wall
        </text>
        {/* floor line */}
        <path d="M20 190h520" stroke="#22211f" strokeWidth="1" opacity="0.35" />
      </svg>
      <figcaption className="mt-4 text-[12.5px] text-stone">
        The three layers, to scale: ambient sets the base, task works at reading
        height, and accent adds the glow. Any two of the three is better than
        one.
      </figcaption>
    </figure>
  );
}
