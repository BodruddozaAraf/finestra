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

/** Mirrors the `product` schema in studio/schemaTypes/product.ts. */
export type Product = {
  /** The web-address slug, used in /products/[id]. */
  id: string;
  name: string;
  category: Category;
  categoryLabel: string;
  /** Bangladeshi Taka. */
  price: number;
  material: string;
  /** One line on what the product is. */
  story: string;
  /** Variant label shown above the chips, e.g. "Size" or "Length". */
  variantLabel: string;
  variants: string[];
  soldOut: boolean;
  /** Marks the products the homepage pulls onto the shelf rail. */
  onShelf: boolean;
  /** The product's own shot: the shelf card and the first frame of its page. */
  image: Photo;
  /** Further frames for the product page, in the order the shop set. */
  frames: Photo[];
};

export const taka = (n: number) => `৳ ${n.toLocaleString("en-US")}`;

/** Other products from the same category, for the rail at the foot of a product page. */
export const alongside = (product: Product, products: Product[], count = 4) =>
  products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count);
