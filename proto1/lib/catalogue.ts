/**
 * PLACEHOLDER CATALOGUE. Not real Finestra stock.
 *
 * Names, prices, variants, and availability on this page are invented so the
 * prototype can demonstrate a working catalogue. Replace wholesale with the
 * real product list before this goes anywhere near a customer. The surface
 * says so out loud as well; see the stock note on the products page.
 */

export type Line = "rings" | "bracelets" | "pendants" | "anime";

export type Product = {
  id: string;
  name: string;
  line: Line;
  /** Bangladeshi Taka. Placeholder figures. */
  price: number;
  material: string;
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

export const CATALOGUE: Product[] = [
  {
    id: "ring-signet",
    name: "Kalighat Signet",
    line: "rings",
    price: 1450,
    material: "925 silver",
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
    variantLabel: "Size",
    variants: ["18mm", "19mm", "20mm", "21mm"],
  },
  {
    id: "ring-inked",
    name: "Broadface Ring",
    line: "rings",
    price: 1340,
    material: "Brushed steel",
    variantLabel: "Size",
    variants: ["19mm", "20mm", "21mm", "22mm"],
  },
  {
    id: "ring-hammered",
    name: "Hammered Wide Band",
    line: "rings",
    price: 980,
    material: "925 silver",
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
    variantLabel: "Size",
    variants: ["18mm", "19mm", "20mm", "21mm", "22mm"],
  },
  {
    id: "brac-cuban",
    name: "Cuban Link Bracelet",
    line: "bracelets",
    price: 1780,
    material: "Steel, gold tone",
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
    variantLabel: "Length",
    variants: ["Adjustable"],
  },
  {
    id: "brac-flat-chain",
    name: "Flat Chain Bracelet",
    line: "bracelets",
    price: 1290,
    material: "925 silver",
    variantLabel: "Length",
    variants: ["19cm", "20cm", "21cm"],
  },
  {
    id: "brac-beaded",
    name: "Beaded Wrist Line",
    line: "bracelets",
    price: 560,
    material: "Stone beads, elastic",
    variantLabel: "Length",
    variants: ["18cm", "19cm", "20cm"],
  },
  {
    id: "pend-anchor",
    name: "Anchor on Cord",
    line: "pendants",
    price: 890,
    material: "Steel pendant, waxed cord",
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
    variantLabel: "Cord",
    variants: ["50cm", "55cm", "60cm"],
  },
  {
    id: "pend-jade",
    name: "Green Stone Drop",
    line: "pendants",
    price: 1120,
    material: "Stone, braided cord",
    variantLabel: "Cord",
    variants: ["50cm", "60cm"],
  },
  {
    id: "pend-chain",
    name: "Fine Rope Chain",
    line: "pendants",
    price: 1460,
    material: "925 silver",
    variantLabel: "Chain",
    variants: ["45cm", "50cm", "55cm", "60cm"],
  },
  {
    id: "pend-cuban-set",
    name: "Heavy Cuban Chain",
    line: "pendants",
    price: 2240,
    material: "Steel, gold tone",
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
    variantLabel: "Finish",
    variants: ["Gloss", "Holo"],
  },
  {
    id: "anime-stand",
    name: "Desk Stand Charm",
    line: "anime",
    price: 450,
    material: "Acrylic, weighted base",
    variantLabel: "Finish",
    variants: ["Clear", "Frosted"],
  },
  {
    id: "anime-figure",
    name: "Sitting Figure",
    line: "anime",
    price: 860,
    material: "Painted resin",
    variantLabel: "Pose",
    variants: ["Seated"],
    soldOut: true,
  },
];

export const taka = (n: number) => `\u09f3 ${n.toLocaleString("en-US")}`;

export const byId = (id: string) => CATALOGUE.find((p) => p.id === id);
