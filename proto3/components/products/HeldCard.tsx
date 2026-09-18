"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { Stamp } from "@/proto3/components/ui/Stamp";
import { Pips, Callout, useFoil } from "@/proto3/components/ui/Card";
import { SERIES, TIER_RAMP, taka, type Product } from "@/proto3/lib/catalogue";
import { PRODUCT_SHOTS } from "@/proto3/lib/images";

/**
 * The card currently held. It is not a modal and it does not cover the set:
 * it sits beside the spread, and the spread stays legible behind it.
 *
 * Specifications are callouts attached to the piece by leader lines rather
 * than a list printed underneath it.
 */
export function HeldCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product, variant: string) => void;
}) {
  const groupId = useId();
  const foil = useFoil();
  const shot = PRODUCT_SHOTS[product.id];
  const tier = TIER_RAMP.find((t) => t.pips === product.tier)!;

  const [variant, setVariant] = useState<string | null>(
    product.variants.length === 1 ? product.variants[0] : null,
  );
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  // A new card is dealt: clear whatever was chosen on the last one.
  useEffect(() => {
    setVariant(product.variants.length === 1 ? product.variants[0] : null);
    setError(null);
    setAdded(false);
  }, [product.id, product.variants]);

  function add() {
    if (!variant) {
      setError(`Choose a ${product.variantLabel.toLowerCase()} first.`);
      return;
    }
    setError(null);
    onAdd(product, variant);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div>
      <div
        key={product.id}
        ref={foil.ref}
        onPointerMove={foil.onPointerMove}
        onPointerLeave={foil.onPointerLeave}
        data-held="true"
        className="card-stock foil lifted-held deal-in overflow-hidden border border-[var(--color-ink)]"
      >
        <div className="relative aspect-4/5 overflow-hidden border-b border-[var(--color-ink)] bg-[var(--color-ink)]">
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            priority
            sizes="(max-width: 1024px) 92vw, 420px"
            className="object-cover grayscale contrast-[1.08]"
          />
          <span className="absolute left-2.5 top-2.5 z-2 rounded-[4px] bg-[var(--color-stock)] px-2 py-1">
            <Pips tier={product.tier} label={tier.label} />
          </span>
          {product.soldOut ? (
            <span className="field absolute bottom-0 left-0 right-0 z-2 bg-[var(--color-ink)] px-3 py-1.5 text-center text-[var(--color-stock)]">
              Sold out
            </span>
          ) : null}
        </div>

        <div className="flex items-end justify-between gap-3 px-4 py-3.5">
          <div>
            <h2 className="plate text-[1.55rem]">{product.name}</h2>
            <p className="stat mt-1 text-[0.85rem] tracking-[0.06em]">
              {product.setCode}
            </p>
          </div>
          <p className="stat text-[1.2rem] font-semibold">
            {taka(product.price)}
          </p>
        </div>
      </div>

      {/* Callouts. Each specification is attached to the piece. */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <Callout field="Material">{product.material}</Callout>
        <Callout field="Series">
          {SERIES[product.line] === "character" ? "Character" : "Everyday"}
        </Callout>
        <Callout field="Tier">{tier.meaning}</Callout>
        <Callout field="Note">{product.note}</Callout>
      </div>

      <fieldset className="mt-6" disabled={product.soldOut}>
        <legend className="field">{product.variantLabel}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.variants.map((v) => {
            const id = `${groupId}-${v}`;
            const on = variant === v;
            return (
              <span key={v}>
                <input
                  type="radio"
                  id={id}
                  name={groupId}
                  value={v}
                  checked={on}
                  onChange={() => {
                    setVariant(v);
                    setError(null);
                  }}
                  className="peer sr-only"
                />
                <label
                  htmlFor={id}
                  className={[
                    "stat block cursor-pointer rounded-[var(--radius-card)] border px-3 py-1.5 text-[0.95rem]",
                    "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-foil)]",
                    on
                      ? "border-[var(--on-surface)] bg-[var(--on-surface)] text-[var(--surface)]"
                      : "border-[var(--surface-line)] bg-transparent",
                    product.soldOut ? "border-dashed" : "",
                  ].join(" ")}
                >
                  {v}
                </label>
              </span>
            );
          })}
        </div>
      </fieldset>

      {error ? (
        <p role="alert" className="field mt-3">
          {error}
        </p>
      ) : null}

      <div className="mt-5">
        {product.soldOut ? (
          <p className="text-[0.97rem] leading-relaxed">
            Back in stock soon. Message the shop to be told when.
          </p>
        ) : (
          <Stamp stamp="foil" onClick={add} className="w-full">
            {added ? "In the collection" : "Add to collection"}
          </Stamp>
        )}
      </div>
    </div>
  );
}
