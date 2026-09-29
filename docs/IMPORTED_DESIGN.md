# Supplied design implementation

The September 27 upload, `nest-nabber-web-app-design.zip`, is the primary visual reference. The user's instruction to replace the previous design takes precedence over the earlier SVG wireframes wherever the layouts differ. No new visual direction was invented.

All 53 application/configuration files from the archive are accounted for in `IMPORTED_DESIGN_INVENTORY.json`, with source hashes and their project destinations. Bundled `node_modules` and build caches were not copied: pinned dependencies are installed using the repository lockfile. The ZIP contained no local image directory; its Pexels image references are preserved. Earlier supplied local photos also remain in the project.

## Included layouts

| Supplied design | Active implementation |
| --- | --- |
| Homepage, asymmetric design feature, rooms, finds, Shop the Look feature, picks, buying links, popularity list | `web-next/src/app/page.tsx` |
| Shopping landing and all four shopping collections | `web-next/src/app/shopping/` |
| Inspiration, Shopping Finds, Best Products, Buying Guide, Shop the Look | `web-next/src/app/story/[slug]/page.tsx`, `components/body-renderer.tsx`, `components/product.tsx` |
| Bedroom and other room hubs | `web-next/src/app/rooms/` |
| Interior Design, Organization, 21 topic/style collections | `web-next/src/app/interior-design/`, `organization/`, `collection/` |
| Desktop dropdown hierarchy, mobile accordions, search overlay, saved badge | `web-next/src/components/masthead.tsx` |
| Search, filter controls, saved stories | `web-next/src/app/search/`, `saved/` |
| About, contact, editorial policy, disclosure, privacy, terms, 404 | Corresponding folders in `web-next/src/app/` |
| Forty supplied stories, complete body blocks, product catalogue, media references | `web-next/src/db/seed/` |
| Typography, palette, spacing, cards, diagrams, footer and newsletter layout | `web-next/src/app/globals.css`, `components/` |

The supplied Shop the Look example contains eight products and eight Quick Shop rows. These supplied layouts supersede the earlier eleven-product/four-image-link wireframe. Likewise, the supplied article measures, masthead placement and newsletter/footer colors are retained from the ZIP.

## Integration changes

- Root run/build commands now select `web-next`. `web/` retains the previous Astro implementation for comparison and recovery. Its previous README and layout tests are retained as legacy references.
- Next.js exports static files to `web-next/out` for the existing free-plan-first hosting plan. Search filters the build-time article index in the browser. No Postgres or Supabase project is needed or created.
- Sanity still targets Limah, project `9tacupln`, dataset `production`. Existing fields are preserved. Optional ordered `designBlocks` support every supplied article module without deleting old body, idea, guide or product fields. Only published content is read; no dataset writes or seed operations were run.
- Newsletter controls remain disabled and labelled pending. The supplied POST handler is preserved as inert reference text, and no newsletter endpoint is exported. Privacy copy reflects that no addresses are collected.
- Contact email remains `abdullahiabdulrafiu001@gmail.com`. Social icons retain their design positions but remain inactive until real account URLs are supplied.
- Supplied sample stories, authors, prices and product relationships are labelled as demo content. Demo output is excluded from indexing. Retailer URLs are validated and remain the supplied links; sample prices are not presented as verified live prices outside the demo notice.
- Prior `/articles/` URLs remain available. Equivalent flagship stories map to the new designs; other earlier demo entries use the new article shell. Existing browser-local saved/liked IDs migrate without deleting the previous storage keys. There are no reader accounts or public like totals.
- Dropdowns support keyboard activation, Arrow Down, Escape, focus departure and outside clicks. Mobile/search overlays use a portal, scroll lock, focus containment and focus restoration. Responsive section headers and compact cards were adjusted where the supplied markup overflowed narrow screens.

## Validation

Run `npm run check`, `npm run build`, `npm test`, `npm run studio:build`, and `node node_modules/typescript/bin/tsc -p studio/tsconfig.json`.

Built-output tests check all eight primary templates, every local link and asset, full article/product sequences, legacy routes, indexing restrictions and disabled newsletter controls. Data tests check product references, search behavior, storage migration/failure cases and retailer URL schemes. Browser checks cover desktop dropdowns, mobile accordions, search filters, local saving/removal and responsive page bounds.

No website or Studio deployment has been performed. The source photography remains remote and therefore requires network access in the browser. Demo content and retailer data still need editorial verification before a public launch.

### Completed checks — September 27, 2026

- Production export: passed, 247 generated routes.
- Website TypeScript check: passed.
- Regression suite: 13 tests passed (9 built-output/legacy utility checks and 4 imported content/search/storage checks).
- Sanity Studio build and TypeScript check: passed.
- Browser: all eight primary templates checked at 1440px desktop and 390px mobile viewports; no document horizontal overflow after the fixes. No browser console errors were recorded during these checks.
- Desktop dropdown opening, Escape and outside-click dismissal: passed. Mobile Shopping accordion and destination links: passed.
- Search query `bedroom lighting`: 5 results; Shopping filter: 3 results. Saving, reopening Saved Articles and removal: passed.
- Every built internal link and local image/font/script/style reference resolves. Remote photography was checked where loaded during browsing; a complete remote-CDN availability audit was not performed.

### Newsletter screenshot revision

The later newsletter screenshot overrides the ZIP's newsletter styling: olive `#46513E`, ivory input `#FAF8F3`, sand button `#DED5C4`, centered serif heading “Get More Beautiful Home Ideas”, supporting line “Interior inspiration, organization ideas and curated finds.”, and “SIGN UP →”. The old eyebrow and visible status paragraphs are removed to match the reference. Disabled controls, a pending-state tooltip, screen-reader status, and the preview notice preserve the requirement not to collect addresses. Small screens keep the same colors and wording with readable responsive sizing.
