// Google Analytics event
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Meta Pixel custom event
export function trackPixelEvent(event: string, data?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    ;(window as any).fbq('track', event, data)
  }
}

// Track product view (GA4 + Meta Pixel)
export function trackProductView(productName: string, productId: string, price?: number) {
  trackEvent('view_item', 'Product', productName, price)
  trackPixelEvent('ViewContent', {
    content_name: productName,
    content_ids: [productId],
    content_type: 'product',
    value: price,
    currency: 'EUR',
  })
}

// Track CTA click
export function trackCtaClick(ctaName: string, destination: string) {
  trackEvent('cta_click', 'CTA', ctaName)
  trackPixelEvent('Lead', { content_name: ctaName })
}

// Track outbound link to Shopify checkout
export function trackOutboundClick(url: string) {
  trackEvent('click', 'Outbound', url)
}

// Track contact form submission
export function trackContactSubmit() {
  trackEvent('generate_lead', 'Contact', 'contact_form')
  trackPixelEvent('Contact')
}
