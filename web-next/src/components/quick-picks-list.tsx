'use client';

import { useId, useState, type ReactNode } from 'react';

/** Keep the mobile overview short without removing any product reviews. */
export function QuickPicksList({
  children,
  count,
  firstProductId,
}: {
  children: ReactNode;
  count: number;
  firstProductId?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  return (
    <>
      <ul
        id={listId}
        data-expanded={expanded}
        className="quick-picks-list mt-5 grid gap-4 md:grid-cols-2"
      >
        {children}
      </ul>
      {count > 4 && (
        <div className="mt-4 flex flex-col items-start gap-3 md:hidden">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={listId}
            onClick={() => setExpanded(!expanded)}
            className="btn-outline min-h-[44px] text-[11px]"
          >
            {expanded ? 'Show fewer picks' : `Show all ${count} picks`}
          </button>
          {firstProductId !== undefined && (
            <a
              href={`#p-${firstProductId}`}
              className="py-2 text-[12px] text-moss-deep underline underline-offset-4"
            >
              Skip to product reviews &darr;
            </a>
          )}
        </div>
      )}
    </>
  );
}
