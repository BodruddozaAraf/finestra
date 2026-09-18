import type { Metadata } from "next";
import { Binder } from "@/proto3/components/products/Binder";
import { CATALOGUE, LINES, TIER_RAMP, type Line } from "@/proto3/lib/catalogue";

export const metadata: Metadata = {
  title: "All cards | Finestra",
  description:
    "Rings, bracelets, pendants, and anime pieces from Finestra Bangladesh.",
};

type Filter = Line | "all";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ line?: string; card?: string }>;
}) {
  const { line, card } = await searchParams;
  const validLine = LINES.some((l) => l.id === line);
  const initialLine: Filter = validLine ? (line as Line) : "all";
  const initialCard =
    CATALOGUE.find((p) => p.id === card)?.id ?? CATALOGUE[0].id;

  return (
    <main>
      <section className="border-b border-[var(--surface-line)]">
        <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-7 sm:py-10">
          <h1 className="plate text-[2.2rem] leading-none sm:text-[3rem]">
            The full set
          </h1>
          <p className="mt-3 max-w-[64ch] text-[1rem] leading-relaxed">
            {CATALOGUE.length} cards across rings, bracelets, pendants, and the
            character series. Pick a card to hold it, choose a size, and keep it.
          </p>

          {/* The declared ramp, so the pips on every card can be checked. */}
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {TIER_RAMP.map((t) => (
              <div key={t.pips} className="flex items-baseline gap-2.5">
                <span className="flex shrink-0 items-center gap-[3px] pt-1">
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      aria-hidden
                      className={[
                        "block h-[7px] w-[7px] rotate-45 border border-[var(--on-surface)]",
                        n <= t.pips
                          ? "bg-[var(--color-foil)]"
                          : "bg-transparent",
                      ].join(" ")}
                    />
                  ))}
                </span>
                <p className="text-[0.93rem]">
                  <span className="field">{t.label}</span> <span>{t.meaning}</span>
                </p>
              </div>
            ))}
          </div>

          {/* The prototype says what it is, rather than dressing invented
              prices as fact. */}
          <p className="mt-5 max-w-[64ch] text-[0.93rem] leading-relaxed">
            <span className="field">Sample stock.</span> Names, prices, set
            codes, and photographs are placeholders for this design prototype,
            not real Finestra products. Tier pips describe material, not
            scarcity.
          </p>
        </div>
      </section>

      <div className="py-8">
        <Binder initialLine={initialLine} initialCard={initialCard} />
      </div>
    </main>
  );
}
