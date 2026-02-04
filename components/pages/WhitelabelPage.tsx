import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const WhitelabelPage: React.FC = () => {
  const { t } = useLanguage();
  const headerRef = useScrollAnimation();
  const stepsRef = useScrollAnimation();
  const benefitsRef = useScrollAnimation();

  const steps = [
    { icon: 'chat', titleKey: 'whitelabel.step1.title', descKey: 'whitelabel.step1.desc' },
    { icon: 'precision_manufacturing', titleKey: 'whitelabel.step2.title', descKey: 'whitelabel.step2.desc' },
    { icon: 'local_shipping', titleKey: 'whitelabel.step3.title', descKey: 'whitelabel.step3.desc' },
  ];

  const benefits = [
    'whitelabel.benefits.1',
    'whitelabel.benefits.2',
    'whitelabel.benefits.3',
    'whitelabel.benefits.4',
    'whitelabel.benefits.5',
    'whitelabel.benefits.6',
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-gray-warm border-b border-gray-border">
        <div ref={headerRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <h1 className="text-gray-900 text-4xl font-black tracking-tight">{t('whitelabel.title')}</h1>
          <p className="text-primary font-semibold text-lg mt-2">{t('whitelabel.subtitle')}</p>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-gray-700 text-xl leading-relaxed max-w-3xl">
            {t('whitelabel.intro')}
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-gray-warm py-20">
        <div ref={stepsRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 border border-gray-border relative">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white mb-5">
                  <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                </div>
                <h3 className="text-gray-900 text-xl font-bold mb-3">{t(step.titleKey)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(step.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div ref={benefitsRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="text-gray-900 text-3xl font-black tracking-tight mb-10">
            {t('whitelabel.benefits.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((key) => (
              <div key={key} className="flex items-start gap-3 p-4 rounded-lg bg-gray-warm">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">check_circle</span>
                <span className="text-gray-700 font-medium">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-primary rounded-2xl p-10 md:p-14 text-center">
            <h2 className="text-white text-3xl font-black mb-6">{t('whitelabel.cta')}</h2>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all active:scale-95"
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhitelabelPage;
