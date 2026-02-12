// Types for local product content (extends Shopify products)

export interface TranslatedText {
  hr: string;
  en: string;
}

export interface ProductFeature {
  icon: string;
  title: TranslatedText;
  description: TranslatedText;
}

export interface ProductSpec {
  label: TranslatedText;
  value: string;
}

export interface FAQItem {
  question: TranslatedText;
  answer: TranslatedText;
}

export interface Testimonial {
  name: string;
  company?: string;
  text: TranslatedText;
  rating: number; // 1-5
}

export interface ProductVideo {
  url: string;
  title: TranslatedText;
  thumbnail?: string;
}

export interface ProductBadge {
  text: TranslatedText;
  color?: 'green' | 'blue' | 'red' | 'yellow' | 'primary';
}

export interface ProductCTA {
  title: TranslatedText;
  description: TranslatedText;
}

export interface ProductContent {
  handle: string; // Must match Shopify handle!

  // Additional info
  priceNote?: TranslatedText;

  // Badge
  badge?: ProductBadge;

  // Sections - all optional
  features?: ProductFeature[];
  specifications?: ProductSpec[];
  faq?: FAQItem[];
  testimonials?: Testimonial[];
  video?: ProductVideo;

  // Frequently bought together
  frequentlyBoughtWith?: string[]; // Shopify handles

  // CTA section
  cta?: ProductCTA;
}
