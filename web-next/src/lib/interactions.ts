'use client';
import legacyIds from '@/data/legacy-ids.json';

/**
 * Device-local article interactions (likes + saves).
 * No accounts in V1 — state lives in localStorage and syncs
 * across tabs via the storage event + a custom in-page event.
 */
export const SAVED_KEY = 'nest-nabber:saved';
export const LIKED_KEY = 'nest-nabber:liked';
export const INTERACTION_EVENT = 'nest-nabber:interaction';

export function readFlags(key: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    let raw = window.localStorage.getItem(key);
    if (raw === null) {
      const previous = window.localStorage.getItem(
        key === SAVED_KEY ? 'nest-saved' : 'nest-liked',
      );
      if (previous) {
        const parsed: unknown = JSON.parse(previous);
        if (Array.isArray(parsed)) {
          raw = JSON.stringify([
            ...new Set(
              parsed
                .filter((s): s is string => typeof s === 'string')
                .map((s) => (legacyIds as Record<string, string>)[s] || s),
            ),
          ]);
          window.localStorage.setItem(key, raw);
        }
      }
    }
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((x) => typeof x === 'string')
      : [];
  } catch {
    return [];
  }
}

export function writeFlags(key: string, flags: string[]) {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(flags));
    window.dispatchEvent(new Event(INTERACTION_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function hasFlag(key: string, slug: string): boolean {
  return readFlags(key).includes(slug);
}

export function toggleFlag(key: string, slug: string): boolean {
  const flags = readFlags(key);
  const next = flags.includes(slug)
    ? flags.filter((f) => f !== slug)
    : [...flags, slug];
  return writeFlags(key, next) ? next.includes(slug) : flags.includes(slug);
}

/** Subscribe to device-local changes in this tab and other tabs. */
export function subscribeToInteractions(refresh: () => void) {
  window.addEventListener('storage', refresh);
  window.addEventListener(INTERACTION_EVENT, refresh);
  return () => {
    window.removeEventListener('storage', refresh);
    window.removeEventListener(INTERACTION_EVENT, refresh);
  };
}
