/**
 * PLACEHOLDER IMAGERY. Swap point for real Finestra photography.
 *
 * Every image on this prototype resolves through this file, so replacing the
 * placeholders with real product shots is a single-file edit. Nothing here is
 * generated; these are openly licensed photographs hosted on Unsplash's CDN,
 * standing in for pieces Finestra has not photographed for this prototype.
 */

const CDN = "https://images.unsplash.com/";

function shot(slug: string, w = 1100) {
  return `${CDN}${slug}?auto=format&fit=crop&w=${w}&q=72`;
}

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
