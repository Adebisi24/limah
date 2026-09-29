'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { usePathname, useRouter } from 'next/navigation';
import {
  readFlags,
  SAVED_KEY,
  subscribeToInteractions,
} from '@/lib/interactions';

import { MAIN_NAVIGATION, SEARCH_SUGGESTIONS } from '@/lib/navigation';
import {
  ArrowIcon,
  Chevron,
  SearchIcon,
  BookmarkIcon,
} from './navigation-icons';

export function Masthead() {
  const pathname = usePathname();
  return <MastheadContent key={pathname} />;
}

function MastheadContent() {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const savedCount = useSyncExternalStore(
    subscribeToInteractions,
    () => readFlags(SAVED_KEY).length,
    () => 0,
  );
  const modalRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (desktopRef.current && !desktopRef.current.contains(e.target as Node))
        setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (openMenu)
          document
            .querySelector<HTMLElement>(
              `[aria-controls="nav-${MAIN_NAVIGATION.find((i) => i.label === openMenu)?.href.slice(1)}"]`,
            )
            ?.focus();
        setOpenMenu(null);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('pointerdown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [openMenu]);

  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!mobileOpen && !searchOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const background = [...document.body.children].filter(
      (el) => el instanceof HTMLElement && !el.hasAttribute('data-nn-overlay'),
    ) as HTMLElement[];
    const priorInert = background.map((el) => el.inert);
    background.forEach((el) => {
      el.inert = true;
    });
    const panel = modalRef.current;
    panel?.querySelector<HTMLElement>(searchOpen ? 'input' : 'button')?.focus();
    const trap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !panel) return;
      const items = [
        ...panel.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),[tabindex="0"]',
        ),
      ].filter((el) => el.getClientRects().length);
      const first = items[0],
        last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', trap);
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((el, i) => {
        el.inert = priorInert[i];
      });
      document.removeEventListener('keydown', trap);
      previousFocus?.focus();
    };
  }, [mobileOpen, searchOpen]);

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get('q');
    const value = typeof q === 'string' ? q.trim() : '';
    setSearchOpen(false);
    router.push(value ? `/search?q=${encodeURIComponent(value)}` : '/search');
  };

  const isSectionActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/95 backdrop-blur">
      {/* Slim editorial strip */}
      <div className="hidden border-b border-line-soft md:block">
        <div className="container-nn flex h-9 items-center justify-between text-[11px] tracking-[0.08em] text-stone">
          <p className="uppercase">Interior · Organization · Shopping</p>
          <p className="uppercase">
            Independent editorial — shopping links are affiliate-supported
          </p>
        </div>
      </div>

      <div className="container-nn" ref={desktopRef}>
        <div className="flex h-[64px] items-center justify-between gap-4">
          <Link href="/" className="shrink-0" aria-label="Nest Nabber — home">
            <span className="font-serif text-[26px] font-medium tracking-[-0.02em] text-charcoal">
              Nest <span className="italic text-moss-deep">Nabber</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {MAIN_NAVIGATION.map((item) => {
              const open = openMenu === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node))
                      setOpenMenu(null);
                  }}
                >
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      aria-current={
                        isSectionActive(item.href) ? 'page' : undefined
                      }
                      className={`rounded-[3px] py-2 pl-3 pr-1 text-[13.5px] font-medium tracking-[0.01em] transition-colors ${
                        isSectionActive(item.href)
                          ? 'text-charcoal'
                          : 'text-stone hover:text-charcoal'
                      }`}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={`Toggle ${item.label} menu`}
                      aria-expanded={open}
                      aria-controls={`nav-${item.href.slice(1)}`}
                      onClick={() => setOpenMenu(open ? null : item.label)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          setOpenMenu(item.label);
                          requestAnimationFrame(() =>
                            document
                              .getElementById(`nav-${item.href.slice(1)}`)
                              ?.querySelector<HTMLElement>('a')
                              ?.focus(),
                          );
                        }
                      }}
                      className="rounded-[3px] py-3 pl-0.5 pr-3 text-stone transition-colors hover:text-charcoal"
                    >
                      <Chevron open={open} />
                    </button>
                  </div>

                  {open && (
                    <div
                      id={`nav-${item.href.slice(1)}`}
                      className="absolute left-1/2 top-full z-50 w-max -translate-x-1/2 pt-2"
                      onMouseLeave={() => setOpenMenu(null)}
                    >
                      <div
                        className={`${item.secondary ? 'w-[440px]' : 'w-[300px]'} rounded-[4px] border border-line bg-paper p-2 shadow-[0_12px_32px_rgba(34,33,31,0.10)]`}
                      >
                        {item.secondaryTitle && item.secondary ? (
                          <div className="grid grid-cols-[1fr_170px] gap-x-4">
                            <ul className="py-1">
                              {item.children.map((c) => (
                                <li key={c.href}>
                                  <Link
                                    href={c.href}
                                    onClick={() => setOpenMenu(null)}
                                    className="block rounded-[3px] px-2.5 py-2 text-[13.5px] text-ink-soft transition-colors hover:bg-ivory hover:text-charcoal"
                                  >
                                    {c.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <div className="border-l border-line-soft py-1 pl-4">
                              <p className="eyebrow mb-1.5 px-2.5">
                                {item.secondaryTitle}
                              </p>
                              <ul>
                                {item.secondary!.map((c) => (
                                  <li key={c.href}>
                                    <Link
                                      href={c.href}
                                      onClick={() => setOpenMenu(null)}
                                      className="block rounded-[3px] px-2.5 py-[7px] text-[13px] text-stone transition-colors hover:bg-ivory hover:text-charcoal"
                                    >
                                      {c.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <ul className="py-1">
                            {item.children.map((c) => (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  onClick={() => setOpenMenu(null)}
                                  className="block rounded-[3px] px-2.5 py-2 text-[13.5px] text-ink-soft transition-colors hover:bg-ivory hover:text-charcoal"
                                >
                                  {c.desc ? (
                                    <span className="block">
                                      <span className="block font-medium">
                                        {c.label}
                                      </span>
                                      <span className="block text-[12px] text-stone">
                                        {c.desc}
                                      </span>
                                    </span>
                                  ) : (
                                    c.label
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                        {item.footer && (
                          <Link
                            href={item.footer.href}
                            onClick={() => setOpenMenu(null)}
                            className="mt-1 flex items-center gap-2 rounded-[3px] border-t border-line-soft px-2.5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-moss-deep transition-colors hover:text-clay-deep"
                          >
                            {item.footer.label}
                            <ArrowIcon />
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="flex h-10 w-10 items-center justify-center rounded-[3px] text-ink-soft transition-colors hover:bg-ivory-deep hover:text-charcoal"
            >
              <SearchIcon />
            </button>
            <Link
              href="/saved"
              aria-label={`Saved articles${savedCount ? `, ${savedCount} saved` : ''}`}
              className={`relative flex h-10 w-10 items-center justify-center rounded-[3px] transition-colors hover:bg-ivory-deep ${
                savedCount
                  ? 'text-moss-deep'
                  : 'text-ink-soft hover:text-charcoal'
              }`}
            >
              <BookmarkIcon filled={savedCount > 0} />
              {savedCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-moss px-1 text-[10px] font-semibold text-paper">
                  {savedCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileGroup(null);
                setMobileOpen(true);
              }}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-[3px] transition-colors hover:bg-ivory-deep lg:hidden"
            >
              <span className="h-[1.5px] w-5 bg-charcoal" />
              <span className="h-[1.5px] w-5 bg-charcoal" />
              <span className="h-[1.5px] w-5 bg-charcoal" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen &&
        createPortal(
          <div
            data-nn-overlay
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 top-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-charcoal/30"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 top-0 max-h-[calc(100dvh-40px)] overflow-y-auto border-b border-line bg-ivory pb-8">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="font-serif text-[22px] font-medium">
                  Nest <span className="italic text-moss-deep">Nabber</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-[3px] text-ink-soft"
                >
                  <svg
                    viewBox="0 0 18 18"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 2l14 14M16 2L2 16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="px-5 pt-4">
                <label htmlFor="mobile-search" className="sr-only">
                  Search Nest Nabber
                </label>
                <div className="flex items-center gap-2 rounded-[3px] border border-line bg-paper px-3">
                  <span className="text-stone">
                    <SearchIcon className="h-4 w-4" />
                  </span>
                  <input
                    id="mobile-search"
                    type="search"
                    placeholder="Search ideas, rooms, products…"
                    className="h-12 w-full bg-transparent text-[15px] text-charcoal placeholder:text-stone/70 focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const q = e.currentTarget.value.trim();
                        setMobileOpen(false);
                        router.push(
                          q ? `/search?q=${encodeURIComponent(q)}` : '/search',
                        );
                      }
                    }}
                  />
                </div>
              </div>

              <nav
                aria-label="Mobile"
                className="mt-2 border-t border-line-soft"
              >
                {MAIN_NAVIGATION.map((item) => {
                  const open = mobileGroup === item.label;
                  return (
                    <div key={item.label} className="border-b border-line-soft">
                      <div className="flex items-stretch">
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex flex-1 items-center px-5 py-4 text-[16px] font-medium text-charcoal"
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-label={`${open ? 'Collapse' : 'Expand'} ${item.label}`}
                          onClick={() =>
                            setMobileGroup(open ? null : item.label)
                          }
                          className="flex w-14 items-center justify-center border-l border-line-soft text-stone"
                        >
                          <Chevron open={open} />
                        </button>
                      </div>
                      {open && (
                        <div className="pb-2">
                          {item.children.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex min-h-[44px] items-center px-8 py-2.5 text-[14.5px] text-ink-soft"
                            >
                              {c.label}
                            </Link>
                          ))}
                          {item.secondary &&
                            item.secondary.map((c) => (
                              <Link
                                key={c.href}
                                href={c.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex min-h-[40px] items-center px-8 py-2 text-[13.5px] text-stone"
                              >
                                {c.label}
                              </Link>
                            ))}
                          {item.footer && (
                            <Link
                              href={item.footer.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex min-h-[44px] items-center gap-2 px-8 py-2.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-moss-deep"
                            >
                              {item.footer.label}
                              <ArrowIcon />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className="px-5 pt-4 text-[12px] uppercase tracking-[0.12em] text-stone">
                <Link
                  href="/saved"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 py-2 text-ink-soft"
                >
                  <BookmarkIcon className="h-4 w-4" /> Saved articles
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* Search overlay */}
      {searchOpen &&
        createPortal(
          <div
            data-nn-overlay
            ref={modalRef}
            className="fixed inset-0 z-[60] overflow-y-auto bg-ivory"
            role="dialog"
            aria-modal="true"
            aria-label="Search Nest Nabber"
          >
            <div className="container-nn flex min-h-[220px] flex-col justify-center py-16">
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="mb-8 flex items-center gap-2 self-end text-[12px] font-semibold uppercase tracking-[0.14em] text-stone transition-colors hover:text-charcoal"
              >
                Close
                <svg
                  viewBox="0 0 14 14"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <form
                onSubmit={submitSearch}
                className="flex items-end gap-3 border-b-2 border-charcoal pb-3"
              >
                <label htmlFor="search-overlay-input" className="sr-only">
                  Search Nest Nabber
                </label>
                <input
                  id="search-overlay-input"
                  ref={searchInputRef}
                  name="q"
                  type="search"
                  placeholder="Search articles, rooms, products…"
                  className="w-full bg-transparent font-serif text-[32px] font-medium text-charcoal placeholder:text-stone/50 focus:outline-none sm:text-[44px]"
                  autoComplete="off"
                />
                <button type="submit" className="btn-primary shrink-0">
                  Search
                </button>
              </form>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-[12px] uppercase tracking-[0.12em] text-stone">
                  Popular:
                </span>
                {SEARCH_SUGGESTIONS.map((s) => (
                  <Link
                    key={s.q}
                    href={`/search?q=${encodeURIComponent(s.q)}`}
                    onClick={() => setSearchOpen(false)}
                    className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[13px] text-ink-soft transition-colors hover:border-charcoal"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
