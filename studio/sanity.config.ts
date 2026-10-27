/**
 * Finestra's Studio: where the shop adds, edits, and removes products.
 *
 * Hosted by Sanity at the studioHost in sanity.cli.ts. The website never
 * imports this folder; it reads published content over Sanity's HTTP API (see
 * lib/sanity.ts at the repository root).
 */

import {defineConfig, isDev} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {API_VERSION, dataset, projectId} from './env'

export default defineConfig({
  name: 'finestra',
  title: 'Finestra',
  projectId,
  dataset,
  plugins: [
    structureTool({structure}),
    // The GROQ playground is a developer tool. Keep it out of the shop's view.
    ...(isDev ? [visionTool({defaultApiVersion: API_VERSION})] : []),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      // "+" inside Products by category > Rings starts a product already set to Rings.
      {
        id: 'product-in-category',
        title: 'Product in this category',
        schemaType: 'product',
        parameters: [{name: 'categoryId', type: 'string'}],
        value: ({categoryId}: {categoryId: string}) => ({
          category: {_type: 'reference', _ref: categoryId},
        }),
      },
    ],
  },
})
