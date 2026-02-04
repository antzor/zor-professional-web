import type { ProductContent } from '../../types/productContent';

export const vFoldStandardContent: ProductContent = {
  handle: 'v-fold-towels-standard',

  priceNote: {
    hr: 'po kutiji (20 paketa)',
    en: 'per case (20 packs)',
  },

  features: [
    {
      icon: 'compress',
      title: {
        hr: 'Kompaktan format',
        en: 'Compact format',
      },
      description: {
        hr: 'Zauzima manje prostora — idealno za male toalete i kompaktne dozatore.',
        en: 'Takes up less space — ideal for small restrooms and compact dispensers.',
      },
    },
    {
      icon: 'savings',
      title: {
        hr: 'Ekonomično rješenje',
        en: 'Economical solution',
      },
      description: {
        hr: 'Odličan omjer cijene i kvalitete za svakodnevnu upotrebu.',
        en: 'Great price-quality ratio for everyday use.',
      },
    },
    {
      icon: 'handshake',
      title: {
        hr: 'Higijensko doziranje',
        en: 'Hygienic dispensing',
      },
      description: {
        hr: 'Interleaved sustav — jedan ručnik van, sljedeći spreman.',
        en: 'Interleaved system — one towel out, next one ready.',
      },
    },
    {
      icon: 'storefront',
      title: {
        hr: 'Popularan izbor',
        en: 'Popular choice',
      },
      description: {
        hr: 'Standardni izbor za urede, trgovine i ugostiteljske objekte.',
        en: 'Standard choice for offices, shops, and hospitality facilities.',
      },
    },
  ],

  specifications: [
    { label: { hr: 'Slojevi', en: 'Layers' }, value: '2' },
    { label: { hr: 'Listova po paketu', en: 'Sheets per pack' }, value: '250' },
    { label: { hr: 'Veličina lista', en: 'Sheet size' }, value: '21 x 22cm' },
    { label: { hr: 'Presavijanje', en: 'Fold type' }, value: 'V-Fold' },
    { label: { hr: 'Paketa po kutiji', en: 'Packs per case' }, value: '20' },
    { label: { hr: 'Boja', en: 'Color' }, value: 'Bijela / White' },
  ],

  faq: [
    {
      question: {
        hr: 'Zašto odabrati V-Fold umjesto Z-Fold?',
        en: 'Why choose V-Fold over Z-Fold?',
      },
      answer: {
        hr: 'V-Fold je kompaktniji i stane u manje dozatore. Ako imate ograničen prostor ili već imate V-Fold dozatore, to je logičan izbor. Funkcionalnost je jednaka.',
        en: 'V-Fold is more compact and fits smaller dispensers. If you have limited space or already have V-Fold dispensers, it\'s the logical choice. Functionality is the same.',
      },
    },
    {
      question: {
        hr: 'Mogu li koristiti V-Fold u Z-Fold dozatoru?',
        en: 'Can I use V-Fold in a Z-Fold dispenser?',
      },
      answer: {
        hr: 'Ne preporučujemo. Dimenzije su različite i doziranje neće raditi pravilno. Koristite ručnike za tip dozatora koji imate.',
        en: 'We don\'t recommend it. Dimensions are different and dispensing won\'t work properly. Use towels for the type of dispenser you have.',
      },
    },
    {
      question: {
        hr: 'Koliko listova koristi prosječan korisnik?',
        en: 'How many sheets does an average user use?',
      },
      answer: {
        hr: 'Prosječno 1-2 lista po sušenju ruku. S 250 listova po paketu, jedan paket traje prilično dugo čak i u prometnim toaletima.',
        en: 'On average 1-2 sheets per hand drying. With 250 sheets per pack, one pack lasts quite long even in busy restrooms.',
      },
    },
  ],

  testimonials: [
    {
      name: 'Mirna B.',
      company: 'Računovodstveni ured MB',
      text: {
        hr: 'V-Fold ručnici su naš izbor za uredske toalete. Kompaktni, praktični i kvalitetni.',
        en: 'V-Fold towels are our choice for office restrooms. Compact, practical, and quality.',
      },
      rating: 5,
    },
  ],

  frequentlyBoughtWith: ['mini-jumbo-toilet-paper', 'v-fold-towels-premium'],

  cta: {
    title: {
      hr: 'Jednostavno i učinkovito',
      en: 'Simple and effective',
    },
    description: {
      hr: 'V-Fold ručnici — provjereno rješenje za svakodnevnu upotrebu.',
      en: 'V-Fold towels — proven solution for everyday use.',
    },
  },
};
