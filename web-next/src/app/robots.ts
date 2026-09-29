import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  const live = process.env.CONTENT_MODE === 'sanity' && !!process.env.SITE_URL;
  return {
    rules: {
      userAgent: '*',
      ...(live
        ? { allow: '/', disallow: ['/search/', '/saved/'] }
        : { disallow: '/' }),
    },
    ...(live
      ? { sitemap: new URL('/sitemap.xml', process.env.SITE_URL).href }
      : {}),
  };
}
