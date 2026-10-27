/**
 * Sanity's publish webhook lands here.
 *
 * When the shop publishes, unpublishes, or deletes a product or a category, Sanity
 * POSTs to this route, signed with SANITY_REVALIDATE_SECRET. A valid call
 * expires every cached Sanity read at once (the catalogue is small enough that
 * one tag is simpler than tracking which page shows which product), and the next
 * visit to any page renders it fresh.
 *
 * Set up in sanity.io/manage > API > Webhooks; see
 * docs/sanity/04-webhook-and-deploy.md.
 */

import { revalidateTag } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { SANITY_TAG } from "@/lib/sanity";

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { revalidated: false, message: "SANITY_REVALIDATE_SECRET is not set" },
      { status: 500 },
    );
  }

  // Verified against the raw body: re-encoded JSON can fail the signature.
  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? "";
  if (!(await isValidSignature(body, signature, secret))) {
    return Response.json(
      { revalidated: false, message: "Invalid signature" },
      { status: 401 },
    );
  }

  // A webhook cannot use updateTag, so expire outright: the shop checking
  // their edit should never be served the version they just replaced.
  revalidateTag(SANITY_TAG, { expire: 0 });

  return Response.json({ revalidated: true, now: Date.now() });
}
