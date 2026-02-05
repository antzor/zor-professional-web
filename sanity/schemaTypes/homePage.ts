import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'outlet', title: 'Outlet Section' },
    { name: 'categories', title: 'Categories Section' },
    { name: 'whyChoose', title: 'Why Choose Section' },
    { name: 'cta', title: 'CTA Section' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Hero Section
    defineField({
      name: 'heroTaglineHr',
      title: 'Hero Tagline (HR)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTaglineEn',
      title: 'Hero Tagline (EN)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitleHr',
      title: 'Hero Title (HR)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitleEn',
      title: 'Hero Title (EN)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitleHr',
      title: 'Hero Subtitle (HR)',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitleEn',
      title: 'Hero Subtitle (EN)',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics Bar',
      type: 'array',
      group: 'hero',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string', description: 'e.g. "15+", "500+"' },
            { name: 'labelHr', title: 'Label (HR)', type: 'string' },
            { name: 'labelEn', title: 'Label (EN)', type: 'string' },
          ],
          preview: {
            select: { title: 'value', subtitle: 'labelEn' },
          },
        },
      ],
    }),

    // Outlet Section
    defineField({
      name: 'outletSectionTitleHr',
      title: 'Outlet Section Title (HR)',
      type: 'string',
      group: 'outlet',
    }),
    defineField({
      name: 'outletSectionTitleEn',
      title: 'Outlet Section Title (EN)',
      type: 'string',
      group: 'outlet',
    }),
    defineField({
      name: 'outletSectionSubtitleHr',
      title: 'Outlet Section Subtitle (HR)',
      type: 'text',
      rows: 3,
      group: 'outlet',
    }),
    defineField({
      name: 'outletSectionSubtitleEn',
      title: 'Outlet Section Subtitle (EN)',
      type: 'text',
      rows: 3,
      group: 'outlet',
    }),
    defineField({
      name: 'outletSustainabilityHr',
      title: 'Outlet Sustainability Text (HR)',
      type: 'text',
      rows: 3,
      group: 'outlet',
    }),
    defineField({
      name: 'outletSustainabilityEn',
      title: 'Outlet Sustainability Text (EN)',
      type: 'text',
      rows: 3,
      group: 'outlet',
    }),

    // Categories Section
    defineField({
      name: 'categoriesSectionTitleHr',
      title: 'Categories Section Title (HR)',
      type: 'string',
      group: 'categories',
    }),
    defineField({
      name: 'categoriesSectionTitleEn',
      title: 'Categories Section Title (EN)',
      type: 'string',
      group: 'categories',
    }),
    defineField({
      name: 'categoriesSectionSubtitleHr',
      title: 'Categories Section Subtitle (HR)',
      type: 'text',
      rows: 3,
      group: 'categories',
    }),
    defineField({
      name: 'categoriesSectionSubtitleEn',
      title: 'Categories Section Subtitle (EN)',
      type: 'text',
      rows: 3,
      group: 'categories',
    }),

    // Why Choose Section
    defineField({
      name: 'whyChooseTitleHr',
      title: 'Why Choose Title (HR)',
      type: 'string',
      group: 'whyChoose',
    }),
    defineField({
      name: 'whyChooseTitleEn',
      title: 'Why Choose Title (EN)',
      type: 'string',
      group: 'whyChoose',
    }),
    defineField({
      name: 'whyChooseSubtitleHr',
      title: 'Why Choose Subtitle (HR)',
      type: 'text',
      rows: 3,
      group: 'whyChoose',
    }),
    defineField({
      name: 'whyChooseSubtitleEn',
      title: 'Why Choose Subtitle (EN)',
      type: 'text',
      rows: 3,
      group: 'whyChoose',
    }),
    defineField({
      name: 'whyChooseItems',
      title: 'Why Choose Items',
      type: 'array',
      group: 'whyChoose',
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

    // CTA Section
    defineField({
      name: 'ctaTitleHr',
      title: 'CTA Title (HR)',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaTitleEn',
      title: 'CTA Title (EN)',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaSubtitleHr',
      title: 'CTA Subtitle (HR)',
      type: 'text',
      rows: 3,
      group: 'cta',
    }),
    defineField({
      name: 'ctaSubtitleEn',
      title: 'CTA Subtitle (EN)',
      type: 'text',
      rows: 3,
      group: 'cta',
    }),
    defineField({
      name: 'ctaButtonTextHr',
      title: 'CTA Button Text (HR)',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaButtonTextEn',
      title: 'CTA Button Text (EN)',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      group: 'cta',
    }),

    // SEO
    defineField({
      name: 'metaTitleHr',
      title: 'Meta Title (HR)',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'metaTitleEn',
      title: 'Meta Title (EN)',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'metaDescriptionHr',
      title: 'Meta Description (HR)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    }),
    defineField({
      name: 'metaDescriptionEn',
      title: 'Meta Description (EN)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
