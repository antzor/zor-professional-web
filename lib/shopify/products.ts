import { shopifyFetch } from './client'

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          tags
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          images(first: 5) {
            edges {
              node { url altText width height }
            }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                price { amount currencyCode }
                availableForSale
                image { url altText }
              }
            }
          }
        }
      }
    }
  }
`

const COLLECTION_PRODUCTS_QUERY = `
  query CollectionProducts($handle: String!, $first: Int!) {
    collectionByHandle(handle: $handle) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            tags
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            images(first: 5) {
              edges {
                node { url altText width height }
              }
            }
            variants(first: 20) {
              edges {
                node {
                  id
                  title
                  price { amount currencyCode }
                  availableForSale
                  image { url altText }
                }
              }
            }
          }
        }
      }
    }
  }
`

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      tags
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      images(first: 10) {
        edges {
          node { url altText width height }
        }
      }
      variants(first: 30) {
        edges {
          node {
            id
            title
            price { amount currencyCode }
            availableForSale
            image { url altText }
            selectedOptions { name value }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`

export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  tags: string[]
  minPrice: number
  currency: string
  images: { url: string; altText: string | null }[]
  variants: {
    id: string
    title: string
    price: number
    availableForSale: boolean
    image?: { url: string; altText: string | null }
  }[]
}

export interface ShopifyProductDetail extends ShopifyProduct {
  descriptionHtml: string
  maxPrice: number
  options: { name: string; values: string[] }[]
  variants: {
    id: string
    title: string
    price: number
    availableForSale: boolean
    image?: { url: string; altText: string | null }
    selectedOptions: { name: string; value: string }[]
  }[]
}

function transformProduct(node: any): ShopifyProduct {
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    tags: node.tags,
    minPrice: parseFloat(node.priceRange.minVariantPrice.amount),
    currency: node.priceRange.minVariantPrice.currencyCode,
    images: node.images.edges.map((e: any) => e.node),
    variants: node.variants.edges.map((e: any) => ({
      id: e.node.id,
      title: e.node.title,
      price: parseFloat(e.node.price.amount),
      availableForSale: e.node.availableForSale,
      image: e.node.image,
    })),
  }
}

function transformProductDetail(node: any): ShopifyProductDetail {
  return {
    ...transformProduct(node),
    descriptionHtml: node.descriptionHtml,
    maxPrice: parseFloat(node.priceRange.maxVariantPrice.amount),
    options: node.options,
    variants: node.variants.edges.map((e: any) => ({
      id: e.node.id,
      title: e.node.title,
      price: parseFloat(e.node.price.amount),
      availableForSale: e.node.availableForSale,
      image: e.node.image,
      selectedOptions: e.node.selectedOptions,
    })),
  }
}

export async function getProducts(first: number = 50): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<any>(PRODUCTS_QUERY, { first })
  return data.products.edges.map((edge: any) => transformProduct(edge.node))
}

export async function getProductByHandle(handle: string): Promise<ShopifyProductDetail | null> {
  const data = await shopifyFetch<any>(PRODUCT_BY_HANDLE_QUERY, { handle })
  if (!data.productByHandle) return null
  return transformProductDetail(data.productByHandle)
}

export async function getProductsByCollection(handle: string, first: number = 50): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<any>(COLLECTION_PRODUCTS_QUERY, { handle, first })
  if (!data.collectionByHandle) return []
  return data.collectionByHandle.products.edges.map((edge: any) => transformProduct(edge.node))
}

export async function getRegularProducts(): Promise<ShopifyProduct[]> {
  return getProductsByCollection('original')
}

export async function getOutletProducts(): Promise<ShopifyProduct[]> {
  return getProductsByCollection('outlet')
}
