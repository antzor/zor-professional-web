import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { categories } from '../../data/products';
import { outletProducts } from '../../data/outletProducts';
import Hero from '../Hero';
import SEOHead from '../seo/SEOHead';
import { getCanonicalUrl, generateOrganizationSchema, generateWebsiteSchema } from '../../lib/seo';

const stats = [
  { valueKey: '15+', labelKey: 'home.stats.countries' },
  { valueKey: '30+', labelKey: 'home.stats.products' },
  { valueKey: '500+', labelKey: 'home.stats.capacity' },
  { valueKey: '200+', labelKey: 'home.stats.clients' },
];

const whyItems = [
  { icon: 'precision_manufacturing', titleKey: 'home.why.manufacturing.title', descKey: 'home.why.manufacturing.desc' },
  { icon: 'savings', titleKey: 'home.why.price.title', descKey: 'home.why.price.desc' },
  { icon: 'scale', titleKey: 'home.why.flexible.title', descKey: 'home.why.flexible.desc' },
  { icon: 'branding_watermark', titleKey: 'home.why.whitelabel.title', descKey: 'home.why.whitelabel.desc' },
];

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const catRef = useScrollAnimation();
  const whyRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();
  const outletRef = useScrollAnimation();

  // Get top 4 outlet products with highest discounts
  const topOutletDeals = [...outletProducts].sort((a, b) => b.discount - a.discount).slice(0, 4);

  return (
    <>
      <SEOHead
        title="ZOR Professional - Premium Paper Solutions Manufacturer Zagreb"
        description="Zagreb-based manufacturer of premium toilet paper, paper towels, and folded paper solutions. Serving distributors across Europe with whitelabel and branded products. Direct from factory - best prices."
        canonical={getCanonicalUrl('/')}
        keywords={[
          'paper manufacturer Zagreb',
          'toilet paper manufacturer',
          'paper towels wholesale',
          'whitelabel paper products',
          'paper distributor Europe',
          'professional paper solutions',
          'proizvođač papira Zagreb',
          'toaletni papir veleprodaja'
        ]}
        jsonLd={[generateOrganizationSchema(), generateWebsiteSchema()]}
      />
      <Hero />

      {/* Stats Bar */}
      <section className="bg-primary">
        <div ref={statsRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.labelKey}>
              <div className="text-white text-3xl lg:text-4xl font-black">{stat.valueKey}</div>
              <div className="text-white/70 text-sm mt-1">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OUTLET SECTION - Sustainability focused */}
      <section className="bg-gray-warm py-16 lg:py-20 relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mb-48" />

        <div ref={outletRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left side - Featured Product */}
            <div className="order-2 lg:order-1">
              {topOutletDeals[0] && (
                <Link
                  to="/outlet"
                  className="block bg-white rounded-2xl p-6 border border-gray-border hover:shadow-xl transition-all hover:-translate-y-1 group"
                >
                  {/* Image */}
                  <div className="w-full aspect-square bg-gray-50 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative">
                    {topOutletDeals[0].image ? (
                      <img
                        src={topOutletDeals[0].image}
                        alt={t(topOutletDeals[0].nameKey)}
                        className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-gray-300 text-6xl">inventory_2</span>
                    )}
                    {/* Discount badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary text-white text-sm font-bold px-3 py-1.5 rounded-lg">
                        -{topOutletDeals[0].discount}%
                      </span>
                    </div>
                  </div>
                  <h3 className="text-gray-900 font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                    {t(topOutletDeals[0].nameKey)}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {t(topOutletDeals[0].descriptionKey)}
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-primary font-black text-2xl">€{topOutletDeals[0].outletPrice.toFixed(2)}</span>
                    <span className="text-gray-400 text-sm line-through">€{topOutletDeals[0].originalPrice.toFixed(2)}</span>
                  </div>
                </Link>
              )}
            </div>

            {/* Right side - Sustainability Story */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-2xl">eco</span>
                <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                  {t('home.outlet.sustainability')}
                </span>
              </div>
              <h2 className="text-gray-900 text-3xl lg:text-4xl font-black tracking-tight mb-4">
                {t('home.outlet.title')}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {t('home.outlet.subtitle')}
              </p>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                {t('home.outlet.sustainabilityDesc')}
              </p>
              <Link
                to="/outlet"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-light transition-all active:scale-95"
              >
                {t('home.outlet.viewAll')}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="bg-white py-20 lg:py-24">
        <div ref={catRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 text-3xl lg:text-4xl font-black tracking-tight">
              {t('home.categories.title')}
            </h2>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
              {t('home.categories.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="flex flex-col rounded-xl border border-gray-border bg-white overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Category Image */}
                <div className="w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={t(cat.nameKey)}
                      className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <h3 className="text-gray-900 text-lg font-bold">{t(cat.nameKey)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(cat.descriptionKey)}</p>
                  <span className="mt-2 text-primary font-semibold text-sm flex items-center gap-1">
                    {t('nav.products')}
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              {t('home.categories.viewAll')}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose ZOR */}
      <section className="bg-gray-warm py-20 lg:py-24">
        <div ref={whyRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <h2 className="text-gray-900 text-3xl lg:text-4xl font-black tracking-tight">
              {t('home.why.title')}
            </h2>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
              {t('home.why.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyItems.map((item) => (
              <div key={item.titleKey} className="flex gap-5 bg-white rounded-xl p-6 border border-gray-border">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h4 className="text-gray-900 text-lg font-bold mb-1">{t(item.titleKey)}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(item.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 lg:py-24">
        <div ref={ctaRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-primary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
            <h2 className="text-white text-3xl md:text-4xl font-black max-w-2xl mx-auto relative z-10 leading-tight">
              {t('home.cta.title')}
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mt-4 relative z-10">
              {t('home.cta.subtitle')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center mt-8 bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all relative z-10 active:scale-95 shadow-xl"
            >
              {t('home.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
