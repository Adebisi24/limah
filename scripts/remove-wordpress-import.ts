/** Run from studio with sanity exec --with-user-token; dry run unless --write is supplied. */
import fs from 'node:fs';
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2026-09-24' }).withConfig({
  useCdn: false,
  perspective: 'raw',
});
if (
  client.config().projectId !== '9tacupln' ||
  client.config().dataset !== 'production'
)
  throw new Error('Unexpected dataset');
const read = (name: string) =>
  JSON.parse(fs.readFileSync('../.migration/' + name, 'utf8'));
const source = read('site-content.json');
const images = read('site-assets.json');
const report = read('site-import-report.json');
const originals = new Map<string, any>(
  source.articles
    .slice()
    .reverse()
    .map((a: any) => [a.slug, a]),
);
const docs: any[] = await client.fetch('*[]');
const write = process.argv.includes('--write');
const backup =
  '../.migration/before-wordpress-removal-' + Date.now() + '.ndjson';
if (write)
  fs.writeFileSync(
    backup,
    docs.map((d) => JSON.stringify(d)).join('\n') + '\n',
    { flag: 'wx' },
  );
const products = new Map(
  source.products.map((p: any) => [
    p.id,
    report.products.find((d: any) => d.name === p.name)?.id,
  ]),
);
const ref = (id: any) => {
  if (!id) throw new Error('Missing reference');
  return { _type: 'reference', _ref: id };
};
const image = (url: string, alt: string) => ({
  _type: 'image',
  asset: ref(images[url]),
  alt: alt || '',
});
const product = (id: number) => ref(products.get(id));
const formats: Record<string, string> = {
  'best-products': 'best',
  'buying-guide': 'guide',
  'shop-the-look': 'look',
};
function block(b: any, i: number): any {
  const { type, src, alt, productId, ...fields } = b;
  const result: any = {
    ...fields,
    _type: 'nn' + type[0].toUpperCase() + type.slice(1),
    _key: 'section' + i,
  };
  if (src) result.image = image(src, alt);
  if (productId) result.product = product(productId);
  const nested: Record<string, string> = {
    quickPicks: 'quickPick',
    quickShop: 'quickShopItem',
    quickBrowse: 'browseItem',
    comparison: 'comparisonRow',
    contextLinks: 'designLink',
  };
  for (const field of ['picks', 'items', 'rows', 'links']) {
    if (Array.isArray(result[field]))
      result[field] = result[field].map((v: any, j: number) => {
        if (typeof v === 'string') return v;
        const { productId, ...rest } = v;
        return {
          ...rest,
          _key: 'item' + j,
          _type: nested[type],
          ...(productId ? { product: product(productId) } : {}),
        };
      });
  }
  return result;
}
const imported = docs.filter(
  (d) => d._type === 'article' && d.legacyId != null,
);
const restored = imported.filter(
  (d) => !d._id.startsWith('drafts.') && originals.has(d.slug?.current),
);
const deleted = imported.filter((d) => !restored.includes(d));
const deletedIds = new Set(deleted.map((d) => d._id));
function referencesDeleted(value: any): boolean {
  if (!value || typeof value !== 'object') return false;
  return (
    deletedIds.has(value._ref) || Object.values(value).some(referencesDeleted)
  );
}
const blocked = docs.filter(
  (d) =>
    !deletedIds.has(d._id) && !restored.includes(d) && referencesDeleted(d),
);
if (blocked.length)
  throw new Error(
    'Retained documents reference deleted articles: ' +
      blocked.map((d) => d._id).join(', '),
  );
let transaction = client.transaction();
for (const d of restored) {
  const a = originals.get(d.slug.current);
  const author = docs.find((d) => d._type === 'author' && d.name === a.author);
  let room = docs.find((d) => d._type === 'room' && d.slug?.current === a.room);
  if (!room) {
    room = write
      ? await client.create({
          _type: 'room',
          title: a.room
            .split('-')
            .map((s: string) => s[0].toUpperCase() + s.slice(1))
            .join(' '),
          slug: { _type: 'slug', current: a.room },
        })
      : { _id: 'dry-run-only' };
  }
  transaction = transaction.patch(d._id, (p) =>
    p
      .ifRevisionId(d._rev)
      .set({
        title: a.title,
        kind: formats[a.format] || a.format,
        excerpt: a.subtitle || a.description || '',
        seoDescription: a.description,
        category: a.category,
        keywords: a.keywords,
        tags: a.tags,
        popular: a.popular,
        publishedAt: a.publishedAt,
        updatedAt: a.updatedAt,
        hero: image(a.imageUrl, a.imageAlt || a.title),
        author: ref(author?._id),
        room: ref(room?._id),
        designBlocks: a.body.map(block),
        sourceStatus: 'website-import',
      })
      .unset([
        'legacyId',
        'sourceUrl',
        'body',
        'ideas',
        'guideSections',
        'products',
        'methodology',
      ]),
  );
}
for (const d of deleted) transaction = transaction.delete(d._id);
console.log(
  JSON.stringify({
    restore: restored.map((d) => d.slug.current),
    deleteArticles: deleted.length,
    preserveOtherArticles: docs.filter(
      (d) => d._type === 'article' && !d.legacyId,
    ).length,
  }),
);
if (write) {
  if (imported.length) await transaction.commit();
  // Only remove imported media unused by every remaining document. Shared media stays intact.
  const assets = await client.fetch(
    '*[_type == "sanity.imageAsset" && source.name == "WordPress"]{_id,"used":count(*[references(^._id)])}',
  );
  const unused = assets.filter((a: any) => a.used === 0);
  for (let i = 0; i < unused.length; i += 50) {
    let batch = client.transaction();
    for (const a of unused.slice(i, i + 50)) batch = batch.delete(a._id);
    await batch.commit();
  }
  console.log(
    JSON.stringify({
      backup,
      restored: restored.length,
      deletedArticles: deleted.length,
      deletedUnusedImages: unused.length,
      retainedSharedImages: assets.length - unused.length,
    }),
  );
}
