import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'titleEn',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleHr',
      title: 'Naslov (HR)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerptHr',
      title: 'Sažetak (HR)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'excerptEn',
      title: 'Excerpt (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contentHr',
      title: 'Sadržaj (HR) - HTML',
      type: 'text',
      description: 'HTML content for Croatian version',
    }),
    defineField({
      name: 'contentEn',
      title: 'Content (EN) - HTML',
      type: 'text',
      description: 'HTML content for English version',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'altHr',
          type: 'string',
          title: 'Alt tekst (HR)',
        },
        {
          name: 'altEn',
          type: 'string',
          title: 'Alt text (EN)',
        },
      ],
    }),
    defineField({
      name: 'categoryHr',
      title: 'Kategorija (HR)',
      type: 'string',
      options: {
        list: [
          { title: 'Vodiči', value: 'Vodiči' },
          { title: 'Industrija', value: 'Industrija' },
          { title: 'Održivost', value: 'Održivost' },
          { title: 'Poslovanje', value: 'Poslovanje' },
        ],
      },
    }),
    defineField({
      name: 'categoryEn',
      title: 'Category (EN)',
      type: 'string',
      options: {
        list: [
          { title: 'Guides', value: 'Guides' },
          { title: 'Industry', value: 'Industry' },
          { title: 'Sustainability', value: 'Sustainability' },
          { title: 'Business', value: 'Business' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'ZOR Professional Team',
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
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
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products (Shopify handles)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'titleEn',
      subtitle: 'categoryEn',
      media: 'featuredImage',
    },
  },
})
