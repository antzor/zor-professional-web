'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { urlFor } from '@/lib/sanity/client'

interface BlogPostData {
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
  tags?: string[]
  author?: string
  publishedDate?: string
  readingTime?: number
  relatedProducts?: string[]
}

export default function BlogPostContent({ post }: { post: BlogPostData }) {
  const { language, t } = useLanguage()

  const title = language === 'hr' ? post.titleHr : post.titleEn
  const content = language === 'hr' ? post.contentHr : post.contentEn
  const category = language === 'hr' ? post.categoryHr : post.categoryEn
  const imageUrl = post.featuredImage ? urlFor(post.featuredImage).width(1200).height(630).url() : null

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'hr' ? 'hr-HR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-primary transition-colors">{t('nav.blog')}</Link>
            <span>›</span>
            <span className="text-gray-900">{title}</span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          <div className="max-w-4xl mx-auto">
            {category && (
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {category}
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
              {post.author && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">person</span>
                    <span>{t('blog.byAuthor', { author: post.author })}</span>
                  </div>
                  <span>&bull;</span>
                </>
              )}
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                <span>{formatDate(post.publishedDate)}</span>
              </div>
              {post.readingTime && (
                <>
                  <span>&bull;</span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>{t('blog.readingTime', { minutes: post.readingTime.toString() })}</span>
                  </div>
                </>
              )}
            </div>

            {imageUrl && (
              <div className="aspect-video w-full rounded-xl overflow-hidden mb-12">
                <img src={imageUrl} alt={title || ''} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="max-w-4xl mx-auto">
          {content && (
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="material-symbols-outlined text-gray-400">label</span>
                <span className="text-sm text-gray-600 font-medium">{t('blog.tags')}:</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          {post.relatedProducts && post.relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">{t('blog.relatedProducts')}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {post.relatedProducts.map((handle) => (
                  <Link
                    key={handle}
                    href={`/products/${handle}`}
                    className="block p-6 border-2 border-gray-200 rounded-lg hover:border-primary hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <span className="material-symbols-outlined">inventory_2</span>
                      <span className="font-medium">{t('nav.products')}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 capitalize">{handle.replace(/-/g, ' ')}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back to Blog */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            {t('blog.allPosts')}
          </Link>
        </div>
      </div>
    </div>
  )
}
