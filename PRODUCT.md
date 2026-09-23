# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) with TypeScript and Tailwind CSS v4, chosen by the user. Three parallel prototypes were built on branches `prototype-1`, `prototype-2`, `prototype-3`, each branched from `main`; the client approved Prototype 1 (Rickshaw Cinema), and `main` now holds that app directly. See `README.md` for current branch status. Ships a Homepage, a Products page, and a page per piece. No deploy target confirmed yet — see `README.md` loose ends before deploying.

## Users

Men and young adults in Bangladesh, roughly 16 to 30, who follow the brand on Facebook and Instagram. They arrive from a social post or a story, on a phone, usually on mobile data. They are deciding whether a ring, bracelet, pendant, or anime piece fits the look they are building for themselves. A meaningful share are anime fans buying a piece tied to a character or series they care about.

## Product Purpose

Finestra is a Bangladesh based online men's accessories and lifestyle brand. The site exists to give the brand a home it owns, outside the Facebook and Instagram feeds it currently sells through, where the full range can be browsed and a purchase can be started. Success is a visitor who understands the range, finds a piece that matches their style or their fandom, and starts an order.

## Positioning

Finestra sits where classic men's accessories meet fandom. A competitor can copy the rings or copy the anime merchandise, but the brand's position is carrying both under one identity, so that a customer's taste in jewelry and their taste in characters are served by the same shelf. The tagline "Eat Your Veggies and Style Up" frames this as balance and self care rather than costume.

## Operating Context

Fully online. Facebook ("Finestra Bangladesh") and Instagram ("finestrabangladesh") are the current sales and communication channels, so product discovery today happens inside a social feed and ordering happens in a direct message. The site must work for someone arriving cold from that feed on a phone. Pricing is in Bangladeshi Taka. Interface language is English.

## Capabilities and Constraints

- Current product lines: rings, bracelets, pendants, anime accessories.
- Stated expansion direction: wallets, belts, and other everyday men's essentials, plus further fan based and interest driven collections.
- The site does not take orders or payments and is not intended to. The client confirmed that ordering stays in a direct message, so the site is a showcase that ends by handing the customer to the shop's inbox. An earlier build carried an add to bag, a bag rail, and a checkout endpoint; all of it was removed rather than reworked.
- Channel order is fixed: Instagram first, WhatsApp second, Facebook last. Instagram and Facebook links are live. The WhatsApp link has not been supplied yet and is a placeholder in `lib/contact.ts` that must be filled before launch.
- Scope was two routes per prototype, Homepage and Products. After the client approved Prototype 1, the user asked for a product detail page, so `main` now also carries a page per piece at `/products/[id]`, prerendered from the placeholder catalogue. Still no account and no CMS.
- Undecided: real SKU list, real prices, shipping and returns policy, delivery coverage, payment methods, and the WhatsApp number. Because none of these are settled, no page states a reply time, a delivery time, a delivery charge, or a payment method.

## Brand Commitments

- Name: Finestra. Legal and social handle: Finestra Bangladesh.
- Tagline: "Eat Your Veggies and Style Up". Meaning: a balanced lifestyle, self care, confidence, and expressing individuality through style. Playful, youthful, self expressive.
- Statement: "Visualize. Stylize. Execute."
- Founded 31 October 2018 as a clothing brand. Moved to men's accessories in 2020. Expanded into anime inspired accessories in 2026.
- Palette is fixed by the guideline: Finestra Yellow #F8BE14 primary, Black #000000, White #FFFFFF. Yellow is the single brand color; no second accent is authorized.
- Logo typeface is Gellatio. Tagline and statement typeface is Brittany. Both are commercial licenses the user does not currently have on hand. The user approved substitute faces with a marked swap point, so every prototype must isolate its display and script faces behind tokens that can be repointed to the licensed files without touching components.
- Core values: individuality, creativity, quality, accessibility, evolution.
- Source of record: "Finestra Brand Guideline.pdf" at the repository root.

## Evidence on Hand

- The brand guideline PDF: identity, history, palette, typography, positioning, values, social handles.
- No real product catalogue, no photography, no prices, no customer testimonials, no press, no sales or follower figures.
- The user approved invented placeholder products with BDT prices, on the condition they are labeled as placeholder data in code.
- No image generation is permitted for this engagement. Product and lifestyle imagery uses third party placeholder URLs only.
- Nothing above may be presented as a factual commercial claim. No invented customer counts, review scores, ratings, stock levels, delivery times, or press mentions may appear in any prototype.

## Product Principles

1. Fandom and classic menswear share one shelf. Never split the brand into two sites wearing one logo.
2. The phone is the real device. A layout that only resolves on a desktop monitor has not shipped.
3. Yellow is the brand's whole voice. Earn expression from how yellow is deployed, not from adding colors to the palette.
4. Style is self care, not costume. The tone is confident and playful, never hype, never ironic about the customer.
5. Say only what is true. Where a prototype needs content the brand has not supplied, the content is labeled placeholder rather than dressed as fact.

## Accessibility & Inclusion

No standard was specified by the user. Baseline applies: WCAG AA contrast for text and controls, visible keyboard focus, `prefers-reduced-motion` honored. Note that #F8BE14 on white fails AA for body text, so yellow carries large display type, fills, and surfaces, and never small text on a light ground.
