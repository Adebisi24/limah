import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('web-next/out');
const page = (slug) =>
  fs
    .readFileSync(path.join(root, slug, 'index.html'), 'utf8')
    .replace(/<script\b[\s\S]*?<\/script>/g, '');
const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
    );
const main = (html) =>
  html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? html;

test('all eight supplied templates and supporting pages are exported', () => {
  for (const slug of [
    '',
    'shopping',
    'rooms/bedroom',
    'story/15-modern-luxury-bedroom-ideas',
    'story/15-amazon-bedroom-finds-worth-discovering',
    'story/7-best-bedside-lamps-for-beautiful-bedroom',
    'story/how-to-choose-bedroom-lighting',
    'story/shop-this-modern-luxury-bedroom',
    'interior-design',
    'organization',
    'rooms',
    'search',
    'saved',
    'about',
    'contact',
    'editorial-policy',
    'affiliate-disclosure',
    'privacy',
    'terms',
  ]) {
    const html = page(slug);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, slug);
    assert.match(html, /<footer\b/);
  }
});

test('every built internal link and local asset resolves', () => {
  const errors = [];
  for (const file of walk(root).filter((f) => f.endsWith('.html'))) {
    const html = fs
      .readFileSync(file, 'utf8')
      .replace(/<script\b[\s\S]*?<\/script>/g, '');
    for (const [, value] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
      const url = decodeURIComponent(value.replaceAll('&amp;', '&'));
      if (!fs.existsSync(path.join(root, url)))
        errors.push(path.relative(root, file) + ' -> ' + url);
    }
  }
  assert.deepEqual([...new Set(errors)], []);
});

test('supplied editorial and product sequences are not truncated', () => {
  assert.equal(
    (
      main(page('story/15-modern-luxury-bedroom-ideas')).match(
        /class="my-12"/g,
      ) || []
    ).length,
    15,
  );
  for (const [slug, count] of [
    ['15-amazon-bedroom-finds-worth-discovering', 15],
    ['7-best-bedside-lamps-for-beautiful-bedroom', 7],
    ['shop-this-modern-luxury-bedroom', 8],
  ]) {
    assert.equal(
      (main(page('story/' + slug)).match(/id="p-\d+"/g) || []).length,
      count,
      slug,
    );
  }
  const look = main(page('story/shop-this-modern-luxury-bedroom'));
  const plan = look.match(
    /<section[^>]*>\s*<div[^>]*>[\s\S]*?Keep Planning[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(plan, 'Plan Your Room section is present');
  const planLinks = look
    .slice(look.indexOf('Keep Planning'))
    .split('</section>')[0];
  assert.equal((planLinks.match(/<a\b/g) || []).length, 8);
  assert.equal(planLinks.includes('<img'), false);
  const best = page('story/7-best-bedside-lamps-for-beautiful-bedroom');
  assert.match(best, /<table/);
  assert.match(best, /Pros/);
  assert.match(best, /Trade-offs/);
  assert.match(
    page('story/how-to-choose-bedroom-lighting'),
    /Diagram of the three layers/,
  );
});

test('preview cannot be indexed and newsletter cannot collect addresses', () => {
  for (const slug of [
    '',
    'shopping',
    'rooms/bedroom',
    'story/15-modern-luxury-bedroom-ideas',
  ]) {
    const html = page(slug);
    assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
    assert.match(
      html,
      /<em>We independently evaluate all of our recommendations\. If you click on links we provide, we may receive compensation\.<\/em>/,
    );
    assert.match(html, /<input[^>]*disabled/);
    assert.match(html, /<button[^>]*disabled[^>]*>SIGN UP →<\/button>/);
    assert.match(html, /no email addresses are collected/);
  }
  assert.match(
    fs.readFileSync(path.join(root, 'robots.txt'), 'utf8'),
    /Disallow: \//,
  );
  assert.equal(fs.existsSync(path.join(root, 'api/newsletter')), false);
  assert.match(page('contact'), /abdullahiabdulrafiu001@gmail.com/);
  assert.doesNotMatch(
    page(''),
    /href="https:\/\/www\.(instagram|pinterest)\.com"/,
  );
});

test('existing article URLs use the imported design', () => {
  const html = page('articles/modern-luxury-bedroom-ideas');
  assert.match(html, /15 Modern Luxury Bedroom Ideas/);
  assert.match(html, /\/story\/15-modern-luxury-bedroom-ideas\//);
  assert.match(html, /Nest <span[^>]*>Nabber/);
});
