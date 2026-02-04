import type { ProductContent } from '../../types/productContent';

export const smartoneContent: ProductContent = {
  handle: 'smartone-toilet-paper',

  priceNote: {
    hr: 'po kutiji (6 rola)',
    en: 'per case (6 rolls)',
  },

  badge: {
    text: { hr: 'SMART SUSTAV', en: 'SMART SYSTEM' },
    color: 'blue',
  },

  features: [
    {
      icon: 'touch_app',
      title: {
        hr: 'Doziranje jedan po jedan',
        en: 'Single-sheet dispensing',
      },
      description: {
        hr: 'Sustav izdaje jedan list po povlačenju — drastično smanjuje potrošnju.',
        en: 'System dispenses one sheet per pull — drastically reduces consumption.',
      },
    },
    {
      icon: 'savings',
      title: {
        hr: 'Do 40% manja potrošnja',
        en: 'Up to 40% less consumption',
      },
      description: {
        hr: 'Kontrolirano doziranje eliminira pretjeranu potrošnju.',
        en: 'Controlled dispensing eliminates excessive consumption.',
      },
    },
    {
      icon: 'health_and_safety',
      title: {
        hr: 'Maksimalna higijena',
        en: 'Maximum hygiene',
      },
      description: {
        hr: 'Korisnici dodiruju samo papir koji koriste — bez kontaminacije ostatka role.',
        en: 'Users only touch the paper they use — no contamination of the rest of the roll.',
      },
    },
    {
      icon: 'lock',
      title: {
        hr: 'Zatvoreni sustav',
        en: 'Enclosed system',
      },
      description: {
        hr: 'Rola je zaštićena unutar dozatora do trenutka upotrebe.',
        en: 'Roll is protected inside the dispenser until use.',
      },
    },
  ],

  specifications: [
    { label: { hr: 'Slojevi', en: 'Layers' }, value: '2' },
    { label: { hr: 'Duljina role', en: 'Roll length' }, value: '180m' },
    { label: { hr: 'Listova po roli', en: 'Sheets per roll' }, value: '1150' },
    { label: { hr: 'Promjer', en: 'Diameter' }, value: '20cm' },
    { label: { hr: 'Rola po kutiji', en: 'Rolls per case' }, value: '6' },
    { label: { hr: 'Sustav', en: 'System' }, value: 'SmartOne' },
  ],

  faq: [
    {
      question: {
        hr: 'Kako SmartOne sustav štedi papir?',
        en: 'How does the SmartOne system save paper?',
      },
      answer: {
        hr: 'Dozator izdaje točno jedan list po povlačenju. Korisnici ne mogu odvući više papira nego što im treba, što eliminira rasipanje. Studije pokazuju uštedu od 30-40% u odnosu na klasične role.',
        en: 'The dispenser releases exactly one sheet per pull. Users cannot take more paper than needed, eliminating waste. Studies show savings of 30-40% compared to classic rolls.',
      },
    },
    {
      question: {
        hr: 'Trebam li kupiti SmartOne dozator?',
        en: 'Do I need to buy a SmartOne dispenser?',
      },
      answer: {
        hr: 'Da, SmartOne role rade samo sa SmartOne dozatorima. Nudimo dozatore po povoljnim cijenama ili besplatno uz ugovor o redovitoj opskrbi.',
        en: 'Yes, SmartOne rolls only work with SmartOne dispensers. We offer dispensers at favorable prices or free with a regular supply contract.',
      },
    },
    {
      question: {
        hr: 'Je li SmartOne isplativ za manje objekte?',
        en: 'Is SmartOne cost-effective for smaller facilities?',
      },
      answer: {
        hr: 'SmartOne se najviše isplati u objektima s većim prometom gdje je rasipanje najizraženije. Za manje urede klasične Mini Jumbo role mogu biti ekonomičniji izbor.',
        en: 'SmartOne is most cost-effective in high-traffic facilities where waste is most pronounced. For smaller offices, classic Mini Jumbo rolls may be a more economical choice.',
      },
    },
  ],

  testimonials: [
    {
      name: 'Maja R.',
      company: 'City Center One',
      text: {
        hr: 'Nakon prelaska na SmartOne, troškovi toaletnog papira su nam pali za 35%. Sustav se isplatio u prvih 6 mjeseci.',
        en: 'After switching to SmartOne, our toilet paper costs dropped by 35%. The system paid for itself in the first 6 months.',
      },
      rating: 5,
    },
  ],

  frequentlyBoughtWith: ['maxi-jumbo-toilet-paper', 'centerfeed-paper-towels'],

  cta: {
    title: {
      hr: 'Smanjite troškove, povećajte higijenu',
      en: 'Reduce costs, increase hygiene',
    },
    description: {
      hr: 'Kontaktirajte nas za kalkulaciju ušteda za vaš objekt.',
      en: 'Contact us for a savings calculation for your facility.',
    },
  },
};
