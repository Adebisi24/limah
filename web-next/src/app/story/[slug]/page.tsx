import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getArticleBySlug,
  listArticles,
  getReadableArticles,
} from '@/lib/articles';
import { FORMAT_LABELS, SHOPPING_FORMATS } from '@/lib/types';
import { ArticleActions } from '@/components/interactions';
import { BodyRenderer } from '@/components/body-renderer';
import {
  AuthorBio,
  Breadcrumbs,
  Byline,
  Disclosure,
  NewsletterBand,
  PlanYourRoom,
  RelatedGrid,
} from '@/components/chrome';
import { SectionHeader, StandardCard, TextLinkCard } from '@/components/cards';

const ROOM_NAMES: Record<string, string> = {
  bedroom: 'Bedroom',
  'living-room': 'Living Room',
  kitchen: 'Kitchen',
  bathroom: 'Bathroom',
  'whole-home': 'Home',
};

function categoryHref(category: string): string {
  switch (category) {
    case 'Home':
      return '/collection/home';
    case 'Bedroom':
      return '/rooms/bedroom';
    case 'Living Room':
      return '/rooms/living-room';
    case 'Kitchen':
      return '/rooms/kitchen';
    case 'Bathroom':
      return '/rooms/bathroom';
    case 'Home Organization':
      return '/organization';
    case 'Shopping Finds':
      return '/shopping/finds';
    case 'Best Products':
      return '/shopping/best-products';
    case 'Buying Guide':
      return '/shopping/buying-guides';
    case 'Shop the Look':
      return '/shopping/shop-the-look';
    default:
      return '/interior-design';
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = await getArticleBySlug(slug);
  if (!found) return { title: 'Article not found' };
  const { article } = found;
  return {
    title: article.seoTitle || article.title,
    description: article.description ?? article.subtitle ?? undefined,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description ?? article.subtitle ?? undefined,
      publishedTime: article.publishedAt.toISOString(),
      modifiedTime: article.updatedAt?.toISOString(),
      authors: [article.author],
    },
  };
}

const PLAN_YOUR_ROOM = [
  { title: 'Browse all bedroom ideas', href: '/rooms/bedroom' },
  {
    title: '15 Modern Luxury Bedroom Ideas',
    href: '/story/15-modern-luxury-bedroom-ideas',
  },
  {
    title: '15 Small Bedroom Ideas That Maximize Space',
    href: '/story/15-small-bedroom-ideas-that-maximize-space',
  },
  {
    title: '15 Small Bedroom Storage Ideas',
    href: '/story/15-small-bedroom-storage-ideas',
  },
  {
    title: 'How to Make a Small Bedroom Look Bigger',
    href: '/story/how-to-make-a-small-bedroom-look-bigger',
  },
  {
    title: 'How to Choose the Right Bedroom Lighting',
    href: '/story/how-to-choose-bedroom-lighting',
  },
  {
    title: 'How to Choose a Duvet Set',
    href: '/story/how-to-choose-a-duvet-set',
  },
  {
    title: '5 Best Area Rugs for Bedrooms',
    href: '/story/5-best-area-rugs-for-bedrooms',
  },
];

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = await getArticleBySlug(slug);
  if (!found) notFound();
  const { article, productMap } = found;
  const { format, room } = article;
  const roomName = ROOM_NAMES[room] ?? 'Home';
  const isShopping = SHOPPING_FORMATS.includes(format);

  // Related content (counts per approved wireframes)
  const isEditorial = format === 'inspiration' || format === 'howto';
  const relatedIdeas =
    isEditorial || format === 'finds' || format === 'best-products'
      ? await listArticles({
          room,
          formats: ['inspiration', 'howto'],
          excludeSlug: slug,
          limit: isEditorial ? 12 : 8,
        })
      : [];
  const relatedShopping =
    isEditorial || format === 'finds' || format === 'best-products'
      ? await listArticles({
          room,
          formats: SHOPPING_FORMATS,
          excludeSlug: slug,
          limit: isEditorial ? 8 : 12,
        })
      : [];
  const relatedLooks =
    format === 'shop-the-look'
      ? await listArticles({
          format: 'shop-the-look',
          excludeSlug: slug,
          limit: 8,
        })
      : [];
  const relatedGuides =
    format === 'buying-guide'
      ? await listArticles({
          format: 'buying-guide',
          excludeSlug: slug,
          limit: 4,
        })
      : [];
  const relatedEditorial =
    format === 'buying-guide'
      ? await listArticles({
          room,
          formats: ['inspiration', 'howto'],
          excludeSlug: slug,
          limit: 8,
        })
      : [];
  const relatedFinds =
    format === 'buying-guide'
      ? await listArticles({
          room,
          format: 'finds',
          excludeSlug: slug,
          limit: 4,
        })
      : [];

  return (
    <article>
      <div className="container-nn pt-10">
        <Breadcrumbs
          items={[
            { label: article.category, href: categoryHref(article.category) },
            { label: article.title },
          ]}
        />

        <header className="mx-auto max-w-[820px] text-center">
          <p className="eyebrow">
            {article.category}
            {isShopping ? ` · ${FORMAT_LABELS[format]}` : ''}
          </p>
          <h1 className="mt-4 font-serif text-[34px] font-medium leading-[1.1] tracking-[-0.02em] text-charcoal sm:text-[44px]">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="mx-auto mt-5 max-w-[640px] font-serif text-[18px] leading-[1.6] text-stone sm:text-[19px]">
              {article.subtitle}
            </p>
          )}
          <div className="mt-6 flex flex-col items-center gap-4">
            <Byline article={article} />
            <ArticleActions slug={article.slug} title={article.title} />
          </div>
        </header>
      </div>

      {/* Hero */}
      {article.imageUrl !== '/placeholder.svg' && (
        <figure className="container-nn mt-10">
          <div className="card-media aspect-[16/9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.imageUrl}
              alt={article.imageAlt ?? article.title}
            />
          </div>
        </figure>
      )}

      <div className="container-nn py-10">
        <div className="mx-auto max-w-[660px]">
          {isShopping && <Disclosure />}
          <BodyRenderer body={article.body} productMap={productMap} />

          {(format === 'inspiration' ||
            format === 'howto' ||
            format === 'buying-guide') && <AuthorBio article={article} />}
        </div>

        {/* Related content — full width */}
        {isEditorial && relatedIdeas.length > 0 && (
          <RelatedGrid
            eyebrow={`Explore ${roomName}`}
            title={`Related ${roomName} Ideas`}
            articles={relatedIdeas}
            link={{
              label: `All ${roomName} Ideas`,
              href: `/rooms/${room === 'whole-home' ? 'bedroom' : room}`,
            }}
          />
        )}
        {isEditorial && relatedShopping.length > 0 && (
          <RelatedGrid
            eyebrow={`For the ${roomName}`}
            title={`Shop for Your ${roomName}`}
            articles={relatedShopping}
            link={{ label: 'All Shopping', href: '/shopping' }}
          />
        )}
        {format === 'finds' && relatedShopping.length > 0 && (
          <RelatedGrid
            eyebrow="More Finds"
            title={`${roomName} Finds`}
            articles={relatedShopping}
            link={{ label: 'All Finds', href: '/shopping/finds' }}
          />
        )}
        {format === 'finds' && relatedIdeas.length > 0 && (
          <RelatedGrid
            eyebrow={`Explore ${roomName}`}
            title={`${roomName} Inspiration`}
            articles={relatedIdeas}
            link={{
              label: `All ${roomName} Stories`,
              href: `/rooms/${room === 'whole-home' ? 'bedroom' : room}`,
            }}
          />
        )}
        {format === 'best-products' && relatedShopping.length > 0 && (
          <RelatedGrid
            eyebrow="More Shopping"
            title={`${roomName} Shopping`}
            articles={relatedShopping}
            link={{ label: 'All Shopping', href: '/shopping' }}
          />
        )}
        {format === 'best-products' && relatedIdeas.length > 0 && (
          <RelatedGrid
            eyebrow={`Explore ${roomName}`}
            title={`${roomName} Inspiration`}
            articles={relatedIdeas}
            link={{
              label: `All ${roomName} Stories`,
              href: `/rooms/${room === 'whole-home' ? 'bedroom' : room}`,
            }}
          />
        )}

        {format === 'shop-the-look' && (
          <>
            {relatedLooks.length > 0 && (
              <RelatedGrid
                eyebrow="More to Shop"
                title="Looks to Shop"
                articles={relatedLooks}
                link={{
                  label: 'All Shop the Look',
                  href: '/shopping/shop-the-look',
                }}
              />
            )}
            <PlanYourRoom
              links={
                article.planLinks?.length ? article.planLinks : PLAN_YOUR_ROOM
              }
            />
          </>
        )}

        {format === 'buying-guide' && (
          <>
            {relatedGuides.length > 0 && (
              <section className="mt-16">
                <SectionHeader
                  eyebrow="Keep Learning"
                  title="Related Buying Guides"
                  link={{
                    label: 'All Guides',
                    href: '/shopping/buying-guides',
                  }}
                />
                <div className="grid gap-x-10 md:grid-cols-2">
                  {relatedGuides.map((g) => (
                    <TextLinkCard
                      key={g.slug}
                      href={`/story/${g.slug}`}
                      title={g.title}
                      desc={g.subtitle ?? undefined}
                    />
                  ))}
                </div>
              </section>
            )}
            {relatedEditorial.length > 0 && (
              <RelatedGrid
                eyebrow={`Explore ${roomName}`}
                title="Related Editorial"
                articles={relatedEditorial}
                link={{
                  label: `All ${roomName} Stories`,
                  href: `/rooms/${room === 'whole-home' ? 'bedroom' : room}`,
                }}
              />
            )}
            {relatedFinds.length > 0 && (
              <section className="mt-16">
                <SectionHeader
                  eyebrow="Shopping Finds"
                  title="Finds for the Room"
                  link={{ label: 'All Finds', href: '/shopping/finds' }}
                />
                <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                  {relatedFinds.map((a) => (
                    <StandardCard key={a.slug} article={a} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <NewsletterBand />
    </article>
  );
}

export async function generateStaticParams() {
  return (await getReadableArticles()).map(({ slug }) => ({ slug }));
}
