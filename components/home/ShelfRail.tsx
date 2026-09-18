import Image from "next/image";
import Link from "next/link";
import { CATALOGUE, taka } from "@/lib/catalogue";
import { PRODUCT_SHOTS } from "@/lib/images";

/**
 * The shelf itself: one horizontal rail of painted plates that scroll-snaps.
 * Rank comes from cell count, so the rail carries more pieces than a row of
 * cards could without any plate growing louder than its neighbour.
 */
export function ShelfRail() {
  const shelf = CATALOGUE.filter((p) => p.onShelf);

  return (
    <section className="border-t-[3px] border-[var(--hair)] bg-[var(--ground)] py-14 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-7">
        <h2 className="banner text-[1.9rem] leading-none tracking-[-0.02em] sm:text-[2.6rem]">
          On the shelf this week
        </h2>
      </div>

      {/* The rail starts on the container's gutter and runs off the right
          edge, so the shelf reads as longer than the screen. */}
      <ul className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pl-[max(1rem,calc((100%-1400px)/2+1.75rem))] scroll-pl-[max(1rem,calc((100%-1400px)/2+1.75rem))] pr-4 sm:pr-7 [scrollbar-width:thin]">
        {shelf.map((p) => {
          const shot = PRODUCT_SHOTS[p.id];
          return (
            <li
              key={p.id}
              className="w-[74vw] shrink-0 snap-start sm:w-[320px] lg:w-[340px]"
            >
              <Link
                href={`/products?line=${p.line}`}
                className="reg-plate block border-[3px] border-[var(--hair)] bg-[var(--ground)]"
              >
                <div className="relative aspect-4/5 overflow-hidden border-b-[3px] border-[var(--hair)] bg-[var(--color-ink)]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 640px) 74vw, 340px"
                    className="printed-photo object-cover"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 mix-blend-multiply"
                    style={{
                      background: "var(--color-plate)",
                      opacity: "var(--photo-tint-strength)",
                    }}
                  />
                </div>
                <div className="flex items-baseline justify-between gap-3 px-4 py-4">
                  <span className="banner text-[0.95rem] leading-tight">
                    {p.name}
                  </span>
                  <span className="shrink-0 text-[0.95rem] tabular-nums">
                    {taka(p.price)}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
