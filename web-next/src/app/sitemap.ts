import type { MetadataRoute } from 'next';
import { getAllArticlesLite } from '@/lib/articles';
export const dynamic = 'force-static';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (process.env.CONTENT_MODE !== 'sanity' || !process.env.SITE_URL) return [];
  const pages = [
    '/',
    '/interior-design/',
    '/organization/',
    '/shopping/',
    '/rooms/',
    '/rooms/bedroom/',
    '/rooms/living-room/',
    '/rooms/kitchen/',
    '/rooms/bathroom/',
  ];
  return [
    ...pages.map((p) => ({ url: new URL(p, process.env.SITE_URL).href })),
    ...(await getAllArticlesLite()).map((a) => ({
      url: new URL('/story/' + a.slug + '/', process.env.SITE_URL).href,
      lastModified: a.updatedAt ?? a.publishedAt,
    })),
  ];
}
