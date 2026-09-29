import type { Metadata } from 'next';
import { getReadableArticles } from '@/lib/articles';
import type { Article } from '@/lib/types';
import { SavedList } from './saved-list';
import { NewsletterBand } from '@/components/chrome';

export const metadata: Metadata = {
  title: 'Saved Articles',
  description: 'Articles you have saved on this device to revisit later.',
};

export default async function SavedPage() {
  const all = await getReadableArticles();
  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-nn max-w-[820px] py-12">
          <p className="eyebrow">Your Shelf</p>
          <h1 className="mt-3 font-serif text-[34px] font-medium tracking-[-0.02em] text-charcoal sm:text-[42px]">
            Saved Articles
          </h1>
          <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-stone">
            Everything you save lives on this device — no account, no sign-in.
            Save an article from any story and it will be waiting here.
          </p>
        </div>
      </section>

      <section className="container-nn py-10">
        <SavedList articles={all} />
      </section>

      <NewsletterBand />
    </>
  );
}
