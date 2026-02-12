export interface TranslatedText {
  hr: string;
  en: string;
}

export interface BlogAuthor {
  name: string;
  role?: TranslatedText;
  avatar?: string;
}

export interface BlogPost {
  slug: string; // URL slug (e.g., "sustainable-paper-solutions")

  // Metadata
  publishedDate: string; // ISO format: "2025-02-01"
  updatedDate?: string;  // ISO format
  author: BlogAuthor;

  // Content
  title: TranslatedText;
  excerpt: TranslatedText; // Short summary for listing pages
  content: TranslatedText; // Full HTML content

  // SEO
  metaDescription: TranslatedText;
  keywords?: string[]; // SEO keywords

  // Categorization
  category: TranslatedText;
  tags: string[];

  // Media
  featuredImage: {
    url: string;
    alt: TranslatedText;
  };

  // Related content
  relatedProducts?: string[]; // Product handles
  relatedPosts?: string[];    // Other blog post slugs

  // Display options
  readingTime?: number; // Estimated reading time in minutes
  featured?: boolean;   // Show in featured section on homepage or blog page
}
