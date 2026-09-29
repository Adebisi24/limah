import { QuickPicksList } from './quick-picks-list';
import Link from 'next/link';
import type { Offer, Product } from '@/lib/types';
import { Arrow } from './cards';
import { safeRetailerUrl } from '@/lib/retailer';

export function formatPrice(price: number | null): string | null {
  if (price == null) return null;
  const fixed = price.toFixed(2);
  return `$${fixed.endsWith('.00') ? fixed.slice(0, -3) : fixed}`;
}

export function RetailerButton({
  offer,
  small = false,
}: {
  offer: Offer;
  small?: boolean;
}) {
  const price = formatPrice(offer.price);
  const label = price
    ? `${price} at ${offer.retailer}`
    : `Check price at ${offer.retailer}`;
  const url = safeRetailerUrl(offer.affiliateUrl);
  if (offer.availability === 'unavailable' || !url) {
    return (
      <span
        aria-disabled="true"
        className={`btn-retailer ${small ? 'btn-retailer-sm' : ''} cursor-not-allowed opacity-50`}
        title="This product is currently unavailable"
      >
        Currently unavailable
      </span>
    );
  }
  return (
    <a
      href={safeRetailerUrl(offer.affiliateUrl)!}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={`btn-retailer ${small ? 'btn-retailer-sm' : ''}`}
    >
      {label}
      <Arrow className="h-2.5 w-2.5" />
    </a>
  );
}

/** Centered row of retailer CTAs. Wraps on desktop, stacks on narrow screens. */
export function OffersRow({
  offers,
  small = false,
}: {
  offers: Offer[];
  small?: boolean;
}) {
  if (!offers.length) return null;
  return (
    <div className="mx-auto flex max-w-[420px] flex-col items-stretch justify-center gap-2 sm:w-fit sm:flex-row sm:flex-wrap sm:items-center">
      {offers.map((o) => (
        <RetailerButton key={o.retailer} offer={o} small={small} />
      ))}
    </div>
  );
}

export function StatusBadge({ status }: { status: 'exact' | 'similar' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] ${
        status === 'exact'
          ? 'border-moss/40 bg-moss/10 text-moss-deep'
          : 'border-clay/40 bg-clay/10 text-clay-deep'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${status === 'exact' ? 'bg-moss' : 'bg-clay'}`}
      />
      {status === 'exact' ? 'Exact Product' : 'Similar Look'}
    </span>
  );
}

/**
 * Full product recommendation.
 * Shopping Finds: name, image, centered CTA, editorial text only.
 * Best Products adds label, Pros/Cons, Best For / Details.
 * Shop the Look adds the Exact / Similar status badge.
 */
export function ProductRec({
  product,
  label,
  text,
  pros,
  cons,
  bestFor,
  details,
  status,
}: {
  product: Product;
  label?: string;
  text: string[];
  pros?: string[];
  cons?: string[];
  bestFor?: string;
  details?: string;
  status?: 'exact' | 'similar';
}) {
  return (
    <article className="border-b border-line-soft pb-10">
      <div className="flex flex-wrap items-center gap-2.5">
        {label && (
          <span className="rounded-[3px] bg-charcoal px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-paper">
            {label}
          </span>
        )}
        {status && <StatusBadge status={status} />}
      </div>
      <h3 className="mt-3 font-serif text-[22px] font-medium leading-snug text-charcoal">
        {product.name}
      </h3>
      {product.brand && (
        <p className="mt-0.5 text-[12px] uppercase tracking-[0.12em] text-stone">
          {product.brand}
        </p>
      )}

      <div className="card-media mx-auto mt-5 aspect-[4/5] max-w-[400px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.imageAlt ?? product.name}
          loading="lazy"
        />
      </div>

      <div className="mt-5 flex justify-center">
        <OffersRow offers={product.offers} />
      </div>

      {(pros || cons) && (
        <div className="mx-auto mt-6 grid max-w-[560px] gap-x-8 gap-y-4 sm:grid-cols-2">
          {pros && (
            <div>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-moss-deep">
                Pros
              </p>
              <ul className="space-y-2">
                {pros.map((p) => (
                  <li
                    key={p}
                    className="flex gap-2 text-[14px] leading-snug text-ink-soft"
                  >
                    <svg
                      viewBox="0 0 14 14"
                      className="mt-1 h-3 w-3 shrink-0 text-moss"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 7.5l3.2 3L12 3.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cons && (
            <div>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-clay-deep">
                Trade-offs
              </p>
              <ul className="space-y-2">
                {cons.map((c) => (
                  <li
                    key={c}
                    className="flex gap-2 text-[14px] leading-snug text-ink-soft"
                  >
                    <svg
                      viewBox="0 0 14 14"
                      className="mt-1.5 h-3 w-3 shrink-0 text-clay"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 7h8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mx-auto mt-6 max-w-[560px]">
        {text.map((t, i) => (
          <p
            key={i}
            className="mb-4 text-[15.5px] leading-[1.75] text-ink-soft"
          >
            {t}
          </p>
        ))}
      </div>

      {(bestFor || details) && (
        <dl className="mx-auto mt-2 max-w-[560px] space-y-2 border-t border-line-soft pt-4">
          {bestFor && (
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
                Best for
              </dt>
              <dd className="text-[14px] text-ink-soft">{bestFor}</dd>
            </div>
          )}
          {details && (
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
                Details
              </dt>
              <dd className="text-[14px] text-ink-soft">{details}</dd>
            </div>
          )}
        </dl>
      )}
    </article>
  );
}

/** Compact quick picks: product, reason, ONE retailer CTA. */
export function QuickPicks({
  picks,
  productMap,
  title = 'Quick Picks',
  intro,
}: {
  picks: {
    productId: number;
    reason: string;
    label?: string;
    retailer?: string;
  }[];
  productMap: Map<number, Product>;
  title?: string;
  intro?: string;
}) {
  const visiblePicks = picks.filter((pick) => productMap.has(pick.productId));
  return (
    <section className="module-border mb-10 p-6 sm:p-8" aria-label={title}>
      <p className="eyebrow">{title}</p>
      {intro && <p className="mt-2 text-[15px] text-stone">{intro}</p>}
      <QuickPicksList
        count={visiblePicks.length}
        firstProductId={visiblePicks[0]?.productId}
      >
        {visiblePicks.map((pick) => {
          const product = productMap.get(pick.productId);
          if (!product) return null;
          const offer =
            (pick.retailer
              ? product.offers.find((o) => o.retailer === pick.retailer)
              : undefined) ?? product.offers[0];
          return (
            <li
              key={`${pick.productId}-${pick.reason}`}
              className="flex gap-4 border border-line-soft bg-ivory/60 p-4"
            >
              <div className="min-w-0 flex-1">
                {pick.label && (
                  <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-clay-deep">
                    {pick.label}
                  </p>
                )}
                <p className="font-serif text-[14px] font-medium leading-snug text-charcoal">
                  {product.name}
                </p>

                {offer && (
                  <div className="mt-3">
                    <RetailerButton offer={offer} small />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </QuickPicksList>
    </section>
  );
}

/** Shop the Look quick shop: numbered text list with price + retailer. */
export function QuickShop({
  items,
  productMap,
  title = 'Quick Shop',
}: {
  items: { productId: number; note?: string }[];
  productMap: Map<number, Product>;
  title?: string;
}) {
  return (
    <section className="module-border mb-10 p-6 sm:p-8" aria-label={title}>
      <p className="eyebrow">{title}</p>
      <ol className="mt-4">
        {items.map((item, idx) => {
          const product = productMap.get(item.productId);
          if (!product) return null;
          const offer = product.offers[0];
          const price = offer ? formatPrice(offer.price) : null;
          return (
            <li
              key={item.productId}
              className="flex items-baseline gap-4 border-b border-line-soft py-3 last:border-0"
            >
              <span className="font-serif text-[15px] italic text-clay-deep">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <a
                  href={`#p-${item.productId}`}
                  className="font-serif text-[14px] font-medium text-charcoal hover:text-clay-deep"
                >
                  {product.name}
                </a>
                {item.note && (
                  <span className="ml-2 text-[13px] text-stone">
                    · {item.note}
                  </span>
                )}
              </div>
              {offer &&
                safeRetailerUrl(offer.affiliateUrl) &&
                offer.availability !== 'unavailable' && (
                  <a
                    href={safeRetailerUrl(offer.affiliateUrl)!}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.08em] text-moss-deep hover:text-clay-deep"
                  >
                    {price
                      ? `${price} at ${offer.retailer}`
                      : `Check price at ${offer.retailer}`}
                  </a>
                )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/** Quick Browse links each product title and price to its retailer. */
export function QuickBrowse({
  items,
  title = 'Quick Browse',
}: {
  items: { name: string; product?: Product }[];
  title?: string;
}) {
  return (
    <section className="module-border mb-10 p-6 sm:p-8" aria-label={title}>
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {items.map((item, i) => {
          const offer = item.product?.offers.find(
            (offer) =>
              offer.availability !== 'unavailable' &&
              safeRetailerUrl(offer.affiliateUrl),
          );
          const url = offer && safeRetailerUrl(offer.affiliateUrl);
          const price = offer ? formatPrice(offer.price) : null;
          return (
            <li
              key={item.name}
              className="flex items-baseline gap-3 border-b border-line-soft py-2.5 last:border-0 sm:[&:nth-last-child(2)]:border-0"
            >
              <span className="font-serif text-[13px] italic text-clay-deep">
                {String(i + 1).padStart(2, '0')}
              </span>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  aria-label={`${item.name} - ${price ?? 'Check price'} at ${offer?.retailer} (opens in a new tab)`}
                  className="text-[13px] font-medium text-charcoal underline underline-offset-4 hover:text-clay-deep"
                >
                  {item.name}
                  <span className="ml-2 whitespace-nowrap text-[11px] text-moss-deep">
                    {price ?? 'Check price'} &rarr;
                  </span>
                </a>
              ) : (
                <span className="text-[13px] font-medium text-charcoal">
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Price ranges use the product's first available, valid retailer offer. */
function ComparisonValue({
  column,
  value,
  product,
}: {
  column: string;
  value: string;
  product?: Product;
}) {
  if (column.trim().toLowerCase() !== 'price range') return <>{value}</>;
  const offer = product?.offers.find(
    (offer) =>
      offer.availability !== 'unavailable' &&
      safeRetailerUrl(offer.affiliateUrl),
  );
  const url = offer && safeRetailerUrl(offer.affiliateUrl);
  if (!offer || !url) return <>{value}</>;
  return (
    <a
      href={url}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className="font-medium text-moss-deep underline underline-offset-4 hover:text-clay-deep"
      aria-label={`${value} \u2014 view ${product?.name} at ${offer.retailer} (opens in a new tab)`}
    >
      {value}
    </a>
  );
}

/** Comparison: real table on desktop, stacked cards on mobile. */
export function Comparison({
  title,
  caption,
  columns,
  rows,
  productMap,
}: {
  title: string;
  caption?: string;
  columns: string[];
  rows: { productId: number; cells: string[] }[];
  productMap: Map<number, Product>;
}) {
  return (
    <section className="mb-10" aria-label={title}>
      <h2 className="nn-h2 !mt-0">{title}</h2>
      {caption && (
        <p className="mb-5 -mt-1 text-[13px] text-stone">{caption}</p>
      )}

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-[3px] border border-line md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-ivory-deep/60">
              <th
                scope="col"
                className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone"
              >
                Product
              </th>
              {columns.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const product = productMap.get(row.productId);
              return (
                <tr key={row.productId} className="border-t border-line-soft">
                  <th
                    scope="row"
                    className="px-4 py-3.5 font-serif text-[15px] font-medium text-charcoal"
                  >
                    {product?.name ?? '—'}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td
                      key={i}
                      className="px-4 py-3.5 text-[13.5px] text-ink-soft"
                    >
                      <ComparisonValue
                        column={columns[i]}
                        value={cell}
                        product={product}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="space-y-3 md:hidden">
        {rows.map((row) => {
          const product = productMap.get(row.productId);
          return (
            <div
              key={row.productId}
              className="border border-line bg-paper p-4"
            >
              <p className="font-serif text-[16px] font-medium text-charcoal">
                {product?.name ?? '—'}
              </p>
              <dl className="mt-3 space-y-2">
                {row.cells.map((cell, i) => (
                  <div
                    key={i}
                    className="flex justify-between gap-4 border-b border-line-soft pb-2 last:border-0 last:pb-0"
                  >
                    <dt className="text-[12px] uppercase tracking-[0.1em] text-stone">
                      {columns[i]}
                    </dt>
                    <dd className="text-right text-[13.5px] text-ink-soft">
                      <ComparisonValue
                        column={columns[i]}
                        value={cell}
                        product={product}
                      />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Buying checklist module. */
export function Checklist({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="module-border mb-10 p-6 sm:p-8" aria-label={title}>
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2.5 text-[14.5px] leading-snug text-ink-soft"
          >
            <svg
              viewBox="0 0 14 14"
              className="mt-1 h-3 w-3 shrink-0 text-moss"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="1.5"
                y="1.5"
                width="11"
                height="11"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path
                d="M4 7.2l2.2 2.2L10.5 5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Design / editorial tip callout. */
export function Tip({
  title = 'Design Tip',
  text,
}: {
  title?: string;
  text: string;
}) {
  return (
    <aside
      className="my-8 border-l-2 border-clay bg-paper p-5 sm:p-6"
      aria-label={title}
    >
      <p className="eyebrow">{title}</p>
      <p className="mt-2 font-serif text-[16.5px] leading-[1.65] text-ink-soft">
        {text}
      </p>
    </aside>
  );
}
