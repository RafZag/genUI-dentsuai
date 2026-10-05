import { defineField, defineType } from 'sanity';
// import { DocumentIcon } from '@sanity/icons';

export const page = defineType({
  name: 'page',
  title: 'Strony wizerunkowe',
  type: 'document',
  // icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Treść i Sekcje (Page Builder)', default: true },
    { name: 'seo', title: 'SEO & Social Media' },
  ],
  fields: [
    // ----------------------------------------------------
    // METADANE PODSTAWOWE
    // ----------------------------------------------------
    defineField({
      name: 'title',
      title: 'Tytuł strony (wewnętrzny)',
      type: 'string',
      description: 'Nazwa wyświetlana w panelu Sanity Studio, np. "O nas", "Strona Główna"',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Adres URL (Slug)',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    // ----------------------------------------------------
    // PAGE BUILDER (Tablica modularnych bloków)
    // ----------------------------------------------------
    defineField({
      name: 'sections',
      title: 'Układ sekcji strony',
      description: 'Dodawaj, usuwaj i zmieniaj kolejność klocków metodą przeciągnij-i-upuść.',
      type: 'array',
      group: 'content',
      of: [
        // Bloki wizerunkowe i narracyjne
        // { type: 'saasHeroBlock' },
        // { type: 'philosophyBlock' },
        // { type: 'teamGridBlock' },
        // { type: 'statsBlock' },
        
        // Bloki produktowe i agregujące
        { type: 'productCarouselBlock' },
        // { type: 'problemVsSolutionBlock' },
        // { type: 'bentoBenefitsBlock' },
        // { type: 'saasFaqBlock' },
      ],
    }),

    // ----------------------------------------------------
    // ZAKŁADKA SEO & OPEN GRAPH
    // ----------------------------------------------------
    defineField({
      name: 'seoTitle',
      title: 'Tytuł SEO (Meta Title)',
      type: 'string',
      group: 'seo',
      description: 'Zalecana długość: 50–60 znaków',
      validation: (rule) => rule.max(70).warning('Zbyt długi tytuł może zostać ucięty w Google'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Opis SEO (Meta Description)',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Zalecana długość: 120–160 znaków',
      validation: (rule) => rule.max(160).warning('Opis przekracza optymalną długość dla wyszukiwarki'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Grafika Open Graph (Social Media)',
      type: 'image',
      group: 'seo',
      description: 'Obrazek wyświetlany przy udostępnianiu linku na LinkedIn, Twitterze czy Slacku (1200x630 px)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noIndex',
      title: 'Ukryj przed wyszukiwarkami (noindex)',
      type: 'boolean',
      group: 'seo',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      sectionsCount: 'sections.length',
    },
    prepare({ title, slug, sectionsCount }) {
      return {
        title: title || 'Bez tytułu',
        subtitle: `/${slug || ''} (${sectionsCount || 0} sekcji)`,
      };
    },
  },
});