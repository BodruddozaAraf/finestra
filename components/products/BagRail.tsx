"use client";

import Image from "next/image";
import { X } from "@phosphor-icons/react";
import { Lozenge } from "@/components/ui/Lozenge";
import { taka } from "@/lib/catalogue";
import { PRODUCT_SHOTS } from "@/lib/images";

export type BagLine = {
  key: string;
  id: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
};

/**
 * The bag is a rail, not a badge. Anything set aside stays visible as the
 * actual piece, so the customer never has to open a drawer to remember what
 * they picked.
 */
export function BagRail({
  lines,
  onRemove,
  onCheckout,
  notice,
}: {
  lines: BagLine[];
  onRemove: (key: string) => void;
  onCheckout: () => void;
  notice: string | null;
}) {
  const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);
  const count = lines.reduce((n, l) => n + l.qty, 0);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t-[3px] border-[var(--hair)] field-plate">
      <div className="mx-auto max-w-[1400px] px-4 py-3 sm:px-7">
        {lines.length === 0 ? (
          <p className="py-1 text-[0.9rem] leading-snug">
            Your bag is empty. Pick a size on any piece above and it lands
            here.
          </p>
        ) : (
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
            <ul className="flex flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
              {lines.map((l) => {
                const shot = PRODUCT_SHOTS[l.id];
                return (
                  <li
                    key={l.key}
                    className="flex shrink-0 items-center gap-2 border-[3px] border-[var(--color-ink)] bg-[var(--ground)] pr-2"
                  >
                    <div className="relative h-[46px] w-[46px] shrink-0 overflow-hidden bg-[var(--color-ink)]">
                      <Image
                        src={shot.src}
                        alt=""
                        fill
                        sizes="46px"
                        className="printed-photo object-cover"
                      />
                    </div>
                    <div className="py-1 pl-1 pr-2">
                      <p className="text-[0.8rem] leading-tight font-semibold">
                        {l.name}
                      </p>
                      <p className="text-[0.76rem] leading-tight tabular-nums opacity-75">
                        {l.variant}
                        {l.qty > 1 ? " x " + l.qty : ""}, {taka(l.price * l.qty)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(l.key)}
                      aria-label={`Remove ${l.name}, ${l.variant}, from the bag`}
                      className="flex h-7 w-7 shrink-0 items-center justify-center border-[2px] border-[var(--hair)] text-[var(--ink)]"
                    >
                      <X size={13} weight="bold" />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between gap-4 lg:justify-end">
              <p className="text-[0.92rem] leading-tight">
                <span className="block text-[0.76rem] uppercase opacity-75">
                  {count} {count === 1 ? "piece" : "pieces"}
                </span>
                <span className="banner text-[1.15rem] tabular-nums">
                  {taka(subtotal)}
                </span>
              </p>
              <Lozenge
                tone="ink"
                onClick={onCheckout}
                className="px-7 py-3 text-[0.8rem]"
              >
                Checkout
              </Lozenge>
            </div>
          </div>
        )}

        {notice && (
          <p
            role="status"
            className="mt-2 border-t-[2px] border-[var(--color-ink)] pt-2 text-[0.84rem] leading-snug"
          >
            {notice}
          </p>
        )}
      </div>
    </div>
  );
}
