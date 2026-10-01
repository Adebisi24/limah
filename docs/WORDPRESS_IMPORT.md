# Article-only WordPress import

All 131 post records were approved for publication, including former drafts. Ten missing titles are derived from article headings, with collision-free URLs. Only post records and their referenced images are imported. Pages, menus, plugins, comments, and unrelated media are excluded.

Text, links, headings, lists, dates, categories, authors, captions, and alt text become editable Sanity fields. Escaped SEO notes are removed from reader-facing text and descriptions go into SEO fields. Internal post links point to this project. Cover images use the original thumbnail or first inline image; image-free posts remain text-only.

XML, backups, reports, and media checkpoints stay outside Git or in .migration. Cached assets are checked before reuse. Reruns skip already imported articles to preserve editor changes. The explicit --replace-project-matches option replaces matching project placeholders only.

From studio/, rehearse:

```sh
node ../node_modules/sanity/bin/sanity exec ../scripts/import-wordpress.ts --with-user-token -- /absolute/path/export.xml --articles-only --publish-all --replace-project-matches
```

For an authorized bulk import, pause the publishing webhook, add --write, then restore the webhook in a finally block. Verify before triggering one deployment:

```sh
node ../node_modules/sanity/bin/sanity exec ../scripts/verify-wordpress.ts --with-user-token -- /absolute/path/export.xml --publish-all
```

Normal editing never requires the importer. Edit in Studio and click Publish; the webhook rebuilds Cloudflare automatically. See CONTENT_GUIDE.md.
