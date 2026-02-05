import { useState, useEffect } from 'react'
import { sanityClient } from '../lib/sanity/client'
import { ALL_FAQ_ITEMS_QUERY, FAQ_BY_CATEGORY_QUERY } from '../lib/sanity/queries'
import { transformFaqItem } from '../lib/sanity/transforms'
import type { FAQItem } from '../types/productContent'

// Hook for fetching all FAQ items from Sanity
export function useFaqItems(category?: string) {
  const [items, setItems] = useState<FAQItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchItems() {
      try {
        setIsLoading(true)
        const query = category ? FAQ_BY_CATEGORY_QUERY : ALL_FAQ_ITEMS_QUERY
        const params = category ? { category } : {}
        const sanityItems = await sanityClient.fetch(query, params)
        setItems(sanityItems.map(transformFaqItem))
        setError(null)
      } catch (err) {
        console.error('Failed to fetch FAQ from Sanity:', err)
        setItems([])
        setError('Failed to load FAQ items')
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [category])

  return { items, isLoading, error }
}
