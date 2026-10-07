import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'
import { dataset, projectId } from './src/sanity/env'
import { ComposeLayoutAction } from '@/sanity/actions/composeLayoutAction';

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'Dentsu AI Studio',

  projectId,
  dataset,

  plugins: [structureTool(), visionTool(), presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),],

  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'product') {
        return [...prev, ComposeLayoutAction];
      }
      return prev;
    },
  },
})
