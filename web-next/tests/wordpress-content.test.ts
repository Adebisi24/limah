import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareWordPressContent } from '../../scripts/wordpress-content';

test('WordPress editorial notes become metadata without losing article text', () => {
  const result = prepareWordPressContent(
    '<p>&lt;!-- SEO METADATA Title Tag: A small room</p><p>Meta Description: Ideas for a small room. Slug: small-room --&gt;</p><h1>A Small Room</h1><p>Keep this <strong>article text</strong>.</p><img src="https://example.com/photo.jpg" alt="A room">',
    '',
    '',
  );
  assert.equal(result.title, 'A Small Room');
  assert.equal(result.slug, 'small-room');
  assert.equal(result.seoDescription, 'Ideas for a small room.');
  assert.equal(result.doc.body.textContent, 'Keep this article text.');
  assert.equal(result.doc.querySelectorAll('img').length, 1);
  result.dom.window.close();
});

test('existing titles, slugs, body links, and subheadings are preserved', () => {
  const result = prepareWordPressContent(
    '<h2>Section heading</h2><p><a href="https://example.com">Source</a></p>',
    'Existing title',
    'existing-slug',
  );
  assert.equal(result.title, 'Existing title');
  assert.equal(result.slug, 'existing-slug');
  assert.equal(
    result.doc.querySelector('a')?.getAttribute('href'),
    'https://example.com',
  );
  assert.equal(result.doc.querySelector('h2')?.textContent, 'Section heading');
  result.dom.window.close();
});

test('malformed source link protocols keep readable text without invalid annotations', () => {
  const result = prepareWordPressContent(
    '<p><a href="related:bedrooms">More bedroom ideas</a></p>',
    'Title',
    'title',
  );
  assert.equal(result.doc.querySelector('a'), null);
  assert.equal(result.doc.body.textContent, 'More bedroom ideas');
  result.dom.window.close();
});
