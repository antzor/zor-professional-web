import type { ProductContent } from '../../types/productContent';

export const maxiJumboContent: ProductContent = {
  handle: 'maxi-jumbo-toilet-paper',

  priceNote: {
    hr: 'po kutiji (6 rola)',
    en: 'per case (6 rolls)',
  },

  badge: {
    text: { hr: 'VELIKI KAPACITET', en: 'HIGH CAPACITY' },
    color: 'blue',
  },

  features: [
    {
      icon: 'all_inclusive',
      title: {
        hr: 'Maksimalni kapacitet',
        en: 'Maximum capacity',
      },
      description: {
        hr: 'Do 300m papira po roli — idealno za objekte s velikim prometom.',
        en: 'Up to 300m of paper per roll — ideal for high-traffic facilities.',
      },
    },
    {
      icon: 'trending_down',
      title: {
        hr: 'Smanjeni troškovi održavanja',
        en: 'Reduced maintenance costs',
      },
      description: {
        hr: 'Rjeđe dopunjavanje znači manje radnih sati osoblja.',
        en: 'Less frequent refilling means fewer staff hours.',
      },
    },
    {
      icon: 'corporate_fare',
      title: {
        hr: 'Za velike objekte',
        en: 'For large facilities',
      },
      description: {
        hr: 'Trgovački centri, stadioni, aerodromi, tvornice.',
        en: 'Shopping centers, stadiums, airports, factories.',
      },
    },
    {
      icon: 'verified',
      title: {
        hr: 'Profesionalna kvaliteta',
        en: 'Professional quality',
      },
      description: {
        hr: 'Ista premium kvaliteta kao i ostali ZOR proizvodi.',
        en: 'Same premium quality as other ZOR products.',
      },
    },
  ],

  specifications: [
    { label: { hr: 'Slojevi', en: 'Layers' }, value: '2' },
    { label: { hr: 'Duljina role', en: 'Roll length' }, value: '300m' },
    { label: { hr: 'Promjer', en: 'Diameter' }, value: '26cm' },
    { label: { hr: 'Širina', en: 'Width' }, value: '9.5cm' },
    { label: { hr: 'Rola po kutiji', en: 'Rolls per case' }, value: '6' },
    { label: { hr: 'Boja', en: 'Color' }, value: 'Bijela / White' },
  ],

  faq: [
    {
      question: {
        hr: 'Koja je razlika između Mini i Maxi Jumbo?',
        en: 'What is the difference between Mini and Maxi Jumbo?',
      },
      answer: {
        hr: 'Maxi Jumbo ima veći promjer (26cm vs 19cm) i dvostruko više papira po roli (300m vs 150m). Idealan je za objekte s velikim prometom gdje želite minimizirati učestalost zamjene.',
        en: 'Maxi Jumbo has a larger diameter (26cm vs 19cm) and twice as much paper per roll (300m vs 150m). Ideal for high-traffic facilities where you want to minimize replacement frequency.',
      },
    },
    {
      question: {
        hr: 'Trebam li poseban dozator za Maxi Jumbo?',
        en: 'Do I need a special dispenser for Maxi Jumbo?',
      },
      answer: {
        hr: 'Da, potreban je Maxi Jumbo dozator s većim promjerom. Kontaktirajte nas za ponudu dozatora.',
        en: 'Yes, a Maxi Jumbo dispenser with a larger diameter is required. Contact us for a dispenser quote.',
      },
    },
    {
      question: {
        hr: 'Za koje objekte je Maxi Jumbo najbolji izbor?',
        en: 'For which facilities is Maxi Jumbo the best choice?',
      },
      answer: {
        hr: 'Trgovački centri, stadioni, aerodromi, tvornice, bolnice — bilo koji objekt s više od 100 korisnika dnevno.',
        en: 'Shopping centers, stadiums, airports, factories, hospitals — any facility with more than 100 users daily.',
      },
    },
  ],

  testimonials: [
    {
      name: 'Tomislav P.',
      company: 'Arena Zagreb',
      text: {
        hr: 'Za naše potrebe Maxi Jumbo je jedina opcija. Tijekom velikih događanja smanjili smo intervencije održavanja za 60%.',
        en: 'For our needs, Maxi Jumbo is the only option. During major events, we reduced maintenance interventions by 60%.',
      },
      rating: 5,
    },
  ],

  frequentlyBoughtWith: ['mini-jumbo-toilet-paper', 'industrial-paper-towels'],

  cta: {
    title: {
      hr: 'Opremite svoj objekt',
      en: 'Equip your facility',
    },
    description: {
      hr: 'Nudimo kompletna rješenja za velike objekte — papir, dozatori i redovita dostava.',
      en: 'We offer complete solutions for large facilities — paper, dispensers, and regular delivery.',
    },
  },
};
