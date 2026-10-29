/**
 * The site's one door into Sanity. Server only.
 *
 * Every product, category, and collection on the site is read through getCatalogue(). It asks
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
import type {
  CategoryInfo,
  CollectionInfo,
  OptionGroup,
  Photo,
  Product,
} from "./catalogue";

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
 * Categories and collections in shelf order, and products newest first. Products missing a
 * slug, a category, or a photo are skipped rather than rendered half-built; the Studio's validation should
 * stop those being published in the first place.
 */
const CATALOGUE_QUERY = `{
  "categories": *[_type == "category" && defined(slug.current)]
    | order(coalesce(order, 999) asc, label asc) {
      "id": slug.current,
      label,
      "note": coalesce(note, "")
    },
  "collections": *[_type == "collection" && defined(slug.current)]
    | order(coalesce(order, 999) asc, label asc) {
      "id": slug.current,
      label,
      "note": coalesce(note, "")
    },
  "products": *[_type == "product" && defined(slug.current)
      && defined(category->slug.current) && defined(mainImage.asset)]
    | order(_createdAt desc, name asc) {
      "id": slug.current,
      name,
      "category": category->slug.current,
      "categoryLabel": category->label,
      "collection": collection->slug.current,
      "collectionLabel": collection->label,
      price,
      "material": coalesce(material, ""),
      "story": coalesce(story, ""),
      "options": coalesce(optionGroups[count(values) > 0] {
        label,
        "values": values[] {
          label,
          "image": select(defined(image.asset) => image),
          "soldOut": soldOut == true
        }
      }, []),
      "soldOut": soldOut == true,
      "onShelf": onShelf == true,
      mainImage,
      "frames": coalesce(frames[defined(asset)], [])
    }
}`;

type RawOptionGroup = {
  label: string;
  values: { label: string; image: SanityImage | null; soldOut: boolean }[];
};

/**
 * GROQ answers null for a missing reference, where the site's types want the
 * key left out.
 */
type RawProduct = Omit<
  Product,
  "image" | "frames" | "options" | "collection" | "collectionLabel"
> & {
  collection: string | null;
  collectionLabel: string | null;
  mainImage: SanityImage;
  frames: SanityImage[];
  options: RawOptionGroup[];
};

const options = (groups: RawOptionGroup[]): OptionGroup[] =>
  groups.map((g) => ({
    label: g.label,
    values: g.values.map((v) => ({
      label: v.label,
      soldOut: v.soldOut,
      ...(v.image ? { image: photo(v.image) } : {}),
    })),
  }));

/** One request per render, however many components ask. */
export const getCatalogue = cache(
  async (): Promise<{
    categories: CategoryInfo[];
    collections: CollectionInfo[];
    products: Product[];
  }> => {
    const { categories, collections, products } = await query<{
      categories: CategoryInfo[];
      collections: CollectionInfo[];
      products: RawProduct[];
    }>(CATALOGUE_QUERY);

    return {
      // A category with nothing in it would be a filter that empties the shelf.
      categories: categories.filter((c) =>
        products.some((p) => p.category === c.id),
      ),
      collections: collections.filter((c) =>
        products.some((p) => p.collection === c.id),
      ),
      products: products.map(
        ({ mainImage, frames, options: groups, collection, collectionLabel, ...rest }) => ({
          ...rest,
          ...(collection && collectionLabel ? { collection, collectionLabel } : {}),
          image: photo(mainImage),
          frames: frames.map(photo),
          options: options(groups),
        }),
      ),
    };
  },
);

export async function getProduct(id: string) {
  const { products } = await getCatalogue();
  return products.find((p) => p.id === id);
}
