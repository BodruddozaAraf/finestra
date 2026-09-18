/**
 * PLACEHOLDER CATALOGUE. Not real Finestra stock.
 *
 * Names, prices, variants, set codes, and availability are invented so the
 * prototype can demonstrate a working set. Replace wholesale with the real
 * product list before this goes anywhere near a customer. The surface says so
 * out loud as well; see the stock note on the products page.
 *
 * On `tier`: trading-card worlds run on scarcity, and scarcity here would be
 * a fabricated commercial claim. There are no print runs, serial numbers, or
 * pull rates in this build. The tier is derived from MATERIAL, which is a
 * product fact, and the ramp is published in a legend on the page.
 */

export type Line = "rings" | "bracelets" | "pendants" | "anime";

/** The declared ramp. One pip, two pips, three pips. */
export type Tier = 1 | 2 | 3;

export const TIER_RAMP: { pips: Tier; label: string; meaning: string }[] = [
  { pips: 1, label: "Standard", meaning: "Steel, cord, acrylic, and enamel." },
  { pips: 2, label: "Silver", meaning: "Solid 925 silver." },
  { pips: 3, label: "Hand-finished", meaning: "Set, blackened, hammered, or painted by hand." },
];

export type Product = {
  id: string;
  /** Catalogue identifier. Placeholder, like everything else here. */
  setCode: string;
  name: string;
  line: Line;
  /** Bangladeshi Taka. Placeholder figures. */
  price: number;
  material: string;
  tier: Tier;
  /** This card's own line. Never a shared template. */
  note: string;
  variantLabel: string;
  variants: string[];
  soldOut?: boolean;
};

export const LINES: { id: Line; label: string }[] = [
  { id: "rings", label: "Rings" },
  { id: "bracelets", label: "Bracelets" },
  { id: "pendants", label: "Pendants" },
  { id: "anime", label: "Anime" },
];

/** The two series the set is split across. */
export const SERIES: Record<Line, "everyday" | "character"> = {
  rings: "everyday",
  bracelets: "everyday",
  pendants: "everyday",
  anime: "character",
};

export const CATALOGUE: Product[] = [
  {
    id: "ring-signet",
    setCode: "FIN-R-001",
    name: "Kalighat Signet",
    line: "rings",
    price: 1450,
    material: "925 silver",
    tier: 2,
    note: "The face is wide enough to catch light across a room, which is the whole point of a signet.",
    variantLabel: "Size",
    variants: ["17mm", "18mm", "19mm", "20mm", "21mm"],
  },
  {
    id: "ring-band-trio",
    setCode: "FIN-R-002",
    name: "Three Plain Bands",
    line: "rings",
    price: 1180,
    material: "925 silver, set of three",
    tier: 2,
    note: "Sold as three so you can wear one, stack two, and lose one without it mattering.",
    variantLabel: "Size",
    variants: ["17mm", "18mm", "19mm", "20mm"],
  },
  {
    id: "ring-obsidian",
    setCode: "FIN-R-003",
    name: "Nightstone Band",
    line: "rings",
    price: 1620,
    material: "Matte steel, stone inlay",
    tier: 3,
    note: "Matte steel, so it does not compete with whatever else is on the hand.",
    variantLabel: "Size",
    variants: ["18mm", "19mm", "20mm", "21mm"],
  },
  {
    id: "ring-inked",
    setCode: "FIN-R-004",
    name: "Broadface Ring",
    line: "rings",
    price: 1340,
    material: "Brushed steel",
    tier: 1,
    note: "Built heavy on purpose. You will notice it on your hand all day.",
    variantLabel: "Size",
    variants: ["19mm", "20mm", "21mm", "22mm"],
  },
  {
    id: "ring-hammered",
    setCode: "FIN-R-005",
    name: "Hammered Wide Band",
    line: "rings",
    price: 980,
    material: "925 silver, hammered by hand",
    tier: 3,
    note: "Every one is hammered by hand, so no two catch the light the same way.",
    variantLabel: "Size",
    variants: ["17mm", "18mm", "19mm", "20mm", "21mm"],
    soldOut: true,
  },
  {
    id: "ring-plain-steel",
    setCode: "FIN-R-006",
    name: "Everyday Steel Band",
    line: "rings",
    price: 640,
    material: "Surgical steel",
    tier: 1,
    note: "The one to start with. Cheap enough to wear somewhere it might get scratched.",
    variantLabel: "Size",
    variants: ["18mm", "19mm", "20mm", "21mm", "22mm"],
  },
  {
    id: "brac-cuban",
    setCode: "FIN-B-001",
    name: "Cuban Link Bracelet",
    line: "bracelets",
    price: 1780,
    material: "Steel, gold tone",
    tier: 1,
    note: "Sits at the same weight as the chain, if you are building a matched pair.",
    variantLabel: "Length",
    variants: ["19cm", "20cm", "21cm"],
  },
  {
    id: "brac-shackle",
    setCode: "FIN-B-002",
    name: "Shackle Cuff",
    line: "bracelets",
    price: 1950,
    material: "925 silver",
    tier: 2,
    note: "The screw pin is the closure, so it stays on until you decide otherwise.",
    variantLabel: "Length",
    variants: ["19cm", "20cm", "21cm", "22cm"],
  },
  {
    id: "brac-cord-stack",
    setCode: "FIN-B-003",
    name: "Four Cord Stack",
    line: "bracelets",
    price: 720,
    material: "Waxed cord, steel clasp",
    tier: 1,
    note: "Waxed cord takes the monsoon better than leather does.",
    variantLabel: "Length",
    variants: ["Adjustable"],
  },
  {
    id: "brac-flat-chain",
    setCode: "FIN-B-004",
    name: "Flat Chain Bracelet",
    line: "bracelets",
    price: 1290,
    material: "925 silver",
    tier: 2,
    note: "Flat links lie under a shirt cuff instead of fighting it.",
    variantLabel: "Length",
    variants: ["19cm", "20cm", "21cm"],
  },
  {
    id: "brac-beaded",
    setCode: "FIN-B-005",
    name: "Beaded Wrist Line",
    line: "bracelets",
    price: 560,
    material: "Stone beads, elastic",
    tier: 1,
    note: "Elastic, so there is no clasp to fail and nothing to fasten one handed.",
    variantLabel: "Length",
    variants: ["18cm", "19cm", "20cm"],
  },
  {
    id: "pend-anchor",
    setCode: "FIN-P-001",
    name: "Anchor on Cord",
    line: "pendants",
    price: 890,
    material: "Steel pendant, waxed cord",
    tier: 1,
    note: "Heavy enough to hang straight, which most cord pendants this size are not.",
    variantLabel: "Cord",
    variants: ["50cm", "55cm", "60cm"],
  },
  {
    id: "pend-anchor-black",
    setCode: "FIN-P-002",
    name: "Anchor, Blacked",
    line: "pendants",
    price: 940,
    material: "Blackened steel, cord",
    tier: 3,
    note: "The blacking wears at the edges over a year, and it looks better for it.",
    variantLabel: "Cord",
    variants: ["50cm", "55cm", "60cm"],
  },
  {
    id: "pend-jade",
    setCode: "FIN-P-003",
    name: "Green Stone Drop",
    line: "pendants",
    price: 1120,
    material: "Stone, braided cord",
    tier: 3,
    note: "Each stone is cut from a different block, so the green is never quite the same.",
    variantLabel: "Cord",
    variants: ["50cm", "60cm"],
  },
  {
    id: "pend-chain",
    setCode: "FIN-P-004",
    name: "Fine Rope Chain",
    line: "pendants",
    price: 1460,
    material: "925 silver",
    tier: 2,
    note: "Thin enough to wear alone, strong enough to carry any pendant in the set.",
    variantLabel: "Chain",
    variants: ["45cm", "50cm", "55cm", "60cm"],
  },
  {
    id: "pend-cuban-set",
    setCode: "FIN-P-005",
    name: "Heavy Cuban Chain",
    line: "pendants",
    price: 2240,
    material: "Steel, gold tone",
    tier: 1,
    note: "The heaviest thing in the set. Wear it with a plain shirt and nothing else.",
    variantLabel: "Chain",
    variants: ["50cm", "55cm", "60cm"],
  },
  {
    id: "anime-keyring",
    setCode: "FIN-S-001",
    name: "Shinobi Keyring",
    line: "anime",
    price: 340,
    material: "Enamel charm, steel ring",
    tier: 1,
    note: "Hard enamel rather than print, so it survives a pocket full of keys.",
    variantLabel: "Finish",
    variants: ["Enamel", "Matte"],
  },
  {
    id: "anime-acrylic",
    setCode: "FIN-S-002",
    name: "Kitsune Mask Charm",
    line: "anime",
    price: 290,
    material: "Printed acrylic",
    tier: 1,
    note: "The holo finish shifts as it swings, which is most of the reason to buy it.",
    variantLabel: "Finish",
    variants: ["Gloss", "Holo"],
  },
  {
    id: "anime-charm",
    setCode: "FIN-S-003",
    name: "Ronin Bag Charm",
    line: "anime",
    price: 380,
    material: "Printed acrylic, clasp",
    tier: 1,
    note: "The clasp is a lobster, not a split ring, so it moves between bags in a second.",
    variantLabel: "Finish",
    variants: ["Gloss", "Holo"],
  },
  {
    id: "anime-stand",
    setCode: "FIN-S-004",
    name: "Desk Stand Charm",
    line: "anime",
    price: 450,
    material: "Acrylic, weighted base",
    tier: 1,
    note: "The base is weighted, so it stays upright on a desk that gets knocked.",
    variantLabel: "Finish",
    variants: ["Clear", "Frosted"],
  },
  {
    id: "anime-figure",
    setCode: "FIN-S-005",
    name: "Sitting Figure",
    line: "anime",
    price: 860,
    material: "Painted resin",
    tier: 3,
    note: "Hand painted in small batches, which is why it runs out and comes back.",
    variantLabel: "Pose",
    variants: ["Seated"],
    soldOut: true,
  },
];

export const taka = (n: number) => `৳${n.toLocaleString("en-US")}`;

export const byId = (id: string) => CATALOGUE.find((p) => p.id === id);
