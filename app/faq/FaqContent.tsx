'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { useScrollAnimation } from '@/app/components/hooks/useScrollAnimation'

interface FaqItem {
  _id: string
  questionHr?: string
  questionEn?: string
  answerHr?: string
  answerEn?: string
  category?: string
  order?: number
}

export default function FaqContent({ items }: { items: FaqItem[] }) {
  const { t, language } = useLanguage()
  const headerRef = useScrollAnimation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-gray-warm border-b border-gray-border">
        <div ref={headerRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <h1 className="text-gray-900 text-4xl font-black tracking-tight">{t('faq.title')}</h1>
          <p className="text-gray-600 text-lg mt-3 max-w-2xl">{t('faq.subtitle')}</p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{t('faq.noItems')}</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-gray-border">
              {items.map((faq, idx) => (
                <div key={faq._id}>
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span className="text-gray-900 font-semibold pr-4 group-hover:text-primary transition-colors">
                      {language === 'hr' ? faq.questionHr : faq.questionEn}
                    </span>
                    <span
                      className={`material-symbols-outlined text-gray-400 transition-transform shrink-0 ${
                        openIndex === idx ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === idx ? 'max-h-96 pb-5' : 'max-h-0'
                    }`}
                  >
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {language === 'hr' ? faq.answerHr : faq.answerEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
