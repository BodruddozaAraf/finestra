"use client";

import Image from "next/image";
import { useState } from "react";
import { ContactPlate } from "./ContactPlate";
import { CARE, lineOf, taka, type Product } from "@/lib/catalogue";
import { frameId, PRODUCT_FRAMES, PRODUCT_SHOTS } from "@/lib/images";

/**
 * The broadside: the piece page's layout family.
 *
 * One sheet inside one unbroken ink keyline, split into the frames on the left
 * and the particulars column on the right, with a specification band run across
 * the foot of the same frame. It follows the diptych's rule rather than the
 * catalogue plate's: a piece and its price are not two objects, so they are not
 * two frames.
 *
 * Nothing here takes an order. The column states what the piece is and what it
 * costs, and hands the customer to the shop's inbox.
 *
 * No load animation. The hero printing itself is the site's one authored
 * moment; here the only movement is the registration snap under a press.
 */
export function ProductBroadside({ product }: { product: Product }) {
  const shot = PRODUCT_SHOTS[product.id];
  // The piece's own shot leads; the line's stand-in frames follow, minus any
  // that would repeat it. Matched on the photograph, not the URL, because the
  // two are requested at different widths.
  const frames = [
    shot,
    ...(PRODUCT_FRAMES[product.line] ?? []).filter(
      (f) => frameId(f.src) !== frameId(shot.src),
    ),
  ];

  const [frame, setFrame] = useState(0);

  const shown = frames[frame];
  const line = lineOf(product.line);

  const specs = [
    { label: "Line", value: line.label },
    { label: "Material", value: product.material },
    { label: product.variantLabel, value: product.variants.join(", ") },
    { label: "Care", value: CARE[product.finish] },
  ];

  return (
    <section className="bg-[var(--ground)] px-4 py-10 sm:px-7 sm:py-14">
      <div className="mx-auto max-w-[1400px]">
        <div className="border-[3px] border-[var(--hair)]">
          <div className="grid lg:grid-cols-[1fr_0.82fr]">
            {/* The frames. */}
            <div className="border-b-[3px] border-[var(--hair)] lg:border-b-0 lg:border-r-[3px]">
              <div className="relative aspect-4/5 overflow-hidden bg-[var(--color-ink)] sm:aspect-square lg:aspect-6/5">
                <Image
                  key={shown.src}
                  src={shown.src}
                  alt={shown.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
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

                {/* Sold out is a painted band struck across the plate, not a
                    grey tint. State is a mark. */}
                {product.soldOut && (
                  <div className="pointer-events-none absolute inset-0 flex items-center">
                    <p className="banner w-[140%] -translate-x-[14%] -rotate-[7deg] border-y-[3px] border-[var(--color-plate)] bg-[var(--color-ink)] py-3 text-center text-[1.1rem] uppercase text-[var(--color-plate)] sm:text-[1.5rem]">
                      Sold out
                    </p>
                  </div>
                )}
              </div>

              {/* Frame rail. The chosen frame is marked with an ink underscore,
                  the same mark the nav uses for the current route. */}
              {frames.length > 1 && (
                <div className="flex gap-3 border-t-[3px] border-[var(--hair)] px-4 py-4 sm:px-5">
                  {frames.map((f, i) => {
                    const on = i === frame;
                    return (
                      <button
                        key={f.src}
                        type="button"
                        onClick={() => setFrame(i)}
                        aria-pressed={on}
                        aria-label={`Frame ${i + 1} of ${frames.length}: ${f.alt}`}
                        className="block w-[76px] shrink-0 sm:w-[92px]"
                      >
                        <span className="relative block aspect-square overflow-hidden border-[3px] border-[var(--hair)] bg-[var(--color-ink)]">
                          <Image
                            src={f.src}
                            alt=""
                            fill
                            sizes="92px"
                            className={`printed-photo object-cover ${on ? "" : "opacity-55"}`}
                          />
                          <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 mix-blend-multiply"
                            style={{
                              background: "var(--color-plate)",
                              opacity: "var(--photo-tint-strength)",
                            }}
                          />
                        </span>
                        <span
                          aria-hidden
                          className={`mt-[6px] block h-[5px] ${on ? "bg-[var(--ink)]" : "bg-transparent"}`}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* The buying column. */}
            <div className="flex flex-col px-5 py-7 sm:px-8 sm:py-9 lg:justify-center">
              <h1 className="banner text-[1.7rem] leading-[1.02] tracking-[-0.025em] sm:text-[2.2rem]">
                {product.name}
              </h1>

              <p className="mt-3 text-[1.5rem] leading-none tabular-nums sm:text-[1.75rem]">
                {taka(product.price)}
              </p>

              <p className="mt-5 max-w-[42ch] text-[1.02rem] leading-relaxed">
                {product.story}
              </p>

              <p className="mt-3 text-[0.9rem] leading-snug opacity-70">
                {product.material}
              </p>

              {/* What the piece comes in. Information, not a control: the
                  site is telling the customer, not taking an order, so there
                  is nothing to choose and nothing to get wrong. */}
              <div className="mt-7">
                <p className="text-[0.78rem] uppercase tracking-[0.04em] opacity-70">
                  {product.variantLabel}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <li
                      key={v}
                      className="rounded-full border-[3px] border-[var(--hair)] px-4 py-2 text-[0.88rem] tabular-nums"
                    >
                      {v}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                {product.soldOut ? (
                  <ContactPlate
                    action="Ask about this piece"
                    note="This one is not on the shelf at the moment. Message the shop to be told when it is back."
                  />
                ) : (
                  <ContactPlate />
                )}
              </div>
            </div>
          </div>

          {/* The specification band, inside the same frame. The cells are set
              in a 3px ink gap rather than given their own borders, so the
              keylines between them land correctly at every breakpoint. */}
          <dl className="grid gap-[3px] border-t-[3px] border-[var(--hair)] bg-[var(--hair)] sm:grid-cols-2 lg:grid-cols-4">
            {specs.map((s) => (
              <div
                key={s.label}
                className="bg-[var(--ground)] px-5 py-5 sm:px-6"
              >
                <dt className="banner text-[0.74rem] uppercase leading-none">
                  {s.label}
                </dt>
                <dd className="mt-2 text-[0.92rem] leading-relaxed">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
