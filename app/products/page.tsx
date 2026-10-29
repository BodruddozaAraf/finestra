import type { Metadata } from "next";
import { Catalogue, type Filter } from "@/components/products/Catalogue";
import { Chevron } from "@/components/ui/Plate";
import { getCatalogue } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Shop | Finestra",
  description:
    "Rings, bracelets, pendants, and anime pieces from Finestra Bangladesh.",
};

// The shop adds and renames categories in the Studio, so the intro names
// whatever is there now: "rings, pendants, and key rings".
function listOf(words: string[]) {
  if (words.length < 3) return words.join(" and ");
  return `${words.slice(0, -1).join(", ")}, and ${words.at(-1)}`;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; collection?: string }>;
}) {
  const [{ category, collection }, { categories, collections, products }] =
    await Promise.all([searchParams, getCatalogue()]);

  // An unknown slug, from an old link or a typo, opens the whole shelf.
  const initialFilter: Filter = categories.some((c) => c.id === category)
    ? { kind: "category", id: category! }
    : collections.some((c) => c.id === collection)
      ? { kind: "collection", id: collection! }
      : { kind: "all" };

  return (
    <main>
      <section className="field-plate">
        <div className="mx-auto max-w-[1400px] px-4 pt-10 pb-12 sm:px-7 sm:pt-14 sm:pb-16">
          <h1 className="banner max-w-[16ch] text-[2.3rem] leading-[0.95] tracking-[-0.025em] sm:text-[3.3rem] md:text-[4rem]">
            The whole shelf
          </h1>
          <p className="mt-4 max-w-[52ch] text-[1.02rem] leading-relaxed">
            {products.length} pieces across{" "}
            {listOf(categories.map((c) => c.label.toLowerCase()))}. Open any one
            of them for the sizes it comes in and the way to reach the shop.
          </p>
        </div>
        <Chevron />
      </section>

      <Catalogue
        products={products}
        categories={categories}
        collections={collections}
        initialFilter={initialFilter}
      />
    </main>
  );
}
