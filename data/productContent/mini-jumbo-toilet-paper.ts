import type { ProductContent } from '../../types/productContent';

export const miniJumboContent: ProductContent = {
  handle: 'mini-jumbo-toilet-paper',

  priceNote: {
    hr: 'po kutiji (12 rola)',
    en: 'per case (12 rolls)',
  },

  badge: {
    text: { hr: 'NAJPRODAVANIJI', en: 'BESTSELLER' },
    color: 'green',
  },

  features: [
    {
      icon: 'check_circle',
      title: {
        hr: 'Univerzalna kompatibilnost',
        en: 'Universal compatibility',
      },
      description: {
        hr: 'Odgovara svim standardnim mini jumbo dozatorima na tržištu.',
        en: 'Fits all standard mini jumbo dispensers on the market.',
      },
    },
    {
      icon: 'savings',
      title: {
        hr: 'Optimalan omjer cijene i kvalitete',
        en: 'Optimal price-quality ratio',
      },
      description: {
        hr: 'Profesionalna kvaliteta po pristupačnoj cijeni za svakodnevnu upotrebu.',
        en: 'Professional quality at an affordable price for everyday use.',
      },
    },
    {
      icon: 'schedule',
      title: {
        hr: 'Manje zamjena',
        en: 'Fewer changes',
      },
      description: {
        hr: 'Veća metraža po roli znači rjeđe dopunjavanje dozatora.',
        en: 'Greater length per roll means less frequent dispenser refills.',
      },
    },
    {
      icon: 'verified',
      title: {
        hr: 'EU standardi kvalitete',
        en: 'EU quality standards',
      },
      description: {
        hr: 'Proizvedeno prema strogim europskim standardima higijene.',
        en: 'Manufactured according to strict European hygiene standards.',
      },
    },
  ],

  specifications: [
    { label: { hr: 'Slojevi', en: 'Layers' }, value: '2' },
    { label: { hr: 'Duljina role', en: 'Roll length' }, value: '150m' },
    { label: { hr: 'Promjer', en: 'Diameter' }, value: '19cm' },
    { label: { hr: 'Širina', en: 'Width' }, value: '9.5cm' },
    { label: { hr: 'Rola po kutiji', en: 'Rolls per case' }, value: '12' },
    { label: { hr: 'Boja', en: 'Color' }, value: 'Bijela / White' },
  ],

  faq: [
    {
      question: {
        hr: 'Koji dozator je kompatibilan s Mini Jumbo rolama?',
        en: 'Which dispenser is compatible with Mini Jumbo rolls?',
      },
      answer: {
        hr: 'Mini Jumbo role odgovaraju svim standardnim mini jumbo dozatorima s promjerom utora od 19cm. Nudimo i kompatibilne dozatore u našoj ponudi.',
        en: 'Mini Jumbo rolls fit all standard mini jumbo dispensers with a 19cm slot diameter. We also offer compatible dispensers in our range.',
      },
    },
    {
      question: {
        hr: 'Koliko dugo traje jedna rola?',
        en: 'How long does one roll last?',
      },
      answer: {
        hr: 'Ovisno o prometu, u prosječnom uredu s 20-30 zaposlenih jedna rola traje 2-3 dana. U objektima s većim prometom preporučujemo Maxi Jumbo format.',
        en: 'Depending on traffic, in an average office with 20-30 employees, one roll lasts 2-3 days. For higher traffic facilities, we recommend the Maxi Jumbo format.',
      },
    },
    {
      question: {
        hr: 'Mogu li naručiti uzorak prije veće narudžbe?',
        en: 'Can I order a sample before placing a larger order?',
      },
      answer: {
        hr: 'Naravno! Kontaktirajte nas putem obrasca i poslat ćemo vam besplatan uzorak za testiranje.',
        en: 'Of course! Contact us through the form and we will send you a free sample for testing.',
      },
    },
  ],

  testimonials: [
    {
      name: 'Marko H.',
      company: 'Hotel & Spa Adriatic',
      text: {
        hr: 'Koristimo ZOR Mini Jumbo već 2 godine u cijelom hotelu. Kvaliteta je konstantna, gosti su zadovoljni, a mi štedimo na troškovima.',
        en: 'We have been using ZOR Mini Jumbo for 2 years throughout the hotel. Quality is consistent, guests are satisfied, and we save on costs.',
      },
      rating: 5,
    },
    {
      name: 'Ana K.',
      company: 'Ured za računovodstvo Exact',
      text: {
        hr: 'Odlična kvaliteta za uredske prostore. Soft, izdržljiv i bez nepotrebnog otpada.',
        en: 'Excellent quality for office spaces. Soft, durable, and no unnecessary waste.',
      },
      rating: 5,
    },
  ],

  frequentlyBoughtWith: ['maxi-jumbo-toilet-paper', 'centerfeed-paper-towels'],

  cta: {
    title: {
      hr: 'Trebate veće količine?',
      en: 'Need larger quantities?',
    },
    description: {
      hr: 'Kontaktirajte nas za količinske popuste. Što više naručite, to je cijena povoljnija!',
      en: 'Contact us for volume discounts. The more you order, the better the price!',
    },
  },
};
