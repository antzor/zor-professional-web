import { fetchHomePage, fetchSiteSettings, fetchProductCategories } from '@/lib/sanity/fetch'
import { getOutletProducts } from '@/lib/shopify/products'
import HomeContent from './HomeContent'

export default async function HomePage() {
  const [homePage, siteSettings, categories, outletProducts] = await Promise.all([
    fetchHomePage().catch(() => null),
    fetchSiteSettings().catch(() => null),
    fetchProductCategories().catch(() => []),
    getOutletProducts().catch(() => []),
  ])

  return (
    <HomeContent
      homePage={homePage}
      siteSettings={siteSettings}
      categories={categories || []}
      outletProducts={outletProducts}
    />
  )
}
