import { Metadata } from 'next'
import { fetchAllFaqItems } from '@/lib/sanity/fetch'
import FaqContent from './FaqContent'

export const metadata: Metadata = {
  title: 'FAQ | ZOR Professional',
  description: 'Frequently asked questions about ZOR Professional paper products, ordering, and delivery.',
}

export default async function FaqPage() {
  const items = await fetchAllFaqItems()
  return <FaqContent items={items || []} />
}
