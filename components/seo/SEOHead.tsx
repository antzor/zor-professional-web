import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/LanguageContext';

interface SEOHeadProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: 'website' | 'product' | 'article';
  canonical?: string;
  keywords?: string[];
  jsonLd?: object | object[];
  noindex?: boolean;
}

export default function SEOHead({
  title,
  description,
  ogImage = 'https://zorprofessional.com/og-default.jpg',
  ogType = 'website',
  canonical,
  keywords,
  jsonLd,
  noindex = false
}: SEOHeadProps) {
  const { language } = useLanguage();

  // Full title with site name
  const fullTitle = title.includes('ZOR Professional') ? title : `${title} | ZOR Professional`;

  // Canonical URL with language prefix for Croatian
  const canonicalUrl = canonical
    ? language === 'hr'
      ? canonical.replace('https://zorprofessional.com/', 'https://zorprofessional.com/hr/')
      : canonical
    : undefined;

  // Generate hreflang URLs if canonical is provided
  const hreflangUrls = canonical
    ? {
        en: canonical,
        hr: canonical.replace('https://zorprofessional.com/', 'https://zorprofessional.com/hr/'),
        default: canonical
      }
    : undefined;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Hreflang Tags for Multi-language */}
      {hreflangUrls && (
        <>
          <link rel="alternate" hrefLang="en" href={hreflangUrls.en} />
          <link rel="alternate" hrefLang="hr" href={hreflangUrls.hr} />
          <link rel="alternate" hrefLang="x-default" href={hreflangUrls.default} />
        </>
      )}

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content="ZOR Professional" />
      <meta property="og:locale" content={language === 'hr' ? 'hr_HR' : 'en_US'} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  );
}
