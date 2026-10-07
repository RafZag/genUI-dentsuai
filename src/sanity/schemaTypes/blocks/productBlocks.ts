// sanity/schemaTypes/blocks/productBlocks.ts
import { defineField, defineType } from 'sanity';

export const challengesBlock = defineType({
  name: 'challengesBlock',
  title: 'Sekcja: Wyzwania',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Wariant',
      type: 'string',
      options: {
        list: [
          { title: '2 Kolumny', value: 'two-columns' },
          { title: 'Karty ostrzegawcze', value: 'cards-alert' },
          { title: 'Minimalistyczna lista', value: 'minimal-list' },
        ],
      },
      initialValue: 'two-columns',
    }),
  ],
});

export const solutionsBlock = defineType({
  name: 'solutionsBlock',
  title: 'Sekcja: Rozwiązania',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Wariant',
      type: 'string',
      options: {
        list: [
          { title: 'Siatka z ptaszkami', value: 'grid-checkmarks' },
          { title: 'Kroki / Oś czasu', value: 'timeline-steps' },
        ],
      },
      initialValue: 'grid-checkmarks',
    }),
  ],
});

export const gainsBlock = defineType({
  name: 'gainsBlock',
  title: 'Sekcja: Zyski / Korzyści',
  type: 'object',
  fields: [
    defineField({
      name: 'columns',
      title: 'Układ kolumn',
      type: 'string',
      options: {
        list: ['2', '3', 'bento'],
      },
      initialValue: '3',
    }),
    defineField({
      name: 'promotedIndex',
      title: 'Wyróżniony indeks',
      type: 'number',
    }),
  ],
});

export const usageBlock = defineType({
  name: 'usageBlock',
  title: 'Sekcja: Kiedy użyć',
  type: 'object',
  fields: [
    defineField({
      name: 'style',
      title: 'Styl',
      type: 'string',
      options: {
        list: [
          { title: 'Numerowane karty', value: 'numbered-cards' },
          { title: 'Pasek horyzontalny', value: 'horizontal-strip' },
        ],
      },
      initialValue: 'numbered-cards',
    }),
  ],
});

export const faqAccordionBlock = defineType({
  name: 'faqAccordionBlock',
  title: 'Sekcja: FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'defaultOpenFirst',
      title: 'Pierwsze pytanie domyślnie otwarte',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});