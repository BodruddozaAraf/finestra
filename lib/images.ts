/**
 * PLACEHOLDER IMAGERY for the homepage. Swap point for real Finestra photography.
 *
 * Product photographs no longer live here: the shop uploads them with each
 * piece in the Studio, and they arrive on the piece itself (see lib/sanity.ts).
 * What remains is the homepage's hero and editorial frames. Nothing here is
 * generated; these are openly licensed photographs hosted on Unsplash's CDN,
 * standing in for shots Finestra has not taken yet.
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
