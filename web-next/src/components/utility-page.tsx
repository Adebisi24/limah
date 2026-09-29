import Link from 'next/link';
import { Breadcrumbs } from './chrome';

export interface UtilityBlock {
  h?: string;
  p?: string;
  list?: string[];
}

export function UtilityPage({
  title,
  eyebrow,
  intro,
  blocks,
}: {
  title: string;
  eyebrow?: string;
  intro: string;
  blocks: UtilityBlock[];
}) {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-nn py-12">
          <div className="max-w-[720px]">
            <Breadcrumbs items={[{ label: title }]} />
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="mt-3 font-serif text-[34px] font-medium leading-[1.1] tracking-[-0.02em] text-charcoal sm:text-[42px]">
              {title}
            </h1>
            <p className="mt-5 font-serif text-[17px] leading-[1.65] text-stone">
              {intro}
            </p>
          </div>
        </div>
      </section>

      <section className="container-nn py-12">
        <div className="measure-nn">
          {blocks.map((b, i) => (
            <div key={i}>
              {b.h && <h2 className="nn-h2">{b.h}</h2>}
              {b.p && <p className="nn-p">{b.p}</p>}
              {b.list && (
                <ul className="mb-6 list-disc space-y-2 pl-5 text-[15.5px] leading-[1.75] text-ink-soft marker:text-clay">
                  {b.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <p className="mt-12 border-t border-line-soft pt-6 text-[13px] text-stone">
            Questions about this page?{' '}
            <Link href="/contact" className="text-link">
              Contact the Nest Nabber team
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
