import type { Metadata } from "next";
import { Catalogue } from "@/proto1/components/products/Catalogue";
import { Chevron } from "@/proto1/components/ui/Plate";
import { CATALOGUE, LINES, type Line } from "@/proto1/lib/catalogue";

export const metadata: Metadata = {
  title: "Shop | Finestra",
  description:
    "Rings, bracelets, pendants, and anime pieces from Finestra Bangladesh.",
};

type Filter = Line | "all";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ line?: string }>;
}) {
  const { line } = await searchParams;
  const valid = LINES.some((l) => l.id === line);
  const initialLine: Filter = valid ? (line as Line) : "all";

  return (
    <main>
      <section className="field-plate">
        <div className="mx-auto max-w-[1400px] px-4 pt-10 pb-12 sm:px-7 sm:pt-14 sm:pb-16">
          <h1 className="banner max-w-[16ch] text-[2.3rem] leading-[0.95] tracking-[-0.025em] sm:text-[3.3rem] md:text-[4rem]">
            The whole shelf
          </h1>
          <p className="mt-4 max-w-[52ch] text-[1.02rem] leading-relaxed">
            {CATALOGUE.length} pieces across rings, bracelets, pendants, and the
            character line. Pick a size and it goes straight to the bag at the
            bottom of the screen.
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

      <Catalogue initialLine={initialLine} />
    </main>
  );
}
