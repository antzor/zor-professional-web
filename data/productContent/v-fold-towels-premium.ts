import type { ProductContent } from '../../types/productContent';

export const vFoldPremiumContent: ProductContent = {
  handle: 'v-fold-towels-premium',

  priceNote: {
    hr: 'po kutiji (15 paketa)',
    en: 'per case (15 packs)',
  },

  badge: {
    text: { hr: 'PREMIUM', en: 'PREMIUM' },
    color: 'primary',
  },

  features: [
    {
      icon: 'spa',
      title: {
        hr: 'Premium 3-slojni papir',
        en: 'Premium 3-ply paper',
      },
      description: {
        hr: 'Mekši i upojniji za luksuzni doživljaj.',
        en: 'Softer and more absorbent for a luxurious experience.',
      },
    },
    {
      icon: 'compress',
      title: {
        hr: 'Kompaktan dizajn',
        en: 'Compact design',
      },
      description: {
        hr: 'Premium kvaliteta u kompaktnom V-Fold formatu.',
        en: 'Premium quality in a compact V-Fold format.',
      },
    },
    {
      icon: 'hotel',
      title: {
        hr: 'Za zahtjevne goste',
        en: 'For discerning guests',
      },
      description: {
        hr: 'Idealno za butik hotele i fine dining restorane.',
        en: 'Ideal for boutique hotels and fine dining restaurants.',
      },
    },
    {
      icon: 'water_drop',
      title: {
        hr: 'Brzo sušenje',
        en: 'Quick drying',
      },
      description: {
        hr: '3 sloja osiguravaju brzo i učinkovito sušenje ruku.',
        en: '3 layers ensure quick and effective hand drying.',
      },
    },
  ],

  specifications: [
    { label: { hr: 'Slojevi', en: 'Layers' }, value: '3' },
    { label: { hr: 'Listova po paketu', en: 'Sheets per pack' }, value: '180' },
    { label: { hr: 'Veličina lista', en: 'Sheet size' }, value: '21 x 22cm' },
    { label: { hr: 'Presavijanje', en: 'Fold type' }, value: 'V-Fold' },
    { label: { hr: 'Paketa po kutiji', en: 'Packs per case' }, value: '15' },
    { label: { hr: 'Boja', en: 'Color' }, value: 'Bijela / White' },
  ],

  faq: [
    {
      question: {
        hr: 'Kada odabrati Premium umjesto Standard?',
        en: 'When to choose Premium over Standard?',
      },
      answer: {
        hr: 'Premium V-Fold je idealan za objekte gdje želite ostaviti dojam kvalitete — hoteli, ekskluzivni restorani, privatne klinike, luksuzni uredi.',
        en: 'Premium V-Fold is ideal for facilities where you want to leave an impression of quality — hotels, exclusive restaurants, private clinics, luxury offices.',
      },
    },
    {
      question: {
        hr: 'Je li Premium kompatibilan sa standardnim V-Fold dozatorima?',
        en: 'Is Premium compatible with standard V-Fold dispensers?',
      },
      answer: {
        hr: 'Da, Premium V-Fold koristi iste dozatore kao i Standard verzija. Jedina razlika je debljina papira.',
        en: 'Yes, Premium V-Fold uses the same dispensers as the Standard version. The only difference is paper thickness.',
      },
    },
    {
      question: {
        hr: 'Zašto Premium ima manje listova po paketu?',
        en: 'Why does Premium have fewer sheets per pack?',
      },
      answer: {
        hr: 'Zbog dodatnog sloja (3 vs 2), listovi su deblji i zauzimaju više prostora. No, bolji su i za sušenje, pa ih treba manje.',
        en: 'Due to the extra layer (3 vs 2), sheets are thicker and take more space. However, they\'re better for drying, so you need fewer.',
      },
    },
  ],

  testimonials: [
    {
      name: 'Luka D.',
      company: 'Boutique Hotel Lapad',
      text: {
        hr: 'Detalji čine razliku. Naši gosti cijene premium ručnike u kupaonicama.',
        en: 'Details make the difference. Our guests appreciate premium towels in the bathrooms.',
      },
      rating: 5,
    },
  ],

  frequentlyBoughtWith: ['toilet-paper-with-inserts', 'z-fold-towels-premium'],

  cta: {
    title: {
      hr: 'Detalji koji se primjećuju',
      en: 'Details that get noticed',
    },
    description: {
      hr: 'Premium V-Fold ručnici za goste koji cijene kvalitetu.',
      en: 'Premium V-Fold towels for guests who appreciate quality.',
    },
  },
};
