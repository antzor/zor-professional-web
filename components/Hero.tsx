import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Header from './Header';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const animRef = useScrollAnimation();

  return (
    <section className="relative min-h-[90vh] flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images/hero.png")' }}
      />

      {/* Overlay: Top to bottom gradient for navigation */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />

      {/* Overlay: Left to right gradient for text readability */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-2/3 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Header integrated into hero */}
      <Header transparent />

      {/* Content */}
      <div className="relative flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-16 lg:py-24">
          <div ref={animRef} className="animate-fade-up flex flex-col gap-8 max-w-2xl">
            <div className="flex flex-col gap-4">
              <span className="text-white/80 font-bold tracking-widest text-xs uppercase">
                {t('hero.tagline')}
              </span>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-lg">
                {t('hero.title')}
              </h1>
              <p className="text-white/90 text-lg leading-relaxed max-w-xl drop-shadow-md">
                {t('hero.subtitle')}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="flex items-center justify-center rounded-lg h-14 px-8 bg-white text-primary text-base font-bold transition-all hover:bg-gray-100 hover:shadow-lg active:scale-95"
              >
                {t('hero.cta.products')}
              </Link>
              <Link
                to="/contact"
                className="flex items-center justify-center rounded-lg h-14 px-8 border-2 border-white text-white text-base font-bold transition-all hover:bg-white hover:text-primary active:scale-95"
              >
                {t('hero.cta.quote')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
