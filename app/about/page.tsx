import { Metadata } from 'next'
import { fetchAboutPage } from '@/lib/sanity/fetch'
import AboutContent from './AboutContent'

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchAboutPage()
  return {
    title: data?.metaTitleEn || 'About Us | ZOR Professional',
    description: data?.metaDescriptionEn || 'Learn about ZOR Professional — premium paper solutions manufacturer.',
    alternates: {
      languages: {
        hr: data?.metaTitleHr,
      },
    },
  }
}

export default async function AboutPage() {
  const data = await fetchAboutPage()
  return <AboutContent data={data} />
}
