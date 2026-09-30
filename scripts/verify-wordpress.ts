/** Read-only verification of the WordPress import. Run with sanity exec and the XML path. */
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import { getCliClient } from 'sanity/cli';

const source = process.argv.find((arg) => arg.endsWith('.xml'));
if (!source) throw new Error('Pass the source XML path.');
const xml = new JSDOM(fs.readFileSync(source, 'utf8'), {
  contentType: 'text/xml',
});
const get = (el: Element, name: string) =>
  el.getElementsByTagName(name)[0]?.textContent || '';
const posts = [...xml.window.document.querySelectorAll('item')].filter(
  (el) => get(el, 'wp:post_type') === 'post',
);
const client = getCliClient({ apiVersion: '2026-09-24' }).withConfig({
  useCdn: false,
  perspective: 'raw',
});
const rawDocs = await client.fetch(
  '*[_type=="article" && defined(legacyId)]{_id,legacyId,title,sourceStatus,slug,body,hero,"heroAsset":hero.asset->_id,"imageAssets":body[_type=="image"].asset->_id}',
);
// An editor can open a draft of a published post; that is one article, not a duplicate.
const docs = rawDocs.filter(
  (doc: any) =>
    !doc._id.startsWith('drafts.') ||
    !rawDocs.some((other: any) => other._id === doc._id.slice(7)),
);
const errors: string[] = [];
const normalize = (s: string) => s.replace(/\s+/g, '');
for (const post of posts) {
  const id = get(post, 'wp:post_id');
  const matches = docs.filter((d: any) => d.legacyId === id);
  if (matches.length !== 1) {
    errors.push(`${id}: expected one document, got ${matches.length}`);
    continue;
  }
  const d = matches[0];
  const dom = new JSDOM(get(post, 'content:encoded'));
  const sourceImages = dom.window.document.querySelectorAll('img').length;
  dom.window.document
    .querySelectorAll('script,style,figcaption')
    .forEach((el) => el.remove());
  const text = dom.window.document.body.textContent || '';
  const importedText = d.body
    .filter((b: any) => b._type === 'block')
    .map((b: any) => b.children.map((c: any) => c.text || '').join(''))
    .join('');
  if (normalize(text) !== normalize(importedText))
    errors.push(
      `${id}: text differs (${normalize(text).length} vs ${normalize(importedText).length} characters)`,
    );
  if (
    d.imageAssets.length !== sourceImages ||
    d.imageAssets.some((a: any) => !a)
  )
    errors.push(`${id}: missing inline images`);
  if (d.hero && !d.heroAsset) errors.push(`${id}: broken hero image`);
  if ((get(post, 'wp:status') !== 'publish') !== d._id.startsWith('drafts.'))
    errors.push(`${id}: publication state differs`);
  if (get(post, 'title').trim() && get(post, 'title').trim() !== d.title)
    errors.push(`${id}: title differs`);
  dom.window.close();
}
const summary = {
  expectedPosts: posts.length,
  actualPosts: docs.length,
  published: docs.filter((d: any) => !d._id.startsWith('drafts.')).length,
  drafts: docs.filter((d: any) => d._id.startsWith('drafts.')).length,
  inlineImages: docs.reduce((n: number, d: any) => n + d.imageAssets.length, 0),
  errors,
};
fs.writeFileSync(
  '../.migration/wordpress-verification.json',
  JSON.stringify(summary, null, 2),
);
console.log(JSON.stringify(summary, null, 2));
if (errors.length) process.exitCode = 1;
