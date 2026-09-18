"use client";

import { X } from "@phosphor-icons/react";
import { Action } from "@/proto2/components/ui/Action";
import { taka } from "@/proto2/lib/catalogue";

export type BasketLine = {
  key: string;
  id: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
};

/**
 * The scale hanging at the side of the stall. It holds what you have picked
 * and what it comes to, as a ruled ledger rather than a hidden drawer.
 *
 * It sits in its own column on a wide screen and pins to the bottom of a
 * phone, so it never leaves the page.
 */
export function Scale({
  lines,
  onRemove,
  onSettle,
  notice,
}: {
  lines: BasketLine[];
  onRemove: (key: string) => void;
  onSettle: () => void;
  notice: string | null;
}) {
  const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);
  const count = lines.reduce((n, l) => n + l.qty, 0);

  return (
    <aside className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--mark)] bg-[var(--board)] lg:static lg:border lg:border-[var(--mark)]">
      <div className="mx-auto max-w-[1560px] px-4 py-3 sm:px-6 lg:mx-0 lg:max-w-none lg:px-4 lg:py-4">
        <div className="flex items-baseline justify-between gap-4 border-b border-[var(--mark)] pb-2">
          <p className="stencil">On the scale</p>
          <p className="figure">
            {count} {count === 1 ? "piece" : "pieces"}
          </p>
        </div>

        {lines.length === 0 ? (
          <p className="note py-3">
            Nothing on it yet. Pick a size on any crate and it lands here.
          </p>
        ) : (
          <>
            <ul className="flex gap-x-5 overflow-x-auto py-2 lg:max-h-[42vh] lg:flex-col lg:gap-x-0 lg:overflow-y-auto">
              {lines.map((l) => (
                <li
                  key={l.key}
                  className="flex shrink-0 items-baseline gap-3 border-[var(--mark)] py-1.5 lg:shrink lg:justify-between lg:border-b"
                >
                  <span className="note whitespace-nowrap lg:whitespace-normal">
                    <span className="stencil-2">{l.name}</span>{" "}
                    <span className="figure">
                      {l.variant}
                      {l.qty > 1 ? ` x ${l.qty}` : ""}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="figure">{taka(l.price * l.qty)}</span>
                    <button
                      type="button"
                      onClick={() => onRemove(l.key)}
                      aria-label={`Take ${l.name}, ${l.variant}, off the scale`}
                      className="flex h-6 w-6 items-center justify-center border border-[var(--mark)]"
                    >
                      <X size={11} weight="bold" />
                    </button>
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--mark)] pt-3">
              <p className="stencil">
                Comes to <span className="figure">{taka(subtotal)}</span>
              </p>
              <Action rank="stock" onClick={onSettle}>
                Settle up
              </Action>
            </div>
          </>
        )}

        {notice ? (
          <p
            role="status"
            className="note mt-3 border-t border-[var(--mark)] pt-2"
          >
            {notice}
          </p>
        ) : null}
      </div>
    </aside>
  );
}
