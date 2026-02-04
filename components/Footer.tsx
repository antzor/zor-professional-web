import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear().toString();

  return (
    <footer className="bg-gray-warm border-t border-gray-border py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">Z</span>
            </div>
            <span className="text-lg font-bold text-primary">ZOR Professional</span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed">
            {t('footer.description')}
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-gray-900">{t('footer.quickLinks')}</h5>
          <nav className="flex flex-col gap-2">
            <Link className="text-gray-500 text-sm hover:text-primary transition-colors" to="/products">{t('nav.products')}</Link>
            <Link className="text-gray-500 text-sm hover:text-primary transition-colors" to="/about">{t('nav.about')}</Link>
            <Link className="text-gray-500 text-sm hover:text-primary transition-colors" to="/whitelabel">{t('nav.whitelabel')}</Link>
          </nav>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-gray-900">{t('footer.support')}</h5>
          <nav className="flex flex-col gap-2">
            <Link className="text-gray-500 text-sm hover:text-primary transition-colors" to="/contact">{t('nav.contact')}</Link>
            <Link className="text-gray-500 text-sm hover:text-primary transition-colors" to="/faq">{t('nav.faq')}</Link>
          </nav>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-gray-900">{t('footer.contact')}</h5>
          <div className="flex flex-col gap-2 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">location_on</span>
              {t('contact.info.address')}
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">mail</span>
              {t('contact.info.email')}
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">phone</span>
              {t('contact.info.phone')}
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">schedule</span>
              {t('contact.info.hours')}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-border text-center text-gray-400 text-xs">
        {t('footer.copyright', { year })}
      </div>
    </footer>
  );
};

export default Footer;
