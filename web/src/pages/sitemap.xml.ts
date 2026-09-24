import type { APIRoute } from 'astro';
import { getArticles } from '../lib/content';
export const GET: APIRoute = async ({ site }) => {
  const paths =
    site && import.meta.env.CONTENT_MODE === 'sanity'
      ? [
          '/',
          '/shopping/',
          '/rooms/',
          '/interior-design/',
          '/organization/',
          '/about/',
          '/contact/',
          ...['bedroom', 'living-room', 'kitchen', 'bathroom'].map(
            (r) => `/rooms/${r}/`,
          ),
          ...(await getArticles()).map((a) => `/articles/${a.slug}/`),
        ]
      : [];
  const escape = (s: string) =>
    s
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${escape(new URL(path, site).href)}</loc></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
