import React from 'react';
import type { Testimonial } from '../../types/productContent';
import { useLanguage } from '../../context/LanguageContext';

interface ProductTestimonialsProps {
  testimonials: Testimonial[];
}

const ProductTestimonials: React.FC<ProductTestimonialsProps> = ({ testimonials }) => {
  const { language, t } = useLanguage();

  if (!testimonials || testimonials.length === 0) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`material-symbols-outlined text-lg ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        star
      </span>
    ));
  };

  return (
    <div className="py-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t('sections.testimonials')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-6 relative"
          >
            <span className="absolute top-4 right-4 text-6xl text-primary/10 font-serif leading-none">
              "
            </span>
            <div className="flex items-center gap-1 mb-3">
              {renderStars(testimonial.rating)}
            </div>
            <p className="text-gray-700 leading-relaxed mb-4 relative z-10">
              "{testimonial.text[language]}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  person
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                {testimonial.company && (
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTestimonials;
