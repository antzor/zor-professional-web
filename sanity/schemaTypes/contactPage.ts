import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
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
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'subtitleEn',
      title: 'Subtitle (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'infoTitleHr',
      title: 'Info Section Title (HR)',
      type: 'string',
    }),
    defineField({
      name: 'infoTitleEn',
      title: 'Info Section Title (EN)',
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
      return { title: 'Contact Page' }
    },
  },
})
