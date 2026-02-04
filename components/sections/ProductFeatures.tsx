import React from 'react';
import type { ProductFeature } from '../../types/productContent';
import { useLanguage } from '../../context/LanguageContext';

interface ProductFeaturesProps {
  features: ProductFeature[];
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features }) => {
  const { language, t } = useLanguage();

  if (!features || features.length === 0) return null;

  return (
    <div className="py-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        {t('sections.whyChoose')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-6 hover:bg-accent hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">
                {feature.icon}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {feature.title[language]}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {feature.description[language]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFeatures;
