# CLAUDE.md

Instructions for AI assistants working on this project.

---

## Project Overview

**ZOR Professional** — Premium paper solutions manufacturer e-commerce website.

- **Type**: E-commerce website with CMS
- **Company**: Zagreb-based manufacturer of toilet paper, paper towels, and folded paper solutions
- **Target audience**: Distributors across Europe
- **Products**: Branded and whitelabel paper products

---

## Tech Stack

### Core Framework & Language
- **Next.js 15.3.0** with App Router
- **React 19.2.4**
- **TypeScript 5.8** (strict mode currently disabled, migration in progress)
- **Node.js** (see `.nvmrc` or `package.json` for version)

### Styling
- **Tailwind CSS 4.1** with `@theme` directive configuration
- Utility-first approach with custom design tokens
- Custom scroll animations defined in `globals.css`
- **Material Symbols** icons (loaded via Google Fonts)

### Content & E-commerce
- **Sanity CMS** — Headless CMS for all page content
  - Project ID: `1fxf3is1`
  - Dataset: `production`
  - Studio runs separately on port 3333
- **Shopify Storefront API** — Product catalog and checkout
  - Storefront API version: 2025-01
  - Products synced from Shopify collections

### State Management
- **React Context** providers for global state:
  - `CartProvider` — Shopping cart management
  - `LanguageProvider` — Bilingual support (Croatian/English)

---

## Project Structure

```
/app                    # Next.js App Router
  /components
    /layout             # Header, Footer
    /ui                 # Reusable UI components (CartDrawer, LanguageSwitcher, etc.)
    /hooks              # Custom React hooks (useScrollAnimation, etc.)
  /[page-name]          # Page routes (products, contact, faq, etc.)
    /[dynamic]          # Dynamic routes (e.g., products/[handle])
    page.tsx            # Page component (server component)
    [Page]Content.tsx   # Client component for interactive content
  layout.tsx            # Root layout with Header/Footer
  globals.css           # Tailwind config + global styles

/lib                    # Utilities and API clients
  /sanity               # Sanity client, queries, transforms, fetch utilities
  /shopify              # Shopify client and product fetching utilities

/providers              # React Context providers
  CartProvider.tsx      # Shopping cart state
  LanguageProvider.tsx  # Language switching (hr/en)
  Providers.tsx         # Combined provider wrapper

/sanity                 # Sanity CMS Studio (separate npm workspace)
  /schemaTypes          # Content schemas
  sanity.config.ts      # Studio configuration

/types                  # TypeScript type definitions
/data                   # Static data files
/public                 # Static assets (images, icons, etc.)
```

---

## Code Patterns & Conventions

### Component Structure
- Use **functional components** with React hooks
- **Server components by default** — only add `'use client'` when needed (state, effects, browser APIs)
- **TypeScript interfaces** for component props
- Export components as default exports

Example:
```tsx
interface MyComponentProps {
  title: string
  count?: number
}

const MyComponent: React.FC<MyComponentProps> = ({ title, count = 0 }) => {
  return <div>{title}: {count}</div>
}

export default MyComponent
```

### Import Aliases
- Use `@/*` for absolute imports from project root
- Example: `import Header from '@/app/components/layout/Header'`

### Styling with Tailwind
- **Utility-first approach** — use Tailwind classes directly in JSX
- **Custom design tokens** defined in `app/globals.css`:
  - Colors: `primary`, `primary-light`, `primary-dark`, `accent`, `gray-warm`, `gray-border`
  - Border radius: `rounded`, `rounded-lg`, `rounded-xl`, etc.
  - Font: `font-display` (Inter variable font)
- **Responsive design**: Mobile-first with breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
- **Conditional classes**: Use template literals for dynamic styles

Example:
```tsx
<button
  className={`px-4 py-2 rounded-lg ${
    isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
  }`}
>
  Click me
</button>
```

### Bilingual Content
- All user-facing text supports **Croatian (hr)** and **English (en)**
- Use `useLanguage()` hook for translations
- CMS content uses separate fields: `titleHr` / `titleEn`, `descriptionHr` / `descriptionEn`

Example:
```tsx
const { language, t } = useLanguage()
const title = language === 'hr' ? content.titleHr : content.titleEn
```

### Data Fetching
- **Server components**: Use async/await with Sanity/Shopify fetch utilities
- **Client components**: Use React hooks (useState, useEffect) or Context
- Sanity queries defined in `lib/sanity/queries.ts`
- Shopify API calls in `lib/shopify/products.ts`

---

## Environment Variables

Required in `.env.local`:

```env
# Shopify
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=1fxf3is1
NEXT_PUBLIC_SANITY_DATASET=production
```

**Note**: Public variables (`NEXT_PUBLIC_*`) are exposed to the browser.

---

## Development Commands

```bash
# Install dependencies
npm install

# Start Next.js dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Sanity Studio

```bash
cd sanity
npm install
npm run dev  # http://localhost:3333
```

---

## Important Notes

### TypeScript Configuration
- **Strict mode is disabled** (`"strict": false`) — migration to strict mode is in progress
- **Build errors ignored** (`ignoreBuildErrors: true` in `next.config.ts`) — temporary during migration
- When adding new code, prefer proper typing but don't break existing patterns

### Remote Images
- Allowed domains configured in `next.config.ts`:
  - `cdn.shopify.com` (product images)
  - `cdn.sanity.io` (CMS images)
- Use Next.js `<Image>` component with these domains

### Content Management
- **All page content is editable via Sanity CMS**
- One document per page (singletons) + collections for blog, FAQ, products
- Navigation menu items and CTA button are CMS-managed
- Product info from Shopify + extended content from Sanity

### Code Style Preferences
- **Match existing patterns** — look at similar components before creating new ones
- **Keep changes focused** — avoid refactoring unrelated code
- **Don't add unnecessary abstractions** — keep it simple unless complexity is justified
- **Avoid over-engineering** — three similar lines are better than premature abstraction

---

## Common Tasks

### Adding a New Page
1. Create folder in `/app` (e.g., `/app/new-page`)
2. Add `page.tsx` (server component for data fetching)
3. Add `NewPageContent.tsx` if interactivity needed (`'use client'`)
4. Create Sanity schema in `/sanity/schemaTypes`
5. Add query in `/lib/sanity/queries.ts`
6. Add fetch function in `/lib/sanity/fetch.ts`

### Adding a New Component
1. Decide location: `/app/components/ui` or `/app/components/layout`
2. Create TypeScript file with interface for props
3. Use Tailwind for styling (match existing design tokens)
4. Add `'use client'` only if component uses state/effects/browser APIs

### Updating Styles
- **Edit** `app/globals.css` for theme-level changes (colors, fonts)
- **Use** Tailwind utility classes in components for specific styles
- **Reference** existing components for color/spacing patterns

### Working with Sanity Content
1. Define schema in `/sanity/schemaTypes`
2. Add query in `/lib/sanity/queries.ts` using GROQ
3. Add fetch function in `/lib/sanity/fetch.ts`
4. Use in page/component via async fetch (server) or client-side hook

### Working with Shopify Products
- Fetch via `/lib/shopify/products.ts` utilities
- Extended product content (badges, features, specs) stored in Sanity
- Link by Shopify handle/ID

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with Header/Footer, font loading, metadata |
| `app/globals.css` | Tailwind theme config, custom animations, global styles |
| `next.config.ts` | Next.js configuration (images, TypeScript, etc.) |
| `tsconfig.json` | TypeScript configuration (path aliases, strict mode) |
| `lib/sanity/client.ts` | Sanity client initialization |
| `lib/sanity/queries.ts` | GROQ queries for fetching CMS content |
| `lib/shopify/client.ts` | Shopify Storefront API client |
| `providers/CartProvider.tsx` | Shopping cart state management |
| `providers/LanguageProvider.tsx` | Bilingual content switching |

---

## Git Workflow

- **Main branch**: `main`
- Create feature branches for new work
- Commit messages should be clear and descriptive
- Use conventional commits when possible (feat:, fix:, docs:, etc.)

---

## Deployment

- **Platform**: Vercel (inferred from `vercel.json`)
- Builds triggered on push to main branch
- Environment variables must be configured in Vercel dashboard

---

## Questions or Issues?

- Check existing components in `/app/components` for patterns
- Review Sanity Studio schemas in `/sanity/schemaTypes`
- Look at `/lib` utilities for API interaction examples
- Follow the existing code style — consistency matters

---

**Last updated**: 2026-02-06
