import Link from "next/link";
import { SetCard } from "@/proto3/components/ui/Card";
import { CATALOGUE, TIER_RAMP, type Line } from "@/proto3/lib/catalogue";

/**
 * The set laid out on the page, split into its two series. Both series sit on
 * the same sheet under the same frame, because a customer's taste in jewelry
 * and their taste in characters belong to one collection.
 *
 * The tier ramp is published at the foot of the spread, so the pips on every
 * card mean something the visitor can check.
 */
function Series({
  name,
  line,
  lines,
}: {
  name: string;
  line: string;
  lines: Line[];
}) {
  const cards = CATALOGUE.filter((p) => lines.includes(p.line));
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[var(--surface-line)] pb-3">
        <h2 className="plate text-[1.6rem] sm:text-[2rem]">{name}</h2>
        <p className="text-[0.95rem]">{line}</p>
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {cards.map((p) => (
          <li key={p.id}>
            <Link href={`/proto-3/products?card=${p.id}`} className="block">
              <SetCard product={p} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TheSpread() {
  return (
    <section className="border-b border-[var(--surface-line)]">
      <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-7 sm:py-16">
        <div className="grid gap-12">
          <Series
            name="Everyday series"
            line="Rings, bracelets, and pendants."
            lines={["rings", "bracelets", "pendants"]}
          />
          <Series
            name="Character series"
            line="For the series you actually watch."
            lines={["anime"]}
          />
        </div>

        {/* The declared ramp. Rank means the same thing on every card. */}
        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-[var(--surface-line)] pt-6">
          {TIER_RAMP.map((t) => (
            <div key={t.pips} className="flex items-baseline gap-3">
              <span className="flex shrink-0 items-center gap-[3px] pt-1">
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    aria-hidden
                    className={[
                      "block h-[7px] w-[7px] rotate-45 border border-[var(--on-surface)]",
                      n <= t.pips ? "bg-[var(--color-foil)]" : "bg-transparent",
                    ].join(" ")}
                  />
                ))}
              </span>
              <p className="text-[0.95rem]">
                <span className="field">{t.label}</span> <span>{t.meaning}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
