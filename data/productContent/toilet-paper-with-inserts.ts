import type { ProductContent } from '../../types/productContent';

export const insertsContent: ProductContent = {
  handle: 'toilet-paper-with-inserts',

  priceNote: {
    hr: 'po kutiji (24 paketa)',
    en: 'per case (24 packs)',
  },

  badge: {
    text: { hr: 'PREMIUM', en: 'PREMIUM' },
    color: 'primary',
  },

  features: [
    {
      icon: 'hotel',
      title: {
        hr: 'Hotelski standard',
        en: 'Hotel standard',
      },
      description: {
        hr: 'Pojedinačno zapakirani listovi s elegantnim umetkom — standard u premium ugostiteljstvu.',
        en: 'Individually wrapped sheets with elegant insert — standard in premium hospitality.',
      },
    },
    {
      icon: 'branding_watermark',
      title: {
        hr: 'Brendiranje moguće',
        en: 'Branding available',
      },
      description: {
        hr: 'Umetci mogu nositi vaš logo — idealno za hotele i restorane.',
        en: 'Inserts can feature your logo — ideal for hotels and restaurants.',
      },
    },
    {
      icon: 'spa',
      title: {
        hr: 'Premium doživljaj',
        en: 'Premium experience',
      },
      description: {
        hr: 'Meki, višeslojni papir za luksuzni osjećaj.',
        en: 'Soft, multi-ply paper for a luxurious feel.',
      },
    },
    {
      icon: 'health_and_safety',
      title: {
        hr: 'Higijenski zapakiran',
        en: 'Hygienically wrapped',
      },
      description: {
        hr: 'Svaki paket zaštićen od kontaminacije do trenutka upotrebe.',
        en: 'Each pack protected from contamination until use.',
      },
    },
  ],

  specifications: [
    { label: { hr: 'Slojevi', en: 'Layers' }, value: '3' },
    { label: { hr: 'Listova po paketu', en: 'Sheets per pack' }, value: '200' },
    { label: { hr: 'Veličina lista', en: 'Sheet size' }, value: '10 x 12cm' },
    { label: { hr: 'Paketa po kutiji', en: 'Packs per case' }, value: '24' },
    { label: { hr: 'Umetak', en: 'Insert' }, value: 'Da / Yes' },
    { label: { hr: 'Brendiranje', en: 'Branding' }, value: 'Dostupno / Available' },
  ],

  faq: [
    {
      question: {
        hr: 'Mogu li dobiti vlastiti logo na umetku?',
        en: 'Can I get my own logo on the insert?',
      },
      answer: {
        hr: 'Da! Nudimo whitelabel opciju gdje možete imati vlastiti dizajn umetka s logom vašeg hotela ili restorana. Minimalna narudžba je 50 kutija.',
        en: 'Yes! We offer a whitelabel option where you can have your own insert design with your hotel or restaurant logo. Minimum order is 50 cases.',
      },
    },
    {
      question: {
        hr: 'Za koga je ovaj proizvod namijenjen?',
        en: 'Who is this product intended for?',
      },
      answer: {
        hr: 'Premium hoteli, restorani, spa centri, poslovni uredi koji žele impresionirati goste i klijente.',
        en: 'Premium hotels, restaurants, spa centers, business offices that want to impress guests and clients.',
      },
    },
    {
      question: {
        hr: 'Kako se koristi?',
        en: 'How is it used?',
      },
      answer: {
        hr: 'Paketi se postavljaju u standardne držače za toaletni papir ili se ostavljaju kao kompliment u kupaonicama. Umetak ostaje vidljiv kao dekorativni element.',
        en: 'Packs are placed in standard toilet paper holders or left as a compliment in bathrooms. The insert remains visible as a decorative element.',
      },
    },
  ],

  testimonials: [
    {
      name: 'Darko S.',
      company: 'Boutique Hotel Miramare',
      text: {
        hr: 'Naši gosti primjećuju i cijene male detalje. ZOR papir s umetcima podiže cijeli doživljaj kupaonice.',
        en: 'Our guests notice and appreciate small details. ZOR paper with inserts elevates the entire bathroom experience.',
      },
      rating: 5,
    },
  ],

  frequentlyBoughtWith: ['z-fold-towels-premium', 'v-fold-towels-premium'],

  cta: {
    title: {
      hr: 'Podignite standarde vašeg objekta',
      en: 'Elevate your facility standards',
    },
    description: {
      hr: 'Kontaktirajte nas za personalizirane umetke s vašim brendom.',
      en: 'Contact us for personalized inserts with your brand.',
    },
  },
};
