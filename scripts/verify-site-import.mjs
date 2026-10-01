import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createClient } from '@sanity/client';

const source = JSON.parse(
  fs.readFileSync('.migration/site-content.json', 'utf8'),
);
const report = JSON.parse(
  fs.readFileSync('.migration/site-import-report.json', 'utf8'),
);
const imageAssets = JSON.parse(
  fs.readFileSync('.migration/site-assets.json', 'utf8'),
);
const client = createClient({
  projectId: '9tacupln',
  dataset: 'production',
  apiVersion: '2026-09-24',
  useCdn: false,
  perspective: 'published',
});
const data = await client.fetch(
  '{"articles":*[_type=="article"],"products":*[_type=="product"]}',
);
const expected = new Map(
  source.articles
    .slice()
    .reverse()
    .map((a) => [a.slug, a]),
);
const products = new Map(report.products.map((p) => [p.name, p.id]));
let sections = 0;
for (const [slug, article] of expected) {
  const matches = data.articles.filter((a) => a.slug?.current === slug);
  assert.equal(matches.length, 1, `One published article for ${slug}`);
  const doc = matches[0];
  assert.equal(
    doc.legacyId,
    undefined,
    `${slug}: no WordPress import metadata`,
  );
  assert.equal(doc.title, article.title, `${slug}: title`);
  assert.equal(
    doc.designBlocks.length,
    article.body.length,
    `${slug}: all sections`,
  );
  assert.equal(
    doc.hero.asset._ref,
    imageAssets[article.imageUrl],
    `${slug}: correct hero`,
  );
  article.body.forEach((block, i) => {
    const imported = doc.designBlocks[i];
    for (const field of [
      'text',
      'title',
      'label',
      'pros',
      'cons',
      'details',
      'bestFor',
      'columns',
      'caption',
      'href',
    ]) {
      if (block[field] !== undefined)
        assert.deepEqual(
          imported[field],
          block[field],
          `${slug}: section ${i} ${field}`,
        );
    }
    if (block.src)
      assert.equal(
        imported.image.asset._ref,
        imageAssets[block.src],
        `${slug}: section image`,
      );
    if (block.productId) {
      const product = source.products.find((p) => p.id === block.productId);
      assert.equal(
        imported.product._ref,
        products.get(product.name),
        `${slug}: product match`,
      );
    }
    for (const field of ['items', 'picks', 'rows', 'links']) {
      if (!Array.isArray(block[field])) continue;
      assert.equal(
        imported[field].length,
        block[field].length,
        `${slug}: ${field} count`,
      );
      block[field].forEach((item, j) => {
        if (typeof item === 'string') {
          assert.equal(imported[field][j], item);
          return;
        }
        for (const [key, value] of Object.entries(item)) {
          if (key === 'productId')
            assert.equal(
              imported[field][j].product._ref,
              products.get(source.products.find((p) => p.id === value).name),
            );
          else
            assert.deepEqual(
              imported[field][j][key],
              value,
              `${slug}: ${field} ${key}`,
            );
        }
      });
    }
    sections++;
  });
}
for (const product of source.products) {
  const doc = data.products.find((p) => p._id === products.get(product.name));
  assert.ok(doc, product.name);
  assert.equal(doc.image.asset._ref, imageAssets[product.imageUrl]);
  assert.deepEqual(
    doc.retailers.map((r) => [
      r.name,
      r.url,
      r.price,
      r.currency,
      r.unavailable,
    ]),
    product.offers.map((o) => [
      o.retailer,
      o.affiliateUrl,
      o.price,
      o.currency,
      o.availability === 'unavailable',
    ]),
  );
}
const summary = {
  verifiedWebsiteArticles: expected.size,
  verifiedProducts: source.products.length,
  verifiedSections: sections,
  remainingWordPressArticles: data.articles.filter((a) => a.legacyId != null)
    .length,
};
fs.writeFileSync(
  '.migration/site-verification.json',
  JSON.stringify(summary, null, 2),
);
console.log(summary);
