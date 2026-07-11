const Stripe = require('stripe');

// Push the email into Brevo (real list + dashboard + can actually send drops).
// No-ops safely until BREVO_API_KEY is set in Vercel env vars.
async function addToBrevo(email) {
  const key = process.env.BREVO_API_KEY;
  if (!key) return false;
  const listIds = process.env.BREVO_LIST_ID ? [Number(process.env.BREVO_LIST_ID)] : undefined;
  const r = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      email,
      updateEnabled: true,
      listIds,
      attributes: { SOURCE: 'zoemain.fit' }
    })
  });
  if (r.ok || r.status === 204) return true;
  const t = await r.text();
  if (r.status === 400 && /already exist/i.test(t)) return true; // already subscribed = fine
  throw new Error('Brevo ' + r.status + ': ' + t.slice(0, 180));
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const email = (body.email || '').trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { res.status(400).json({ error: 'Invalid email' }); return; }

    let saved = false;
    try { saved = await addToBrevo(email); }
    catch (e) { console.error('brevo_failed', e.message); }

    // Fallback so a signup is NEVER lost (also the path until Brevo key is added)
    if (!saved && process.env.STRIPE_SECRET_KEY) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      await stripe.customers.create({ email, metadata: { source: 'newsletter' } });
      saved = true;
    }

    if (!saved) { res.status(500).json({ error: 'Not configured' }); return; }
    res.status(200).json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
