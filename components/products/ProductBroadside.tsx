"use client";

import Image from "next/image";
import { useState } from "react";
import { ContactPlate } from "./ContactPlate";
import { taka, type Product } from "@/lib/catalogue";

/**
 * The broadside: the product page's layout family.
 *
 * One sheet inside one unbroken ink keyline, split into the frames on the left
 * and the particulars column on the right, with a specification band run across
 * the foot of the same frame. It follows the diptych's rule rather than the
 * catalogue plate's: a product and its price are not two objects, so they are not
 * two frames.
 *
 * Nothing here takes an order. The column states what the product is and what it
 * costs, and hands the customer to the shop's inbox.
 *
 * Photos here are true colour — this is where a customer decides, so the
 * product is shown as it is, not screened toward the plates. The one movement
 * on load is the photo developing out of the print into colour, once the
 * photo itself has arrived.
 */
/** Two to five specs: category, collection, material, and up to two option groups. */
const SPEC_COLUMNS: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

export function ProductBroadside({ product }: { product: Product }) {
  // The product's own shot leads; the further photos follow in the order the
  // shop set in the Studio, then the photos of individual options (the black
  // version, say), so choosing an option is just choosing its frame.
  const optionPhotos = product.options.flatMap((g) =>
    g.values.flatMap((v) => (v.image ? [v.image] : [])),
  );
  const frames = [product.image, ...product.frames, ...optionPhotos];

  const [frame, setFrame] = useState(0);

  const shown = frames[frame];

  // Which frame's photo has finished loading. The develop waits for it: a
  // slow photo would otherwise spend the whole animation as an empty plate
  // and arrive already in colour.
  const [developed, setDeveloped] = useState<string | null>(null);

  const specs = [
    { label: "Category", value: product.categoryLabel },
    ...(product.collectionLabel
      ? [{ label: "Collection", value: product.collectionLabel }]
      : []),
    { label: "Material", value: product.material },
    ...product.options.map((g) => ({
      label: g.label,
      value: g.values.map((v) => v.label).join(", "),
    })),
  ];

  return (
    <section className="bg-[var(--ground)] px-4 py-10 sm:px-7 sm:py-14">
      <div className="mx-auto max-w-[1400px]">
        <div className="border-[3px] border-[var(--hair)]">
          <div className="grid lg:grid-cols-[1fr_0.82fr]">
            {/* The frames. */}
            <div className="border-b-[3px] border-[var(--hair)] lg:border-b-0 lg:border-r-[3px]">
              <div
                data-developed={developed === shown.src || undefined}
                className="develops relative aspect-4/5 overflow-hidden bg-[var(--color-ink)] sm:aspect-square lg:aspect-6/5"
              >
                <Image
                  key={shown.src}
                  // One frame after load, so the printed state is painted
                  // before the transition starts — a cached photo can load
                  // before it ever is.
                  onLoad={() =>
                    requestAnimationFrame(() => setDeveloped(shown.src))
                  }
                  src={shown.src}
                  alt={shown.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="develop-photo object-cover"
                  style={{ objectPosition: shown.position }}
                />
                {/* Keyed with the photo, so a new frame starts printed rather
                    than fading back from the last one's colour. */}
                <div
                  key={`tint-${shown.src}`}
                  aria-hidden
                  className="photo-tint develop-tint"
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
                        key={`${i}-${f.src}`}
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
                            className={`object-cover ${on ? "" : "opacity-55"}`}
                            style={{ objectPosition: f.position }}
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

              {/* What the product comes in. Information, not a control: the
                  site is telling the customer, not taking an order, so there
                  is nothing to choose and nothing to get wrong. The one thing
                  an option does is show its own photo, when it has one. A
                  sold-out option is struck through, the same mark-not-colour
                  rule as the sold-out band. */}
              {product.options.map((group) => (
                <div key={group.label} className="mt-7">
                  <p className="text-[0.78rem] uppercase tracking-[0.04em] opacity-70">
                    {group.label}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {group.values.map((v) => {
                      const chip = [
                        "block rounded-full border-[3px] px-4 py-2 text-[0.88rem] tabular-nums",
                        v.soldOut
                          ? "border-dashed border-[var(--hair)] line-through opacity-55"
                          : "border-[var(--hair)]",
                      ];
                      const label = (
                        <>
                          {v.label}
                          {v.soldOut && <span className="sr-only"> (sold out)</span>}
                        </>
                      );
                      if (!v.image) {
                        return (
                          <li key={v.label} className={chip.join(" ")}>
                            {label}
                          </li>
                        );
                      }
                      const at = frames.indexOf(v.image);
                      const on = at === frame;
                      return (
                        <li key={v.label}>
                          <button
                            type="button"
                            onClick={() => setFrame(at)}
                            aria-pressed={on}
                            className={[
                              ...chip,
                              on ? "bg-[var(--ink)] text-[var(--ground)]" : "",
                            ].join(" ")}
                          >
                            {label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

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
          <dl
            className={`grid gap-[3px] border-t-[3px] border-[var(--hair)] bg-[var(--hair)] sm:grid-cols-2 ${SPEC_COLUMNS[specs.length] ?? "lg:grid-cols-4"}`}
          >
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
