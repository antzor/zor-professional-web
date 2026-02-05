import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'productContent',
  title: 'Product Content',
  type: 'document',
  fields: [
    defineField({
      name: 'shopifyHandle',
      title: 'Shopify Handle',
      type: 'string',
      description: 'Must match exactly the product handle in Shopify',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceNoteHr',
      title: 'Price Note (HR)',
      type: 'string',
      description: 'Text shown below price, e.g. "po kutiji od 6 rola"',
    }),
    defineField({
      name: 'priceNoteEn',
      title: 'Price Note (EN)',
      type: 'string',
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'object',
      fields: [
        {
          name: 'textHr',
          title: 'Text (HR)',
          type: 'string',
        },
        {
          name: 'textEn',
          title: 'Text (EN)',
          type: 'string',
        },
        {
          name: 'color',
          title: 'Color',
          type: 'string',
          options: {
            list: [
              { title: 'Green', value: 'green' },
              { title: 'Blue', value: 'blue' },
              { title: 'Red', value: 'red' },
              { title: 'Yellow', value: 'yellow' },
              { title: 'Primary', value: 'primary' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Material Symbol icon name (e.g. "check_circle")',
            },
            {
              name: 'titleHr',
              title: 'Title (HR)',
              type: 'string',
            },
            {
              name: 'titleEn',
              title: 'Title (EN)',
              type: 'string',
            },
            {
              name: 'descriptionHr',
              title: 'Description (HR)',
              type: 'text',
              rows: 2,
            },
            {
              name: 'descriptionEn',
              title: 'Description (EN)',
              type: 'text',
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: 'titleEn',
              subtitle: 'icon',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
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
            {
              name: 'value',
              title: 'Value',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'labelEn',
              subtitle: 'value',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'faq',
      title: 'Product FAQ',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'faqItem' }] }],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'company',
              title: 'Company',
              type: 'string',
            },
            {
              name: 'textHr',
              title: 'Text (HR)',
              type: 'text',
              rows: 3,
            },
            {
              name: 'textEn',
              title: 'Text (EN)',
              type: 'text',
              rows: 3,
            },
            {
              name: 'rating',
              title: 'Rating (1-5)',
              type: 'number',
              validation: (Rule) => Rule.min(1).max(5),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'company',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube embed URL',
    }),
    defineField({
      name: 'videoTitleHr',
      title: 'Video Title (HR)',
      type: 'string',
    }),
    defineField({
      name: 'videoTitleEn',
      title: 'Video Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'frequentlyBoughtWith',
      title: 'Frequently Bought With',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Shopify product handles',
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
      name: 'ctaDescriptionHr',
      title: 'CTA Description (HR)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaDescriptionEn',
      title: 'CTA Description (EN)',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'shopifyHandle',
    },
  },
})
