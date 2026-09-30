/** Imports the website export without replacing existing Sanity documents. */
import fs from 'node:fs';
import path from 'node:path';
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2026-09-24' }).withConfig({
  useCdn: false,
  perspective: 'raw',
});
if (client.config().projectId !== '9tacupln')
  throw new Error('Unexpected destination');
const root = path.resolve(process.cwd(), '..');
const source = JSON.parse(
  fs.readFileSync(path.join(root, '.migration/site-content.json'), 'utf8'),
);
const articles: any[] = [
  ...new Map(
    source.articles
      .slice()
      .reverse()
      .map((a: any) => [a.slug, a]),
  ).values(),
];
const cacheFile = path.join(root, '.migration/site-assets.json');
const cache: Record<string, string> = fs.existsSync(cacheFile)
  ? JSON.parse(fs.readFileSync(cacheFile, 'utf8'))
  : {};
const report: any = { articles: [], products: [], errors: [] };
const save = () =>
  fs.writeFileSync(
    path.join(root, '.migration/site-import-report.json'),
    JSON.stringify(report, null, 2),
  );
const existing: any[] = await client.fetch(
  '*[_type in ["article","product","room","author"]]{_id,_type,title,name,slug,legacyId}',
);
const urls = [
  ...new Set<string>(
    [
      ...source.products.map((p: any) => p.imageUrl),
      ...articles.flatMap((a) => [
        a.imageUrl,
        ...a.body.map((b: any) => b.src),
      ]),
    ].filter(Boolean),
  ),
];
let index = 0;
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (index < urls.length) {
      const url = urls[index++];
      if (cache[url]) continue;
      try {
        let bytes: Buffer;
        if (url.startsWith('/')) {
          const publicRoot = path.join(root, 'web-next/public');
          const file = path.resolve(publicRoot, '.' + url);
          if (!file.startsWith(publicRoot + path.sep))
            throw new Error('Invalid public image path');
          bytes = fs.readFileSync(file);
        } else {
          const response = await fetch(url, {
            signal: AbortSignal.timeout(60000),
          });
          if (!response.ok) throw new Error('HTTP ' + response.status);
          bytes = Buffer.from(await response.arrayBuffer());
        }
        const asset = await client.assets.upload('image', bytes, {
          filename: url.split('?')[0].split('/').pop() || 'image',
          source: { name: 'Nest Nabber website', id: url },
        });
        cache[url] = asset._id;
        fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
      } catch (error) {
        report.errors.push({ url, error: String(error) });
      }
      if (index % 25 === 0)
        console.log(`Website media: ${index}/${urls.length}`);
      save();
    }
  }),
);
const image = (url: string, alt: string) => {
  if (!cache[url]) throw new Error('Image not uploaded: ' + url);
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: cache[url] },
    alt: alt || '',
  };
};
const ref = (id: string) => ({ _type: 'reference', _ref: id });
const productIds = new Map<number, string>();
for (const p of source.products) {
  let doc = existing.find((d) => d._type === 'product' && d.title === p.name);
  if (!doc) {
    doc = await client.create({
      _type: 'product',
      title: p.name,
      brand: p.brand,
      description: p.description,
      image: image(p.imageUrl, p.imageAlt || p.name),
      specs: Object.entries(p.specs || {}).map(([label, value], i) => ({
        _key: 'spec' + i,
        _type: 'specification',
        label,
        value: String(value),
      })),
      retailers: p.offers.map((o: any, i: number) => ({
        _key: 'retailer' + i,
        _type: 'retailer',
        name: o.retailer,
        url: o.affiliateUrl,
        price: o.price,
        currency: o.currency,
        unavailable: o.availability === 'unavailable',
      })),
    });
    existing.push(doc);
  }
  productIds.set(p.id, doc._id);
  report.products.push({ name: p.name, id: doc._id });
  save();
}
function product(id: number) {
  const target = productIds.get(id);
  if (!target) throw new Error('Missing product ' + id);
  return ref(target);
}
async function named(type: string, name: string, slug?: string) {
  let doc = existing.find(
    (d) =>
      d._type === type &&
      (type === 'author' ? d.name === name : d.slug?.current === slug),
  );
  if (!doc) {
    doc = await client.create({
      _type: type,
      ...(type === 'author'
        ? { name }
        : { title: name, slug: { _type: 'slug', current: slug } }),
    });
    existing.push(doc);
  }
  return ref(doc._id);
}
const formats: Record<string, string> = {
  'best-products': 'best',
  'buying-guide': 'guide',
  'shop-the-look': 'look',
};
for (const a of articles) {
  const match = existing.find(
    (d) => d._type === 'article' && d.slug?.current === a.slug,
  );
  if (match) {
    report.articles.push({
      slug: a.slug,
      id: match._id,
      status: 'matched-existing',
    });
    save();
    continue;
  }
  try {
    const designBlocks = a.body.map((b: any, i: number) => {
      const { type, src, alt, productId, ...fields } = b;
      const block: any = {
        ...fields,
        _type: 'nn' + type[0].toUpperCase() + type.slice(1),
        _key: 'section' + i,
      };
      if (src) block.image = image(src, alt || a.title);
      if (productId) block.product = product(productId);
      const nestedTypes: Record<string, string> = {
        quickPicks: 'quickPick',
        quickShop: 'quickShopItem',
        quickBrowse: 'browseItem',
        comparison: 'comparisonRow',
        contextLinks: 'designLink',
      };
      for (const field of ['picks', 'items', 'rows', 'links'])
        if (Array.isArray(block[field]))
          block[field] = block[field].map((v: any, j: number) => {
            if (typeof v === 'string') return v;
            const { productId, ...rest } = v;
            return {
              ...rest,
              _key: 'item' + j,
              _type: nestedTypes[type],
              ...(productId ? { product: product(productId) } : {}),
            };
          });
      return block;
    });
    const doc = await client.create({
      _type: 'article',
      title: a.title,
      slug: { _type: 'slug', current: a.slug },
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
      author: await named('author', a.author),
      room: await named(
        'room',
        a.room
          .split('-')
          .map((s: string) => s[0].toUpperCase() + s.slice(1))
          .join(' '),
        a.room,
      ),
      designBlocks,
      sourceStatus: 'website-import',
    });
    existing.push(doc);
    report.articles.push({
      slug: a.slug,
      id: doc._id,
      status: 'created',
      blocks: designBlocks.length,
    });
    console.log(
      `Website article: ${report.articles.length}/${articles.length} ${a.slug}`,
    );
  } catch (error) {
    report.errors.push({ slug: a.slug, error: String(error) });
  }
  save();
}
console.log(
  JSON.stringify({
    articles: report.articles.length,
    products: report.products.length,
    images: Object.keys(cache).length,
    errors: report.errors,
  }),
);
if (report.errors.length) process.exitCode = 1;
