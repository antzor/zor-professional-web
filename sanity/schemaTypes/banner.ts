import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'banner',
  title: 'Banner / Promo',
  type: 'document',
  fields: [
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Section', value: 'hero' },
          { title: 'Homepage CTA', value: 'homepage-cta' },
          { title: 'Outlet Promo', value: 'outlet-promo' },
          { title: 'Product Page Banner', value: 'product-banner' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
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
      rows: 2,
    }),
    defineField({
      name: 'subtitleEn',
      title: 'Subtitle (EN)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaTextHr',
      title: 'CTA Button Text (HR)',
      type: 'string',
    }),
    defineField({
      name: 'ctaTextEn',
      title: 'CTA Button Text (EN)',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      description: 'e.g. /products or /contact',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this banner',
    }),
  ],
  preview: {
    select: {
      title: 'location',
      subtitle: 'titleEn',
      media: 'backgroundImage',
    },
  },
})
