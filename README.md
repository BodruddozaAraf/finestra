# Finestra

Online storefront prototype for Finestra Bangladesh, a men's accessories and
lifestyle brand. Next.js App Router, TypeScript, Tailwind CSS v4.

## Routes

- `/` — homepage.
- `/products` — the shelf, with line filters.
- `/products/[id]` — one page per piece, prerendered from the placeholder
  catalogue.

The site takes no orders and no payments. Every piece page ends by handing the
customer to the shop's inbox — Instagram, then WhatsApp, then Facebook — and
every one of those links resolves through `lib/contact.ts`.

## Project status (2026-09-20)

Three design concepts were built in parallel, each on its own branch off
`main`: `prototype-1` (Rickshaw Cinema), `prototype-2` (Kacha Bazar),
`prototype-3` (The Set). All three were also combined into one review app on
the `showcase` branch (pushed to GitHub) behind a switcher bar, for the
client to compare side by side.

**The client approved Prototype 1 (Rickshaw Cinema).** `main` has been
fast-forwarded to `prototype-1`'s tip and pushed to `origin/main`. `main` now
**is** Prototype 1 directly at the app root — no switcher, no other concepts,
no route groups. This is the branch to build on going forward, toward a live
launch.

`prototype-1`, `prototype-2`, `prototype-3`, and `showcase` still exist
(locally, and `showcase` also on GitHub) as history/reference only. They are
not being developed further and nothing was deleted.

### Deployment

`main` deploys to the `finestra` Vercel project (re-linked 2026-09-24 — the
original `finestra-showcase` project, used for the three-concept client
review, had since been deleted). Vercel's GitHub integration auto-deploys
every push to production, currently live at
https://finestra-tan.vercel.app. That URL is for the client only; it is not
yet meant for the customer base — see the loose ends below before pointing
the real audience at it.

### Loose ends before going live

- **The WhatsApp link in `lib/contact.ts` is still `#`.** The client has not
  supplied a number, so that button renders but goes nowhere. Do not point a
  live audience at the site until it is filled in.
- No real product or catalogue data exists yet. See `PRODUCT.md` →
  Capabilities and Constraints.

## Docs map

Read these instead of re-deriving context from the code:

- `PRODUCT.md` — product and brand truth: audience, positioning, brand
  constraints, what's confirmed vs. placeholder.
- `DESIGN.md` — the design system actually built here (colour, type,
  structure, motion, state) for the approved concept.
- `.impeccable/surfaces/prototype-1.md` — why this design direction was
  chosen over the other candidates during concepting.
- `Finestra Brand Guideline.pdf` — source brand guideline.

## Run locally

```bash
npm install
npm run dev
```
