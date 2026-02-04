import type {
  ShopifyProduct,
  ShopifyProductDetail,
  ShopifyCart,
  Product,
  ProductDetail,
  ProductVariant,
  Cart,
  CartItem,
} from '../types/shopify';

const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

const STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

// GraphQL client
async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error('Shopify API Error:', json.errors);
    throw new Error(json.errors[0]?.message || 'Shopify API Error');
  }

  return json.data;
}

// ============================================
// PRODUCTS
// ============================================

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

// Normalize Shopify product to our Product type
function normalizeProduct(shopifyProduct: ShopifyProduct): Product {
  const variant = shopifyProduct.variants.edges[0]?.node;
  const image = shopifyProduct.images.edges[0]?.node;

  return {
    id: shopifyProduct.id,
    variantId: variant?.id || '',
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    handle: shopifyProduct.handle,
    price: parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
    compareAtPrice: shopifyProduct.compareAtPriceRange?.minVariantPrice
      ? parseFloat(shopifyProduct.compareAtPriceRange.minVariantPrice.amount)
      : null,
    currency: shopifyProduct.priceRange.minVariantPrice.currencyCode,
    image: image?.url || null,
    tags: shopifyProduct.tags,
    availableForSale: variant?.availableForSale ?? true,
  };
}

export async function getProducts(first = 50): Promise<Product[]> {
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(
    PRODUCTS_QUERY,
    { first }
  );

  return data.products.edges.map((edge) => normalizeProduct(edge.node));
}

export async function getProductsByTag(tag: string, first = 50): Promise<Product[]> {
  const products = await getProducts(first);
  return products.filter((product) =>
    product.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export async function getRegularProducts(first = 50): Promise<Product[]> {
  const products = await getProducts(first);
  return products.filter(
    (product) => !product.tags.some((t) => t.toLowerCase() === 'outlet')
  );
}

export async function getOutletProducts(first = 50): Promise<Product[]> {
  return getProductsByTag('outlet', first);
}

// ============================================
// SINGLE PRODUCT (for detail page)
// ============================================

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
      metafield(namespace: "custom", key: "video_url") {
        value
      }
    }
  }
`;

// Normalize single product to ProductDetail type
function normalizeProductDetail(shopifyProduct: ShopifyProductDetail): ProductDetail {
  const variants: ProductVariant[] = shopifyProduct.variants.edges.map((edge) => ({
    id: edge.node.id,
    title: edge.node.title,
    price: parseFloat(edge.node.price.amount),
    compareAtPrice: edge.node.compareAtPrice
      ? parseFloat(edge.node.compareAtPrice.amount)
      : null,
    currency: edge.node.price.currencyCode,
    availableForSale: edge.node.availableForSale,
  }));

  const images = shopifyProduct.images.edges.map((edge) => ({
    url: edge.node.url,
    altText: edge.node.altText,
  }));

  const firstVariant = variants[0];
  const anyAvailable = variants.some((v) => v.availableForSale);

  return {
    id: shopifyProduct.id,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    descriptionHtml: shopifyProduct.descriptionHtml,
    handle: shopifyProduct.handle,
    price: firstVariant?.price ?? parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
    compareAtPrice: shopifyProduct.compareAtPriceRange?.minVariantPrice
      ? parseFloat(shopifyProduct.compareAtPriceRange.minVariantPrice.amount)
      : null,
    currency: firstVariant?.currency ?? shopifyProduct.priceRange.minVariantPrice.currencyCode,
    images,
    variants,
    tags: shopifyProduct.tags,
    availableForSale: anyAvailable,
    videoUrl: shopifyProduct.metafield?.value || undefined,
  };
}

export async function getProductByHandle(handle: string): Promise<ProductDetail | null> {
  try {
    const data = await shopifyFetch<{ product: ShopifyProductDetail | null }>(
      PRODUCT_BY_HANDLE_QUERY,
      { handle }
    );

    if (!data.product) return null;
    return normalizeProductDetail(data.product);
  } catch (error) {
    console.error('Error fetching product by handle:', error);
    return null;
  }
}

export async function getRelatedProducts(
  currentHandle: string,
  tags: string[],
  limit = 4
): Promise<Product[]> {
  const products = await getProducts(50);

  // Filter out current product and find products with matching tags
  const related = products
    .filter((p) => p.handle !== currentHandle)
    .map((p) => ({
      product: p,
      matchCount: p.tags.filter((t) => tags.includes(t)).length,
    }))
    .filter((item) => item.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, limit)
    .map((item) => item.product);

  // If not enough related products, fill with random products
  if (related.length < limit) {
    const remaining = products
      .filter((p) => p.handle !== currentHandle && !related.includes(p))
      .slice(0, limit - related.length);
    related.push(...remaining);
  }

  return related;
}

// ============================================
// CART
// ============================================

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                id
                title
                handle
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
              }
              price {
                amount
                currencyCode
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

const CREATE_CART_MUTATION = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const ADD_TO_CART_MUTATION = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const UPDATE_CART_MUTATION = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const REMOVE_FROM_CART_MUTATION = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const GET_CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
`;

// Normalize Shopify cart to our Cart type
function normalizeCart(shopifyCart: ShopifyCart): Cart {
  const items: CartItem[] = shopifyCart.lines.edges.map((edge) => {
    const line = edge.node;
    const image = line.merchandise.product.images.edges[0]?.node;

    return {
      lineId: line.id,
      variantId: line.merchandise.id,
      productId: line.merchandise.product.id,
      title: line.merchandise.product.title,
      quantity: line.quantity,
      price: parseFloat(line.merchandise.price.amount),
      totalPrice: parseFloat(line.cost.totalAmount.amount),
      currency: line.merchandise.price.currencyCode,
      image: image?.url || null,
    };
  });

  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    items,
    totalQuantity: shopifyCart.totalQuantity,
    subtotal: parseFloat(shopifyCart.cost.subtotalAmount.amount),
    total: parseFloat(shopifyCart.cost.totalAmount.amount),
    currency: shopifyCart.cost.totalAmount.currencyCode,
  };
}

export async function createCart(variantId?: string, quantity = 1): Promise<Cart> {
  const input = variantId
    ? { lines: [{ merchandiseId: variantId, quantity }] }
    : {};

  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(
    CREATE_CART_MUTATION,
    { input }
  );

  return normalizeCart(data.cartCreate.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const data = await shopifyFetch<{ cart: ShopifyCart | null }>(GET_CART_QUERY, {
      cartId,
    });

    if (!data.cart) return null;
    return normalizeCart(data.cart);
  } catch {
    return null;
  }
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(
    ADD_TO_CART_MUTATION,
    {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    }
  );

  return normalizeCart(data.cartLinesAdd.cart);
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(
    UPDATE_CART_MUTATION,
    {
      cartId,
      lines: [{ id: lineId, quantity }],
    }
  );

  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function removeFromCart(cartId: string, lineId: string): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(
    REMOVE_FROM_CART_MUTATION,
    {
      cartId,
      lineIds: [lineId],
    }
  );

  return normalizeCart(data.cartLinesRemove.cart);
}

// ============================================
// UTILITY
// ============================================

export function isShopifyConfigured(): boolean {
  return Boolean(
    SHOPIFY_STORE_DOMAIN &&
    SHOPIFY_STOREFRONT_TOKEN &&
    SHOPIFY_STORE_DOMAIN !== 'your-store.myshopify.com'
  );
}
