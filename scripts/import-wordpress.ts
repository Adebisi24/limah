/** Run from studio with sanity exec ../scripts/import-wordpress.ts --with-user-token -- <xml> [--write].
 * The XML and local checkpoint contain source content and stay outside Git.
 * Reruns skip already imported posts. --replace-project-matches explicitly replaces
 * matching original project placeholders; --articles-only excludes unrelated media.
 */
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { JSDOM } from 'jsdom';
import { htmlToBlocks } from '@portabletext/block-tools';
import { Schema } from '@sanity/schema';
import { getCliClient } from 'sanity/cli';
import { schemaTypes } from '../studio/schemaTypes';
import {
  prepareWordPressContent,
  wordpressIdentities,
} from './wordpress-content';
import { SITE_AUTHOR_ID } from '../studio/siteAuthor';

const source = process.argv.find((arg) => arg.endsWith('.xml'));
if (!source) throw new Error('Pass a WordPress XML export path.');
const write = process.argv.includes('--write');
const articlesOnly = process.argv.includes('--articles-only');
const publishTitled = process.argv.includes('--publish-titled');
const publishAll = process.argv.includes('--publish-all');
const replaceProjectMatches = process.argv.includes(
  '--replace-project-matches',
);
const client = getCliClient({ apiVersion: '2026-09-24' }).withConfig({
  useCdn: false,
  perspective: 'raw',
});
if (
  client.config().projectId !== '9tacupln' ||
  client.config().dataset !== 'production'
)
  throw new Error('Unexpected destination.');
const cacheDir = path.resolve(process.cwd(), '../.migration');
fs.mkdirSync(cacheDir, { recursive: true });
const cacheFile = path.join(cacheDir, 'wordpress-assets.json');
const cache: Record<string, string> = fs.existsSync(cacheFile)
  ? JSON.parse(fs.readFileSync(cacheFile, 'utf8'))
  : {};
const report: any = {
  source: path.basename(source),
  startedAt: new Date().toISOString(),
  write,
  posts: [],
  media: [],
  errors: [],
};
const saveReport = () =>
  fs.writeFileSync(
    path.join(cacheDir, 'wordpress-report.json'),
    JSON.stringify(report, null, 2),
  );
const xml = new JSDOM(fs.readFileSync(source, 'utf8'), {
  contentType: 'text/xml',
});
const get = (el: Element, tag: string) =>
  el.getElementsByTagName(tag)[0]?.textContent || '';
const items = [...xml.window.document.querySelectorAll('item')];
const posts = items.filter((i) => get(i, 'wp:post_type') === 'post');
const attachments = items.filter(
  (i) => get(i, 'wp:post_type') === 'attachment',
);
const metadata = (el: Element, key: string) =>
  [...el.getElementsByTagName('wp:postmeta')]
    .find((m) => get(m, 'wp:meta_key') === key)
    ?.getElementsByTagName('wp:meta_value')[0]?.textContent || '';
const attachmentIds = new Map(
  attachments.map((a) => [get(a, 'wp:post_id'), a]),
);
const normalize = (url: string) =>
  url.replace(/-\d+x\d+(?=\.[a-z]+(?:\?|$))/i, '').split('?')[0];
const attachmentUrls = new Map(
  attachments.map((a) => [normalize(get(a, 'wp:attachment_url')), a]),
);
const schema = Schema.compile({
  name: 'wordpress-import',
  types: [
    ...schemaTypes,
    {
      name: 'sanity.imageHotspot',
      type: 'object',
      fields: ['x', 'y', 'height', 'width'].map((name) => ({
        name,
        type: 'number',
      })),
    },
    {
      name: 'sanity.imageCrop',
      type: 'object',
      fields: ['top', 'bottom', 'left', 'right'].map((name) => ({
        name,
        type: 'number',
      })),
    },
  ],
});
const bodyType = schema
  .get('article')
  .fields.find((f: any) => f.name === 'body').type;
const existing: any[] = await client.fetch(
  '*[_type=="article"]{_id,_rev,title,slug,legacyId,sourceStatus}',
);
// Assets may have been removed since a previous import. Never reuse stale IDs.
const liveAssetIds = new Set(
  await client.fetch('*[_type=="sanity.imageAsset"]._id'),
);
for (const [url, id] of Object.entries(cache))
  if (!liveAssetIds.has(id)) delete cache[url];
if (write) {
  const backup = await client.fetch(
    '*[!(_type in ["sanity.imageAsset", "sanity.fileAsset"])]',
  );
  fs.writeFileSync(
    path.join(cacheDir, 'before-article-import-' + Date.now() + '.ndjson'),
    backup.map((d: any) => JSON.stringify(d)).join('\n') + '\n',
  );
}
console.log(
  JSON.stringify({
    posts: posts.length,
    attachments: attachments.length,
    existing: existing.length,
    write,
  }),
);

const pending = new Map<string, Promise<any>>();
async function upload(url: string, alt = '', caption = ''): Promise<any> {
  const attachment = attachmentUrls.get(normalize(url));
  const original = attachment ? get(attachment, 'wp:attachment_url') : url;
  if (!/^https?:\/\//i.test(original))
    throw new Error('Unsupported media URL: ' + original);
  if (!pending.has(original))
    pending.set(
      original,
      (async () => {
        if (cache[original]) return cache[original];
        if (!write) return 'dry-run-image';
        let lastError: any;
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            const response = await fetch(original, {
              signal: AbortSignal.timeout(45000),
            });
            if (!response.ok) throw new Error('HTTP ' + response.status);
            const bytes = Buffer.from(await response.arrayBuffer());
            const asset = await client.assets.upload('image', bytes, {
              filename: decodeURIComponent(
                new URL(original).pathname.split('/').pop() || 'image',
              ),
              source: { id: original, name: 'WordPress', url: original },
            });
            cache[original] = asset._id;
            fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
            return asset._id;
          } catch (error) {
            lastError = error;
          }
        }
        throw new Error(`${original}: ${String(lastError)}`);
      })(),
    );
  const assetId = await pending.get(original);
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId },
    alt:
      alt ||
      (attachment ? metadata(attachment, '_wp_attachment_image_alt') : '') ||
      '',
    caption,
    sourceUrl: original,
  };
}
async function pool<T>(
  values: T[],
  fn: (value: T) => Promise<void>,
  concurrency = 4,
) {
  let index = 0;
  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (index < values.length) await fn(values[index++]);
    }),
  );
}

// Copy the original media library; posts additionally reference the exact corresponding assets.
if (!articlesOnly)
  await pool(attachments, async (a) => {
    const url = get(a, 'wp:attachment_url');
    try {
      const image = await upload(
        url,
        metadata(a, '_wp_attachment_image_alt'),
        get(a, 'excerpt:encoded'),
      );
      report.media.push({
        wordpressId: get(a, 'wp:post_id'),
        url,
        assetId: image.asset._ref,
      });
    } catch (error) {
      report.errors.push({ type: 'media', url, error: String(error) });
    }
    if (report.media.length % 50 === 0)
      console.log(`Media copied: ${report.media.length}/${attachments.length}`);
    saveReport();
  });

const siteAuthor = await client.fetch(
  '*[_type=="author" && _id==$id][0]{_id,name}',
  { id: SITE_AUTHOR_ID },
);
if (!siteAuthor) throw new Error('The site author profile is missing.');
const rooms: any[] = await client.fetch('*[_type=="room"]{_id,slug}');
const identities = wordpressIdentities(posts, get);
const importedSlugs = new Set([...identities.values()].map((p) => p.slug));
for (const post of posts) {
  const legacyId = get(post, 'wp:post_id');
  const prepared = prepareWordPressContent(
    get(post, 'content:encoded'),
    get(post, 'title'),
    identities.get(legacyId)!.slug,
  );
  const { title, slug } = prepared;
  const match = existing.find(
    (a) => a.legacyId === legacyId || a.slug?.current === slug,
  );
  const replaceMatch =
    match &&
    replaceProjectMatches &&
    match.sourceStatus === 'website-import' &&
    !match._id.startsWith('drafts.');
  if (match && !replaceMatch) {
    prepared.dom.window.close();
    report.posts.push({
      legacyId,
      title,
      id: match._id,
      status: 'skipped-existing',
    });
    continue;
  }
  try {
    const { dom, doc } = prepared;
    // Links between imported posts should stay on this project after migration.
    doc.querySelectorAll('a[href]').forEach((el) => {
      try {
        const url = new URL(el.getAttribute('href')!, 'https://nestnabber.com');
        const sourceSlug = url.pathname.split('/').filter(Boolean).at(-1);
        if (
          ['nestnabber.com', 'www.nestnabber.com'].includes(url.hostname) &&
          sourceSlug &&
          importedSlugs.has(sourceSlug)
        )
          el.setAttribute('href', '/story/' + sourceSlug + '/' + url.hash);
      } catch {
        /* Keep unusual links as source text; the renderer validates schemes. */
      }
    });
    const imageMap = new Map<Element, any>();
    const images = [...doc.querySelectorAll('img')];
    for (const img of images) {
      const attachmentId = img.className.match(/wp-image-(\d+)/)?.[1];
      const attachment = attachmentId
        ? attachmentIds.get(attachmentId)
        : undefined;
      const src = attachment
        ? get(attachment, 'wp:attachment_url')
        : img.getAttribute('data-src') || img.getAttribute('src') || '';
      const caption =
        img.closest('figure')?.querySelector('figcaption')?.textContent || '';
      imageMap.set(
        img,
        await upload(src, img.alt || caption || title, caption),
      );
    }
    // Conversion reparses HTML, so stable markers carry uploaded images into the deserializer.
    const imageValues: any[] = [];
    for (const [el, value] of imageMap) {
      el.setAttribute('data-import-image', String(imageValues.length));
      imageValues.push(value);
    }
    doc.querySelectorAll('figcaption').forEach((el) => el.remove());
    const body = htmlToBlocks(doc.body.innerHTML, bodyType, {
      parseHtml: (html) => new JSDOM(html).window.document,
      rules: [
        {
          deserialize(el: any, next: any, block: any) {
            if (el.tagName === 'IMG')
              return block(
                imageValues[Number(el.getAttribute('data-import-image'))],
              );
            if (el.tagName === 'HR')
              return block({ _type: 'divider', style: 'line' });
            return undefined;
          },
        },
      ],
    });
    const text = doc.body.textContent?.replace(/\s+/g, ' ').trim() || '';
    const excerptDom = new JSDOM(get(post, 'excerpt:encoded'));
    const excerpt = (
      excerptDom.window.document.body.textContent?.trim() || text
    ).slice(0, 297);
    excerptDom.window.close();
    const thumbnail = attachmentIds.get(metadata(post, '_thumbnail_id'));
    const hero = thumbnail
      ? await upload(
          get(thumbnail, 'wp:attachment_url'),
          metadata(thumbnail, '_wp_attachment_image_alt') || title,
        )
      : imageValues[0];
    const categories = [
      ...post.querySelectorAll('category[domain="category"]'),
    ].map((c) => c.textContent || '');
    const tags = [...post.querySelectorAll('category')].map(
      (c) => c.textContent || '',
    );
    const iso = (value: string) =>
      value && !value.startsWith('0000')
        ? new Date(value.replace(' ', 'T') + 'Z').toISOString()
        : undefined;
    const publishedAt =
      iso(get(post, 'wp:post_date_gmt')) ||
      iso(get(post, 'wp:post_date')) ||
      new Date().toISOString();
    const status = get(post, 'wp:status');
    const publish =
      publishAll ||
      status === 'publish' ||
      (publishTitled && Boolean(get(post, 'title').trim()));
    const categoryText = categories.join(' ').toLowerCase();
    const roomSlug =
      ['bedroom', 'living-room', 'kitchen', 'bathroom', 'entryway'].find((r) =>
        categoryText.includes(r.replaceAll('-', ' ')),
      ) || 'whole-home';
    const room = rooms.find((r) => r.slug?.current === roomSlug);
    const article: any = {
      _type: 'article',
      legacyId,
      sourceUrl: get(post, 'link'),
      sourceStatus: status,
      title,
      slug: { _type: 'slug', current: slug },
      kind: 'inspiration',
      excerpt,
      ...(prepared.seoDescription
        ? { seoDescription: prepared.seoDescription }
        : {}),
      body,
      category: categories[0] || 'Interior Design',
      tags,
      publishedAt,
      updatedAt: iso(get(post, 'wp:post_modified_gmt')),
      ...(hero ? { hero } : {}),
      author: { _type: 'reference', _ref: siteAuthor._id },
      ...(room ? { room: { _type: 'reference', _ref: room._id } } : {}),
    };
    if (!publish) article._id = 'drafts.' + randomUUID();
    const result = write
      ? replaceMatch
        ? await client
            .patch(match._id)
            .ifRevisionId(match._rev)
            .set(
              Object.fromEntries(
                Object.entries(article).filter(([key]) => !key.startsWith('_')),
              ),
            )
            .unset([
              'designBlocks',
              'ideas',
              'guideSections',
              'products',
              'methodology',
            ])
            .commit()
        : await client.create(article)
      : article;
    existing.push(result);
    report.posts.push({
      legacyId,
      title,
      slug,
      id: result._id,
      status: publish ? 'published' : 'draft',
      images: imageValues.length,
      blocks: body.length,
      missingHero: !hero,
      derivedTitle: !get(post, 'title').trim(),
      replacedProject: Boolean(replaceMatch),
      removedMetadata: prepared.removedMetadata,
    });
    dom.window.close();
    console.log(`Imported ${report.posts.length}/${posts.length}: ${title}`);
  } catch (error) {
    report.errors.push({ type: 'post', legacyId, title, error: String(error) });
    console.error(`Post failed ${legacyId}: ${String(error)}`);
  }
  saveReport();
}
report.finishedAt = new Date().toISOString();
report.referencedImages = pending.size;
saveReport();
console.log(
  JSON.stringify({
    posts: report.posts.length,
    media: report.media.length,
    errors: report.errors.length,
    report: path.join(cacheDir, 'wordpress-report.json'),
  }),
);
if (report.errors.length) process.exitCode = 1;
