export interface OutletProduct {
  id: string;
  nameKey: string;
  descriptionKey: string;
  reasonKey: string; // Why it's in outlet (discontinued, packaging damage, etc.)
  originalPrice: number;
  outletPrice: number;
  currency: string;
  unitKey: string;
  image: string;
  discount: number; // percentage
  stock: 'limited' | 'last-items' | 'available';
}

export const outletProducts: OutletProduct[] = [
  {
    id: 'outlet-tp-mini-old',
    nameKey: 'outlet.prod.tpMiniOld',
    descriptionKey: 'outlet.prod.tpMiniOld.desc',
    reasonKey: 'outlet.reason.discontinued',
    originalPrice: 18.50,
    outletPrice: 12.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/mini jumbo.png',
    discount: 35,
    stock: 'limited',
  },
  {
    id: 'outlet-pt-damaged-pack',
    nameKey: 'outlet.prod.ptDamaged',
    descriptionKey: 'outlet.prod.ptDamaged.desc',
    reasonKey: 'outlet.reason.packaging',
    originalPrice: 20.00,
    outletPrice: 14.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/rucnik.png',
    discount: 30,
    stock: 'available',
  },
  {
    id: 'outlet-zf-overstock',
    nameKey: 'outlet.prod.zfOverstock',
    descriptionKey: 'outlet.prod.zfOverstock.desc',
    reasonKey: 'outlet.reason.overstock',
    originalPrice: 24.00,
    outletPrice: 16.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/z fold.png',
    discount: 33,
    stock: 'available',
  },
  {
    id: 'outlet-tp-coreless-old',
    nameKey: 'outlet.prod.tpCorelessOld',
    descriptionKey: 'outlet.prod.tpCorelessOld.desc',
    reasonKey: 'outlet.reason.oldBatch',
    originalPrice: 22.00,
    outletPrice: 15.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/toilet coreless.png',
    discount: 32,
    stock: 'last-items',
  },
  {
    id: 'outlet-vf-slight-defect',
    nameKey: 'outlet.prod.vfDefect',
    descriptionKey: 'outlet.prod.vfDefect.desc',
    reasonKey: 'outlet.reason.slightDefect',
    originalPrice: 22.00,
    outletPrice: 13.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/v fold.png',
    discount: 41,
    stock: 'limited',
  },
  {
    id: 'outlet-pt-blue-discontinued',
    nameKey: 'outlet.prod.ptBlue',
    descriptionKey: 'outlet.prod.ptBlue.desc',
    reasonKey: 'outlet.reason.discontinued',
    originalPrice: 35.00,
    outletPrice: 22.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/rucnik plavi.png',
    discount: 37,
    stock: 'last-items',
  },
  {
    id: 'outlet-tp-maxi-promo',
    nameKey: 'outlet.prod.tpMaxiPromo',
    descriptionKey: 'outlet.prod.tpMaxiPromo.desc',
    reasonKey: 'outlet.reason.promoEnd',
    originalPrice: 28.00,
    outletPrice: 19.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/toaletni papir.png',
    discount: 32,
    stock: 'available',
  },
  {
    id: 'outlet-zf-mixed',
    nameKey: 'outlet.prod.zfMixed',
    descriptionKey: 'outlet.prod.zfMixed.desc',
    reasonKey: 'outlet.reason.mixedBatch',
    originalPrice: 30.00,
    outletPrice: 18.00,
    currency: 'EUR',
    unitKey: 'unit.perCase',
    image: '/images/z fold.png',
    discount: 40,
    stock: 'limited',
  },
];
