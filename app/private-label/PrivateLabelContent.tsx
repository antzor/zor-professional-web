'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import { useScrollAnimation } from '@/app/components/hooks/useScrollAnimation'
import { urlFor } from '@/lib/sanity/client'

interface PrivateLabelData {
  // Hero
  titleHr?: string
  titleEn?: string
  subtitleHr?: string
  subtitleEn?: string
  introHr?: string
  introEn?: string

  // Problem
  problemTitleHr?: string
  problemTitleEn?: string
  problemSubtitleHr?: string
  problemSubtitleEn?: string
  problemItems?: Array<{
    icon?: string
    titleHr?: string
    titleEn?: string
    descriptionHr?: string
    descriptionEn?: string
  }>

  // Solution
  solutionTitleHr?: string
  solutionTitleEn?: string
  solutionSubtitleHr?: string
  solutionSubtitleEn?: string
  solutionItems?: Array<{
    icon?: string
    titleHr?: string
    titleEn?: string
    descriptionHr?: string
    descriptionEn?: string
  }>

  // Process
  processTitleHr?: string
  processTitleEn?: string
  processSubtitleHr?: string
  processSubtitleEn?: string
  processSteps?: Array<{
    stepNumber?: number
    icon?: string
    titleHr?: string
    titleEn?: string
    descriptionHr?: string
    descriptionEn?: string
  }>

  // Showcase
  showcaseTitleHr?: string
  showcaseTitleEn?: string
  showcaseSubtitleHr?: string
  showcaseSubtitleEn?: string
  showcaseImage?: any
  showcaseFeatures?: Array<{ textHr?: string; textEn?: string }>

  // Benefits
  benefitsTitleHr?: string
  benefitsTitleEn?: string
  benefitsSubtitleHr?: string
  benefitsSubtitleEn?: string
  benefits?: Array<{ icon?: string; textHr?: string; textEn?: string }>

  // FAQ
  faqTitleHr?: string
  faqTitleEn?: string
  faqItems?: Array<{
    _id: string
    questionHr?: string
    questionEn?: string
    answerHr?: string
    answerEn?: string
  }>

  // CTA
  ctaTitleHr?: string
  ctaTitleEn?: string
  ctaSubtitleHr?: string
  ctaSubtitleEn?: string
  ctaButtonLink?: string
}

export default function PrivateLabelContent({ data }: { data: PrivateLabelData | null }) {
  const { t, language } = useLanguage()
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  // Animation refs
  const heroRef = useScrollAnimation()
  const problemRef = useScrollAnimation()
  const solutionRef = useScrollAnimation()
  const processRef = useScrollAnimation()
  const showcaseRef = useScrollAnimation()
  const benefitsRef = useScrollAnimation()
  const faqRef = useScrollAnimation()

  const l = (hr?: string, en?: string) => (language === 'hr' ? hr : en) || en || hr || ''

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-white py-20 lg:py-28">
        <div ref={heroRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-4xl">
            <h1 className="text-gray-900 text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              {l(data?.titleHr, data?.titleEn) || t('private label.title')}
            </h1>
            <p className="text-primary text-2xl font-semibold mt-4">
              {l(data?.subtitleHr, data?.subtitleEn) || t('private label.subtitle')}
            </p>
            <p className="text-gray-600 text-xl leading-relaxed mt-6">
              {l(data?.introHr, data?.introEn) || t('private label.intro')}
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      {data?.problemItems && data.problemItems.length > 0 && (
        <section className="py-20 bg-white">
          <div ref={problemRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-gray-900 text-4xl font-black tracking-tight">
                {l(data?.problemTitleHr, data?.problemTitleEn)}
              </h2>
              {(data?.problemSubtitleHr || data?.problemSubtitleEn) && (
                <p className="text-gray-600 text-lg mt-4">
                  {l(data?.problemSubtitleHr, data?.problemSubtitleEn)}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.problemItems.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 border border-red-100 hover:border-red-200 transition-all">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <span className="material-symbols-outlined text-red-500 text-3xl">
                      {item.icon || 'warning'}
                    </span>
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold text-center mb-3">
                    {l(item.titleHr, item.titleEn)}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {l(item.descriptionHr, item.descriptionEn)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Solution Section */}
      {data?.solutionItems && data.solutionItems.length > 0 && (
        <section className="py-20 bg-gray-warm">
          <div ref={solutionRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-gray-900 text-4xl font-black tracking-tight">
                {l(data?.solutionTitleHr, data?.solutionTitleEn)}
              </h2>
              {(data?.solutionSubtitleHr || data?.solutionSubtitleEn) && (
                <p className="text-gray-600 text-lg mt-4">
                  {l(data?.solutionSubtitleHr, data?.solutionSubtitleEn)}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.solutionItems.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-border hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      {item.icon || 'check_circle'}
                    </span>
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold text-center mb-3">
                    {l(item.titleHr, item.titleEn)}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {l(item.descriptionHr, item.descriptionEn)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section (How It Works) */}
      {data?.processSteps && data.processSteps.length > 0 && (
        <section className="py-20 bg-white">
          <div ref={processRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-gray-900 text-4xl font-black tracking-tight">
                {l(data?.processTitleHr, data?.processTitleEn)}
              </h2>
              {(data?.processSubtitleHr || data?.processSubtitleEn) && (
                <p className="text-gray-600 text-lg mt-4">
                  {l(data?.processSubtitleHr, data?.processSubtitleEn)}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.processSteps.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-gray-warm rounded-2xl p-8 h-full">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-black mb-5">
                      {step.stepNumber || idx + 1}
                    </div>
                    {step.icon && (
                      <span className="material-symbols-outlined text-primary text-3xl mb-4 block">
                        {step.icon}
                      </span>
                    )}
                    <h3 className="text-gray-900 text-lg font-bold mb-3">
                      {l(step.titleHr, step.titleEn)}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {l(step.descriptionHr, step.descriptionEn)}
                    </p>
                  </div>
                  {idx < data.processSteps!.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <span className="material-symbols-outlined text-primary text-2xl">arrow_forward</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Showcase */}
      {data?.showcaseImage && (
        <section className="py-20 bg-gray-warm">
          <div ref={showcaseRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-gray-900 text-4xl font-black tracking-tight">
                {l(data?.showcaseTitleHr, data?.showcaseTitleEn)}
              </h2>
              {(data?.showcaseSubtitleHr || data?.showcaseSubtitleEn) && (
                <p className="text-gray-600 text-lg mt-4">
                  {l(data?.showcaseSubtitleHr, data?.showcaseSubtitleEn)}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-gray-border">
                <Image
                  src={urlFor(data.showcaseImage).width(800).height(800).url()}
                  alt={l(data?.showcaseTitleHr, data?.showcaseTitleEn) || 'Product showcase'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                {data?.showcaseFeatures?.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-border">
                    <span className="material-symbols-outlined text-primary text-2xl mt-0.5">check_circle</span>
                    <span className="text-gray-700 text-lg font-medium">
                      {l(feature.textHr, feature.textEn)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {data?.benefits && data.benefits.length > 0 && (
        <section className="py-20 bg-white">
          <div ref={benefitsRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-gray-900 text-4xl font-black tracking-tight">
                {l(data?.benefitsTitleHr, data?.benefitsTitleEn)}
              </h2>
              {(data?.benefitsSubtitleHr || data?.benefitsSubtitleEn) && (
                <p className="text-gray-600 text-lg mt-4">
                  {l(data?.benefitsSubtitleHr, data?.benefitsSubtitleEn)}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 p-5 bg-gray-warm rounded-xl">
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                    {benefit.icon || 'check_circle'}
                  </span>
                  <span className="text-gray-700 font-medium">
                    {l(benefit.textHr, benefit.textEn)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {data?.faqItems && data.faqItems.length > 0 && (
        <section className="py-20 bg-gray-warm">
          <div ref={faqRef} className="animate-fade-up max-w-4xl mx-auto px-6 lg:px-10">
            <div className="text-center mb-14">
              <h2 className="text-gray-900 text-4xl font-black tracking-tight">
                {l(data?.faqTitleHr, data?.faqTitleEn) || t('faq.title')}
              </h2>
            </div>
            <div className="space-y-3">
              {data.faqItems.map((item, idx) => (
                <div key={item._id} className="bg-white rounded-xl border border-gray-border overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-900 text-lg font-semibold pr-4">
                      {l(item.questionHr, item.questionEn)}
                    </span>
                    <span className={`material-symbols-outlined text-primary text-2xl transition-transform ${
                      openFaqIndex === idx ? 'rotate-180' : ''
                    }`}>
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openFaqIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {l(item.answerHr, item.answerEn)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-white text-4xl font-black mb-4">
              {l(data?.ctaTitleHr, data?.ctaTitleEn) || t('private label.cta')}
            </h2>
            {(data?.ctaSubtitleHr || data?.ctaSubtitleEn) && (
              <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
                {l(data?.ctaSubtitleHr, data?.ctaSubtitleEn)}
              </p>
            )}
            <Link
              href={data?.ctaButtonLink || '/contact'}
              className="inline-flex items-center justify-center bg-white text-primary px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all active:scale-95 shadow-xl"
            >
              {t('nav.contact')}
              <span className="material-symbols-outlined ml-2">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
