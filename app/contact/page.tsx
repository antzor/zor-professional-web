import { Metadata } from 'next'
import { fetchContactPage, fetchSiteSettings } from '@/lib/sanity/fetch'
import ContactContent from './ContactContent'

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchContactPage()
  return {
    title: data?.metaTitleEn || 'Contact Us | ZOR Professional',
    description: data?.metaDescriptionEn || 'Get in touch with ZOR Professional for paper product inquiries.',
    alternates: {
      languages: {
        hr: data?.metaTitleHr,
      },
    },
  }
}

export default async function ContactPage() {
  const [pageData, siteSettings] = await Promise.all([
    fetchContactPage(),
    fetchSiteSettings(),
  ])
  return <ContactContent data={pageData} siteSettings={siteSettings} />
}
