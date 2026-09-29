'use client';

import { useSyncExternalStore } from 'react';
import {
  LIKED_KEY,
  SAVED_KEY,
  hasFlag,
  toggleFlag,
  subscribeToInteractions,
} from '@/lib/interactions';

function HeartIcon({
  filled,
  className = 'h-[17px] w-[17px]',
}: {
  filled: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill={filled ? 'currentColor' : 'none'}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 16.5l-5.8-5.6A3.6 3.6 0 017.1 5.4 3.9 3.9 0 0110 6.9a3.9 3.9 0 012.9-1.5 3.6 3.6 0 011.9 5.5L10 16.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function BookmarkIcon({
  filled,
  className = 'h-[17px] w-[17px]',
}: {
  filled: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 18 20"
      fill={filled ? 'currentColor' : 'none'}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 2.5h10a1 1 0 011 1V18l-6-4-6 4V3.5a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Like + Save row shown on every published article. Device-local, no accounts. */
export function ArticleActions({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const liked = useSyncExternalStore(
    subscribeToInteractions,
    () => hasFlag(LIKED_KEY, slug),
    () => false,
  );
  const saved = useSyncExternalStore(
    subscribeToInteractions,
    () => hasFlag(SAVED_KEY, slug),
    () => false,
  );

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-pressed={liked}
        aria-label={liked ? `Unlike ${title}` : `Like ${title}`}
        onClick={() => toggleFlag(LIKED_KEY, slug)}
        className={`inline-flex min-h-[42px] items-center gap-2 rounded-[3px] border px-4 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors ${
          liked
            ? 'border-clay bg-clay/10 text-clay-deep'
            : 'border-line bg-paper text-stone hover:border-charcoal hover:text-charcoal'
        }`}
      >
        <HeartIcon filled={liked} />
        {liked ? 'Liked' : 'Like'}
      </button>
      <button
        type="button"
        aria-pressed={saved}
        aria-label={
          saved
            ? `Remove ${title} from saved articles`
            : `Save ${title} for later`
        }
        onClick={() => toggleFlag(SAVED_KEY, slug)}
        className={`inline-flex min-h-[42px] items-center gap-2 rounded-[3px] border px-4 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors ${
          saved
            ? 'border-moss bg-moss/10 text-moss-deep'
            : 'border-line bg-paper text-stone hover:border-charcoal hover:text-charcoal'
        }`}
      >
        <BookmarkIcon filled={saved} />
        {saved ? 'Saved' : 'Save'}
      </button>
    </div>
  );
}

/** Single remove button used on the Saved Articles page. */
export function RemoveSaveButton({ slug }: { slug: string }) {
  const saved = useSyncExternalStore(
    subscribeToInteractions,
    () => hasFlag(SAVED_KEY, slug),
    () => false,
  );
  return (
    <button
      type="button"
      onClick={() => toggleFlag(SAVED_KEY, slug)}
      disabled={!saved}
      aria-label={`Remove saved article`}
      className="inline-flex min-h-[36px] items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone transition-colors hover:text-charcoal"
    >
      <svg viewBox="0 0 14 14" className="h-3 w-3" aria-hidden="true">
        <path
          d="M1 1l12 12M13 1L1 13"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      Remove
    </button>
  );
}
