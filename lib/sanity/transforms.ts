import type { BlogPost, TranslatedText, BlogAuthor } from '../../types/blogContent'
import type { ProductContent, FAQItem, ProductFeature, ProductSpec, Testimonial, ProductCTA } from '../../types/productContent'
import { urlFor } from './client'

// Transform Sanity blog post to existing BlogPost interface
export function transformBlogPost(post: any): BlogPost {
  return {
    slug: post.slug,
    publishedDate: post.publishedDate,
    updatedDate: post.updatedDate,
    author: {
      name: post.author || 'ZOR Professional Team',
    } as BlogAuthor,
    title: {
      hr: post.titleHr || '',
      en: post.titleEn || '',
    },
    excerpt: {
      hr: post.excerptHr || '',
      en: post.excerptEn || '',
    },
    content: {
      // Content is stored as HTML directly in Sanity
      hr: post.contentHr || '',
      en: post.contentEn || '',
    },
    metaDescription: {
      hr: post.metaDescriptionHr || '',
      en: post.metaDescriptionEn || '',
    },
    keywords: post.keywords || [],
    category: {
      hr: post.categoryHr || '',
      en: post.categoryEn || '',
    },
    tags: post.tags || [],
    featuredImage: {
      url: post.featuredImage ? urlFor(post.featuredImage).url() : '',
      alt: {
        hr: post.featuredImage?.altHr || '',
        en: post.featuredImage?.altEn || '',
      },
    },
    relatedProducts: post.relatedProducts || [],
    relatedPosts: post.relatedPosts || [],
    readingTime: post.readingTime,
    featured: post.featured || false,
  }
}

// Transform Sanity FAQ item to existing FAQItem interface
export function transformFaqItem(item: any): FAQItem {
  return {
    question: {
      hr: item.questionHr || '',
      en: item.questionEn || '',
    },
    answer: {
      hr: item.answerHr || '',
      en: item.answerEn || '',
    },
  }
}

// Transform Sanity product content to existing ProductContent interface
export function transformProductContent(content: any): ProductContent | null {
  if (!content) return null

  return {
    handle: content.shopifyHandle,
    priceNote: content.priceNoteHr || content.priceNoteEn ? {
      hr: content.priceNoteHr || '',
      en: content.priceNoteEn || '',
    } : undefined,
    badge: content.badge ? {
      label: {
        hr: content.badge.textHr || '',
        en: content.badge.textEn || '',
      },
      color: content.badge.color || 'primary',
    } : undefined,
    features: content.features?.map((f: any): ProductFeature => ({
      icon: f.icon || 'check_circle',
      title: {
        hr: f.titleHr || '',
        en: f.titleEn || '',
      },
      description: {
        hr: f.descriptionHr || '',
        en: f.descriptionEn || '',
      },
    })),
    specifications: content.specifications?.map((s: any): ProductSpec => ({
      label: {
        hr: s.labelHr || '',
        en: s.labelEn || '',
      },
      value: s.value || '',
    })),
    faq: content.faq?.map(transformFaqItem),
    testimonials: content.testimonials?.map((t: any): Testimonial => ({
      name: t.name || '',
      company: t.company,
      text: {
        hr: t.textHr || '',
        en: t.textEn || '',
      },
      rating: t.rating || 5,
    })),
    video: content.videoUrl ? {
      url: content.videoUrl,
      title: {
        hr: content.videoTitleHr || '',
        en: content.videoTitleEn || '',
      },
    } : undefined,
    frequentlyBoughtWith: content.frequentlyBoughtWith,
    cta: content.ctaTitleHr || content.ctaTitleEn ? {
      title: {
        hr: content.ctaTitleHr || '',
        en: content.ctaTitleEn || '',
      },
      description: {
        hr: content.ctaDescriptionHr || '',
        en: content.ctaDescriptionEn || '',
      },
    } as ProductCTA : undefined,
  }
}

// Transform site settings
export function transformSiteSettings(settings: any) {
  if (!settings) return null

  return {
    hero: {
      tagline: {
        hr: settings.heroTaglineHr || '',
        en: settings.heroTaglineEn || '',
      },
      title: {
        hr: settings.heroTitleHr || '',
        en: settings.heroTitleEn || '',
      },
      subtitle: {
        hr: settings.heroSubtitleHr || '',
        en: settings.heroSubtitleEn || '',
      },
      image: settings.heroImage ? urlFor(settings.heroImage).url() : null,
    },
    stats: settings.stats?.map((s: any) => ({
      value: s.value,
      label: {
        hr: s.labelHr || '',
        en: s.labelEn || '',
      },
    })) || [],
    contact: {
      email: settings.contactEmail || '',
      phone: settings.contactPhone || '',
      address: settings.contactAddress || '',
      businessHours: {
        hr: settings.businessHoursHr || '',
        en: settings.businessHoursEn || '',
      },
    },
  }
}

// Transform banner
export function transformBanner(banner: any) {
  if (!banner) return null

  return {
    location: banner.location,
    title: {
      hr: banner.titleHr || '',
      en: banner.titleEn || '',
    },
    subtitle: {
      hr: banner.subtitleHr || '',
      en: banner.subtitleEn || '',
    },
    cta: {
      text: {
        hr: banner.ctaTextHr || '',
        en: banner.ctaTextEn || '',
      },
      link: banner.ctaLink || '',
    },
    backgroundImage: banner.backgroundImage ? urlFor(banner.backgroundImage).url() : null,
  }
}
