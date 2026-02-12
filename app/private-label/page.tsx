import { Metadata } from 'next'
import { fetchPrivateLabelPage } from '@/lib/sanity/fetch'
import PrivateLabelContent from './PrivateLabelContent'

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPrivateLabelPage()
  return {
    title: data?.metaTitleEn || 'Private Label Solutions | ZOR Professional',
    description: data?.metaDescriptionEn || 'Custom private label paper products — your brand, our quality.',
    alternates: {
      languages: {
        hr: data?.metaTitleHr,
      },
    },
  }
}

export default async function PrivateLabelPage() {
  const data = await fetchPrivateLabelPage()
  return <PrivateLabelContent data={data} />
}
