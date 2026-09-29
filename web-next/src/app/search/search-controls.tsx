'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'design', label: 'Interior Design' },
  { id: 'organization', label: 'Organization' },
  { id: 'shopping', label: 'Shopping' },
];

export function SearchControls({
  initialQ,
  initialGroup,
  filters,
}: {
  initialQ: string;
  initialGroup: string;
  filters: readonly { id: string; label: string }[];
}) {
  const router = useRouter();
  const [q, setQ] = useState(initialQ);
  const [group, setGroup] = useState(initialGroup);

  const go = (nextQ: string, nextGroup: string) => {
    const params = new URLSearchParams();
    if (nextQ.trim()) params.set('q', nextQ.trim());
    if (nextGroup !== 'all') params.set('f', nextGroup);
    const qs = params.toString();
    router.push(qs ? `/search?${qs}` : '/search');
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        go(q, group);
      }}
      className="flex flex-col gap-3"
    >
      <div className="flex gap-2">
        <div className="flex flex-1 items-center gap-2.5 rounded-[3px] border border-line bg-ivory px-3.5">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="h-[18px] w-[18px] text-stone"
            aria-hidden="true"
          >
            <circle
              cx="9"
              cy="9"
              r="6"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M13.5 13.5L17 17"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <label htmlFor="search-page-input" className="sr-only">
            Search articles
          </label>
          <input
            id="search-page-input"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles, rooms, products…"
            className="h-12 w-full bg-transparent text-[15px] text-charcoal placeholder:text-stone/60 focus:outline-none"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn-primary h-12 shrink-0">
          Search
        </button>
      </div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter results"
      >
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={group === f.id}
            onClick={() => {
              setGroup(f.id);
              go(q, f.id);
            }}
            className={`rounded-full border px-4 py-2 text-[12.5px] font-medium transition-colors ${
              group === f.id
                ? 'border-charcoal bg-charcoal text-paper'
                : 'border-line bg-paper text-ink-soft hover:border-charcoal'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </form>
  );
}
