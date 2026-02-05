import { useState, useEffect } from 'react'
import { sanityClient } from '../lib/sanity/client'
import { PRODUCT_CONTENT_BY_HANDLE_QUERY } from '../lib/sanity/queries'
import { transformProductContent } from '../lib/sanity/transforms'
import type { ProductContent } from '../types/productContent'

// Hook for fetching product content by Shopify handle from Sanity
export function useProductContent(handle: string) {
  const [content, setContent] = useState<ProductContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContent() {
      if (!handle) {
        setContent(null)
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const sanityContent = await sanityClient.fetch(PRODUCT_CONTENT_BY_HANDLE_QUERY, { handle })
        setContent(transformProductContent(sanityContent))
        setError(null)
      } catch (err) {
        console.error('Failed to fetch product content from Sanity:', err)
        setContent(null)
        setError('Failed to load product content')
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [handle])

  return { content, isLoading, error }
}
