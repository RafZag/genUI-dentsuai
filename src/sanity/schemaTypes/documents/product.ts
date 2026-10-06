import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),    
    defineField({
      name: 'challenges',
      title: 'Challenges',
      type: 'array',
      of: [
        defineField({
          name: 'challenge',
          title: 'Challenge',
          type: 'object',
          fields: [
            defineField({
              name: 'header',
              title: 'Header',
              type: 'string',
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              title: 'header',
              subtitle: 'body',
            },
          },
        }),
      ],
    }),    
    defineField({
      name: 'solutions',
      title: 'Solution',
      type: 'array',
      of: [
        defineField({
          name: 'challenge',
          title: 'Challenge',
          type: 'object',
          fields: [
            defineField({
              name: 'header',
              title: 'Header',
              type: 'string',
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              title: 'header',
              subtitle: 'body',
            },
          },
        }),
      ],
    }),  
    defineField({
      name: 'gains',
      title: 'Gains',
      type: 'array',
      of: [
        defineField({
          name: 'gain',
          title: 'Gain',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
            }),
            defineField({
              name: 'header',
              title: 'Header',
              type: 'string',
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              title: 'header',
              subtitle: 'body',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'usage',
      title: 'Usage',
      type: 'array',
      of: [
        defineField({
          name: 'usage',
          title: 'Usage',
          type: 'object',
          fields: [
            defineField({
              name: 'header',
              title: 'Header',
              type: 'string',
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              title: 'header',
              subtitle: 'body',
            },
          },
        }),
      ],
    }),defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        defineField({
          name: 'faq',
          title: 'FAQ',
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'text',
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        }),
      ],
    }),
  ],
});