import type { Product } from '../types/shopify';
import type { ProductContent } from '../types/productContent';
import type { Language } from '../context/LanguageContext';

const SITE_URL = 'https://zorprofessional.com';
const SITE_NAME = 'ZOR Professional';

// Generate canonical URL for a given path
export function getCanonicalUrl(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${SITE_URL}/${cleanPath}`;
}

// Generate hreflang tags for multi-language support
export function getHreflangTags(path: string): Array<{ hrefLang: string; href: string }> {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return [
    { hrefLang: 'en', href: `${SITE_URL}/${cleanPath}` },
    { hrefLang: 'hr', href: `${SITE_URL}/hr/${cleanPath}` },
    { hrefLang: 'x-default', href: `${SITE_URL}/${cleanPath}` }
  ];
}

// Generate Organization schema for the company
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    description: 'Premium paper solutions manufacturer based in Zagreb, Croatia. Specializing in toilet paper, paper towels, Z-fold and V-fold products for commercial and industrial use.',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Zagreb',
      addressCountry: 'HR'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Croatian']
    }
  };
}

// Generate Website schema
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/products?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

// Generate Breadcrumb schema
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// Generate Product schema with rich details
export function generateProductSchema(
  product: Product,
  productContent: ProductContent | null,
  language: Language
) {
  // Calculate average rating from testimonials if available
  let aggregateRating;
  if (productContent?.testimonials && productContent.testimonials.length > 0) {
    const totalRating = productContent.testimonials.reduce((sum, t) => sum + t.rating, 0);
    const avgRating = totalRating / productContent.testimonials.length;

    aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: productContent.testimonials.length,
      bestRating: 5,
      worstRating: 1
    };
  }

  // Build reviews from testimonials
  const reviews = productContent?.testimonials?.map(testimonial => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: testimonial.author.name
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: testimonial.rating,
      bestRating: 5,
      worstRating: 1
    },
    reviewBody: testimonial.text[language]
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.image || undefined,
    sku: product.variantId,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${SITE_URL}/products/${product.handle}`,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    brand: {
      '@type': 'Brand',
      name: SITE_NAME
    },
    ...(aggregateRating && { aggregateRating }),
    ...(reviews && reviews.length > 0 && { review: reviews })
  };
}

// Generate FAQ schema from product FAQ section
export function generateFAQSchema(
  faq: Array<{ question: { en: string; hr: string }; answer: { en: string; hr: string } }>,
  language: Language
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.question[language],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer[language]
      }
    }))
  };
}

// Generate Blog Post (Article) schema
export interface BlogPostData {
  title: string;
  description: string;
  image: string;
  publishedDate: string;
  updatedDate?: string;
  authorName: string;
  slug: string;
}

export function generateBlogPostSchema(post: BlogPostData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate || post.publishedDate,
    author: {
      '@type': 'Person',
      name: post.authorName
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`
    }
  };
}

// Truncate text to a specific length for meta descriptions
export function truncateText(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3).trim() + '...';
}

// Strip HTML tags from content
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

// Generate meta description from HTML content
export function generateMetaDescription(htmlContent: string, maxLength: number = 160): string {
  const plainText = stripHtml(htmlContent);
  return truncateText(plainText, maxLength);
}
