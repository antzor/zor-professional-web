'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { useScrollAnimation } from '@/app/components/hooks/useScrollAnimation'

interface ContactData {
  titleHr?: string
  titleEn?: string
  subtitleHr?: string
  subtitleEn?: string
  infoTitleHr?: string
  infoTitleEn?: string
}

interface SiteSettings {
  contactEmail?: string
  contactPhone?: string
  contactAddress?: string
  businessHoursHr?: string
  businessHoursEn?: string
}

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

export default function ContactContent({
  data,
  siteSettings,
}: {
  data: ContactData | null
  siteSettings: SiteSettings | null
}) {
  const { t, language } = useLanguage()
  const headerRef = useScrollAnimation()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const l = (hr?: string, en?: string) => (language === 'hr' ? hr : en) || en || hr || ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', company: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-gray-warm border-b border-gray-border">
        <div ref={headerRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <h1 className="text-gray-900 text-4xl font-black tracking-tight">
            {l(data?.titleHr, data?.titleEn) || t('contact.title')}
          </h1>
          <p className="text-gray-600 text-lg mt-3 max-w-2xl">
            {l(data?.subtitleHr, data?.subtitleEn) || t('contact.subtitle')}
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.form.name')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full h-11 px-4 rounded-lg border border-gray-border bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.form.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full h-11 px-4 rounded-lg border border-gray-border bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.form.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-lg border border-gray-border bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.form.company')}</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-lg border border-gray-border bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.form.message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-border bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                  />
                </div>

                {status === 'success' && (
                  <div className="bg-green-50 text-green-700 border border-green-200 rounded-lg p-4 text-sm">
                    {t('contact.form.success')}
                  </div>
                )}
                {status === 'error' && (
                  <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4 text-sm">
                    {t('contact.form.error')}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="self-start flex items-center justify-center gap-2 rounded-lg h-12 px-8 bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-lg">send</span>
                  {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
                </button>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div className="flex flex-col gap-6">
              <h3 className="text-gray-900 text-xl font-bold">
                {l(data?.infoTitleHr, data?.infoTitleEn) || t('contact.info.title')}
              </h3>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm">Address</p>
                    <p className="text-gray-500 text-sm">{siteSettings?.contactAddress || t('contact.info.address')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm">Email</p>
                    <p className="text-gray-500 text-sm">{siteSettings?.contactEmail || t('contact.info.email')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">phone</span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm">Phone</p>
                    <p className="text-gray-500 text-sm">{siteSettings?.contactPhone || t('contact.info.phone')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm">Working Hours</p>
                    <p className="text-gray-500 text-sm">
                      {l(siteSettings?.businessHoursHr, siteSettings?.businessHoursEn) || t('contact.info.hours')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
