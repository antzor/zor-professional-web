import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchBlogPostBySlug, fetchAllBlogPosts } from '@/lib/sanity/fetch'
import BlogPostContent from './BlogPostContent'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await fetchAllBlogPosts().catch(() => [])
  return (posts || []).map((post: any) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchBlogPostBySlug(slug).catch(() => null)
  if (!post) return { title: 'Post Not Found | ZOR Professional' }
  return {
    title: `${post.titleEn || post.titleHr} | ZOR Professional Blog`,
    description: post.metaDescriptionEn || post.excerptEn || '',
    openGraph: {
      type: 'article',
      title: post.titleEn || post.titleHr,
      description: post.metaDescriptionEn || post.excerptEn || '',
      publishedTime: post.publishedDate,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await fetchBlogPostBySlug(slug).catch(() => null)

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} />
}
