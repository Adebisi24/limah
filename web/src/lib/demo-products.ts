export function demoProducts(kind: string, articleTitle = '') {
  let names =
    kind === 'best'
      ? [
          'Ceramic Table Lamp',
          'Simple Table Lamp',
          'Compact Bedside Lamp',
          'Sculptural Table Lamp',
          'Adjustable Reading Lamp',
          'Linen Shade Table Lamp',
          'Warm Wood Table Lamp',
        ]
      : [
          'Textured Linen Cushion',
          'Soft Cotton Throw',
          'Warm Wood Bedside Table',
          'Ceramic Table Lamp',
          'Woven Storage Basket',
          'Neutral Bedroom Rug',
          'Linen Curtain Panel',
          'Cotton Duvet Cover',
          'Framed Botanical Print',
          'Bedside Catchall Tray',
          'Upholstered Bench',
          'Textured Pillow Cover',
          'Bedside Water Carafe',
          'Simple Wall Mirror',
          'Soft Mattress Pad',
        ];
  if (kind === 'best' && !/lamp/i.test(articleTitle))
    names = Array.from(
      { length: 7 },
      (_, i) =>
        [
          'Everyday',
          'Textured',
          'Compact',
          'Classic',
          'Natural',
          'Minimal',
          'Soft',
        ][i] +
        ' ' +
        (/rug/i.test(articleTitle)
          ? 'Bedroom Rug'
          : /nightstand/i.test(articleTitle)
            ? 'Nightstand'
            : 'Mattress Pad'),
    );
  const art = (name: string) =>
    /lamp/i.test(name)
      ? 'product'
      : /cushion|pillow/i.test(name)
        ? 'cushion'
        : /rug|throw/i.test(name)
          ? 'rug'
          : /table|nightstand|bench/i.test(name)
            ? 'nightstand'
            : /basket/i.test(name)
              ? 'basket'
              : /duvet|mattress/i.test(name)
                ? 'bedding'
                : /curtain/i.test(name)
                  ? 'curtain'
                  : /print|mirror/i.test(name)
                    ? 'frame'
                    : 'object';
  return names
    .slice(0, kind === 'look' ? 11 : kind === 'guide' ? 3 : 15)
    .map((title, i) => ({
      title,
      image: '/' + art(title) + '.svg',
      label: [
        'BEST OVERALL',
        'BEST BUDGET',
        'FOR SMALL BEDROOMS',
        'MODERN STYLE',
      ][i % 4],
      matchType: 'similar',
      retailers: [],
      explanation:
        'This is a sample product concept to demonstrate the layout. Add your selected product, your editorial explanation, and verified retailer links in Sanity before publishing.',
      whyItWorks:
        'A considered layer of texture and proportion for a calm bedroom.',
      lookFor:
        'Check the dimensions, material, finish, and suitability for your room before choosing a product.',
      details: 'Product specifications to be added by the editor.',
      pros: [
        'Space for an editor-verified benefit',
        'Space for a practical strength',
      ],
      cons: ['Space for an editor-verified limitation'],
    }));
}
