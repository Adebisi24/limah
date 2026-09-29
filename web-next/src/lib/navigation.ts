interface NavigationLink {
  label: string;
  href: string;
  desc?: string;
}
interface NavigationSection {
  label: string;
  href: string;
  children: NavigationLink[];
  secondaryTitle?: string;
  secondary?: NavigationLink[];
  footer?: NavigationLink;
}

export const MAIN_NAVIGATION: NavigationSection[] = [
  {
    label: 'Interior Design',
    href: '/interior-design',
    children: [
      { label: 'Design Ideas', href: '/collection/design-ideas' },
      { label: 'Design Styles', href: '/collection/design-styles' },
      { label: 'Color & Paint', href: '/collection/color-paint' },
      { label: 'Furniture', href: '/collection/furniture' },
      { label: 'Lighting', href: '/collection/lighting' },
      { label: 'Small Spaces', href: '/collection/small-spaces' },
      { label: 'Design Trends', href: '/collection/design-trends' },
    ],
    secondaryTitle: 'Browse by Style',
    secondary: [
      { label: 'Modern', href: '/collection/modern' },
      { label: 'Minimalist', href: '/collection/minimalist' },
      { label: 'Organic Modern', href: '/collection/organic-modern' },
      { label: 'Luxury', href: '/collection/luxury' },
      { label: 'Scandinavian', href: '/collection/scandinavian' },
      { label: 'Traditional', href: '/collection/traditional' },
    ],
  },
  {
    label: 'Rooms',
    href: '/rooms',
    children: [
      { label: 'Bedroom', href: '/rooms/bedroom' },
      { label: 'Living Room', href: '/rooms/living-room' },
      { label: 'Kitchen', href: '/rooms/kitchen' },
      { label: 'Bathroom', href: '/rooms/bathroom' },
    ],
    footer: { label: 'View All Rooms', href: '/rooms' },
  },
  {
    label: 'Home Organization',
    href: '/organization',
    children: [
      {
        label: 'Bedroom Organization',
        href: '/collection/bedroom-organization',
      },
      {
        label: 'Kitchen Organization',
        href: '/collection/kitchen-organization',
      },
      {
        label: 'Bathroom Organization',
        href: '/collection/bathroom-organization',
      },
      { label: 'Closet Organization', href: '/collection/closet-organization' },
      { label: 'Storage Ideas', href: '/collection/storage-ideas' },
      { label: 'Decluttering', href: '/collection/decluttering' },
      {
        label: 'Small-Space Organization',
        href: '/collection/small-space-organization',
      },
    ],
  },
  {
    label: 'Shopping',
    href: '/shopping',
    children: [
      {
        label: 'Shopping Finds',
        href: '/shopping/finds',
        desc: 'Fast, visual product discovery',
      },
      {
        label: 'Best Products',
        href: '/shopping/best-products',
        desc: 'Comparisons and decision support',
      },
      {
        label: 'Buying Guides',
        href: '/shopping/buying-guides',
        desc: 'The framework before you buy',
      },
      {
        label: 'Shop the Look',
        href: '/shopping/shop-the-look',
        desc: 'Rooms you can recreate, piece by piece',
      },
    ],
  },
];

export const SEARCH_SUGGESTIONS = [
  { label: 'Bedroom', q: 'bedroom' },
  { label: 'Lighting', q: 'lighting' },
  { label: 'Storage', q: 'storage' },
  { label: 'Shop the Look', q: 'shop the look' },
  { label: 'Rugs', q: 'rug' },
];
