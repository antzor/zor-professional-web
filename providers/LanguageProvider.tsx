'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { en } from '@/data/translations/en'
import { hr } from '@/data/translations/hr'

export type Language = 'en' | 'hr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, replacements?: Record<string, string>) => string
}

const translations: Record<Language, Record<string, string>> = { en, hr }

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en')

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('zor-lang') : null
    if (saved === 'hr') {
      setLanguageState('hr')
      document.documentElement.lang = 'hr'
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('zor-lang', lang)
      document.documentElement.lang = lang
    }
  }

  const t = (key: string, replacements?: Record<string, string>): string => {
    let value = translations[language][key] || translations['en'][key] || key
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        value = value.replace(`{${k}}`, v)
      })
    }
    return value
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
