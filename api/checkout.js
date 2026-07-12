const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Server-side source of truth for prices (never trust the client)
const CATALOG = {
  'green-hoodie':  { name: 'Heavyweight Hoodie — Green', price: 8000 },
  'blush-hoodie':  { name: 'Heavyweight Hoodie — Blush', price: 8000 },
  'bone-tee':      { name: 'Heavyweight Tee — Bone',     price: 5000 },
  'zoe-pendant':   { name: 'Zoe Pendant',                price: 5000 },
  'goat-pendant':  { name: 'Goat Pendant',               price: 5000 },
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
  if (!process.env.STRIPE_SECRET_KEY) { res.status(500).json({ error: 'Stripe key not set' }); return; }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const items = Array.isArray(body.items) ? body.items : [];
    const line_items = items
      .filter(i => CATALOG[i.id])
      .map(i => ({
        price_data: {
          currency: 'usd',
          product_data: { name: CATALOG[i.id].name + (i.size ? ' (' + String(i.size).slice(0,4) + ')' : '') },
          unit_amount: CATALOG[i.id].price,
        },
        quantity: Math.max(1, Math.min(10, parseInt(i.qty) || 1)),
      }));
    if (!line_items.length) { res.status(400).json({ error: 'Cart is empty' }); return; }

    const origin = req.headers.origin || `https://${req.headers.host}`;
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      // No payment_method_types pin -> Stripe Checkout uses the methods enabled
      // in the dashboard (Apple Pay, Cash App Pay, Amazon Pay, Link, cards...).
      line_items,
      shipping_address_collection: { allowed_countries: ['US', 'CA'] },
      success_url: `${origin}/success.html`,
      cancel_url: `${origin}/?canceled=1`,
    });
    res.status(200).json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
