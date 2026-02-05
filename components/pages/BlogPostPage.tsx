import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getBlogPost } from '../../data/blogContent';
import { getProductContent } from '../../data/productContent';
import SEOHead from '../seo/SEOHead';
import { getCanonicalUrl, generateBlogPostSchema, generateBreadcrumbSchema } from '../../lib/seo';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();

  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = getBlogPost(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'hr' ? 'hr-HR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate schemas
  const blogPostSchema = generateBlogPostSchema({
    title: post.title[language],
    description: post.metaDescription[language],
    image: post.featuredImage.url,
    publishedDate: post.publishedDate,
    updatedDate: post.updatedDate,
    authorName: post.author.name,
    slug: post.slug
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: getCanonicalUrl('/') },
    { name: t('nav.blog'), url: getCanonicalUrl('/blog') },
    { name: post.title[language], url: getCanonicalUrl(`/blog/${post.slug}`) }
  ]);

  return (
    <>
      <SEOHead
        title={post.title[language]}
        description={post.metaDescription[language]}
        ogImage={post.featuredImage.url}
        ogType="article"
        canonical={getCanonicalUrl(`/blog/${post.slug}`)}
        keywords={post.keywords}
        jsonLd={[blogPostSchema, breadcrumbSchema]}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumbs */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-primary transition-colors">
                {t('nav.home')}
              </Link>
              <span>›</span>
              <Link to="/blog" className="hover:text-primary transition-colors">
                {t('nav.blog')}
              </Link>
              <span>›</span>
              <span className="text-gray-900">{post.title[language]}</span>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {post.category[language]}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {post.title[language]}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">person</span>
                  <span>{t('blog.byAuthor', { author: post.author.name })}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  <span>{formatDate(post.publishedDate)}</span>
                </div>
                {post.readingTime && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <span>{t('blog.readingTime', { minutes: post.readingTime.toString() })}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Featured Image */}
              <div className="aspect-video w-full rounded-xl overflow-hidden mb-12">
                <img
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt[language]}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: post.content[language] }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="material-symbols-outlined text-gray-400">label</span>
                  <span className="text-sm text-gray-600 font-medium">{t('blog.tags')}:</span>
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {post.relatedProducts && post.relatedProducts.length > 0 && (
          <div className="bg-white py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-gray-900">
                  {t('blog.relatedProducts')}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {post.relatedProducts.map(handle => {
                    const productContent = getProductContent(handle);
                    return (
                      <Link
                        key={handle}
                        to={`/products/${handle}`}
                        className="block p-6 border-2 border-gray-200 rounded-lg hover:border-primary hover:shadow-lg transition-all duration-200"
                      >
                        <div className="flex items-center gap-2 text-primary mb-2">
                          <span className="material-symbols-outlined">inventory_2</span>
                          <span className="font-medium">Product</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 capitalize">
                          {handle.replace(/-/g, ' ')}
                        </h3>
                        {productContent?.badge?.label && (
                          <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                            productContent.badge.color === 'green'
                              ? 'bg-green-100 text-green-800'
                              : productContent.badge.color === 'blue'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {productContent.badge.label[language]}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              {t('blog.allPosts')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
