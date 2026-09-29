'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Article } from '@/lib/types';
import {
  readFlags,
  writeFlags,
  SAVED_KEY,
  formatDateSafe,
} from './saved-helpers';
import { RemoveSaveButton } from '@/components/interactions';

export function SavedList({ articles }: { articles: Article[] }) {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => setSaved(readFlags(SAVED_KEY));
    refresh();
    window.addEventListener('storage', refresh);
    window.addEventListener('nest-nabber:interaction', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('nest-nabber:interaction', refresh);
    };
  }, []);

  const savedArticles = articles.filter((a) => saved.includes(a.slug));

  if (savedArticles.length === 0) {
    return (
      <div className="mx-auto max-w-[520px] border border-line bg-paper p-10 text-center">
        <svg
          viewBox="0 0 36 40"
          fill="none"
          className="mx-auto h-10 w-10 text-line"
          aria-hidden="true"
        >
          <path
            d="M8 3h20a2 2 0 012 2v32l-12-8-12 8V5a2 2 0 012-2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        <p className="mt-5 font-serif text-[22px] font-medium text-charcoal">
          Nothing saved yet
        </p>
        <p className="mx-auto mt-3 max-w-[360px] text-[14.5px] leading-relaxed text-stone">
          Save articles you want to revisit later. The Save button is on every
          story — saved pieces show up here, on this device only.
        </p>
        <Link href="/" className="btn-primary mt-7">
          Browse the latest ideas
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-[13.5px] text-stone" role="status">
          {savedArticles.length}{' '}
          {savedArticles.length === 1 ? 'article' : 'articles'} saved on this
          device
        </p>
        <button
          type="button"
          onClick={() => {
            writeFlags(SAVED_KEY, []);
            setSaved([]);
          }}
          className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-stone transition-colors hover:text-charcoal"
        >
          Clear all
        </button>
      </div>
      <ul className="divide-y divide-line-soft border-y border-line">
        {savedArticles.map((a) => (
          <li key={a.slug} className="flex items-center gap-4 py-4 sm:gap-5">
            <Link
              href={`/story/${a.slug}`}
              className="group flex min-w-0 flex-1 items-center gap-4"
            >
              <div className="card-media aspect-[3/2] w-[88px] shrink-0 sm:w-[110px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.imageUrl}
                  alt={a.imageAlt ?? a.title}
                  loading="lazy"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
                  {a.category}
                </p>
                <h2 className="mt-1 line-clamp-2 font-serif text-[17px] font-medium leading-snug text-charcoal transition-colors group-hover:text-clay-deep sm:text-[18.5px]">
                  {a.title}
                </h2>
                <p className="mt-1 text-[12px] text-stone">
                  {formatDateSafe(a.publishedAt)}
                </p>
              </div>
            </Link>
            <RemoveSaveButton slug={a.slug} />
          </li>
        ))}
      </ul>
    </div>
  );
}
