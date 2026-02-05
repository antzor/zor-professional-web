// Server-side Shopify client
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN
const STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`

export function isShopifyConfigured() {
  return !!(SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_TOKEN)
}

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!isShopifyConfigured()) {
    throw new Error('Shopify is not configured')
  }

  const response = await fetch(STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 120 },
  })

  const json = await response.json()
  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '))
  }
  return json.data
}
