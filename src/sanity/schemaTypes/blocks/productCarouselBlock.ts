// sanity/schemaTypes/blocks/productCarouselBlock.ts
import { defineField, defineType } from 'sanity';

export const productCarouselBlock = defineType({
  name: 'productCarouselBlock',
  title: 'Karuzela / Siatka Produktów',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Nagłówek', type: 'string', initialValue: 'Nasze rozwiązania' }),
    defineField({ name: 'subheading', title: 'Podtytuł', type: 'string' }),
    defineField({
      name: 'displayMode',
      title: 'Tryb wyświetlania',
      type: 'string',
      options: {
        list: [
          { title: 'Automatycznie (Wszystkie najnowsze)', value: 'auto' },
          { title: 'Wybrane ręcznie (Manual)', value: 'manual' },
        ],
        layout: 'radio',
      },
      initialValue: 'auto',
    }),
    defineField({
      name: 'selectedProducts',
      title: 'Wybrane produkty',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      hidden: ({ parent }) => parent?.displayMode !== 'manual',
    }),
  ],
  preview: {
    select: { title: 'heading', mode: 'displayMode' },
    prepare({ title, mode }) {
      return { title: title || 'Produkty', subtitle: `Tryb: ${mode}` };
    },
  },
});