'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'

interface FooterProps {
  siteSettings?: {
    contactEmail?: string
    contactPhone?: string
    contactAddress?: string
    businessHoursHr?: string
    businessHoursEn?: string
    footerDescriptionHr?: string
    footerDescriptionEn?: string
    footerCopyrightHr?: string
    footerCopyrightEn?: string
  } | null
}

const Footer: React.FC<FooterProps> = ({ siteSettings }) => {
  const { language, t } = useLanguage()
  const year = new Date().getFullYear().toString()

  const description = siteSettings
    ? (language === 'hr' ? siteSettings.footerDescriptionHr : siteSettings.footerDescriptionEn) || t('footer.description')
    : t('footer.description')

  const copyright = siteSettings
    ? ((language === 'hr' ? siteSettings.footerCopyrightHr : siteSettings.footerCopyrightEn) || t('footer.copyright', { year })).replace('{year}', year)
    : t('footer.copyright', { year })

  const address = siteSettings?.contactAddress || t('contact.info.address')
  const email = siteSettings?.contactEmail || t('contact.info.email')
  const phone = siteSettings?.contactPhone || t('contact.info.phone')
  const hours = siteSettings
    ? (language === 'hr' ? siteSettings.businessHoursHr : siteSettings.businessHoursEn) || t('contact.info.hours')
    : t('contact.info.hours')

  return (
    <footer className="bg-gray-warm border-t border-gray-border py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">Z</span>
            </div>
            <span className="text-lg font-bold text-primary">ZOR Professional</span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-gray-900">{t('footer.quickLinks')}</h5>
          <nav className="flex flex-col gap-2">
            <Link className="text-gray-500 text-sm hover:text-primary transition-colors" href="/products">{t('nav.products')}</Link>
            <Link className="text-gray-500 text-sm hover:text-primary transition-colors" href="/blog">{t('nav.blog')}</Link>
            <Link className="text-gray-500 text-sm hover:text-primary transition-colors" href="/about">{t('nav.about')}</Link>
            <Link className="text-gray-500 text-sm hover:text-primary transition-colors" href="/private-label">{t('nav.whitelabel')}</Link>
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-gray-900">{t('footer.support')}</h5>
          <nav className="flex flex-col gap-2">
            <Link className="text-gray-500 text-sm hover:text-primary transition-colors" href="/contact">{t('nav.contact')}</Link>
            <Link className="text-gray-500 text-sm hover:text-primary transition-colors" href="/faq">{t('nav.faq')}</Link>
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-gray-900">{t('footer.contact')}</h5>
          <div className="flex flex-col gap-2 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">location_on</span>
              {address}
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">mail</span>
              {email}
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">phone</span>
              {phone}
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">schedule</span>
              {hours}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-border text-center text-gray-400 text-xs">
        {copyright}
      </div>
    </footer>
  )
}

export default Footer
