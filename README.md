# Nest Nabber

A responsive editorial website built from the eight approved wireframes. Astro generates static HTML for Cloudflare; a standalone Sanity Studio manages content. No reader accounts are required.

## Run locally

Use Node.js 24 LTS and npm. From this repository root:

```
npm ci
npm run dev
```

Website: http://localhost:4321. In a second terminal, run `npm run studio` for http://localhost:3333. Sign in to Sanity using the GitHub identity that owns project `9tacupln` (Limah), dataset `production`.

## Content modes

The default is a **design preview**, with sample text and 306 images selected from the user-provided collection. Preview pages display a sample-content notice and are excluded from search indexing. Demo content is local only: it has not been published into Sanity. The source-image map is in `docs/IMAGE_SOURCES.json`.

Set `CONTENT_MODE=sanity` in `web/.env` or the Cloudflare build environment to use published Sanity articles. Add `SITE_URL` with the real site URL for canonical links and the sitemap. `web/.env.example` lists supported variables. The public dataset is fetched during builds without an API token. Network/query failures stop the build rather than silently replacing live content with examples.

The Sanity dataset is currently empty. Articles, authors, rooms, styles, reusable products, and homepage settings are editable in the Studio. Publishing content requires a website rebuild. Read `docs/CONTENT_GUIDE.md` before switching modes.

## Included

- Homepage, Inspiration, Shopping Landing, Shopping Finds, Best Products, Buying Guide, Shop the Look, and Bedroom Hub.
- Additional room hubs, category browsing, search, saved articles, contact/about and starter policy pages.
- Likes and saves persist in localStorage on the reader's device. These are personal preferences, not aggregate public like counts. Clearing browser data removes them; there is no cross-device syncing.
- Best Products supports one to three centered retailer links. Quick Picks always uses only the first valid link. Shopping Finds and Shop the Look use one centered link.
- Responsive four-column related sections; mobile image/title rows. Plan Your Room has eight text-only links.
- Newsletter design is present but subscriptions are disabled and clearly marked coming soon. No email addresses are collected.
- Supabase is intentionally not provisioned or called: no feature in this version needs a shared database. Newsletter service remains pending.

## Verify

```
npm run build
npm run check
npm test
npm run studio:build
node node_modules/typescript/bin/tsc -p studio/tsconfig.json
node tests/sanity-smoke.mjs
```

Built-site tests run against demo output (`CONTENT_MODE` unset or `demo`). They check template counts, local links, assets, footers, and preview-indexing rules. Reading-list tests cover corrupt storage, blocked writes, toggling, and safe retailer URL schemes. The optional Sanity smoke check is read-only and needs network access.

## Cloudflare deployment

Not deployed yet. The simplest target is a static Cloudflare Pages project connected to this repository:

- Repository root: leave blank.
- Build command: `npm run build`.
- Build output: `web/dist`.
- Node version: 24.
- Build variables: `CONTENT_MODE=sanity`, `SITE_URL=https://your-actual-domain`.

For a design review deployment, keep `CONTENT_MODE=demo`; do not switch off the sample notice until real content is ready. A Workers Static Assets configuration is also included in `wrangler.jsonc` if Workers is preferred. No SSR adapter, paid image service, or runtime database is required.

After creating the Cloudflare project, configure a deploy hook and connect it to Sanity's publish/update webhook. Until then, trigger a rebuild manually after editing content. The webhook URL is a secret and must not be committed.

The local Studio can later be hosted independently on Sanity's Studio hosting or as its own static deployment. It has been built locally, not published to a hosted Studio URL.

## Before launch

Add real article text, authors and verified retailer URLs in Sanity. Replace illustrative shopping concepts with real product images and evidence-based descriptions. Supply image credits and confirm publication permissions for the provided image collection. Review the starter policy pages for the final site's actual practices. Set the real domain and publish/rebuild. Newsletter sending is a separate pending integration.

Dependency overrides pin fixes for transitive Sanity CLI utilities; retain these until upstream dependencies include the patched versions. Both application packages use exact versions and a committed lockfile.

## Design archive

`outputs/`, `assets/`, and `work/build_*.py` retain the original SVG wireframes and generators. The root `index.html` is the archived wireframe index; the actual application entry is `web/src/pages/index.astro`. Do not deploy the repository root as the application output.
