import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  const headerRef = useScrollAnimation();
  const storyRef = useScrollAnimation();
  const valuesRef = useScrollAnimation();
  const locationRef = useScrollAnimation();

  const values = [
    { icon: 'verified', titleKey: 'about.values.quality', descKey: 'about.values.quality.desc' },
    { icon: 'handshake', titleKey: 'about.values.direct', descKey: 'about.values.direct.desc' },
    { icon: 'eco', titleKey: 'about.values.sustainability', descKey: 'about.values.sustainability.desc' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-gray-warm border-b border-gray-border">
        <div ref={headerRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <h1 className="text-gray-900 text-4xl font-black tracking-tight">{t('about.title')}</h1>
          <p className="text-primary font-semibold text-lg mt-2">{t('about.subtitle')}</p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20">
        <div ref={storyRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <p className="text-gray-700 text-lg leading-relaxed">{t('about.story.p1')}</p>
              <p className="text-gray-700 text-lg leading-relaxed">{t('about.story.p2')}</p>
              <p className="text-gray-700 text-lg leading-relaxed">{t('about.story.p3')}</p>
            </div>
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-accent via-gray-100 to-accent rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <span className="material-symbols-outlined text-primary/20 text-8xl">factory</span>
                <p className="text-gray-400 text-sm mt-2">Factory Image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-warm py-20">
        <div ref={valuesRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="text-gray-900 text-3xl font-black tracking-tight text-center mb-12">
            {t('about.values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.titleKey} className="bg-white rounded-xl p-8 border border-gray-border text-center">
                <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center text-primary mx-auto mb-5">
                  <span className="material-symbols-outlined text-3xl">{v.icon}</span>
                </div>
                <h3 className="text-gray-900 text-xl font-bold mb-3">{t(v.titleKey)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(v.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20">
        <div ref={locationRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-primary mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl">public</span>
          </div>
          <h2 className="text-gray-900 text-3xl font-black tracking-tight mb-4">
            {t('about.location.title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('about.location.desc')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
