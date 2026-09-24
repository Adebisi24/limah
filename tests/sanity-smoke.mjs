import { createClient } from '@sanity/client';
import fs from 'node:fs';
const source = fs.readFileSync('web/src/lib/content.ts', 'utf8');
const client = createClient({
  projectId: '9tacupln',
  dataset: 'production',
  apiVersion: '2026-09-24',
  useCdn: false,
  maxRetries: 0,
  timeout: 10000,
});
const queries = [...source.matchAll(/defineQuery\(\s*`([\s\S]*?)`\s*,?\s*\)/g)];
if (queries.length !== 2)
  throw new Error('Expected both Sanity queries in the smoke check');
for (const [, query] of queries) {
  const result = await client
    .fetch(query, {}, { perspective: 'published' })
    .catch((error) => {
      console.error('Sanity smoke check failed: ' + error.message);
      process.exit(1);
    });
  console.log(
    Array.isArray(result)
      ? `Published articles: ${result.length}`
      : `Site settings: ${result ? 'present' : 'not yet created'}`,
  );
}
