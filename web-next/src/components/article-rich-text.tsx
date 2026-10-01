import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { createImageUrlBuilder } from '@sanity/image-url';

const images = createImageUrlBuilder({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || '9tacupln',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
});

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="my-8">
        {value.asset && (
          // Content images keep their original aspect ratio.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={images.image(value).width(1400).auto('format').url()}
            alt={value.alt || ''}
            loading="lazy"
            className="h-auto w-full"
          />
        )}
        {value.caption && (
          <figcaption className="mt-2 text-sm text-stone">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    divider: () => <hr className="my-8 border-line" />,
  },
  block: {
    normal: ({ children }) => <p className="nn-p">{children}</p>,
    h1: ({ children }) => <h2 className="nn-h2">{children}</h2>,
    h2: ({ children }) => <h2 className="nn-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="nn-h3">{children}</h3>,
    h4: ({ children }) => <h4 className="nn-h3">{children}</h4>,
    h5: ({ children }) => <h5 className="nn-h3">{children}</h5>,
    h6: ({ children }) => <h6 className="nn-h3">{children}</h6>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-line pl-5 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 list-disc space-y-2 pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href;
      return typeof href === 'string' &&
        /^(https?:\/\/|\/(?!\/)|#|mailto:)/i.test(href) ? (
        <a href={href} className="underline underline-offset-4">
          {children}
        </a>
      ) : (
        <>{children}</>
      );
    },
  },
};

export function ArticleRichText({
  value,
}: {
  value: React.ComponentProps<typeof PortableText>['value'];
}) {
  return <PortableText value={value} components={components} />;
}
