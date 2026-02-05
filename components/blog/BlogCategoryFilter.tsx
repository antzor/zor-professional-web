import { useLanguage } from '../../context/LanguageContext';

interface BlogCategoryFilterProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function BlogCategoryFilter({
  categories,
  activeCategory,
  onCategoryChange
}: BlogCategoryFilterProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {/* All Posts Button */}
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
          activeCategory === null
            ? 'bg-primary text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {t('blog.allPosts')}
      </button>

      {/* Category Buttons */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
            activeCategory === category
              ? 'bg-primary text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
