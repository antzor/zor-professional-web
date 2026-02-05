/**
 * Migration script to push all static content to Sanity CMS
 * Run with: npx tsx migrate.ts
 */

import { createClient } from '@sanity/client'

// Sanity client configuration
const client = createClient({
  projectId: '1fxf3is1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN, // You'll need to create this in Sanity dashboard
  useCdn: false,
})

// ============================================
// BLOG POSTS DATA
// ============================================

const blogPosts = [
  {
    _type: 'blogPost',
    slug: { _type: 'slug', current: 'paper-towel-types' },
    titleHr: 'Vrste papirnih ručnika: Z-Fold vs V-Fold vs Centerfeed - Potpuni vodič',
    titleEn: 'Paper Towel Types: Z-Fold vs V-Fold vs Centerfeed - Complete Guide',
    excerptHr: 'Usporedite Z-fold, V-fold i Centerfeed papirne ručnike. Saznajte koja vrsta je najbolja za vaš objekt - toaletni prostori, kuhinje, radionice. Detaljna usporedba kapaciteta, higijene i troškova.',
    excerptEn: 'Compare Z-fold, V-fold, and Centerfeed paper towels. Learn which type is best for your facility - washrooms, kitchens, workshops. Detailed comparison of capacity, hygiene, and costs.',
    contentHr: `<h2>Uvod u vrste papirnih ručnika</h2>
<p>Odabir pravog tipa papirnih ručnika za vaš objekt nije samo pitanje preference - to direktno utječe na higijenu, zadovoljstvo korisnika, potrošnju i troškove. U ovom vodiču detaljno ćemo usporediti tri najčešća formata papirnih ručnika u komercijalnoj upotrebi: Z-fold (interfold), V-fold (multifold) i Centerfeed rolne.</p>
<p>Svaki format ima svoje prednosti i idealne primjene, a razumijevanje razlika pomoći će vam donijeti informiranu odluku za vaš hotel, restoran, ured, školu ili industrijsko postrojenje.</p>
<h2>Z-Fold papirni ručnici (Interfold)</h2>
<h3>Što su Z-fold ručnici?</h3>
<p>Z-fold ručnici su presavijeni u obliku slova "Z", što znači da je svaki ručnik preklopen s prethodnim u stilu interfold (međupreplitanje). Kada izvučete jedan ručnik, sljedeći djelomično izlazi iz dozatora, pripremljen za sljedeću upotrebu.</p>
<h3>Ključne karakteristike:</h3>
<ul>
<li><strong>Format:</strong> Tipično 24cm x 21cm (1-ply) ili 23cm x 23cm (2-ply)</li>
<li><strong>Kapacitet dozatora:</strong> 200-300 ručnika po punjenju</li>
<li><strong>Izvlačenje:</strong> Jedan po jedan, interfold sustav</li>
<li><strong>Slojevi:</strong> Dostupno u 1-ply, 2-ply i 3-ply kvalitetama</li>
</ul>
<h2>Zaključak</h2>
<p>Odabir između Z-fold, V-fold i Centerfeed papirnih ručnika ovisi o specifičnim potrebama vašeg objekta. Z-fold pruža najbolju higijenu i smanjenje otpada, V-fold je ekonomičan za visoko frekventne lokacije, dok je Centerfeed idealan za industrijske primjene.</p>`,
    contentEn: `<h2>Introduction to Paper Towel Types</h2>
<p>Choosing the right type of paper towel for your facility isn't just a matter of preference - it directly impacts hygiene, user satisfaction, consumption, and costs. In this guide, we'll compare in detail the three most common commercial paper towel formats: Z-fold (interfold), V-fold (multifold), and Centerfeed rolls.</p>
<p>Each format has its advantages and ideal applications, and understanding the differences will help you make an informed decision for your hotel, restaurant, office, school, or industrial facility.</p>
<h2>Z-Fold Paper Towels (Interfold)</h2>
<h3>What are Z-Fold Towels?</h3>
<p>Z-fold towels are folded in the shape of the letter "Z", meaning each towel overlaps with the previous one in an interfold style. When you pull one towel, the next one partially emerges from the dispenser, ready for the next use.</p>
<h3>Key Characteristics:</h3>
<ul>
<li><strong>Format:</strong> Typically 24cm x 21cm (1-ply) or 23cm x 23cm (2-ply)</li>
<li><strong>Dispenser capacity:</strong> 200-300 towels per refill</li>
<li><strong>Dispensing:</strong> One at a time, interfold system</li>
<li><strong>Layers:</strong> Available in 1-ply, 2-ply, and 3-ply qualities</li>
</ul>
<h2>Conclusion</h2>
<p>The choice between Z-fold, V-fold, and Centerfeed paper towels depends on your facility's specific needs. Z-fold provides the best hygiene and waste reduction, V-fold is economical for high-traffic locations, while Centerfeed is ideal for industrial applications.</p>`,
    categoryHr: 'Vodiči',
    categoryEn: 'Guides',
    tags: ['paper-towels', 'z-fold', 'v-fold', 'centerfeed', 'comparison', 'buying-guide'],
    author: 'ZOR Professional Team',
    publishedDate: '2025-01-22',
    featured: true,
    readingTime: 9,
    metaDescriptionHr: 'Usporedite Z-fold, V-fold i Centerfeed papirne ručnike. Detaljna usporedba higijene, kapaciteta, troškova i primjene. ZOR Professional vodič za odabir pravog tipa.',
    metaDescriptionEn: 'Compare Z-fold, V-fold, and Centerfeed paper towels. Detailed comparison of hygiene, capacity, costs, and applications. ZOR Professional guide to choosing the right type.',
    keywords: ['paper towel types', 'z fold vs v fold', 'centerfeed paper towels', 'commercial paper towels'],
    relatedProducts: ['z-fold-towels-standard', 'z-fold-towels-premium', 'v-fold-towels-standard', 'centerfeed-paper-towels'],
  },
  {
    _type: 'blogPost',
    slug: { _type: 'slug', current: 'sustainable-paper-solutions' },
    titleHr: 'Održiva rješenja u papirnoj industriji: Vodič za 2025',
    titleEn: 'Sustainable Paper Solutions: A Guide for 2025',
    excerptHr: 'Saznajte kako odabrati ekološki prihvatljive papirne proizvode za vaše poslovanje. Reciklirani papir, certifikati i praktični savjeti za smanjenje utjecaja na okoliš.',
    excerptEn: 'Learn how to choose eco-friendly paper products for your business. Recycled paper, certifications, and practical tips for reducing environmental impact.',
    contentHr: `<h2>Održivost u papirnoj industriji</h2>
<p>Papirna industrija prolazi kroz značajnu transformaciju prema održivijim praksama. Kao proizvođač i distributer, ZOR Professional aktivno sudjeluje u ovoj transformaciji nudeći ekološki prihvatljive alternative.</p>
<h2>Reciklirani papir vs. Djevičanski papir</h2>
<p>Reciklirani papir proizvodi se od već korištenog papira, čime se smanjuje potreba za sirovinama i energijom. Djevičanski papir proizvodi se od svježih vlakana, ali može biti certificiran za održivo šumarstvo.</p>
<h2>Zaključak</h2>
<p>Održivi papirni proizvodi više nisu samo etički izbor - oni su poslovni imperativ koji donosi dugoročne koristi za vaše poslovanje i okoliš.</p>`,
    contentEn: `<h2>Sustainability in the Paper Industry</h2>
<p>The paper industry is undergoing a significant transformation towards more sustainable practices. As a manufacturer and distributor, ZOR Professional actively participates in this transformation by offering eco-friendly alternatives.</p>
<h2>Recycled Paper vs. Virgin Paper</h2>
<p>Recycled paper is produced from previously used paper, reducing the need for raw materials and energy. Virgin paper is made from fresh fibers but can be certified for sustainable forestry.</p>
<h2>Conclusion</h2>
<p>Sustainable paper products are no longer just an ethical choice - they are a business imperative that brings long-term benefits for your business and the environment.</p>`,
    categoryHr: 'Održivost',
    categoryEn: 'Sustainability',
    tags: ['sustainability', 'eco-friendly', 'recycled-paper', 'green-business'],
    author: 'ZOR Professional Team',
    publishedDate: '2025-02-01',
    featured: true,
    readingTime: 7,
    metaDescriptionHr: 'Saznajte kako odabrati ekološki prihvatljive papirne proizvode. Vodič kroz reciklirani papir, certifikate i održive prakse.',
    metaDescriptionEn: 'Learn how to choose eco-friendly paper products. Guide to recycled paper, certifications, and sustainable practices.',
    keywords: ['sustainable paper', 'recycled paper', 'eco-friendly', 'green business'],
    relatedProducts: ['coreless-toilet-paper', 'centerfeed-paper-towels'],
  },
  {
    _type: 'blogPost',
    slug: { _type: 'slug', current: 'whitelabel-benefits' },
    titleHr: 'Prednosti whitelabel proizvodnje papirnih proizvoda',
    titleEn: 'Benefits of Whitelabel Paper Product Manufacturing',
    excerptHr: 'Otkrijte kako whitelabel proizvodnja može transformirati vaše poslovanje. Od kontrole branda do ušteda - sve prednosti privatne marke papirnih proizvoda.',
    excerptEn: 'Discover how whitelabel manufacturing can transform your business. From brand control to savings - all the benefits of private label paper products.',
    contentHr: `<h2>Što je whitelabel proizvodnja?</h2>
<p>Whitelabel proizvodnja omogućuje vam da prodajete visokokvalitetne papirne proizvode pod vlastitim brendom, bez potrebe za ulaganjem u proizvodnu infrastrukturu.</p>
<h2>Ključne prednosti</h2>
<ul>
<li>Kontrola nad brendom i dizajnom pakiranja</li>
<li>Nema potrebe za ulaganjem u proizvodnju</li>
<li>Fleksibilne minimalne količine</li>
<li>Konzistentna europska kvaliteta</li>
</ul>
<h2>Zaključak</h2>
<p>Whitelabel proizvodnja nudi idealno rješenje za tvrtke koje žele proširiti svoju ponudu bez velikih kapitalnih ulaganja.</p>`,
    contentEn: `<h2>What is Whitelabel Manufacturing?</h2>
<p>Whitelabel manufacturing allows you to sell high-quality paper products under your own brand, without the need to invest in production infrastructure.</p>
<h2>Key Benefits</h2>
<ul>
<li>Control over brand and packaging design</li>
<li>No need to invest in production</li>
<li>Flexible minimum quantities</li>
<li>Consistent European quality</li>
</ul>
<h2>Conclusion</h2>
<p>Whitelabel manufacturing offers an ideal solution for companies looking to expand their offering without large capital investments.</p>`,
    categoryHr: 'Poslovanje',
    categoryEn: 'Business',
    tags: ['whitelabel', 'private-label', 'business', 'manufacturing'],
    author: 'ZOR Professional Team',
    publishedDate: '2025-01-15',
    featured: false,
    readingTime: 5,
    metaDescriptionHr: 'Otkrijte prednosti whitelabel proizvodnje papirnih proizvoda. Kontrola branda, uštede i fleksibilnost.',
    metaDescriptionEn: 'Discover the benefits of whitelabel paper product manufacturing. Brand control, savings, and flexibility.',
    keywords: ['whitelabel', 'private label', 'paper manufacturing', 'business'],
    relatedProducts: ['mini-jumbo-toilet-paper', 'maxi-jumbo-toilet-paper'],
  },
]

// ============================================
// FAQ ITEMS DATA
// ============================================

const faqItems = [
  {
    _type: 'faqItem',
    questionHr: 'Koja je minimalna količina narudžbe?',
    questionEn: 'What is the minimum order quantity?',
    answerHr: 'Fleksibilni smo s veličinama narudžbi. Možemo ispuniti narudžbe od nekoliko kartona (idealno za kafiće i male tvrtke) do punih kamiona za distributere. Kontaktirajte nas za specifične količine.',
    answerEn: 'We are flexible with order sizes. We can fulfill orders from a few cartons (ideal for cafes and small businesses) up to full truckloads for distributors. Contact us for specific quantities.',
    category: 'general',
    order: 1,
  },
  {
    _type: 'faqItem',
    questionHr: 'Nudite li whitelabel / privatnu marku proizvodnje?',
    questionEn: 'Do you offer whitelabel / private label manufacturing?',
    answerHr: 'Da! Whitelabel je jedna od naših ključnih usluga. Možemo proizvesti bilo koji od naših proizvoda pod vašim brendom s prilagođenim pakiranjem. Kontaktirajte nas za razgovor o vašim zahtjevima.',
    answerEn: 'Yes! Whitelabel is one of our core services. We can manufacture any of our products under your brand with custom packaging. Get in touch to discuss your requirements.',
    category: 'whitelabel',
    order: 2,
  },
  {
    _type: 'faqItem',
    questionHr: 'U koje zemlje dostavljate?',
    questionEn: 'Which countries do you deliver to?',
    answerHr: 'Dostavljamo u većinu europskih zemalja. Naš pogon u Zagrebu, Hrvatska, strateški je lociran za učinkovitu europsku logistiku. Kontaktirajte nas za potvrdu dostave na vašu specifičnu lokaciju.',
    answerEn: 'We deliver to most European countries. Our facility in Zagreb, Croatia is centrally located for efficient European logistics. Contact us to confirm delivery to your specific location.',
    category: 'shipping',
    order: 3,
  },
  {
    _type: 'faqItem',
    questionHr: 'Kako funkcionira veleprodajna cijena?',
    questionEn: 'How does bulk pricing work?',
    answerHr: 'Cijene prikazane na našoj web stranici su bazne cijene. Što više naručite, to je bolja cijena. Narudžbe punog kamiona dobivaju najbolje cijene. Zatražite ponudu za svoj specifični volumen da dobijete točnu cijenu.',
    answerEn: 'Prices shown on our website are base rates. The more you order, the better the price. Full truck orders receive the best pricing. Request a quote for your specific volume to get an exact price.',
    category: 'orders',
    order: 4,
  },
  {
    _type: 'faqItem',
    questionHr: 'Koje standarde kvalitete zadovoljavaju vaši proizvodi?',
    questionEn: 'What quality standards do your products meet?',
    answerHr: 'Svi naši proizvodi proizvedeni su prema strogim europskim standardima. Održavamo certifikate kvalitete i koristimo premium sirovine kako bismo osigurali konzistentnu kvalitetu proizvoda.',
    answerEn: 'All our products are manufactured to strict European standards. We maintain quality certifications and use premium raw materials to ensure consistent product quality.',
    category: 'products',
    order: 5,
  },
  {
    _type: 'faqItem',
    questionHr: 'Koje je tipično vrijeme isporuke za narudžbe?',
    questionEn: 'What is the typical lead time for orders?',
    answerHr: 'Standardne narudžbe obično se ispunjavaju unutar 1-2 tjedna. Whitelabel narudžbe s prilagođenim pakiranjem mogu zahtijevati dodatno vrijeme ovisno o složenosti. Dostavit ćemo točne vremenske okvire kada zatražite ponudu.',
    answerEn: 'Standard orders are typically fulfilled within 1-2 weeks. Whitelabel orders with custom packaging may require additional time depending on complexity. We will provide exact timelines when you request a quote.',
    category: 'shipping',
    order: 6,
  },
  {
    _type: 'faqItem',
    questionHr: 'Možete li prilagoditi specifikacije proizvoda?',
    questionEn: 'Can you customize product specifications?',
    answerHr: 'Da, možemo prilagoditi specifikacije proizvoda kao što su broj slojeva, duljina role, veličina lista i pakiranje kako bi zadovoljili vaše specifične zahtjeve. Ovo je dostupno za brendirane i whitelabel narudžbe.',
    answerEn: 'Yes, we can adjust product specifications such as ply count, roll length, sheet size, and packaging to meet your specific requirements. This is available for both branded and whitelabel orders.',
    category: 'products',
    order: 7,
  },
  {
    _type: 'faqItem',
    questionHr: 'Koje uvjete plaćanja nudite?',
    questionEn: 'What payment terms do you offer?',
    answerHr: 'Nudimo fleksibilne uvjete plaćanja za uspostavljene poslovne odnose. Za nove kupce obično počinjemo s avansnim plaćanjem i prelazimo na neto uvjete kako se partnerstvo razvija. Kontaktirajte nas za razgovor.',
    answerEn: 'We offer flexible payment terms for established business relationships. For new customers, we typically start with advance payment and move to net terms as the partnership develops. Contact us to discuss.',
    category: 'orders',
    order: 8,
  },
]

// ============================================
// PRODUCT CONTENT DATA
// ============================================

const productContent = [
  {
    _type: 'productContent',
    shopifyHandle: 'mini-jumbo-toilet-paper',
    priceNoteHr: 'po kutiji od 12 rola',
    priceNoteEn: 'per box of 12 rolls',
    badge: {
      textHr: 'Najprodavanije',
      textEn: 'Best Seller',
      color: 'green',
    },
    features: [
      {
        icon: 'check_circle',
        titleHr: 'Kompaktna veličina',
        titleEn: 'Compact Size',
        descriptionHr: 'Idealno za srednje frekventne toaletne prostore',
        descriptionEn: 'Ideal for medium-traffic washrooms',
      },
      {
        icon: 'eco',
        titleHr: 'Ekološki prihvatljivo',
        titleEn: 'Eco-Friendly',
        descriptionHr: '100% reciklirani materijal dostupan',
        descriptionEn: '100% recycled material available',
      },
      {
        icon: 'savings',
        titleHr: 'Ekonomično',
        titleEn: 'Cost-Effective',
        descriptionHr: 'Smanjuje troškove po uporabi',
        descriptionEn: 'Reduces cost per use',
      },
    ],
    specifications: [
      { labelHr: 'Slojevi', labelEn: 'Layers', value: '2-ply' },
      { labelHr: 'Duljina', labelEn: 'Length', value: '150m' },
      { labelHr: 'Promjer', labelEn: 'Diameter', value: '19cm' },
      { labelHr: 'Rola po kutiji', labelEn: 'Rolls per case', value: '12' },
    ],
    testimonials: [
      {
        name: 'Marko K.',
        company: 'Hotel Esplanade',
        textHr: 'Kvaliteta je izvrsna, gosti su zadovoljni. Preporučujem!',
        textEn: 'Excellent quality, guests are satisfied. Highly recommend!',
        rating: 5,
      },
    ],
    ctaTitleHr: 'Zatražite ponudu',
    ctaTitleEn: 'Request a Quote',
    ctaDescriptionHr: 'Kontaktirajte nas za veleprodajne cijene i prilagođena rješenja.',
    ctaDescriptionEn: 'Contact us for wholesale prices and customized solutions.',
  },
  {
    _type: 'productContent',
    shopifyHandle: 'maxi-jumbo-toilet-paper',
    priceNoteHr: 'po kutiji od 6 rola',
    priceNoteEn: 'per box of 6 rolls',
    badge: {
      textHr: 'Veliki kapacitet',
      textEn: 'High Capacity',
      color: 'blue',
    },
    features: [
      {
        icon: 'all_inclusive',
        titleHr: 'Veći kapacitet',
        titleEn: 'Larger Capacity',
        descriptionHr: 'Manje zamjena, više učinkovitosti',
        descriptionEn: 'Fewer changes, more efficiency',
      },
    ],
    specifications: [
      { labelHr: 'Slojevi', labelEn: 'Layers', value: '2-ply' },
      { labelHr: 'Duljina', labelEn: 'Length', value: '300m' },
      { labelHr: 'Promjer', labelEn: 'Diameter', value: '26cm' },
    ],
  },
  {
    _type: 'productContent',
    shopifyHandle: 'z-fold-towels-standard',
    priceNoteHr: 'po kutiji od 20 paketa',
    priceNoteEn: 'per box of 20 packs',
    features: [
      {
        icon: 'health_and_safety',
        titleHr: 'Higijensko izvlačenje',
        titleEn: 'Hygienic Dispensing',
        descriptionHr: 'Jedan ručnik istovremeno',
        descriptionEn: 'One towel at a time',
      },
    ],
    specifications: [
      { labelHr: 'Slojevi', labelEn: 'Layers', value: '2-ply' },
      { labelHr: 'Dimenzije', labelEn: 'Dimensions', value: '23x23cm' },
      { labelHr: 'Listova po paketu', labelEn: 'Sheets per pack', value: '200' },
    ],
  },
]

// ============================================
// SITE SETTINGS DATA
// ============================================

const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  heroTaglineHr: 'Premium proizvodnja papira',
  heroTaglineEn: 'Premium Paper Manufacturing',
  heroTitleHr: 'Profesionalna rješenja za papir za svaku skalu',
  heroTitleEn: 'Professional Paper Solutions for Every Scale',
  heroSubtitleHr: 'Proizvođač toaletnog papira, papirnatih ručnika i presavijenih rješenja sa sjedištem u Zagrebu. Direktno iz tvornice do vašeg poslovanja — bez posrednika, najbolje cijene.',
  heroSubtitleEn: 'Zagreb-based manufacturer of toilet paper, paper towels, and folded solutions. Direct from factory to your business — no middlemen, best prices.',
  stats: [
    { value: '15+', labelHr: 'Europskih zemalja', labelEn: 'European Countries' },
    { value: '30+', labelHr: 'Varijanti proizvoda', labelEn: 'Product Variants' },
    { value: '500+', labelHr: 'Tona/mjesečno kapacitet', labelEn: 'Tons/Month Capacity' },
    { value: '200+', labelHr: 'Aktivnih klijenata', labelEn: 'Active Clients' },
  ],
  contactEmail: 'info@zorprofessional.com',
  contactPhone: '+385 1 234 5678',
  contactAddress: 'Zagreb, Croatia',
  businessHoursHr: 'Pon - Pet: 8:00 - 16:00 CET',
  businessHoursEn: 'Mon - Fri: 8:00 - 16:00 CET',
}

// ============================================
// MIGRATION FUNCTIONS
// ============================================

async function migrateAll() {
  console.log('Starting migration to Sanity CMS...\n')

  // Check for token
  if (!process.env.SANITY_TOKEN) {
    console.error('ERROR: SANITY_TOKEN environment variable is required.')
    console.log('\nTo create a token:')
    console.log('1. Go to https://sanity.io/manage')
    console.log('2. Select your project (zor-cms)')
    console.log('3. Go to API > Tokens')
    console.log('4. Create a new token with "Editor" permissions')
    console.log('5. Run: SANITY_TOKEN=your_token npx tsx migrate.ts')
    process.exit(1)
  }

  try {
    // Migrate Blog Posts
    console.log('📝 Migrating Blog Posts...')
    for (const post of blogPosts) {
      const result = await client.createOrReplace({
        _id: `blogPost-${post.slug.current}`,
        ...post,
      })
      console.log(`  ✓ ${post.titleEn}`)
    }
    console.log(`  Done! ${blogPosts.length} blog posts migrated.\n`)

    // Migrate FAQ Items
    console.log('❓ Migrating FAQ Items...')
    for (let i = 0; i < faqItems.length; i++) {
      const item = faqItems[i]
      const result = await client.createOrReplace({
        _id: `faqItem-${i + 1}`,
        ...item,
      })
      console.log(`  ✓ ${item.questionEn.substring(0, 50)}...`)
    }
    console.log(`  Done! ${faqItems.length} FAQ items migrated.\n`)

    // Migrate Product Content
    console.log('📦 Migrating Product Content...')
    for (const content of productContent) {
      const result = await client.createOrReplace({
        _id: `productContent-${content.shopifyHandle}`,
        ...content,
      })
      console.log(`  ✓ ${content.shopifyHandle}`)
    }
    console.log(`  Done! ${productContent.length} product contents migrated.\n`)

    // Migrate Site Settings
    console.log('⚙️ Migrating Site Settings...')
    await client.createOrReplace(siteSettings)
    console.log('  ✓ Site settings migrated.\n')

    console.log('✅ Migration complete!')
    console.log('\nYou can now:')
    console.log('1. Open Sanity Studio: cd sanity && npm run dev')
    console.log('2. View your content at http://localhost:3333')

  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateAll()
