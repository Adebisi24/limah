import { defineArrayMember, defineField } from 'sanity';

const string = (name: string, title?: string) =>
  defineField({ name, title, type: 'string' });
const text = (name: string, title?: string) =>
  defineField({ name, title, type: 'text' });
const strings = (name: string) =>
  defineField({ name, type: 'array', of: [{ type: 'string' }] });
const photo = defineField({
  name: 'image',
  type: 'image',
  options: { hotspot: true },
  fields: [string('alt'), string('caption'), string('credit')],
});
const product = defineField({
  name: 'product',
  type: 'reference',
  to: [{ type: 'product' }],
  validation: (r) => r.required(),
});
const link = defineArrayMember({
  name: 'designLink',
  type: 'object',
  fields: [
    string('title'),
    defineField({
      name: 'href',
      type: 'url',
      validation: (r) =>
        r.uri({ allowRelative: true, scheme: ['https', 'http'] }),
    }),
  ],
});
const object = (name: string, title: string, fields: any[]) =>
  defineArrayMember({
    name,
    title,
    type: 'object',
    fields,
    preview: {
      select: { title: 'title', text: 'text' },
      prepare: ({ title: heading, text: value }) => ({
        title:
          heading || (typeof value === 'string' ? value.slice(0, 80) : title),
        subtitle: title,
      }),
    },
  });

/** Ordered blocks for every template in the supplied design. Existing fields remain intact. */
export const designBlocks = defineField({
  name: 'designBlocks',
  title: 'Designed article sections',
  type: 'array',
  group: 'content',
  description:
    'Optional complete ordered layout. When filled, these sections replace the legacy body/ideas/products layout. Existing content is retained.',
  of: [
    object('nnProse', 'Paragraph', [text('text')]),
    object('nnHeading', 'Heading', [string('text')]),
    object('nnImage', 'Photo', [photo, string('caption')]),
    object('nnIdea', 'Numbered idea', [
      defineField({
        name: 'number',
        type: 'number',
        validation: (r) => r.integer().positive(),
      }),
      string('title'),
      photo,
      strings('text'),
    ]),
    object('nnTip', 'Design tip', [string('title'), text('text')]),
    object('nnCta', 'Image / text callout', [
      string('eyebrow'),
      string('title'),
      text('text'),
      photo,
      string('href'),
      string('ctaLabel'),
    ]),
    object('nnContextLinks', 'Contextual links', [
      string('title'),
      defineField({ name: 'links', type: 'array', of: [link] }),
    ]),
    object('nnProduct', 'Product recommendation', [
      product,
      string('label'),
      strings('text'),
      strings('pros'),
      strings('cons'),
      string('bestFor'),
      text('details'),
      defineField({
        name: 'status',
        title: 'Exact / similar look',
        type: 'string',
        options: { list: ['exact', 'similar'] },
      }),
    ]),
    object('nnQuickPicks', 'Quick Picks', [
      string('title'),
      text('intro'),
      defineField({
        name: 'picks',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'quickPick',
            fields: [product, string('reason'), string('retailer')],
          },
        ],
      }),
    ]),
    object('nnQuickShop', 'Quick Shop', [
      string('title'),
      defineField({
        name: 'items',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'quickShopItem',
            fields: [product, string('note')],
          },
        ],
      }),
    ]),
    object('nnQuickBrowse', 'Quick Browse', [
      string('title'),
      defineField({
        name: 'items',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'browseItem',
            fields: [product, string('name'), string('note')],
          },
        ],
      }),
    ]),
    object('nnComparison', 'Product comparison', [
      string('title'),
      text('caption'),
      strings('columns'),
      defineField({
        name: 'rows',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'comparisonRow',
            fields: [product, strings('cells')],
          },
        ],
      }),
    ]),
    object('nnChecklist', 'Checklist', [string('title'), strings('items')]),
    object('nnDiagram', 'Lighting diagram', [
      defineField({
        name: 'variant',
        type: 'string',
        initialValue: 'lighting',
        options: { list: ['lighting'] },
      }),
    ]),
  ],
});
