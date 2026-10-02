import assert from 'node:assert/strict';
import test from 'node:test';
import { ARTICLE_COLLECTION_SLUGS } from '../../article-collections';
import { classifyArticle } from '../../scripts/classify-article-collections';

test('shopping finds are filed under Home and Shopping', () => {
  const result = classifyArticle({
    title: '15 Amazon Bedroom Finds Worth Discovering',
    kind: 'finds',
    tags: ['bedroom'],
  });
  assert.deepEqual(
    ['home', 'bedroom', 'shopping', 'home-finds', 'shopping-finds'].every(
      (collection) => result.collections.includes(collection),
    ),
    true,
  );
});

test('organization stories receive their parent and specific collections', () => {
  const result = classifyArticle({
    title: '20 Small Bedroom Storage Ideas to Beat the Clutter',
    kind: 'inspiration',
  });
  for (const collection of [
    'home',
    'bedroom',
    'home-organization',
    'bedroom-organization',
    'storage-ideas',
    'decluttering',
    'small-space-organization',
  ]) {
    assert.ok(result.collections.includes(collection), collection);
  }
  assert.equal(result.category, 'Home Organization');
});

test('design topics can belong to room, size, and paint collections together', () => {
  const result = classifyArticle({
    title: '10 Small Kitchen Paint Colors to Open Up Your Space',
  });
  for (const collection of [
    'home',
    'kitchen',
    'interior-design',
    'design-ideas',
    'small-spaces',
    'color-paint',
  ]) {
    assert.ok(result.collections.includes(collection), collection);
  }
});

test('every generated collection is declared in the shared taxonomy', () => {
  const examples = [
    { title: 'The 13 Best Comforters We Tested', tags: ['Best Sellers'] },
    { title: 'Japandi Style for a Calm Home' },
    { title: 'Outdoor Patio Storage Ideas' },
  ];
  for (const example of examples) {
    for (const collection of classifyArticle(example).collections) {
      assert.ok(ARTICLE_COLLECTION_SLUGS.has(collection), collection);
    }
  }
});
