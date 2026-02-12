'use client'

import { useLanguage } from '@/providers/LanguageProvider'

interface Testimonial {
  _key?: string
  name: string
  company?: string
  textHr: string
  textEn: string
  rating: number
}

interface ProductTestimonialsProps {
  testimonials: Testimonial[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`material-symbols-outlined text-lg ${
            star <= rating ? 'text-yellow-400' : 'text-gray-200'
          }`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
    </div>
  )
}

export default function ProductTestimonials({ testimonials }: ProductTestimonialsProps) {
  const { language, t } = useLanguage()
  const l = (hr: string, en: string) => language === 'hr' ? hr : en

  return (
    <div className="py-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('sections.testimonials')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, idx) => (
          <div
            key={testimonial._key || idx}
            className="bg-gray-50 border border-gray-100 rounded-xl p-6"
          >
            <StarRating rating={testimonial.rating} />
            <p className="text-gray-700 mt-4 mb-4 leading-relaxed italic">
              &ldquo;{l(testimonial.textHr, testimonial.textEn)}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">
                  {testimonial.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                {testimonial.company && (
                  <p className="text-gray-500 text-xs">{testimonial.company}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function getAverageRating(testimonials: Testimonial[]): number {
  if (!testimonials.length) return 0
  const sum = testimonials.reduce((acc, t) => acc + t.rating, 0)
  return Math.round((sum / testimonials.length) * 10) / 10
}
