# 6. Checklist

Ticked = done on the `sanity-backend` branch (not committed yet). Unticked =
still to do. Details for each step are in the file named after it.

## Phase 0: safety

- [x] Confirm `main` is fully committed and pushed (`4cb092a`, matches `origin/main`). This is the return point.
- [x] Create the `sanity-backend` branch.

## Phase 1: Studio and content model (code)

- [x] `studio/` Studio package: `sanity.config.ts`, `sanity.cli.ts`, `env.ts`, `structure.ts` (Products, Products by category, Categories).
- [x] Schema: `product` and `category` with validation and plain-language help text (03).
- [x] Placeholder catalogue moved to `studio/scripts/placeholder-catalogue.ts`; seed script `studio/scripts/seed.ts`.
- [x] Studio type-checks, Sanity's schema validator reports 0 errors, and `sanity build` succeeds.

## Phase 2: website reads from Sanity (code)

- [x] `lib/sanity.ts`: one cached GROQ query, tagged `sanity`, published content only.
- [x] `lib/catalogue.ts`: types and helpers only; `Product` carries its own photos and category label.
- [x] `lib/images.ts`: per-product photo maps removed; homepage photos stay.
- [x] Pages and components (`/products`, `/products/[id]`, homepage shelf, Catalogue, ProductPlate, ProductRail, ProductBroadside) read from Sanity data.
- [x] Photo hotspot becomes `object-position`.
- [x] `lib/image-loader.ts` + `next.config.ts`: resizing on Sanity's and Unsplash's CDNs.
- [x] `app/api/revalidate/route.ts`: signed webhook → `revalidateTag`.
- [x] Root `tsconfig.json` excludes `studio/`; `.env.example` files added.
- [x] Site compiles and type-checks. `next build` stops only at "SANITY_PROJECT_ID is not set", as expected before step 3.

## Phase 3: connect to a real project (02). Needs the developer at the computer

- [x] Step 1: `npx sanity login` (browser sign-in, **you**).
- [x] Step 2: create the project and public `production` dataset. Project ID `2j83ka60`.
- [x] Step 3: project ID in `studio/.env` and `.env.local`, plus a revalidate secret.
- [x] Step 4: `npm run schema:deploy` (2026-10-05).
- [x] Step 5: `npm run seed`: the dataset holds 21 products, 4 categories, 24 photos.
- [ ] Step 6: Studio runs at localhost:3333 and shows the products. (Starts and shows the sign-in screen, 2026-10-26; products not yet viewed after sign-in.)
- [x] Step 7: the site at localhost:3000 looks identical to `main`, with photos from `cdn.sanity.io`; `next build` passes (2026-10-26: homepage rail, shelf + filters, piece page checked).
- [x] Step 8: `npm run deploy` publishes the Studio at finestra.sanity.studio (Studio upgraded to sanity 6.20.0 first).
- [ ] Step 9 (optional): Sanity MCP and agent skills for Claude.

## Phase 4: go live (04)

- [ ] Add `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_REVALIDATE_SECRET` to Vercel (Production + Preview).
- [ ] Review the branch, then commit, merge to `main`, and push (only when you say so).
- [x] Webhook route tested locally on a production build (2026-10-26): unsigned or wrong secret → 401; signed → 200, and the next page request is a cache MISS (fresh), then HIT.
- [ ] Create the publish webhook in sanity.io/manage.
- [ ] Test: change a price in the Studio → the live page updates without a redeploy.
- [ ] Test: add a new product → its page works without a redeploy.

## Phase 5: hand over to the shop (05)

- [ ] Invite the shop as **Administrator** (sanity.io/manage → Members).
- [ ] Send them `05-client-guide.md` (add screenshots once the Studio is live).
- [ ] The shop enters real products and photos, and deletes the placeholders.

## Phase 6: after real data is in

- [ ] Remove the "Sample stock" notices on `/products` and `/products/[id]`, and "Placeholder piece…" in the product page's meta description.
- [ ] After a week, check sanity.io/manage → Usage against the Free limits (01).
- [ ] Optional: an editable "Homepage" document for the hero and editorial photos.
- [ ] Before the public launch: Vercel Pro (Hobby is non-commercial only) and the WhatsApp number.
