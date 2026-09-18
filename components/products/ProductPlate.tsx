"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { Lozenge } from "@/components/ui/Lozenge";
import { taka, type Product } from "@/lib/catalogue";
import { PRODUCT_SHOTS } from "@/lib/images";

export function ProductPlate({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product, variant: string) => void;
}) {
  const groupId = useId();
  const [variant, setVariant] = useState<string | null>(
    product.variants.length === 1 ? product.variants[0] : null,
  );
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const shot = PRODUCT_SHOTS[product.id];

  function add() {
    if (!variant) {
      setError(`Pick a ${product.variantLabel.toLowerCase()} first.`);
      return;
    }
    setError(null);
    onAdd(product, variant);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <article className="flex flex-col border-[3px] border-[var(--hair)] bg-[var(--ground)]">
      <div className="relative aspect-4/5 overflow-hidden border-b-[3px] border-[var(--hair)] bg-[var(--color-ink)]">
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 30vw"
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

        {/* Sold out is a painted band, not a grey tint. State is a mark. */}
        {product.soldOut && (
          <div className="pointer-events-none absolute inset-0 flex items-center">
            <p className="banner w-[140%] -translate-x-[14%] -rotate-[7deg] border-y-[3px] border-[var(--color-plate)] bg-[var(--color-ink)] py-2 text-center text-[0.95rem] uppercase text-[var(--color-plate)]">
              Sold out
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 py-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="banner text-[0.98rem] leading-tight">
            {product.name}
          </h3>
          <p className="shrink-0 text-[0.98rem] tabular-nums">
            {taka(product.price)}
          </p>
        </div>

        <p className="mt-1 text-[0.86rem] leading-snug opacity-70">
          {product.material}
        </p>

        <fieldset className="mt-4" disabled={product.soldOut}>
          <legend className="text-[0.78rem] uppercase tracking-[0.04em] opacity-70">
            {product.variantLabel}
          </legend>
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
                      "block cursor-pointer rounded-full border-[3px] border-[var(--hair)] px-3 py-1.5 text-[0.82rem] tabular-nums",
                      "peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-[var(--hair)]",
                      // Chosen is marked by fill and an inner keyline, so the
                      // chip reads as chosen without yellow becoming a status.
                      on
                        ? "bg-[var(--ink)] text-[var(--ground)] shadow-[inset_0_0_0_2px_var(--ground)]"
                        : "bg-transparent",
                      product.soldOut ? "opacity-40" : "",
                    ].join(" ")}
                  >
                    {v}
                  </label>
                </span>
              );
            })}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="mt-3 text-[0.84rem] font-semibold">
            {error}
          </p>
        )}

        <div className="mt-auto pt-5">
          {product.soldOut ? (
            <p className="text-[0.86rem] leading-snug opacity-70">
              Back in stock soon. Message the shop to be told when.
            </p>
          ) : (
            <Lozenge
              tone="field"
              onClick={add}
              className="w-full px-4 py-3 text-[0.78rem]"
            >
              {added ? "Added to bag" : "Add to bag"}
            </Lozenge>
          )}
        </div>
      </div>
    </article>
  );
}
