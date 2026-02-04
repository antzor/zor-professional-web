import type { ProductContent } from '../../types/productContent';

export const centerfeedContent: ProductContent = {
  handle: 'centerfeed-paper-towels',

  priceNote: {
    hr: 'po kutiji (6 rola)',
    en: 'per case (6 rolls)',
  },

  badge: {
    text: { hr: 'SVESTRANO', en: 'VERSATILE' },
    color: 'blue',
  },

  features: [
    {
      icon: 'restaurant',
      title: {
        hr: 'Idealno za kuhinje',
        en: 'Ideal for kitchens',
      },
      description: {
        hr: 'Visoka upojnost za brzo čišćenje prolijevanja i sušenje ruku.',
        en: 'High absorbency for quick spill cleanup and hand drying.',
      },
    },
    {
      icon: 'construction',
      title: {
        hr: 'Radionice i servisi',
        en: 'Workshops and service centers',
      },
      description: {
        hr: 'Izdržljiv materijal za uklanjanje ulja i prljavštine.',
        en: 'Durable material for removing oil and grime.',
      },
    },
    {
      icon: 'touch_app',
      title: {
        hr: 'Jednostavno izvlačenje',
        en: 'Easy dispensing',
      },
      description: {
        hr: 'Centralno izvlačenje omogućuje jednostruko rukovanje.',
        en: 'Center-pull design allows single-handed operation.',
      },
    },
    {
      icon: 'recycling',
      title: {
        hr: 'Reciklirani materijal',
        en: 'Recycled material',
      },
      description: {
        hr: 'Dostupno u verziji od 100% recikliranog papira.',
        en: 'Available in 100% recycled paper version.',
      },
    },
  ],

  specifications: [
    { label: { hr: 'Slojevi', en: 'Layers' }, value: '2' },
    { label: { hr: 'Duljina role', en: 'Roll length' }, value: '150m' },
    { label: { hr: 'Širina', en: 'Width' }, value: '20cm' },
    { label: { hr: 'Promjer', en: 'Diameter' }, value: '20cm' },
    { label: { hr: 'Rola po kutiji', en: 'Rolls per case' }, value: '6' },
    { label: { hr: 'Boja', en: 'Color' }, value: 'Bijela / White' },
  ],

  faq: [
    {
      question: {
        hr: 'Za što se koriste centerfeed ručnici?',
        en: 'What are centerfeed towels used for?',
      },
      answer: {
        hr: 'Centerfeed ručnici su svestrani — koriste se za sušenje ruku u kuhinjama i toaletima, čišćenje radnih površina, brisanje prolijevanja u restoranima, održavanje u radionicama.',
        en: 'Centerfeed towels are versatile — used for hand drying in kitchens and bathrooms, cleaning work surfaces, wiping spills in restaurants, maintenance in workshops.',
      },
    },
    {
      question: {
        hr: 'Koji dozator mi treba?',
        en: 'Which dispenser do I need?',
      },
      answer: {
        hr: 'Bilo koji standardni centerfeed dozator s otvorom promjera 20cm. Nudimo zidne i stolne verzije.',
        en: 'Any standard centerfeed dispenser with a 20cm diameter opening. We offer wall-mounted and countertop versions.',
      },
    },
    {
      question: {
        hr: 'Koja je razlika između bijelih i plavih centerfeed ručnika?',
        en: 'What is the difference between white and blue centerfeed towels?',
      },
      answer: {
        hr: 'Plavi ručnici se tradicionalno koriste u industrijskim okruženjima jer je lakše vidjeti prljavštinu. Bijeli su popularniji u restoranima i uredima zbog estetike.',
        en: 'Blue towels are traditionally used in industrial settings as dirt is easier to see. White is more popular in restaurants and offices for aesthetic reasons.',
      },
    },
  ],

  testimonials: [
    {
      name: 'Petar K.',
      company: 'Restoran Korčula',
      text: {
        hr: 'Koristimo centerfeed role u kuhinji već godinama. Praktične su, ekonomične i osoblje ih voli jer se lako izvlače.',
        en: 'We have been using centerfeed rolls in the kitchen for years. They are practical, economical, and staff love them because they dispense easily.',
      },
      rating: 5,
    },
    {
      name: 'Boris M.',
      company: 'Auto servis Speedway',
      text: {
        hr: 'Za naš servis su neophodne. Izvrsna upojnost za ulje i dovoljno jake da ne pucaju.',
        en: 'Essential for our service center. Excellent oil absorption and strong enough not to tear.',
      },
      rating: 5,
    },
  ],

  frequentlyBoughtWith: ['mini-jumbo-toilet-paper', 'industrial-paper-towels'],

  cta: {
    title: {
      hr: 'Opremite kuhinju ili radionicu',
      en: 'Equip your kitchen or workshop',
    },
    description: {
      hr: 'Centerfeed ručnici su must-have za svaki profesionalni prostor.',
      en: 'Centerfeed towels are a must-have for any professional space.',
    },
  },
};
