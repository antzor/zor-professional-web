import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Contact Address',
      type: 'string',
    }),
    defineField({
      name: 'businessHoursHr',
      title: 'Business Hours (HR)',
      type: 'string',
    }),
    defineField({
      name: 'businessHoursEn',
      title: 'Business Hours (EN)',
      type: 'string',
    }),
    defineField({
      name: 'footerDescriptionHr',
      title: 'Footer Description (HR)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'footerDescriptionEn',
      title: 'Footer Description (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'footerCopyrightHr',
      title: 'Footer Copyright (HR)',
      type: 'string',
      description: 'Use {year} for dynamic year',
    }),
    defineField({
      name: 'footerCopyrightEn',
      title: 'Footer Copyright (EN)',
      type: 'string',
      description: 'Use {year} for dynamic year',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
