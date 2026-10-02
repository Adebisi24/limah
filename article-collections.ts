export interface ArticleCollection {
  slug: string;
  title: string;
}

export interface ArticleCollectionGroup extends ArticleCollection {
  href: string;
  children: ArticleCollection[];
}

export const ARTICLE_COLLECTION_GROUPS: ArticleCollectionGroup[] = [
  {
    slug: 'home',
    title: 'Home',
    href: '/collection/home',
    children: [
      { slug: 'home-finds', title: 'Home Finds' },
      { slug: 'whole-home', title: 'Whole Home' },
      { slug: 'bedroom', title: 'Bedroom' },
      { slug: 'living-room', title: 'Living Room' },
      { slug: 'kitchen', title: 'Kitchen' },
      { slug: 'bathroom', title: 'Bathroom' },
      { slug: 'home-office', title: 'Home Office' },
      { slug: 'entryway', title: 'Entryway' },
      { slug: 'outdoor', title: 'Outdoor Living' },
    ],
  },
  {
    slug: 'interior-design',
    title: 'Interior Design',
    href: '/interior-design',
    children: [
      { slug: 'design-ideas', title: 'Design Ideas' },
      { slug: 'design-styles', title: 'Design Styles' },
      { slug: 'color-paint', title: 'Color & Paint' },
      { slug: 'furniture', title: 'Furniture' },
      { slug: 'lighting', title: 'Lighting' },
      { slug: 'small-spaces', title: 'Small Spaces' },
      { slug: 'design-trends', title: 'Design Trends' },
      { slug: 'modern', title: 'Modern' },
      { slug: 'minimalist', title: 'Minimalist' },
      { slug: 'organic-modern', title: 'Organic Modern' },
      { slug: 'luxury', title: 'Luxury' },
      { slug: 'scandinavian', title: 'Scandinavian' },
      { slug: 'traditional', title: 'Traditional' },
      { slug: 'warm-neutral', title: 'Warm Neutral' },
      { slug: 'boho', title: 'Boho' },
      { slug: 'farmhouse', title: 'Farmhouse' },
      { slug: 'japandi', title: 'Japandi' },
      { slug: 'maximalist', title: 'Maximalist' },
      { slug: 'midcentury-modern', title: 'Midcentury Modern' },
      { slug: 'retro', title: 'Retro' },
    ],
  },
  {
    slug: 'home-organization',
    title: 'Home Organization',
    href: '/organization',
    children: [
      { slug: 'bedroom-organization', title: 'Bedroom Organization' },
      { slug: 'kitchen-organization', title: 'Kitchen Organization' },
      { slug: 'bathroom-organization', title: 'Bathroom Organization' },
      { slug: 'closet-organization', title: 'Closet Organization' },
      { slug: 'storage-ideas', title: 'Storage Ideas' },
      { slug: 'decluttering', title: 'Decluttering' },
      {
        slug: 'small-space-organization',
        title: 'Small-Space Organization',
      },
    ],
  },
  {
    slug: 'shopping',
    title: 'Shopping',
    href: '/shopping',
    children: [
      { slug: 'shopping-finds', title: 'Shopping Finds' },
      { slug: 'best-products', title: 'Best Products' },
      { slug: 'buying-guides', title: 'Buying Guides' },
      { slug: 'shop-the-look', title: 'Shop the Look' },
    ],
  },
];

export const ARTICLE_COLLECTIONS = ARTICLE_COLLECTION_GROUPS.flatMap(
  (group) => [
    { slug: group.slug, title: group.title, group: group.title },
    ...group.children.map((collection) => ({
      ...collection,
      group: group.title,
    })),
  ],
);

export const ARTICLE_COLLECTION_SLUGS = new Set(
  ARTICLE_COLLECTIONS.map((collection) => collection.slug),
);

export function getArticleCollection(slug: string) {
  return ARTICLE_COLLECTIONS.find((collection) => collection.slug === slug);
}

export function getArticleCollectionGroup(slug: string) {
  return ARTICLE_COLLECTION_GROUPS.find(
    (group) =>
      group.slug === slug ||
      group.children.some((collection) => collection.slug === slug),
  );
}
