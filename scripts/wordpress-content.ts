import { JSDOM } from 'jsdom';

/** Preserve WordPress URLs first; give untitled drafts collision-free derived URLs. */
export function wordpressIdentities(
  posts: Element[],
  get: (el: Element, key: string) => string,
) {
  const used = new Set(
    posts.map((p) => get(p, 'wp:post_name')).filter(Boolean),
  );
  return new Map(
    posts.map((post) => {
      const originalSlug = get(post, 'wp:post_name');
      const prepared = prepareWordPressContent(
        get(post, 'content:encoded'),
        get(post, 'title'),
        originalSlug,
      );
      let slug = prepared.slug;
      if (!originalSlug) {
        let suffix = 2;
        while (used.has(slug)) slug = prepared.slug + '-' + suffix++;
        used.add(slug);
      }
      prepared.dom.window.close();
      return [get(post, 'wp:post_id'), { title: prepared.title, slug }];
    }),
  );
}

/** Editorial metadata in escaped comments is data, not reader-facing article text. */
export function prepareWordPressContent(
  html: string,
  sourceTitle: string,
  sourceSlug: string,
) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  doc.querySelectorAll('script,style').forEach((el) => el.remove());
  // Preserve link text, but do not import malformed protocols that block Studio publishing.
  doc.querySelectorAll('a[href]').forEach((el) => {
    const href = el.getAttribute('href')?.trim() || '';
    if (/^[a-z][a-z0-9+.-]*:/i.test(href) && !/^https?:\/\//i.test(href)) {
      el.replaceWith(...el.childNodes);
    }
  });
  const metadata: string[] = [];
  let inMetadata = false;
  for (const el of [...doc.body.children]) {
    const text = el.textContent || '';
    if (/<!--\s*SEO METADATA/i.test(text)) inMetadata = true;
    if (inMetadata) {
      metadata.push(text);
      el.remove();
      if (text.includes('-->')) inMetadata = false;
    }
  }
  if (inMetadata)
    throw new Error(
      'Unclosed editorial metadata block; review source before import',
    );
  const notes = metadata.join(' ').replace(/\s+/g, ' ');
  const title =
    sourceTitle.trim() || doc.querySelector('h1,h2')?.textContent?.trim() || '';
  if (!title)
    throw new Error('Article has no title or heading to derive one from');
  const slug =
    sourceSlug ||
    notes.match(/\bSlug:\s*([a-z0-9-]+)/i)?.[1] ||
    title
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  const seoDescription = notes
    .match(
      /Meta Description:\s*(.*?)(?=\s+(?:Slug|Primary Keyword|Secondary Keywords|Focus Intent|Suggested Category|Cannibalization Note|Image Alt Text)[^:]*:|\s*-->|$)/i,
    )?.[1]
    ?.trim();
  // The page already renders its title as H1.
  const heading = doc.querySelector('h1');
  if (heading?.textContent?.trim() === title) heading.remove();
  return {
    dom,
    doc,
    title,
    slug,
    seoDescription,
    removedMetadata: metadata.length,
  };
}
