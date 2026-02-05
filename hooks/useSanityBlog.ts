import { useState, useEffect } from 'react'
import { sanityClient } from '../lib/sanity/client'
import { ALL_BLOG_POSTS_QUERY, BLOG_POST_BY_SLUG_QUERY, FEATURED_BLOG_POSTS_QUERY } from '../lib/sanity/queries'
import { transformBlogPost } from '../lib/sanity/transforms'
import type { BlogPost } from '../types/blogContent'

// Hook for fetching all blog posts from Sanity
export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true)
        const sanityPosts = await sanityClient.fetch(ALL_BLOG_POSTS_QUERY)
        setPosts(sanityPosts.map(transformBlogPost))
        setError(null)
      } catch (err) {
        console.error('Failed to fetch blog posts from Sanity:', err)
        setError('Failed to load blog posts')
        setPosts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return { posts, isLoading, error }
}

// Hook for fetching a single blog post by slug
export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      if (!slug) {
        setPost(null)
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const sanityPost = await sanityClient.fetch(BLOG_POST_BY_SLUG_QUERY, { slug })

        if (sanityPost) {
          setPost(transformBlogPost(sanityPost))
          setError(null)
        } else {
          setPost(null)
          setError('Post not found')
        }
      } catch (err) {
        console.error('Failed to fetch blog post from Sanity:', err)
        setPost(null)
        setError('Failed to load blog post')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  return { post, isLoading, error }
}

// Hook for fetching featured blog posts
export function useFeaturedPosts(limit: number = 3) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true)
        const sanityPosts = await sanityClient.fetch(FEATURED_BLOG_POSTS_QUERY, { limit })
        setPosts(sanityPosts.map(transformBlogPost))
      } catch (err) {
        console.error('Failed to fetch featured posts from Sanity:', err)
        setPosts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [limit])

  return { posts, isLoading }
}

// Hook for getting unique categories from all posts
export function useBlogCategories(language: 'hr' | 'en' = 'en') {
  const { posts } = useBlogPosts()

  const categories = Array.from(
    new Set(posts.map(post => post.category[language]).filter(Boolean))
  )

  return categories
}
