import { Metadata } from 'next'
import { fetchWhitelabelPage } from '@/lib/sanity/fetch'
import WhitelabelContent from './WhitelabelContent'

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchWhitelabelPage()
  return {
    title: data?.metaTitleEn || 'Whitelabel Solutions | ZOR Professional',
    description: data?.metaDescriptionEn || 'Custom whitelabel paper products — your brand, our quality.',
    alternates: {
      languages: {
        hr: data?.metaTitleHr,
      },
    },
  }
}

export default async function WhitelabelPage() {
  const data = await fetchWhitelabelPage()
  return <WhitelabelContent data={data} />
}
