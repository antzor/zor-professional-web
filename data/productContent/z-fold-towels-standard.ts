import type { ProductContent } from '../../types/productContent';

export const zFoldStandardContent: ProductContent = {
  handle: 'z-fold-towels-standard',

  priceNote: {
    hr: 'po kutiji (20 paketa)',
    en: 'per case (20 packs)',
  },

  features: [
    {
      icon: 'handshake',
      title: {
        hr: 'Higijensko doziranje',
        en: 'Hygienic dispensing',
      },
      description: {
        hr: 'Korisnik dodiruje samo ručnik koji koristi — bez kontaminacije ostatka.',
        en: 'User only touches the towel they use — no contamination of the rest.',
      },
    },
    {
      icon: 'eco',
      title: {
        hr: 'Smanjeni otpad',
        en: 'Reduced waste',
      },
      description: {
        hr: 'Z-fold dizajn osigurava da korisnici uzimaju samo onoliko koliko im treba.',
        en: 'Z-fold design ensures users take only what they need.',
      },
    },
    {
      icon: 'verified',
      title: {
        hr: 'Pouzdana kvaliteta',
        en: 'Reliable quality',
      },
      description: {
        hr: 'Meki 2-slojni papir za ugodno sušenje ruku.',
        en: 'Soft 2-ply paper for comfortable hand drying.',
      },
    },
    {
      icon: 'storefront',
      title: {
        hr: 'Za svaki objekt',
        en: 'For every facility',
      },
      description: {
        hr: 'Uredi, restorani, trgovine, ambulante — svestrano rješenje.',
        en: 'Offices, restaurants, shops, clinics — versatile solution.',
      },
    },
  ],

  specifications: [
    { label: { hr: 'Slojevi', en: 'Layers' }, value: '2' },
    { label: { hr: 'Listova po paketu', en: 'Sheets per pack' }, value: '200' },
    { label: { hr: 'Veličina lista', en: 'Sheet size' }, value: '23 x 25cm' },
    { label: { hr: 'Presavijanje', en: 'Fold type' }, value: 'Z-Fold' },
    { label: { hr: 'Paketa po kutiji', en: 'Packs per case' }, value: '20' },
    { label: { hr: 'Boja', en: 'Color' }, value: 'Bijela / White' },
  ],

  faq: [
    {
      question: {
        hr: 'Koja je razlika između Z-Fold i V-Fold?',
        en: 'What is the difference between Z-Fold and V-Fold?',
      },
      answer: {
        hr: 'Z-Fold (cik-cak) listovi su širi i presavijeni u obliku slova Z. V-Fold listovi su uži i presavijeni na pola. Z-Fold je popularniji u Europi, dok je V-Fold češći u kompaktnim dozatorima.',
        en: 'Z-Fold (zigzag) sheets are wider and folded in a Z shape. V-Fold sheets are narrower and folded in half. Z-Fold is more popular in Europe, while V-Fold is more common in compact dispensers.',
      },
    },
    {
      question: {
        hr: 'Koji dozator mi treba za Z-Fold ručnike?',
        en: 'Which dispenser do I need for Z-Fold towels?',
      },
      answer: {
        hr: 'Bilo koji standardni Z-Fold/C-Fold dozator. Nudimo plastične i metalne verzije u različitim bojama.',
        en: 'Any standard Z-Fold/C-Fold dispenser. We offer plastic and metal versions in various colors.',
      },
    },
    {
      question: {
        hr: 'Zašto je Z-Fold higijenski?',
        en: 'Why is Z-Fold hygienic?',
      },
      answer: {
        hr: 'Interleaved dizajn znači da kad povučete jedan ručnik, sljedeći izlazi napola iz dozatora. Korisnik nikad ne mora dirati ostale ručnike.',
        en: 'Interleaved design means when you pull one towel, the next one comes out halfway from the dispenser. User never has to touch other towels.',
      },
    },
  ],

  testimonials: [
    {
      name: 'Sandra L.',
      company: 'Poliklinika Sveti Duh',
      text: {
        hr: 'U zdravstvenoj ustanovi higijena je prioritet. Z-Fold ručnici su naš standard već godinama.',
        en: 'In a healthcare facility, hygiene is priority. Z-Fold towels have been our standard for years.',
      },
      rating: 5,
    },
  ],

  frequentlyBoughtWith: ['mini-jumbo-toilet-paper', 'z-fold-towels-premium'],

  cta: {
    title: {
      hr: 'Opremite svoje toalete',
      en: 'Equip your restrooms',
    },
    description: {
      hr: 'Z-Fold ručnici — higijenski standard za profesionalne prostore.',
      en: 'Z-Fold towels — hygienic standard for professional spaces.',
    },
  },
};
