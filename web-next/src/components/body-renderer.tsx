import type { BodyBlock, Product } from '@/lib/types';
import { PortableText } from '@portabletext/react';
import {
  Checklist,
  Comparison,
  QuickBrowse,
  QuickPicks,
  QuickShop,
  ProductRec,
  Tip,
} from './product';
import { CtaBlock, ContextLinks, LightingDiagram } from './chrome';

/** Renders an article's structured body. The first prose block is the lead. */
export function BodyRenderer({
  body,
  productMap,
}: {
  body: BodyBlock[];
  productMap: Map<number, Product>;
}) {
  const pickLabels = new Map(
    body.flatMap((block) =>
      block.type === 'product' && block.label
        ? [[block.productId, block.label] as const]
        : [],
    ),
  );
  const leadIndex = body.findIndex((block) => block.type === 'prose');
  return (
    <div className="mx-auto w-full max-w-[660px]">
      {body.map((block, i) => {
        switch (block.type) {
          case 'portableText':
            return (
              <div key={i} className="nn-p">
                <PortableText value={block.value} />
              </div>
            );
          case 'prose': {
            const isLead = i === leadIndex;
            return (
              <p key={i} className={isLead ? 'nn-p nn-p--lead' : 'nn-p'}>
                {block.text}
              </p>
            );
          }
          case 'heading':
            return (
              <h2 key={i} className="nn-h2">
                {block.text}
              </h2>
            );
          case 'image':
            return (
              <figure key={i} className="my-10">
                <div className="card-media mx-auto max-w-[600px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={block.src} alt={block.alt} loading="lazy" />
                </div>
                {block.caption && (
                  <figcaption className="mt-3 text-center text-[12.5px] text-stone">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case 'idea':
            return (
              <section key={i} className="my-12">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-[15px] italic leading-none text-clay-deep">
                    {String(block.number).padStart(2, '0')}
                  </span>
                  <h2 className="nn-h2 !mb-0 flex-1 !mt-0 text-[24px]">
                    {block.title}
                  </h2>
                </div>
                <div className="card-media mx-auto mt-5 max-w-[520px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={block.src} alt={block.alt} loading="lazy" />
                </div>
                <div className="mx-auto mt-5 max-w-[580px]">
                  {block.text.map((t, j) => (
                    <p key={j} className="nn-p">
                      {t}
                    </p>
                  ))}
                </div>
              </section>
            );
          case 'tip':
            return <Tip key={i} title={block.title} text={block.text} />;
          case 'cta': {
            return (
              <CtaBlock
                key={i}
                eyebrow={block.eyebrow}
                title={block.title}
                text={block.text}
                href={block.href}
                ctaLabel={block.ctaLabel}
                src={block.src}
                alt={block.alt}
              />
            );
          }
          case 'contextLinks':
            return (
              <ContextLinks key={i} title={block.title} links={block.links} />
            );
          case 'product': {
            const product = productMap.get(block.productId);
            if (!product) return null;
            return (
              <div
                key={i}
                id={`p-${block.productId}`}
                className="scroll-mt-28 pt-8"
              >
                <ProductRec
                  product={product}
                  label={block.label}
                  text={block.text}
                  pros={block.pros}
                  cons={block.cons}
                  bestFor={block.bestFor}
                  details={block.details}
                  status={block.status}
                />
              </div>
            );
          }
          case 'quickPicks': {
            // Follow article order and retain any curated retailer choices.
            const picksByProduct = new Map(
              block.picks.map((pick) => [pick.productId, pick]),
            );
            const productIds = [
              ...new Set([
                ...body.flatMap((entry) =>
                  entry.type === 'product' ? [entry.productId] : [],
                ),
                ...picksByProduct.keys(),
              ]),
            ];
            return (
              <QuickPicks
                key={i}
                title={block.title}
                intro={block.intro}
                picks={productIds.map((productId) => ({
                  productId,
                  reason: '',
                  ...picksByProduct.get(productId),
                  label: pickLabels.get(productId),
                }))}
                productMap={productMap}
              />
            );
          }
          case 'quickShop':
            return (
              <QuickShop
                key={i}
                title={block.title}
                items={block.items}
                productMap={productMap}
              />
            );
          case 'quickBrowse': {
            return (
              <QuickBrowse
                key={i}
                title={block.title}
                items={block.items.map((item) => ({
                  name: item.name,
                  product: productMap.get(item.productId),
                }))}
              />
            );
          }
          case 'comparison':
            return (
              <Comparison
                key={i}
                title={block.title}
                caption={block.caption}
                columns={block.columns}
                rows={block.rows}
                productMap={productMap}
              />
            );
          case 'checklist':
            return (
              <Checklist key={i} title={block.title} items={block.items} />
            );
          case 'diagram':
            return block.variant === 'lighting' ? (
              <LightingDiagram key={i} />
            ) : null;
          default:
            return null;
        }
      })}
    </div>
  );
}
