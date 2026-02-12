import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'problem', title: 'The Problem Section' },
    { name: 'solution', title: 'How We Solve This' },
    { name: 'trustedBy', title: 'Trusted By' },
    { name: 'howItWorks', title: 'How It Works' },
    { name: 'productHighlight', title: 'Product Highlight' },
    { name: 'homeFaq', title: 'FAQ Section' },
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

    // Problem Section
    defineField({
      name: 'problemTitleHr',
      title: 'Problem Section Title (HR)',
      type: 'string',
      group: 'problem',
    }),
    defineField({
      name: 'problemTitleEn',
      title: 'Problem Section Title (EN)',
      type: 'string',
      group: 'problem',
    }),
    defineField({
      name: 'problemSubtitleHr',
      title: 'Problem Section Subtitle (HR)',
      type: 'text',
      rows: 3,
      group: 'problem',
    }),
    defineField({
      name: 'problemSubtitleEn',
      title: 'Problem Section Subtitle (EN)',
      type: 'text',
      rows: 3,
      group: 'problem',
    }),
    defineField({
      name: 'problemItems',
      title: 'Pain Point Cards',
      type: 'array',
      group: 'problem',
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
      validation: (Rule) => Rule.max(3),
    }),

    // Solution Section
    defineField({
      name: 'solutionTitleHr',
      title: 'Solution Section Title (HR)',
      type: 'string',
      group: 'solution',
    }),
    defineField({
      name: 'solutionTitleEn',
      title: 'Solution Section Title (EN)',
      type: 'string',
      group: 'solution',
    }),
    defineField({
      name: 'solutionSubtitleHr',
      title: 'Solution Section Subtitle (HR)',
      type: 'text',
      rows: 3,
      group: 'solution',
    }),
    defineField({
      name: 'solutionSubtitleEn',
      title: 'Solution Section Subtitle (EN)',
      type: 'text',
      rows: 3,
      group: 'solution',
    }),
    defineField({
      name: 'solutionItems',
      title: 'Solution Feature Cards',
      type: 'array',
      group: 'solution',
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
      validation: (Rule) => Rule.max(3),
    }),

    // Trusted By Section
    defineField({
      name: 'trustedByTitleHr',
      title: 'Trusted By Title (HR)',
      type: 'string',
      group: 'trustedBy',
    }),
    defineField({
      name: 'trustedByTitleEn',
      title: 'Trusted By Title (EN)',
      type: 'string',
      group: 'trustedBy',
    }),
    defineField({
      name: 'trustedByLogos',
      title: 'Partner/Client Logos',
      type: 'array',
      group: 'trustedBy',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text (Company Name)', type: 'string' },
          ],
        },
      ],
    }),

    // How It Works Section
    defineField({
      name: 'howItWorksTitleHr',
      title: 'How It Works Title (HR)',
      type: 'string',
      group: 'howItWorks',
    }),
    defineField({
      name: 'howItWorksTitleEn',
      title: 'How It Works Title (EN)',
      type: 'string',
      group: 'howItWorks',
    }),
    defineField({
      name: 'howItWorksSubtitleHr',
      title: 'How It Works Subtitle (HR)',
      type: 'text',
      rows: 3,
      group: 'howItWorks',
    }),
    defineField({
      name: 'howItWorksSubtitleEn',
      title: 'How It Works Subtitle (EN)',
      type: 'text',
      rows: 3,
      group: 'howItWorks',
    }),
    defineField({
      name: 'howItWorksSteps',
      title: 'Steps',
      type: 'array',
      group: 'howItWorks',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'stepNumber', title: 'Step Number', type: 'number' },
            { name: 'icon', title: 'Material Symbol Icon', type: 'string' },
            { name: 'titleHr', title: 'Title (HR)', type: 'string' },
            { name: 'titleEn', title: 'Title (EN)', type: 'string' },
            { name: 'descriptionHr', title: 'Description (HR)', type: 'text', rows: 3 },
            { name: 'descriptionEn', title: 'Description (EN)', type: 'text', rows: 3 },
          ],
          preview: {
            select: { title: 'titleEn', sub: 'stepNumber' },
            prepare({ title, sub }) {
              return { title: `Step ${sub}: ${title}` }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),

    // Product Highlight Section
    defineField({
      name: 'productHighlightTitleHr',
      title: 'Product Highlight Title (HR)',
      type: 'string',
      group: 'productHighlight',
    }),
    defineField({
      name: 'productHighlightTitleEn',
      title: 'Product Highlight Title (EN)',
      type: 'string',
      group: 'productHighlight',
    }),
    defineField({
      name: 'productHighlightImage',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
      group: 'productHighlight',
    }),
    defineField({
      name: 'productHighlightBenefits',
      title: 'Benefits List',
      type: 'array',
      group: 'productHighlight',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'textHr', title: 'Benefit (HR)', type: 'string' },
            { name: 'textEn', title: 'Benefit (EN)', type: 'string' },
          ],
          preview: {
            select: { title: 'textEn' },
          },
        },
      ],
    }),
    defineField({
      name: 'productHighlightCtaTextHr',
      title: 'CTA Text (HR)',
      type: 'string',
      group: 'productHighlight',
    }),
    defineField({
      name: 'productHighlightCtaTextEn',
      title: 'CTA Text (EN)',
      type: 'string',
      group: 'productHighlight',
    }),
    defineField({
      name: 'productHighlightCtaLink',
      title: 'CTA Link',
      type: 'string',
      group: 'productHighlight',
    }),

    // Homepage FAQ Section
    defineField({
      name: 'homeFaqTitleHr',
      title: 'FAQ Section Title (HR)',
      type: 'string',
      group: 'homeFaq',
    }),
    defineField({
      name: 'homeFaqTitleEn',
      title: 'FAQ Section Title (EN)',
      type: 'string',
      group: 'homeFaq',
    }),
    defineField({
      name: 'homeFaqItems',
      title: 'FAQ Items',
      description: 'Select 3-5 FAQ items to display on homepage',
      type: 'array',
      group: 'homeFaq',
      of: [{ type: 'reference', to: [{ type: 'faqItem' }] }],
      validation: (Rule) => Rule.max(5),
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
