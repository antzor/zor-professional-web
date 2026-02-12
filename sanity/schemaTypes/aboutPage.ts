import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
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
      name: 'storyParagraphs',
      title: 'Story Paragraphs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'textHr', title: 'Text (HR)', type: 'text', rows: 4 },
            { name: 'textEn', title: 'Text (EN)', type: 'text', rows: 4 },
          ],
          preview: {
            select: { title: 'textEn' },
          },
        },
      ],
    }),
    defineField({
      name: 'factoryImage',
      title: 'Factory Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'valuesSectionTitleHr',
      title: 'Values Section Title (HR)',
      type: 'string',
    }),
    defineField({
      name: 'valuesSectionTitleEn',
      title: 'Values Section Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'values',
      title: 'Values',
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
      name: 'locationTitleHr',
      title: 'Location Title (HR)',
      type: 'string',
    }),
    defineField({
      name: 'locationTitleEn',
      title: 'Location Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'locationDescriptionHr',
      title: 'Location Description (HR)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'locationDescriptionEn',
      title: 'Location Description (EN)',
      type: 'text',
      rows: 3,
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
      return { title: 'About Page' }
    },
  },
})
