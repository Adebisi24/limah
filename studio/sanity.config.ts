import { defineConfig } from 'sanity';
import { structureTool, type StructureBuilder } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { SITE_AUTHOR_ID } from './siteAuthor';
import { ARTICLE_COLLECTION_GROUPS } from '../article-collections';

const singletonTypes = new Set(['siteSettings', 'author']);

const articleStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Articles by collection')
    .child(
      S.list()
        .title('Articles by collection')
        .items([
          S.documentTypeListItem('article').title('All articles'),
          S.divider(),
          ...ARTICLE_COLLECTION_GROUPS.map((group) =>
            S.listItem()
              .title(group.title)
              .child(
                S.list()
                  .title(group.title)
                  .items([
                    S.listItem()
                      .title(`All ${group.title}`)
                      .child(
                        S.documentList()
                          .title(`All ${group.title}`)
                          .schemaType('article')
                          .filter(
                            '_type == "article" && $collection in collections',
                          )
                          .params({ collection: group.slug }),
                      ),
                    ...group.children.map((collection) =>
                      S.listItem()
                        .title(collection.title)
                        .child(
                          S.documentList()
                            .title(collection.title)
                            .schemaType('article')
                            .filter(
                              '_type == "article" && $collection in collections',
                            )
                            .params({ collection: collection.slug }),
                        ),
                    ),
                  ]),
              ),
          ),
        ]),
    );

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
            articleStructure(S),
            ...S.documentTypeListItems().filter(
              (item) =>
                !singletonTypes.has(item.getId() ?? '') &&
                item.getId() !== 'article',
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
