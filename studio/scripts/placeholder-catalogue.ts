/**
 * PLACEHOLDER CATALOGUE. Not real Finestra stock.
 *
 * Moved here from lib/catalogue.ts and lib/images.ts when the site switched to
 * Sanity. scripts/seed.ts loads it into the dataset once, so the site looks the
 * same as before the switch while the shop enters its real pieces. Nothing on
 * the site reads this file.
 *
 * Images are openly licensed Unsplash photographs, standing in for pieces
 * Finestra has not photographed yet.
 */

type Line = "rings" | "bracelets" | "pendants" | "anime";

type Finish =
  | "silver"
  | "steel"
  | "cord"
  | "stone"
  | "acrylic"
  | "enamel"
  | "resin";

export type PlaceholderPiece = {
  id: string;
  name: string;
  line: Line;
  price: number;
  material: string;
  story: string;
  finish: Finish;
  variantLabel: string;
  variants: string[];
  soldOut?: boolean;
  onShelf?: boolean;
};

export const LINES: { id: Line; label: string; note: string }[] = [
  { id: "rings", label: "Rings", note: "Signets, bands, stone settings" },
  { id: "bracelets", label: "Bracelets", note: "Chain, cord, and cuff" },
  { id: "pendants", label: "Pendants", note: "Cords and chains" },
  { id: "anime", label: "Anime", note: "Charms, keyrings, stands" },
];

export const CATALOGUE: PlaceholderPiece[] = [
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

const CDN = "https://images.unsplash.com/";

function shot(slug: string, w = 1100) {
  return `${CDN}${slug}?auto=format&fit=crop&w=${w}&q=72`;
}

/**
 * The photograph behind a URL, independent of the width it was asked for, so
 * the same picture requested at two sizes still counts as one picture.
 */
export const frameId = (src: string) => src.slice(CDN.length).split("?")[0];

export const HERO_PORTRAIT = {
  src: shot("photo-1762505465234-de8b802614d9", 900),
  alt: "A man in a black t-shirt wearing a heavy chain and a matching bracelet.",
};

export const EDITORIAL = {
  classic: {
    src: shot("photo-1625055671570-e5de97e4897d", 900),
    alt: "A man in a white shirt adjusting stacked cord bracelets and a pendant.",
  },
  character: {
    src: shot("photo-1775148259379-ddec70498d07", 900),
    alt: "A wall display of anime and pop culture merchandise.",
  },
  bench: {
    src: shot("photo-1578632307646-44afb788f005", 900),
    alt: "Three silver rings laid out in bands of light on a concrete surface.",
  },
};

/** Keyed by product id in lib/catalogue.ts. */
export const PRODUCT_SHOTS: Record<string, { src: string; alt: string }> = {
  "ring-signet": {
    src: shot("photo-1609821609704-72e503dbb514", 700),
    alt: "A wide silver signet ring on a black surface.",
  },
  "ring-band-trio": {
    src: shot("photo-1578632307646-44afb788f005", 700),
    alt: "Three plain silver bands arranged in stripes of light.",
  },
  "ring-obsidian": {
    src: shot("photo-1760088348194-a5ac70a8aa9f", 700),
    alt: "A black ring with pale flecks resting on a grey surface.",
  },
  "ring-inked": {
    src: shot("photo-1770253886415-f558a599c97c", 700),
    alt: "A tattooed hand wearing a broad ring.",
  },
  "ring-hammered": {
    src: shot("photo-1651752090085-50375d90bf8b", 700),
    alt: "A close view of a textured metal ring.",
  },
  "ring-plain-steel": {
    src: shot("photo-1689287428894-9b52d1534a25", 700),
    alt: "A plain steel ring photographed on a table.",
  },
  "brac-cuban": {
    src: shot("photo-1612450362046-91773458b103", 700),
    alt: "A silver link bracelet worn on a wrist.",
  },
  "brac-shackle": {
    src: shot("photo-1737289605564-39b84764964b", 700),
    alt: "A man's wrist wearing a heavy silver shackle bracelet.",
  },
  "brac-cord-stack": {
    src: shot("photo-1564349446548-5f0f93728b6f", 700),
    alt: "A stack of woven cord bracelets on a wrist.",
  },
  "brac-flat-chain": {
    src: shot("photo-1774294546043-df9ecc9bd70e", 700),
    alt: "A flat silver chain bracelet fastened at the wrist.",
  },
  "brac-beaded": {
    src: shot("photo-1715446929992-3f3d2b7a9467", 700),
    alt: "A close view of a beaded bracelet on a forearm.",
  },
  "pend-anchor": {
    src: shot("photo-1768945143809-3fe3d9830b7e", 700),
    alt: "A silver anchor pendant hanging on a dark cord.",
  },
  "pend-anchor-black": {
    src: shot("photo-1768944881532-823a912a737f", 700),
    alt: "A silver anchor pendant photographed against black cord.",
  },
  "pend-jade": {
    src: shot("photo-1787355469509-c26f1db696d6", 700),
    alt: "A green stone pendant strung on a brown cord.",
  },
  "pend-chain": {
    src: shot("photo-1677201795049-014caaa6b1cd", 700),
    alt: "A silver chain necklace laid on a wooden surface.",
  },
  "pend-cuban-set": {
    src: shot("photo-1678869520767-6ecd4bc729fe", 700),
    alt: "A man in a black shirt wearing a heavy gold-toned chain.",
  },
  "anime-keyring": {
    src: shot("photo-1727886806154-e7506c9fab71", 700),
    alt: "A keychain with a cartoon character charm hanging from it.",
  },
  "anime-acrylic": {
    src: shot("photo-1741295054871-757d6ce128bb", 700),
    alt: "An acrylic keychain of a horned anime character on a pink surface.",
  },
  "anime-charm": {
    src: shot("photo-1741294830180-4bfbd8ca2c17", 700),
    alt: "An anime character keychain photographed close up.",
  },
  "anime-stand": {
    src: shot("photo-1741980983756-2f185f15e480", 700),
    alt: "An anime character keychain propped on a small stand.",
  },
  "anime-figure": {
    src: shot("photo-1765708180211-a6e6bf7f7818", 700),
    alt: "A seated anime action figure on a plain surface.",
  },
};

/**
 * Supporting frames for a piece page, keyed by line.
 *
 * Finestra has photographed none of these pieces for this prototype, so a
 * piece page cannot have a real second and third angle. Rather than invent
 * one, each line carries two openly licensed stand-in frames that show the
 * category worn and on the bench. They are drawn from the same set of
 * photographs above, so there is still exactly one swap point: replace these
 * with the real per-piece shots and the frame rail fills itself.
 */
export const PRODUCT_FRAMES: Record<string, { src: string; alt: string }[]> = {
  rings: [
    EDITORIAL.bench,
    {
      src: shot("photo-1770253886415-f558a599c97c", 900),
      alt: "A tattooed hand wearing a broad ring.",
    },
  ],
  bracelets: [
    {
      src: shot("photo-1564349446548-5f0f93728b6f", 900),
      alt: "A stack of woven cord bracelets on a wrist.",
    },
    EDITORIAL.classic,
  ],
  pendants: [
    {
      src: shot("photo-1678869520767-6ecd4bc729fe", 900),
      alt: "A man in a black shirt wearing a heavy gold-toned chain.",
    },
    HERO_PORTRAIT,
  ],
  anime: [
    EDITORIAL.character,
    {
      src: shot("photo-1741980983756-2f185f15e480", 900),
      alt: "An anime character charm propped on a small stand.",
    },
  ],
};
