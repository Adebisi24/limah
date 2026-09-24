# Adding content to Nest Nabber

1. Open the local editor at http://localhost:3333 while `npm run studio` is running. Use your Sanity GitHub sign-in.
2. Create your author and room documents first. Use Bedroom, Living Room, Kitchen, and Bathroom for the current hubs. Styles are reusable tags; style SEO landing pages are not automatically published.
3. Add reusable products with an image, exact/similar relationship, and up to three retailer links. Enter a price only after checking it; otherwise the site uses “Check price at [retailer]”. Product links must use HTTP or HTTPS.
4. Create an Article and select one of the five article formats. Set its title, slug, excerpt, hero, author, room, and publication date. Add introduction text in the rich-text field.
5. Inspiration articles use the Ideas array for each image, heading, and paragraph. Buying Guides use Guide Sections for advice, checklists, and diagrams/images. Shopping formats use product references plus article-specific editorial notes. Best Products includes methodology and pros/cons; Shopping Finds hides those extra details on the website.
6. Select preferred related articles if needed. Otherwise the site chooses other articles of the relevant format, prioritizing the same room. It shows only available content and never duplicates a card just to fill a count. Maximums follow the approved layouts: 12/8 or 8 looks. Plan Your Room accepts up to eight article references and always renders text-only links.
7. Open Site Settings to select the homepage feature and latest stories, brand text, description, and contact address.
8. Publish the documents. Configure `CONTENT_MODE=sanity` and `SITE_URL` for the website build, then rebuild. A later Cloudflare deploy hook can automate this step.

The preview contains generated sample text, illustrative products, and local images. None of these have been imported into the Sanity production dataset. Your real content can be entered directly in Studio or supplied as Word/text files for an import.

No reader accounts are used. Saved articles and likes remain on each browser. Newsletter signup remains inactive until a sending service is connected.
