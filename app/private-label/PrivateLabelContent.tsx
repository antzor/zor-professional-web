'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useScrollAnimation } from '@/app/components/hooks/useScrollAnimation'

interface PrivateLabelData {
  titleHr?: string
  titleEn?: string
  subtitleHr?: string
  subtitleEn?: string
  introHr?: string
  introEn?: string
  steps?: Array<{
    icon?: string
    titleHr?: string
    titleEn?: string
    descriptionHr?: string
    descriptionEn?: string
  }>
  benefitsTitleHr?: string
  benefitsTitleEn?: string
  benefits?: Array<{ textHr?: string; textEn?: string }>
  ctaTitleHr?: string
  ctaTitleEn?: string
  ctaButtonLink?: string
}

export default function PrivateLabelContent({ data }: { data: PrivateLabelData | null }) {
  const { t, language } = useLanguage()
  const headerRef = useScrollAnimation()
  const stepsRef = useScrollAnimation()
  const benefitsRef = useScrollAnimation()

  const l = (hr?: string, en?: string) => (language === 'hr' ? hr : en) || en || hr || ''

  const steps = data?.steps || [
    { icon: 'chat', titleEn: t('whitelabel.step1.title'), titleHr: '', descriptionEn: t('whitelabel.step1.desc'), descriptionHr: '' },
    { icon: 'precision_manufacturing', titleEn: t('whitelabel.step2.title'), titleHr: '', descriptionEn: t('whitelabel.step2.desc'), descriptionHr: '' },
    { icon: 'local_shipping', titleEn: t('whitelabel.step3.title'), titleHr: '', descriptionEn: t('whitelabel.step3.desc'), descriptionHr: '' },
  ]

  const benefits = data?.benefits || [
    { textEn: t('whitelabel.benefits.1'), textHr: '' },
    { textEn: t('whitelabel.benefits.2'), textHr: '' },
    { textEn: t('whitelabel.benefits.3'), textHr: '' },
    { textEn: t('whitelabel.benefits.4'), textHr: '' },
    { textEn: t('whitelabel.benefits.5'), textHr: '' },
    { textEn: t('whitelabel.benefits.6'), textHr: '' },
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-gray-warm border-b border-gray-border">
        <div ref={headerRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <h1 className="text-gray-900 text-4xl font-black tracking-tight">
            {l(data?.titleHr, data?.titleEn) || t('whitelabel.title')}
          </h1>
          <p className="text-primary font-semibold text-lg mt-2">
            {l(data?.subtitleHr, data?.subtitleEn) || t('whitelabel.subtitle')}
          </p>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-gray-700 text-xl leading-relaxed max-w-3xl">
            {l(data?.introHr, data?.introEn) || t('whitelabel.intro')}
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
                <h3 className="text-gray-900 text-xl font-bold mb-3">{l(step.titleHr, step.titleEn)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{l(step.descriptionHr, step.descriptionEn)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div ref={benefitsRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="text-gray-900 text-3xl font-black tracking-tight mb-10">
            {l(data?.benefitsTitleHr, data?.benefitsTitleEn) || t('whitelabel.benefits.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((b, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-gray-warm">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">check_circle</span>
                <span className="text-gray-700 font-medium">{l(b.textHr, b.textEn)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-primary rounded-2xl p-10 md:p-14 text-center">
            <h2 className="text-white text-3xl font-black mb-6">
              {l(data?.ctaTitleHr, data?.ctaTitleEn) || t('whitelabel.cta')}
            </h2>
            <Link
              href={data?.ctaButtonLink || '/contact'}
              className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all active:scale-95"
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
