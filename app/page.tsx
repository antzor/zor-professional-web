import { fetchHomePage, fetchProductCategories } from '@/lib/sanity/fetch'
import { getOutletProducts } from '@/lib/shopify/products'
import HomeContent from './HomeContent'

export default async function HomePage() {
  const [homePage, categories, outletProducts] = await Promise.all([
    fetchHomePage().catch(() => null),
    fetchProductCategories().catch(() => []),
    getOutletProducts().catch(() => []),
  ])

  return (
    <HomeContent
      homePage={homePage}
      categories={categories || []}
      outletProducts={outletProducts}
    />
  )
}
