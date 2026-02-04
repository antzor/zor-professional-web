import React from 'react';
import { Link } from 'react-router-dom';
import type { ProductCTA as ProductCTAType } from '../../types/productContent';
import { useLanguage } from '../../context/LanguageContext';

interface ProductCTAProps {
  cta: ProductCTAType;
}

const ProductCTA: React.FC<ProductCTAProps> = ({ cta }) => {
  const { language, t } = useLanguage();

  if (!cta) return null;

  return (
    <div className="py-12 border-t border-gray-200">
      <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {cta.title[language]}
        </h2>
        <p className="text-white/80 mb-6 max-w-xl mx-auto">
          {cta.description[language]}
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined">mail</span>
          {t('sections.contactUs')}
        </Link>
      </div>
    </div>
  );
};

export default ProductCTA;
