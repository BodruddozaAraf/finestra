# Sanity CMS for Finestra

The catalogue (pieces, lines, product photos) moves out of the code and into
[Sanity](https://www.sanity.io), so the shop can add, edit, and remove pieces
without a developer. The website stays a Next.js site on Vercel and reads the
published pieces from Sanity.

Work happens on the `sanity-backend` branch. `main` at commit `4cb092a` is the
last state before this work and is safe to return to.

## Read in this order

1. [01-overview-and-pricing.md](01-overview-and-pricing.md): what Sanity is, what it costs (nothing, on the Free plan), and the limits to watch.
2. [02-developer-setup.md](02-developer-setup.md): the one-time setup, step by step: sign-in, project, schema, sample data, Studio online.
3. [03-content-model.md](03-content-model.md): the fields of a piece and a line, and how they map onto the site's code.
4. [04-webhook-and-deploy.md](04-webhook-and-deploy.md): Vercel environment variables, the publish webhook, and merging to `main` safely.
5. [05-client-guide.md](05-client-guide.md): the shop's guide to adding, editing, hiding, and deleting pieces. Written to be sent to the client.
6. [06-checklist.md](06-checklist.md): every step as a checklist, with what is done and what is waiting.

## Where things live

| Path | What it is |
|---|---|
| `studio/` | The Sanity Studio (the shop's admin panel). Its own `package.json`; the website never imports it. |
| `studio/schemaTypes/` | The fields of a `piece` and a `line`. |
| `studio/scripts/seed.ts` | Loads the 21 placeholder pieces and their photos into Sanity once. |
| `lib/sanity.ts` | The website's only connection to Sanity: one cached query for the whole catalogue. |
| `lib/catalogue.ts` | The `Product` type, care copy, and helpers. No data any more. |
| `lib/image-loader.ts` | Resizes photos on Sanity's and Unsplash's own CDNs instead of Vercel's metered optimiser. |
| `app/api/revalidate/route.ts` | Receives Sanity's publish webhook and refreshes the site's cache. |

## Status

See [06-checklist.md](06-checklist.md). In short: all the code is written and
type-checks. Nothing can run against real data until a Sanity project exists,
and creating one needs the developer's one-time browser sign-in (step 1 of
02-developer-setup.md).
