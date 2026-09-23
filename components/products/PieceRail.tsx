import Image from "next/image";
import Link from "next/link";
import { taka, type Product } from "@/lib/catalogue";
import { PRODUCT_SHOTS } from "@/lib/images";

/**
 * The shelf rail, defined once.
 *
 * One horizontal run of painted plates that scroll-snaps. Rank comes from cell
 * count, so the rail carries more pieces than a row of cards could without any
 * plate growing louder than its neighbour. The homepage uses it for the week's
 * shelf and a piece page uses it for the rest of the line; it is the same
 * family both times, which is why it lives in one file.
 */
export function PieceRail({
  title,
  pieces,
  className = "",
}: {
  title: string;
  pieces: Product[];
  className?: string;
}) {
  if (pieces.length === 0) return null;

  return (
    <section
      className={`border-t-[3px] border-[var(--hair)] bg-[var(--ground)] py-14 sm:py-20 ${className}`}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-7">
        <h2 className="banner text-[1.9rem] leading-none tracking-[-0.02em] sm:text-[2.6rem]">
          {title}
        </h2>
      </div>

      {/* The rail starts on the container's gutter and runs off the right
          edge, so the shelf reads as longer than the screen. */}
      <ul className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pl-[max(1rem,calc((100%-1400px)/2+1.75rem))] scroll-pl-[max(1rem,calc((100%-1400px)/2+1.75rem))] pr-4 sm:pr-7 [scrollbar-width:thin]">
        {pieces.map((p) => {
          const shot = PRODUCT_SHOTS[p.id];
          return (
            <li
              key={p.id}
              className="w-[74vw] shrink-0 snap-start sm:w-[320px] lg:w-[340px]"
            >
              <Link
                href={`/products/${p.id}`}
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
                  {/* Sold out is a painted band, not a grey tint. */}
                  {p.soldOut && (
                    <p className="banner absolute top-1/2 w-[140%] -translate-x-[14%] -translate-y-1/2 -rotate-[7deg] border-y-[3px] border-[var(--color-plate)] bg-[var(--color-ink)] py-2 text-center text-[0.95rem] uppercase text-[var(--color-plate)]">
                      Sold out
                    </p>
                  )}
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
