import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('web/dist');
const page = (slug) =>
  fs.readFileSync(path.join(root, slug, 'index.html'), 'utf8');
const sections = (html) =>
  [
    ...html.matchAll(/<section class="section related">([\s\S]*?)<\/section>/g),
  ].map((x) => ({
    title: x[1].match(/<h2>(.*?)<\/h2>/)?.[1],
    count: (x[1].match(/class="card"/g) || []).length,
  }));
test('article templates preserve approved related counts', () => {
  for (const [slug, counts] of [
    ['modern-luxury-bedroom-ideas', [12, 8]],
    ['15-thoughtful-finds-for-your-bedroom', [12, 8]],
    ['7-bedside-lamps-to-consider', [12, 8]],
    ['shop-a-warm-and-restful-bedroom', [8]],
  ])
    assert.deepEqual(
      sections(page('articles/' + slug)).map((s) => s.count),
      counts,
      slug,
    );
  const look = page('articles/shop-a-warm-and-restful-bedroom');
  const plan = look
    .split('class="section plan-room"')[1]
    .split('</section>')[0];
  assert.equal((plan.match(/<a /g) || []).length, 8);
  assert.equal(plan.includes('<img'), false);
});
test('all built local links and images resolve, and every page has a footer', () => {
  const walk = (p) =>
    fs
      .readdirSync(p, { withFileTypes: true })
      .flatMap((e) =>
        e.isDirectory() ? walk(path.join(p, e.name)) : [path.join(p, e.name)],
      );
  for (const file of walk(root).filter((f) => f.endsWith('.html'))) {
    const html = fs.readFileSync(file, 'utf8');
    assert.ok(html.includes('<footer>'), file);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, file);
    for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
      const decoded = decodeURIComponent(url);
      assert.ok(fs.existsSync(path.join(root, decoded)), file + ' -> ' + url);
    }
  }
});
test('preview is not indexable and newsletter cannot claim a subscription', () => {
  const html = page('');
  assert.ok(html.includes('noindex,nofollow'));
  assert.match(html, /disabled[^>]*>Subscriptions opening soon/);
  assert.ok(
    fs
      .readFileSync(path.join(root, 'robots.txt'), 'utf8')
      .includes('Disallow: /'),
  );
});
