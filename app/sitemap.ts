import { MetadataRoute } from 'next'
import { fetchAllBlogPosts } from '@/lib/sanity/fetch'
import { getProducts } from '@/lib/shopify/products'

const BASE_URL = 'https://zorprofessional.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/outlet`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/whitelabel`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  // Blog posts from Sanity
  const blogPosts = await fetchAllBlogPosts().catch(() => [])
  const blogPages: MetadataRoute.Sitemap = (blogPosts || []).map((post: any) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.publishedDate ? new Date(post.publishedDate) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Product pages from Shopify
  const products = await getProducts().catch(() => [])
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.handle}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...blogPages, ...productPages]
}
