import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
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
            ...S.documentTypeListItems().filter(
              (x) => x.getId() !== 'siteSettings',
            ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
