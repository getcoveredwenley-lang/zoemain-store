# ZOEMAIN — Go Live (one-time, ~5 minutes, free)

You only do this once. After it, any update = click **Publish** in GitHub Desktop → the site
redeploys automatically on Vercel, free, every time.

> Why you have to do this part: pushing to your GitHub and importing into Vercel both happen
> inside your own logged-in accounts. Claude can't log into those for you.

---

## Step 1 — Put the project on GitHub (GitHub Desktop)
1. Download **GitHub Desktop** (desktop.github.com) and sign in with your GitHub account
   (make a free GitHub account first if you don't have one).
2. In GitHub Desktop: **File → Add Local Repository**.
3. Choose this folder: `Downloads/zoemain/zoemain-store`.
4. It says "this isn't a Git repository — create one?" → click **Create a Repository** → **Create**.
5. Click **Publish repository** (top bar). You can keep it **Private**. → **Publish**.

✅ The code is now on GitHub.

## Step 2 — Deploy a free preview on Vercel
1. Go to **vercel.com** and sign in (you already have an account).
2. Click **Add New… → Project**.
3. Find the **zoemain-store** repo and click **Import**
   (if asked, click **Install/Authorize GitHub** so Vercel can see your repos).
4. **Framework Preset:** Other. Leave everything else default.
5. Click **Deploy**. Wait ~1 minute.

✅ You get a free live URL like `zoemain-store-xxxx.vercel.app`. That's your live preview.

> ⚠️ Make a NEW project here. Do NOT deploy it inside your existing "upo" / "crm-saas" projects.

---

## Later (only when you're ready — not needed for the preview)
- **Turn on checkout + email capture:** Vercel → your project → **Settings → Environment Variables**
  → add `STRIPE_SECRET_KEY` = your Stripe secret key → **Redeploy**.
- **Add your domain:** Vercel → project → **Settings → Domains** → add `zoemain.fit` (after you buy it).

## Future updates
When Claude changes the site, you just open GitHub Desktop → **Commit** → **Push/Publish**.
Vercel redeploys automatically. No re-importing, no extra cost.
