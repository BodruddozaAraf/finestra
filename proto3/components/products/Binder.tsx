"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { SetCard } from "@/proto3/components/ui/Card";
import { HeldCard } from "./HeldCard";
import { Collection, type Kept } from "./Collection";
import { CATALOGUE, LINES, type Line, type Product } from "@/proto3/lib/catalogue";

type Filter = Line | "all";

/**
 * The binder. One card is held on the left and the whole set stays open on
 * the right; picking a card swaps what is held and never covers the spread.
 *
 * Unselected cards are not removed when a filter narrows the set. They are
 * the set, so a narrowed filter simply shows fewer of them.
 */
export function Binder({
  initialLine,
  initialCard,
}: {
  initialLine: Filter;
  initialCard: string;
}) {
  const [filter, setFilter] = useState<Filter>(initialLine);
  const [heldId, setHeldId] = useState<string>(initialCard);
  const [kept, setKept] = useState<Kept[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const heldRef = useRef<HTMLDivElement>(null);

  const shown = useMemo(
    () =>
      filter === "all" ? CATALOGUE : CATALOGUE.filter((p) => p.line === filter),
    [filter],
  );

  const held = CATALOGUE.find((p) => p.id === heldId) ?? CATALOGUE[0];

  const pick = useCallback((id: string) => {
    setHeldId(id);
    // On a narrow screen the held card sits above the spread, so bring it
    // back into view when a new one is dealt.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      heldRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }
  }, []);

  const add = useCallback((product: Product, variant: string) => {
    const key = product.id + "--" + variant;
    setNotice(null);
    setKept((prev) => {
      const at = prev.findIndex((k) => k.key === key);
      if (at > -1) {
        const next = [...prev];
        next[at] = { ...next[at], qty: next[at].qty + 1 };
        return next;
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          variant,
          price: product.price,
          qty: 1,
        },
      ];
    });
  }, []);

  const remove = useCallback((key: string) => {
    setNotice(null);
    setKept((prev) => prev.filter((k) => k.key !== key));
  }, []);

  const checkout = useCallback(() => {
    setNotice(
      "Checkout is not connected in this prototype. On the live site this is where payment and delivery details go.",
    );
  }, []);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All cards" },
    ...LINES.map((l) => ({ id: l.id as Filter, label: l.label })),
  ];

  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-7">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-12">
        {/* Held card, plus the collection beneath it on a wide screen. */}
        <div
          ref={heldRef}
          /* The panel is taller than a laptop viewport, so it pins and scrolls
             inside itself. Without this the add control sits below the fold
             with no way to reach it. */
          className="min-w-0 lg:sticky lg:top-[120px] lg:max-h-[calc(100dvh-134px)] lg:self-start lg:overflow-y-auto lg:pr-3"
        >
          <HeldCard product={held} onAdd={add} />
          <div className="hidden lg:block">
            <Collection
              kept={kept}
              onRemove={remove}
              onCheckout={checkout}
              notice={notice}
            />
          </div>
        </div>

        {/* The spread. It never closes. */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[var(--surface-line)] pb-3">
            {filters.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={on}
                  className={[
                    "field py-1",
                    on
                      ? "border-b-2 border-[var(--color-foil)]"
                      : "border-b-2 border-transparent",
                  ].join(" ")}
                >
                  {f.label}
                </button>
              );
            })}
            <span className="stat ml-auto text-[0.9rem]">
              {shown.length} of {CATALOGUE.length}
            </span>
          </div>

          {shown.length === 0 ? (
            <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--surface-line)] px-5 py-14 text-center">
              <p className="plate text-[1.4rem]">No cards in this series yet</p>
              <p className="mx-auto mt-3 max-w-[46ch] text-[0.97rem] leading-relaxed">
                Nothing from this line has been issued. Try another series, or
                message the shop and ask what is coming.
              </p>
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="field mt-6 border-b-2 border-[var(--color-foil)] py-1"
              >
                Show all cards
              </button>
            </div>
          ) : (
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {shown.map((p, i) => (
                <li key={p.id}>
                  <SetCard
                    product={p}
                    held={p.id === held.id}
                    onPick={pick}
                    priority={i < 4}
                    sizes="(max-width: 640px) 45vw, (max-width: 1280px) 28vw, 230px"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* The collection pins to the foot of a phone instead. */}
      <div className="lg:hidden">
        <Collection
          kept={kept}
          onRemove={remove}
          onCheckout={checkout}
          notice={notice}
        />
      </div>
      <div aria-hidden className="h-[150px] lg:h-10" />
    </div>
  );
}
