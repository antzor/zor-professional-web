import React from 'react';
import { useLanguage, Language } from '../../context/LanguageContext';

interface LanguageSwitcherProps {
  transparent?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ transparent = false }) => {
  const { language, setLanguage } = useLanguage();

  const toggle = (lang: Language) => {
    setLanguage(lang);
  };

  if (transparent) {
    return (
      <div className="flex items-center border border-white/30 rounded-lg overflow-hidden text-sm font-medium">
        <button
          onClick={() => toggle('en')}
          className={`px-3 py-1.5 transition-colors ${
            language === 'en'
              ? 'bg-white text-primary'
              : 'bg-transparent text-white hover:bg-white/10'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => toggle('hr')}
          className={`px-3 py-1.5 transition-colors ${
            language === 'hr'
              ? 'bg-white text-primary'
              : 'bg-transparent text-white hover:bg-white/10'
          }`}
        >
          HR
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center border border-gray-border rounded-lg overflow-hidden text-sm font-medium">
      <button
        onClick={() => toggle('en')}
        className={`px-3 py-1.5 transition-colors ${
          language === 'en'
            ? 'bg-primary text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => toggle('hr')}
        className={`px-3 py-1.5 transition-colors ${
          language === 'hr'
            ? 'bg-primary text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        HR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
