import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { SITE_AUTHOR_ID } from './siteAuthor';

const singletonTypes = new Set(['siteSettings', 'author']);

export default defineConfig({
  name: 'nest-nabber',
  title: 'Nest Nabber',
  projectId: '9tacupln',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Nest Nabber')
          .items([
            S.listItem()
              .title('Site settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings'),
              ),
            S.listItem()
              .title('My author profile')
              .child(
                S.document().schemaType('author').documentId(SITE_AUTHOR_ID),
              ),
            ...S.documentTypeListItems().filter(
              (item) => !singletonTypes.has(item.getId() ?? ''),
            ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
  document: {
    newDocumentOptions: (options) =>
      options.filter((option) => !singletonTypes.has(option.schemaType)),
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter(
            (action) =>
              !['delete', 'duplicate', 'unpublish'].includes(
                action.action ?? '',
              ),
          )
        : actions,
  },
});
