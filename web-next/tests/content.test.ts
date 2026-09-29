import test from 'node:test';
import assert from 'node:assert/strict';
import { demoArticles, demoProducts } from '../src/lib/demo-content';
import { productIdsFromBody } from '../src/lib/articles';
import { filterArticles } from '../src/lib/search';
import { readFlags, toggleFlag, SAVED_KEY } from '../src/lib/interactions';
import { safeRetailerUrl } from '../src/lib/retailer';

test('all supplied articles have unique slugs and resolve every product reference', () => {
  assert.equal(demoArticles.length, 40);
  assert.equal(
    new Set(demoArticles.map((a) => a.slug)).size,
    demoArticles.length,
  );
  const ids = new Set(demoProducts.map((p) => p.id));
  for (const a of demoArticles)
    for (const id of productIdsFromBody(a.body))
      assert.ok(ids.has(id), a.slug + ' references ' + id);
});
test('search handles multiple words, format names, filters and empty queries', () => {
  const result = filterArticles(demoArticles, {
    q: 'bedroom lighting',
    group: 'shopping',
  });
  assert.ok(result.some((a) => a.slug === 'how-to-choose-bedroom-lighting'));
  assert.ok(
    result.every((a) =>
      ['finds', 'best-products', 'buying-guide', 'shop-the-look'].includes(
        a.format,
      ),
    ),
  );
  assert.ok(
    filterArticles(demoArticles, { q: 'shop the look', group: 'all' }).some(
      (a) => a.format === 'shop-the-look',
    ),
  );
  assert.deepEqual(filterArticles(demoArticles, { q: '  ', group: 'all' }), []);
  assert.deepEqual(
    filterArticles(demoArticles, { q: 'zzzz-no-result', group: 'all' }),
    [],
  );
});
test('reading list migrates previous IDs once and survives corrupt or blocked storage', () => {
  const data = new Map<string, string>([
    ['nest-saved', '["demo-15-master-modern-luxury-bedroom-design-ideas"]'],
  ]);
  const storage = {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => {
      data.set(k, v);
    },
  };
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { localStorage: storage, dispatchEvent: () => true },
  });
  assert.deepEqual(readFlags(SAVED_KEY), ['15-modern-luxury-bedroom-ideas']);
  assert.equal(toggleFlag(SAVED_KEY, '15-modern-luxury-bedroom-ideas'), false);
  assert.deepEqual(
    readFlags(SAVED_KEY),
    [],
    'legacy saves must not reappear after removal',
  );
  data.set(SAVED_KEY, 'not-json');
  assert.deepEqual(readFlags(SAVED_KEY), []);
  storage.setItem = () => {
    throw new Error('Storage blocked');
  };
  assert.equal(toggleFlag(SAVED_KEY, 'another-story'), false);
  Reflect.deleteProperty(globalThis, 'window');
});
test('retailer links reject script schemes and keep legitimate URLs', () => {
  assert.equal(safeRetailerUrl('javascript:alert(1)'), null);
  assert.equal(safeRetailerUrl('data:text/html,test'), null);
  assert.equal(
    safeRetailerUrl('https://example.com/product'),
    'https://example.com/product',
  );
});
