import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin, Clock, Star, ShoppingBag, User, Search, Heart, ChevronLeft,
  Check, Phone, Bell, Leaf, TrendingUp, Award, ChevronRight, X, Plus, Minus,
  Navigation, Filter, Sparkles, Store, Calendar, Wallet, Tag, Gift, ShieldCheck,
  Home as HomeIcon, Map as MapIcon, Share2
} from 'lucide-react';

/* ============================================================================
   SisaKu — Selamatkan Sisa, Nikmati Lebih
   Indonesia's premium food-rescue marketplace.
   Aesthetic: luxury patisserie — espresso brown, antique gold, warm cream,
   editorial serif display (Fraunces) + clean body (Jost) + accent (Cormorant).
   Single coherent design system. Built mobile-first inside a phone shell.
   ============================================================================ */

/* ---------- DESIGN TOKENS ---------- */
const C = {
  espresso: '#0f0d0b',   // near-black warm — darkest surfaces
  cocoa: '#1c1814',      // ink — primary text & dark chrome
  coffee: '#2b241e',     // dark surface 2 (gradients)
  mocha: '#57504a',      // secondary text
  caramel: '#8b6548',    // warm brand accent
  latte: '#8e8780',      // tertiary text
  sand: '#d6d1c9',       // quaternary / soft borders
  cream: '#f7f6f3',      // app background (warm white)
  parchment: '#ece9e4',  // hairlines & subtle fills
  gold: '#bd9b3f',       // brand gold (deepened for contrast)
  goldLight: '#e8cc74',  // gold highlight
  sage: '#3e7c53',       // success green
  danger: '#d14a3f',     // destructive red
};

/* ---------- GLOBAL CSS ---------- */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .sk-root, .sk-root * { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Inter', system-ui, sans-serif; -webkit-font-smoothing: antialiased; box-sizing: border-box; margin: 0; padding: 0; }
  .sk-display { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif; letter-spacing: -0.02em; }
  .sk-serif { font-family: 'New York', 'Iowan Old Style', ui-serif, Georgia, serif; }
  .sk-input { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif; }

  @keyframes skFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes skFade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes skScaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  @keyframes skShimmer { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  @keyframes skPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  @keyframes skSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
  @keyframes skPop { 0% { transform: scale(0.4); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
  @keyframes skFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes skBar { from { width: 0; } }
  @keyframes skSpin { to { transform: rotate(360deg); } }

  .sk-fadeup { animation: skFadeUp 0.55s cubic-bezier(0.32,0.72,0,1) both; }
  .sk-fade { animation: skFade 0.4s cubic-bezier(0.32,0.72,0,1) both; }
  .sk-scalein { animation: skScaleIn 0.45s cubic-bezier(0.32,0.72,0,1) both; }
  .sk-slideup { animation: skSlideUp 0.45s cubic-bezier(0.32,0.72,0,1) both; }
  .sk-pop { animation: skPop 0.5s cubic-bezier(0.34,1.2,0.64,1) both; }
  .sk-float { animation: skFloat 3.5s ease-in-out infinite; }

  /* ---- Liquid Glass materials ---- */
  .sk-glass {
    background: rgba(255,255,255,0.55);
    backdrop-filter: blur(28px) saturate(180%);
    -webkit-backdrop-filter: blur(28px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.65);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 0 10px 30px rgba(28,23,18,0.07);
  }
  .sk-glass-strong {
    background: rgba(255,255,255,0.74);
    backdrop-filter: blur(34px) saturate(180%);
    -webkit-backdrop-filter: blur(34px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.8);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.85), 0 18px 48px rgba(28,23,18,0.13);
  }
  .sk-glass-dark {
    background: rgba(22,18,15,0.6);
    backdrop-filter: blur(28px) saturate(160%);
    -webkit-backdrop-filter: blur(28px) saturate(160%);
    border: 1px solid rgba(255,255,255,0.14);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 14px 36px rgba(0,0,0,0.35);
  }

  .sk-gold-text {
    background: linear-gradient(110deg, #a8852e, #e8cc74, #a8852e);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
  .sk-grain::after {
    content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0.22; mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
  }
  .sk-noscroll::-webkit-scrollbar { display: none; }
  .sk-noscroll { -ms-overflow-style: none; scrollbar-width: none; }
  .sk-safe-top { padding-top: env(safe-area-inset-top, 0px); }
  .sk-safe-bottom { padding-bottom: env(safe-area-inset-bottom, 0px); }
  .sk-press { transition: transform 0.22s cubic-bezier(0.32,0.72,0,1), opacity 0.22s ease; }
  .sk-press:active { transform: scale(0.96); opacity: 0.85; }
  .sk-card { transition: transform 0.3s cubic-bezier(0.32,0.72,0,1), box-shadow 0.3s ease; }
  .sk-card:active { transform: scale(0.98); }
`;

/* ---------- DATA ---------- */
const BAGS = [
  {
    id: 1, merchant: 'Sourdough Project', type: 'Artisan Bakery', emoji: '\u{1F956}',
    hue1: '#e8c9a0', hue2: '#c9985f', original: 95000, price: 38000, discount: 60,
    category: 'Bakery', distance: 0.6, rating: 4.9, reviews: 312, lat: 32, lng: 38,
    windowLabel: '6:00 – 8:00 PM', pickupEnd: 20, left: 4, area: 'Kemang',
    contents: 'A rotating mix of sourdough loaves, baguettes & morning pastries',
    dietary: ['Vegetarian'],
    blurb: 'A neighbourhood bakery obsessed with slow fermentation. Every loaf rests 48 hours.',
    geo: [-6.2607, 106.8123],
    revs: [ { n: 'Cherie W.', s: 5, t: 'Got 3 sourdough loaves + croissants for Rp 38k. Unreal value.' }, { n: 'Andre P.', s: 5, t: 'Still warm at pickup. Will be back every week.' } ],
  },
  {
    id: 2, merchant: 'Tous Les Jours', type: 'French Patisserie', emoji: '\u{1F370}',
    hue1: '#f3d4d9', hue2: '#d99aa6', original: 120000, price: 45000, discount: 62,
    category: 'Patisserie', distance: 1.2, rating: 4.8, reviews: 189, lat: 58, lng: 60,
    windowLabel: '6:30 – 8:30 PM', pickupEnd: 20.5, left: 3, area: 'Senopati',
    contents: '3–5 cakes, tarts & delicate pastries from today\u2019s case',
    dietary: ['Vegetarian'],
    blurb: 'Korean-French bakery beloved for its glossy cakes and buttery croissants.',
    geo: [-6.2376, 106.8106],
    revs: [ { n: 'Maya S.', s: 5, t: 'A whole cake + tarts for 45k. Felt like stealing.' }, { n: 'Rizki H.', s: 4, t: 'Great haul, just go early — sells out fast.' } ],
  },
  {
    id: 3, merchant: 'Anomali Coffee', type: 'Specialty Café', emoji: '\u2615',
    hue1: '#d7c3a8', hue2: '#a07d52', original: 85000, price: 32000, discount: 62,
    category: 'Café', distance: 1.5, rating: 4.7, reviews: 456, lat: 44, lng: 72,
    windowLabel: '7:00 – 9:00 PM', pickupEnd: 21, left: 8, area: 'Senopati',
    contents: 'Sandwiches, banana bread & single-origin pastry selection',
    dietary: ['Vegetarian', 'Halal'],
    blurb: 'Indonesia\u2019s pioneer of single-origin coffee, sourcing beans across the archipelago.',
    geo: [-6.2298, 106.8138],
    revs: [ { n: 'Dimas A.', s: 5, t: 'Sandwiches + banana bread, all fresh. Coffee shop quality.' }, { n: 'Putri L.', s: 5, t: 'My go-to after work. Saves money and food.' } ],
  },
  {
    id: 4, merchant: 'Paul Boulangerie', type: 'Boulangerie', emoji: '\u{1F950}',
    hue1: '#e3cfa6', hue2: '#bf9a55', original: 110000, price: 42000, discount: 62,
    category: 'Bakery', distance: 2.1, rating: 4.8, reviews: 167, lat: 70, lng: 30,
    windowLabel: '5:30 – 7:30 PM', pickupEnd: 19.5, left: 2, area: 'SCBD',
    contents: 'Assorted artisan breads, viennoiserie & quiche',
    dietary: [],
    blurb: 'A Parisian house since 1889. Croissants laminated with French butter.',
    geo: [-6.2241, 106.8094],
    revs: [ { n: 'Sarah T.', s: 5, t: 'Quiche + viennoiserie for 42k. Paul quality at a steal.' }, { n: 'Yoga W.', s: 4, t: 'Only 2 bags a night so set a reminder.' } ],
  },
  {
    id: 5, merchant: 'Kopi Kenangan', type: 'Coffee Chain', emoji: '\u{1F9C1}',
    hue1: '#e7d2b8', hue2: '#b08d5c', original: 70000, price: 28000, discount: 60,
    category: 'Café', distance: 0.9, rating: 4.6, reviews: 521, lat: 26, lng: 56,
    windowLabel: '7:30 – 9:30 PM', pickupEnd: 21.5, left: 6, area: 'Kemang',
    contents: 'Pastry box: croffles, muffins & cookies',
    dietary: ['Halal'],
    blurb: 'Indonesia\u2019s home-grown coffee unicorn with a cult following for its gula aren latte.',
    geo: [-6.2649, 106.8101],
    revs: [ { n: 'Bintang R.', s: 4, t: 'Croffles and cookies, solid box for 28k.' }, { n: 'Nadia K.', s: 5, t: 'Cheapest bag nearby and always available.' } ],
  },
  {
    id: 6, merchant: 'Union Bakehouse', type: 'Dessert Atelier', emoji: '\u{1F369}',
    hue1: '#f0d9bd', hue2: '#caa063', original: 135000, price: 52000, discount: 61,
    category: 'Patisserie', distance: 2.6, rating: 4.9, reviews: 278, lat: 64, lng: 18,
    windowLabel: '6:00 – 8:00 PM', pickupEnd: 20, left: 3, area: 'Menteng',
    contents: 'Signature red velvet, doughnuts & seasonal tarts',
    dietary: ['Vegetarian'],
    blurb: 'Jakarta\u2019s most photographed dessert spot, known for towering layer cakes.',
    geo: [-6.1957, 106.8323],
    revs: [ { n: 'Olivia M.', s: 5, t: 'Red velvet + doughnuts for 52k. Instagram-worthy and cheap.' }, { n: 'Farhan D.', s: 5, t: 'Premium desserts at half price, what is not to love.' } ],
  },
  {
    id: 7, merchant: 'Eric Kayser', type: 'French Boulangerie', emoji: '\u{1F950}',
    hue1: '#ecd4ad', hue2: '#c79a5b', original: 110000, price: 42000, discount: 62,
    category: 'Bakery', distance: 0.9, rating: 4.8, reviews: 241, lat: 22, lng: 54,
    windowLabel: '7:00 – 9:00 PM', pickupEnd: 21, left: 5, area: 'PIK',
    contents: 'Levain breads, viennoiserie & a savoury tart from the day\u2019s bake',
    dietary: ['Vegetarian'],
    blurb: 'Maison Kayser\u2019s Jakarta outpost — naturally leavened breads and proper croissants.',
    geo: [-6.1089, 106.7385],
    revs: [ { n: 'Vincent L.', s: 5, t: 'Two baguettes, pain au chocolat and a quiche for 42k. Insane.' }, { n: 'Tiara N.', s: 4, t: 'Bread was fantastic next morning toasted.' } ],
  },
  {
    id: 8, merchant: 'Common Grounds', type: 'Specialty Café', emoji: '\u{1F95B}',
    hue1: '#d9c5ab', hue2: '#9c7a4f', original: 78000, price: 30000, discount: 62,
    category: 'Café', distance: 1.8, rating: 4.6, reviews: 198, lat: 50, lng: 30,
    windowLabel: '5:30 – 7:30 PM', pickupEnd: 19.5, left: 6, area: 'SCBD',
    contents: 'Sandwiches, cold-pressed juice & a slice of cake',
    dietary: ['Vegetarian'],
    blurb: 'A SCBD favourite for flat whites and a tight all-day brunch menu.',
    geo: [-6.2247, 106.8090],
    revs: [ { n: 'Reza F.', s: 5, t: 'Sandwich + juice + cake, easily worth triple.' }, { n: 'Aldi S.', s: 4, t: 'Perfect grab on the way home from the office.' } ],
  },
  {
    id: 9, merchant: 'Beau by Talita', type: 'Patisserie & Bakery', emoji: '\u{1F950}',
    hue1: '#f1d9c4', hue2: '#cb9f6e', original: 128000, price: 48000, discount: 62,
    category: 'Patisserie', distance: 2.1, rating: 4.9, reviews: 167, lat: 70, lng: 46,
    windowLabel: '6:00 – 8:00 PM', pickupEnd: 20, left: 2, area: 'Gandaria',
    contents: 'Croissants, kouign-amann & a patisserie selection by Chef Talita',
    dietary: ['Vegetarian'],
    blurb: 'Chef Talita Setyadi\u2019s celebrated bakehouse — precise French technique, local flavour.',
    geo: [-6.2436, 106.7836],
    revs: [ { n: 'Gabriella P.', s: 5, t: 'Kouign-amann alone is worth it. Got a whole box for 48k.' }, { n: 'Daniel W.', s: 5, t: 'Best lamination in the city, and half price here.' } ],
  },
  {
    id: 10, merchant: 'Kintan Buffet', type: 'Restaurant', emoji: '\u{1F371}',
    hue1: '#e3c4a0', hue2: '#b07e4d', original: 150000, price: 55000, discount: 63,
    category: 'Restaurant', distance: 3.0, rating: 4.5, reviews: 134, lat: 38, lng: 14,
    windowLabel: '9:00 – 10:00 PM', pickupEnd: 22, left: 4, area: 'Kelapa Gading',
    contents: 'End-of-service bento of grilled meats, rice & sides',
    dietary: [],
    blurb: 'Japanese yakiniku house packing untouched end-of-night portions into hearty bentos.',
    geo: [-6.1588, 106.9056],
    revs: [ { n: 'Hendra K.', s: 4, t: 'Huge bento, still warm. Dinner sorted for 55k.' }, { n: 'Sline T.', s: 5, t: 'So much meat. Came back the next night.' } ],
  },
  {
    id: 11, merchant: 'Ranch Market', type: 'Grocery & Deli', emoji: '\u{1F96F}',
    hue1: '#dcc8a6', hue2: '#a3825a', original: 90000, price: 35000, discount: 61,
    category: 'Grocery', distance: 1.4, rating: 4.4, reviews: 221, lat: 16, lng: 24,
    windowLabel: '8:00 – 9:30 PM', pickupEnd: 21.5, left: 9, area: 'PIK',
    contents: 'A surprise box of bakery items, deli foods & near-date pantry picks',
    dietary: [],
    blurb: 'Premium supermarket rescuing its deli counter and in-store bakery before close.',
    geo: [-6.1102, 106.7402],
    revs: [ { n: 'Michelle A.', s: 4, t: 'Loaded with deli stuff and fresh bread. Great deal.' }, { n: 'Bryan H.', s: 4, t: 'Variety is wild for 35k — never know what you get.' } ],
  },
  {
    id: 12, merchant: 'Monolog Coffee', type: 'Specialty Café', emoji: '\u2615',
    hue1: '#d5c0a3', hue2: '#94714a', original: 82000, price: 31000, discount: 62,
    category: 'Café', distance: 2.4, rating: 4.7, reviews: 309, lat: 56, lng: 84,
    windowLabel: '6:30 – 8:30 PM', pickupEnd: 20.5, left: 5, area: 'SCBD',
    contents: 'Pastries, a sandwich & signature bottled cold brew',
    dietary: ['Vegetarian'],
    blurb: 'Sleek SCBD roastery known for competition-grade espresso and minimalist interiors.',
    geo: [-6.2271, 106.8011],
    revs: [ { n: 'Kevin S.', s: 5, t: 'Cold brew + pastries, premium quality for 31k.' }, { n: 'Anya R.', s: 5, t: 'My favourite rescue — consistently great.' } ],
  },
];

const CATEGORIES = ['All', 'Bakery', 'Patisserie', 'Café', 'Restaurant', 'Grocery'];

const PAYMENTS = [
  { id: 'gopay', name: 'GoPay', emoji: '\u{1F7E2}', balance: 'Rp 250.000' },
  { id: 'ovo', name: 'OVO', emoji: '\u{1F7E3}', balance: 'Rp 180.000' },
  { id: 'dana', name: 'DANA', emoji: '\u{1F535}', balance: 'Rp 92.000' },
  { id: 'card', name: 'Credit / Debit Card', emoji: '\u{1F4B3}', balance: '•••• 4821' },
];

const PROMOS = {
  FIRST10: { type: 'pct', value: 0.10, label: '10% off your first rescue' },
  SISAKU20: { type: 'pct', value: 0.20, label: '20% off — welcome week' },
  HEMAT5K: { type: 'flat', value: 5000, label: 'Rp 5.000 off' },
};

/* ---------- PURE HELPERS ---------- */
const idr = (n) => 'Rp\u202f' + new Intl.NumberFormat('id-ID').format(Math.round(n));

// Bulletproof persistence — silently no-ops where storage is unavailable
// (e.g. in-app preview sandboxes). Works in deployed builds.
const store = {
  get(key, fallback) {
    try {
      const raw = window.localStorage.getItem('sisaku:' + key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
  },
  set(key, value) {
    try { window.localStorage.setItem('sisaku:' + key, JSON.stringify(value)); } catch {}
  },
};

/* ---------- MODULE-LEVEL PRIMITIVES ---------- */

// Decorative bag "photo": layered gradient + floating emoji
const BagImage = ({ bag, h = 200, rounded = 0, showEmoji = true }) => (
  <div className="sk-grain" style={{
    position: 'relative', height: h, borderRadius: rounded, overflow: 'hidden',
    background: `radial-gradient(120% 100% at 30% 20%, ${bag.hue1} 0%, ${bag.hue2} 70%, ${C.mocha} 130%)`,
  }}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(28,23,18,0.5) 100%)' }} />
    {showEmoji && (
      <div className="sk-float" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: h * 0.4, filter: 'drop-shadow(0 8px 16px rgba(28,23,18,0.35))' }}>
        {bag.emoji}
      </div>
    )}
  </div>
);

// Gold hairline divider with center diamond
const Divider = ({ my = 16 }) => (
  <div style={{ height: 1, background: 'rgba(28,24,20,0.07)', margin: `${my}px 0` }} />
);

const Pill = ({ children, bg, color, style }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 600,
    letterSpacing: '-0.005em', padding: '5px 11px', borderRadius: 999,
    background: bg, color, ...style,
  }}>{children}</span>
);

const StatusBadge = ({ status }) => {
  const map = {
    confirmed: { t: 'Confirmed', bg: 'rgba(62,124,83,0.15)', c: C.sage, dot: C.sage, pulse: false },
    ready: { t: 'Ready for pickup', bg: 'rgba(189,155,63,0.18)', c: '#9c7a1f', dot: C.gold, pulse: true },
    completed: { t: 'Completed', bg: 'rgba(109,76,61,0.12)', c: C.mocha, dot: C.mocha, pulse: false },
    cancelled: { t: 'Cancelled', bg: 'rgba(209,74,63,0.12)', c: C.danger, dot: C.danger, pulse: false },
  };
  const s = map[status] || map.confirmed;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: s.bg, color: s.c, whiteSpace: 'nowrap' }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: s.dot, animation: s.pulse ? 'skPulse 1.6s infinite' : 'none' }} />
      {s.t}
    </span>
  );
};

const TopBar = ({ title, onBack, right }) => (
  <div className="sk-glass-strong" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '52px 16px 14px', borderBottom: 'none', position: 'relative', zIndex: 5, borderRadius: 0 }}>
    <button onClick={onBack} className="sk-press" style={{ width: 36, height: 36, borderRadius: 999, border: 'none', background: 'rgba(120,120,128,0.12)', display: 'grid', placeItems: 'center', cursor: 'pointer', color: C.cocoa }}>
      <ChevronLeft size={21} />
    </button>
    <div className="sk-display" style={{ flex: 1, fontSize: 17, fontWeight: 700, color: C.cocoa, letterSpacing: '-0.02em' }}>{title}</div>
    {right}
  </div>
);

const CTA = ({ children, onClick, disabled, icon }) => (
  <button onClick={onClick} disabled={disabled} className="sk-press" style={{
    width: '100%', padding: '15px 16px', borderRadius: 16, border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    background: disabled ? 'rgba(120,120,128,0.18)' : `linear-gradient(180deg, ${C.coffee}, ${C.cocoa})`,
    color: disabled ? C.latte : C.cream, fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
    boxShadow: disabled ? 'none' : 'inset 0 1px 0 rgba(255,255,255,0.12), 0 8px 22px rgba(28,23,18,0.28)', opacity: 1,
  }}>
    {icon}{children}
  </button>
);

const Row = ({ label, value, bold, green }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0' }}>
    <span style={{ fontSize: bold ? 15 : 13.5, fontWeight: bold ? 700 : 400, color: bold ? C.cocoa : C.latte }}>{label}</span>
    <span className={bold ? 'sk-display' : ''} style={{ fontSize: bold ? 18 : 13.5, fontWeight: bold ? 700 : 500, color: green ? C.sage : C.cocoa }}>{value}</span>
  </div>
);

const TicketRow = ({ icon, label, value }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
    {icon}
    <span style={{ fontSize: 12.5, color: C.latte, width: 100, flexShrink: 0 }}>{label}</span>
    <span style={{ fontSize: 13, fontWeight: 600, color: C.cocoa, flex: 1, textAlign: 'right' }}>{value}</span>
  </div>
);

// Deterministic decorative QR (illustrative, not scannable)
const FauxQR = ({ seed }) => {
  const n = 11;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const isFinder = (r, c) => {
    const box = (br, bc) => r >= br && r < br + 3 && c >= bc && c < bc + 3;
    return box(0, 0) || box(0, n - 3) || box(n - 3, 0);
  };
  const dataOn = (r, c) => {
    const v = Math.sin((r + 1) * 12.9898 + (c + 1) * 78.233 + (h % 97)) * 43758.5453;
    return v - Math.floor(v) > 0.5;
  };
  return (
    <div style={{ padding: 8, background: '#fff', borderRadius: 12, border: `1px solid ${C.parchment}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${n}, 9px)`, gridAutoRows: 9 }}>
        {Array.from({ length: n * n }).map((_, i) => {
          const r = Math.floor(i / n), c = i % n;
          const dark = isFinder(r, c) ? true : dataOn(r, c);
          return <div key={i} style={{ width: 9, height: 9, background: dark ? C.espresso : 'transparent' }} />;
        })}
      </div>
    </div>
  );
};

// Stylised map canvas (shared by MiniMap + full Map)
const MapCanvas = () => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
    <defs>
      <linearGradient id="skmapbg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f0e7d8" />
        <stop offset="100%" stopColor="#e3d4bd" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" fill="url(#skmapbg)" />
    <g stroke="#d8c6a8" strokeWidth="2.4" fill="none" strokeLinecap="round">
      <path d="M-5 30 L 105 38" /><path d="M-5 68 L 105 60" />
      <path d="M22 -5 L 30 105" /><path d="M70 -5 L 64 105" />
    </g>
    <g stroke="#e8dcc6" strokeWidth="1" fill="none">
      <path d="M-5 48 L 105 50" /><path d="M46 -5 L 48 105" />
    </g>
    <rect x="6" y="44" width="12" height="18" rx="2" fill="#cdd6bd" opacity="0.7" />
    <rect x="78" y="66" width="14" height="16" rx="2" fill="#cdd6bd" opacity="0.7" />
    <circle cx="48" cy="50" r="3.4" fill="#3b6ea5" />
    <circle cx="48" cy="50" r="3.4" fill="none" stroke="#3b6ea5" strokeWidth="0.8" opacity="0.5">
      <animate attributeName="r" from="3.4" to="9" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const MiniMap = ({ focus }) => (
  <div style={{ position: 'absolute', inset: 0 }}>
    <MapCanvas />
    <div style={{ position: 'absolute', left: `${focus.lng}%`, top: `${focus.lat}%`, transform: 'translate(-50%,-100%)' }}>
      <div style={{ width: 30, height: 30, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, display: 'grid', placeItems: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.25)' }}>
        <span style={{ transform: 'rotate(45deg)', fontSize: 14 }}>{focus.emoji}</span>
      </div>
    </div>
  </div>
);

const ImpactCard = ({ icon, value, label, tint }) => (
  <div className="sk-glass" style={{ padding: 16, borderRadius: 22 }}>
    <div style={{ width: 36, height: 36, borderRadius: 11, background: tint, display: 'grid', placeItems: 'center', marginBottom: 10 }}>{icon}</div>
    <div className="sk-display" style={{ fontSize: 19, fontWeight: 700, color: C.cocoa, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 11.5, color: C.latte, marginTop: 4 }}>{label}</div>
  </div>
);

/* ---------- LIVE MAP (Leaflet via cdnjs, loaded once) ---------- */
let _leafletPromise = null;
const loadLeaflet = () => {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (window.L) return Promise.resolve(window.L);
  if (_leafletPromise) return _leafletPromise;
  _leafletPromise = new Promise((resolve) => {
    // CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
      document.head.appendChild(link);
    }
    // JS
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    s.onload = () => resolve(window.L);
    s.onerror = () => resolve(null);
    document.head.appendChild(s);
  });
  return _leafletPromise;
};

// Stable map component — initializes once, updates markers on selection change.
const LeafletMap = ({ bags, selectedId, onSelect, gold, goldLight }) => {
  const elRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const [ready, setReady] = useState(!!(typeof window !== 'undefined' && window.L));

  // init once
  useEffect(() => {
    let cancelled = false;
    loadLeaflet().then((L) => {
      if (cancelled || !L || !elRef.current || mapRef.current) return;
      const map = L.map(elRef.current, {
        center: [-6.2400, 106.8150], zoom: 14, zoomControl: false, attributionControl: false,
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, crossOrigin: true,
      }).addTo(map);
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      mapRef.current = map;

      bags.forEach((b) => {
        if (!b.geo) return;
        const icon = L.divIcon({
          className: '', iconSize: [34, 34], iconAnchor: [17, 34],
          html: `<div style="width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#fff;border:2px solid ${gold};display:grid;place-items:center;box-shadow:0 4px 10px rgba(0,0,0,.3)"><span style="transform:rotate(45deg);font-size:15px">${b.emoji}</span></div>`,
        });
        const m = L.marker(b.geo, { icon }).addTo(map);
        m.on('click', () => onSelect(b));
        markersRef.current[b.id] = m;
      });
      // user location dot
      L.circleMarker([-6.2400, 106.8150], { radius: 7, color: '#3b6ea5', fillColor: '#3b6ea5', fillOpacity: 1, weight: 3 }).addTo(map);
      setReady(true);
      // Fire invalidateSize repeatedly — the map div often has no height at first
      // paint inside the phone shell, which leaves tiles unrendered (blank canvas).
      [60, 250, 600, 1200].forEach((d) => setTimeout(() => { try { map.invalidateSize(); } catch {} }, d));
    });
    return () => { cancelled = true; if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, []); // eslint-disable-line

  // update marker highlight + recentre on selection
  useEffect(() => {
    const L = window.L; const map = mapRef.current;
    if (!L || !map) return;
    bags.forEach((b) => {
      const m = markersRef.current[b.id];
      if (!m || !b.geo) return;
      const active = b.id === selectedId;
      m.setIcon(L.divIcon({
        className: '', iconSize: active ? [42, 42] : [34, 34], iconAnchor: active ? [21, 42] : [17, 34],
        html: `<div style="width:${active ? 40 : 32}px;height:${active ? 40 : 32}px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${active ? `linear-gradient(135deg, ${gold}, ${goldLight})` : '#fff'};border:${active ? 'none' : `2px solid ${gold}`};display:grid;place-items:center;box-shadow:0 5px 12px rgba(0,0,0,.3)"><span style="transform:rotate(45deg);font-size:${active ? 18 : 15}px">${b.emoji}</span></div>`,
      }));
      if (active) map.panTo(b.geo, { animate: true });
    });
  }, [selectedId]); // eslint-disable-line

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div ref={elRef} style={{ position: 'absolute', inset: 0, background: '#e8dcc6' }} />
      {!ready && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: '#e8dcc6' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, color: '#6d4c3d' }}>
            <div style={{ width: 28, height: 28, border: '3px solid #c9b29b', borderTopColor: '#c8a13a', borderRadius: '50%', animation: 'skSpin 0.8s linear infinite' }} />
            <span style={{ fontSize: 12, fontWeight: 500 }}>Loading map…</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   ROOT COMPONENT
   ============================================================================ */
const SisaKuApp = () => {
  /* ---- navigation ---- */
  const [screen, setScreen] = useState('splash');
  const [prevScreen, setPrevScreen] = useState('home');
  const [selectedBag, setSelectedBag] = useState(null);
  const [selectedMerchant, setSelectedMerchant] = useState(null);

  /* ---- onboarding ---- */
  const [onboardStep, setOnboardStep] = useState(0);

  /* ---- checkout ---- */
  const [qty, setQty] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('gopay');
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  /* ---- orders ---- */
  const [orders, setOrders] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [orderTab, setOrderTab] = useState('active');
  const [activeOrderDetail, setActiveOrderDetail] = useState(null);

  /* ---- modals / toast ---- */
  const [cancelTarget, setCancelTarget] = useState(null);
  const [rateTarget, setRateTarget] = useState(null);
  const [ratingStars, setRatingStars] = useState(0);
  const [ratingText, setRatingText] = useState('');
  const [toast, setToast] = useState(null);

  /* ---- discovery ---- */
  const [favorites, setFavorites] = useState(() => store.get('favorites', [2]));
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(60000);
  const [mapSelected, setMapSelected] = useState(null);

  /* ---- toolbar shrink-on-scroll ---- */
  const [navShrunk, setNavShrunk] = useState(false);
  const lastScrollY = useRef(0);
  const navWrapRef = useRef(null);
  const [navFullW, setNavFullW] = useState(0);
  // Measure the dock's full pixel width so width animates px -> px (smooth).
  // Animating to/from 'auto' or '100%' is what made it snap.
  useEffect(() => {
    const measure = () => {
      if (navWrapRef.current) {
        const w = navWrapRef.current.clientWidth - 32; // wrapper has 16px padding each side
        if (w > 0) setNavFullW(w);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [screen]);
  const handleScroll = (e) => {
    const y = e.currentTarget.scrollTop;
    const last = lastScrollY.current;
    const delta = y - last;
    if (y < 40) {
      // near the top — always full width
      if (navShrunk) setNavShrunk(false);
    } else if (delta > 10) {
      // scrolling down with intent — shrink
      if (!navShrunk) setNavShrunk(true);
    } else if (delta < -10) {
      // scrolling up with intent — expand
      if (navShrunk) setNavShrunk(false);
    }
    // ignore tiny sub-threshold moves (momentum jitter) — keeps current state
    if (Math.abs(delta) > 4) lastScrollY.current = y;
  };

  /* ---- notifications ---- */
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'deal', title: 'Tous Les Jours just dropped a bag', body: 'French patisserie · 62% off · 1.2km away', time: '5 min ago', read: false },
    { id: 2, type: 'reminder', title: 'Pickup window closing soon', body: 'Your Sourdough Project bag — collect before 8:00 PM', time: '40 min ago', read: false },
    { id: 3, type: 'impact', title: 'You saved 1.4kg of CO\u2082 this week \u{1F30D}', body: 'That\u2019s like charging your phone 170 times.', time: '2 hours ago', read: true },
    { id: 4, type: 'new', title: 'Kopi Kenangan joined SisaKu', body: 'A new café near Senopati is now rescuing food.', time: 'Yesterday', read: true },
  ]);

  /* ---- MERCHANT MODE ---- */
  const [role, setRole] = useState('consumer'); // 'consumer' | 'merchant'
  const [mScreen, setMScreen] = useState('mDash'); // merchant screen router
  const [mListings, setMListings] = useState(() => store.get('mListings', [
    { id: 'L1', title: 'End-of-day Pastry Box', qty: 5, sold: 2, price: 38000, original: 95000, window: '18:00 – 20:00', windowLabel: '6:00 – 8:00 PM', active: true, emoji: '\u{1F950}', hue1: '#e8c9a0', hue2: '#c9985f' },
    { id: 'L2', title: 'Sourdough Surprise', qty: 3, sold: 3, price: 42000, original: 110000, window: '18:00 – 20:00', windowLabel: '6:00 – 8:00 PM', active: true, emoji: '\u{1F35E}', hue1: '#e3cfa6', hue2: '#bf9a55' },
  ]));
  const [mOrders, setMOrders] = useState([
    { id: 'MO1', code: '4782', customer: 'Cherie W.', items: 'Pastry Box ×1', total: 40000, status: 'awaiting', time: '17:42' },
    { id: 'MO2', code: '5891', customer: 'Andre P.', items: 'Sourdough ×1', total: 42000, status: 'awaiting', time: '17:58' },
    { id: 'MO3', code: '3310', customer: 'Maya S.', items: 'Pastry Box ×2', total: 78000, status: 'collected', time: '16:20' },
  ]);
  const [mForm, setMForm] = useState({ title: '', qty: 5, price: 38000, original: 95000, window: '18:00 – 20:00' });
  const [scanCode, setScanCode] = useState('');
  const [scanResult, setScanResult] = useState(null);

  /* ---- merchant derived + handlers ---- */
  const mActiveListings = mListings.filter((l) => l.active);
  const mBagsListedToday = mListings.reduce((s, l) => s + l.qty, 0);
  const mBagsSoldToday = mListings.reduce((s, l) => s + l.sold, 0);
  const mRevenueToday = mListings.reduce((s, l) => s + l.sold * l.price, 0);
  const mPendingPickups = mOrders.filter((o) => o.status === 'awaiting').length;
  const mCommissionRate = 0.15;
  const mNetToday = Math.round(mRevenueToday * (1 - mCommissionRate));

  const mGo = (s) => setMScreen(s);

  const mPublishListing = () => {
    if (!mForm.title.trim()) { setToast({ icon: '\u26A0\uFE0F', text: 'Add a title for your bag' }); return; }
    const wl = mForm.window.replace('18:00', '6:00 PM').replace('20:00', '8:00 PM').replace('17:00', '5:00 PM').replace('19:00', '7:00 PM').replace('21:00', '9:00 PM');
    const newL = {
      id: 'L' + Date.now().toString().slice(-5),
      title: mForm.title, qty: Number(mForm.qty), sold: 0,
      price: Number(mForm.price), original: Number(mForm.original),
      window: mForm.window, windowLabel: wl, active: true,
      emoji: '\u{1F9C1}', hue1: '#f0d9bd', hue2: '#caa063',
    };
    setMListings((p) => [newL, ...p]);
    setMForm({ title: '', qty: 5, price: 38000, original: 95000, window: '18:00 – 20:00' });
    setToast({ icon: '\u2713', text: 'Surprise bag published!' });
    mGo('mListings');
  };

  const mToggleListing = (id) => setMListings((p) => p.map((l) => l.id === id ? { ...l, active: !l.active } : l));

  const mVerifyCode = () => {
    const code = scanCode.trim();
    const match = mOrders.find((o) => o.code === code && o.status === 'awaiting');
    if (match) {
      setMOrders((p) => p.map((o) => o.id === match.id ? { ...o, status: 'collected' } : o));
      setScanResult({ ok: true, order: match });
    } else {
      const already = mOrders.find((o) => o.code === code && o.status === 'collected');
      setScanResult({ ok: false, reason: already ? 'Already collected' : 'Code not found' });
    }
    setScanCode('');
  };

  /* ---- live clock drives countdowns ---- */
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* ---- inject CSS once ---- */
  useEffect(() => {
    const el = document.createElement('style');
    el.innerText = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => { document.head.removeChild(el); };
  }, []);

  /* ---- splash auto-advance ---- */
  useEffect(() => {
    if (screen === 'splash') {
      const t = setTimeout(() => setScreen('onboarding'), 2200);
      return () => clearTimeout(t);
    }
  }, [screen]);

  /* ---- toast auto-dismiss ---- */
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2600);
      return () => clearTimeout(t);
    }
  }, [toast]);

  /* ---- seed demo orders once ---- */
  useEffect(() => {
    setOrders([
      { id: 'SK0012345', code: '4782', bag: BAGS[0], qty: 1, subtotal: 38000, promo: null, promoCut: 0, fee: 2000, total: 40000, payment: 'gopay', notes: '', status: 'confirmed', placedAt: new Date(Date.now() - 40 * 60000) },
      { id: 'SK0012299', code: '5891', bag: BAGS[2], qty: 1, subtotal: 32000, promo: 'FIRST10', promoCut: 3200, fee: 2000, total: 30800, payment: 'ovo', notes: '', status: 'completed', placedAt: new Date(Date.now() - 26 * 3600000), rating: 5, review: 'Incredible value, pastries were fresh!' },
      { id: 'SK0012180', code: '3310', bag: BAGS[3], qty: 2, subtotal: 84000, promo: null, promoCut: 0, fee: 2000, total: 86000, payment: 'dana', notes: '', status: 'completed', placedAt: new Date(Date.now() - 50 * 3600000), rating: 0 },
    ]);
  }, []);

  /* ---- persist favorites & merchant listings ---- */
  useEffect(() => { store.set('favorites', favorites); }, [favorites]);
  useEffect(() => { store.set('mListings', mListings); }, [mListings]);

  /* ---- derived ---- */
  const isFav = (id) => favorites.includes(id);
  const toggleFav = (id) => setFavorites((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const go = (next) => { setPrevScreen(screen); setScreen(next); setNavShrunk(false); lastScrollY.current = 0; };
  const openBag = (bag) => { setSelectedBag(bag); setQty(1); go('details'); };
  const openMerchant = (bag) => { setSelectedMerchant(bag); go('merchant'); };

  const subtotal = () => (selectedBag ? selectedBag.price * qty : 0);
  const promoCut = () => {
    if (!promoApplied) return 0;
    const p = PROMOS[promoApplied];
    return p.type === 'pct' ? subtotal() * p.value : p.value;
  };
  const serviceFee = () => 2000;
  const total = () => Math.max(0, subtotal() - promoCut() + serviceFee());

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMOS[code]) { setPromoApplied(code); setPromoError(''); }
    else { setPromoError('That code isn\u2019t valid'); setPromoApplied(null); }
  };

  const placeOrder = () => {
    const order = {
      id: 'SK' + Date.now().toString().slice(-7),
      code: Math.floor(1000 + Math.random() * 9000).toString(),
      bag: selectedBag, qty, subtotal: subtotal(), promo: promoApplied,
      promoCut: promoCut(), fee: serviceFee(), total: total(),
      payment: paymentMethod, notes: orderNotes, placedAt: new Date(), status: 'confirmed',
    };
    setOrders((p) => [order, ...p]);
    setLastOrder(order);
    setPromoApplied(null); setPromoInput(''); setPromoError(''); setOrderNotes(''); setQty(1);
    go('success');
  };

  const cancelOrder = (id) => {
    setOrders((p) => p.map((o) => o.id === id ? { ...o, status: 'cancelled' } : o));
    setCancelTarget(null); setActiveOrderDetail(null);
    setToast({ icon: '\u2713', text: 'Order cancelled & refunded' });
  };

  const submitRating = () => {
    setOrders((p) => p.map((o) => o.id === rateTarget.id ? { ...o, rating: ratingStars, review: ratingText } : o));
    setRateTarget(null); setRatingStars(0); setRatingText('');
    setToast({ icon: '\u2605', text: 'Thanks for your review!' });
  };

  const markAllRead = () => setNotifications((p) => p.map((n) => ({ ...n, read: true })));
  const unreadCount = notifications.filter((n) => !n.read).length;

  const activeOrders = orders.filter((o) => o.status === 'confirmed' || o.status === 'ready');
  const pastOrders = orders.filter((o) => o.status === 'completed' || o.status === 'cancelled');

  const stats = { rescued: pastOrders.filter((o) => o.status === 'completed').length + 6, saved: 412000, co2: 7.8, meals: 14 };

  const countdownTo = (hourFloat) => {
    const target = new Date(now);
    target.setHours(Math.floor(hourFloat), Math.round((hourFloat % 1) * 60), 0, 0);
    const diff = target - now;
    if (diff < 0) return 'closed';
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  const timeAgo = (date) => {
    const mins = Math.floor((now - date) / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const filteredBags = () => {
    let list = BAGS.filter((b) => {
      const matchCat = activeCategory === 'All' || b.category === activeCategory;
      const matchSearch = !search || (b.merchant + b.type + b.area).toLowerCase().includes(search.toLowerCase());
      const matchPrice = b.price <= maxPrice;
      return matchCat && matchSearch && matchPrice;
    });
    if (sortBy === 'price') list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === 'distance') list = [...list].sort((a, b) => a.distance - b.distance);
    else if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'discount') list = [...list].sort((a, b) => b.discount - a.discount);
    return list;
  };

  /* ======================= SPLASH ======================= */
  const renderSplash = () => (
    <div className="sk-grain" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: `radial-gradient(130% 100% at 50% 0%, ${C.coffee} 0%, ${C.cocoa} 55%, ${C.espresso} 100%)` }}>
      <div className="sk-pop" style={{ width: 96, height: 96, borderRadius: 28, background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, display: 'grid', placeItems: 'center', boxShadow: '0 16px 40px rgba(0,0,0,0.4)', marginBottom: 26 }}>
        <ShoppingBag size={46} color={C.espresso} strokeWidth={1.6} />
      </div>
      <div className="sk-fadeup" style={{ animationDelay: '0.25s' }}>
        <div className="sk-display sk-gold-text" style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.01em', textAlign: 'center' }}>SisaKu</div>
      </div>
      <div className="sk-fadeup sk-serif" style={{ animationDelay: '0.45s', color: C.sand, fontSize: 19, fontStyle: 'italic', marginTop: 4 }}>
        Selamatkan Sisa, Nikmati Lebih
      </div>
      <div className="sk-fade" style={{ animationDelay: '1.2s', position: 'absolute', bottom: 60, display: 'flex', gap: 6 }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 7, height: 7, borderRadius: 999, background: C.gold, animation: `skPulse 1.2s ${i * 0.2}s infinite` }} />
        ))}
      </div>
    </div>
  );

  /* ======================= ONBOARDING ======================= */
  const ONBOARD = [
    { emoji: '\u{1F950}', title: 'Premium food,\nhalf the price', body: 'Rescue unsold pastries, cakes & coffee from Jakarta\u2019s finest bakeries at 50–70% off — every evening.' },
    { emoji: '\u{1F4CD}', title: 'Right around\nthe corner', body: 'Discover surprise bags from merchants near you. Reserve in seconds, collect on your way home.' },
    { emoji: '\u{1F30D}', title: 'Every bag saves\nthe planet a little', body: 'Indonesia wastes 23 million tonnes of food a year. Each rescue cuts waste and CO\u2082. Eat well, do good.' },
  ];

  const renderOnboarding = () => {
    const s = ONBOARD[onboardStep];
    const last = onboardStep === ONBOARD.length - 1;
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'transparent' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 34px', textAlign: 'center', position: 'relative' }}>
          <button onClick={() => setScreen('chooseRole')} style={{ position: 'absolute', top: 24, right: 22, background: 'none', border: 'none', color: C.latte, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Skip</button>
          <div key={onboardStep} className="sk-scalein" style={{ width: 150, height: 150, borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: 74, marginBottom: 38, background: `radial-gradient(circle at 35% 30%, #fff, ${C.parchment})`, boxShadow: `0 20px 50px rgba(28,23,18,0.12), inset 0 0 0 1px ${C.parchment}` }}>
            <span className="sk-float">{s.emoji}</span>
          </div>
          <div key={'t' + onboardStep} className="sk-fadeup sk-display" style={{ fontSize: 32, fontWeight: 600, color: C.cocoa, lineHeight: 1.15, whiteSpace: 'pre-line', marginBottom: 16 }}>{s.title}</div>
          <div key={'b' + onboardStep} className="sk-fadeup" style={{ animationDelay: '0.08s', fontSize: 15, lineHeight: 1.6, color: C.latte, maxWidth: 300 }}>{s.body}</div>
        </div>
        <div style={{ padding: '0 28px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginBottom: 28 }}>
            {ONBOARD.map((_, i) => (
              <span key={i} style={{ height: 7, width: i === onboardStep ? 26 : 7, borderRadius: 999, background: i === onboardStep ? C.gold : C.sand, transition: 'width 0.3s ease' }} />
            ))}
          </div>
          <CTA icon={last ? <Sparkles size={18} /> : null} onClick={() => last ? setScreen('chooseRole') : setOnboardStep((p) => p + 1)}>
            {last ? 'Get started' : 'Continue'}
          </CTA>
        </div>
      </div>
    );
  };

  /* ======================= CHOOSE ROLE ======================= */
  const renderChooseRole = () => (
    <div className="sk-grain" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: `radial-gradient(130% 90% at 50% 0%, ${C.coffee} 0%, ${C.cocoa} 55%, ${C.espresso} 100%)`, padding: '0 24px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="sk-pop" style={{ width: 74, height: 74, borderRadius: 22, background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, display: 'grid', placeItems: 'center', margin: '0 auto 18px', boxShadow: '0 14px 36px rgba(0,0,0,0.35)' }}>
            <ShoppingBag size={36} color={C.espresso} strokeWidth={1.6} />
          </div>
          <div className="sk-fadeup sk-display sk-gold-text" style={{ fontSize: 34, fontWeight: 700 }}>SisaKu</div>
          <div className="sk-fadeup sk-serif" style={{ animationDelay: '0.1s', fontSize: 16, fontStyle: 'italic', color: C.sand, marginTop: 4 }}>How would you like to begin?</div>
        </div>

        {/* Shopper card */}
        <button onClick={() => { setRole('consumer'); setScreen('home'); }} className="sk-fadeup sk-press sk-glass-strong" style={{ animationDelay: '0.18s', width: '100%', textAlign: 'left', cursor: 'pointer', borderRadius: 26, padding: 20, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 999, flexShrink: 0, background: `linear-gradient(135deg, ${C.caramel}, ${C.coffee})`, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)', display: 'grid', placeItems: 'center', fontSize: 28 }}>🛍️</div>
          <div style={{ flex: 1 }}>
            <div className="sk-display" style={{ fontSize: 19, fontWeight: 600, color: C.cocoa }}>I'm a shopper</div>
            <div style={{ fontSize: 13, color: C.latte, marginTop: 3, lineHeight: 1.4 }}>Discover & rescue surprise bags near you at 50–70% off</div>
          </div>
          <ChevronRight size={22} color={C.sand} />
        </button>

        {/* Merchant card */}
        <button onClick={() => { setRole('merchant'); setMScreen('mDash'); }} className="sk-fadeup sk-press sk-glass-dark" style={{ animationDelay: '0.26s', width: '100%', textAlign: 'left', cursor: 'pointer', borderRadius: 26, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 999, flexShrink: 0, background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)', display: 'grid', placeItems: 'center', fontSize: 28 }}>🏪</div>
          <div style={{ flex: 1 }}>
            <div className="sk-display" style={{ fontSize: 19, fontWeight: 600, color: C.cream }}>I'm a merchant</div>
            <div style={{ fontSize: 13, color: C.sand, marginTop: 3, lineHeight: 1.4 }}>List surplus food, manage orders & verify pickups</div>
          </div>
          <ChevronRight size={22} color={C.goldLight} />
        </button>
      </div>

      <div style={{ textAlign: 'center', paddingBottom: 34 }}>
        <span style={{ fontSize: 12, color: C.latte }}>You can switch anytime from your profile.</span>
      </div>
    </div>
  );

  /* ======================= HOME ======================= */
  const renderBagCard = (bag, index) => {
    const closing = bag.left <= 2;
    return (
      <div key={bag.id} className="sk-fadeup sk-card" style={{ animationDelay: `${index * 0.06}s`, borderRadius: 26, overflow: 'hidden', background: '#fff', boxShadow: '0 12px 36px rgba(28,23,18,0.07)', border: '1px solid rgba(28,24,20,0.05)', marginBottom: 16, cursor: 'pointer' }} onClick={() => openBag(bag)}>
        <div style={{ position: 'relative' }}>
          <BagImage bag={bag} h={150} />
          <button onClick={(e) => { e.stopPropagation(); toggleFav(bag.id); }} className="sk-press" style={{ position: 'absolute', top: 12, right: 12, width: 38, height: 38, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.92)', display: 'grid', placeItems: 'center', cursor: 'pointer', backdropFilter: 'blur(18px) saturate(160%)', WebkitBackdropFilter: 'blur(18px) saturate(160%)' }}>
            <Heart size={18} fill={isFav(bag.id) ? '#c8506e' : 'none'} color={isFav(bag.id) ? '#c8506e' : C.mocha} />
          </button>
          <div style={{ position: 'absolute', top: 12, left: 12 }}>
            <Pill bg={`linear-gradient(135deg, ${C.cocoa}, ${C.coffee})`} color={C.goldLight}><Tag size={11} /> {bag.discount}% off</Pill>
          </div>
          <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Pill bg="rgba(255,255,255,0.92)" color={C.cocoa} style={{ backdropFilter: 'blur(18px) saturate(160%)', WebkitBackdropFilter: 'blur(18px) saturate(160%)' }}><Clock size={11} /> {countdownTo(bag.pickupEnd)} left</Pill>
            {closing && <Pill bg="rgba(209,74,63,0.92)" color="#fff" style={{ backdropFilter: 'blur(18px) saturate(160%)', WebkitBackdropFilter: 'blur(18px) saturate(160%)' }}>Only {bag.left} left</Pill>}
          </div>
        </div>
        <div style={{ padding: '14px 16px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ minWidth: 0 }}>
              <div className="sk-display" style={{ fontSize: 17, fontWeight: 600, color: C.cocoa, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{bag.merchant}</div>
              <div style={{ fontSize: 12.5, color: C.latte, marginTop: 1 }}>{bag.type}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0, color: C.cocoa, fontSize: 13, fontWeight: 600 }}>
              <Star size={13} fill={C.gold} color={C.gold} /> {bag.rating}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, fontSize: 12, color: C.latte }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={12} /> {bag.distance} km</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={12} /> {bag.windowLabel}</span>
          </div>
          <Divider my={12} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: 12, color: C.sand, textDecoration: 'line-through', marginRight: 7 }}>{idr(bag.original)}</span>
              <span className="sk-display" style={{ fontSize: 19, fontWeight: 700, color: C.cocoa }}>{idr(bag.price)}</span>
            </div>
            <div className="sk-press" style={{ width: 40, height: 40, borderRadius: 999, background: `linear-gradient(180deg, ${C.coffee}, ${C.cocoa})`, display: 'grid', placeItems: 'center', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 6px 16px rgba(28,23,18,0.25)' }}>
              <Plus size={20} color={'#fff'} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHome = () => {
    const list = filteredBags();
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'transparent' }}>
        <div style={{ padding: '58px 20px 6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: C.latte, fontSize: 12.5, fontWeight: 500 }}>
                <MapPin size={13} /> Kemang · Jakarta Selatan
              </div>
              <div className="sk-display" style={{ fontSize: 32, fontWeight: 700, color: C.cocoa, marginTop: 6, lineHeight: 1.05, letterSpacing: '-0.03em' }}>Good evening 🌙</div>
              <div style={{ fontSize: 14.5, color: C.latte, marginTop: 4 }}>What shall we rescue tonight?</div>
            </div>
            <button onClick={() => go('notifications')} className="sk-press sk-glass" style={{ position: 'relative', width: 42, height: 42, borderRadius: 999, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
              <Bell size={19} color={C.cocoa} />
              {unreadCount > 0 && <span style={{ position: 'absolute', top: 9, right: 9, width: 8, height: 8, borderRadius: 999, background: C.danger }} />}
            </button>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <div className="sk-glass" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 9, padding: '12px 16px', borderRadius: 999 }}>
              <Search size={17} color={C.latte} />
              <input className="sk-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search bakeries, cafés…" style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontSize: 15, color: C.cocoa }} />
              {search && <X size={16} color={C.latte} style={{ cursor: 'pointer' }} onClick={() => setSearch('')} />}
            </div>
            <button onClick={() => setShowFilters(true)} className="sk-press sk-glass" style={{ width: 46, borderRadius: 999, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
              <Filter size={18} color={C.cocoa} />
            </button>
          </div>
        </div>

        <div className="sk-noscroll" onScroll={handleScroll} style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 100px' }}>
          <div className="sk-fadeup" style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {[
              { icon: <Leaf size={15} color={C.sage} />, big: stats.rescued, small: 'bags saved' },
              { icon: <Wallet size={15} color={C.gold} />, big: idr(stats.saved).replace('Rp\u202f', ''), small: 'Rp saved' },
              { icon: <Sparkles size={15} color={C.caramel} />, big: stats.co2 + 'kg', small: 'CO\u2082 cut' },
            ].map((s, i) => (
              <div key={i} className="sk-glass" style={{ flex: 1, borderRadius: 20, padding: '12px 10px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>{s.icon}</div>
                <div className="sk-display" style={{ fontSize: 16, fontWeight: 700, color: C.cocoa, lineHeight: 1 }}>{s.big}</div>
                <div style={{ fontSize: 10, color: C.latte, marginTop: 3 }}>{s.small}</div>
              </div>
            ))}
          </div>

          <div className="sk-noscroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 16, paddingBottom: 2 }}>
            {CATEGORIES.map((cat) => {
              const on = activeCategory === cat;
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)} className="sk-press" style={{ flexShrink: 0, padding: '9px 16px', borderRadius: 999, border: on ? '1px solid transparent' : '1px solid rgba(255,255,255,0.65)', background: on ? `linear-gradient(180deg, ${C.coffee}, ${C.cocoa})` : 'rgba(255,255,255,0.55)', backdropFilter: 'blur(18px) saturate(160%)', WebkitBackdropFilter: 'blur(18px) saturate(160%)', color: on ? C.cream : C.mocha, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{cat}</button>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: C.latte }}><span style={{ fontWeight: 700, color: C.cocoa }}>{list.length}</span> collections nearby</div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sk-input" style={{ border: '1px solid rgba(255,255,255,0.65)', borderRadius: 999, padding: '8px 14px', fontSize: 12.5, fontWeight: 500, color: C.cocoa, background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(18px) saturate(160%)', WebkitBackdropFilter: 'blur(18px) saturate(160%)', cursor: 'pointer', outline: 'none', appearance: 'none' }}>
              <option value="recommended">Recommended</option>
              <option value="price">Price: low to high</option>
              <option value="distance">Nearest first</option>
              <option value="rating">Top rated</option>
              <option value="discount">Biggest discount</option>
            </select>
          </div>

          {activeCategory === 'All' && !search && (
            <div className="sk-fadeup sk-grain" onClick={() => { setPromoInput('SISAKU20'); setToast({ icon: '\u{1F381}', text: 'SISAKU20 ready at checkout' }); }} style={{ position: 'relative', borderRadius: 20, padding: '18px 20px', marginBottom: 18, overflow: 'hidden', background: `linear-gradient(120deg, ${C.cocoa} 0%, ${C.caramel} 120%)`, cursor: 'pointer' }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <Pill bg="rgba(255,255,255,0.2)" color="#fff"><Gift size={11} /> Welcome offer</Pill>
                <div className="sk-display" style={{ fontSize: 20, fontWeight: 600, color: C.cream, marginTop: 8, lineHeight: 1.2 }}>Use SISAKU20 for<br />20% off your first bag</div>
              </div>
              <div style={{ position: 'absolute', right: -8, bottom: -14, fontSize: 96, opacity: 0.18 }}>🎁</div>
            </div>
          )}

          {list.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: C.latte }}>
              <div style={{ fontSize: 50, marginBottom: 12 }}>🍃</div>
              <div className="sk-display" style={{ fontSize: 18, color: C.cocoa, marginBottom: 4 }}>No bags match that</div>
              <div style={{ fontSize: 13 }}>Try widening your filters or search.</div>
            </div>
          ) : list.map((bag, i) => renderBagCard(bag, i))}
        </div>
      </div>
    );
  };

  /* ======================= DETAILS ======================= */
  const renderDetails = () => {
    const bag = selectedBag;
    if (!bag) return null;
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'transparent' }}>
        <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: 96 }}>
          <div style={{ position: 'relative' }}>
            <BagImage bag={bag} h={300} />
            <button onClick={() => go(prevScreen === 'merchant' ? 'merchant' : 'home')} className="sk-press" style={{ position: 'absolute', top: 48, left: 18, width: 40, height: 40, borderRadius: 13, border: 'none', background: 'rgba(255,255,255,0.92)', display: 'grid', placeItems: 'center', cursor: 'pointer', backdropFilter: 'blur(18px) saturate(160%)', WebkitBackdropFilter: 'blur(18px) saturate(160%)' }}>
              <ChevronLeft size={22} color={C.cocoa} />
            </button>
            <div style={{ position: 'absolute', top: 48, right: 18, display: 'flex', gap: 8 }}>
              <button onClick={() => setToast({ icon: '\u{1F517}', text: 'Share link copied' })} className="sk-press" style={{ width: 40, height: 40, borderRadius: 13, border: 'none', background: 'rgba(255,255,255,0.92)', display: 'grid', placeItems: 'center', cursor: 'pointer', backdropFilter: 'blur(18px) saturate(160%)', WebkitBackdropFilter: 'blur(18px) saturate(160%)' }}>
                <Share2 size={18} color={C.cocoa} />
              </button>
              <button onClick={() => toggleFav(bag.id)} className="sk-press" style={{ width: 40, height: 40, borderRadius: 13, border: 'none', background: 'rgba(255,255,255,0.92)', display: 'grid', placeItems: 'center', cursor: 'pointer', backdropFilter: 'blur(18px) saturate(160%)', WebkitBackdropFilter: 'blur(18px) saturate(160%)' }}>
                <Heart size={18} fill={isFav(bag.id) ? '#c8506e' : 'none'} color={isFav(bag.id) ? '#c8506e' : C.cocoa} />
              </button>
            </div>
            <div style={{ position: 'absolute', bottom: 16, left: 18 }}>
              <Pill bg={`linear-gradient(135deg, ${C.gold}, ${C.goldLight})`} color={C.espresso} style={{ fontSize: 12 }}>Surprise Bag · {bag.discount}% off</Pill>
            </div>
          </div>

          <div style={{ position: 'relative', marginTop: -26, background: C.cream, borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: '24px 20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
              <div>
                <div className="sk-display" style={{ fontSize: 24, fontWeight: 600, color: C.cocoa, lineHeight: 1.1 }}>{bag.merchant}</div>
                <div style={{ fontSize: 13.5, color: C.latte, marginTop: 3 }}>{bag.type} · {bag.area}</div>
              </div>
              <button onClick={() => openMerchant(bag)} className="sk-press" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4, padding: '8px 12px', borderRadius: 11, border: `1px solid ${C.sand}`, background: '#fff', color: C.mocha, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                <Store size={13} /> Shop
              </button>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              {[
                { icon: <Star size={16} fill={C.gold} color={C.gold} />, top: bag.rating, bot: `${bag.reviews} reviews` },
                { icon: <MapPin size={16} color={C.sage} />, top: bag.distance + ' km', bot: 'away' },
                { icon: <Clock size={16} color={C.caramel} />, top: countdownTo(bag.pickupEnd), bot: 'to collect' },
              ].map((f, i) => (
                <div key={i} className="sk-glass" style={{ flex: 1, borderRadius: 18, padding: '12px 8px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>{f.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.cocoa }}>{f.top}</div>
                  <div style={{ fontSize: 10.5, color: C.latte, marginTop: 1 }}>{f.bot}</div>
                </div>
              ))}
            </div>

            <Divider my={20} />
            <div className="sk-display" style={{ fontSize: 16, fontWeight: 600, color: C.cocoa, marginBottom: 8 }}>What might be inside</div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: C.mocha }}>{bag.contents}.</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 10, padding: '10px 12px', borderRadius: 12, background: 'rgba(62,124,83,0.1)' }}>
              <Sparkles size={15} color={C.sage} />
              <span style={{ fontSize: 12.5, color: C.sage, fontWeight: 500 }}>It’s a surprise! Contents vary with what’s left at close.</span>
            </div>

            {bag.dietary.length > 0 && (
              <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                {bag.dietary.map((d) => <Pill key={d} bg={C.parchment} color={C.mocha}><Check size={11} /> {d}</Pill>)}
              </div>
            )}

            {bag.revs && bag.revs.length > 0 && (
              <>
                <Divider my={20} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div className="sk-display" style={{ fontSize: 16, fontWeight: 600, color: C.cocoa }}>What rescuers say</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={14} fill={C.gold} color={C.gold} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.cocoa }}>{bag.rating}</span>
                    <span style={{ fontSize: 12, color: C.latte }}>({bag.reviews})</span>
                  </div>
                </div>
                {bag.revs.map((rv, i) => (
                  <div key={i} style={{ padding: 14, borderRadius: 16, background: '#fff', border: `1px solid ${C.parchment}`, marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${C.caramel}, ${C.mocha})`, display: 'grid', placeItems: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>{rv.n.charAt(0)}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.cocoa }}>{rv.n}</div>
                        <div style={{ display: 'flex', gap: 1 }}>
                          {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={11} fill={s <= rv.s ? C.gold : 'none'} color={s <= rv.s ? C.gold : C.sand} />)}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.5, color: C.mocha }}>"{rv.t}"</div>
                  </div>
                ))}
              </>
            )}

            <Divider my={20} />
            <div className="sk-display" style={{ fontSize: 16, fontWeight: 600, color: C.cocoa, marginBottom: 10 }}>Pickup window</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 16, background: '#fff', border: `1px solid ${C.parchment}` }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${C.cocoa}, ${C.coffee})`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Clock size={20} color={C.goldLight} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.cocoa }}>Today · {bag.windowLabel}</div>
                <div style={{ fontSize: 12, color: C.latte, marginTop: 1 }}>{bag.area}, Jakarta Selatan</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: C.latte }}>Closes in</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>{countdownTo(bag.pickupEnd)}</div>
              </div>
            </div>

            <div onClick={() => { setMapSelected(bag); go('map'); }} className="sk-press" style={{ position: 'relative', height: 120, borderRadius: 16, marginTop: 14, overflow: 'hidden', cursor: 'pointer', border: `1px solid ${C.parchment}` }}>
              <MiniMap focus={bag} />
              <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
                <Pill bg="rgba(255,255,255,0.95)" color={C.cocoa}><Navigation size={11} /> View map</Pill>
              </div>
            </div>
          </div>
        </div>

        <div className="sk-glass-strong" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 20px 26px', borderRadius: '24px 24px 0 0', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: C.sand, textDecoration: 'line-through' }}>{idr(bag.original)}</div>
            <div className="sk-display" style={{ fontSize: 22, fontWeight: 700, color: C.cocoa, lineHeight: 1 }}>{idr(bag.price)}</div>
          </div>
          <button onClick={() => { setQty(1); go('checkout'); }} className="sk-press" style={{ flex: 1, padding: 15, borderRadius: 15, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg, ${C.cocoa}, ${C.coffee})`, color: C.cream, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 10px 24px rgba(28,23,18,0.28)' }}>
            <ShoppingBag size={18} /> Reserve bag
          </button>
        </div>
      </div>
    );
  };

  /* ======================= MERCHANT ======================= */
  const renderMerchant = () => {
    const m = selectedMerchant;
    if (!m) return null;
    const others = BAGS.filter((b) => b.area === m.area && b.id !== m.id).slice(0, 2);
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'transparent' }}>
        <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: 96 }}>
          <div style={{ position: 'relative' }}>
            <BagImage bag={m} h={180} showEmoji={false} />
            <button onClick={() => go('details')} className="sk-press" style={{ position: 'absolute', top: 48, left: 18, width: 40, height: 40, borderRadius: 13, border: 'none', background: 'rgba(255,255,255,0.92)', display: 'grid', placeItems: 'center', cursor: 'pointer', backdropFilter: 'blur(18px) saturate(160%)', WebkitBackdropFilter: 'blur(18px) saturate(160%)' }}>
              <ChevronLeft size={22} color={C.cocoa} />
            </button>
          </div>
          <div style={{ padding: '0 20px' }}>
            <div style={{ marginTop: -42, display: 'flex', alignItems: 'flex-end', gap: 14 }}>
              <div style={{ width: 84, height: 84, borderRadius: 22, background: '#fff', display: 'grid', placeItems: 'center', fontSize: 42, boxShadow: '0 8px 20px rgba(28,23,18,0.18)', border: `1px solid ${C.parchment}` }}>{m.emoji}</div>
              <div style={{ paddingBottom: 6 }}>
                <Pill bg="rgba(62,124,83,0.15)" color={C.sage}><ShieldCheck size={11} /> Verified partner</Pill>
              </div>
            </div>
            <div className="sk-display" style={{ fontSize: 25, fontWeight: 600, color: C.cocoa, marginTop: 14 }}>{m.merchant}</div>
            <div style={{ fontSize: 13.5, color: C.latte, marginTop: 2 }}>{m.type} · {m.area}, Jakarta Selatan</div>

            <div style={{ display: 'flex', gap: 18, marginTop: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Star size={15} fill={C.gold} color={C.gold} /><span style={{ fontWeight: 700, color: C.cocoa, fontSize: 14 }}>{m.rating}</span><span style={{ fontSize: 12.5, color: C.latte }}>({m.reviews})</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: C.latte, fontSize: 13 }}><MapPin size={14} /> {m.distance} km</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: C.latte, fontSize: 13 }}><Leaf size={14} color={C.sage} /> 1.2k saved</div>
            </div>

            <Divider my={18} />
            <div className="sk-serif" style={{ fontSize: 17, lineHeight: 1.5, color: C.mocha, fontStyle: 'italic' }}>“{m.blurb}”</div>
            <Divider my={18} />

            <div className="sk-display" style={{ fontSize: 16, fontWeight: 600, color: C.cocoa, marginBottom: 12 }}>Available tonight</div>
            <div onClick={() => { setSelectedBag(m); setQty(1); go('details'); }} className="sk-card" style={{ display: 'flex', gap: 12, padding: 12, borderRadius: 16, background: '#fff', border: `1px solid ${C.parchment}`, cursor: 'pointer', marginBottom: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}><BagImage bag={m} h={64} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.cocoa }}>Surprise Bag</div>
                <div style={{ fontSize: 11.5, color: C.latte, marginTop: 2 }}>{m.windowLabel} · {m.left} left</div>
                <div style={{ marginTop: 5 }}>
                  <span style={{ fontSize: 11, color: C.sand, textDecoration: 'line-through', marginRight: 6 }}>{idr(m.original)}</span>
                  <span className="sk-display" style={{ fontSize: 16, fontWeight: 700, color: C.cocoa }}>{idr(m.price)}</span>
                </div>
              </div>
              <ChevronRight size={20} color={C.sand} style={{ alignSelf: 'center' }} />
            </div>

            {others.length > 0 && (
              <>
                <div className="sk-display" style={{ fontSize: 16, fontWeight: 600, color: C.cocoa, margin: '18px 0 12px' }}>More in {m.area}</div>
                {others.map((b) => (
                  <div key={b.id} onClick={() => openBag(b)} className="sk-card" style={{ display: 'flex', gap: 12, padding: 12, borderRadius: 16, background: '#fff', border: `1px solid ${C.parchment}`, cursor: 'pointer', marginBottom: 12 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}><BagImage bag={b} h={52} /></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: C.cocoa }}>{b.merchant}</div>
                      <div style={{ fontSize: 11, color: C.latte, marginTop: 2 }}>{b.type}</div>
                    </div>
                    <span className="sk-display" style={{ fontSize: 15, fontWeight: 700, color: C.cocoa, alignSelf: 'center' }}>{idr(b.price)}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ======================= MAP ======================= */
  const renderMap = () => {
    const sel = mapSelected || filteredBags()[0];
    return (
      <div style={{ position: 'absolute', inset: 0, background: C.cream, overflow: 'hidden' }}>
        <LeafletMap bags={BAGS} selectedId={sel ? sel.id : null} onSelect={(b) => setMapSelected(b)} gold={C.gold} goldLight={C.goldLight} />

        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '52px 16px 0', display: 'flex', gap: 10 }}>
          <button onClick={() => go('home')} className="sk-press sk-glass-strong" style={{ width: 44, height: 44, borderRadius: 999, border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
            <ChevronLeft size={22} color={C.cocoa} />
          </button>
          <div className="sk-glass-strong" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', borderRadius: 999 }}>
            <Search size={17} color={C.latte} />
            <span style={{ fontSize: 13.5, color: C.mocha, fontWeight: 500 }}>{BAGS.length} rescues near Kemang</span>
          </div>
        </div>

        {sel && (
          <div key={sel.id} className="sk-slideup" style={{ position: 'absolute', bottom: 100, left: 16, right: 16, zIndex: 20 }}>
            <div onClick={() => openBag(sel)} className="sk-card" style={{ display: 'flex', gap: 12, padding: 12, borderRadius: 22, cursor: 'pointer', background: '#fff', border: `1px solid ${C.parchment}`, boxShadow: '0 16px 40px rgba(28,23,18,0.22)' }}>
              <div style={{ width: 70, height: 70, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}><BagImage bag={sel} h={70} /></div>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="sk-display" style={{ fontSize: 16, fontWeight: 700, color: C.cocoa, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '-0.02em' }}>{sel.merchant}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: C.latte, marginTop: 3 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}><Star size={11} fill={C.gold} color={C.gold} /> {sel.rating}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}><MapPin size={11} /> {sel.distance}km</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}><Clock size={11} /> {countdownTo(sel.pickupEnd)}</span>
                </div>
                <div style={{ marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: C.sand, textDecoration: 'line-through', marginRight: 6 }}>{idr(sel.original)}</span>
                  <span className="sk-display" style={{ fontSize: 16, fontWeight: 700, color: C.cocoa }}>{idr(sel.price)}</span>
                </div>
              </div>
              <div style={{ alignSelf: 'center' }}><ChevronRight size={20} color={C.sand} /></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  /* ======================= CHECKOUT ======================= */
  const renderCheckout = () => {
    const bag = selectedBag;
    if (!bag) return null;
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'transparent' }}>
        <TopBar title="Checkout" onBack={() => go('details')} />
        <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 96px' }}>
          <div className="sk-fadeup" style={{ display: 'flex', gap: 12, padding: 14, borderRadius: 18, background: '#fff', border: `1px solid ${C.parchment}` }}>
            <div style={{ width: 64, height: 64, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}><BagImage bag={bag} h={64} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="sk-display" style={{ fontSize: 16, fontWeight: 600, color: C.cocoa }}>{bag.merchant}</div>
              <div style={{ fontSize: 11.5, color: C.latte, marginTop: 1 }}>Surprise Bag · {bag.windowLabel}</div>
              <div style={{ marginTop: 4 }}>
                <span style={{ fontSize: 11, color: C.sand, textDecoration: 'line-through', marginRight: 6 }}>{idr(bag.original)}</span>
                <span className="sk-display" style={{ fontSize: 16, fontWeight: 700, color: C.cocoa }}>{idr(bag.price)}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.parchment, borderRadius: 999, padding: '5px 8px' }}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="sk-press" style={{ width: 24, height: 24, borderRadius: 999, border: 'none', background: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer', color: C.cocoa }}><Minus size={14} /></button>
                <span style={{ fontSize: 15, fontWeight: 700, color: C.cocoa, minWidth: 14, textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty((q) => Math.min(bag.left, q + 1))} className="sk-press" style={{ width: 24, height: 24, borderRadius: 999, border: 'none', background: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer', color: C.cocoa }}><Plus size={14} /></button>
              </div>
              <span style={{ fontSize: 10, color: C.latte }}>{bag.left} available</span>
            </div>
          </div>

          <div className="sk-fadeup" style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, padding: '12px 14px', borderRadius: 14, background: 'rgba(189,155,63,0.12)' }}>
            <Calendar size={17} color="#9c7a1f" />
            <div style={{ fontSize: 12.5, color: '#9c7a1f', fontWeight: 500 }}>Collect today between {bag.windowLabel} at {bag.area}.</div>
          </div>

          <div className="sk-display" style={{ fontSize: 16, fontWeight: 600, color: C.cocoa, margin: '22px 0 12px' }}>Payment method</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PAYMENTS.map((p) => {
              const on = paymentMethod === p.id;
              return (
                <button key={p.id} onClick={() => setPaymentMethod(p.id)} className="sk-press" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderRadius: 14, border: on ? `2px solid ${C.gold}` : `1px solid ${C.parchment}`, background: on ? 'rgba(189,155,63,0.06)' : '#fff', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontSize: 22 }}>{p.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.cocoa }}>{p.name}</div>
                    <div style={{ fontSize: 11.5, color: C.latte }}>{p.balance}</div>
                  </div>
                  <span style={{ width: 20, height: 20, borderRadius: 999, border: on ? 'none' : `2px solid ${C.sand}`, background: on ? C.gold : 'transparent', display: 'grid', placeItems: 'center' }}>
                    {on && <Check size={13} color={C.espresso} strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="sk-display" style={{ fontSize: 16, fontWeight: 600, color: C.cocoa, margin: '22px 0 12px' }}>Promo code</div>
          {promoApplied ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 15px', borderRadius: 14, background: 'rgba(62,124,83,0.12)', border: '1px solid rgba(62,124,83,0.3)' }}>
              <Gift size={17} color={C.sage} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: C.sage }}>{promoApplied} applied</div>
                <div style={{ fontSize: 11.5, color: C.sage }}>{PROMOS[promoApplied].label}</div>
              </div>
              <button onClick={() => { setPromoApplied(null); setPromoInput(''); }} style={{ border: 'none', background: 'none', cursor: 'pointer', color: C.sage }}><X size={18} /></button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', gap: 10 }}>
                <input className="sk-input" value={promoInput} onChange={(e) => { setPromoInput(e.target.value); setPromoError(''); }} placeholder="Enter code (try SISAKU20)" style={{ flex: 1, padding: '13px 15px', borderRadius: 14, border: `1px solid ${promoError ? C.danger : C.parchment}`, outline: 'none', fontSize: 14, color: C.cocoa, background: '#fff', textTransform: 'uppercase' }} />
                <button onClick={applyPromo} className="sk-press" style={{ padding: '0 20px', borderRadius: 14, border: 'none', background: C.cocoa, color: C.cream, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Apply</button>
              </div>
              {promoError && <div style={{ fontSize: 12, color: C.danger, marginTop: 7, marginLeft: 4 }}>{promoError}</div>}
            </div>
          )}

          <div className="sk-display" style={{ fontSize: 16, fontWeight: 600, color: C.cocoa, margin: '22px 0 12px' }}>Notes for merchant <span style={{ fontWeight: 400, fontSize: 12, color: C.latte }}>(optional)</span></div>
          <textarea className="sk-input" value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} placeholder="e.g. no nuts please, arriving around 7pm…" rows={2} style={{ width: '100%', padding: '13px 15px', borderRadius: 14, border: `1px solid ${C.parchment}`, outline: 'none', fontSize: 13.5, color: C.cocoa, background: '#fff', resize: 'none' }} />

          <div style={{ marginTop: 22, padding: 16, borderRadius: 18, background: '#fff', border: `1px solid ${C.parchment}` }}>
            <Row label={`Subtotal (${qty} bag${qty > 1 ? 's' : ''})`} value={idr(subtotal())} />
            {promoApplied && <Row label="Promo discount" value={'– ' + idr(promoCut())} green />}
            <Row label="Service fee" value={idr(serviceFee())} />
            <div style={{ height: 1, background: C.parchment, margin: '10px 0' }} />
            <Row label="Total" value={idr(total())} bold />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, fontSize: 11.5, color: C.sage }}>
              <Leaf size={13} /> You’re saving {idr(bag.original * qty - subtotal() + promoCut())} & ~{(1.3 * qty).toFixed(1)}kg CO₂
            </div>
          </div>
        </div>

        <div className="sk-glass-strong" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 20px 26px', borderRadius: '24px 24px 0 0' }}>
          <CTA icon={<ShieldCheck size={18} />} onClick={placeOrder}>Pay {idr(total())}</CTA>
        </div>
      </div>
    );
  };

  /* ======================= SUCCESS ======================= */
  const renderSuccess = () => {
    const o = lastOrder;
    if (!o) return null;
    return (
      <div className="sk-grain" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: `radial-gradient(120% 80% at 50% 0%, ${C.coffee} 0%, ${C.cocoa} 70%)` }}>
        <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', padding: '60px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="sk-pop" style={{ width: 88, height: 88, borderRadius: '50%', background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, display: 'grid', placeItems: 'center', boxShadow: '0 16px 40px rgba(189,155,63,0.4)' }}>
            <Check size={46} color={C.espresso} strokeWidth={2.4} />
          </div>
          <div className="sk-fadeup" style={{ animationDelay: '0.15s' }}>
            <div className="sk-display" style={{ fontSize: 28, fontWeight: 600, color: C.cream, marginTop: 22 }}>Bag reserved!</div>
            <div className="sk-serif" style={{ fontSize: 16, fontStyle: 'italic', color: C.sand, marginTop: 4 }}>One more meal saved from the bin 🌍</div>
          </div>

          <div className="sk-fadeup" style={{ animationDelay: '0.3s', width: '100%', background: C.cream, borderRadius: 28, marginTop: 28, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
            <div style={{ padding: '22px 22px 16px' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.latte }}>Show this code at pickup</div>
              <div className="sk-display sk-gold-text" style={{ fontSize: 52, fontWeight: 700, letterSpacing: '0.16em', lineHeight: 1.1, marginTop: 6 }}>{o.code}</div>
            </div>
            <div style={{ position: 'relative', height: 26 }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: `2px dashed ${C.sand}` }} />
              <div style={{ position: 'absolute', top: '50%', left: -13, transform: 'translateY(-50%)', width: 26, height: 26, borderRadius: '50%', background: C.cocoa }} />
              <div style={{ position: 'absolute', top: '50%', right: -13, transform: 'translateY(-50%)', width: 26, height: 26, borderRadius: '50%', background: C.cocoa }} />
            </div>
            <div style={{ padding: '16px 22px 22px', textAlign: 'left' }}>
              <TicketRow icon={<Store size={15} color={C.mocha} />} label="Merchant" value={o.bag.merchant} />
              <TicketRow icon={<Clock size={15} color={C.mocha} />} label="Pickup window" value={`Today · ${o.bag.windowLabel}`} />
              <TicketRow icon={<MapPin size={15} color={C.mocha} />} label="Location" value={`${o.bag.area}, Jakarta Selatan`} />
              <TicketRow icon={<Wallet size={15} color={C.mocha} />} label="Paid" value={idr(o.total)} />
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                <FauxQR seed={o.code} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 24px 36px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={() => { setOrderTab('active'); go('orders'); }} className="sk-press" style={{ width: '100%', padding: 15, borderRadius: 15, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: C.espresso, fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <ShoppingBag size={18} /> View my orders
          </button>
          <button onClick={() => go('home')} style={{ width: '100%', padding: 13, borderRadius: 15, border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', background: 'transparent', color: C.sand, fontSize: 14, fontWeight: 500 }}>
            Keep browsing
          </button>
        </div>
      </div>
    );
  };

  /* ======================= ORDERS ======================= */
  const renderOrderCard = (o) => {
    const active = o.status === 'confirmed' || o.status === 'ready';
    const cd = countdownTo(o.bag.pickupEnd);
    const closing = active && cd !== 'closed' && !cd.includes('h');
    return (
      <div key={o.id} onClick={() => setActiveOrderDetail(o)} className="sk-fadeup sk-card" style={{ borderRadius: 18, background: '#fff', border: `1px solid ${C.parchment}`, marginBottom: 14, overflow: 'hidden', cursor: 'pointer' }}>
        <div style={{ display: 'flex', gap: 12, padding: 14 }}>
          <div style={{ width: 60, height: 60, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}><BagImage bag={o.bag} h={60} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <div className="sk-display" style={{ fontSize: 15.5, fontWeight: 600, color: C.cocoa, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.bag.merchant}</div>
              <StatusBadge status={o.status} />
            </div>
            <div style={{ fontSize: 11.5, color: C.latte, marginTop: 3 }}>#{o.id} · {o.qty} bag{o.qty > 1 ? 's' : ''} · {idr(o.total)}</div>
            {active ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, background: closing ? 'rgba(209,74,63,0.12)' : C.parchment }}>
                  <Clock size={12} color={closing ? C.danger : C.mocha} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: closing ? C.danger : C.mocha }}>{cd === 'closed' ? 'Window closed' : `${cd} to collect`}</span>
                </div>
                <span style={{ fontSize: 11, color: C.latte }}>· {o.bag.windowLabel}</span>
              </div>
            ) : o.status === 'completed' ? (
              o.rating ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 8 }}>
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={13} fill={s <= o.rating ? C.gold : 'none'} color={s <= o.rating ? C.gold : C.sand} />)}
                  <span style={{ fontSize: 11.5, color: C.latte, marginLeft: 4 }}>You rated this</span>
                </div>
              ) : (
                <button onClick={(e) => { e.stopPropagation(); setRateTarget(o); setRatingStars(0); setRatingText(''); }} className="sk-press" style={{ marginTop: 8, padding: '6px 12px', borderRadius: 999, border: `1px solid ${C.gold}`, background: 'rgba(189,155,63,0.08)', color: '#9c7a1f', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                  ★ Rate your bag
                </button>
              )
            ) : (
              <div style={{ fontSize: 11.5, color: C.latte, marginTop: 8 }}>Cancelled · refunded to {PAYMENTS.find((p) => p.id === o.payment)?.name}</div>
            )}
          </div>
        </div>
        {o.status === 'ready' && (
          <div style={{ padding: '10px 14px', background: 'rgba(189,155,63,0.1)', borderTop: `1px solid ${C.parchment}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: '#9c7a1f', fontWeight: 600 }}>Pickup code</span>
            <span className="sk-display" style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.12em', color: C.cocoa }}>{o.code}</span>
          </div>
        )}
      </div>
    );
  };

  const renderOrders = () => {
    const list = orderTab === 'active' ? activeOrders : pastOrders;
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'transparent' }}>
        <div style={{ padding: '52px 20px 0', background: C.cream }}>
          <div className="sk-display" style={{ fontSize: 26, fontWeight: 600, color: C.cocoa }}>My Orders</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, background: C.parchment, borderRadius: 14, padding: 5 }}>
            {[['active', `Active (${activeOrders.length})`], ['past', `History (${pastOrders.length})`]].map(([k, label]) => (
              <button key={k} onClick={() => setOrderTab(k)} className="sk-press" style={{ flex: 1, padding: 10, borderRadius: 10, border: 'none', cursor: 'pointer', background: orderTab === k ? '#fff' : 'transparent', color: orderTab === k ? C.cocoa : C.latte, fontSize: 13.5, fontWeight: 600, boxShadow: orderTab === k ? '0 2px 6px rgba(28,23,18,0.08)' : 'none' }}>{label}</button>
            ))}
          </div>
        </div>
        <div className="sk-noscroll" onScroll={handleScroll} style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 100px' }}>
          {list.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '70px 20px', color: C.latte }}>
              <div style={{ fontSize: 52, marginBottom: 14 }}>{orderTab === 'active' ? '\u{1F6CD}\u{FE0F}' : '\u{1F4DC}'}</div>
              <div className="sk-display" style={{ fontSize: 18, color: C.cocoa, marginBottom: 5 }}>{orderTab === 'active' ? 'No active orders' : 'No past orders yet'}</div>
              <div style={{ fontSize: 13, marginBottom: 18 }}>{orderTab === 'active' ? 'Reserve a bag and it\u2019ll appear here.' : 'Your rescued bags will be archived here.'}</div>
              <button onClick={() => go('home')} className="sk-press" style={{ padding: '11px 22px', borderRadius: 999, border: 'none', background: C.cocoa, color: C.cream, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Browse bags</button>
            </div>
          ) : list.map((o) => renderOrderCard(o))}
        </div>
      </div>
    );
  };

  const renderOrderDetail = () => {
    const o = activeOrderDetail;
    if (!o) return null;
    const active = o.status === 'confirmed' || o.status === 'ready';
    return (
      <div className="sk-fade" style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'rgba(20,16,12,0.35)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', display: 'flex', alignItems: 'flex-end' }} onClick={() => setActiveOrderDetail(null)}>
        <div className="sk-slideup sk-noscroll sk-glass-strong" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxHeight: '88%', overflowY: 'auto', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: '10px 20px 30px' }}>
          <div style={{ width: 40, height: 5, borderRadius: 999, background: C.sand, margin: '6px auto 16px' }} />
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, overflow: 'hidden' }}><BagImage bag={o.bag} h={56} /></div>
            <div style={{ flex: 1 }}>
              <div className="sk-display" style={{ fontSize: 18, fontWeight: 600, color: C.cocoa }}>{o.bag.merchant}</div>
              <div style={{ fontSize: 12, color: C.latte }}>#{o.id}</div>
            </div>
            <StatusBadge status={o.status} />
          </div>

          {active && (
            <div style={{ marginTop: 18, padding: 20, borderRadius: 18, background: `linear-gradient(135deg, ${C.cocoa}, ${C.coffee})`, textAlign: 'center' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.sand }}>Pickup code</div>
              <div className="sk-display sk-gold-text" style={{ fontSize: 44, fontWeight: 700, letterSpacing: '0.16em', marginTop: 4 }}>{o.code}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6, padding: '5px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.1)' }}>
                <Clock size={13} color={C.goldLight} />
                <span style={{ fontSize: 12.5, color: C.goldLight, fontWeight: 600 }}>{countdownTo(o.bag.pickupEnd)} until window closes</span>
              </div>
            </div>
          )}

          <div style={{ marginTop: 18, padding: 16, borderRadius: 16, background: '#fff', border: `1px solid ${C.parchment}` }}>
            <TicketRow icon={<Clock size={15} color={C.mocha} />} label="Pickup" value={`Today · ${o.bag.windowLabel}`} />
            <TicketRow icon={<MapPin size={15} color={C.mocha} />} label="Address" value={`${o.bag.area}, Jak-Sel`} />
            <TicketRow icon={<ShoppingBag size={15} color={C.mocha} />} label="Order" value={`${o.qty} surprise bag${o.qty > 1 ? 's' : ''}`} />
            <TicketRow icon={<Wallet size={15} color={C.mocha} />} label="Total paid" value={idr(o.total)} />
            {o.notes ? <TicketRow icon={<Tag size={15} color={C.mocha} />} label="Your note" value={o.notes} /> : null}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button onClick={() => setToast({ icon: '\u{1F4DE}', text: 'Calling merchant…' })} className="sk-press" style={{ flex: 1, padding: 13, borderRadius: 14, border: `1px solid ${C.sand}`, background: '#fff', color: C.cocoa, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
              <Phone size={16} /> Call
            </button>
            <button onClick={() => { setActiveOrderDetail(null); setMapSelected(o.bag); go('map'); }} className="sk-press" style={{ flex: 1, padding: 13, borderRadius: 14, border: `1px solid ${C.sand}`, background: '#fff', color: C.cocoa, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
              <Navigation size={16} /> Directions
            </button>
          </div>

          {active && (
            <button onClick={() => setCancelTarget(o)} style={{ width: '100%', marginTop: 10, padding: 13, borderRadius: 14, border: 'none', background: 'transparent', color: C.danger, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Cancel order</button>
          )}
          {o.status === 'completed' && !o.rating && (
            <button onClick={() => { setActiveOrderDetail(null); setRateTarget(o); }} className="sk-press" style={{ width: '100%', marginTop: 14, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
              <div style={{ padding: 14, borderRadius: 14, background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: C.espresso, fontSize: 14, fontWeight: 700, textAlign: 'center' }}>★ Rate your experience</div>
            </button>
          )}
        </div>
      </div>
    );
  };

  /* ======================= PROFILE ======================= */
  const renderProfile = () => {
    const weekly = [2, 1, 3, 2, 4, 3, 5];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const maxW = Math.max(...weekly);
    const nextTier = 20;
    const progress = Math.min(100, (stats.rescued / nextTier) * 100);
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'transparent' }}>
        <div className="sk-noscroll" onScroll={handleScroll} style={{ flex: 1, overflowY: 'auto', paddingBottom: 100 }}>
          <div style={{ padding: '58px 20px 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: 999, background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, display: 'grid', placeItems: 'center', fontSize: 26, fontWeight: 700, color: C.espresso, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.45), 0 6px 16px rgba(189,155,63,0.3)' }}>A</div>
              <div>
                <div className="sk-display" style={{ fontSize: 26, fontWeight: 700, color: C.cocoa, letterSpacing: '-0.02em' }}>Arthur</div>
                <div style={{ fontSize: 13, color: C.latte, marginTop: 1 }}>arthur@binus.ac.id</div>
                <Pill bg="rgba(189,155,63,0.14)" color={C.caramel} style={{ marginTop: 6 }}><Award size={11} /> Food Hero · Level 2</Pill>
              </div>
            </div>
          </div>

          <div style={{ padding: 20 }}>
            <div className="sk-fadeup" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <ImpactCard icon={<ShoppingBag size={18} color={C.gold} />} value={stats.rescued} label="Bags rescued" tint="rgba(189,155,63,0.1)" />
              <ImpactCard icon={<Wallet size={18} color={C.sage} />} value={idr(stats.saved)} label="Total saved" tint="rgba(62,124,83,0.1)" />
              <ImpactCard icon={<Leaf size={18} color={C.sage} />} value={stats.co2 + ' kg'} label="CO\u2082 prevented" tint="rgba(62,124,83,0.1)" />
              <ImpactCard icon={<Sparkles size={18} color={C.caramel} />} value={stats.meals} label="Meals saved" tint="rgba(139,101,72,0.1)" />
            </div>

            <div className="sk-fadeup" style={{ marginTop: 16, padding: 18, borderRadius: 18, background: '#fff', border: `1px solid ${C.parchment}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: C.cocoa }}>Progress to Level 3</div>
                  <div style={{ fontSize: 11.5, color: C.latte }}>{nextTier - stats.rescued} more rescues to “Food Guardian”</div>
                </div>
                <Award size={26} color={C.gold} />
              </div>
              <div style={{ height: 10, borderRadius: 999, background: C.parchment, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, borderRadius: 999, background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`, animation: 'skBar 1s ease' }} />
              </div>
            </div>

            <div className="sk-fadeup" style={{ marginTop: 16, padding: 18, borderRadius: 18, background: '#fff', border: `1px solid ${C.parchment}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div className="sk-display" style={{ fontSize: 15, fontWeight: 600, color: C.cocoa }}>This week</div>
                <Pill bg="rgba(62,124,83,0.12)" color={C.sage}><TrendingUp size={11} /> +18%</Pill>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 90, gap: 8 }}>
                {weekly.map((v, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: '100%', height: `${(v / maxW) * 70}px`, borderRadius: 8, background: i === weekly.length - 1 ? `linear-gradient(180deg, ${C.gold}, ${C.goldLight})` : C.parchment, transition: 'height 0.5s ease' }} />
                    <span style={{ fontSize: 10.5, color: C.latte }}>{days[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sk-fadeup" style={{ marginTop: 16, borderRadius: 18, background: '#fff', border: `1px solid ${C.parchment}`, overflow: 'hidden' }}>
              {[
                { icon: <Gift size={17} color={C.gold} />, label: 'Invite & earn', badge: 0, go: 'referral' },
                { icon: <Heart size={17} color={C.mocha} />, label: 'Favourite merchants', badge: favorites.length },
                { icon: <Wallet size={17} color={C.mocha} />, label: 'Payment methods', badge: 0 },
                { icon: <Bell size={17} color={C.mocha} />, label: 'Notifications', badge: unreadCount, go: 'notifications' },
                { icon: <Leaf size={17} color={C.mocha} />, label: 'Dietary preferences', badge: 0 },
                { icon: <ShieldCheck size={17} color={C.mocha} />, label: 'Help & support', badge: 0 },
              ].map((item, i, arr) => (
                <button key={i} onClick={() => item.go ? go(item.go) : setToast({ icon: '\u2699\uFE0F', text: item.label })} className="sk-press" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 13, padding: '15px 18px', border: 'none', borderBottom: i < arr.length - 1 ? `1px solid ${C.parchment}` : 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
                  {item.icon}
                  <span style={{ flex: 1, fontSize: 14, color: C.cocoa, fontWeight: 500 }}>{item.label}</span>
                  {item.badge ? <span style={{ minWidth: 20, height: 20, padding: '0 6px', borderRadius: 999, background: C.gold, color: C.espresso, fontSize: 11, fontWeight: 700, display: 'grid', placeItems: 'center' }}>{item.badge}</span> : null}
                  <ChevronRight size={18} color={C.sand} />
                </button>
              ))}
            </div>

            <button onClick={() => { setRole('merchant'); setMScreen('mDash'); }} className="sk-press" style={{ width: '100%', marginTop: 16, padding: 16, borderRadius: 16, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg, ${C.cocoa}, ${C.coffee})`, color: C.cream, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, boxShadow: '0 10px 24px rgba(28,23,18,0.22)' }}>
              <Store size={18} color={C.goldLight} /> I’m a merchant — open dashboard
            </button>
            <button onClick={() => { setOnboardStep(0); setScreen('onboarding'); }} style={{ width: '100%', marginTop: 10, padding: 14, borderRadius: 14, border: `1px solid ${C.sand}`, background: 'transparent', color: C.latte, fontSize: 13.5, fontWeight: 500, cursor: 'pointer' }}>Replay intro</button>
          </div>
        </div>
      </div>
    );
  };

  /* ======================= NOTIFICATIONS ======================= */
  const renderNotifications = () => {
    const iconFor = (t) => {
      const map = {
        deal: { i: <Tag size={17} color={C.gold} />, bg: 'rgba(189,155,63,0.12)' },
        reminder: { i: <Clock size={17} color={C.danger} />, bg: 'rgba(209,74,63,0.1)' },
        impact: { i: <Leaf size={17} color={C.sage} />, bg: 'rgba(62,124,83,0.12)' },
        new: { i: <Store size={17} color={C.caramel} />, bg: 'rgba(139,101,72,0.12)' },
      };
      return map[t] || map.deal;
    };
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'transparent' }}>
        <TopBar title="Notifications" onBack={() => go(prevScreen === 'profile' ? 'profile' : 'home')} right={unreadCount > 0 ? <button onClick={markAllRead} style={{ border: 'none', background: 'none', color: C.gold, fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>Mark all read</button> : null} />
        <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', padding: '14px 18px 100px' }}>
          {notifications.map((n, i) => {
            const ic = iconFor(n.type);
            return (
              <div key={n.id} onClick={() => setNotifications((p) => p.map((x) => x.id === n.id ? { ...x, read: true } : x))} className="sk-fadeup" style={{ animationDelay: `${i * 0.05}s`, display: 'flex', gap: 12, padding: 14, borderRadius: 16, marginBottom: 10, background: n.read ? '#fff' : 'rgba(189,155,63,0.06)', border: `1px solid ${n.read ? C.parchment : 'rgba(189,155,63,0.3)'}`, cursor: 'pointer', position: 'relative' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: ic.bg, display: 'grid', placeItems: 'center', flexShrink: 0 }}>{ic.i}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: C.cocoa, lineHeight: 1.3 }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: C.latte, marginTop: 3, lineHeight: 1.4 }}>{n.body}</div>
                  <div style={{ fontSize: 11, color: C.sand, marginTop: 5 }}>{n.time}</div>
                </div>
                {!n.read && <span style={{ position: 'absolute', top: 16, right: 14, width: 8, height: 8, borderRadius: 999, background: C.gold }} />}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /* ======================= FILTERS SHEET ======================= */
  const renderFilters = () => (
    <div className="sk-fade" style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'rgba(20,16,12,0.35)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', display: 'flex', alignItems: 'flex-end' }} onClick={() => setShowFilters(false)}>
      <div className="sk-slideup sk-glass-strong" onClick={(e) => e.stopPropagation()} style={{ width: '100%', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: '10px 22px 30px' }}>
        <div style={{ width: 40, height: 5, borderRadius: 999, background: C.sand, margin: '6px auto 18px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="sk-display" style={{ fontSize: 20, fontWeight: 600, color: C.cocoa }}>Filters</div>
          <button onClick={() => { setMaxPrice(60000); setActiveCategory('All'); setSortBy('recommended'); }} style={{ border: 'none', background: 'none', color: C.gold, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Reset</button>
        </div>

        <div style={{ fontSize: 13.5, fontWeight: 600, color: C.cocoa, margin: '20px 0 12px' }}>Category</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => {
            const on = activeCategory === cat;
            return <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '9px 16px', borderRadius: 999, border: on ? 'none' : `1px solid ${C.sand}`, background: on ? C.cocoa : 'rgba(255,255,255,0.6)', color: on ? C.cream : C.mocha, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{cat}</button>;
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '24px 0 12px' }}>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: C.cocoa }}>Max price</span>
          <span className="sk-display" style={{ fontSize: 15, fontWeight: 700, color: C.gold }}>{idr(maxPrice)}</span>
        </div>
        <input type="range" min={20000} max={60000} step={1000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: '100%', accentColor: C.gold }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.latte, marginTop: 4 }}>
          <span>Rp 20.000</span><span>Rp 60.000</span>
        </div>

        <div style={{ marginTop: 28 }}>
          <CTA onClick={() => setShowFilters(false)}>Show {filteredBags().length} results</CTA>
        </div>
      </div>
    </div>
  );

  /* ======================= MODALS ======================= */
  const renderCancelModal = () => (
    <div className="sk-fade" style={{ position: 'absolute', inset: 0, zIndex: 50, background: 'rgba(20,16,12,0.4)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', display: 'grid', placeItems: 'center', padding: 28 }} onClick={() => setCancelTarget(null)}>
      <div className="sk-scalein sk-glass-strong" onClick={(e) => e.stopPropagation()} style={{ width: '100%', borderRadius: 28, padding: 26, textAlign: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(209,74,63,0.12)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
          <X size={28} color={C.danger} />
        </div>
        <div className="sk-display" style={{ fontSize: 20, fontWeight: 600, color: C.cocoa }}>Cancel this order?</div>
        <div style={{ fontSize: 13.5, color: C.latte, marginTop: 8, lineHeight: 1.5 }}>You’ll be refunded {idr(cancelTarget?.total || 0)} to your {PAYMENTS.find((p) => p.id === cancelTarget?.payment)?.name}. This bag will be released for others to rescue.</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
          <button onClick={() => setCancelTarget(null)} style={{ flex: 1, padding: 14, borderRadius: 14, border: `1px solid ${C.sand}`, background: '#fff', color: C.cocoa, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Keep order</button>
          <button onClick={() => cancelOrder(cancelTarget.id)} style={{ flex: 1, padding: 14, borderRadius: 14, border: 'none', background: C.danger, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel it</button>
        </div>
      </div>
    </div>
  );

  const renderRateModal = () => (
    <div className="sk-fade" style={{ position: 'absolute', inset: 0, zIndex: 50, background: 'rgba(20,16,12,0.4)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', display: 'grid', placeItems: 'center', padding: 28 }} onClick={() => setRateTarget(null)}>
      <div className="sk-scalein sk-glass-strong" onClick={(e) => e.stopPropagation()} style={{ width: '100%', borderRadius: 28, padding: 26 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40 }}>{rateTarget?.bag.emoji}</div>
          <div className="sk-display" style={{ fontSize: 20, fontWeight: 600, color: C.cocoa, marginTop: 6 }}>Rate {rateTarget?.bag.merchant}</div>
          <div style={{ fontSize: 13, color: C.latte, marginTop: 4 }}>How was your rescued bag?</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, margin: '20px 0' }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} onClick={() => setRatingStars(s)} className="sk-press" style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
              <Star size={36} fill={s <= ratingStars ? C.gold : 'none'} color={s <= ratingStars ? C.gold : C.sand} />
            </button>
          ))}
        </div>
        <textarea className="sk-input" value={ratingText} onChange={(e) => setRatingText(e.target.value)} placeholder="Share a few words (optional)…" rows={3} style={{ width: '100%', padding: 14, borderRadius: 14, border: `1px solid ${C.parchment}`, outline: 'none', fontSize: 13.5, color: C.cocoa, background: '#fff', resize: 'none' }} />
        <div style={{ marginTop: 18 }}>
          <CTA disabled={ratingStars === 0} onClick={submitRating}>Submit review</CTA>
        </div>
      </div>
    </div>
  );

  const renderToast = () => (
    <div className="sk-fadeup sk-glass-dark" style={{ position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderRadius: 999, color: '#fff', fontSize: 13.5, fontWeight: 500, whiteSpace: 'nowrap' }}>
      <span style={{ fontSize: 16 }}>{toast.icon}</span> {toast.text}
    </div>
  );

  /* ======================= BOTTOM NAV ======================= */
  const NAV = [
    { id: 'home', icon: HomeIcon, label: 'Browse' },
    { id: 'map', icon: MapIcon, label: 'Map' },
    { id: 'orders', icon: ShoppingBag, label: 'Orders' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const renderBottomNav = () => {
    if (!['home', 'map', 'orders', 'profile'].includes(screen)) return null;
    // map screen has its own card; no shrink there
    const shrink = navShrunk && screen !== 'map';
    const shrunkW = NAV.length * 46 + 12; // icon-only width
    // px -> px width transition is smooth; 'auto'/'100%' is not. Fall back to '100%' only until measured.
    const barWidth = shrink ? shrunkW : (navFullW > 0 ? navFullW : '100%');
    const ease = 'cubic-bezier(0.32,0.72,0,1)';
    return (
      <div ref={navWrapRef} style={{ position: 'absolute', bottom: 22, left: 0, right: 0, zIndex: 30, display: 'flex', justifyContent: 'center', padding: '0 16px', pointerEvents: 'none' }}>
        <div className="sk-glass-strong" style={{ display: 'flex', padding: 6, borderRadius: 999, width: barWidth, overflow: 'hidden', pointerEvents: 'auto', willChange: 'width', transition: `width 0.5s ${ease}` }}>
          {NAV.map((item) => {
            const on = screen === item.id;
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => go(item.id)} className="sk-press" style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, height: 46, border: 'none', background: on ? 'rgba(189,155,63,0.16)' : 'transparent', borderRadius: 999, cursor: 'pointer', position: 'relative', transition: `background 0.4s ${ease}` }}>
                <Icon size={21} color={on ? C.caramel : C.latte} strokeWidth={on ? 2.4 : 1.9} />
                <span style={{ fontSize: 10, fontWeight: on ? 700 : 500, color: on ? C.cocoa : C.latte, letterSpacing: '-0.01em', maxHeight: shrink ? 0 : 13, opacity: shrink ? 0 : 1, overflow: 'hidden', whiteSpace: 'nowrap', willChange: 'max-height, opacity', transition: `max-height 0.5s ${ease}, opacity 0.3s ease` }}>{item.label}</span>
                {item.id === 'orders' && activeOrders.length > 0 && (
                  <span style={{ position: 'absolute', top: 3, right: shrink ? 8 : '50%', marginRight: shrink ? 0 : -18, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999, background: C.danger, color: '#fff', fontSize: 9.5, fontWeight: 700, display: 'grid', placeItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: `right 0.5s ${ease}, margin-right 0.5s ${ease}` }}>{activeOrders.length}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  /* ======================= REFERRAL ======================= */
  const renderReferral = () => (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'transparent' }}>
      <TopBar title="Invite & earn" onBack={() => go('profile')} />
      <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', padding: '0 0 40px' }}>
        {/* Hero */}
        <div className="sk-grain" style={{ padding: '28px 24px 32px', background: `linear-gradient(150deg, ${C.cocoa}, ${C.coffee})`, textAlign: 'center', position: 'relative' }}>
          <div className="sk-float" style={{ fontSize: 64, marginBottom: 8 }}>🎁</div>
          <div className="sk-display" style={{ fontSize: 26, fontWeight: 600, color: C.cream, lineHeight: 1.15 }}>Give Rp 25.000,<br />get Rp 25.000</div>
          <div className="sk-serif" style={{ fontSize: 15, fontStyle: 'italic', color: C.goldLight, marginTop: 8 }}>When a friend rescues their first bag, you both win.</div>
        </div>

        <div style={{ padding: '24px 20px' }}>
          {/* Referral code */}
          <div style={{ fontSize: 13, fontWeight: 600, color: C.cocoa, marginBottom: 8 }}>Your invite code</div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <div className="sk-glass" style={{ flex: 1, padding: '16px 18px', borderRadius: 18, border: `2px dashed ${C.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="sk-display sk-gold-text" style={{ fontSize: 24, fontWeight: 700, letterSpacing: '0.18em' }}>ARTHUR25</span>
            </div>
            <button onClick={() => setToast({ icon: '\u{1F4CB}', text: 'Code copied to clipboard' })} className="sk-press" style={{ padding: '0 20px', borderRadius: 14, border: 'none', background: C.cocoa, color: C.cream, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Copy</button>
          </div>

          {/* Share buttons */}
          <button onClick={() => setToast({ icon: '\u{1F4F2}', text: 'Opening WhatsApp share…' })} className="sk-press" style={{ width: '100%', padding: 15, borderRadius: 14, border: 'none', cursor: 'pointer', background: '#25D366', color: '#fff', fontSize: 14.5, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, marginBottom: 10 }}>
            <Share2 size={18} /> Share on WhatsApp
          </button>
          <button onClick={() => setToast({ icon: '\u{1F517}', text: 'Invite link copied' })} className="sk-press" style={{ width: '100%', padding: 15, borderRadius: 14, border: `1px solid ${C.sand}`, cursor: 'pointer', background: '#fff', color: C.cocoa, fontSize: 14.5, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, marginBottom: 24 }}>
            <Navigation size={18} /> Copy invite link
          </button>

          {/* Progress */}
          <div style={{ padding: 18, borderRadius: 18, background: '#fff', border: `1px solid ${C.parchment}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div className="sk-display" style={{ fontSize: 15, fontWeight: 600, color: C.cocoa }}>Your referrals</div>
              <Pill bg="rgba(189,155,63,0.15)" color="#9c7a1f"><Wallet size={11} /> Rp 75.000 earned</Pill>
            </div>
            {[
              { n: 'Cherie W.', s: 'Joined & rescued', done: true },
              { n: 'Andre P.', s: 'Joined & rescued', done: true },
              { n: 'Maya S.', s: 'Joined & rescued', done: true },
              { n: 'Invited — not yet joined', s: 'Pending', done: false },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 3 ? `1px solid ${C.parchment}` : 'none' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: r.done ? 'rgba(62,124,83,0.15)' : C.parchment, display: 'grid', placeItems: 'center' }}>
                  {r.done ? <Check size={16} color={C.sage} /> : <Clock size={16} color={C.latte} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: r.done ? C.cocoa : C.latte }}>{r.n}</div>
                  <div style={{ fontSize: 11.5, color: r.done ? C.sage : C.latte }}>{r.s}</div>
                </div>
                {r.done && <span style={{ fontSize: 13, fontWeight: 700, color: C.sage }}>+Rp 25k</span>}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 16, padding: '12px 14px', borderRadius: 12, background: 'rgba(62,124,83,0.1)' }}>
            <Leaf size={15} color={C.sage} />
            <span style={{ fontSize: 12, color: C.sage, fontWeight: 500 }}>Every friend you bring rescues ~60 meals a year. Spread the word.</span>
          </div>
        </div>
      </div>
    </div>
  );

  /* ============================================================
     MERCHANT SIDE — dashboard, listings, create, orders, scan
     ============================================================ */

  // Shared merchant top bar with brand + role pill
  const mTopBar = (title, subtitle) => (
    <div style={{ padding: '58px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <Pill bg="rgba(189,155,63,0.14)" color={C.caramel}><Store size={11} /> Merchant</Pill>
        <div className="sk-display" style={{ fontSize: 28, fontWeight: 700, color: C.cocoa, marginTop: 8, lineHeight: 1.05, letterSpacing: '-0.03em' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 14, color: C.latte, marginTop: 4 }}>{subtitle}</div>}
      </div>
      <button onClick={() => { setRole('consumer'); setScreen('home'); }} className="sk-press sk-glass" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px', borderRadius: 999, color: C.cocoa, fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>
        <Heart size={13} /> Shopper
      </button>
    </div>
  );

  // ---- Merchant Dashboard ----
  const renderMDash = () => (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'transparent' }}>
      {mTopBar('Sourdough Project', 'Good evening — let\u2019s rescue tonight')}
      <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 100px' }}>
        {/* Today snapshot */}
        <div className="sk-fadeup" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <ImpactCard icon={<ShoppingBag size={18} color={C.gold} />} value={mBagsSoldToday + '/' + mBagsListedToday} label="Bags sold today" tint="rgba(189,155,63,0.1)" />
          <ImpactCard icon={<Wallet size={18} color={C.sage} />} value={idr(mNetToday)} label="Net earnings today" tint="rgba(62,124,83,0.1)" />
          <ImpactCard icon={<Clock size={18} color={C.caramel} />} value={mPendingPickups} label="Pickups pending" tint="rgba(139,101,72,0.1)" />
          <ImpactCard icon={<Leaf size={18} color={C.sage} />} value={(mBagsSoldToday * 1.3).toFixed(1) + 'kg'} label="CO\u2082 saved today" tint="rgba(62,124,83,0.1)" />
        </div>

        {/* Earnings explainer */}
        <div className="sk-fadeup" style={{ marginTop: 16, padding: 16, borderRadius: 18, background: '#fff', border: `1px solid ${C.parchment}` }}>
          <div className="sk-display" style={{ fontSize: 15, fontWeight: 600, color: C.cocoa, marginBottom: 12 }}>Today’s earnings breakdown</div>
          <Row label="Gross sales" value={idr(mRevenueToday)} />
          <Row label={`SisaKu commission (${Math.round(mCommissionRate * 100)}%)`} value={'\u2013 ' + idr(mRevenueToday * mCommissionRate)} />
          <div style={{ height: 1, background: C.parchment, margin: '10px 0' }} />
          <Row label="You receive" value={idr(mNetToday)} bold />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, fontSize: 11.5, color: C.sage }}>
            <Sparkles size={13} /> Plus {idr(mBagsSoldToday * 33000)} of food cost saved from the bin
          </div>
        </div>

        {/* Quick actions */}
        <div className="sk-fadeup" style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <button onClick={() => mGo('mCreate')} className="sk-press" style={{ flex: 1, padding: '16px 12px', borderRadius: 16, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg, ${C.cocoa}, ${C.coffee})`, color: C.cream, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, boxShadow: '0 10px 24px rgba(28,23,18,0.22)' }}>
            <Plus size={22} color={C.goldLight} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>List a bag</span>
          </button>
          <button onClick={() => mGo('mScan')} className="sk-press" style={{ flex: 1, padding: '16px 12px', borderRadius: 16, border: `1px solid ${C.sand}`, cursor: 'pointer', background: '#fff', color: C.cocoa, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={22} color={C.gold} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>Verify pickup</span>
          </button>
        </div>

        {/* Pending pickups preview */}
        <div className="sk-fadeup" style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div className="sk-display" style={{ fontSize: 16, fontWeight: 600, color: C.cocoa }}>Awaiting pickup</div>
            <button onClick={() => mGo('mOrders')} style={{ border: 'none', background: 'none', color: C.gold, fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>See all</button>
          </div>
          {mOrders.filter((o) => o.status === 'awaiting').map((o) => (
            <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16, background: '#fff', border: `1px solid ${C.parchment}`, marginBottom: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(189,155,63,0.12)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Clock size={18} color="#9c7a1f" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.cocoa }}>{o.customer}</div>
                <div style={{ fontSize: 12, color: C.latte, marginTop: 1 }}>{o.items} · {idr(o.total)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: C.latte }}>Code</div>
                <div className="sk-display" style={{ fontSize: 17, fontWeight: 700, letterSpacing: '0.1em', color: C.cocoa }}>{o.code}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ---- Merchant Listings ----
  const renderMListings = () => (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'transparent' }}>
      {mTopBar('My listings', 'Manage tonight\u2019s surprise bags')}
      <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 100px' }}>
        <button onClick={() => mGo('mCreate')} className="sk-press" style={{ width: '100%', padding: 14, borderRadius: 16, border: `2px dashed ${C.sand}`, background: '#fff', color: C.mocha, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
          <Plus size={18} /> New surprise bag
        </button>
        {mListings.map((l) => {
          const soldOut = l.sold >= l.qty;
          return (
            <div key={l.id} className="sk-fadeup" style={{ borderRadius: 18, background: '#fff', border: `1px solid ${C.parchment}`, marginBottom: 14, overflow: 'hidden', opacity: l.active ? 1 : 0.6 }}>
              <div style={{ display: 'flex', gap: 12, padding: 14 }}>
                <div style={{ width: 60, height: 60, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
                  <BagImage bag={l} h={60} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="sk-display" style={{ fontSize: 15.5, fontWeight: 600, color: C.cocoa }}>{l.title}</div>
                  <div style={{ fontSize: 12, color: C.latte, marginTop: 2 }}>{l.windowLabel} · {idr(l.price)}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                    <div style={{ flex: 1, height: 6, borderRadius: 999, background: C.parchment, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(l.sold / l.qty) * 100}%`, background: soldOut ? C.sage : `linear-gradient(90deg, ${C.gold}, ${C.goldLight})` }} />
                    </div>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: soldOut ? C.sage : C.mocha }}>{l.sold}/{l.qty} sold</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', borderTop: `1px solid ${C.parchment}` }}>
                <button onClick={() => mToggleListing(l.id)} className="sk-press" style={{ flex: 1, padding: '11px', border: 'none', background: 'transparent', color: l.active ? C.danger : C.sage, fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>
                  {l.active ? 'Pause' : 'Reactivate'}
                </button>
                <div style={{ width: 1, background: C.parchment }} />
                <div style={{ flex: 1, padding: '11px', textAlign: 'center', color: soldOut ? C.sage : C.latte, fontSize: 12.5, fontWeight: 600 }}>
                  {soldOut ? '✓ Sold out' : l.active ? 'Live now' : 'Paused'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ---- Merchant Create Bag ----
  const renderMCreate = () => {
    const discount = mForm.original > 0 ? Math.round((1 - mForm.price / mForm.original) * 100) : 0;
    const windows = ['17:00 – 19:00', '18:00 – 20:00', '19:00 – 21:00'];
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'transparent' }}>
        <TopBar title="List a surprise bag" onBack={() => mGo('mListings')} />
        <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 96px' }}>
          {/* Preview */}
          <div className="sk-fadeup" style={{ borderRadius: 18, overflow: 'hidden', background: '#fff', border: `1px solid ${C.parchment}`, marginBottom: 20 }}>
            <div style={{ position: 'relative' }}>
              <BagImage bag={{ emoji: '\u{1F9C1}', hue1: '#f0d9bd', hue2: '#caa063' }} h={110} />
              {discount > 0 && <div style={{ position: 'absolute', top: 10, left: 10 }}><Pill bg={`linear-gradient(135deg, ${C.cocoa}, ${C.coffee})`} color={C.goldLight}><Tag size={11} /> {discount}% off</Pill></div>}
            </div>
            <div style={{ padding: 14 }}>
              <div className="sk-display" style={{ fontSize: 16, fontWeight: 600, color: C.cocoa }}>{mForm.title || 'Your surprise bag'}</div>
              <div style={{ marginTop: 4 }}>
                <span style={{ fontSize: 12, color: C.sand, textDecoration: 'line-through', marginRight: 7 }}>{idr(mForm.original)}</span>
                <span className="sk-display" style={{ fontSize: 18, fontWeight: 700, color: C.cocoa }}>{idr(mForm.price)}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <label style={{ fontSize: 13, fontWeight: 600, color: C.cocoa, display: 'block', marginBottom: 8 }}>Bag name</label>
          <input className="sk-input" value={mForm.title} onChange={(e) => setMForm({ ...mForm, title: e.target.value })} placeholder="e.g. End-of-day Pastry Box" style={{ width: '100%', padding: '13px 15px', borderRadius: 14, border: `1px solid ${C.parchment}`, outline: 'none', fontSize: 14, color: C.cocoa, background: '#fff', marginBottom: 18 }} />

          <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.cocoa, display: 'block', marginBottom: 8 }}>How many bags?</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 14, padding: '8px 12px', border: `1px solid ${C.parchment}` }}>
                <button onClick={() => setMForm({ ...mForm, qty: Math.max(1, mForm.qty - 1) })} className="sk-press" style={{ width: 28, height: 28, borderRadius: 999, border: 'none', background: C.parchment, display: 'grid', placeItems: 'center', cursor: 'pointer', color: C.cocoa }}><Minus size={15} /></button>
                <span style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 700, color: C.cocoa }}>{mForm.qty}</span>
                <button onClick={() => setMForm({ ...mForm, qty: mForm.qty + 1 })} className="sk-press" style={{ width: 28, height: 28, borderRadius: 999, border: 'none', background: C.parchment, display: 'grid', placeItems: 'center', cursor: 'pointer', color: C.cocoa }}><Plus size={15} /></button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.cocoa, display: 'block', marginBottom: 8 }}>Original value</label>
              <input className="sk-input" type="number" value={mForm.original} onChange={(e) => setMForm({ ...mForm, original: Number(e.target.value) })} style={{ width: '100%', padding: '13px 15px', borderRadius: 14, border: `1px solid ${C.parchment}`, outline: 'none', fontSize: 14, color: C.cocoa, background: '#fff' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.cocoa, display: 'block', marginBottom: 8 }}>Bag price</label>
              <input className="sk-input" type="number" value={mForm.price} onChange={(e) => setMForm({ ...mForm, price: Number(e.target.value) })} style={{ width: '100%', padding: '13px 15px', borderRadius: 14, border: `1px solid ${C.gold}`, outline: 'none', fontSize: 14, color: C.cocoa, background: 'rgba(189,155,63,0.06)', fontWeight: 600 }} />
            </div>
          </div>

          <label style={{ fontSize: 13, fontWeight: 600, color: C.cocoa, display: 'block', marginBottom: 8 }}>Pickup window</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {windows.map((w) => {
              const on = mForm.window === w;
              return <button key={w} onClick={() => setMForm({ ...mForm, window: w })} className="sk-press" style={{ flex: 1, padding: '11px 6px', borderRadius: 12, border: on ? `2px solid ${C.gold}` : `1px solid ${C.parchment}`, background: on ? 'rgba(189,155,63,0.06)' : '#fff', color: C.cocoa, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{w}</button>;
            })}
          </div>

          {/* Earnings preview */}
          <div style={{ padding: 14, borderRadius: 16, background: 'rgba(62,124,83,0.1)', marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: C.sage }}>You earn per bag (after 15%)</span>
              <span style={{ fontWeight: 700, color: C.sage }}>{idr(mForm.price * 0.85)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 6 }}>
              <span style={{ color: C.sage }}>If all {mForm.qty} sell</span>
              <span style={{ fontWeight: 700, color: C.sage }}>{idr(mForm.price * 0.85 * mForm.qty)}</span>
            </div>
          </div>
        </div>
        <div className="sk-glass-strong" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 20px 26px', borderRadius: '24px 24px 0 0' }}>
          <CTA icon={<Sparkles size={18} />} onClick={mPublishListing}>Publish surprise bag</CTA>
        </div>
      </div>
    );
  };

  // ---- Merchant Orders ----
  const renderMOrders = () => (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'transparent' }}>
      {mTopBar('Orders', 'Today\u2019s reservations')}
      <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 100px' }}>
        {mOrders.map((o) => {
          const awaiting = o.status === 'awaiting';
          return (
            <div key={o.id} className="sk-fadeup" style={{ borderRadius: 18, background: '#fff', border: `1px solid ${C.parchment}`, marginBottom: 14, overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: 12, padding: 14, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: awaiting ? 'rgba(189,155,63,0.12)' : 'rgba(62,124,83,0.12)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  {awaiting ? <Clock size={18} color="#9c7a1f" /> : <Check size={18} color={C.sage} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.cocoa }}>{o.customer}</div>
                  <div style={{ fontSize: 12, color: C.latte, marginTop: 1 }}>{o.items} · {idr(o.total)} · {o.time}</div>
                </div>
                {awaiting ? (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 10.5, color: C.latte }}>Code</div>
                    <div className="sk-display" style={{ fontSize: 17, fontWeight: 700, letterSpacing: '0.1em', color: C.cocoa }}>{o.code}</div>
                  </div>
                ) : <StatusBadge status="completed" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ---- Merchant Scan / Verify ----
  const renderMScan = () => (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'transparent' }}>
      <TopBar title="Verify pickup" onBack={() => { setScanResult(null); mGo('mDash'); }} />
      <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Scanner visual */}
        <div style={{ width: 200, height: 200, borderRadius: 24, background: `linear-gradient(135deg, ${C.cocoa}, ${C.coffee})`, position: 'relative', display: 'grid', placeItems: 'center', marginBottom: 24, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 20, border: `2px solid ${C.goldLight}`, borderRadius: 16, opacity: 0.5 }} />
          {[[8, 8], [8, 'r'], ['b', 8], ['b', 'r']].map((corner, i) => {
            const [v, h] = corner;
            return <div key={i} style={{ position: 'absolute', top: v === 'b' ? 'auto' : 14, bottom: v === 'b' ? 14 : 'auto', left: h === 'r' ? 'auto' : 14, right: h === 'r' ? 14 : 'auto', width: 28, height: 28, borderTop: v === 'b' ? 'none' : `3px solid ${C.goldLight}`, borderBottom: v === 'b' ? `3px solid ${C.goldLight}` : 'none', borderLeft: h === 'r' ? 'none' : `3px solid ${C.goldLight}`, borderRight: h === 'r' ? `3px solid ${C.goldLight}` : 'none', borderRadius: 4 }} />;
          })}
          <ShieldCheck size={48} color={C.goldLight} strokeWidth={1.4} />
        </div>

        <div className="sk-display" style={{ fontSize: 19, fontWeight: 600, color: C.cocoa, textAlign: 'center' }}>Enter pickup code</div>
        <div style={{ fontSize: 13, color: C.latte, textAlign: 'center', marginTop: 4, marginBottom: 20 }}>Ask the customer for their 4-digit code<br />(try 4782 or 5891)</div>

        <input className="sk-input" value={scanCode} onChange={(e) => { setScanCode(e.target.value); setScanResult(null); }} placeholder="0000" maxLength={4} style={{ width: 180, padding: '16px', borderRadius: 16, border: `2px solid ${C.sand}`, outline: 'none', fontSize: 32, fontWeight: 700, letterSpacing: '0.3em', textAlign: 'center', color: C.cocoa, background: '#fff', fontFamily: 'Fraunces, serif' }} />

        <div style={{ width: '100%', maxWidth: 280, marginTop: 20 }}>
          <CTA disabled={scanCode.length !== 4} onClick={mVerifyCode}>Verify code</CTA>
        </div>

        {/* Result */}
        {scanResult && (
          <div className="sk-scalein" style={{ width: '100%', maxWidth: 320, marginTop: 24, padding: 20, borderRadius: 18, background: scanResult.ok ? 'rgba(62,124,83,0.12)' : 'rgba(209,74,63,0.1)', border: `1px solid ${scanResult.ok ? 'rgba(62,124,83,0.3)' : 'rgba(209,74,63,0.3)'}`, textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: scanResult.ok ? C.sage : C.danger, display: 'grid', placeItems: 'center', margin: '0 auto 12px' }}>
              {scanResult.ok ? <Check size={30} color="#fff" strokeWidth={3} /> : <X size={30} color="#fff" strokeWidth={3} />}
            </div>
            {scanResult.ok ? (
              <>
                <div className="sk-display" style={{ fontSize: 19, fontWeight: 600, color: C.sage }}>Verified ✓</div>
                <div style={{ fontSize: 13.5, color: C.mocha, marginTop: 4 }}>{scanResult.order.customer} · {scanResult.order.items}</div>
                <div style={{ fontSize: 12.5, color: C.latte, marginTop: 2 }}>Hand over the bag — enjoy!</div>
              </>
            ) : (
              <>
                <div className="sk-display" style={{ fontSize: 19, fontWeight: 600, color: C.danger }}>{scanResult.reason}</div>
                <div style={{ fontSize: 13, color: C.mocha, marginTop: 4 }}>Double-check the code with the customer.</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );

  /* ---- Merchant bottom nav ---- */
  const M_NAV = [
    { id: 'mDash', icon: HomeIcon, label: 'Home' },
    { id: 'mListings', icon: Tag, label: 'Listings' },
    { id: 'mOrders', icon: ShoppingBag, label: 'Orders' },
    { id: 'mScan', icon: ShieldCheck, label: 'Verify' },
  ];

  const renderMNav = () => (
    <div style={{ position: 'absolute', bottom: 22, left: 16, right: 16, zIndex: 30 }}>
      <div className="sk-glass-strong" style={{ display: 'flex', padding: 6, borderRadius: 999 }}>
        {M_NAV.map((item) => {
          const on = mScreen === item.id;
          const Icon = item.icon;
          return (
            <button key={item.id} onClick={() => { setScanResult(null); mGo(item.id); }} className="sk-press" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, border: 'none', background: on ? 'rgba(189,155,63,0.16)' : 'transparent', borderRadius: 999, padding: '9px 0 7px', cursor: 'pointer', position: 'relative', transition: 'background 0.3s cubic-bezier(0.32,0.72,0,1)' }}>
              <Icon size={21} color={on ? C.caramel : C.latte} strokeWidth={on ? 2.4 : 1.9} />
              <span style={{ fontSize: 10, fontWeight: on ? 700 : 500, color: on ? C.cocoa : C.latte, letterSpacing: '-0.01em' }}>{item.label}</span>
              {item.id === 'mScan' && mPendingPickups > 0 && (
                <span style={{ position: 'absolute', top: 4, right: '50%', marginRight: -18, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999, background: C.danger, color: '#fff', fontSize: 9.5, fontWeight: 700, display: 'grid', placeItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}>{mPendingPickups}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderMerchantScreen = () => {
    switch (mScreen) {
      case 'mDash': return renderMDash();
      case 'mListings': return renderMListings();
      case 'mCreate': return renderMCreate();
      case 'mOrders': return renderMOrders();
      case 'mScan': return renderMScan();
      default: return renderMDash();
    }
  };

  /* ======================= ROUTER + SHELL ======================= */
  const renderScreen = () => {
    switch (screen) {
      case 'splash': return renderSplash();
      case 'onboarding': return renderOnboarding();
      case 'chooseRole': return renderChooseRole();
      case 'home': return renderHome();
      case 'details': return renderDetails();
      case 'merchant': return renderMerchant();
      case 'checkout': return renderCheckout();
      case 'success': return renderSuccess();
      case 'map': return renderMap();
      case 'orders': return renderOrders();
      case 'profile': return renderProfile();
      case 'notifications': return renderNotifications();
      case 'referral': return renderReferral();
      default: return renderHome();
    }
  };

  const phoneContent = (
    <div className="sk-root" style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'radial-gradient(820px 540px at 88% -8%, rgba(232,204,116,0.18), transparent 60%), radial-gradient(640px 480px at -12% 28%, rgba(139,101,72,0.10), transparent 55%), radial-gradient(700px 520px at 50% 115%, rgba(189,155,63,0.08), transparent 55%), #f7f6f3' }}>
      {role === 'merchant' ? (
        <>
          <div key={mScreen} className="sk-fade" style={{ position: 'absolute', inset: 0 }}>{renderMerchantScreen()}</div>
          {mScreen !== 'mCreate' && mScreen !== 'mScan' && renderMNav()}
          {toast && renderToast()}
        </>
      ) : (
        <>
          <div key={screen} className="sk-fade" style={{ position: 'absolute', inset: 0 }}>{renderScreen()}</div>
          {renderBottomNav()}
          {showFilters && renderFilters()}
          {activeOrderDetail && renderOrderDetail()}
          {cancelTarget && renderCancelModal()}
          {rateTarget && renderRateModal()}
          {toast && renderToast()}
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop: phone frame on a styled stage */}
      <div className="hidden md:flex sk-root" style={{ minHeight: '100vh', alignItems: 'center', justifyContent: 'center', gap: 44, padding: 40, background: 'radial-gradient(900px 600px at 75% -10%, rgba(232,204,116,0.22), transparent 55%), linear-gradient(180deg, #f2f0ec 0%, #e7e4df 100%)' }}>
        <div style={{ maxWidth: 300 }}>
          <div className="sk-display" style={{ fontSize: 42, fontWeight: 700, color: C.cocoa, lineHeight: 1 }}>SisaKu</div>
          <div className="sk-serif" style={{ fontSize: 21, fontStyle: 'italic', color: C.caramel, marginTop: 8 }}>Selamatkan Sisa,<br />Nikmati Lebih.</div>
          <div style={{ width: 60, height: 2, background: C.gold, margin: '20px 0' }} />
          <p style={{ fontSize: 14.5, lineHeight: 1.7, color: C.mocha }}>
            Indonesia&rsquo;s premium food-rescue marketplace. Reserve surprise bags from the city&rsquo;s finest bakeries and caf&eacute;s at 50&ndash;70% off &mdash; every evening, before they close.
          </p>
          <div style={{ display: 'flex', gap: 20, marginTop: 26 }}>
            {[['23M+', 'tonnes wasted/yr'], ['50-70%', 'off retail'], ['100%', 'rescued food']].map(([b, s]) => (
              <div key={s}>
                <div className="sk-display" style={{ fontSize: 22, fontWeight: 700, color: C.cocoa }}>{b}</div>
                <div style={{ fontSize: 11, color: C.latte, marginTop: 2 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', width: 393, height: 852, borderRadius: 56, padding: 11, background: 'linear-gradient(145deg, #5a5a5e 0%, #2c2c2f 40%, #1a1a1d 100%)', boxShadow: '0 50px 100px rgba(20,18,15,0.4), inset 0 1px 1px rgba(255,255,255,0.25), inset 0 0 0 1.5px rgba(255,255,255,0.08)' }}>
          <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 124, height: 36, borderRadius: 999, background: '#000', zIndex: 100 }} />
          <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 47, overflow: 'hidden', background: '#f7f6f3' }}>
            {phoneContent}
          </div>
        </div>
      </div>

      {/* Mobile: true fullscreen, fits every phone edge-to-edge */}
      <div className="md:hidden sk-root sk-safe-bottom" style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: 'radial-gradient(820px 540px at 88% -8%, rgba(232,204,116,0.18), transparent 60%), radial-gradient(640px 480px at -12% 28%, rgba(139,101,72,0.10), transparent 55%), #f7f6f3' }}>
        {phoneContent}
      </div>
    </>
  );
};

export default SisaKuApp;
