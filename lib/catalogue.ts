/**
 * The shape of a piece, and the copy that belongs to the code rather than to
 * the shop.
 *
 * The pieces themselves live in Sanity and are fetched in lib/sanity.ts. This
 * file holds no data and makes no requests, so client components can import
 * the types and helpers from it freely.
 *
 * Nothing here claims a stock level, a delivery time, a rating, or a review
 * count, because the brand has supplied none of those.
 */

/** A line's web-address slug, e.g. "rings". Lines are added in the Studio. */
export type Line = string;

/** Care copy is shared by finish rather than written out piece by piece. */
export type Finish =
  | "silver"
  | "steel"
  | "cord"
  | "stone"
  | "acrylic"
  | "enamel"
  | "resin";

/** A photograph, ready for next/image. */
export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position from the Studio's hotspot, when one is set. */
  position?: string;
};

export type LineInfo = { id: Line; label: string; note: string };

/** Mirrors the `piece` schema in studio/schemaTypes/piece.ts. */
export type Product = {
  /** The web-address slug, used in /products/[id]. */
  id: string;
  name: string;
  line: Line;
  lineLabel: string;
  /** Bangladeshi Taka. */
  price: number;
  material: string;
  /** One line on what the piece is. */
  story: string;
  /** Keys into CARE for the care note on the piece page. */
  finish: Finish;
  /** Variant label shown above the chips, e.g. "Size" or "Length". */
  variantLabel: string;
  variants: string[];
  soldOut: boolean;
  /** Marks the pieces the homepage pulls onto the shelf rail. */
  onShelf: boolean;
  /** The piece's own shot: the shelf card and the first frame of its page. */
  image: Photo;
  /** Further frames for the piece page, in the order the shop set. */
  frames: Photo[];
};

export const CARE: Record<Finish, string> = {
  silver:
    "925 silver darkens with wear. A dry cloth brings it back. Keep it off perfume and chlorine.",
  steel:
    "Steel takes water and sweat without trouble. Wipe it dry and it stays as it arrived.",
  cord: "Waxed cord is not waterproof. Take it off before a shower and let it dry flat.",
  stone:
    "Stone is softer than it looks. Keep it clear of knocks and household cleaners.",
  acrylic:
    "Printed acrylic scratches. Keep it out of a pocket full of keys and clean it with a soft cloth.",
  enamel:
    "Enamel chips if it takes a hard knock. Keep it off a ring loaded with heavy metal.",
  resin:
    "Painted resin is made to be looked at. Keep it out of direct sun so the paint holds.",
};

export const taka = (n: number) => `৳ ${n.toLocaleString("en-US")}`;

/** Other pieces from the same line, for the rail at the foot of a piece page. */
export const alongside = (product: Product, pieces: Product[], count = 4) =>
  pieces
    .filter((p) => p.line === product.line && p.id !== product.id)
    .slice(0, count);
