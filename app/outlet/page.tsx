import { Metadata } from 'next'
import { getOutletProducts } from '@/lib/shopify/products'
import { fetchBannerByLocation } from '@/lib/sanity/fetch'
import OutletContent from './OutletContent'

export const metadata: Metadata = {
  title: 'Outlet — Discounted Paper Products | ZOR Professional',
  description: 'Great deals on discontinued, overstock, and promotional paper products. Same quality, lower prices.',
}

export default async function OutletPage() {
  const [products, banner] = await Promise.all([
    getOutletProducts().catch(() => []),
    fetchBannerByLocation('outlet-promo').catch(() => null),
  ])
  return <OutletContent products={products} banner={banner} />
}
