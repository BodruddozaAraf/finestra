/**
 * The shape of a product, and the copy that belongs to the code rather than
 * to the shop.
 *
 * The products themselves live in Sanity and are fetched in lib/sanity.ts. This
 * file holds no data and makes no requests, so client components can import
 * the types and helpers from it freely.
 *
 * Nothing here claims a stock level, a delivery time, a rating, or a review
 * count, because the brand has supplied none of those.
 */

/** A category's web-address slug, e.g. "rings". Categories are added in the Studio. */
export type Category = string;

/** A photograph, ready for next/image. */
export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position from the Studio's hotspot, when one is set. */
  position?: string;
};

export type CategoryInfo = { id: Category; label: string; note: string };

/** A collection's web-address slug, e.g. "anime". Collections cut across categories. */
export type Collection = string;

export type CollectionInfo = { id: Collection; label: string; note: string };

/** One choice within a group, e.g. "Black" under Colour. */
export type OptionValue = {
  label: string;
  /** The product in this option, when the choice changes how it looks. */
  image?: Photo;
  soldOut: boolean;
};

/** A named set of choices, e.g. Colour: Silver, Black. A product has up to two. */
export type OptionGroup = { label: string; values: OptionValue[] };

/** Mirrors the `product` schema in studio/schemaTypes/product.ts. */
export type Product = {
  /** The web-address slug, used in /products/[id]. */
  id: string;
  name: string;
  category: Category;
  categoryLabel: string;
  /** Absent for classic pieces that belong to no collection. */
  collection?: Collection;
  collectionLabel?: string;
  /** Bangladeshi Taka. */
  price: number;
  material: string;
  /** One line on what the product is. */
  story: string;
  /** Empty for one-size or adjustable pieces. */
  options: OptionGroup[];
  soldOut: boolean;
  /** Marks the products the homepage pulls onto the shelf rail. */
  onShelf: boolean;
  /** The product's own shot: the shelf card and the first frame of its page. */
  image: Photo;
  /** Further frames for the product page, in the order the shop set. */
  frames: Photo[];
};

export const taka = (n: number) => `৳ ${n.toLocaleString("en-US")}`;

/**
 * Other products for the rail at the foot of a product page: the same category
 * first, then the same collection, then the rest of the shelf, so a thin
 * category still fills the rail.
 */
export const alongside = (product: Product, products: Product[], count = 6) => {
  const others = products.filter((p) => p.id !== product.id);
  const rank = (p: Product) =>
    p.category === product.category
      ? 0
      : product.collection && p.collection === product.collection
        ? 1
        : 2;
  // Array sort is stable, so each rank keeps the shelf's newest-first order.
  return others.sort((a, b) => rank(a) - rank(b)).slice(0, count);
};
