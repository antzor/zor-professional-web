import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'privateLabelPage',
  title: 'Private Label Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'problem', title: 'The Problem Section' },
    { name: 'solution', title: 'How We Solve This' },
    { name: 'process', title: 'How It Works' },
    { name: 'showcase', title: 'Product Showcase' },
    { name: 'benefits', title: 'Benefits Section' },
    { name: 'faq', title: 'FAQ Section' },
    { name: 'cta', title: 'CTA Section' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Hero Section
    defineField({
      name: 'titleHr',
      title: 'Title (HR)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (EN)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'subtitleHr',
      title: 'Subtitle (HR)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'subtitleEn',
      title: 'Subtitle (EN)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'introHr',
      title: 'Intro Text (HR)',
      type: 'text',
      rows: 4,
      group: 'hero',
    }),
    defineField({
      name: 'introEn',
      title: 'Intro Text (EN)',
      type: 'text',
      rows: 4,
      group: 'hero',
    }),

    // Problem Section
    defineField({
      name: 'problemTitleHr',
      title: 'Problem Title (HR)',
      type: 'string',
      group: 'problem',
    }),
    defineField({
      name: 'problemTitleEn',
      title: 'Problem Title (EN)',
      type: 'string',
      group: 'problem',
    }),
    defineField({
      name: 'problemSubtitleHr',
      title: 'Problem Subtitle (HR)',
      type: 'text',
      rows: 2,
      group: 'problem',
    }),
    defineField({
      name: 'problemSubtitleEn',
      title: 'Problem Subtitle (EN)',
      type: 'text',
      rows: 2,
      group: 'problem',
    }),
    defineField({
      name: 'problemItems',
      title: 'Problem Items',
      type: 'array',
      validation: (Rule) => Rule.max(3),
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
    }),

    // Solution Section
    defineField({
      name: 'solutionTitleHr',
      title: 'Solution Title (HR)',
      type: 'string',
      group: 'solution',
    }),
    defineField({
      name: 'solutionTitleEn',
      title: 'Solution Title (EN)',
      type: 'string',
      group: 'solution',
    }),
    defineField({
      name: 'solutionSubtitleHr',
      title: 'Solution Subtitle (HR)',
      type: 'text',
      rows: 2,
      group: 'solution',
    }),
    defineField({
      name: 'solutionSubtitleEn',
      title: 'Solution Subtitle (EN)',
      type: 'text',
      rows: 2,
      group: 'solution',
    }),
    defineField({
      name: 'solutionItems',
      title: 'Solution Items',
      type: 'array',
      validation: (Rule) => Rule.max(3),
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
    }),

    // Process Section (How It Works)
    defineField({
      name: 'processTitleHr',
      title: 'Process Title (HR)',
      type: 'string',
      group: 'process',
    }),
    defineField({
      name: 'processTitleEn',
      title: 'Process Title (EN)',
      type: 'string',
      group: 'process',
    }),
    defineField({
      name: 'processSubtitleHr',
      title: 'Process Subtitle (HR)',
      type: 'text',
      rows: 2,
      group: 'process',
    }),
    defineField({
      name: 'processSubtitleEn',
      title: 'Process Subtitle (EN)',
      type: 'text',
      rows: 2,
      group: 'process',
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      validation: (Rule) => Rule.max(4),
      group: 'process',
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
            select: { title: 'titleEn', subtitle: 'stepNumber' },
            prepare(selection) {
              const { title, subtitle } = selection
              return { title: `${subtitle}. ${title}` }
            },
          },
        },
      ],
    }),

    // Product Showcase
    defineField({
      name: 'showcaseTitleHr',
      title: 'Showcase Title (HR)',
      type: 'string',
      group: 'showcase',
    }),
    defineField({
      name: 'showcaseTitleEn',
      title: 'Showcase Title (EN)',
      type: 'string',
      group: 'showcase',
    }),
    defineField({
      name: 'showcaseSubtitleHr',
      title: 'Showcase Subtitle (HR)',
      type: 'text',
      rows: 2,
      group: 'showcase',
    }),
    defineField({
      name: 'showcaseSubtitleEn',
      title: 'Showcase Subtitle (EN)',
      type: 'text',
      rows: 2,
      group: 'showcase',
    }),
    defineField({
      name: 'showcaseImage',
      title: 'Showcase Image',
      type: 'image',
      options: { hotspot: true },
      group: 'showcase',
    }),
    defineField({
      name: 'showcaseFeatures',
      title: 'Showcase Features',
      type: 'array',
      group: 'showcase',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'textHr', title: 'Text (HR)', type: 'string' },
            { name: 'textEn', title: 'Text (EN)', type: 'string' },
          ],
          preview: {
            select: { title: 'textEn' },
          },
        },
      ],
    }),

    // Benefits Section
    defineField({
      name: 'benefitsTitleHr',
      title: 'Benefits Title (HR)',
      type: 'string',
      group: 'benefits',
    }),
    defineField({
      name: 'benefitsTitleEn',
      title: 'Benefits Title (EN)',
      type: 'string',
      group: 'benefits',
    }),
    defineField({
      name: 'benefitsSubtitleHr',
      title: 'Benefits Subtitle (HR)',
      type: 'text',
      rows: 2,
      group: 'benefits',
    }),
    defineField({
      name: 'benefitsSubtitleEn',
      title: 'Benefits Subtitle (EN)',
      type: 'text',
      rows: 2,
      group: 'benefits',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      group: 'benefits',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Material Symbol Icon (optional)', type: 'string' },
            { name: 'textHr', title: 'Text (HR)', type: 'string' },
            { name: 'textEn', title: 'Text (EN)', type: 'string' },
          ],
          preview: {
            select: { title: 'textEn', subtitle: 'icon' },
          },
        },
      ],
    }),

    // FAQ Section
    defineField({
      name: 'faqTitleHr',
      title: 'FAQ Title (HR)',
      type: 'string',
      group: 'faq',
    }),
    defineField({
      name: 'faqTitleEn',
      title: 'FAQ Title (EN)',
      type: 'string',
      group: 'faq',
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ Items',
      type: 'array',
      validation: (Rule) => Rule.max(6),
      group: 'faq',
      of: [
        {
          type: 'reference',
          to: [{ type: 'faqItem' }],
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
      rows: 2,
      group: 'cta',
    }),
    defineField({
      name: 'ctaSubtitleEn',
      title: 'CTA Subtitle (EN)',
      type: 'text',
      rows: 2,
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
  ],
  preview: {
    prepare() {
      return { title: 'Private Label Page' }
    },
  },
})
