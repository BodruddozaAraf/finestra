"use client";

import { useId, useState } from "react";
import { Crate, Goods, CrateLabel } from "@/proto2/components/ui/Crate";
import { Action } from "@/proto2/components/ui/Action";
import { taka, type Product } from "@/proto2/lib/catalogue";
import { PRODUCT_SHOTS } from "@/proto2/lib/images";

/**
 * A crate on the shelf. Every rank inside it is carried by weight, case, and
 * rule, because everything here is the one type size.
 *
 * State is a mark: a chosen size is reversed, a sold-out crate is stamped.
 * Nothing is greyed out, because opacity is not a tonal device in this world.
 */
export function StallCrate({
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
    <Crate as="li" className="row-span-2">
      <Goods
        src={shot.src}
        alt={shot.alt}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24vw"
      />

      {product.soldOut ? (
        <p className="stencil-2 absolute left-0 top-0 bg-[var(--color-ink)] px-2 py-1 text-[var(--color-stock)]">
          Sold out
        </p>
      ) : null}

      <CrateLabel>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="stencil">{product.name}</h3>
          <p className="figure shrink-0">{taka(product.price)}</p>
        </div>

        <p className="note mt-1.5">{product.note}</p>

        <fieldset className="mt-3" disabled={product.soldOut}>
          <legend className="stencil-2">{product.variantLabel}</legend>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
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
                      "figure block cursor-pointer border border-[var(--color-ink)] px-2 py-1",
                      "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-ink)]",
                      on
                        ? "bg-[var(--color-ink)] text-[var(--color-stock)]"
                        : "bg-transparent",
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
          <p role="alert" className="stencil-2 mt-2">
            {error}
          </p>
        ) : null}

        <div className="mt-3">
          {product.soldOut ? (
            <p className="note">
              Back in stock soon. Message the shop to be told when.
            </p>
          ) : (
            <Action rank="reversed" onClick={add} className="w-full">
              {added ? "In the basket" : "Put in basket"}
            </Action>
          )}
        </div>
      </CrateLabel>
    </Crate>
  );
}
