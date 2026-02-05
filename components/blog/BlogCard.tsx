import { Link } from 'react-router-dom';
import type { BlogPost } from '../../types/blogContent';
import { useLanguage } from '../../context/LanguageContext';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { language, t } = useLanguage();

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'hr' ? 'hr-HR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Featured Image */}
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={post.featuredImage.url}
          alt={post.featuredImage.alt[language]}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            {post.category[language]}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title[language]}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt[language]}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span>{formatDate(post.publishedDate)}</span>
            {post.readingTime && (
              <>
                <span>•</span>
                <span>{t('blog.readingTime', { minutes: post.readingTime.toString() })}</span>
              </>
            )}
          </div>
          <span className="text-primary font-medium group-hover:translate-x-1 transition-transform">
            {t('blog.readMore')} →
          </span>
        </div>
      </div>
    </Link>
  );
}
