import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'mainMenuItems',
      title: 'Main Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'labelHr', title: 'Label (HR)', type: 'string' },
            { name: 'labelEn', title: 'Label (EN)', type: 'string' },
            { name: 'path', title: 'Path', type: 'string', description: 'e.g. /products' },
            { name: 'highlight', title: 'Highlight (special styling)', type: 'boolean', initialValue: false },
          ],
          preview: {
            select: { title: 'labelEn', subtitle: 'path' },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaButtonTextHr',
      title: 'CTA Button Text (HR)',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonTextEn',
      title: 'CTA Button Text (EN)',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Navigation' }
    },
  },
})
