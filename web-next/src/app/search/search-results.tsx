'use client';
import { useSearchParams } from 'next/navigation';
import type { Article } from '@/lib/types';
import { filterArticles } from '@/lib/search';
import Link from 'next/link';

import { SearchControls } from './search-controls';
import { NewsletterBand } from '@/components/chrome';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'design', label: 'Interior Design' },
  { id: 'organization', label: 'Organization' },
  { id: 'shopping', label: 'Shopping' },
] as const;

export default function SearchResults({ articles }: { articles: Article[] }) {
  const params = useSearchParams();
  const q = params.get('q'),
    f = params.get('f');
  const query = (q ?? '').trim();
  const group = (
    ['design', 'organization', 'shopping'].includes(f ?? '') ? f : 'all'
  ) as 'all' | 'design' | 'organization' | 'shopping';

  const results = query ? filterArticles(articles, { q: query, group }) : [];

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-nn max-w-[820px] py-12">
          <p className="eyebrow">Search Nest Nabber</p>
          <h1 className="mt-3 font-serif text-[34px] font-medium tracking-[-0.02em] text-charcoal sm:text-[42px]">
            Find what your home needs
          </h1>
          <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-stone">
            Search across article titles, rooms, categories, and topics — from
            “bedroom lighting” to “small bathroom storage.”
          </p>
          <div className="mt-7">
            <SearchControls
              key={query + ':' + group}
              initialQ={query}
              initialGroup={group}
              filters={FILTERS}
            />
          </div>
        </div>
      </section>

      <section className="container-nn py-10">
        {!query ? (
          <div className="border border-line bg-paper p-10 text-center">
            <p className="font-serif text-[22px] font-medium text-charcoal">
              What are you looking for?
            </p>
            <p className="mx-auto mt-3 max-w-[420px] text-[14px] text-stone">
              Try a room (“bedroom”), a task (“decluttering”), or a product
              (“area rug”).
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                'bedroom',
                'lighting',
                'storage',
                'rug',
                'shop the look',
                'kitchen',
              ].map((s) => (
                <Link
                  key={s}
                  href={`/search?q=${encodeURIComponent(s)}`}
                  className="rounded-full border border-line bg-ivory px-4 py-2 text-[13px] text-ink-soft transition-colors hover:border-charcoal"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="border border-line bg-paper p-10 text-center">
            <p className="font-serif text-[22px] font-medium text-charcoal">
              No results for “{query}”
            </p>
            <p className="mx-auto mt-3 max-w-[420px] text-[14px] text-stone">
              Try a broader term — the room name, the task, or the product type
              — or clear the filter below.
            </p>
            <Link href="/search" className="btn-outline mt-6">
              Clear search
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-6 text-[13.5px] text-stone" role="status">
              {results.length} {results.length === 1 ? 'result' : 'results'} for{' '}
              <span className="font-medium text-charcoal">“{query}”</span>
              {group !== 'all' && (
                <>
                  {' '}
                  in{' '}
                  <span className="font-medium text-charcoal">
                    {FILTERS.find((x) => x.id === group)?.label}
                  </span>
                </>
              )}
            </p>
            <ul className="divide-y divide-line-soft border-y border-line">
              {results.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/story/${a.slug}`}
                    className="group flex gap-5 py-5"
                  >
                    <div className="card-media aspect-[3/2] w-[120px] shrink-0 sm:w-[150px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.imageUrl}
                        alt={a.imageAlt ?? a.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
                        {a.category}
                        {a.room && a.room !== 'whole-home'
                          ? ` · ${a.room.replace('-', ' ')}`
                          : ''}
                      </p>
                      <h2 className="mt-1.5 font-serif text-[19px] font-medium leading-snug text-charcoal transition-colors group-hover:text-clay-deep sm:text-[21px]">
                        {a.title}
                      </h2>
                      {a.subtitle && (
                        <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-stone">
                          {a.subtitle}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <NewsletterBand />
    </>
  );
}
