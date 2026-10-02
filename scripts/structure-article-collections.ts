/**
 * Assign every article to explicit website collections.
 * Run from studio with:
 * sanity exec ../scripts/structure-article-collections.ts --with-user-token -- --write
 */
import fs from 'node:fs';
import { getCliClient } from 'sanity/cli';
import { ARTICLE_COLLECTION_SLUGS } from '../article-collections';
import { classifyArticle } from './classify-article-collections';

const write = process.argv.includes('--write');
const client = getCliClient({ apiVersion: '2026-09-24' }).withConfig({
  useCdn: false,
  perspective: 'raw',
});

if (
  client.config().projectId !== '9tacupln' ||
  client.config().dataset !== 'production'
) {
  throw new Error('Unexpected destination.');
}

const articles = await client.fetch(`
  *[_type == "article"] | order(_id asc) {
    _id,
    _type,
    _rev,
    title,
    "slug": slug.current,
    kind,
    category,
    tags,
    keywords,
    excerpt,
    collections,
    "room": room->slug.current,
    "styles": styles[]->slug.current
  }
`);

const changes = articles.map((article: any) => ({
  article,
  taxonomy: classifyArticle(article),
}));
const counts: Record<string, number> = {};
for (const { taxonomy } of changes) {
  for (const collection of taxonomy.collections) {
    counts[collection] = (counts[collection] ?? 0) + 1;
  }
}
const invalid = Object.keys(counts).filter(
  (collection) => !ARTICLE_COLLECTION_SLUGS.has(collection),
);
if (invalid.length) {
  throw new Error(`Unknown collections: ${invalid.join(', ')}`);
}

const report = {
  articles: changes.length,
  articlesWithoutCollections: changes.filter(
    ({ taxonomy }) => taxonomy.collections.length === 0,
  ).length,
  counts: Object.fromEntries(
    Object.entries(counts).sort(([left], [right]) => left.localeCompare(right)),
  ),
  categoryCounts: Object.fromEntries(
    Object.entries(
      changes.reduce<Record<string, number>>((result, { taxonomy }) => {
        result[taxonomy.category] = (result[taxonomy.category] ?? 0) + 1;
        return result;
      }, {}),
    ).sort(([left], [right]) => left.localeCompare(right)),
  ),
  write,
};
fs.mkdirSync('../.migration', { recursive: true });
fs.writeFileSync(
  '../.migration/article-collection-report.json',
  JSON.stringify(report, null, 2),
);
fs.writeFileSync(
  '../.migration/article-collection-assignments.json',
  JSON.stringify(
    changes.map(({ article, taxonomy }) => ({
      id: article._id,
      title: article.title,
      ...taxonomy,
    })),
    null,
    2,
  ),
);
console.log(JSON.stringify(report, null, 2));

if (write) {
  const backup = `../.migration/before-article-collections-${Date.now()}.ndjson`;
  fs.writeFileSync(
    backup,
    articles.map((article: any) => JSON.stringify(article)).join('\n') + '\n',
    { flag: 'wx' },
  );

  for (let start = 0; start < changes.length; start += 100) {
    const transaction = client.transaction();
    for (const { article, taxonomy } of changes.slice(start, start + 100)) {
      transaction.patch(article._id, (patch) =>
        patch.set({
          collections: taxonomy.collections,
          category: taxonomy.category,
        }),
      );
    }
    await transaction.commit();
  }
  console.log(`Structured ${changes.length} articles. Backup: ${backup}`);
}
