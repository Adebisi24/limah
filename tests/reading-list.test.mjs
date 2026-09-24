import test from 'node:test';
import assert from 'node:assert/strict';
import {
  readList,
  toggleItem,
  safeRetailerUrl,
} from '../web/src/lib/reading-list.mjs';
const memory = () => {
  const data = new Map();
  return { getItem: (k) => data.get(k), setItem: (k, v) => data.set(k, v) };
};
test('saving and removing survive a fresh read without duplicate IDs', () => {
  const s = memory();
  assert.equal(toggleItem(s, 'saved', 'a'), true);
  assert.deepEqual(readList(s, 'saved'), ['a']);
  assert.equal(toggleItem(s, 'saved', 'a'), false);
  assert.deepEqual(readList(s, 'saved'), []);
});
test('corrupt and unexpected browser data do not crash the reading list', () => {
  const s = memory();
  for (const bad of ['broken', '{}', 'null', '42']) {
    s.setItem('saved', bad);
    assert.deepEqual(readList(s, 'saved'), []);
  }
  s.setItem('saved', '["a",null,12]');
  assert.deepEqual(readList(s, 'saved'), ['a']);
});
test('blocked browser storage reports failure instead of false success', () => {
  const s = {
    getItem: () => null,
    setItem: () => {
      throw Error('blocked');
    },
  };
  assert.throws(() => toggleItem(s, 'saved', 'a'), /blocked/);
});
test('retailer URLs reject executable and invalid schemes', () => {
  assert.equal(safeRetailerUrl('javascript:alert(1)'), null);
  assert.equal(safeRetailerUrl('data:text/html,bad'), null);
  assert.equal(safeRetailerUrl('/relative'), null);
  assert.equal(
    safeRetailerUrl('https://example.com/product'),
    'https://example.com/product',
  );
});
