import type { ProductContent } from '../../types/productContent';

export const industrialContent: ProductContent = {
  handle: 'industrial-paper-towels',

  priceNote: {
    hr: 'po kutiji (2 role)',
    en: 'per case (2 rolls)',
  },

  badge: {
    text: { hr: 'HEAVY DUTY', en: 'HEAVY DUTY' },
    color: 'yellow',
  },

  features: [
    {
      icon: 'fitness_center',
      title: {
        hr: 'Iznimna čvrstoća',
        en: 'Exceptional strength',
      },
      description: {
        hr: 'Otporan na kidanje čak i kad je mokar — za najteže poslove.',
        en: 'Tear-resistant even when wet — for the toughest jobs.',
      },
    },
    {
      icon: 'opacity',
      title: {
        hr: 'Superiorna upojnost',
        en: 'Superior absorbency',
      },
      description: {
        hr: 'Upija ulje, mast, vodu i otapala brzo i učinkovito.',
        en: 'Absorbs oil, grease, water, and solvents quickly and efficiently.',
      },
    },
    {
      icon: 'precision_manufacturing',
      title: {
        hr: 'Za industrijsku upotrebu',
        en: 'For industrial use',
      },
      description: {
        hr: 'Dizajnirano za tvornice, servise, radionice i proizvodne pogone.',
        en: 'Designed for factories, service centers, workshops, and manufacturing plants.',
      },
    },
    {
      icon: 'all_inclusive',
      title: {
        hr: 'Veliki kapacitet',
        en: 'Large capacity',
      },
      description: {
        hr: '500m+ po roli znači manje zamjena u zahtjevnim okruženjima.',
        en: '500m+ per roll means fewer changes in demanding environments.',
      },
    },
  ],

  specifications: [
    { label: { hr: 'Slojevi', en: 'Layers' }, value: '2-3' },
    { label: { hr: 'Duljina role', en: 'Roll length' }, value: '500m' },
    { label: { hr: 'Širina', en: 'Width' }, value: '26cm' },
    { label: { hr: 'Promjer', en: 'Diameter' }, value: '30cm' },
    { label: { hr: 'Rola po kutiji', en: 'Rolls per case' }, value: '2' },
    { label: { hr: 'Boja', en: 'Color' }, value: 'Plava / Blue' },
  ],

  faq: [
    {
      question: {
        hr: 'Zašto su industrijski ručnici plavi?',
        en: 'Why are industrial towels blue?',
      },
      answer: {
        hr: 'Plava boja je industrijski standard jer omogućuje lakše uočavanje kontaminacije i ostataka materijala. Također se lakše razlikuje od bijelih papira u uredskim prostorima.',
        en: 'Blue is the industrial standard as it makes contamination and material residue easier to spot. It also differentiates easily from white papers in office spaces.',
      },
    },
    {
      question: {
        hr: 'Koji držač mi treba za industrijske role?',
        en: 'What holder do I need for industrial rolls?',
      },
      answer: {
        hr: 'Potreban je industrijski držač za role velikog promjera (30cm). Nudimo zidne i samostojeće verzije u plavoj boji.',
        en: 'You need an industrial holder for large diameter rolls (30cm). We offer wall-mounted and freestanding versions in blue.',
      },
    },
    {
      question: {
        hr: 'Mogu li se industrijski ručnici koristiti za čišćenje strojeva?',
        en: 'Can industrial towels be used for cleaning machinery?',
      },
      answer: {
        hr: 'Da, dizajnirani su upravo za to. Upijaju ulje i mast, a dovoljno su čvrsti da ne ostavljaju dlačice na površinama.',
        en: 'Yes, they are designed exactly for that. They absorb oil and grease and are strong enough not to leave lint on surfaces.',
      },
    },
  ],

  testimonials: [
    {
      name: 'Hrvoje T.',
      company: 'Tvornica strojeva Zagreb',
      text: {
        hr: 'Prešli smo na ZOR industrijske role prije godinu dana. Kvaliteta je odlična, a troškovi su nam pali jer role traju duže.',
        en: 'We switched to ZOR industrial rolls a year ago. Quality is excellent and our costs dropped because the rolls last longer.',
      },
      rating: 5,
    },
  ],

  frequentlyBoughtWith: ['centerfeed-paper-towels', 'maxi-jumbo-toilet-paper'],

  cta: {
    title: {
      hr: 'Opremite svoju tvornicu',
      en: 'Equip your factory',
    },
    description: {
      hr: 'Kontaktirajte nas za količinski popust na industrijske proizvode.',
      en: 'Contact us for volume discounts on industrial products.',
    },
  },
};
