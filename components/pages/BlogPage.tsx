import { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useBlogPosts, useFeaturedPosts, useBlogCategories } from '../../hooks/useSanityBlog';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import BlogCard from '../blog/BlogCard';
import BlogCategoryFilter from '../blog/BlogCategoryFilter';
import SEOHead from '../seo/SEOHead';
import { getCanonicalUrl } from '../../lib/seo';

export default function BlogPage() {
  const { language, t } = useLanguage();
  const headerRef = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Use Sanity hooks for blog data
  const { posts: allPosts, isLoading } = useBlogPosts();
  const { posts: featuredPosts } = useFeaturedPosts(3);
  const categories = useBlogCategories(language);

  // Filter posts based on active category and search query
  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    // Filter by category
    if (activeCategory) {
      posts = posts.filter(post => post.category[language] === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post => {
        const titleMatch = post.title[language].toLowerCase().includes(query);
        const excerptMatch = post.excerpt[language].toLowerCase().includes(query);
        const contentMatch = post.content[language].toLowerCase().includes(query);
        return titleMatch || excerptMatch || contentMatch;
      });
    }

    return posts;
  }, [allPosts, activeCategory, searchQuery, language]);

  return (
    <>
      <SEOHead
        title={t('blog.title')}
        description={t('blog.subtitle')}
        canonical={getCanonicalUrl('/blog')}
        keywords={[
          'paper industry blog',
          'toilet paper guides',
          'paper towel comparison',
          'sustainable paper',
          'whitelabel manufacturing',
          'blog papir',
          'vodiči papir'
        ]}
      />

      <div className="min-h-screen bg-white">
        {/* Page Header */}
        <div className="bg-gray-warm border-b border-gray-border">
          <div ref={headerRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-16">
            <h1 className="text-gray-900 text-4xl font-black tracking-tight">
              {t('blog.title')}
            </h1>
            <p className="text-gray-600 text-lg mt-3 max-w-2xl">
              {t('blog.subtitle')}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
          {/* Search Bar */}
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

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-16">
              <span className="material-symbols-outlined animate-spin text-primary text-4xl">
                progress_activity
              </span>
            </div>
          )}

          {/* Featured Posts (only show when no filters active) */}
          {!isLoading && !activeCategory && !searchQuery && featuredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                {t('blog.featured')}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map(post => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* Category Filter */}
          {!isLoading && (
            <div className="mb-8">
              <BlogCategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          )}

          {/* All Posts Grid */}
          {!isLoading && (
            <div>
              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map(post => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
                    article
                  </span>
                  <p className="text-xl text-gray-500">
                    {t('blog.noResults')}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
