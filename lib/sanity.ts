/**
 * The site's one door into Sanity. Server only.
 *
 * Every piece and line on the site is read through getCatalogue(). It asks
 * Sanity's HTTP query API with a plain fetch, which Next caches under the
 * SANITY_TAG tag. The Studio's publish webhook (app/api/revalidate) expires that
 * tag, so a change the shop publishes reaches the site on the next visit
 * without a redeploy. The hourly revalidate is only a safety net in case a
 * webhook is ever missed.
 *
 * Only published documents are read. Drafts in the Studio never reach the site.
 */

import { cache } from "react";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { Finish, LineInfo, Photo, Product } from "./catalogue";

const projectId = process.env.SANITY_PROJECT_ID ?? "";
const dataset = process.env.SANITY_DATASET || "production";

/** Pinned so a Sanity API change never alters what a query returns. */
const API_VERSION = "v2025-02-19";

export const SANITY_TAG = "sanity";

const builder = createImageUrlBuilder({ projectId, dataset });

async function query<T>(groq: string): Promise<T> {
  if (!projectId) {
    throw new Error(
      "SANITY_PROJECT_ID is not set. Add it to .env.local (and to the Vercel project). " +
        "See docs/sanity/02-developer-setup.md.",
    );
  }

  const url = new URL(
    `https://${projectId}.api.sanity.io/${API_VERSION}/data/query/${dataset}`,
  );
  url.searchParams.set("query", groq);
  url.searchParams.set("perspective", "published");

  const res = await fetch(url, {
    next: { revalidate: 3600, tags: [SANITY_TAG] },
  });
  if (!res.ok) {
    throw new Error(`Sanity query failed (${res.status}): ${await res.text()}`);
  }
  return ((await res.json()) as { result: T }).result;
}

type SanityImage = {
  asset: { _ref: string };
  alt?: string;
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number };
};

/**
 * The full-size URL (with the shop's crop applied, if any). Width, quality,
 * and format are added per request by lib/image-loader.ts.
 */
function photo(image: SanityImage): Photo {
  return {
    src: builder.image(image).url(),
    alt: image.alt ?? "",
    position: image.hotspot
      ? `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%`
      : undefined,
  };
}

/**
 * Lines and pieces in shelf order. Pieces missing a slug, a line, or a photo
 * are skipped rather than rendered half-built; the Studio's validation should
 * stop those being published in the first place.
 */
const CATALOGUE_QUERY = `{
  "lines": *[_type == "line" && defined(slug.current)]
    | order(coalesce(order, 999) asc, label asc) {
      "id": slug.current,
      label,
      "note": coalesce(note, "")
    },
  "pieces": *[_type == "piece" && defined(slug.current)
      && defined(line->slug.current) && defined(mainImage.asset)]
    | order(coalesce(line->order, 999) asc, coalesce(order, 999) asc, name asc) {
      "id": slug.current,
      name,
      "line": line->slug.current,
      "lineLabel": line->label,
      price,
      "material": coalesce(material, ""),
      "story": coalesce(story, ""),
      finish,
      "variantLabel": coalesce(variantLabel, ""),
      "variants": coalesce(variants, []),
      "soldOut": soldOut == true,
      "onShelf": onShelf == true,
      mainImage,
      "frames": coalesce(frames[defined(asset)], [])
    }
}`;

type RawPiece = Omit<Product, "image" | "frames" | "finish"> & {
  finish: Finish;
  mainImage: SanityImage;
  frames: SanityImage[];
};

/** One request per render, however many components ask. */
export const getCatalogue = cache(
  async (): Promise<{ lines: LineInfo[]; pieces: Product[] }> => {
    const { lines, pieces } = await query<{
      lines: LineInfo[];
      pieces: RawPiece[];
    }>(CATALOGUE_QUERY);

    return {
      // A line with nothing in it would be a filter that empties the shelf.
      lines: lines.filter((l) => pieces.some((p) => p.line === l.id)),
      pieces: pieces.map(({ mainImage, frames, ...rest }) => ({
        ...rest,
        image: photo(mainImage),
        frames: frames.map(photo),
      })),
    };
  },
);

export async function getPiece(id: string) {
  const { pieces } = await getCatalogue();
  return pieces.find((p) => p.id === id);
}
