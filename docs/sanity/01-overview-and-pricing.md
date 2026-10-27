# 1. What Sanity is, and what it costs

## Why Sanity, and not WordPress

Until now the 21 products were typed into `lib/catalogue.ts`, with their photos
in `lib/images.ts`. The client wants to manage products themselves. Headless
WordPress was chosen first (2026-09-24), but it needs paid hosting, plugins
(ACF), and someone keeping it patched, and it stalled on who would host it.

Sanity hosts both the database and the admin panel itself, for free, with no
server to run. The website code changes the same way it would have for
WordPress: every page already read products through `lib/catalogue.ts`, so
that became the swap point.

## The pieces of Sanity

- **Content Lake**: Sanity's hosted database. Products and categories are stored here.
- **Sanity Studio**: the admin panel. It is built from the code in `studio/`
  (the *schema* there decides which fields a product has), and Sanity hosts it
  for free at `https://finestra.sanity.studio`.
- **GROQ**: Sanity's query language. The site uses one GROQ query, in
  `lib/sanity.ts`.
- **Image CDN** (`cdn.sanity.io`): photos the shop uploads are stored once and
  resized on request. A 700px WebP is just the original's URL with `?w=700&auto=format` added.

## Pricing

**Free plan: $0, no credit card, no end date.** Sanity calls it free forever.

New projects also get a **30-day trial of the Growth plan** automatically. When
the trial ends, the project drops back to Free on its own. Nothing is charged
unless someone upgrades and adds a card.

### Free plan limits against Finestra's use

| Limit (per project) | Finestra's likely use | Margin |
|---|---|---|
| 20 user seats; roles Administrator and Viewer only | Developer + shop: 2 or 3 | Plenty |
| 10,000 documents (each uploaded photo counts as one) | ~21 products + 4 categories + photos: 100 to 300 | Plenty |
| 250,000 API requests a month | The site caches; Sanity is asked only after a publish or once an hour per page: a few thousand | Plenty |
| 1,000,000 API CDN requests a month | Not used by the site | n/a |
| 100 GB bandwidth a month | Mostly photos. A shelf visit loads 1 to 2 MB of images: about 50,000 to 80,000 visits a month | **The one to watch** |
| 100 GB asset storage | Thousands of product photos | Plenty |
| 2 datasets, **public only** | One (`production`). A catalogue is public anyway. | Fine |
| 2 webhooks | One (publish → refresh the site) | Fine |
| 3-day history | The shop can restore a mistake within 3 days | Acceptable |

### What happens at a limit

There is no overage billing on Free. Once a limit is hit, that feature is
blocked (the API answers `402`, uploads stop) until the monthly reset or an
upgrade. **No surprise bill is possible.** The risk is the opposite: the site
could stop getting fresh data. Pages Vercel already has cached keep serving.

Check usage at sanity.io/manage → the Finestra project → Usage.

### Do not build on the trial

These go away when the 30-day trial ends, so nothing here depends on them:
comments, tasks, scheduled publishing, private datasets, the Editor and
Contributor roles, and 90-day history.

### If Finestra outgrows Free

Growth is $15 per seat per month (two seats: $30), with pay-as-you-go
overage (for example $0.30 per GB of bandwidth over 100 GB).

## A separate cost, not Sanity's

Vercel's free **Hobby** plan is for **non-commercial use only**. Finestra is a
business, so the public launch should move to Vercel Pro (about $20 a month)
or another host. This does not block any of the Sanity work.

The image loader in `lib/image-loader.ts` already moves image resizing off
Vercel's metered optimiser, which keeps the Vercel bill down either way.

## Sources

- Agent quickstart: https://www.sanity.io/docs/getting-started/ai-coding-agents
- Pricing: https://www.sanity.io/pricing
- Plans and payments (quota behaviour): https://www.sanity.io/docs/plans-and-payments
- Growth trial: https://www.sanity.io/docs/platform-management/growth-plan-trial
