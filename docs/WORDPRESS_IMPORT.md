# WordPress migration

The importer copies WordPress `post` records into the Limah project's `production` dataset. Published posts remain published; other posts become Sanity drafts. Pages, menus, plugin configuration, comments, and contact form data are not imported as articles.

Original titles, slugs, text, links, headings, lists, dates, categories/tags, authors, image captions and alternative text are preserved. Untitled drafts receive a label containing their WordPress ID. Featured images are matched using `_thumbnail_id`; inline images use attachment IDs or their source URL. A first inline image is used only when WordPress has no featured image. No new editorial content is generated.

Media are downloaded from the URLs in the XML and uploaded to Sanity's asset storage. WordPress must remain accessible until migration verification succeeds. Asset checkpoints and detailed reports are saved in the ignored `.migration/` folder; the XML is not committed to Git.

From `studio/`, rehearse, import, and verify:

```sh
node ../node_modules/sanity/bin/sanity exec ../scripts/import-wordpress.ts --with-user-token -- /absolute/path/export.xml
node ../node_modules/sanity/bin/sanity exec ../scripts/import-wordpress.ts --with-user-token -- /absolute/path/export.xml --write
node ../node_modules/sanity/bin/sanity exec ../scripts/verify-wordpress.ts --with-user-token -- /absolute/path/export.xml
```

The importer skips existing article IDs, slugs or titles, rather than replacing an editor's work. Review any skipped or failed records in the report. A failed image prevents its article from being created with incomplete content. Reruns reuse uploaded media from the checkpoint.

The Studio is hosted at https://nest-nabber-limah.sanity.studio/. Website builds now use published Sanity content. Importing or editing content requires a new website build before the change appears online. Drafts remain excluded. Room assignments and article formats can be reviewed and adjusted in Studio.
