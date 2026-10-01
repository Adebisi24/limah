import { Suspense } from 'react';
import { getAllArticlesLite } from '@/lib/articles';
import SearchResults from './search-results';
export const metadata = {
  title: 'Search',
  robots: { index: false, follow: false },
};
export default async function SearchPage() {
  const articles = await getAllArticlesLite();
  return (
    <Suspense
      fallback={
        <section className="container-nn py-12">
          <h1 className="h-display text-[34px]">Find what your home needs</h1>
          <p className="mt-4 text-stone">Loading search…</p>
        </section>
      }
    >
      <SearchResults
        articles={articles.map((article) => ({ ...article, body: [] }))}
      />
    </Suspense>
  );
}
