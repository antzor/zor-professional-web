// GROQ queries for Sanity

// Blog Posts
export const ALL_BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedDate desc) {
  "slug": slug.current,
  titleHr,
  titleEn,
  excerptHr,
  excerptEn,
  contentHr,
  contentEn,
  featuredImage,
  categoryHr,
  categoryEn,
  tags,
  author,
  publishedDate,
  featured,
  readingTime,
  metaDescriptionHr,
  metaDescriptionEn,
  keywords,
  relatedProducts
}`

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  "slug": slug.current,
  titleHr,
  titleEn,
  excerptHr,
  excerptEn,
  contentHr,
  contentEn,
  featuredImage,
  categoryHr,
  categoryEn,
  tags,
  author,
  publishedDate,
  featured,
  readingTime,
  metaDescriptionHr,
  metaDescriptionEn,
  keywords,
  relatedProducts
}`

export const FEATURED_BLOG_POSTS_QUERY = `*[_type == "blogPost" && featured == true] | order(publishedDate desc)[0...$limit] {
  "slug": slug.current,
  titleHr,
  titleEn,
  excerptHr,
  excerptEn,
  featuredImage,
  categoryHr,
  categoryEn,
  publishedDate,
  readingTime
}`

// FAQ Items
export const ALL_FAQ_ITEMS_QUERY = `*[_type == "faqItem"] | order(order asc) {
  _id,
  questionHr,
  questionEn,
  answerHr,
  answerEn,
  category,
  order
}`

export const FAQ_BY_CATEGORY_QUERY = `*[_type == "faqItem" && category == $category] | order(order asc) {
  _id,
  questionHr,
  questionEn,
  answerHr,
  answerEn,
  category,
  order
}`

// Product Content
export const PRODUCT_CONTENT_BY_HANDLE_QUERY = `*[_type == "productContent" && shopifyHandle == $handle][0] {
  shopifyHandle,
  priceNoteHr,
  priceNoteEn,
  badge,
  features,
  specifications,
  "faq": faq[]-> {
    _id,
    questionHr,
    questionEn,
    answerHr,
    answerEn
  },
  testimonials,
  videoUrl,
  videoTitleHr,
  videoTitleEn,
  frequentlyBoughtWith,
  ctaTitleHr,
  ctaTitleEn,
  ctaDescriptionHr,
  ctaDescriptionEn
}`

export const ALL_PRODUCT_CONTENT_QUERY = `*[_type == "productContent"] {
  shopifyHandle,
  priceNoteHr,
  priceNoteEn,
  badge,
  features,
  specifications,
  "faq": faq[]-> {
    _id,
    questionHr,
    questionEn,
    answerHr,
    answerEn
  },
  testimonials,
  videoUrl,
  videoTitleHr,
  videoTitleEn,
  frequentlyBoughtWith,
  ctaTitleHr,
  ctaTitleEn,
  ctaDescriptionHr,
  ctaDescriptionEn
}`

// Banners
export const ACTIVE_BANNERS_QUERY = `*[_type == "banner" && active == true] {
  _id,
  location,
  titleHr,
  titleEn,
  subtitleHr,
  subtitleEn,
  ctaTextHr,
  ctaTextEn,
  ctaLink,
  backgroundImage
}`

export const BANNER_BY_LOCATION_QUERY = `*[_type == "banner" && location == $location && active == true][0] {
  _id,
  location,
  titleHr,
  titleEn,
  subtitleHr,
  subtitleEn,
  ctaTextHr,
  ctaTextEn,
  ctaLink,
  backgroundImage
}`

// Site Settings (singleton)
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  heroTaglineHr,
  heroTaglineEn,
  heroTitleHr,
  heroTitleEn,
  heroSubtitleHr,
  heroSubtitleEn,
  heroImage,
  stats,
  contactEmail,
  contactPhone,
  contactAddress,
  businessHoursHr,
  businessHoursEn
}`
