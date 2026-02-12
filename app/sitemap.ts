import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zorprofessional.com'

  const staticPages = [
    { route: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { route: '/products', changeFrequency: 'weekly' as const, priority: 0.9 },
    { route: '/about', changeFrequency: 'monthly' as const, priority: 0.7 },
    { route: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
    { route: '/faq', changeFrequency: 'monthly' as const, priority: 0.6 },
    { route: '/whitelabel', changeFrequency: 'monthly' as const, priority: 0.7 },
    { route: '/outlet', changeFrequency: 'weekly' as const, priority: 0.8 },
    { route: '/blog', changeFrequency: 'weekly' as const, priority: 0.7 },
  ]

  return staticPages.map(({ route, changeFrequency, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
