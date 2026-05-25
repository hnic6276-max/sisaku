import React, { useState, useEffect } from 'react';
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
  espresso: '#2c1810',
  cocoa: '#3e2723',
  coffee: '#4e342e',
  mocha: '#6d4c3d',
  caramel: '#8b6548',
  latte: '#a98467',
  sand: '#c9b29b',
  cream: '#faf6ef',
  parchment: '#f4ebdd',
  gold: '#c8a13a',
  goldLight: '#e6c869',
  sage: '#6b7d5e',
  danger: '#a8534a',
};

/* ---------- GLOBAL CSS ---------- */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Jost:wght@300;400;500;600&display=swap');

  .sk-root, .sk-root * { font-family: 'Jost', sans-serif; -webkit-font-smoothing: antialiased; box-sizing: border-box; margin: 0; padding: 0; }
  .sk-display { font-family: 'Fraunces', serif; }
  .sk-serif { font-family: 'Cormorant Garamond', serif; }

  @keyframes skFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes skFade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes skScaleIn { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
  @keyframes skShimmer { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  @keyframes skPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  @keyframes skSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
  @keyframes skPop { 0% { transform: scale(0); } 60% { transform: scale(1.12); } 100% { transform: scale(1); } }
  @keyframes skFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes skBar { from { width: 0; } }

  .sk-fadeup { animation: skFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
  .sk-fade { animation: skFade 0.4s ease both; }
  .sk-scalein { animation: skScaleIn 0.4s cubic-bezier(0.16,1,0.3,1) both; }
  .sk-slideup { animation: skSlideUp 0.34s cubic-bezier(0.16,1,0.3,1) both; }
  .sk-pop { animation: skPop 0.5s cubic-bezier(0.16,1,0.3,1) both; }
  .sk-float { animation: skFloat 3.5s ease-in-out infinite; }

  .sk-gold-text {
    background: linear-gradient(110deg, #b8902f, #e6c869, #b8902f);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
  .sk-grain::after {
    content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0.4; mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
  }
  .sk-noscroll::-webkit-scrollbar { display: none; }
  .sk-noscroll { -ms-overflow-style: none; scrollbar-width: none; }
  .sk-press { transition: transform 0.12s ease; }
  .sk-press:active { transform: scale(0.95); }
  .sk-card { transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease; }
  .sk-card:active { transform: scale(0.985); }
  .sk-input { font-family: 'Jost', sans-serif; }
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
  },
  {
    id: 2, merchant: 'Tous Les Jours', type: 'French Patisserie', emoji: '\u{1F370}',
    hue1: '#f3d4d9', hue2: '#d99aa6', original: 120000, price: 45000, discount: 62,
    category: 'Patisserie', distance: 1.2, rating: 4.8, reviews: 189, lat: 58, lng: 60,
    windowLabel: '6:30 – 8:30 PM', pickupEnd: 20.5, left: 3, area: 'Senopati',
    contents: '3–5 cakes, tarts & delicate pastries from today\u2019s case',
    dietary: ['Vegetarian'],
    blurb: 'Korean-French bakery beloved for its glossy cakes and buttery croissants.',
  },
  {
    id: 3, merchant: 'Anomali Coffee', type: 'Specialty Café', emoji: '\u2615',
    hue1: '#d7c3a8', hue2: '#a07d52', original: 85000, price: 32000, discount: 62,
    category: 'Café', distance: 1.5, rating: 4.7, reviews: 456, lat: 44, lng: 72,
    windowLabel: '7:00 – 9:00 PM', pickupEnd: 21, left: 8, area: 'Senopati',
    contents: 'Sandwiches, banana bread & single-origin pastry selection',
    dietary: ['Vegetarian', 'Halal'],
    blurb: 'Indonesia\u2019s pioneer of single-origin coffee, sourcing beans across the archipelago.',
  },
  {
    id: 4, merchant: 'Paul Boulangerie', type: 'Boulangerie', emoji: '\u{1F950}',
    hue1: '#e3cfa6', hue2: '#bf9a55', original: 110000, price: 42000, discount: 62,
    category: 'Bakery', distance: 2.1, rating: 4.8, reviews: 167, lat: 70, lng: 30,
    windowLabel: '5:30 – 7:30 PM', pickupEnd: 19.5, left: 2, area: 'SCBD',
    contents: 'Assorted artisan breads, viennoiserie & quiche',
    dietary: [],
    blurb: 'A Parisian house since 1889. Croissants laminated with French butter.',
  },
  {
    id: 5, merchant: 'Kopi Kenangan', type: 'Coffee Chain', emoji: '\u{1F9C1}',
    hue1: '#e7d2b8', hue2: '#b08d5c', original: 70000, price: 28000, discount: 60,
    category: 'Café', distance: 0.9, rating: 4.6, reviews: 521, lat: 26, lng: 56,
    windowLabel: '7:30 – 9:30 PM', pickupEnd: 21.5, left: 6, area: 'Kemang',
    contents: 'Pastry box: croffles, muffins & cookies',
    dietary: ['Halal'],
    blurb: 'Indonesia\u2019s home-grown coffee unicorn with a cult following for its gula aren latte.',
  },
  {
    id: 6, merchant: 'Union Bakehouse', type: 'Dessert Atelier', emoji: '\u{1F369}',
    hue1: '#f0d9bd', hue2: '#caa063', original: 135000, price: 52000, discount: 61,
    category: 'Patisserie', distance: 2.6, rating: 4.9, reviews: 278, lat: 64, lng: 18,
    windowLabel: '6:00 – 8:00 PM', pickupEnd: 20, left: 3, area: 'Menteng',
    contents: 'Signature red velvet, doughnuts & seasonal tarts',
    dietary: ['Vegetarian'],
    blurb: 'Jakarta\u2019s most photographed dessert spot, known for towering layer cakes.',
  },
];

const CATEGORIES = ['All', 'Bakery', 'Patisserie', 'Café'];

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

/* ---------- MODULE-LEVEL PRIMITIVES ---------- */

// Decorative bag "photo": layered gradient + floating emoji
const BagImage = ({ bag, h = 200, rounded = 0, showEmoji = true }) => (
  <div className="sk-grain" style={{
    position: 'relative', height: h, borderRadius: rounded, overflow: 'hidden',
    background: `radial-gradient(120% 100% at 30% 20%, ${bag.hue1} 0%, ${bag.hue2} 70%, ${C.mocha} 130%)`,
  }}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(44,24,16,0.5) 100%)' }} />
    {showEmoji && (
      <div className="sk-float" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: h * 0.4, filter: 'drop-shadow(0 8px 16px rgba(44,24,16,0.35))' }}>
        {bag.emoji}
      </div>
    )}
  </div>
);

// Gold hairline divider with center diamond
const Divider = ({ my = 16 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: `${my}px 0` }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.sand})` }} />
    <div style={{ width: 5, height: 5, transform: 'rotate(45deg)', background: C.gold }} />
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.sand}, transparent)` }} />
  </div>
);

const Pill = ({ children, bg, color, style }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, fontWeight: 600,
    letterSpacing: '0.04em', textTransform: 'uppercase', padding: '4px 9px', borderRadius: 999,
    background: bg, color, ...style,
  }}>{children}</span>
);

const StatusBadge = ({ status }) => {
  const map = {
    confirmed: { t: 'Confirmed', bg: 'rgba(107,125,94,0.15)', c: C.sage, dot: C.sage, pulse: false },
    ready: { t: 'Ready for pickup', bg: 'rgba(200,161,58,0.18)', c: '#9c7a1f', dot: C.gold, pulse: true },
    completed: { t: 'Completed', bg: 'rgba(109,76,61,0.12)', c: C.mocha, dot: C.mocha, pulse: false },
    cancelled: { t: 'Cancelled', bg: 'rgba(168,83,74,0.12)', c: C.danger, dot: C.danger, pulse: false },
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
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '48px 18px 14px', background: C.cream, borderBottom: `1px solid ${C.parchment}`, position: 'relative', zIndex: 5 }}>
    <button onClick={onBack} className="sk-press" style={{ width: 38, height: 38, borderRadius: 12, border: `1px solid ${C.parchment}`, background: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer', color: C.cocoa }}>
      <ChevronLeft size={20} />
    </button>
    <div className="sk-display" style={{ flex: 1, fontSize: 17, fontWeight: 600, color: C.cocoa }}>{title}</div>
    {right}
  </div>
);

const CTA = ({ children, onClick, disabled, icon }) => (
  <button onClick={onClick} disabled={disabled} className="sk-press" style={{
    width: '100%', padding: 16, borderRadius: 16, border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    background: disabled ? C.sand : `linear-gradient(135deg, ${C.cocoa}, ${C.coffee})`,
    color: C.cream, fontSize: 15, fontWeight: 600, letterSpacing: '0.02em',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
    boxShadow: disabled ? 'none' : '0 10px 24px rgba(44,24,16,0.28)', opacity: disabled ? 0.6 : 1,
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
  <div style={{ padding: 16, borderRadius: 18, background: '#fff', border: `1px solid ${C.parchment}` }}>
    <div style={{ width: 36, height: 36, borderRadius: 11, background: tint, display: 'grid', placeItems: 'center', marginBottom: 10 }}>{icon}</div>
    <div className="sk-display" style={{ fontSize: 19, fontWeight: 700, color: C.cocoa, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 11.5, color: C.latte, marginTop: 4 }}>{label}</div>
  </div>
);

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
  const [favorites, setFavorites] = useState([2]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(60000);
  const [mapSelected, setMapSelected] = useState(null);

  /* ---- notifications ---- */
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'deal', title: 'Tous Les Jours just dropped a bag', body: 'French patisserie · 62% off · 1.2km away', time: '5 min ago', read: false },
    { id: 2, type: 'reminder', title: 'Pickup window closing soon', body: 'Your Sourdough Project bag — collect before 8:00 PM', time: '40 min ago', read: false },
    { id: 3, type: 'impact', title: 'You saved 1.4kg of CO\u2082 this week \u{1F30D}', body: 'That\u2019s like charging your phone 170 times.', time: '2 hours ago', read: true },
    { id: 4, type: 'new', title: 'Kopi Kenangan joined SisaKu', body: 'A new café near Senopati is now rescuing food.', time: 'Yesterday', read: true },
  ]);

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

  /* ---- derived ---- */
  const isFav = (id) => favorites.includes(id);
  const toggleFav = (id) => setFavorites((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const go = (next) => { setPrevScreen(screen); setScreen(next); };
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
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: C.cream }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 34px', textAlign: 'center', position: 'relative' }}>
          <button onClick={() => setScreen('home')} style={{ position: 'absolute', top: 24, right: 22, background: 'none', border: 'none', color: C.latte, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Skip</button>
          <div key={onboardStep} className="sk-scalein" style={{ width: 150, height: 150, borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: 74, marginBottom: 38, background: `radial-gradient(circle at 35% 30%, #fff, ${C.parchment})`, boxShadow: `0 20px 50px rgba(44,24,16,0.12), inset 0 0 0 1px ${C.parchment}` }}>
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
          <CTA icon={last ? <Sparkles size={18} /> : null} onClick={() => last ? setScreen('home') : setOnboardStep((p) => p + 1)}>
            {last ? 'Start rescuing food' : 'Continue'}
          </CTA>
        </div>
      </div>
    );
  };

  /* ======================= HOME ======================= */
  const renderBagCard = (bag, index) => {
    const closing = bag.left <= 2;
    return (
      <div key={bag.id} className="sk-fadeup sk-card" style={{ animationDelay: `${index * 0.06}s`, borderRadius: 22, overflow: 'hidden', background: '#fff', boxShadow: '0 6px 22px rgba(44,24,16,0.08)', border: `1px solid ${C.parchment}`, marginBottom: 16, cursor: 'pointer' }} onClick={() => openBag(bag)}>
        <div style={{ position: 'relative' }}>
          <BagImage bag={bag} h={150} />
          <button onClick={(e) => { e.stopPropagation(); toggleFav(bag.id); }} className="sk-press" style={{ position: 'absolute', top: 12, right: 12, width: 38, height: 38, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.92)', display: 'grid', placeItems: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
            <Heart size={18} fill={isFav(bag.id) ? '#c8506e' : 'none'} color={isFav(bag.id) ? '#c8506e' : C.mocha} />
          </button>
          <div style={{ position: 'absolute', top: 12, left: 12 }}>
            <Pill bg={`linear-gradient(135deg, ${C.cocoa}, ${C.coffee})`} color={C.goldLight}><Tag size={11} /> {bag.discount}% off</Pill>
          </div>
          <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Pill bg="rgba(255,255,255,0.92)" color={C.cocoa} style={{ backdropFilter: 'blur(4px)' }}><Clock size={11} /> {countdownTo(bag.pickupEnd)} left</Pill>
            {closing && <Pill bg="rgba(168,83,74,0.92)" color="#fff" style={{ backdropFilter: 'blur(4px)' }}>Only {bag.left} left</Pill>}
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
            <div className="sk-press" style={{ width: 40, height: 40, borderRadius: 13, background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, display: 'grid', placeItems: 'center', boxShadow: '0 6px 14px rgba(200,161,58,0.4)' }}>
              <Plus size={20} color={C.espresso} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHome = () => {
    const list = filteredBags();
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: C.cream }}>
        <div className="sk-grain" style={{ padding: '52px 20px 18px', background: `linear-gradient(150deg, ${C.cocoa} 0%, ${C.coffee} 100%)`, position: 'relative', borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: C.sand, fontSize: 11.5, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                <MapPin size={12} /> Kemang · Jakarta Selatan
              </div>
              <div className="sk-display" style={{ fontSize: 26, fontWeight: 600, color: C.cream, marginTop: 4, lineHeight: 1.1 }}>Good evening 🌙</div>
              <div className="sk-serif" style={{ fontSize: 15, fontStyle: 'italic', color: C.goldLight, marginTop: 2 }}>What shall we rescue tonight?</div>
            </div>
            <button onClick={() => go('notifications')} className="sk-press" style={{ position: 'relative', width: 42, height: 42, borderRadius: 13, border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.08)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
              <Bell size={19} color={C.cream} />
              {unreadCount > 0 && <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 999, background: C.gold, boxShadow: `0 0 0 2px ${C.cocoa}` }} />}
            </button>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 18, position: 'relative', zIndex: 2 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 9, padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.95)' }}>
              <Search size={17} color={C.latte} />
              <input className="sk-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search bakeries, cafés…" style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontSize: 14, color: C.cocoa }} />
              {search && <X size={16} color={C.latte} style={{ cursor: 'pointer' }} onClick={() => setSearch('')} />}
            </div>
            <button onClick={() => setShowFilters(true)} className="sk-press" style={{ width: 46, borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
              <Filter size={18} color={C.espresso} />
            </button>
          </div>
        </div>

        <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 100px' }}>
          <div className="sk-fadeup" style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {[
              { icon: <Leaf size={15} color={C.sage} />, big: stats.rescued, small: 'bags saved' },
              { icon: <Wallet size={15} color={C.gold} />, big: idr(stats.saved).replace('Rp\u202f', ''), small: 'Rp saved' },
              { icon: <Sparkles size={15} color={C.caramel} />, big: stats.co2 + 'kg', small: 'CO\u2082 cut' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, background: '#fff', borderRadius: 16, padding: '12px 10px', textAlign: 'center', border: `1px solid ${C.parchment}`, boxShadow: '0 3px 10px rgba(44,24,16,0.04)' }}>
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
                <button key={cat} onClick={() => setActiveCategory(cat)} className="sk-press" style={{ flexShrink: 0, padding: '9px 16px', borderRadius: 999, border: on ? 'none' : `1px solid ${C.sand}`, background: on ? `linear-gradient(135deg, ${C.cocoa}, ${C.coffee})` : '#fff', color: on ? C.cream : C.mocha, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{cat}</button>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: C.latte }}><span style={{ fontWeight: 700, color: C.cocoa }}>{list.length}</span> collections nearby</div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sk-input" style={{ border: `1px solid ${C.sand}`, borderRadius: 10, padding: '7px 10px', fontSize: 12.5, color: C.cocoa, background: '#fff', cursor: 'pointer', outline: 'none' }}>
              <option value="recommended">Recommended</option>
              <option value="price">Price: low to high</option>
              <option value="distance">Nearest first</option>
              <option value="rating">Top rated</option>
              <option value="discount">Biggest discount</option>
            </select>
          </div>

          {activeCategory === 'All' && !search && (
            <div className="sk-fadeup sk-grain" onClick={() => { setPromoInput('SISAKU20'); setToast({ icon: '\u{1F381}', text: 'SISAKU20 ready at checkout' }); }} style={{ position: 'relative', borderRadius: 20, padding: '18px 20px', marginBottom: 18, overflow: 'hidden', background: `linear-gradient(120deg, ${C.caramel}, ${C.mocha})`, cursor: 'pointer' }}>
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
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: C.cream }}>
        <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: 96 }}>
          <div style={{ position: 'relative' }}>
            <BagImage bag={bag} h={300} />
            <button onClick={() => go(prevScreen === 'merchant' ? 'merchant' : 'home')} className="sk-press" style={{ position: 'absolute', top: 48, left: 18, width: 40, height: 40, borderRadius: 13, border: 'none', background: 'rgba(255,255,255,0.92)', display: 'grid', placeItems: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
              <ChevronLeft size={22} color={C.cocoa} />
            </button>
            <div style={{ position: 'absolute', top: 48, right: 18, display: 'flex', gap: 8 }}>
              <button onClick={() => setToast({ icon: '\u{1F517}', text: 'Share link copied' })} className="sk-press" style={{ width: 40, height: 40, borderRadius: 13, border: 'none', background: 'rgba(255,255,255,0.92)', display: 'grid', placeItems: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
                <Share2 size={18} color={C.cocoa} />
              </button>
              <button onClick={() => toggleFav(bag.id)} className="sk-press" style={{ width: 40, height: 40, borderRadius: 13, border: 'none', background: 'rgba(255,255,255,0.92)', display: 'grid', placeItems: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
                <Heart size={18} fill={isFav(bag.id) ? '#c8506e' : 'none'} color={isFav(bag.id) ? '#c8506e' : C.cocoa} />
              </button>
            </div>
            <div style={{ position: 'absolute', bottom: 16, left: 18 }}>
              <Pill bg={`linear-gradient(135deg, ${C.gold}, ${C.goldLight})`} color={C.espresso} style={{ fontSize: 12 }}>Surprise Bag · {bag.discount}% off</Pill>
            </div>
          </div>

          <div style={{ position: 'relative', marginTop: -22, background: C.cream, borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: '22px 20px 0' }}>
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
                <div key={i} style={{ flex: 1, background: '#fff', borderRadius: 14, padding: '12px 8px', textAlign: 'center', border: `1px solid ${C.parchment}` }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>{f.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.cocoa }}>{f.top}</div>
                  <div style={{ fontSize: 10.5, color: C.latte, marginTop: 1 }}>{f.bot}</div>
                </div>
              ))}
            </div>

            <Divider my={20} />
            <div className="sk-display" style={{ fontSize: 16, fontWeight: 600, color: C.cocoa, marginBottom: 8 }}>What might be inside</div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: C.mocha }}>{bag.contents}.</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 10, padding: '10px 12px', borderRadius: 12, background: 'rgba(107,125,94,0.1)' }}>
              <Sparkles size={15} color={C.sage} />
              <span style={{ fontSize: 12.5, color: C.sage, fontWeight: 500 }}>It’s a surprise! Contents vary with what’s left at close.</span>
            </div>

            {bag.dietary.length > 0 && (
              <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                {bag.dietary.map((d) => <Pill key={d} bg={C.parchment} color={C.mocha}><Check size={11} /> {d}</Pill>)}
              </div>
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

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 20px', background: 'rgba(250,246,239,0.95)', backdropFilter: 'blur(10px)', borderTop: `1px solid ${C.parchment}`, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: C.sand, textDecoration: 'line-through' }}>{idr(bag.original)}</div>
            <div className="sk-display" style={{ fontSize: 22, fontWeight: 700, color: C.cocoa, lineHeight: 1 }}>{idr(bag.price)}</div>
          </div>
          <button onClick={() => { setQty(1); go('checkout'); }} className="sk-press" style={{ flex: 1, padding: 15, borderRadius: 15, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg, ${C.cocoa}, ${C.coffee})`, color: C.cream, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 10px 24px rgba(44,24,16,0.28)' }}>
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
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: C.cream }}>
        <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: 96 }}>
          <div style={{ position: 'relative' }}>
            <BagImage bag={m} h={180} showEmoji={false} />
            <button onClick={() => go('details')} className="sk-press" style={{ position: 'absolute', top: 48, left: 18, width: 40, height: 40, borderRadius: 13, border: 'none', background: 'rgba(255,255,255,0.92)', display: 'grid', placeItems: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
              <ChevronLeft size={22} color={C.cocoa} />
            </button>
          </div>
          <div style={{ padding: '0 20px' }}>
            <div style={{ marginTop: -42, display: 'flex', alignItems: 'flex-end', gap: 14 }}>
              <div style={{ width: 84, height: 84, borderRadius: 22, background: '#fff', display: 'grid', placeItems: 'center', fontSize: 42, boxShadow: '0 8px 20px rgba(44,24,16,0.18)', border: `1px solid ${C.parchment}` }}>{m.emoji}</div>
              <div style={{ paddingBottom: 6 }}>
                <Pill bg="rgba(107,125,94,0.15)" color={C.sage}><ShieldCheck size={11} /> Verified partner</Pill>
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
        <div style={{ position: 'absolute', inset: 0 }}>
          <MapCanvas />
          <div style={{ position: 'absolute', left: '48%', top: '50%', transform: 'translate(-50%,18px)', fontSize: 10, fontWeight: 600, color: '#3b6ea5', whiteSpace: 'nowrap' }}>You</div>
          {BAGS.map((b) => {
            const active = sel && sel.id === b.id;
            return (
              <button key={b.id} onClick={() => setMapSelected(b)} style={{ position: 'absolute', left: `${b.lng}%`, top: `${b.lat}%`, transform: 'translate(-50%,-100%)', border: 'none', background: 'none', cursor: 'pointer', zIndex: active ? 5 : 2, padding: 0 }}>
                <div className={active ? 'sk-pop' : ''} style={{ width: active ? 40 : 32, height: active ? 40 : 32, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: active ? `linear-gradient(135deg, ${C.gold}, ${C.goldLight})` : '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 5px 12px rgba(0,0,0,0.28)', border: active ? 'none' : `2px solid ${C.gold}`, transition: 'all 0.2s ease' }}>
                  <span style={{ transform: 'rotate(45deg)', fontSize: active ? 18 : 15 }}>{b.emoji}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '48px 18px 0', display: 'flex', gap: 10 }}>
          <button onClick={() => go('home')} className="sk-press" style={{ width: 42, height: 42, borderRadius: 13, border: 'none', background: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(44,24,16,0.15)' }}>
            <ChevronLeft size={22} color={C.cocoa} />
          </button>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderRadius: 13, background: '#fff', boxShadow: '0 4px 12px rgba(44,24,16,0.15)' }}>
            <Search size={17} color={C.latte} />
            <span style={{ fontSize: 13.5, color: C.latte }}>{BAGS.length} rescues near Kemang</span>
          </div>
        </div>

        {sel && (
          <div key={sel.id} className="sk-slideup" style={{ position: 'absolute', bottom: 24, left: 16, right: 16 }}>
            <div onClick={() => openBag(sel)} className="sk-card" style={{ display: 'flex', gap: 12, padding: 12, borderRadius: 18, background: '#fff', boxShadow: '0 12px 30px rgba(44,24,16,0.22)', cursor: 'pointer', border: `1px solid ${C.parchment}` }}>
              <div style={{ width: 70, height: 70, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}><BagImage bag={sel} h={70} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="sk-display" style={{ fontSize: 16, fontWeight: 600, color: C.cocoa, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sel.merchant}</div>
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
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: C.cream }}>
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

          <div className="sk-fadeup" style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, padding: '12px 14px', borderRadius: 14, background: 'rgba(200,161,58,0.12)' }}>
            <Calendar size={17} color="#9c7a1f" />
            <div style={{ fontSize: 12.5, color: '#9c7a1f', fontWeight: 500 }}>Collect today between {bag.windowLabel} at {bag.area}.</div>
          </div>

          <div className="sk-display" style={{ fontSize: 16, fontWeight: 600, color: C.cocoa, margin: '22px 0 12px' }}>Payment method</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PAYMENTS.map((p) => {
              const on = paymentMethod === p.id;
              return (
                <button key={p.id} onClick={() => setPaymentMethod(p.id)} className="sk-press" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderRadius: 14, border: on ? `2px solid ${C.gold}` : `1px solid ${C.parchment}`, background: on ? 'rgba(200,161,58,0.06)' : '#fff', cursor: 'pointer', textAlign: 'left' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 15px', borderRadius: 14, background: 'rgba(107,125,94,0.12)', border: '1px solid rgba(107,125,94,0.3)' }}>
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

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 20px', background: 'rgba(250,246,239,0.95)', backdropFilter: 'blur(10px)', borderTop: `1px solid ${C.parchment}` }}>
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
          <div className="sk-pop" style={{ width: 88, height: 88, borderRadius: '50%', background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, display: 'grid', placeItems: 'center', boxShadow: '0 16px 40px rgba(200,161,58,0.4)' }}>
            <Check size={46} color={C.espresso} strokeWidth={2.4} />
          </div>
          <div className="sk-fadeup" style={{ animationDelay: '0.15s' }}>
            <div className="sk-display" style={{ fontSize: 28, fontWeight: 600, color: C.cream, marginTop: 22 }}>Bag reserved!</div>
            <div className="sk-serif" style={{ fontSize: 16, fontStyle: 'italic', color: C.sand, marginTop: 4 }}>One more meal saved from the bin 🌍</div>
          </div>

          <div className="sk-fadeup" style={{ animationDelay: '0.3s', width: '100%', background: C.cream, borderRadius: 22, marginTop: 28, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, background: closing ? 'rgba(168,83,74,0.12)' : C.parchment }}>
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
                <button onClick={(e) => { e.stopPropagation(); setRateTarget(o); setRatingStars(0); setRatingText(''); }} className="sk-press" style={{ marginTop: 8, padding: '6px 12px', borderRadius: 999, border: `1px solid ${C.gold}`, background: 'rgba(200,161,58,0.08)', color: '#9c7a1f', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                  ★ Rate your bag
                </button>
              )
            ) : (
              <div style={{ fontSize: 11.5, color: C.latte, marginTop: 8 }}>Cancelled · refunded to {PAYMENTS.find((p) => p.id === o.payment)?.name}</div>
            )}
          </div>
        </div>
        {o.status === 'ready' && (
          <div style={{ padding: '10px 14px', background: 'rgba(200,161,58,0.1)', borderTop: `1px solid ${C.parchment}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: C.cream }}>
        <div style={{ padding: '52px 20px 0', background: C.cream }}>
          <div className="sk-display" style={{ fontSize: 26, fontWeight: 600, color: C.cocoa }}>My Orders</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, background: C.parchment, borderRadius: 14, padding: 5 }}>
            {[['active', `Active (${activeOrders.length})`], ['past', `History (${pastOrders.length})`]].map(([k, label]) => (
              <button key={k} onClick={() => setOrderTab(k)} className="sk-press" style={{ flex: 1, padding: 10, borderRadius: 10, border: 'none', cursor: 'pointer', background: orderTab === k ? '#fff' : 'transparent', color: orderTab === k ? C.cocoa : C.latte, fontSize: 13.5, fontWeight: 600, boxShadow: orderTab === k ? '0 2px 6px rgba(44,24,16,0.08)' : 'none' }}>{label}</button>
            ))}
          </div>
        </div>
        <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 100px' }}>
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
      <div className="sk-fade" style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'rgba(44,24,16,0.5)', display: 'flex', alignItems: 'flex-end' }} onClick={() => setActiveOrderDetail(null)}>
        <div className="sk-slideup sk-noscroll" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxHeight: '88%', overflowY: 'auto', background: C.cream, borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: '10px 20px 28px' }}>
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
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: C.cream }}>
        <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: 100 }}>
          <div className="sk-grain" style={{ padding: '52px 20px 28px', background: `linear-gradient(150deg, ${C.cocoa}, ${C.coffee})`, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative', zIndex: 2 }}>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, display: 'grid', placeItems: 'center', fontSize: 28, fontWeight: 700, color: C.espresso }}>A</div>
              <div>
                <div className="sk-display" style={{ fontSize: 21, fontWeight: 600, color: C.cream }}>Arthur</div>
                <div style={{ fontSize: 12.5, color: C.sand }}>arthur@binus.ac.id</div>
                <Pill bg="rgba(200,161,58,0.2)" color={C.goldLight} style={{ marginTop: 6 }}><Award size={11} /> Food Hero · Level 2</Pill>
              </div>
            </div>
          </div>

          <div style={{ padding: 20 }}>
            <div className="sk-fadeup" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <ImpactCard icon={<ShoppingBag size={18} color={C.gold} />} value={stats.rescued} label="Bags rescued" tint="rgba(200,161,58,0.1)" />
              <ImpactCard icon={<Wallet size={18} color={C.sage} />} value={idr(stats.saved)} label="Total saved" tint="rgba(107,125,94,0.1)" />
              <ImpactCard icon={<Leaf size={18} color={C.sage} />} value={stats.co2 + ' kg'} label="CO\u2082 prevented" tint="rgba(107,125,94,0.1)" />
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
                <Pill bg="rgba(107,125,94,0.12)" color={C.sage}><TrendingUp size={11} /> +18%</Pill>
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
                { icon: <Heart size={17} color={C.mocha} />, label: 'Favourite merchants', badge: favorites.length },
                { icon: <Wallet size={17} color={C.mocha} />, label: 'Payment methods', badge: 0 },
                { icon: <Bell size={17} color={C.mocha} />, label: 'Notifications', badge: unreadCount },
                { icon: <Leaf size={17} color={C.mocha} />, label: 'Dietary preferences', badge: 0 },
                { icon: <ShieldCheck size={17} color={C.mocha} />, label: 'Help & support', badge: 0 },
              ].map((item, i, arr) => (
                <button key={i} onClick={() => item.label === 'Notifications' ? go('notifications') : setToast({ icon: '\u2699\uFE0F', text: item.label })} className="sk-press" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 13, padding: '15px 18px', border: 'none', borderBottom: i < arr.length - 1 ? `1px solid ${C.parchment}` : 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
                  {item.icon}
                  <span style={{ flex: 1, fontSize: 14, color: C.cocoa, fontWeight: 500 }}>{item.label}</span>
                  {item.badge ? <span style={{ minWidth: 20, height: 20, padding: '0 6px', borderRadius: 999, background: C.gold, color: C.espresso, fontSize: 11, fontWeight: 700, display: 'grid', placeItems: 'center' }}>{item.badge}</span> : null}
                  <ChevronRight size={18} color={C.sand} />
                </button>
              ))}
            </div>

            <button onClick={() => { setOnboardStep(0); setScreen('onboarding'); }} style={{ width: '100%', marginTop: 16, padding: 14, borderRadius: 14, border: `1px solid ${C.sand}`, background: 'transparent', color: C.latte, fontSize: 13.5, fontWeight: 500, cursor: 'pointer' }}>Replay intro</button>
          </div>
        </div>
      </div>
    );
  };

  /* ======================= NOTIFICATIONS ======================= */
  const renderNotifications = () => {
    const iconFor = (t) => {
      const map = {
        deal: { i: <Tag size={17} color={C.gold} />, bg: 'rgba(200,161,58,0.12)' },
        reminder: { i: <Clock size={17} color={C.danger} />, bg: 'rgba(168,83,74,0.1)' },
        impact: { i: <Leaf size={17} color={C.sage} />, bg: 'rgba(107,125,94,0.12)' },
        new: { i: <Store size={17} color={C.caramel} />, bg: 'rgba(139,101,72,0.12)' },
      };
      return map[t] || map.deal;
    };
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: C.cream }}>
        <TopBar title="Notifications" onBack={() => go(prevScreen === 'profile' ? 'profile' : 'home')} right={unreadCount > 0 ? <button onClick={markAllRead} style={{ border: 'none', background: 'none', color: C.gold, fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>Mark all read</button> : null} />
        <div className="sk-noscroll" style={{ flex: 1, overflowY: 'auto', padding: '14px 18px 100px' }}>
          {notifications.map((n, i) => {
            const ic = iconFor(n.type);
            return (
              <div key={n.id} onClick={() => setNotifications((p) => p.map((x) => x.id === n.id ? { ...x, read: true } : x))} className="sk-fadeup" style={{ animationDelay: `${i * 0.05}s`, display: 'flex', gap: 12, padding: 14, borderRadius: 16, marginBottom: 10, background: n.read ? '#fff' : 'rgba(200,161,58,0.06)', border: `1px solid ${n.read ? C.parchment : 'rgba(200,161,58,0.3)'}`, cursor: 'pointer', position: 'relative' }}>
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
    <div className="sk-fade" style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'rgba(44,24,16,0.5)', display: 'flex', alignItems: 'flex-end' }} onClick={() => setShowFilters(false)}>
      <div className="sk-slideup" onClick={(e) => e.stopPropagation()} style={{ width: '100%', background: C.cream, borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: '10px 22px 28px' }}>
        <div style={{ width: 40, height: 5, borderRadius: 999, background: C.sand, margin: '6px auto 18px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="sk-display" style={{ fontSize: 20, fontWeight: 600, color: C.cocoa }}>Filters</div>
          <button onClick={() => { setMaxPrice(60000); setActiveCategory('All'); setSortBy('recommended'); }} style={{ border: 'none', background: 'none', color: C.gold, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Reset</button>
        </div>

        <div style={{ fontSize: 13.5, fontWeight: 600, color: C.cocoa, margin: '20px 0 12px' }}>Category</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => {
            const on = activeCategory === cat;
            return <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '9px 16px', borderRadius: 999, border: on ? 'none' : `1px solid ${C.sand}`, background: on ? C.cocoa : '#fff', color: on ? C.cream : C.mocha, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{cat}</button>;
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
    <div className="sk-fade" style={{ position: 'absolute', inset: 0, zIndex: 50, background: 'rgba(44,24,16,0.55)', display: 'grid', placeItems: 'center', padding: 28 }} onClick={() => setCancelTarget(null)}>
      <div className="sk-scalein" onClick={(e) => e.stopPropagation()} style={{ width: '100%', background: C.cream, borderRadius: 24, padding: 26, textAlign: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(168,83,74,0.12)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
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
    <div className="sk-fade" style={{ position: 'absolute', inset: 0, zIndex: 50, background: 'rgba(44,24,16,0.55)', display: 'grid', placeItems: 'center', padding: 28 }} onClick={() => setRateTarget(null)}>
      <div className="sk-scalein" onClick={(e) => e.stopPropagation()} style={{ width: '100%', background: C.cream, borderRadius: 24, padding: 26 }}>
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
    <div className="sk-fadeup" style={{ position: 'absolute', bottom: 96, left: '50%', transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', borderRadius: 14, background: C.cocoa, color: C.cream, fontSize: 13.5, fontWeight: 500, boxShadow: '0 12px 30px rgba(0,0,0,0.3)', whiteSpace: 'nowrap' }}>
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
    return (
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30, display: 'flex', padding: '10px 12px 14px', background: 'rgba(250,246,239,0.96)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${C.parchment}` }}>
        {NAV.map((item) => {
          const on = screen === item.id;
          const Icon = item.icon;
          return (
            <button key={item.id} onClick={() => go(item.id)} className="sk-press" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, border: 'none', background: 'none', cursor: 'pointer', position: 'relative' }}>
              {on && <span style={{ position: 'absolute', top: -10, width: 28, height: 3, borderRadius: 999, background: C.gold }} />}
              <Icon size={22} color={on ? C.cocoa : C.sand} strokeWidth={on ? 2.2 : 1.8} />
              <span style={{ fontSize: 10.5, fontWeight: on ? 600 : 500, color: on ? C.cocoa : C.latte }}>{item.label}</span>
              {item.id === 'orders' && activeOrders.length > 0 && (
                <span style={{ position: 'absolute', top: -4, right: '50%', marginRight: -16, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999, background: C.gold, color: C.espresso, fontSize: 9.5, fontWeight: 700, display: 'grid', placeItems: 'center' }}>{activeOrders.length}</span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  /* ======================= ROUTER + SHELL ======================= */
  const renderScreen = () => {
    switch (screen) {
      case 'splash': return renderSplash();
      case 'onboarding': return renderOnboarding();
      case 'home': return renderHome();
      case 'details': return renderDetails();
      case 'merchant': return renderMerchant();
      case 'checkout': return renderCheckout();
      case 'success': return renderSuccess();
      case 'map': return renderMap();
      case 'orders': return renderOrders();
      case 'profile': return renderProfile();
      case 'notifications': return renderNotifications();
      default: return renderHome();
    }
  };

  const phoneContent = (
    <div className="sk-root" style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: C.cream }}>
      {renderScreen()}
      {renderBottomNav()}
      {showFilters && renderFilters()}
      {activeOrderDetail && renderOrderDetail()}
      {cancelTarget && renderCancelModal()}
      {rateTarget && renderRateModal()}
      {toast && renderToast()}
    </div>
  );

  return (
    <>
      {/* Desktop: phone frame on a styled stage */}
      <div className="hidden md:flex sk-root" style={{ minHeight: '100vh', alignItems: 'center', justifyContent: 'center', gap: 44, padding: 40, background: `radial-gradient(120% 120% at 50% 0%, ${C.parchment} 0%, ${C.sand} 100%)` }}>
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

        <div style={{ position: 'relative', width: 390, height: 800, borderRadius: 52, padding: 13, background: `linear-gradient(145deg, ${C.espresso}, ${C.coffee})`, boxShadow: '0 40px 80px rgba(44,24,16,0.45), inset 0 0 0 2px rgba(200,161,58,0.25)' }}>
          <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', width: 120, height: 28, borderRadius: 999, background: C.espresso, zIndex: 100 }} />
          <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 40, overflow: 'hidden', background: C.cream }}>
            {phoneContent}
          </div>
        </div>
      </div>

      {/* Mobile: true fullscreen */}
      <div className="md:hidden sk-root" style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: C.cream }}>
        {phoneContent}
      </div>
    </>
  );
};

export default SisaKuApp;
