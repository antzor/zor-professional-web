import type { Metadata } from 'next'
import { fetchHomePage } from '@/lib/sanity/fetch'
import HomeContent from './HomeContent'

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await fetchHomePage().catch(() => null)

  return {
    title: homePage?.metaTitleEn || 'ZOR Professional - Premium Paper Solutions',
    description:
      homePage?.metaDescriptionEn ||
      'Zagreb-based manufacturer of premium toilet paper, paper towels, and folded paper solutions. Serving distributors across Europe.',
    keywords: homePage?.keywords?.join(', '),
    openGraph: {
      title: homePage?.metaTitleEn || 'ZOR Professional - Premium Paper Solutions',
      description:
        homePage?.metaDescriptionEn ||
        'Zagreb-based manufacturer of premium paper solutions.',
      url: 'https://zorprofessional.com',
      siteName: 'ZOR Professional',
      type: 'website',
    },
  }
}

export default async function HomePage() {
  const homePage = await fetchHomePage().catch(() => null)

  return <HomeContent homePage={homePage} />
}
