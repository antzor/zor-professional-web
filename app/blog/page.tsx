import { Metadata } from 'next'
import { fetchAllBlogPosts, fetchFeaturedBlogPosts } from '@/lib/sanity/fetch'
import BlogContent from './BlogContent'

export const metadata: Metadata = {
  title: 'Blog | ZOR Professional',
  description: 'Industry insights, product guides, and sustainability stories from ZOR Professional.',
}

export default async function BlogPage() {
  const [allPosts, featuredPosts] = await Promise.all([
    fetchAllBlogPosts().catch(() => []),
    fetchFeaturedBlogPosts(3).catch(() => []),
  ])

  return <BlogContent allPosts={allPosts || []} featuredPosts={featuredPosts || []} />
}
