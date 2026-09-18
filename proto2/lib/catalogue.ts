/**
 * PLACEHOLDER CATALOGUE. Not real Finestra stock.
 *
 * Names, prices, variants, notes, and availability are invented so the
 * prototype can demonstrate a working stall. Replace wholesale with the real
 * product list before this goes anywhere near a customer. The surface says so
 * out loud as well; see the stock note on the products page.
 *
 * Two fields exist for this prototype's world:
 *  - `note` gives every crate its own line about that specific piece, rather
 *    than repeating one spec row twenty-one times.
 *  - `span` is how many module cells the crate takes on the wall. The wall
 *    snaps to the module, so a crate is 1 or 2 cells wide and 1 or 2 tall.
 */

export type Line = "rings" | "bracelets" | "pendants" | "anime";

export type Span = "1x1" | "2x1" | "1x2" | "2x2";

export type Product = {
  id: string;
  name: string;
  line: Line;
  /** Bangladeshi Taka. Placeholder figures. */
  price: number;
  material: string;
  /** This crate's own line. Never a shared template. */
  note: string;
  variantLabel: string;
  variants: string[];
  span: Span;
  soldOut?: boolean;
  /** Pulled onto the homepage wall. */
  onWall?: boolean;
};

export const LINES: { id: Line; label: string }[] = [
  { id: "rings", label: "Rings" },
  { id: "bracelets", label: "Bracelets" },
  { id: "pendants", label: "Pendants" },
  { id: "anime", label: "Anime" },
];

/** Which region of the wall a line hangs under on the homepage. */
export const REGION: Record<Line, "everyday" | "character"> = {
  rings: "everyday",
  bracelets: "everyday",
  pendants: "everyday",
  anime: "character",
};

export const CATALOGUE: Product[] = [
  {
    id: "ring-signet",
    name: "Kalighat Signet",
    line: "rings",
    price: 1450,
    material: "925 silver",
    note: "The face is wide enough to catch light across a room, which is the whole point of a signet.",
    variantLabel: "Size",
    variants: ["17mm", "18mm", "19mm", "20mm", "21mm"],
    span: "2x2",
    onWall: true,
  },
  {
    id: "ring-band-trio",
    name: "Three Plain Bands",
    line: "rings",
    price: 1180,
    material: "925 silver, set of three",
    note: "Sold as three so you can wear one, stack two, and lose one without it mattering.",
    variantLabel: "Size",
    variants: ["17mm", "18mm", "19mm", "20mm"],
    span: "1x1",
    onWall: true,
  },
  {
    id: "ring-obsidian",
    name: "Nightstone Band",
    line: "rings",
    price: 1620,
    material: "Matte steel, stone inlay",
    note: "Matte steel, so it does not compete with whatever else is on the hand.",
    variantLabel: "Size",
    variants: ["18mm", "19mm", "20mm", "21mm"],
    span: "1x1",
    onWall: true,
  },
  {
    id: "ring-inked",
    name: "Broadface Ring",
    line: "rings",
    price: 1340,
    material: "Brushed steel",
    note: "Built heavy on purpose. You will notice it on your hand all day.",
    variantLabel: "Size",
    variants: ["19mm", "20mm", "21mm", "22mm"],
    span: "1x1",
  },
  {
    id: "ring-hammered",
    name: "Hammered Wide Band",
    line: "rings",
    price: 980,
    material: "925 silver",
    note: "Every one is hammered by hand, so no two catch the light the same way.",
    variantLabel: "Size",
    variants: ["17mm", "18mm", "19mm", "20mm", "21mm"],
    span: "1x1",
    soldOut: true,
  },
  {
    id: "ring-plain-steel",
    name: "Everyday Steel Band",
    line: "rings",
    price: 640,
    material: "Surgical steel",
    note: "The one to start with. Cheap enough to wear somewhere it might get scratched.",
    variantLabel: "Size",
    variants: ["18mm", "19mm", "20mm", "21mm", "22mm"],
    span: "2x1",
  },
  {
    id: "brac-cuban",
    name: "Cuban Link Bracelet",
    line: "bracelets",
    price: 1780,
    material: "Steel, gold tone",
    note: "Sits at the same weight as the chain, if you are building a matched pair.",
    variantLabel: "Length",
    variants: ["19cm", "20cm", "21cm"],
    span: "1x2",
    onWall: true,
  },
  {
    id: "brac-shackle",
    name: "Shackle Cuff",
    line: "bracelets",
    price: 1950,
    material: "925 silver",
    note: "The screw pin is the closure, so it stays on until you decide otherwise.",
    variantLabel: "Length",
    variants: ["19cm", "20cm", "21cm", "22cm"],
    span: "1x1",
    onWall: true,
  },
  {
    id: "brac-cord-stack",
    name: "Four Cord Stack",
    line: "bracelets",
    price: 720,
    material: "Waxed cord, steel clasp",
    note: "Waxed cord takes the monsoon better than leather does.",
    variantLabel: "Length",
    variants: ["Adjustable"],
    span: "1x1",
  },
  {
    id: "brac-flat-chain",
    name: "Flat Chain Bracelet",
    line: "bracelets",
    price: 1290,
    material: "925 silver",
    note: "Flat links lie under a shirt cuff instead of fighting it.",
    variantLabel: "Length",
    variants: ["19cm", "20cm", "21cm"],
    span: "2x1",
  },
  {
    id: "brac-beaded",
    name: "Beaded Wrist Line",
    line: "bracelets",
    price: 560,
    material: "Stone beads, elastic",
    note: "Elastic, so there is no clasp to fail and nothing to fasten one handed.",
    variantLabel: "Length",
    variants: ["18cm", "19cm", "20cm"],
    span: "1x1",
  },
  {
    id: "pend-anchor",
    name: "Anchor on Cord",
    line: "pendants",
    price: 890,
    material: "Steel pendant, waxed cord",
    note: "Heavy enough to hang straight, which most cord pendants this size are not.",
    variantLabel: "Cord",
    variants: ["50cm", "55cm", "60cm"],
    span: "1x2",
    onWall: true,
  },
  {
    id: "pend-anchor-black",
    name: "Anchor, Blacked",
    line: "pendants",
    price: 940,
    material: "Blackened steel, cord",
    note: "The blacking wears at the edges over a year, and it looks better for it.",
    variantLabel: "Cord",
    variants: ["50cm", "55cm", "60cm"],
    span: "1x1",
  },
  {
    id: "pend-jade",
    name: "Green Stone Drop",
    line: "pendants",
    price: 1120,
    material: "Stone, braided cord",
    note: "Each stone is cut from a different block, so the green is never quite the same.",
    variantLabel: "Cord",
    variants: ["50cm", "60cm"],
    span: "1x1",
  },
  {
    id: "pend-chain",
    name: "Fine Rope Chain",
    line: "pendants",
    price: 1460,
    material: "925 silver",
    note: "Thin enough to wear alone, strong enough to carry any pendant on this wall.",
    variantLabel: "Chain",
    variants: ["45cm", "50cm", "55cm", "60cm"],
    span: "1x1",
  },
  {
    id: "pend-cuban-set",
    name: "Heavy Cuban Chain",
    line: "pendants",
    price: 2240,
    material: "Steel, gold tone",
    note: "The heaviest thing in the stall. Wear it with a plain shirt and nothing else.",
    variantLabel: "Chain",
    variants: ["50cm", "55cm", "60cm"],
    span: "2x2",
    onWall: true,
  },
  {
    id: "anime-keyring",
    name: "Shinobi Keyring",
    line: "anime",
    price: 340,
    material: "Enamel charm, steel ring",
    note: "Hard enamel rather than print, so it survives a pocket full of keys.",
    variantLabel: "Finish",
    variants: ["Enamel", "Matte"],
    span: "1x1",
    onWall: true,
  },
  {
    id: "anime-acrylic",
    name: "Kitsune Mask Charm",
    line: "anime",
    price: 290,
    material: "Printed acrylic",
    note: "The holo finish shifts as it swings, which is most of the reason to buy it.",
    variantLabel: "Finish",
    variants: ["Gloss", "Holo"],
    span: "1x1",
    onWall: true,
  },
  {
    id: "anime-charm",
    name: "Ronin Bag Charm",
    line: "anime",
    price: 380,
    material: "Printed acrylic, clasp",
    note: "The clasp is a lobster, not a split ring, so it moves between bags in a second.",
    variantLabel: "Finish",
    variants: ["Gloss", "Holo"],
    span: "2x1",
    onWall: true,
  },
  {
    id: "anime-stand",
    name: "Desk Stand Charm",
    line: "anime",
    price: 450,
    material: "Acrylic, weighted base",
    note: "The base is weighted, so it stays upright on a desk that gets knocked.",
    variantLabel: "Finish",
    variants: ["Clear", "Frosted"],
    span: "1x1",
  },
  {
    id: "anime-figure",
    name: "Sitting Figure",
    line: "anime",
    price: 860,
    material: "Painted resin",
    note: "Hand painted in small batches, which is why it runs out and comes back.",
    variantLabel: "Pose",
    variants: ["Seated"],
    span: "1x1",
    soldOut: true,
  },
];

export const taka = (n: number) => `৳${n.toLocaleString("en-US")}`;

/** Tailwind span classes per crate size, so the wall snaps to the module. */
export const SPAN_CLASS: Record<Span, string> = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-2 row-span-1",
  "1x2": "col-span-1 row-span-2",
  "2x2": "col-span-2 row-span-2",
};
