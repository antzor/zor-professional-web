// Server-side Shopify client

function getConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN
  return { domain, token }
}

export function isShopifyConfigured() {
  const { domain, token } = getConfig()
  return !!(domain && token)
}

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const { domain, token } = getConfig()

  if (!domain || !token) {
    console.error('[Shopify] Missing env vars:', { domain: !!domain, token: !!token })
    throw new Error('Shopify is not configured')
  }

  const url = `https://${domain}/api/2025-01/graphql.json`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 120 },
  })

  const json = await response.json()
  if (json.errors) {
    console.error('[Shopify] API errors:', json.errors)
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '))
  }
  return json.data
}
