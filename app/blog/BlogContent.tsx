'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useScrollAnimation } from '@/app/components/hooks/useScrollAnimation'
import { urlFor } from '@/lib/sanity/client'

interface BlogPost {
  slug: string
  titleHr?: string
  titleEn?: string
  excerptHr?: string
  excerptEn?: string
  contentHr?: string
  contentEn?: string
  featuredImage?: any
  categoryHr?: string
  categoryEn?: string
  publishedDate?: string
  readingTime?: number
  featured?: boolean
}

function BlogCard({ post }: { post: BlogPost }) {
  const { language, t } = useLanguage()

  const title = language === 'hr' ? post.titleHr : post.titleEn
  const excerpt = language === 'hr' ? post.excerptHr : post.excerptEn
  const category = language === 'hr' ? post.categoryHr : post.categoryEn

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'hr' ? 'hr-HR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const imageUrl = post.featuredImage ? urlFor(post.featuredImage).width(600).height(400).url() : null

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title || ''}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-gray-300 text-4xl">article</span>
          </div>
        )}
      </div>
      <div className="p-6">
        {category && (
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              {category}
            </span>
          </div>
        )}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span>{formatDate(post.publishedDate)}</span>
            {post.readingTime && (
              <>
                <span>&bull;</span>
                <span>{t('blog.readingTime', { minutes: post.readingTime.toString() })}</span>
              </>
            )}
          </div>
          <span className="text-primary font-medium">{t('blog.readMore')} →</span>
        </div>
      </div>
    </Link>
  )
}

export default function BlogContent({
  allPosts,
  featuredPosts,
}: {
  allPosts: BlogPost[]
  featuredPosts: BlogPost[]
}) {
  const { language, t } = useLanguage()
  const headerRef = useScrollAnimation()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>()
    allPosts.forEach((post) => {
      const cat = language === 'hr' ? post.categoryHr : post.categoryEn
      if (cat) cats.add(cat)
    })
    return Array.from(cats)
  }, [allPosts, language])

  // Filter posts
  const filteredPosts = useMemo(() => {
    let posts = allPosts
    if (activeCategory) {
      posts = posts.filter((p) => {
        const cat = language === 'hr' ? p.categoryHr : p.categoryEn
        return cat === activeCategory
      })
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      posts = posts.filter((p) => {
        const title = (language === 'hr' ? p.titleHr : p.titleEn) || ''
        const excerpt = (language === 'hr' ? p.excerptHr : p.excerptEn) || ''
        return title.toLowerCase().includes(query) || excerpt.toLowerCase().includes(query)
      })
    }
    return posts
  }, [allPosts, activeCategory, searchQuery, language])

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-warm border-b border-gray-border">
        <div ref={headerRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <h1 className="text-gray-900 text-4xl font-black tracking-tight">{t('blog.title')}</h1>
          <p className="text-gray-600 text-lg mt-3 max-w-2xl">{t('blog.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>
            <input
              type="text"
              placeholder={t('blog.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-lg"
            />
          </div>
        </div>

        {/* Featured Posts */}
        {!activeCategory && !searchQuery && featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">{t('blog.featured')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
              activeCategory === null ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('blog.allPosts')}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* All Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">article</span>
            <p className="text-xl text-gray-500">{t('blog.noResults')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
