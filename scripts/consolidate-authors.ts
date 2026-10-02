/**
 * Consolidate every article under the site's single author profile.
 * Run from studio with:
 * sanity exec ../scripts/consolidate-authors.ts --with-user-token -- --write
 */
import fs from 'node:fs';
import { getCliClient } from 'sanity/cli';
import { SITE_AUTHOR_ID, SITE_AUTHOR_NAME } from '../studio/siteAuthor';

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

const [authors, articles] = await Promise.all([
  client.fetch('*[_type == "author"]'),
  client.fetch('*[_type == "article"]{_id,_type,_rev,title,author}'),
]);
const siteAuthor = authors.find((author: any) => author._id === SITE_AUTHOR_ID);
if (!siteAuthor) throw new Error(`Missing ${SITE_AUTHOR_NAME} author profile.`);

const articlesToUpdate = articles.filter(
  (article: any) => article.author?._ref !== SITE_AUTHOR_ID,
);
const authorsToRemove = authors.filter(
  (author: any) => author._id !== SITE_AUTHOR_ID,
);

console.log(
  JSON.stringify(
    {
      siteAuthor: { id: SITE_AUTHOR_ID, name: siteAuthor.name },
      articlesToUpdate: articlesToUpdate.length,
      authorsToRemove: authorsToRemove.map((author: any) => ({
        id: author._id,
        name: author.name,
      })),
      write,
    },
    null,
    2,
  ),
);

if (write) {
  fs.mkdirSync('../.migration', { recursive: true });
  const backup = `../.migration/before-author-consolidation-${Date.now()}.ndjson`;
  fs.writeFileSync(
    backup,
    [...authors, ...articlesToUpdate]
      .map((document: any) => JSON.stringify(document))
      .join('\n') + '\n',
    { flag: 'wx' },
  );

  for (let start = 0; start < articlesToUpdate.length; start += 100) {
    const transaction = client.transaction();
    for (const article of articlesToUpdate.slice(start, start + 100)) {
      transaction.patch(article._id, (patch) =>
        patch.set({
          author: { _type: 'reference', _ref: SITE_AUTHOR_ID },
        }),
      );
    }
    await transaction.commit();
  }

  const remainingReferences = await client.fetch(
    'count(*[_type == "article" && defined(author) && author._ref != $id])',
    { id: SITE_AUTHOR_ID },
  );
  if (remainingReferences !== 0) {
    throw new Error(
      `${remainingReferences} articles still reference another author.`,
    );
  }

  if (authorsToRemove.length) {
    const transaction = client.transaction();
    for (const author of authorsToRemove) transaction.delete(author._id);
    await transaction.commit();
  }

  console.log(`Consolidated authors. Backup: ${backup}`);
}
