import { sanityClient } from './client'
import {
  SITE_SETTINGS_QUERY,
  NAVIGATION_QUERY,
  HOME_PAGE_QUERY,
  ABOUT_PAGE_QUERY,
  PRIVATE_LABEL_PAGE_QUERY,
  CONTACT_PAGE_QUERY,
  PRODUCT_CATEGORIES_QUERY,
  ALL_BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  FEATURED_BLOG_POSTS_QUERY,
  ALL_FAQ_ITEMS_QUERY,
  FAQ_BY_CATEGORY_QUERY,
  PRODUCT_CONTENT_BY_HANDLE_QUERY,
  ACTIVE_BANNERS_QUERY,
  BANNER_BY_LOCATION_QUERY,
} from './queries'

// Revalidation times (in seconds)
const REVALIDATE_SHORT = 60      // 1 minute
const REVALIDATE_MEDIUM = 300    // 5 minutes
const REVALIDATE_LONG = 3600     // 1 hour

// Site Settings
export async function fetchSiteSettings() {
  return sanityClient.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: REVALIDATE_LONG } })
}

// Navigation
export async function fetchNavigation() {
  return sanityClient.fetch(NAVIGATION_QUERY, {}, { next: { revalidate: REVALIDATE_LONG } })
}

// Home Page
export async function fetchHomePage() {
  return sanityClient.fetch(HOME_PAGE_QUERY, {}, { next: { revalidate: REVALIDATE_SHORT } })
}

// About Page
export async function fetchAboutPage() {
  return sanityClient.fetch(ABOUT_PAGE_QUERY, {}, { next: { revalidate: REVALIDATE_LONG } })
}

// Private Label Page
export async function fetchPrivateLabelPage() {
  return sanityClient.fetch(PRIVATE_LABEL_PAGE_QUERY, {}, { next: { revalidate: REVALIDATE_LONG } })
}

// Contact Page
export async function fetchContactPage() {
  return sanityClient.fetch(CONTACT_PAGE_QUERY, {}, { next: { revalidate: REVALIDATE_LONG } })
}

// Product Categories
export async function fetchProductCategories() {
  return sanityClient.fetch(PRODUCT_CATEGORIES_QUERY, {}, { next: { revalidate: REVALIDATE_MEDIUM } })
}

// Blog Posts
export async function fetchAllBlogPosts() {
  return sanityClient.fetch(ALL_BLOG_POSTS_QUERY, {}, { next: { revalidate: REVALIDATE_SHORT } })
}

export async function fetchBlogPostBySlug(slug: string) {
  return sanityClient.fetch(BLOG_POST_BY_SLUG_QUERY, { slug }, { next: { revalidate: REVALIDATE_LONG } })
}

export async function fetchFeaturedBlogPosts(limit: number = 3) {
  return sanityClient.fetch(FEATURED_BLOG_POSTS_QUERY, { limit }, { next: { revalidate: REVALIDATE_SHORT } })
}

// FAQ Items
export async function fetchAllFaqItems() {
  return sanityClient.fetch(ALL_FAQ_ITEMS_QUERY, {}, { next: { revalidate: REVALIDATE_MEDIUM } })
}

export async function fetchFaqByCategory(category: string) {
  return sanityClient.fetch(FAQ_BY_CATEGORY_QUERY, { category }, { next: { revalidate: REVALIDATE_MEDIUM } })
}

// Product Content
export async function fetchProductContentByHandle(handle: string) {
  return sanityClient.fetch(PRODUCT_CONTENT_BY_HANDLE_QUERY, { handle }, { next: { revalidate: REVALIDATE_MEDIUM } })
}

// Banners
export async function fetchActiveBanners() {
  return sanityClient.fetch(ACTIVE_BANNERS_QUERY, {}, { next: { revalidate: REVALIDATE_SHORT } })
}

export async function fetchBannerByLocation(location: string) {
  return sanityClient.fetch(BANNER_BY_LOCATION_QUERY, { location }, { next: { revalidate: REVALIDATE_SHORT } })
}
