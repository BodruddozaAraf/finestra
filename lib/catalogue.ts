/**
 * PLACEHOLDER CATALOGUE. Not real Finestra stock.
 *
 * Names, prices, variants, descriptions, and availability here are invented so
 * the prototype can demonstrate a working catalogue. Replace wholesale with the
 * real product list before this goes anywhere near a customer. The surface says
 * so out loud as well; see the stock note on the products page and on every
 * piece page.
 *
 * Nothing here claims a stock level, a delivery time, a rating, or a review
 * count, because the brand has supplied none of those.
 */

export type Line = "rings" | "bracelets" | "pendants" | "anime";

/** Care copy is shared by finish rather than written out piece by piece. */
export type Finish =
  | "silver"
  | "steel"
  | "cord"
  | "stone"
  | "acrylic"
  | "enamel"
  | "resin";

export type Product = {
  id: string;
  name: string;
  line: Line;
  /** Bangladeshi Taka. Placeholder figures. */
  price: number;
  material: string;
  /** One line on what the piece is. Placeholder copy. */
  story: string;
  /** Keys into CARE for the care note on the piece page. */
  finish: Finish;
  /** Variant label shown above the chips, e.g. "Size" or "Length". */
  variantLabel: string;
  variants: string[];
  soldOut?: boolean;
  /** Marks the pieces the homepage pulls onto the shelf rail. */
  onShelf?: boolean;
};

export const LINES: { id: Line; label: string; note: string }[] = [
  { id: "rings", label: "Rings", note: "Signets, bands, stone settings" },
  { id: "bracelets", label: "Bracelets", note: "Chain, cord, and cuff" },
  { id: "pendants", label: "Pendants", note: "Cords and chains" },
  { id: "anime", label: "Anime", note: "Charms, keyrings, stands" },
];

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

export const CATALOGUE: Product[] = [
  {
    id: "ring-signet",
    name: "Kalighat Signet",
    line: "rings",
    price: 1450,
    material: "925 silver",
    story:
      "A broad flat face over a deep bezel, cut so the shoulders stay low against the finger.",
    finish: "silver",
    variantLabel: "Size",
    variants: ["17mm", "18mm", "19mm", "20mm", "21mm"],
    onShelf: true,
  },
  {
    id: "ring-band-trio",
    name: "Three Plain Bands",
    line: "rings",
    price: 1180,
    material: "925 silver, set of three",
    story:
      "Three unmarked bands, meant to be stacked on one finger or split across both hands.",
    finish: "silver",
    variantLabel: "Size",
    variants: ["17mm", "18mm", "19mm", "20mm"],
    onShelf: true,
  },
  {
    id: "ring-obsidian",
    name: "Nightstone Band",
    line: "rings",
    price: 1620,
    material: "Matte steel, stone inlay",
    story:
      "A dark stone set into a squared channel, with the metal left matte so the stone does the talking.",
    finish: "steel",
    variantLabel: "Size",
    variants: ["18mm", "19mm", "20mm", "21mm"],
  },
  {
    id: "ring-inked",
    name: "Broadface Ring",
    line: "rings",
    price: 1340,
    material: "Brushed steel",
    story:
      "One wide unbroken face, brushed rather than polished, so it sits beside a tattooed hand without competing with it.",
    finish: "steel",
    variantLabel: "Size",
    variants: ["19mm", "20mm", "21mm", "22mm"],
  },
  {
    id: "ring-hammered",
    name: "Hammered Wide Band",
    line: "rings",
    price: 980,
    material: "925 silver",
    story:
      "Worked by hand across the whole face, so the light breaks differently on every band.",
    finish: "silver",
    variantLabel: "Size",
    variants: ["17mm", "18mm", "19mm", "20mm", "21mm"],
    soldOut: true,
  },
  {
    id: "ring-plain-steel",
    name: "Everyday Steel Band",
    line: "rings",
    price: 640,
    material: "Surgical steel",
    story:
      "The plain one. Thin, square edged, and built to be forgotten about by the second day.",
    finish: "steel",
    variantLabel: "Size",
    variants: ["18mm", "19mm", "20mm", "21mm", "22mm"],
  },
  {
    id: "brac-cuban",
    name: "Cuban Link Bracelet",
    line: "bracelets",
    price: 1780,
    material: "Steel, gold tone",
    story:
      "Tight links and a box clasp that closes flush, so nothing catches on a sleeve.",
    finish: "steel",
    variantLabel: "Length",
    variants: ["19cm", "20cm", "21cm"],
    onShelf: true,
  },
  {
    id: "brac-shackle",
    name: "Shackle Cuff",
    line: "bracelets",
    price: 1950,
    material: "925 silver",
    story:
      "A single heavy bar closed with a screw pin, borrowed straight from a boat shackle.",
    finish: "silver",
    variantLabel: "Length",
    variants: ["19cm", "20cm", "21cm", "22cm"],
    onShelf: true,
  },
  {
    id: "brac-cord-stack",
    name: "Four Cord Stack",
    line: "bracelets",
    price: 720,
    material: "Waxed cord, steel clasp",
    story:
      "Four waxed cords gathered on one clasp, so the whole stack goes on in a single motion.",
    finish: "cord",
    variantLabel: "Length",
    variants: ["Adjustable"],
  },
  {
    id: "brac-flat-chain",
    name: "Flat Chain Bracelet",
    line: "bracelets",
    price: 1290,
    material: "925 silver",
    story:
      "A flat woven chain that lies against the wrist instead of rolling around it.",
    finish: "silver",
    variantLabel: "Length",
    variants: ["19cm", "20cm", "21cm"],
  },
  {
    id: "brac-beaded",
    name: "Beaded Wrist Line",
    line: "bracelets",
    price: 560,
    material: "Stone beads, elastic",
    story:
      "Matte stone on elastic, cut small enough to disappear under a shirt cuff.",
    finish: "stone",
    variantLabel: "Length",
    variants: ["18cm", "19cm", "20cm"],
  },
  {
    id: "pend-anchor",
    name: "Anchor on Cord",
    line: "pendants",
    price: 890,
    material: "Steel pendant, waxed cord",
    story:
      "A cast anchor on waxed cord, hung short so it sits at the collarbone rather than on the chest.",
    finish: "cord",
    variantLabel: "Cord",
    variants: ["50cm", "55cm", "60cm"],
    onShelf: true,
  },
  {
    id: "pend-anchor-black",
    name: "Anchor, Blacked",
    line: "pendants",
    price: 940,
    material: "Blackened steel, cord",
    story: "The same anchor, blackened, for wearing against a dark shirt.",
    finish: "cord",
    variantLabel: "Cord",
    variants: ["50cm", "55cm", "60cm"],
  },
  {
    id: "pend-jade",
    name: "Green Stone Drop",
    line: "pendants",
    price: 1120,
    material: "Stone, braided cord",
    story: "A single polished drop on braided cord, with no metal in sight.",
    finish: "stone",
    variantLabel: "Cord",
    variants: ["50cm", "60cm"],
  },
  {
    id: "pend-chain",
    name: "Fine Rope Chain",
    line: "pendants",
    price: 1460,
    material: "925 silver",
    story:
      "A fine rope chain that works on its own, or as the carrier for anything else here.",
    finish: "silver",
    variantLabel: "Chain",
    variants: ["45cm", "50cm", "55cm", "60cm"],
  },
  {
    id: "pend-cuban-set",
    name: "Heavy Cuban Chain",
    line: "pendants",
    price: 2240,
    material: "Steel, gold tone",
    story:
      "The heavy one. Wide flat links, with weight you notice the moment it goes on.",
    finish: "steel",
    variantLabel: "Chain",
    variants: ["50cm", "55cm", "60cm"],
    onShelf: true,
  },
  {
    id: "anime-keyring",
    name: "Shinobi Keyring",
    line: "anime",
    price: 340,
    material: "Enamel charm, steel ring",
    story: "An enamelled charm on a split ring, sized for keys or a bag strap.",
    finish: "enamel",
    variantLabel: "Finish",
    variants: ["Enamel", "Matte"],
    onShelf: true,
  },
  {
    id: "anime-acrylic",
    name: "Kitsune Mask Charm",
    line: "anime",
    price: 290,
    material: "Printed acrylic",
    story:
      "A printed mask charm, cut to its own outline rather than dropped into a rectangle.",
    finish: "acrylic",
    variantLabel: "Finish",
    variants: ["Gloss", "Holo"],
    onShelf: true,
  },
  {
    id: "anime-charm",
    name: "Ronin Bag Charm",
    line: "anime",
    price: 380,
    material: "Printed acrylic, clasp",
    story:
      "A printed charm on a lobster clasp, for a bag strap rather than a keyring.",
    finish: "acrylic",
    variantLabel: "Finish",
    variants: ["Gloss", "Holo"],
  },
  {
    id: "anime-stand",
    name: "Desk Stand Charm",
    line: "anime",
    price: 450,
    material: "Acrylic, weighted base",
    story:
      "A standing cut-out on a weighted base, made for a desk instead of a pocket.",
    finish: "acrylic",
    variantLabel: "Finish",
    variants: ["Clear", "Frosted"],
  },
  {
    id: "anime-figure",
    name: "Sitting Figure",
    line: "anime",
    price: 860,
    material: "Painted resin",
    story:
      "A seated figure, finished by hand, meant to be looked at rather than carried around.",
    finish: "resin",
    variantLabel: "Pose",
    variants: ["Seated"],
    soldOut: true,
  },
];

export const taka = (n: number) => `৳ ${n.toLocaleString("en-US")}`;

export const byId = (id: string) => CATALOGUE.find((p) => p.id === id);

export const lineOf = (id: Line) => LINES.find((l) => l.id === id)!;

/** Other pieces from the same line, for the rail at the foot of a piece page. */
export const alongside = (product: Product, count = 4) =>
  CATALOGUE.filter((p) => p.line === product.line && p.id !== product.id).slice(
    0,
    count,
  );
