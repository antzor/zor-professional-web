import { Metadata } from 'next'
import { getProductByHandle } from '@/lib/shopify/products'
import { fetchProductContentByHandle } from '@/lib/sanity/fetch'
import StandardProductContent from './StandardProductContent'
import OutletProductContent from './OutletProductContent'
import Link from 'next/link'

interface Props {
  params: Promise<{ handle: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const product = await getProductByHandle(handle).catch(() => null)
  if (!product) return { title: 'Product Not Found | ZOR Professional' }
  return {
    title: `${product.title} | ZOR Professional`,
    description: product.description?.slice(0, 160),
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { handle } = await params
  const [product, content] = await Promise.all([
    getProductByHandle(handle).catch(() => null),
    fetchProductContentByHandle(handle).catch(() => null),
  ])

  if (!product) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 text-center">
          <span className="material-symbols-outlined text-gray-300 text-6xl mb-4 block">error_outline</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h1>
          <Link href="/products" className="inline-flex items-center gap-2 text-primary hover:text-primary-light mt-4">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const isOutlet = product.tags.some((tag) => tag.toLowerCase() === 'outlet')

  if (isOutlet) {
    return <OutletProductContent product={product} content={content} />
  }

  // For standard products, resolve frequently bought together products
  let relatedProducts: any[] = []
  if (content?.frequentlyBoughtWith?.length) {
    relatedProducts = (
      await Promise.all(
        content.frequentlyBoughtWith
          .slice(0, 4)
          .map((h: string) => getProductByHandle(h).catch(() => null))
      )
    ).filter(Boolean)
  }

  return (
    <StandardProductContent
      product={product}
      content={content}
      relatedProducts={relatedProducts}
    />
  )
}
