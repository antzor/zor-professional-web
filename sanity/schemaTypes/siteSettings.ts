import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTaglineHr',
      title: 'Hero Tagline (HR)',
      type: 'string',
    }),
    defineField({
      name: 'heroTaglineEn',
      title: 'Hero Tagline (EN)',
      type: 'string',
    }),
    defineField({
      name: 'heroTitleHr',
      title: 'Hero Title (HR)',
      type: 'string',
    }),
    defineField({
      name: 'heroTitleEn',
      title: 'Hero Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitleHr',
      title: 'Hero Subtitle (HR)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroSubtitleEn',
      title: 'Hero Subtitle (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'stats',
      title: 'Homepage Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g. "15+", "500+", "200+"',
            },
            {
              name: 'labelHr',
              title: 'Label (HR)',
              type: 'string',
            },
            {
              name: 'labelEn',
              title: 'Label (EN)',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'labelEn',
            },
          },
        },
      ],
    }),
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
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
