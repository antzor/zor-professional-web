import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nameEn', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameHr',
      title: 'Name (HR)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: 'Name (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionHr',
      title: 'Description (HR)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Material Symbol Icon',
      type: 'string',
      description: 'e.g. paper_roll, dry_cleaning, folder_zip, layers',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'nameEn',
      subtitle: 'slug.current',
      media: 'image',
    },
  },
})
