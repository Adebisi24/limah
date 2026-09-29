import StoryPage, {
  generateMetadata as storyMetadata,
} from '../../story/[slug]/page';
import { getReadableArticles } from '@/lib/articles';
import { legacyAliases } from '@/lib/legacy-content';
export async function generateStaticParams() {
  const slugs = new Set((await getReadableArticles()).map((a) => a.slug));
  return [
    ...new Set([
      ...slugs,
      ...Object.keys(legacyAliases).filter((s) => slugs.has(legacyAliases[s])),
    ]),
  ].map((slug) => ({ slug }));
}
async function canonical(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const target = legacyAliases[slug];
  const exists =
    target && (await getReadableArticles()).some((a) => a.slug === target);
  return { slug: exists ? target : slug };
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const next = canonical(params);
  return {
    ...(await storyMetadata({ params: next })),
    alternates: { canonical: '/story/' + (await next).slug + '/' },
  };
}
export default function LegacyArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return StoryPage({ params: canonical(params) });
}
