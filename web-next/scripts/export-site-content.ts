import fs from 'node:fs';
import { demoArticles, demoProducts } from '../src/lib/demo-content';
import { legacyArticles } from '../src/lib/legacy-content';

fs.mkdirSync('../.migration', { recursive: true });
const articles = [...demoArticles, ...legacyArticles()];
fs.writeFileSync(
  '../.migration/site-content.json',
  JSON.stringify({ articles, products: demoProducts }, null, 2),
);
console.log({ articles: articles.length, products: demoProducts.length });
