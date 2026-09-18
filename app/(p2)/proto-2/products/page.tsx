import type { Metadata } from "next";
import { Stall } from "@/proto2/components/products/Stall";
import { CATALOGUE, LINES, type Line } from "@/proto2/lib/catalogue";

export const metadata: Metadata = {
  title: "Everything | Finestra",
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
      <section className="border-b border-[var(--mark)]">
        <div className="mx-auto max-w-[1560px] px-4 py-8 sm:px-6 sm:py-10">
          <p className="chalk text-[2.4rem] leading-none sm:text-[3.2rem]">
            The whole stall
          </p>
          <p className="note mt-3 max-w-[68ch]">
            {CATALOGUE.length} crates across rings, bracelets, pendants, and the
            character line. Pick a size on a crate and it goes on the scale.
          </p>
          {/* The prototype says what it is, rather than dressing invented
              prices as fact. */}
          <p className="note mt-3 max-w-[68ch]">
            <span className="stencil-2">Sample stock.</span> Names, prices, and
            photographs below are placeholders for this design prototype, not
            real Finestra products.
          </p>
        </div>
      </section>

      <Stall initialLine={initialLine} />
    </main>
  );
}
