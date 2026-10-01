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

The website builds exclusively from published Sanity content: 98 project articles and 61 products. The WordPress import was removed on October 1, 2026, and nine overlapping articles were restored to their original project versions. Drafts are excluded from the public website. The article list has no local demo fallback.

The Next.js configuration uses Sanity for all website builds, including hosts that still have an old `CONTENT_MODE=demo` variable. The existing Limah project is `9tacupln`, dataset `production`. Set `SITE_URL` to the public website URL for canonical links and indexing; builds without it remain non-indexable. See `web-next/.env.example`. Content changes require a rebuild. Existing Studio fields remain available, with optional ordered **Designed article sections** for the imported templates.

Open [Nest Nabber Studio](https://nest-nabber-limah.sanity.studio/) to edit content. Existing project articles use **Content → Designed article sections**. New articles can use **Content → Introduction / article text** and format-specific sections. Prices and affiliate links live in **Products → Retailers**. See [the content guide](docs/CONTENT_GUIDE.md) for editing and publishing.

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
