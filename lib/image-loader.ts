"use client";

/**
 * Hands image resizing to the CDN the photograph already lives on, instead of
 * Vercel's image optimiser, which is metered on the free plan.
 *
 * Sanity's CDN (product photos) and Unsplash's (homepage placeholders) both
 * resize and re-encode on the fly from query parameters, so next/image still
 * gets a full srcset at every width it asks for. Wired up in next.config.ts.
 */

import type { ImageLoaderProps } from "next/image";

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);

  if (url.hostname === "cdn.sanity.io") {
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "max");
    return url.toString();
  }

  if (url.hostname === "images.unsplash.com") {
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 72));
    url.searchParams.set("auto", "format");
    return url.toString();
  }

  return src;
}
