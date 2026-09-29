import Link from 'next/link';
import type { Article } from '@/lib/types';
import { FORMAT_LABELS } from '@/lib/types';

export function Arrow({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      className={className}
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
  );
}

export function SectionHeader({
  eyebrow,
  title,
  link,
  id,
}: {
  eyebrow?: string;
  title: string;
  link?: { label: string; href: string };
  id?: string;
}) {
  return (
    <div
      id={id}
      className="mb-8 flex flex-col items-start justify-between gap-4 border-t border-charcoal/70 pt-5 sm:flex-row sm:items-end"
    >
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="h-section text-[28px] sm:text-[32px]">{title}</h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="link-quiet flex shrink-0 items-center gap-2 pb-1"
        >
          {link.label}
          <Arrow />
        </Link>
      )}
    </div>
  );
}

/** Standard editorial card: image, category, title. */
export function StandardCard({ article }: { article: Article }) {
  return (
    <Link href={`/story/${article.slug}`} className="group block">
      <div className="card-media aspect-[3/2]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.imageUrl}
          alt={article.imageAlt ?? article.title}
          loading="lazy"
        />
      </div>
      <p className="eyebrow mt-4">{article.category}</p>
      <h3 className="card-title mt-1.5 text-[19px] transition-colors group-hover:text-clay-deep">
        {article.title}
      </h3>
    </Link>
  );
}

/** Compact related card: image + title. Side-by-side on mobile, stacked on desktop. */
export function CompactCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/story/${article.slug}`}
      className="group flex items-center gap-3 min-[430px]:flex-col min-[430px]:gap-0"
    >
      <div className="card-media aspect-[3/2] w-[104px] shrink-0 sm:aspect-[3/2] min-[430px]:w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.imageUrl}
          alt={article.imageAlt ?? article.title}
          loading="lazy"
        />
      </div>
      <div className="min-w-0 break-words min-[430px]:pt-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
          {FORMAT_LABELS[article.format]}
        </p>
        <h3 className="mt-1 line-clamp-3 font-serif text-[15.5px] font-medium leading-snug text-charcoal transition-colors group-hover:text-clay-deep sm:text-[16.5px]">
          {article.title}
        </h3>
      </div>
    </Link>
  );
}

/** Featured story card: large image, category, large title, description, CTA. */
export function FeaturedCard({
  article,
  ctaLabel = 'Read Story',
}: {
  article: Article;
  ctaLabel?: string;
}) {
  return (
    <Link href={`/story/${article.slug}`} className="group block">
      <div className="card-media aspect-[16/10] sm:aspect-[16/9]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.imageUrl}
          alt={article.imageAlt ?? article.title}
          loading="lazy"
        />
      </div>
      <p className="eyebrow mt-5">{article.category}</p>
      <h3 className="card-title mt-2 text-[28px] transition-colors group-hover:text-clay-deep sm:text-[34px]">
        {article.title}
      </h3>
      {article.description && (
        <p className="mt-3 max-w-[520px] text-[15px] leading-relaxed text-stone">
          {article.description}
        </p>
      )}
      <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-moss-deep transition-colors group-hover:text-clay-deep">
        {ctaLabel}
        <Arrow className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

/** Text link card: used for Plan Your Room, buying guide links, etc. No images. */
export function TextLinkCard({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start justify-between gap-4 border-b border-line-soft py-4 transition-colors hover:border-charcoal"
    >
      <div>
        <p className="font-serif text-[17px] font-medium text-charcoal transition-colors group-hover:text-clay-deep">
          {title}
        </p>
        {desc && <p className="mt-1 text-[13px] text-stone">{desc}</p>}
      </div>
      <span className="mt-1.5 text-stone transition-all group-hover:translate-x-1 group-hover:text-charcoal">
        <Arrow className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
