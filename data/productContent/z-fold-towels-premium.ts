import type { ProductContent } from '../../types/productContent';

export const zFoldPremiumContent: ProductContent = {
  handle: 'z-fold-towels-premium',

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
        hr: 'Luksuzna mekoća',
        en: 'Luxurious softness',
      },
      description: {
        hr: '3-slojni papir za premium doživljaj sušenja ruku.',
        en: '3-ply paper for a premium hand drying experience.',
      },
    },
    {
      icon: 'hotel',
      title: {
        hr: 'Za premium objekte',
        en: 'For premium facilities',
      },
      description: {
        hr: 'Hoteli, fine dining restorani, luksuzni uredi.',
        en: 'Hotels, fine dining restaurants, luxury offices.',
      },
    },
    {
      icon: 'water_drop',
      title: {
        hr: 'Superiorna upojnost',
        en: 'Superior absorbency',
      },
      description: {
        hr: '3 sloja znače brže i učinkovitije sušenje.',
        en: '3 layers mean faster and more effective drying.',
      },
    },
    {
      icon: 'style',
      title: {
        hr: 'Elegantni izgled',
        en: 'Elegant appearance',
      },
      description: {
        hr: 'Bijeli mat papir koji ostavlja dojam kvalitete.',
        en: 'White matte paper that leaves an impression of quality.',
      },
    },
  ],

  specifications: [
    { label: { hr: 'Slojevi', en: 'Layers' }, value: '3' },
    { label: { hr: 'Listova po paketu', en: 'Sheets per pack' }, value: '150' },
    { label: { hr: 'Veličina lista', en: 'Sheet size' }, value: '23 x 25cm' },
    { label: { hr: 'Presavijanje', en: 'Fold type' }, value: 'Z-Fold' },
    { label: { hr: 'Paketa po kutiji', en: 'Packs per case' }, value: '15' },
    { label: { hr: 'Boja', en: 'Color' }, value: 'Bijela / White' },
  ],

  faq: [
    {
      question: {
        hr: 'Koja je razlika između Standard i Premium Z-Fold?',
        en: 'What is the difference between Standard and Premium Z-Fold?',
      },
      answer: {
        hr: 'Premium verzija ima 3 sloja umjesto 2, što znači mekši papir i bolju upojnost. Idealna je za objekte gdje želite ostaviti dojam kvalitete.',
        en: 'Premium version has 3 layers instead of 2, meaning softer paper and better absorbency. Ideal for facilities where you want to leave an impression of quality.',
      },
    },
    {
      question: {
        hr: 'Koristi li se isti dozator kao za Standard verziju?',
        en: 'Does it use the same dispenser as the Standard version?',
      },
      answer: {
        hr: 'Da, svi Z-Fold ručnici koriste isti tip dozatora bez obzira na broj slojeva.',
        en: 'Yes, all Z-Fold towels use the same type of dispenser regardless of the number of layers.',
      },
    },
    {
      question: {
        hr: 'Zašto ima manje listova po paketu nego Standard?',
        en: 'Why are there fewer sheets per pack than Standard?',
      },
      answer: {
        hr: 'Jer su listovi deblji (3 sloja vs 2 sloja), pa zauzimaju više prostora. Ipak, zbog bolje upojnosti treba manje listova za sušenje.',
        en: 'Because the sheets are thicker (3 layers vs 2 layers), they take up more space. However, due to better absorbency, fewer sheets are needed for drying.',
      },
    },
  ],

  testimonials: [
    {
      name: 'Igor V.',
      company: 'Hotel & Restaurant Esplanade',
      text: {
        hr: 'Za naše goste samo najbolje. Premium Z-Fold ručnici su detalj koji se primjećuje.',
        en: 'Only the best for our guests. Premium Z-Fold towels are a detail that gets noticed.',
      },
      rating: 5,
    },
  ],

  frequentlyBoughtWith: ['toilet-paper-with-inserts', 'v-fold-towels-premium'],

  cta: {
    title: {
      hr: 'Podignite standard svog objekta',
      en: 'Elevate your facility standard',
    },
    description: {
      hr: 'Premium Z-Fold ručnici za goste koji očekuju najbolje.',
      en: 'Premium Z-Fold towels for guests who expect the best.',
    },
  },
};
