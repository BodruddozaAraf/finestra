"use client";

import Image from "next/image";
import { X } from "@phosphor-icons/react";
import { Stamp } from "@/proto3/components/ui/Stamp";
import { taka } from "@/proto3/lib/catalogue";
import { PRODUCT_SHOTS } from "@/proto3/lib/images";

export type Kept = {
  key: string;
  id: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
};

/**
 * What you have kept, shown the way a collection actually looks: card corners
 * overlapping in a stack rather than a list of receipt rows. Nothing is hidden
 * behind a count badge.
 */
export function Collection({
  kept,
  onRemove,
  onCheckout,
  notice,
}: {
  kept: Kept[];
  onRemove: (key: string) => void;
  onCheckout: () => void;
  notice: string | null;
}) {
  const subtotal = kept.reduce((n, k) => n + k.price * k.qty, 0);
  const count = kept.reduce((n, k) => n + k.qty, 0);

  return (
    <section className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--surface-line)] bg-[var(--surface)] lg:static lg:border-0 lg:border-t lg:bg-transparent">
      <div className="mx-auto max-w-[1600px] px-4 py-3 sm:px-7 lg:mx-0 lg:max-w-none lg:px-0 lg:pt-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="field">Collection</h2>
          <p className="stat text-[0.9rem]">
            {count} {count === 1 ? "card" : "cards"}
          </p>
        </div>

        {kept.length === 0 ? (
          <p className="mt-2 text-[0.95rem] leading-relaxed">
            Nothing kept yet. Choose a size on the held card and it joins the
            stack.
          </p>
        ) : (
          <>
            {/* The stack. Corners overlap, the way cards sit in a hand. */}
            <ul className="mt-3 flex flex-wrap gap-y-3 pl-3">
              {kept.map((k) => {
                const shot = PRODUCT_SHOTS[k.id];
                return (
                  <li
                    key={k.key}
                    className="card-stock lifted group relative -ml-3 flex w-[142px] shrink-0 flex-col overflow-hidden border border-[var(--color-ink)]"
                  >
                    <div className="relative h-[62px] w-full overflow-hidden border-b border-[var(--color-ink)] bg-[var(--color-ink)]">
                      <Image
                        src={shot.src}
                        alt=""
                        fill
                        sizes="142px"
                        className="object-cover grayscale contrast-[1.08]"
                      />
                    </div>
                    <div className="px-2 pb-1.5 pt-1.5">
                      <p className="plate text-[0.82rem] leading-tight">
                        {k.name}
                      </p>
                      <p className="stat mt-0.5 flex items-baseline justify-between gap-2 text-[0.78rem]">
                        <span>
                          {k.variant}
                          {k.qty > 1 ? ` x ${k.qty}` : ""}
                        </span>
                        <span className="font-semibold">
                          {taka(k.price * k.qty)}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(k.key)}
                      aria-label={`Take ${k.name}, ${k.variant}, out of the collection`}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-[4px] bg-[var(--color-stock)] text-[var(--color-ink)]"
                    >
                      <X size={11} weight="bold" />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--surface-line)] pt-3">
              <p className="stat text-[1.05rem]">
                <span className="field">Total</span>{" "}
                <span className="font-semibold">{taka(subtotal)}</span>
              </p>
              <Stamp stamp="ink" onClick={onCheckout}>
                Check out
              </Stamp>
            </div>
          </>
        )}

        {notice ? (
          <p
            role="status"
            className="mt-3 border-t border-[var(--surface-line)] pt-2 text-[0.93rem] leading-relaxed"
          >
            {notice}
          </p>
        ) : null}
      </div>
    </section>
  );
}
