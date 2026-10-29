import type { Metadata } from "next";
import { Catalogue, type Filter } from "@/components/products/Catalogue";
import { Chevron } from "@/components/ui/Plate";
import { getCatalogue } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Shop | Finestra",
  description:
    "Rings, bracelets, pendants, and anime pieces from Finestra Bangladesh.",
};

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
            {products.length} pieces across rings, bracelets, pendants, and the
            character line. Open any one of them for the sizes it comes in and
            the way to reach the shop.
          </p>
        </div>
        <Chevron />
      </section>

      {/* The prototype says what it is, rather than dressing invented prices
          as fact. */}
      <p className="mx-auto max-w-[1400px] px-4 py-5 text-[0.88rem] leading-relaxed sm:px-7">
        <strong className="font-semibold">Sample stock.</strong> Names, prices,
        and photographs below are placeholders for this design prototype, not
        real Finestra products.
      </p>

      <Catalogue
        products={products}
        categories={categories}
        collections={collections}
        initialFilter={initialFilter}
      />
    </main>
  );
}
