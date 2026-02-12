'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useScrollAnimation } from '@/app/components/hooks/useScrollAnimation'
import { urlFor } from '@/lib/sanity/client'

interface HomeContentProps {
  homePage: any
}

export default function HomeContent({ homePage }: HomeContentProps) {
  const { t, language } = useLanguage()
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const statsRef = useScrollAnimation()
  const problemRef = useScrollAnimation()
  const solutionRef = useScrollAnimation()
  const trustedRef = useScrollAnimation()
  const howRef = useScrollAnimation()
  const productRef = useScrollAnimation()
  const faqRef = useScrollAnimation()
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

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] max-h-[900px] flex flex-col">
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

      {/* The Problem */}
      <section className="bg-gray-warm py-16 lg:py-20">
        <div ref={problemRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 text-3xl lg:text-4xl font-black tracking-tight">
              {l(homePage?.problemTitleHr, homePage?.problemTitleEn) || t('home.problem.title')}
            </h2>
            {(homePage?.problemSubtitleHr || homePage?.problemSubtitleEn) && (
              <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
                {l(homePage?.problemSubtitleHr, homePage?.problemSubtitleEn)}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(homePage?.problemItems || []).map((item: any, idx: number) => (
              <div key={idx} className="bg-white rounded-xl p-8 border border-gray-border text-center">
                <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <span className="material-symbols-outlined text-red-500 text-3xl">{item.icon || 'warning'}</span>
                </div>
                <h3 className="text-gray-900 text-lg font-bold mb-2">{l(item.titleHr, item.titleEn)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{l(item.descriptionHr, item.descriptionEn)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Solve This */}
      <section className="bg-white py-16 lg:py-20">
        <div ref={solutionRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 text-3xl lg:text-4xl font-black tracking-tight">
              {l(homePage?.solutionTitleHr, homePage?.solutionTitleEn) || t('home.solution.title')}
            </h2>
            {(homePage?.solutionSubtitleHr || homePage?.solutionSubtitleEn) && (
              <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
                {l(homePage?.solutionSubtitleHr, homePage?.solutionSubtitleEn)}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(homePage?.solutionItems || []).map((item: any, idx: number) => (
              <div key={idx} className="bg-white rounded-xl p-8 border border-gray-border text-center">
                <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-5">
                  <span className="material-symbols-outlined text-primary text-3xl">{item.icon || 'check_circle'}</span>
                </div>
                <h3 className="text-gray-900 text-lg font-bold mb-2">{l(item.titleHr, item.titleEn)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{l(item.descriptionHr, item.descriptionEn)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      {(homePage?.trustedByLogos?.length > 0) && (
        <section className="bg-gray-warm py-12 lg:py-16">
          <div ref={trustedRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
            <p className="text-center text-gray-500 text-sm font-semibold uppercase tracking-wide mb-8">
              {l(homePage?.trustedByTitleHr, homePage?.trustedByTitleEn) || t('home.trustedBy.title')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
              {homePage.trustedByLogos.map((logo: any, idx: number) => (
                <img
                  key={idx}
                  src={urlFor(logo).height(48).url()}
                  alt={logo.alt || ''}
                  className="h-10 lg:h-12 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="bg-white py-16 lg:py-20">
        <div ref={howRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 text-3xl lg:text-4xl font-black tracking-tight">
              {l(homePage?.howItWorksTitleHr, homePage?.howItWorksTitleEn) || t('home.howItWorks.title')}
            </h2>
            {(homePage?.howItWorksSubtitleHr || homePage?.howItWorksSubtitleEn) && (
              <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
                {l(homePage?.howItWorksSubtitleHr, homePage?.howItWorksSubtitleEn)}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(homePage?.howItWorksSteps || []).map((step: any, idx: number) => (
              <div key={idx} className="text-center relative">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-black">
                  {step.stepNumber || idx + 1}
                </div>
                <h3 className="text-gray-900 text-lg font-bold mb-2">{l(step.titleHr, step.titleEn)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{l(step.descriptionHr, step.descriptionEn)}</p>
                {idx < (homePage?.howItWorksSteps?.length || 0) - 1 && (
                  <span className="hidden md:block absolute top-8 -right-4 text-gray-300 material-symbols-outlined text-2xl">arrow_forward</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Highlight */}
      <section className="bg-gray-warm py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mb-48" />

        <div ref={productRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white aspect-[4/3]">
                {homePage?.productHighlightImage ? (
                  <img
                    src={urlFor(homePage.productHighlightImage).width(800).height(600).url()}
                    alt={l(homePage?.productHighlightTitleHr, homePage?.productHighlightTitleEn) || ''}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-8xl">inventory_2</span>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-gray-900 text-3xl lg:text-4xl font-black tracking-tight mb-6">
                {l(homePage?.productHighlightTitleHr, homePage?.productHighlightTitleEn) || t('home.productHighlight.title')}
              </h2>
              <ul className="flex flex-col gap-3 mb-8">
                {(homePage?.productHighlightBenefits || []).map((benefit: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                    <span className="text-gray-700">{l(benefit.textHr, benefit.textEn)}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={homePage?.productHighlightCtaLink || '/products'}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-light transition-all active:scale-95"
              >
                {l(homePage?.productHighlightCtaTextHr, homePage?.productHighlightCtaTextEn) || t('nav.products')}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {(homePage?.homeFaqItems?.length > 0) && (
        <section className="bg-white py-16 lg:py-20">
          <div ref={faqRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center mb-12">
              <h2 className="text-gray-900 text-3xl lg:text-4xl font-black tracking-tight">
                {l(homePage?.homeFaqTitleHr, homePage?.homeFaqTitleEn) || t('faq.title')}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col divide-y divide-gray-border">
                {homePage.homeFaqItems.map((faq: any, idx: number) => (
                  <div key={faq._id || idx}>
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full flex items-center justify-between py-5 text-left group"
                    >
                      <span className="text-gray-900 font-semibold pr-4 group-hover:text-primary transition-colors">
                        {l(faq.questionHr, faq.questionEn)}
                      </span>
                      <span className={`material-symbols-outlined text-gray-400 transition-transform shrink-0 ${openFaqIndex === idx ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFaqIndex === idx ? 'max-h-96 pb-5' : 'max-h-0'}`}>
                      <p className="text-gray-600 text-sm leading-relaxed">{l(faq.answerHr, faq.answerEn)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
