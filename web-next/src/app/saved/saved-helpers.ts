import { readFlags, writeFlags, SAVED_KEY } from '@/lib/interactions';

export { readFlags, writeFlags, SAVED_KEY };

export function formatDateSafe(d: Date): string {
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
