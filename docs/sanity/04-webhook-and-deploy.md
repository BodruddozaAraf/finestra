# 4. Vercel, the publish webhook, and merging safely

## ⚠ Merge order matters

Once this branch is on `main`, **every Vercel build needs the Sanity
environment variables**. Without them, the build stops with "SANITY_PROJECT_ID
is not set". So, in this order:

1. Finish steps 1 to 5 of [02-developer-setup.md](02-developer-setup.md) (project exists and is seeded).
2. Add the environment variables to Vercel (below).
3. Only then merge `sanity-backend` into `main` and push.

## Environment variables on Vercel

In the Vercel dashboard → project **finestra** → Settings → Environment
Variables, add these for **Production** and **Preview**:

| Name | Value |
|---|---|
| `SANITY_PROJECT_ID` | the project ID |
| `SANITY_DATASET` | `production` |
| `SANITY_REVALIDATE_SECRET` | the same long random string as in `.env.local` |

None is exposed to the browser (no `NEXT_PUBLIC_` prefix).

## The publish webhook

This is what makes a Publish in the Studio show up on the site within seconds,
with no redeploy.

At https://www.sanity.io/manage → Finestra → **API** → **Webhooks** → **Create webhook**:

| Setting | Value |
|---|---|
| Name | Refresh website |
| URL | `https://finestra-tan.vercel.app/api/revalidate` (later, the real domain) |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| Filter | `_type in ["product", "category"]` |
| Projection | leave empty |
| Status | Enabled |
| HTTP method | POST |
| API version | v2025-02-19 |
| Include drafts | **off** |
| Secret | the `SANITY_REVALIDATE_SECRET` value |

The Free plan allows two webhooks. This uses one.

When the custom domain goes live, edit the webhook URL to match.

### What the route does

`app/api/revalidate/route.ts` checks the request's signature against the
secret (`@sanity/webhook`), then calls `revalidateTag("sanity", { expire: 0 })`.
Every cached Sanity read expires at once, and the next visit to any page
renders it fresh. A request with a bad or missing signature gets `401`.

## Image resizing

`next.config.ts` now uses `lib/image-loader.ts` instead of Vercel's image
optimiser. Product photos are resized by `cdn.sanity.io` and the homepage's
placeholders by `images.unsplash.com`. Both already serve WebP/AVIF at the
requested width. This keeps image work off Vercel's metered quota.

## Checking it works on production

1. Open a product page on the live site.
2. In the Studio, change that product's price and press **Publish**.
3. Reload the page after a few seconds. The new price shows.
4. In sanity.io/manage → API → Webhooks → the webhook → **Attempts**, the
   latest delivery should show status `200`.

If it shows `401`, the secret in Sanity and on Vercel differ. If it shows
`500`, `SANITY_REVALIDATE_SECRET` is missing on Vercel. After fixing a Vercel
variable, redeploy so the function picks it up.
