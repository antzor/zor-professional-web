// EXAMPLE: Product content template
// Copy this file and rename it to match your Shopify product handle
// e.g., mini-jumbo-toilet-paper.ts

import type { ProductContent } from '../../types/productContent';

export const exampleContent: ProductContent = {
  // REQUIRED: Must match your Shopify product handle exactly!
  handle: 'rewipe-toilet-paper',

  // Price note (shown below price)
  priceNote: {
    hr: 'po kutiji (12 rola)',
    en: 'per case (12 rolls)',
  },

  // Badge (optional)
  badge: {
    text: { hr: 'BESTSELER', en: 'BESTSELLER' },
    color: 'green', // 'green' | 'blue' | 'red' | 'yellow' | 'primary'
  },

  // Features section (optional)
  features: [
    {
      icon: 'eco', // Material icon name
      title: {
        hr: '100% reciklirani materijal',
        en: '100% recycled material',
      },
      description: {
        hr: 'Proizvedeno od recikliranog papira bez kompromisa u kvaliteti.',
        en: 'Made from recycled paper without compromising quality.',
      },
    },
    {
      icon: 'savings',
      title: {
        hr: 'Ekonomično pakiranje',
        en: 'Economic packaging',
      },
      description: {
        hr: '12 rola po kutiji osigurava optimalnu vrijednost.',
        en: '12 rolls per case ensures optimal value.',
      },
    },
    {
      icon: 'schedule',
      title: {
        hr: 'Duža trajnost',
        en: 'Longer lasting',
      },
      description: {
        hr: '150m po roli znači manje zamjena.',
        en: '150m per roll means fewer changes.',
      },
    },
    {
      icon: 'verified',
      title: {
        hr: 'EU certifikati',
        en: 'EU certified',
      },
      description: {
        hr: 'Zadovoljava sve europske standarde.',
        en: 'Meets all European standards.',
      },
    },
  ],

  // Specifications table (optional)
  specifications: [
    { label: { hr: 'Slojevi', en: 'Layers' }, value: '2' },
    { label: { hr: 'Duljina role', en: 'Roll length' }, value: '150m' },
    { label: { hr: 'Promjer', en: 'Diameter' }, value: '19cm' },
    { label: { hr: 'Širina', en: 'Width' }, value: '9.5cm' },
    { label: { hr: 'Rola po kutiji', en: 'Rolls per case' }, value: '12' },
  ],

  // FAQ section (optional)
  faq: [
    {
      question: {
        hr: 'Koji dozator je kompatibilan?',
        en: 'Which dispenser is compatible?',
      },
      answer: {
        hr: 'Mini Jumbo role odgovaraju svim standardnim mini jumbo dozatorima.',
        en: 'Mini Jumbo rolls fit all standard mini jumbo dispensers.',
      },
    },
    {
      question: {
        hr: 'Koliko dugo traje jedna rola?',
        en: 'How long does one roll last?',
      },
      answer: {
        hr: 'U prosječnom uredu s 20 zaposlenih, jedna rola traje 2-3 dana.',
        en: 'In an average office with 20 employees, one roll lasts 2-3 days.',
      },
    },
    {
      question: {
        hr: 'Mogu li naručiti uzorak?',
        en: 'Can I order a sample?',
      },
      answer: {
        hr: 'Da! Kontaktirajte nas za besplatan uzorak.',
        en: 'Yes! Contact us for a free sample.',
      },
    },
  ],

  // Testimonials section (optional)
  testimonials: [
    {
      name: 'Marko H.',
      company: 'Hotel Adriatic',
      text: {
        hr: 'Koristimo ZOR papir već 2 godine. Kvaliteta je konstantna, a cijena nepobjediva.',
        en: 'We have been using ZOR paper for 2 years. Quality is consistent and price is unbeatable.',
      },
      rating: 5,
    },
  ],

  // Video section (optional)
  video: {
    url: 'https://www.youtube.com/embed/VIDEO_ID',
    title: {
      hr: 'Kako odabrati pravi toaletni papir',
      en: 'How to choose the right toilet paper',
    },
  },

  // Frequently bought together (optional)
  // Use Shopify product handles
  frequentlyBoughtWith: ['maxi-jumbo-toilet-paper', 'centerfeed-paper-towels'],

  // CTA section (optional)
  cta: {
    title: {
      hr: 'Trebate veće količine?',
      en: 'Need larger quantities?',
    },
    description: {
      hr: 'Kontaktirajte nas za količinske popuste i posebne uvjete za veće narudžbe.',
      en: 'Contact us for volume discounts and special terms for larger orders.',
    },
  },
};
