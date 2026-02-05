import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/providers/Providers'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { fetchSiteSettings, fetchNavigation } from '@/lib/sanity/fetch'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://zorprofessional.com'),
  title: {
    default: 'ZOR Professional - Premium Paper Solutions',
    template: '%s | ZOR Professional',
  },
  description:
    'Zagreb-based manufacturer of premium toilet paper, paper towels, and folded paper solutions. Serving distributors across Europe with whitelabel and branded products.',
  openGraph: {
    siteName: 'ZOR Professional',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [siteSettings, navigation] = await Promise.all([
    fetchSiteSettings(),
    fetchNavigation(),
  ])

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900 font-display">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header navigation={navigation} />
            <main className="flex-1">{children}</main>
            <Footer siteSettings={siteSettings} />
          </div>
        </Providers>
      </body>
    </html>
  )
}
