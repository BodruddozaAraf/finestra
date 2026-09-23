# Finestra

Online storefront prototype for Finestra Bangladesh, a men's accessories and
lifestyle brand. Next.js App Router, TypeScript, Tailwind CSS v4.

## Routes

- `/` — homepage.
- `/products` — the shelf, with line filters and the bag rail.
- `/products/[id]` — one page per piece, prerendered from the placeholder
  catalogue. Everything under `/products` shares one bag, held by
  `app/products/layout.tsx`.

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

### Loose ends before going live

- The `.vercel/project.json` in this working tree still points at the old
  `finestra-showcase` Vercel project, linked back when the multi-concept
  `showcase` app was deployed for client review. Re-link/verify the Vercel
  project target before deploying `main` to production — don't ship straight
  to the showcase project.
- Vercel CLI is not installed globally in this environment.
- No payment processor, inventory backend, or real product/catalogue data
  exists yet. See `PRODUCT.md` → Capabilities and Constraints.

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
