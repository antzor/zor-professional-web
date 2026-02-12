'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import { useScrollAnimation } from '@/app/components/hooks/useScrollAnimation'
import { urlFor } from '@/lib/sanity/client'

interface AboutData {
  titleHr?: string
  titleEn?: string
  subtitleHr?: string
  subtitleEn?: string
  storyParagraphs?: Array<{ textHr?: string; textEn?: string }>
  factoryImage?: unknown
  valuesSectionTitleHr?: string
  valuesSectionTitleEn?: string
  values?: Array<{
    icon?: string
    titleHr?: string
    titleEn?: string
    descriptionHr?: string
    descriptionEn?: string
  }>
  locationTitleHr?: string
  locationTitleEn?: string
  locationDescriptionHr?: string
  locationDescriptionEn?: string
}

export default function AboutContent({ data }: { data: AboutData | null }) {
  const { t, language } = useLanguage()
  const headerRef = useScrollAnimation()
  const storyRef = useScrollAnimation()
  const valuesRef = useScrollAnimation()
  const locationRef = useScrollAnimation()

  const l = (hr?: string, en?: string) => (language === 'hr' ? hr : en) || en || hr || ''

  // Fallback values
  const values = data?.values || [
    { icon: 'verified', titleHr: '', titleEn: 'Quality First', descriptionHr: '', descriptionEn: '' },
    { icon: 'handshake', titleHr: '', titleEn: 'Direct Partnership', descriptionHr: '', descriptionEn: '' },
    { icon: 'eco', titleHr: '', titleEn: 'Sustainability', descriptionHr: '', descriptionEn: '' },
  ]

  const storyParagraphs = data?.storyParagraphs || [
    { textEn: t('about.story.p1'), textHr: t('about.story.p1') },
    { textEn: t('about.story.p2'), textHr: t('about.story.p2') },
    { textEn: t('about.story.p3'), textHr: t('about.story.p3') },
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-gray-warm border-b border-gray-border">
        <div ref={headerRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <h1 className="text-gray-900 text-4xl font-black tracking-tight">
            {l(data?.titleHr, data?.titleEn) || t('about.title')}
          </h1>
          <p className="text-primary font-semibold text-lg mt-2">
            {l(data?.subtitleHr, data?.subtitleEn) || t('about.subtitle')}
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20">
        <div ref={storyRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              {storyParagraphs.map((p, idx) => (
                <p key={idx} className="text-gray-700 text-lg leading-relaxed">
                  {l(p.textHr, p.textEn)}
                </p>
              ))}
            </div>
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-accent via-gray-100 to-accent rounded-2xl flex items-center justify-center overflow-hidden">
              {data?.factoryImage ? (
                <img
                  src={urlFor(data.factoryImage).width(800).height(600).url()}
                  alt={l(data?.titleHr, data?.titleEn) || 'Factory'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <span className="material-symbols-outlined text-primary/20 text-8xl">factory</span>
                  <p className="text-gray-400 text-sm mt-2">Factory Image</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-warm py-20">
        <div ref={valuesRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="text-gray-900 text-3xl font-black tracking-tight text-center mb-12">
            {l(data?.valuesSectionTitleHr, data?.valuesSectionTitleEn) || t('about.values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 border border-gray-border text-center">
                <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center text-primary mx-auto mb-5">
                  <span className="material-symbols-outlined text-3xl">{v.icon}</span>
                </div>
                <h3 className="text-gray-900 text-xl font-bold mb-3">{l(v.titleHr, v.titleEn)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{l(v.descriptionHr, v.descriptionEn)}</p>
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
            {l(data?.locationTitleHr, data?.locationTitleEn) || t('about.location.title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {l(data?.locationDescriptionHr, data?.locationDescriptionEn) || t('about.location.desc')}
          </p>
        </div>
      </section>
    </div>
  )
}
