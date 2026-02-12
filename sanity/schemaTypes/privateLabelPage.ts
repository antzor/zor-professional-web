import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'privateLabelPage',
  title: 'Private Label Page',
  type: 'document',
  fields: [
    defineField({
      name: 'titleHr',
      title: 'Title (HR)',
      type: 'string',
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'subtitleHr',
      title: 'Subtitle (HR)',
      type: 'string',
    }),
    defineField({
      name: 'subtitleEn',
      title: 'Subtitle (EN)',
      type: 'string',
    }),
    defineField({
      name: 'introHr',
      title: 'Intro Text (HR)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'introEn',
      title: 'Intro Text (EN)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'steps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Material Symbol Icon', type: 'string' },
            { name: 'titleHr', title: 'Title (HR)', type: 'string' },
            { name: 'titleEn', title: 'Title (EN)', type: 'string' },
            { name: 'descriptionHr', title: 'Description (HR)', type: 'text', rows: 3 },
            { name: 'descriptionEn', title: 'Description (EN)', type: 'text', rows: 3 },
          ],
          preview: {
            select: { title: 'titleEn', subtitle: 'icon' },
          },
        },
      ],
    }),
    defineField({
      name: 'benefitsTitleHr',
      title: 'Benefits Title (HR)',
      type: 'string',
    }),
    defineField({
      name: 'benefitsTitleEn',
      title: 'Benefits Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'textHr', title: 'Text (HR)', type: 'string' },
            { name: 'textEn', title: 'Text (EN)', type: 'string' },
          ],
          preview: {
            select: { title: 'textEn' },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaTitleHr',
      title: 'CTA Title (HR)',
      type: 'string',
    }),
    defineField({
      name: 'ctaTitleEn',
      title: 'CTA Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
    }),
    defineField({
      name: 'metaTitleHr',
      title: 'Meta Title (HR)',
      type: 'string',
    }),
    defineField({
      name: 'metaTitleEn',
      title: 'Meta Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'metaDescriptionHr',
      title: 'Meta Description (HR)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'metaDescriptionEn',
      title: 'Meta Description (EN)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Private Label Page' }
    },
  },
})
