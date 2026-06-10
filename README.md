# SisaKu 🥐

**Selamatkan Sisa, Nikmati Lebih** — Indonesia's premium food-rescue marketplace.

SisaKu connects Jakarta's finest bakeries, patisseries, and cafés with price-conscious consumers, selling surprise bags of surplus food at 50–70% off before close. A two-sided marketplace: a consumer app to discover and reserve bags, and a merchant dashboard to list inventory and verify pickups.

This is an interactive prototype built with React + Vite, installable as a PWA (add to home screen).

---

## Features

**Consumer side**
- Browse surprise bags with smart filters (category, price, distance, rating, discount)
- Live interactive map (Leaflet) of merchants across Kemang, Senopati, Menteng, SCBD
- Bag details with reviews, pickup windows, and live countdowns
- Full checkout — quantity, payment method, promo codes, order notes
- Order tracking with pickup codes, cancel & refund, ratings
- Impact dashboard (bags rescued, money saved, CO₂ prevented) with gamified tiers
- Invite & earn referral programme
- Notifications

**Merchant side** (Profile → "I'm a merchant")
- Dashboard with today's sales, earnings, pending pickups
- Create & manage surprise bag listings
- Live order feed
- Pickup code verification (try codes `4782` or `5891`)

---

## Run it locally

You need [Node.js](https://nodejs.org) (LTS version).

```bash
npm install
npm run dev
```

Then open the link it prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Output goes to the `dist/` folder.

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. **Add New → Project → Import** this repo.
4. Vercel auto-detects Vite — no config needed. Click **Deploy**.
5. You get a live URL. Open it on your phone and **Add to Home Screen** to install as an app.

---

## Tech stack

- **React 18** + **Vite**
- **Tailwind CSS** (utility classes)
- **lucide-react** (icons)
- **Leaflet** (live map, loaded via CDN)
- **vite-plugin-pwa** (installable app + offline shell)

## Notes

- The live map loads Leaflet from a CDN, so it needs an internet connection.
- Favourites and merchant listings persist via browser local storage.
- This is a prototype — payments, the map data, and pickup verification are demonstration flows, not production integrations.

---

*Built as a university venture project. © 2026.*
