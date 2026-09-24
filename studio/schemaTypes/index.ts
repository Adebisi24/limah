import { defineType, defineField, defineArrayMember } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { UserIcon } from '@sanity/icons/User';
import { TagIcon } from '@sanity/icons/Tag';
import { CogIcon } from '@sanity/icons/Cog';
import { ImageIcon } from '@sanity/icons/Image';
const text = (name: string, title?: string) =>
  defineField({ name, title, type: 'string' });
const paragraph = (name: string, title?: string) =>
  defineField({ name, title, type: 'text', rows: 4 });
const strings = (name: string, title?: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({ type: 'string' })],
  });
const ref = (name: string, to: string) =>
  defineField({ name, type: 'reference', to: [{ type: to }] });
const refs = (name: string, to: string, title?: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({ type: 'reference', to: [{ type: to }] })],
  });
const image = (name: string) =>
  defineField({
    name,
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternative text',
        type: 'string',
        validation: (r) => r.required(),
      }),
      text('credit'),
      text('caption'),
      defineField({
        name: 'sourceUrl',
        type: 'url',
        validation: (r) => r.uri({ scheme: ['https', 'http'] }),
      }),
    ],
  });
const slug = defineField({
  name: 'slug',
  type: 'slug',
  options: { source: 'title' },
  validation: (r) =>
    r
      .required()
      .custom(
        (v) =>
          !v?.current ||
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v.current) ||
          'Use lowercase letters, numbers, and hyphens.',
      ),
});
const title = defineField({
  name: 'title',
  type: 'string',
  validation: (r) => r.required(),
});
const body = defineField({
  name: 'body',
  title: 'Introduction / article text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading', value: 'h2' },
        { title: 'Subheading', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                validation: (r) =>
                  r.uri({ scheme: ['https', 'http'], allowRelative: true }),
              }),
            ],
          }),
        ],
      },
    }),
  ],
});
const author = defineType({
  name: 'author',
  title: 'Authors',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    paragraph('bio'),
    image('portrait'),
  ],
});
const room = defineType({
  name: 'room',
  title: 'Rooms',
  type: 'document',
  icon: TagIcon,
  fields: [title, slug, paragraph('description'), image('image')],
});
const style = defineType({
  name: 'style',
  title: 'Styles',
  type: 'document',
  icon: TagIcon,
  fields: [title, slug, paragraph('description')],
});
const product = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: TagIcon,
  fields: [
    title,
    image('image'),
    defineField({
      name: 'matchType',
      title: 'Product relationship',
      type: 'string',
      initialValue: 'similar',
      options: {
        list: [
          { title: 'Exact product', value: 'exact' },
          { title: 'Similar look', value: 'similar' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'retailers',
      type: 'array',
      validation: (r) => r.max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'retailer',
          fields: [
            defineField({
              name: 'name',
              title: 'Retailer name',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'url',
              title: 'Product / affiliate URL',
              type: 'url',
              validation: (r) =>
                r.required().uri({ scheme: ['https', 'http'] }),
            }),
            text('verifiedPrice', 'Verified price label (optional)'),
            defineField({ name: 'priceCheckedAt', type: 'datetime' }),
          ],
        }),
      ],
    }),
  ],
});
const article = defineType({
  name: 'article',
  title: 'Articles',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'story', title: 'Story', default: true },
    { name: 'content', title: 'Content' },
    { name: 'relationships', title: 'Related content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    { ...title, group: 'story' },
    { ...slug, group: 'story' },
    defineField({
      name: 'kind',
      title: 'Article format',
      type: 'string',
      group: 'story',
      initialValue: 'inspiration',
      options: {
        list: [
          { title: 'Inspiration Article', value: 'inspiration' },
          { title: 'Shopping Finds', value: 'finds' },
          { title: 'Best Products', value: 'best' },
          { title: 'Buying Guide', value: 'guide' },
          { title: 'Shop the Look', value: 'look' },
        ],
      },
      validation: (r) => r.required(),
    }),
    {
      ...paragraph('excerpt'),
      group: 'story',
      validation: (r) => r.required().max(300),
    },
    { ...image('hero'), group: 'story', validation: (r) => r.required() },
    { ...ref('author', 'author'), group: 'story' },
    { ...ref('room', 'room'), group: 'story' },
    { ...refs('styles', 'style'), group: 'story' },
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      group: 'story',
      validation: (r) => r.required(),
    }),
    { ...body, group: 'content' },
    defineField({
      name: 'ideas',
      type: 'array',
      group: 'content',
      hidden: ({ document }) => document?.kind !== 'inspiration',
      of: [
        defineArrayMember({
          name: 'idea',
          type: 'object',
          icon: ImageIcon,
          fields: [title, image('image'), paragraph('text')],
        }),
      ],
    }),
    defineField({
      name: 'guideSections',
      title: 'Buying guide sections',
      type: 'array',
      group: 'content',
      hidden: ({ document }) => document?.kind !== 'guide',
      of: [
        defineArrayMember({
          name: 'guideSection',
          type: 'object',
          fields: [
            title,
            paragraph('text'),
            strings('checklist'),
            image('image'),
          ],
        }),
      ],
    }),
    defineField({
      name: 'products',
      type: 'array',
      group: 'content',
      hidden: ({ document }) => document?.kind === 'inspiration',
      of: [
        defineArrayMember({
          name: 'productEntry',
          type: 'object',
          fields: [
            { ...ref('product', 'product'), validation: (r) => r.required() },
            text('label', 'Award / quick-pick label'),
            paragraph('explanation', 'Why we like it / editorial explanation'),
            paragraph('whyItWorks'),
            paragraph('lookFor'),
            strings('pros'),
            strings('cons'),
            paragraph('details'),
          ],
          preview: {
            select: {
              title: 'product.title',
              subtitle: 'label',
              media: 'product.image',
            },
          },
        }),
      ],
    }),
    {
      ...paragraph(
        'methodology',
        'Selection methodology (state whether researched or tested)',
      ),
      group: 'content',
      hidden: ({ document }) => document?.kind !== 'best',
    },
    {
      ...refs('related', 'article', 'Preferred related articles'),
      group: 'relationships',
    },
    {
      ...refs('planLinks', 'article', 'Plan Your Room (text links)'),
      group: 'relationships',
      validation: (r) => r.max(8),
    },
    { ...text('seoTitle'), group: 'seo' },
    { ...paragraph('seoDescription'), group: 'seo' },
  ],
  preview: { select: { title: 'title', subtitle: 'kind', media: 'hero' } },
});
const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'brandName',
      type: 'string',
      initialValue: 'Nest Nabber',
    }),
    paragraph('description'),
    {
      ...ref('featuredArticle', 'article'),
      title: 'Homepage featured article',
    },
    { ...refs('latestArticles', 'article'), title: 'Homepage latest articles' },
    defineField({
      name: 'contactEmail',
      type: 'string',
      validation: (r) => r.email(),
    }),
  ],
});
export const schemaTypes = [
  author,
  room,
  style,
  product,
  article,
  siteSettings,
];
