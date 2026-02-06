'use client'

import { useLanguage } from '@/providers/LanguageProvider'

interface FaqItem {
  _id: string
  questionHr: string
  questionEn: string
  answerHr: string
  answerEn: string
}

interface ProductFAQProps {
  faq: FaqItem[]
}

export default function ProductFAQ({ faq }: ProductFAQProps) {
  const { language, t } = useLanguage()
  const l = (hr: string, en: string) => language === 'hr' ? hr : en

  return (
    <div className="py-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('sections.faq')}</h2>
      <div className="space-y-3">
        {faq.map((item) => (
          <details
            key={item._id}
            className="group bg-gray-50 border border-gray-100 rounded-xl overflow-hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
              <span>{l(item.questionHr, item.questionEn)}</span>
              <span className="material-symbols-outlined text-gray-400 transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <div className="px-6 pb-5 text-gray-600 leading-relaxed">
              {l(item.answerHr, item.answerEn)}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
