'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useScrollAnimation } from '@/app/components/hooks/useScrollAnimation'
import { urlFor } from '@/lib/sanity/client'
import type { ShopifyProduct } from '@/lib/shopify/products'

interface HomeContentProps {
  homePage: any
  categories: any[]
  outletProducts: ShopifyProduct[]
}

export default function HomeContent({ homePage, categories, outletProducts }: HomeContentProps) {
  const { t, language } = useLanguage()
  const statsRef = useScrollAnimation()
  const outletRef = useScrollAnimation()
  const catRef = useScrollAnimation()
  const whyRef = useScrollAnimation()
  const ctaRef = useScrollAnimation()
  const animRef = useScrollAnimation()

  const l = (hr?: string, en?: string) => (language === 'hr' ? hr : en) || en || hr || ''

  // Stats from homePage
  const stats = homePage?.stats || [
    { valueKey: '15+', labelKey: 'home.stats.countries' },
    { valueKey: '30+', labelKey: 'home.stats.products' },
    { valueKey: '500+', labelKey: 'home.stats.capacity' },
    { valueKey: '200+', labelKey: 'home.stats.clients' },
  ]

  // Why Choose items from homePage
  const whyItems = homePage?.whyChooseItems || [
    { icon: 'precision_manufacturing', titleEn: t('home.why.manufacturing.title'), titleHr: '', descriptionEn: t('home.why.manufacturing.desc'), descriptionHr: '' },
    { icon: 'savings', titleEn: t('home.why.price.title'), titleHr: '', descriptionEn: t('home.why.price.desc'), descriptionHr: '' },
    { icon: 'scale', titleEn: t('home.why.flexible.title'), titleHr: '', descriptionEn: t('home.why.flexible.desc'), descriptionHr: '' },
    { icon: 'branding_watermark', titleEn: t('home.why.whitelabel.title'), titleHr: '', descriptionEn: t('home.why.whitelabel.desc'), descriptionHr: '' },
  ]

  // Top outlet deal
  const topOutletDeal = outletProducts[0] || null

  // Static fallback categories
  const fallbackCategories = [
    { slug: 'toilet-paper', nameEn: t('cat.tp'), nameHr: '', descriptionEn: t('cat.tp.desc'), descriptionHr: '', icon: 'paper_roll', image: null, localImage: '/images/toaletni papir.png' },
    { slug: 'paper-towels', nameEn: t('cat.pt'), nameHr: '', descriptionEn: t('cat.pt.desc'), descriptionHr: '', icon: 'dry_cleaning', image: null, localImage: '/images/rucnik.png' },
    { slug: 'z-fold', nameEn: t('cat.zf'), nameHr: '', descriptionEn: t('cat.zf.desc'), descriptionHr: '', icon: 'folder_zip', image: null, localImage: '/images/z fold.png' },
    { slug: 'v-fold', nameEn: t('cat.vf'), nameHr: '', descriptionEn: t('cat.vf.desc'), descriptionHr: '', icon: 'layers', image: null, localImage: '/images/v fold.png' },
  ]

  const displayCategories = categories.length > 0 ? categories : fallbackCategories

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/images/hero.png")' }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full lg:w-2/3 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="relative flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-16 lg:py-24">
            <div ref={animRef} className="animate-fade-up flex flex-col gap-8 max-w-2xl">
              <div className="flex flex-col gap-4">
                <span className="text-white/80 font-bold tracking-widest text-xs uppercase">
                  {l(homePage?.heroTaglineHr, homePage?.heroTaglineEn) || t('hero.tagline')}
                </span>
                <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-lg">
                  {l(homePage?.heroTitleHr, homePage?.heroTitleEn) || t('hero.title')}
                </h1>
                <p className="text-white/90 text-lg leading-relaxed max-w-xl drop-shadow-md">
                  {l(homePage?.heroSubtitleHr, homePage?.heroSubtitleEn) || t('hero.subtitle')}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="flex items-center justify-center rounded-lg h-14 px-8 bg-white text-primary text-base font-bold transition-all hover:bg-gray-100 hover:shadow-lg active:scale-95"
                >
                  {t('hero.cta.products')}
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center rounded-lg h-14 px-8 border-2 border-white text-white text-base font-bold transition-all hover:bg-white hover:text-primary active:scale-95"
                >
                  {t('hero.cta.quote')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary">
        <div ref={statsRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat: any, idx: number) => (
            <div key={idx}>
              <div className="text-white text-3xl lg:text-4xl font-black">
                {stat.value || stat.valueKey}
              </div>
              <div className="text-white/70 text-sm mt-1">
                {stat.labelEn ? l(stat.labelHr, stat.labelEn) : t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Outlet Section */}
      <section className="bg-gray-warm py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mb-48" />

        <div ref={outletRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left side - Featured Product */}
            <div className="order-2 lg:order-1">
              {topOutletDeal && (
                <Link
                  href="/outlet"
                  className="block bg-white rounded-2xl p-6 border border-gray-border hover:shadow-xl transition-all hover:-translate-y-1 group"
                >
                  <div className="w-full aspect-square bg-gray-50 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative">
                    {topOutletDeal.images[0] ? (
                      <img
                        src={topOutletDeal.images[0].url}
                        alt={topOutletDeal.title}
                        className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-gray-300 text-6xl">inventory_2</span>
                    )}
                  </div>
                  <h3 className="text-gray-900 font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                    {topOutletDeal.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {topOutletDeal.description}
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-primary font-black text-2xl">
                      €{topOutletDeal.minPrice.toFixed(2)}
                    </span>
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
                {l(homePage?.outletSectionTitleHr, homePage?.outletSectionTitleEn) || t('home.outlet.title')}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {l(homePage?.outletSectionSubtitleHr, homePage?.outletSectionSubtitleEn) || t('home.outlet.subtitle')}
              </p>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                {l(homePage?.outletSustainabilityHr, homePage?.outletSustainabilityEn) || t('home.outlet.sustainabilityDesc')}
              </p>
              <Link
                href="/outlet"
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
              {l(homePage?.categoriesSectionTitleHr, homePage?.categoriesSectionTitleEn) || t('home.categories.title')}
            </h2>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
              {l(homePage?.categoriesSectionSubtitleHr, homePage?.categoriesSectionSubtitleEn) || t('home.categories.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayCategories.map((cat: any) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="flex flex-col rounded-xl border border-gray-border bg-white overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                  {cat.image ? (
                    <img
                      src={urlFor(cat.image).width(400).height(400).url()}
                      alt={l(cat.nameHr, cat.nameEn)}
                      className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : cat.localImage ? (
                    <img
                      src={cat.localImage}
                      alt={l(cat.nameHr, cat.nameEn)}
                      className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <h3 className="text-gray-900 text-lg font-bold">{l(cat.nameHr, cat.nameEn)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{l(cat.descriptionHr, cat.descriptionEn)}</p>
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
              href="/products"
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
              {l(homePage?.whyChooseTitleHr, homePage?.whyChooseTitleEn) || t('home.why.title')}
            </h2>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
              {l(homePage?.whyChooseSubtitleHr, homePage?.whyChooseSubtitleEn) || t('home.why.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyItems.map((item: any, idx: number) => (
              <div key={idx} className="flex gap-5 bg-white rounded-xl p-6 border border-gray-border">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h4 className="text-gray-900 text-lg font-bold mb-1">
                    {item.titleEn ? l(item.titleHr, item.titleEn) : t(item.titleKey)}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.descriptionEn ? l(item.descriptionHr, item.descriptionEn) : t(item.descKey)}
                  </p>
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
              {l(homePage?.ctaTitleHr, homePage?.ctaTitleEn) || t('home.cta.title')}
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mt-4 relative z-10">
              {l(homePage?.ctaSubtitleHr, homePage?.ctaSubtitleEn) || t('home.cta.subtitle')}
            </p>
            <Link
              href={homePage?.ctaButtonLink || '/contact'}
              className="inline-flex items-center justify-center mt-8 bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all relative z-10 active:scale-95 shadow-xl"
            >
              {l(homePage?.ctaButtonTextHr, homePage?.ctaButtonTextEn) || t('home.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
