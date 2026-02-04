// Product Content Registry
// Import your product content files here and add them to the registry

import type { ProductContent } from '../../types/productContent';

// Toilet Paper
import { miniJumboContent } from './mini-jumbo-toilet-paper';
import { maxiJumboContent } from './maxi-jumbo-toilet-paper';
import { corelessContent } from './coreless-toilet-paper';
import { insertsContent } from './toilet-paper-with-inserts';
import { smartoneContent } from './smartone-toilet-paper';

// Paper Towels
import { centerfeedContent } from './centerfeed-paper-towels';
import { industrialContent } from './industrial-paper-towels';

// Z-Fold Towels
import { zFoldStandardContent } from './z-fold-towels-standard';
import { zFoldPremiumContent } from './z-fold-towels-premium';

// V-Fold Towels
import { vFoldStandardContent } from './v-fold-towels-standard';
import { vFoldPremiumContent } from './v-fold-towels-premium';

// Product content registry - key must match Shopify product handle
const productContents: Record<string, ProductContent> = {
  // Toilet Paper
  'mini-jumbo-toilet-paper': miniJumboContent,
  'maxi-jumbo-toilet-paper': maxiJumboContent,
  'coreless-toilet-paper': corelessContent,
  'toilet-paper-with-inserts': insertsContent,
  'smartone-toilet-paper': smartoneContent,

  // Paper Towels
  'centerfeed-paper-towels': centerfeedContent,
  'industrial-paper-towels': industrialContent,

  // Z-Fold Towels
  'z-fold-towels-standard': zFoldStandardContent,
  'z-fold-towels-premium': zFoldPremiumContent,

  // V-Fold Towels
  'v-fold-towels-standard': vFoldStandardContent,
  'v-fold-towels-premium': vFoldPremiumContent,
};

/**
 * Get product content by Shopify handle
 * Returns null if no content exists for the product
 */
export function getProductContent(handle: string): ProductContent | null {
  return productContents[handle] || null;
}

/**
 * Check if product has local content
 */
export function hasProductContent(handle: string): boolean {
  return handle in productContents;
}

/**
 * Get all product handles that have local content
 */
export function getProductHandlesWithContent(): string[] {
  return Object.keys(productContents);
}

export type { ProductContent };
