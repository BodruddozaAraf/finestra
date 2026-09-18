"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { StallCrate } from "./StallCrate";
import { Scale, type BasketLine } from "./Scale";
import { CATALOGUE, LINES, type Line, type Product } from "@/proto2/lib/catalogue";

type Filter = Line | "all";

export function Stall({ initialLine }: { initialLine: Filter }) {
  const [filter, setFilter] = useState<Filter>(initialLine);
  const [pending, startTransition] = useTransition();
  const [lines, setLines] = useState<BasketLine[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  const shown = useMemo(
    () =>
      filter === "all" ? CATALOGUE : CATALOGUE.filter((p) => p.line === filter),
    [filter],
  );

  const rows: { id: Filter; label: string }[] = [
    { id: "all", label: "Everything" },
    ...LINES.map((l) => ({ id: l.id as Filter, label: l.label })),
  ];

  const add = useCallback((product: Product, variant: string) => {
    const key = product.id + "--" + variant;
    setNotice(null);
    setLines((prev) => {
      const at = prev.findIndex((l) => l.key === key);
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
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const settle = useCallback(() => {
    setNotice(
      "Settling up is not connected in this prototype. On the live site this is where payment and delivery details go.",
    );
  }, []);

  function choose(next: Filter) {
    startTransition(() => setFilter(next));
  }

  return (
    <>
      {/* The section line, written across the top of the stall. Selection is
          the chalk stroke, not a colour. */}
      <nav className="border-y border-[var(--mark)]">
        <ul className="mx-auto flex max-w-[1560px] flex-wrap items-center gap-x-6 gap-y-1 px-4 py-3 sm:px-6">
          {rows.map((l) => {
            const on = filter === l.id;
            return (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => choose(l.id)}
                  aria-pressed={on}
                  data-struck={on ? "true" : undefined}
                  className="struck stencil-2 py-1"
                >
                  {l.label}
                </button>
              </li>
            );
          })}
          <li className="figure ml-auto">
            {shown.length} {shown.length === 1 ? "crate" : "crates"}
          </li>
        </ul>
      </nav>

      <div className="mx-auto grid max-w-[1560px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_20rem] lg:items-start lg:gap-7">
        <div className="min-w-0">
          {pending ? (
            <ul
              className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
              style={{ gridAutoRows: "calc(var(--module) * 1.32)" }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <li
                  key={i}
                  className="stipple row-span-2 border border-[var(--mark)]"
                />
              ))}
            </ul>
          ) : shown.length === 0 ? (
            <div className="border border-[var(--mark)] px-5 py-14 text-center">
              <p className="stencil">This section is empty today</p>
              <p className="note mx-auto mt-3 max-w-[46ch]">
                Nothing from this line is on the shelf right now. Try another
                section, or message the shop and ask what is coming in.
              </p>
              <button
                type="button"
                onClick={() => choose("all")}
                className="struck stencil-2 mt-6 py-1"
              >
                Show everything
              </button>
            </div>
          ) : (
            <ul
              className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
              style={{ gridAutoRows: "calc(var(--module) * 1.32)" }}
            >
              {shown.map((p) => (
                <StallCrate key={p.id} product={p} onAdd={add} />
              ))}
            </ul>
          )}
        </div>

        <Scale
          lines={lines}
          onRemove={remove}
          onSettle={settle}
          notice={notice}
        />
      </div>

      {/* Clears the pinned scale on phones so the last crate is reachable. */}
      <div aria-hidden className="h-[132px] lg:hidden" />
    </>
  );
}
