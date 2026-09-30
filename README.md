# Nest Nabber

The active website implements the supplied `nest-nabber-web-app-design.zip` design in Next.js. Sanity Studio is retained. Root commands run the `web-next/` application. The previous Astro site and design working files have been archived outside this repository; Git history retains the original files.

## Run

Use Node.js 24 and npm from this repository root:

```sh
npm ci
npm run dev
```

The website runs at http://127.0.0.1:4321. Run `npm run studio` separately for Sanity Studio on port 3333.

For a production preview:

```sh
npm run build
npm run preview
```

## Content and preserved decisions

The default is a non-indexable design preview containing the supplied stories and product catalogue. Earlier local photos and article URLs are preserved. Sanity now contains all 98 unique website articles (nine matched existing WordPress posts), 61 products, and the imported WordPress content. The WordPress migration preserved 56 published posts, 75 drafts, and 709 media records.

Set `CONTENT_MODE=sanity` in `web-next/.env.local` to build from published content in the existing Limah project (`9tacupln`, `production`). Set `SITE_URL` to the approved public URL when ready. See `web-next/.env.example`. Content changes require a rebuild. Existing Studio fields remain available, with optional ordered **Designed article sections** for the imported templates.

Open [Nest Nabber Studio](https://nest-nabber-limah.sanity.studio/) to edit content. Website articles use **Content → Designed article sections**. WordPress posts use **Content → Introduction / article text**. Prices and affiliate links live in **Products → Retailers**. See [the migration guide](docs/WORDPRESS_IMPORT.md) for import and verification procedures.

Likes and saves stay on the reader's device. Prior saved/liked IDs migrate to the new stories. There are no reader accounts or aggregate public counts.

Newsletter integration is pending. The design is present, but signup is disabled and no email addresses are collected. Contact email remains `abdullahiabdulrafiu001@gmail.com`. Social icons are inactive until real account links are available.

Read [the design import record](docs/IMPORTED_DESIGN.md) for the full page inventory, integration changes and comparison with the earlier wireframes. [The file inventory](docs/IMPORTED_DESIGN_INVENTORY.json) accounts for every supplied source/configuration file.

## Validate

```sh
npm run check
npm run build
npm test
npm run studio:build
node node_modules/typescript/bin/tsc -p studio/tsconfig.json
```

Tests cover exported links, all primary templates, article sequences, demo indexing, disabled newsletter controls, saved-story migration, search filters and product references. The optional `node tests/sanity-smoke.mjs` check reads the existing dataset without modifying it.

## Hosting

Cloudflare deployment has not yet been verified. For the planned static Cloudflare Pages deployment, the build command is `npm run build`, output directory is `web-next/out`, and Node version is 24. A free Supabase project has been provisioned; database integration is still pending. The design's original database/seed source is retained but not used by the active website; do not run its destructive seed script against an existing database.
