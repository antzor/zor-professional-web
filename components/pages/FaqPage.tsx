import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useFaqItems } from '../../hooks/useSanityFaq';

const FaqPage: React.FC = () => {
  const { t, language } = useLanguage();
  const headerRef = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { items, isLoading, error } = useFaqItems();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-gray-warm border-b border-gray-border">
        <div ref={headerRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <h1 className="text-gray-900 text-4xl font-black tracking-tight">{t('faq.title')}</h1>
          <p className="text-gray-600 text-lg mt-3 max-w-2xl">{t('faq.subtitle')}</p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{error}</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{t('faq.noItems')}</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-gray-border">
              {items.map((faq, idx) => (
                <div key={idx}>
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span className="text-gray-900 font-semibold pr-4 group-hover:text-primary transition-colors">
                      {faq.question[language]}
                    </span>
                    <span className={`material-symbols-outlined text-gray-400 transition-transform shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === idx ? 'max-h-96 pb-5' : 'max-h-0'
                    }`}
                  >
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer[language]}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
