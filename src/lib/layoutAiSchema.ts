// src/lib/schemas/layoutAiSchema.ts
import { z } from 'zod';

export const LayoutAiSchema = z.object({
  sections: z.array(
    z.object({
      blockType: z.enum([
        'challengesBlock',
        'solutionsBlock',
        'gainsBlock',
        'usageBlock',
        'faqAccordionBlock',
      ]).describe('Typ komponentu, który ma zostać wyrenderowany'),

      // Zamiast .optional() stosujemy .nullable():
      challengesVariant: z
        .enum(['two-columns', 'cards-alert', 'minimal-list'])
        .nullable()
        .describe('Wariant dla challengesBlock, w przeciwnym razie null'),

      solutionsVariant: z
        .enum(['grid-checkmarks', 'timeline-steps'])
        .nullable()
        .describe('Wariant dla solutionsBlock, w przeciwnym razie null'),

      gainsColumns: z
        .enum(['2', '3', 'bento'])
        .nullable()
        .describe('Układ kolumn dla gainsBlock, w przeciwnym razie null'),

      gainsPromotedIndex: z
        .number()
        .nullable()
        .describe('Indeks wyróżnionej korzyści w gainsBlock (0-based) lub null'),

      usageStyle: z
        .enum(['numbered-cards', 'horizontal-strip'])
        .nullable()
        .describe('Styl dla usageBlock, w przeciwnym razie null'),

      faqDefaultOpenFirst: z
        .boolean()
        .nullable()
        .describe('Czy pierwsze pytanie FAQ ma być otwarte, lub null dla innych bloków'),
    })
  ).describe('Kolejność i konfiguracja sekcji na stronie'),
});