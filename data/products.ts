export type ProductCategory = 'toilet-paper' | 'paper-towels' | 'z-fold' | 'v-fold';

export interface Product {
  id: string;
  category: ProductCategory;
  nameKey: string;
  descriptionKey: string;
  specs: Record<string, string>;
  basePrice: number;
  currency: string;
  unitKey: string;
  image: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  image: string;
}

export const categories: CategoryInfo[] = [
  {
    id: 'toilet-paper',
    nameKey: 'cat.tp',
    descriptionKey: 'cat.tp.desc',
    icon: 'paper_roll',
    image: '/images/toaletni papir.png',
  },
  {
    id: 'paper-towels',
    nameKey: 'cat.pt',
    descriptionKey: 'cat.pt.desc',
    icon: 'dry_cleaning',
    image: '/images/rucnik.png',
  },
  {
    id: 'z-fold',
    nameKey: 'cat.zf',
    descriptionKey: 'cat.zf.desc',
    icon: 'folder_zip',
    image: '/images/z fold.png',
  },
  {
    id: 'v-fold',
    nameKey: 'cat.vf',
    descriptionKey: 'cat.vf.desc',
    icon: 'layers',
    image: '/images/v fold.png',
  },
];

export const products: Product[] = [
  // Toilet Paper
  {
    id: 'tp-mini-jumbo',
    category: 'toilet-paper',
    nameKey: 'prod.tp.miniJumbo',
    descriptionKey: 'prod.tp.miniJumbo.desc',
    specs: { layers: '2', lengthM: '150', diameter: '19 cm' },
    basePrice: 18.50,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/mini jumbo.png',
  },
  {
    id: 'tp-maxi-jumbo',
    category: 'toilet-paper',
    nameKey: 'prod.tp.maxiJumbo',
    descriptionKey: 'prod.tp.maxiJumbo.desc',
    specs: { layers: '2', lengthM: '300', diameter: '26 cm' },
    basePrice: 28.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/toaletni papir.png',
  },
  {
    id: 'tp-coreless',
    category: 'toilet-paper',
    nameKey: 'prod.tp.coreless',
    descriptionKey: 'prod.tp.coreless.desc',
    specs: { layers: '2', lengthM: '112', coreless: 'Yes' },
    basePrice: 22.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/toilet coreless.png',
  },
  {
    id: 'tp-inserts',
    category: 'toilet-paper',
    nameKey: 'prod.tp.inserts',
    descriptionKey: 'prod.tp.inserts.desc',
    specs: { layers: '3', sheets: '250', wrapped: 'Yes' },
    basePrice: 15.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/toaletni papir.png',
  },
  {
    id: 'tp-smartone',
    category: 'toilet-paper',
    nameKey: 'prod.tp.smartone',
    descriptionKey: 'prod.tp.smartone.desc',
    specs: { layers: '2', lengthM: '180', system: 'SmartOne' },
    basePrice: 32.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/mini jumbo.png',
  },
  // Paper Towels
  {
    id: 'pt-centerfeed',
    category: 'paper-towels',
    nameKey: 'prod.pt.centerfeed',
    descriptionKey: 'prod.pt.centerfeed.desc',
    specs: { layers: '2', lengthM: '108', rolls: '6' },
    basePrice: 20.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/rucnik.png',
  },
  {
    id: 'pt-industrial',
    category: 'paper-towels',
    nameKey: 'prod.pt.industrial',
    descriptionKey: 'prod.pt.industrial.desc',
    specs: { layers: '2', lengthM: '300', width: '26 cm' },
    basePrice: 35.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/rucnik plavi.png',
  },
  // Z-Fold
  {
    id: 'zf-standard',
    category: 'z-fold',
    nameKey: 'prod.zf.standard',
    descriptionKey: 'prod.zf.standard.desc',
    specs: { layers: '2', sheets: '200', packsPerCase: '20' },
    basePrice: 24.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/z fold.png',
  },
  {
    id: 'zf-premium',
    category: 'z-fold',
    nameKey: 'prod.zf.premium',
    descriptionKey: 'prod.zf.premium.desc',
    specs: { layers: '3', sheets: '150', packsPerCase: '20' },
    basePrice: 30.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/z fold.png',
  },
  // V-Fold
  {
    id: 'vf-standard',
    category: 'v-fold',
    nameKey: 'prod.vf.standard',
    descriptionKey: 'prod.vf.standard.desc',
    specs: { layers: '2', sheets: '250', packsPerCase: '20' },
    basePrice: 22.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/v fold.png',
  },
  {
    id: 'vf-premium',
    category: 'v-fold',
    nameKey: 'prod.vf.premium',
    descriptionKey: 'prod.vf.premium.desc',
    specs: { layers: '3', sheets: '200', packsPerCase: '15' },
    basePrice: 28.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/v fold.png',
  },
];
