# 3. The content model

Three document types: `product`, `category`, and `collection`. The schema
lives in `studio/schemaTypes/`; the website's matching type is `Product` in
`lib/catalogue.ts`, filled by the query in `lib/sanity.ts`. Change all three
together.

## `product`

| Field | Studio label | Type | Required | Site use |
|---|---|---|---|---|
| `name` | Name | text, max 60 | yes | Card title, page `<h1>` |
| `slug` | Web address | slug from name | yes | `/products/<slug>`; becomes `Product.id` |
| `category` | Category | reference → `category` | yes | Filter, "the rest of the category" rail |
| `collection` | Collection | reference → `collection` | no | Collection filter, link in the route strip, spec band |
| `price` | Price (Taka) | whole number > 0 | yes | `taka()` formatting |
| `soldOut` | Sold out | on/off | no | The painted "Sold out" band |
| `onShelf` | On the homepage shelf | on/off | no | Homepage "On the shelf this week" rail |
| `mainImage` | Main photo | image + hotspot + description | yes | Shelf card and first frame of the product page |
| `frames` | More photos | up to 8 images, each with description | no | Further frames on the product page |
| `material` | Material | text, max 60 | yes | Under the name; the spec band |
| `story` | Story | text, max 240 | yes | Product page and meta description |
| `optionGroups` | Options | up to 2 option groups | no | The option rows on the product page; the spec band |

### Option groups

Each group is a name and its choices, e.g. **Colour**: Silver, Black and
**Size**: 8, 9, 10. A one-size or adjustable piece has no groups.

| Field | Studio label | Required | Site use |
|---|---|---|---|
| `label` | What the options are called | yes | e.g. "Colour", the label over the row |
| `values[].label` | Name | yes | The chip, e.g. "Black" |
| `values[].image` | Photo | no | Joins the frame rail; the chip becomes a button that shows it |
| `values[].soldOut` | Sold out | no | The chip is struck through; the rest of the product stays available |

Sold out is per choice, not per combination: "Black" can be sold out, but not
"Black in size 10" on its own. The product-wide **Sold out** switch still marks
the whole piece.

Products have no position field. The site and the Studio list them newest
first, by Sanity's own `_createdAt`, so a product the shop adds today leads the
shelf without anyone renumbering the rest.

Each photo's **description** (`alt`) is required, because it is what a screen
reader speaks in its place. The Studio refuses to publish without it.

The **hotspot** the shop sets on a photo becomes the photo's
`object-position` on the site, so the important part stays in view when the
square or 4:5 frame crops it. A **crop** set in the Studio is applied to the
image URL itself.

## `category`

| Field | Studio label | Required | Site use |
|---|---|---|---|
| `label` | Name | yes | Filter label, breadcrumb, spec band |
| `slug` | Web address | yes | `/products?category=<slug>` |
| `note` | Short note | no | The small line under each filter |
| `order` | Position | no | Filter order (lower first) |

Categories keep a position because the filter is a short, deliberate list:
Rings before Key Rings is a choice, not an accident of when each was created.

A category is **what the piece is**. Lines that run across categories belong
in a collection instead.

A category with no published products is hidden from the filter, so adding
"Wallets" before any wallet exists does not create an empty filter.

Sanity will not delete a category that products still point to. The products
have to be moved to another category, or deleted, first.

## `collection`

A line that cuts across categories, such as **Anime**: an anime ring is in
Rings, an anime key ring in Key Rings, and both are in the Anime collection.
A product belongs to one collection or none.

The fields match `category`: `label`, `slug` (`/products?collection=<slug>`),
`note`, and `order`. A collection with no published products is hidden from
the filter, and one that products still point to cannot be deleted.

## What stays in the code

- **Homepage hero and editorial photos** (`lib/images.ts`). These could become
  an editable "Homepage" document later if the shop wants to change them.
- **Contact links** (`lib/contact.ts`). The WhatsApp link stays `#` until the
  shop supplies a number.

## How the site reads it

`lib/sanity.ts` sends one GROQ query for every published category, collection,
and product, using a plain `fetch` to `https://<project>.api.sanity.io/v2025-02-19/data/query/production`.
Next caches the answer under the tag `sanity`. React's `cache()` means a page
makes that request once, however many components need the catalogue.

- Only **published** documents are read (`perspective=published`). Drafts
  never reach the site.
- A product without a slug, a category, or a main photo is skipped rather than
  shown half-built.
- The cache is refreshed when the publish webhook fires (see 04), with an
  hourly refresh as a safety net in case a webhook is ever missed.
