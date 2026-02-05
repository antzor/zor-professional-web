import { Metadata } from 'next'
import { getRegularProducts } from '@/lib/shopify/products'
import ProductsContent from './ProductsContent'

export const metadata: Metadata = {
  title: 'Professional Paper Products | ZOR Professional',
  description: 'Browse our full range of professional toilet paper, paper towels, Z-fold and V-fold products. Direct from manufacturer in Zagreb.',
}

export default async function ProductsPage() {
  const products = await getRegularProducts().catch(() => [])
  return <ProductsContent products={products} />
}
