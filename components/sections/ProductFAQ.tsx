import React, { useState } from 'react';
import type { FAQItem } from '../../types/productContent';
import { useLanguage } from '../../context/LanguageContext';

interface ProductFAQProps {
  faq: FAQItem[];
}

const ProductFAQ: React.FC<ProductFAQProps> = ({ faq }) => {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faq || faq.length === 0) return null;

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t('sections.faq')}
      </h2>
      <div className="space-y-3">
        {faq.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900 pr-4">
                {item.question[language]}
              </span>
              <span
                className={`material-symbols-outlined text-gray-500 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed">
                  {item.answer[language]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFAQ;
