import type { ProductContent } from '../../types/productContent';

export const corelessContent: ProductContent = {
  handle: 'coreless-toilet-paper',

  priceNote: {
    hr: 'po kutiji (12 rola)',
    en: 'per case (12 rolls)',
  },

  badge: {
    text: { hr: 'ECO IZBOR', en: 'ECO CHOICE' },
    color: 'green',
  },

  features: [
    {
      icon: 'eco',
      title: {
        hr: 'Bez kartonske jezgre',
        en: 'No cardboard core',
      },
      description: {
        hr: 'Eliminira otpad od kartonskih jezgri — manje smeća, više održivosti.',
        en: 'Eliminates cardboard core waste — less trash, more sustainability.',
      },
    },
    {
      icon: 'add_circle',
      title: {
        hr: 'Više papira po roli',
        en: 'More paper per roll',
      },
      description: {
        hr: 'Prostor koji bi zauzimala jezgra ispunjen je dodatnim papirom.',
        en: 'The space that would be occupied by the core is filled with extra paper.',
      },
    },
    {
      icon: 'delete_forever',
      title: {
        hr: 'Nula otpada od jezgri',
        en: 'Zero core waste',
      },
      description: {
        hr: 'Nema kartonskih jezgri za bacanje — manje posla za održavanje.',
        en: 'No cardboard cores to dispose of — less work for maintenance.',
      },
    },
    {
      icon: 'park',
      title: {
        hr: 'Održivi izbor',
        en: 'Sustainable choice',
      },
      description: {
        hr: 'Smanjite ekološki otisak vašeg objekta.',
        en: 'Reduce your facility\'s environmental footprint.',
      },
    },
  ],

  specifications: [
    { label: { hr: 'Slojevi', en: 'Layers' }, value: '2' },
    { label: { hr: 'Duljina role', en: 'Roll length' }, value: '180m' },
    { label: { hr: 'Promjer', en: 'Diameter' }, value: '13cm' },
    { label: { hr: 'Širina', en: 'Width' }, value: '9.5cm' },
    { label: { hr: 'Rola po kutiji', en: 'Rolls per case' }, value: '12' },
    { label: { hr: 'Jezgra', en: 'Core' }, value: 'Bez jezgre / Coreless' },
  ],

  faq: [
    {
      question: {
        hr: 'Kako funkcionira rola bez jezgre?',
        en: 'How does a coreless roll work?',
      },
      answer: {
        hr: 'Rola se odmotava od središta prema van. Specijalni dozator drži rolu na mjestu dok se papir izvlači. Kada se potroši, jednostavno uklonite ostatak i stavite novu rolu.',
        en: 'The roll unwinds from the center outward. A special dispenser holds the roll in place while paper is pulled. When depleted, simply remove the remnant and insert a new roll.',
      },
    },
    {
      question: {
        hr: 'Trebam li poseban dozator?',
        en: 'Do I need a special dispenser?',
      },
      answer: {
        hr: 'Da, potreban je dozator za role bez jezgre. Nudimo ih u našoj ponudi ili možete koristiti bilo koji standardni coreless dozator.',
        en: 'Yes, a coreless roll dispenser is required. We offer them in our range, or you can use any standard coreless dispenser.',
      },
    },
    {
      question: {
        hr: 'Koliko papira više dobijem u usporedbi s običnom rolom?',
        en: 'How much more paper do I get compared to a regular roll?',
      },
      answer: {
        hr: 'Otprilike 15-20% više papira po roli jer nema prostora izgubljenog na kartonsku jezgru.',
        en: 'Approximately 15-20% more paper per roll as there is no space lost to the cardboard core.',
      },
    },
  ],

  testimonials: [
    {
      name: 'Ivana M.',
      company: 'Green Office d.o.o.',
      text: {
        hr: 'Kao tvrtka koja vodi računa o održivosti, coreless role su savršen izbor. Manje otpada, više papira, zadovoljni smo.',
        en: 'As a company that cares about sustainability, coreless rolls are the perfect choice. Less waste, more paper, we are satisfied.',
      },
      rating: 5,
    },
  ],

  frequentlyBoughtWith: ['mini-jumbo-toilet-paper', 'z-fold-towels-standard'],

  cta: {
    title: {
      hr: 'Smanjite otpad danas',
      en: 'Reduce waste today',
    },
    description: {
      hr: 'Prijeđite na role bez jezgre i napravite korak prema održivijem poslovanju.',
      en: 'Switch to coreless rolls and take a step towards more sustainable business.',
    },
  },
};
