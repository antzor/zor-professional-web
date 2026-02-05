import type { BlogPost } from '../../types/blogContent';

// Import blog posts
import { sustainablePaperSolutions } from './sustainable-paper-solutions';
import { whitelabelBenefits } from './whitelabel-benefits';
import { paperTowelTypes } from './paper-towel-types';

// Blog post registry
const blogPosts: Record<string, BlogPost> = {
  'sustainable-paper-solutions': sustainablePaperSolutions,
  'whitelabel-benefits': whitelabelBenefits,
  'paper-towel-types': paperTowelTypes,
};

// Get a single blog post by slug
export function getBlogPost(slug: string): BlogPost | null {
  return blogPosts[slug] || null;
}

// Get all blog posts sorted by published date (newest first)
export function getAllBlogPosts(): BlogPost[] {
  return Object.values(blogPosts).sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

// Get featured blog posts
export function getFeaturedBlogPosts(limit: number = 3): BlogPost[] {
  return getAllBlogPosts()
    .filter(post => post.featured)
    .slice(0, limit);
}

// Get blog posts by category
export function getBlogPostsByCategory(category: string, language: 'en' | 'hr' = 'en'): BlogPost[] {
  return getAllBlogPosts().filter(
    post => post.category[language].toLowerCase() === category.toLowerCase()
  );
}

// Get blog posts by tag
export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter(
    post => post.tags.includes(tag)
  );
}

// Get all unique categories
export function getAllCategories(language: 'en' | 'hr' = 'en'): string[] {
  const categories = getAllBlogPosts().map(post => post.category[language]);
  return Array.from(new Set(categories));
}

// Get all unique tags
export function getAllTags(): string[] {
  const tags = getAllBlogPosts().flatMap(post => post.tags);
  return Array.from(new Set(tags)).sort();
}

// Search blog posts by query (searches title, excerpt, content)
export function searchBlogPosts(query: string, language: 'en' | 'hr' = 'en'): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return getAllBlogPosts().filter(post => {
    const titleMatch = post.title[language].toLowerCase().includes(lowerQuery);
    const excerptMatch = post.excerpt[language].toLowerCase().includes(lowerQuery);
    const contentMatch = post.content[language].toLowerCase().includes(lowerQuery);
    return titleMatch || excerptMatch || contentMatch;
  });
}
