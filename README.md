# ZOEMAIN — Store

Production storefront for ZOEMAIN. Static front-end + one Stripe serverless checkout function. Hosts free on Vercel.

## What's inside
- `index.html` — the storefront (entrance, shop, product pages, atelier, cart)
- `success.html`, `privacy/terms/returns/shipping/contact.html` — order + legal pages
- `img/` — product images and the logo texture
- `api/checkout.js` — Stripe Checkout (server-side prices, secure)
- `package.json`, `vercel.json`

## One-time launch (do these once, then we deploy)

### 1. Create a Stripe account (free)
- Go to dashboard.stripe.com, sign up.
- Copy your **Secret key** (starts with `sk_live_...` for real money, or `sk_test_...` to test).

### 2. Deploy to Vercel
- Import this folder/repo at vercel.com (New Project).
- In **Project Settings → Environment Variables**, add:
  - `STRIPE_SECRET_KEY` = your Stripe secret key
- Deploy. Checkout goes live immediately.

### 3. Add the domain (when you've bought it)
- Buy `zoemain.fit` (Vercel Domains or any registrar).
- In Vercel: **Project → Settings → Domains → Add** `zoemain.fit`. SSL is automatic.

## How orders work
- Customer checks out → pays via Stripe → money lands in your Stripe account.
- You see every order + revenue in the **Stripe Dashboard** (free).
- You fulfill: ship in-stock pieces yourself; for made-to-order, place the order on Tapstitch.
- Prices live in `api/checkout.js` (server-side). Update them there if they change.

## Notes
- Legal pages are templates — review before launch and set a real contact email.
- To test without real charges, use a `sk_test_...` key and Stripe's test card `4242 4242 4242 4242`.
