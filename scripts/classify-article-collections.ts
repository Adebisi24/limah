import { ARTICLE_COLLECTION_SLUGS } from '../article-collections';

export interface TaxonomyArticle {
  title: string;
  slug?: string;
  kind?: string;
  category?: string;
  tags?: string[];
  keywords?: string;
  excerpt?: string;
  room?: string;
  styles?: string[];
}

export function classifyArticle(article: TaxonomyArticle) {
  const text = [
    article.title,
    article.slug,
    article.keywords,
    article.room,
    ...(article.tags ?? []),
    ...(article.styles ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  const collections = new Set<string>(['home']);
  const add = (...slugs: string[]) =>
    slugs.forEach((slug) => collections.add(slug));
  const has = (expression: RegExp) => expression.test(text);

  if (has(/\bbed(room|ding)|mattress|duvet|comforter|nightstand|bedside\b/))
    add('bedroom');
  if (has(/\bliving room|sofa|fireplace|coffee table\b/)) add('living-room');
  if (has(/\bkitchen|pantry|galley|cabinet|countertop\b/)) add('kitchen');
  if (has(/\bbath(room)?|shower|toilet|towel\b/)) add('bathroom');
  if (has(/\bhome office|office|workspace|work from home|wfh|desk\b/))
    add('home-office');
  if (has(/\bentryway|foyer|mudroom\b/)) add('entryway');
  if (
    has(
      /\boutdoor|patio|deck|backyard|porch|pool|pergola|balcony|firepit|grill|yard\b/,
    )
  )
    add('outdoor');
  const roomCollections = [
    'bedroom',
    'living-room',
    'kitchen',
    'bathroom',
    'home-office',
    'entryway',
    'outdoor',
  ];
  if (![...collections].some((slug) => roomCollections.includes(slug)))
    add('whole-home');

  const shoppingKind = ['finds', 'best', 'guide', 'look'].includes(
    article.kind ?? '',
  );
  const shoppingContent =
    shoppingKind ||
    has(
      /\bbest[- ]sellers?|best[- ]products?|shopping[- ]finds?|buying[- ]guides?|shop[- ]the[- ]look\b/,
    );
  if (shoppingContent) {
    add('shopping', 'home-finds');
    if (article.kind === 'finds' || has(/\bshopping[- ]finds?\b/))
      add('shopping-finds');
    if (
      article.kind === 'best' ||
      has(/\bbest[- ]sellers?|best[- ]products?\b/)
    )
      add('best-products');
    if (article.kind === 'guide' || has(/\bbuying[- ]guides?\b/))
      add('buying-guides');
    if (article.kind === 'look' || has(/\bshop[- ]the[- ]look\b/))
      add('shop-the-look');
  }

  const organization = has(
    /\borganiz(e|ed|ing|ation)|storage|declutter|clutter|closet|wardrobe|pantry\b/,
  );
  if (organization) {
    add('home-organization');
    if (collections.has('bedroom')) add('bedroom-organization');
    if (collections.has('kitchen')) add('kitchen-organization');
    if (collections.has('bathroom')) add('bathroom-organization');
    if (has(/\bcloset|wardrobe\b/)) add('closet-organization');
    if (has(/\bdeclutter|clutter\b/)) add('decluttering');
    if (has(/\bsmall|tiny|apartment|narrow|tight\b/))
      add('small-space-organization');
    if (has(/\bstorage|shelv|basket|organizer|organization|organize\b/))
      add('storage-ideas');
  }

  if (!shoppingContent && !organization) add('interior-design', 'design-ideas');
  if (
    has(/\bpaint|color|palette|black and white|white and gold|gray and white\b/)
  )
    add('interior-design', 'color-paint');
  if (has(/\blighting|light|lamp|sconce|chandelier\b/))
    add('interior-design', 'lighting');
  if (has(/\bfurniture|sofa|chair|table|bed frame|headboard|ottoman|rug\b/))
    add('interior-design', 'furniture');
  if (has(/\bsmall|tiny|apartment|narrow|galley|tight space\b/))
    add('interior-design', 'small-spaces');
  if (has(/\btrend|new year\b/)) add('interior-design', 'design-trends');

  const styles: Array<[RegExp, string]> = [
    [/\borganic modern\b/, 'organic-modern'],
    [/\bmidcentury|mid-century\b/, 'midcentury-modern'],
    [/\bmodern\b/, 'modern'],
    [/\bminimalist\b/, 'minimalist'],
    [/\bluxury|luxe|expensive\b/, 'luxury'],
    [/\bscandinavian|scandi\b/, 'scandinavian'],
    [/\btraditional|timeless|classic\b/, 'traditional'],
    [/\bwarm neutral\b/, 'warm-neutral'],
    [/\bboho\b/, 'boho'],
    [/\bfarmhouse\b/, 'farmhouse'],
    [/\bjapandi\b/, 'japandi'],
    [/\bmaximalist\b/, 'maximalist'],
    [/\bretro\b/, 'retro'],
  ];
  for (const [expression, slug] of styles) {
    if (has(expression)) add('interior-design', 'design-styles', slug);
  }

  for (const tag of article.tags ?? []) {
    const slug = tag
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    if (ARTICLE_COLLECTION_SLUGS.has(slug)) add(slug);
  }

  const styleCollections = styles.map(([, slug]) => slug);
  if ([...collections].some((slug) => styleCollections.includes(slug)))
    add('interior-design', 'design-styles');
  if (
    [...collections].some((slug) =>
      [
        'bedroom-organization',
        'kitchen-organization',
        'bathroom-organization',
        'closet-organization',
        'storage-ideas',
        'decluttering',
        'small-space-organization',
      ].includes(slug),
    )
  )
    add('home-organization');
  if (
    [...collections].some((slug) =>
      [
        'shopping-finds',
        'best-products',
        'buying-guides',
        'shop-the-look',
      ].includes(slug),
    )
  )
    add('shopping', 'home-finds');

  const shoppingCategory =
    article.kind === 'best'
      ? 'Best Products'
      : article.kind === 'guide'
        ? 'Buying Guide'
        : article.kind === 'look'
          ? 'Shop the Look'
          : article.kind === 'finds'
            ? 'Shopping Finds'
            : has(/\bbest[- ]sellers?|best[- ]products?\b/)
              ? 'Best Products'
              : 'Shopping Finds';
  const category = collections.has('shopping')
    ? shoppingCategory
    : collections.has('home-organization')
      ? 'Home Organization'
      : 'Home';

  return { collections: [...collections], category };
}
