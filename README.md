# Finestra prototypes

Three design concepts for Finestra Bangladesh, each built as a Homepage and a
Products page, running side by side in one app.

```bash
npm install
npm run dev
```

| Route | Concept | World |
| --- | --- | --- |
| `/` | Index | Links and a one-line summary of each concept. |
| `/proto-1`, `/proto-1/products` | Rickshaw Cinema | Hand-painted Dhaka rickshaw panels and cinema banner hoardings. |
| `/proto-2`, `/proto-2/products` | Kacha Bazar | A Dhaka morning market stall, priced by hand on a chalk board. |
| `/proto-3`, `/proto-3/products` | The Set | A trading-card set. Every piece is issued as a card. |

The dark bar pinned to the top of every concept switches between them. It keeps
you on the same page, so `/proto-1/products` becomes `/proto-2/products` rather
than dropping you back on a homepage, which is what makes the two surfaces
comparable.

## How this branch is put together

Each concept owns a **separate root layout** under its own route group, so its
stylesheet, design tokens, and Tailwind utilities load only on its own routes.
The three worlds share no CSS and cannot collide: `proto-1` has no idea
`proto-2` exists. Verified by fetching each route's stylesheet and confirming
that only its own utilities appear in it.

```
app/(index)/            the index page and its own neutral stylesheet
app/(p1)/               root layout for concept 1, imports proto1/styles.css
app/(p1)/proto-1/       its homepage and products page
app/(p2)/ ... (p3)/     the same, for concepts 2 and 3
proto1/ proto2/ proto3/ each concept's components, data, and stylesheet
showcase/Switcher.tsx   the review bar, deliberately neutral chrome
```

The switcher is fixed at 46px tall, and each concept's own sticky header is
offset by that amount. That offset is the only change made to the concepts
themselves; everything else is exactly as committed on its own branch.

## Source branches

The three concepts are also kept as standalone branches, each with its own
`DESIGN.md` recording the built world and its rules:

- `prototype-1` Rickshaw Cinema
- `prototype-2` Kacha Bazar
- `prototype-3` The Set

`main` holds the shared scaffold and `PRODUCT.md`, the record of confirmed
product truth taken from the brand guideline.

## What is placeholder

Products, prices, set codes, notes, and photography in all three concepts are
invented for the prototypes and are labelled as such on the surface. Each
concept resolves all of it through two files, `lib/catalogue.ts` and
`lib/images.ts`, so replacing them with real stock and real photography is a
two-file edit per concept.

Gellatio and Brittany, the brand's licensed faces, were not supplied. Each
concept substitutes them and isolates its display and script faces behind two
CSS variables in its stylesheet, so the licensed files can be dropped in
without touching a component.

Checkout is a visual endpoint in all three and says so when pressed. No
customer counts, ratings, stock levels, delivery times, or press mentions
appear anywhere.
