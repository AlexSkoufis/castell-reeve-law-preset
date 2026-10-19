// ─────────────────────────────────────────────────────────────────────────────
//  PRESET CONFIG — Castell & Reeve, a FICTIONAL law & advisory firm.
//  All names, figures, matters, bar admissions and quotes are demo content.
//  Nothing here is legal advice or real regulatory information.
//  Photos: assets-src/<key>.jpg → `npm run images` → reference by key below.
// ─────────────────────────────────────────────────────────────────────────────

export type ImageKey =
  | 'hero' | 'library' | 'candle' | 'signing' | 'penink' | 'nib' | 'ink'
  | 'dusk' | 'office' | 'studio' | 'athens' | 'reader' | 'profile';

export const firm = {
  name: 'Castell & Reeve',
  short: 'C&R',
  line: 'Legal & Advisory',
  founded: 1998,
  email: 'counsel@castellreeve.example',
  phone: '+44 20 0000 0000',
  phoneHref: 'tel:+442000000000',
  offices: [
    { city: 'London', address: '14 Fenwick Court, EC4A 1AA', tz: 'Europe/London' },
    { city: 'Athens', address: 'Vasilissis Sofias 42, 106 76', tz: 'Europe/Athens' },
    { city: 'Nicosia', address: 'Makariou Avenue 9, 1065', tz: 'Asia/Nicosia' },
  ],
  credit: { label: 'Core Concepts Design', href: 'https://coreconcepts.design' },
  disclaimer:
    'Castell & Reeve is a fictional firm created as a design concept. Nothing on this page is legal advice; names, matters, figures and regulatory details are illustrative placeholders.',
};

export const nav = [
  { label: 'Practice', href: '#practice' },
  { label: 'Record', href: '#record' },
  { label: 'People', href: '#people' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#consult' },
];

export const hero = {
  kicker: 'Legal & Advisory · London · Athens · Nicosia',
  title: ['Counsel for the', 'moments that matter.'],
  lede: 'Corporate, disputes and private-client work for founders, families and boards — handled by partners, not passed down.',
  cta: 'Book a consultation',
  signature: 'Castell & Reeve',
  seal: 'CASTELL & REEVE · LEGAL & ADVISORY · EST. 1998 · ',
};

// Statement with redactions: [brackets] are redacted, then revealed on scroll.
export const statement =
  'We read the fine print so our clients never have to. For [twenty-seven years] we have advised [founders, families and boards] through [acquisitions, disputes and difficult decisions] — [quietly], [precisely], and always [on the record].';

export const practice = [
  {
    code: 'CR-01',
    name: 'Corporate & M&A',
    summary: 'Acquisitions, disposals, joint ventures and investment rounds — from term sheet to completion, across three jurisdictions.',
    matters: ['Cross-border acquisitions', 'Private equity & venture rounds', 'Shareholder agreements', 'Corporate restructuring'],
    lead: 'Helena Castell',
    image: 'signing' as ImageKey,
  },
  {
    code: 'CR-02',
    name: 'Disputes & Arbitration',
    summary: 'Commercial litigation and international arbitration, with an honest view of the odds from the first meeting.',
    matters: ['Commercial litigation', 'ICC & LCIA arbitration', 'Shareholder disputes', 'Injunctions & urgent relief'],
    lead: 'Daniel Reeve',
    image: 'dusk' as ImageKey,
  },
  {
    code: 'CR-03',
    name: 'Private Client',
    summary: 'Wealth structuring, succession and family governance for families who think in generations.',
    matters: ['Trusts & foundations', 'Succession planning', 'Family governance', 'Residency & relocation'],
    lead: 'Sofia Marlowe',
    image: 'nib' as ImageKey,
  },
  {
    code: 'CR-04',
    name: 'Employment',
    summary: 'Senior hires, exits and workplace investigations — handled discreetly and fast.',
    matters: ['Executive contracts & exits', 'Internal investigations', 'Restrictive covenants', 'Workforce restructuring'],
    lead: 'Nikos Adamou',
    image: 'office' as ImageKey,
  },
  {
    code: 'CR-05',
    name: 'Regulatory & Compliance',
    summary: 'Licensing, AML frameworks and regulator engagement for financial services and technology businesses.',
    matters: ['Financial services licensing', 'AML & sanctions', 'Data protection (GDPR)', 'Regulator investigations'],
    lead: 'Helena Castell',
    image: 'library' as ImageKey,
  },
  {
    code: 'CR-06',
    name: 'Intellectual Property',
    summary: 'Brands, technology and creative work — registered, licensed and defended.',
    matters: ['Trade marks & designs', 'Technology licensing', 'IP due diligence', 'Infringement actions'],
    lead: 'Daniel Reeve',
    image: 'ink' as ImageKey,
  },
];

export const record = {
  stats: [
    { value: 4.2, decimals: 1, prefix: '€', suffix: 'bn', label: 'Transactions advised since 2015' },
    { value: 96, decimals: 0, prefix: '', suffix: '%', label: 'Disputes resolved before final hearing' },
    { value: 27, decimals: 0, prefix: '', suffix: '', label: 'Years in practice' },
    { value: 11, decimals: 0, prefix: '', suffix: '', label: 'Languages spoken by our lawyers' },
  ],
  matters: [
    { year: '2025', text: 'Advised a family office on a €180m cross-border acquisition of a logistics group.', area: 'Corporate' },
    { year: '2025', text: 'Secured an emergency injunction protecting a founder’s shareholding within 48 hours.', area: 'Disputes' },
    { year: '2024', text: 'Structured a three-generation succession plan across the UK, Greece and Cyprus.', area: 'Private client' },
    { year: '2024', text: 'Obtained an e-money licence for a payments start-up in eleven weeks.', area: 'Regulatory' },
    { year: '2023', text: 'Won an ICC arbitration worth €64m for a shipping client.', area: 'Arbitration' },
  ],
};

export const people = {
  intro: 'Every matter is led by a partner who stays on it — from the first call to the last signature.',
  partners: [
    { initials: 'HC', name: 'Helena Castell', role: 'Founding Partner', focus: 'Corporate · Regulatory', bars: 'England & Wales · Greece', langs: 'EN · EL · FR' },
    { initials: 'DR', name: 'Daniel Reeve', role: 'Managing Partner', focus: 'Disputes · IP', bars: 'England & Wales', langs: 'EN · DE' },
    { initials: 'SM', name: 'Sofia Marlowe', role: 'Partner', focus: 'Private client', bars: 'England & Wales · Cyprus', langs: 'EN · EL · IT' },
    { initials: 'NA', name: 'Nikos Adamou', role: 'Partner', focus: 'Employment', bars: 'Greece · Cyprus', langs: 'EL · EN' },
  ],
};

export const consult = {
  label: 'Consultation',
  title: 'Tell us what’s at stake.',
  text: 'A first conversation is confidential and without obligation. Choose a topic, how urgent it is, and a time that suits you.',
  matters: ['Corporate & M&A', 'Disputes & Arbitration', 'Private Client', 'Employment', 'Regulatory & Compliance', 'Intellectual Property'],
  urgency: [
    { id: 'routine', label: 'Planning ahead', note: 'We’ll prepare a short brief before we meet.' },
    { id: 'soon', label: 'Within weeks', note: 'A partner will review your note before the call.' },
    { id: 'urgent', label: 'Urgent', note: 'For deadlines or court dates — we aim to call back within 2 hours.' },
  ],
  slots: ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'],
  thanks: 'Thank you — this is a demo, so nothing was sent. On a real site a partner’s assistant would confirm by email.',
};

export const insights = [
  { date: 'Sep 2026', tag: 'Corporate', title: 'Earn-outs after the downturn: what buyers are asking for now', read: '6 min', image: 'signing' as ImageKey },
  { date: 'Aug 2026', tag: 'Private client', title: 'Moving to Greece or Cyprus? The succession questions to ask first', read: '8 min', image: 'athens' as ImageKey },
  { date: 'Jul 2026', tag: 'Disputes', title: 'Emergency arbitrators: faster than court, if you draft for them', read: '5 min', image: 'candle' as ImageKey },
];

export const faq = [
  { q: 'How much does a first consultation cost?', a: 'The first 30-minute conversation is free and confidential. If we can help, we’ll confirm scope and a fee estimate in writing before any work begins.' },
  { q: 'Do you work on fixed fees?', a: 'Often. Most transactional and advisory work can be fixed or capped; disputes are usually staged budgets agreed in advance.' },
  { q: 'Which jurisdictions do you cover?', a: 'We advise directly on English, Greek and Cypriot law, and coordinate trusted local counsel elsewhere.' },
  { q: 'Will a partner really handle my matter?', a: 'Yes. A named partner leads every matter and stays responsible for it; associates support, they don’t replace.' },
];
