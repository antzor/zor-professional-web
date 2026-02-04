// Shopify Storefront API Types

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  availableForSale: boolean;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  tags: string[];
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoney;
  } | null;
  images: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyProductVariant;
    }>;
  };
}

// Extended product response for detail page
export interface ShopifyProductDetail extends ShopifyProduct {
  descriptionHtml: string;
  metafield?: {
    value: string;
  } | null;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      title: string;
      handle: string;
      images: {
        edges: Array<{
          node: ShopifyImage;
        }>;
      };
    };
    price: ShopifyMoney;
  };
  cost: {
    totalAmount: ShopifyMoney;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: ShopifyMoney;
    subtotalAmount: ShopifyMoney;
  };
  lines: {
    edges: Array<{
      node: ShopifyCartLine;
    }>;
  };
}

// Normalized types for easier use in components
export interface Product {
  id: string;
  variantId: string;
  title: string;
  description: string;
  handle: string;
  price: number;
  compareAtPrice: number | null;
  currency: string;
  image: string | null;
  tags: string[];
  availableForSale: boolean;
}

export interface CartItem {
  lineId: string;
  variantId: string;
  productId: string;
  title: string;
  quantity: number;
  price: number;
  totalPrice: number;
  currency: string;
  image: string | null;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  total: number;
  currency: string;
}

// Product variant for detail page
export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice: number | null;
  currency: string;
  availableForSale: boolean;
}

// Extended product type for detail page (includes all images and variants)
export interface ProductDetail {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  price: number;
  compareAtPrice: number | null;
  currency: string;
  images: Array<{ url: string; altText: string | null }>;
  variants: ProductVariant[];
  tags: string[];
  availableForSale: boolean;
  videoUrl?: string;
}
