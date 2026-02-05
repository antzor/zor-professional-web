import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'outletSectionTitleHr',
      title: 'Outlet Section Title (HR)',
      type: 'string',
    }),
    defineField({
      name: 'outletSectionTitleEn',
      title: 'Outlet Section Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'outletSectionSubtitleHr',
      title: 'Outlet Section Subtitle (HR)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'outletSectionSubtitleEn',
      title: 'Outlet Section Subtitle (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'outletSustainabilityHr',
      title: 'Outlet Sustainability Text (HR)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'outletSustainabilityEn',
      title: 'Outlet Sustainability Text (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'categoriesSectionTitleHr',
      title: 'Categories Section Title (HR)',
      type: 'string',
    }),
    defineField({
      name: 'categoriesSectionTitleEn',
      title: 'Categories Section Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'categoriesSectionSubtitleHr',
      title: 'Categories Section Subtitle (HR)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'categoriesSectionSubtitleEn',
      title: 'Categories Section Subtitle (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'whyChooseTitleHr',
      title: 'Why Choose Title (HR)',
      type: 'string',
    }),
    defineField({
      name: 'whyChooseTitleEn',
      title: 'Why Choose Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'whyChooseSubtitleHr',
      title: 'Why Choose Subtitle (HR)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'whyChooseSubtitleEn',
      title: 'Why Choose Subtitle (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'whyChooseItems',
      title: 'Why Choose Items',
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
      name: 'ctaSubtitleHr',
      title: 'CTA Subtitle (HR)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaSubtitleEn',
      title: 'CTA Subtitle (EN)',
      type: 'text',
      rows: 3,
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
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
