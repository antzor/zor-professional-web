# ZOR Professional — Premium Paper Solutions

Next.js 15 website with Sanity CMS and Shopify e-commerce.

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
```

### Environment Variables (`.env.local`)

```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your-token
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-token
NEXT_PUBLIC_SANITY_PROJECT_ID=1fxf3is1
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## Sanity CMS — How to Edit Content

### Open Sanity Studio

```bash
cd sanity
npm run dev        # http://localhost:3333
```

Or use the deployed Studio at your Sanity dashboard: https://www.sanity.io/manage

### What You Can Edit

| Document Type | What it controls | Type |
|---|---|---|
| **Site Settings** | Hero section, stats bar, contact info, footer text | Singleton (1 doc) |
| **Home Page** | Outlet section, categories section, why choose items, CTA | Singleton |
| **About Page** | Story paragraphs, factory image, values, location | Singleton |
| **Whitelabel Page** | Intro text, process steps, benefits, CTA | Singleton |
| **Contact Page** | Page title, subtitle, info section title | Singleton |
| **Navigation** | Menu items and CTA button | Singleton |
| **Blog Posts** | Blog articles with HR/EN content | Collection (many docs) |
| **FAQ Items** | Questions and answers | Collection |
| **Product Content** | Extra Shopify product info (badges, features, specs, testimonials) | Collection |
| **Product Categories** | Category names, descriptions, icons, images | Collection |
| **Banners** | Promotional banners by location | Collection |

### Bilingual Content

Every text field has two versions:
- `Field (HR)` — Croatian
- `Field (EN)` — English

Fill in both. The website automatically shows the right language based on the user's selection.

### How Content Gets to the Website

1. You edit content in Sanity Studio
2. The website fetches it via GROQ queries
3. Content refreshes automatically (ISR — 1-5 minutes depending on page)
4. No rebuild needed

---

## Project Structure

```
app/                    # Next.js pages
  page.tsx              # Homepage (server component)
  HomeContent.tsx       # Homepage (client component)
  about/page.tsx        # About page
  blog/page.tsx         # Blog listing
  blog/[slug]/page.tsx  # Blog post detail
  products/page.tsx     # Products listing
  products/[handle]/    # Product detail
  outlet/page.tsx       # Outlet/deals page
  whitelabel/page.tsx   # Whitelabel page
  contact/page.tsx      # Contact page
  faq/page.tsx          # FAQ page
  checkout/page.tsx     # Checkout (redirects to Shopify)
  sitemap.ts            # Auto-generated sitemap
  robots.ts             # robots.txt
  layout.tsx            # Root layout (Header + Footer)
  globals.css           # Tailwind + custom theme
  components/           # Shared components
    layout/Header.tsx
    layout/Footer.tsx

providers/              # React context providers
  LanguageProvider.tsx   # EN/HR language switching
  CartProvider.tsx       # Shopify cart
  Providers.tsx          # Wrapper

lib/
  sanity/               # Sanity client, queries, fetch wrappers
  shopify/              # Shopify server-side client

data/translations/      # UI string translations (en.ts, hr.ts)
sanity/schemaTypes/     # Sanity schema definitions
types/                  # TypeScript types
public/images/          # Static images
```

---

## Adding a New Page

1. Create `app/your-page/page.tsx` (server component — fetches data):

```tsx
import { Metadata } from 'next'
import YourPageContent from './YourPageContent'

export const metadata: Metadata = {
  title: 'Your Page | ZOR Professional',
  description: 'Description here.',
}

export default async function YourPage() {
  // Fetch data from Sanity if needed
  return <YourPageContent />
}
```

2. Create `app/your-page/YourPageContent.tsx` (client component — interactive):

```tsx
'use client'

import { useLanguage } from '@/providers/LanguageProvider'

export default function YourPageContent() {
  const { t, language } = useLanguage()
  return <div>{t('your.translation.key')}</div>
}
```

3. Add the route to Header navigation in Sanity Studio (Navigation document).

---

## Adding a New Sanity Schema

1. Create `sanity/schemaTypes/yourType.ts`:

```ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'yourType',
  title: 'Your Type',
  type: 'document',
  fields: [
    defineField({ name: 'titleEn', title: 'Title (EN)', type: 'string' }),
    defineField({ name: 'titleHr', title: 'Title (HR)', type: 'string' }),
  ],
})
```

2. Register it in `sanity/schemaTypes/index.ts`:

```ts
import yourType from './yourType'
export const schemaTypes = [...existing, yourType]
```

3. Add a GROQ query in `lib/sanity/queries.ts`:

```ts
export const YOUR_TYPE_QUERY = `*[_type == "yourType"][0] { titleEn, titleHr }`
```

4. Add a fetch wrapper in `lib/sanity/fetch.ts`:

```ts
export async function fetchYourType() {
  return sanityClient.fetch(YOUR_TYPE_QUERY, {}, { next: { revalidate: 300 } })
}
```

5. Deploy the schema:

```bash
cd sanity && npx sanity schema deploy
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables (see `.env.local` section above)
4. Deploy

The site auto-deploys on push. Content updates from Sanity appear within minutes (ISR).

---

## Tech Stack

- **Next.js 15** — App Router, ISR, server components
- **Sanity CMS** — Headless CMS for all content
- **Shopify** — Product catalog and cart/checkout
- **Tailwind CSS v4** — Styling
- **TypeScript** — Type safety
