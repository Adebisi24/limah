# Adding content to Nest Nabber

1. Open https://nest-nabber-limah.sanity.studio/ and sign in to Sanity. The local editor is also available at http://localhost:3333 while `npm run studio` is running.
2. Create your author and room documents first. Use Bedroom, Living Room, Kitchen, and Bathroom for the current hubs. Styles are reusable tags; style SEO landing pages are not automatically published.
3. Add reusable products with an image, exact/similar relationship, and up to three retailer links. Enter a price only after checking it; otherwise the site uses “Check price at [retailer]”. Product links must use HTTP or HTTPS.
4. Create an Article and select one of the six article formats. Set its title, slug, excerpt, hero, author, room, and publication date. Add introduction text in the rich-text field.
5. Inspiration articles use the Ideas array for each image, heading, and paragraph. Buying Guides use Guide Sections for advice, checklists, and diagrams/images. Shopping formats use product references plus article-specific editorial notes. Best Products includes methodology and pros/cons; Shopping Finds hides those extra details on the website.
6. Select preferred related articles if needed. Otherwise the site chooses other articles of the relevant format, prioritizing the same room. It shows only available content and never duplicates a card just to fill a count. Maximums follow the approved layouts: 12/8 or 8 looks. Plan Your Room accepts up to eight article references and always renders text-only links.
7. Open Site Settings to select the homepage feature and latest stories, brand text, description, and contact address.
8. Publish the documents, then rebuild the website. Published Sanity content is always used; drafts stay private to the editorial workflow. A later Cloudflare deploy hook can automate rebuilding.

Sanity is the source for all website articles and products. The WordPress import has been removed, and the nine overlapping articles restored to their original project versions. To edit an existing project article, open **Content → Designed article sections**; keep their order to preserve its layout. These sections take precedence over the introduction field. New articles can use **Content → Introduction / article text** with the format-specific fields when no designed sections are present. Edit product prices and affiliate links under **Products → Retailers**. Removing or unpublishing an article in Sanity removes it from the next website build; local demo articles are never added back.

Cloudflare builds automatically use Sanity; an older `CONTENT_MODE=demo` variable is ignored by the Next.js configuration. The default project is `9tacupln`, dataset `production`. Set `SITE_URL` to the deployed website URL for canonical links and indexing. Publishing in Studio does not automatically rebuild Cloudflare until a deploy hook is configured. Draft articles are excluded from the published website.

No reader accounts are used. Saved articles and likes remain on each browser. Newsletter signup remains inactive until a sending service is connected.
