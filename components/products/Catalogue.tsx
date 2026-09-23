"use client";

import { useMemo, useState, useTransition } from "react";
import { Check } from "@phosphor-icons/react";
import { ProductPlate } from "./ProductPlate";
import { useBag } from "./BagProvider";
import { CATALOGUE, LINES, type Line } from "@/lib/catalogue";

type Filter = Line | "all";

type FilterRow = { id: Filter; label: string; note: string };

export function Catalogue({ initialLine }: { initialLine: Filter }) {
  const [filter, setFilter] = useState<Filter>(initialLine);
  const [pending, startTransition] = useTransition();
  const { add } = useBag();

  const shown = useMemo(
    () => (filter === "all" ? CATALOGUE : CATALOGUE.filter((p) => p.line === filter)),
    [filter],
  );

  const rows: FilterRow[] = [
    { id: "all", label: "Everything", note: CATALOGUE.length + " pieces" },
    ...LINES.map((l) => ({ id: l.id as Filter, label: l.label, note: l.note })),
  ];

  function choose(next: Filter) {
    startTransition(() => setFilter(next));
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-7">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-10">
        {/* Filter rail. Selection is drawn with a mark, never with colour. */}
        <aside className="min-w-0 lg:sticky lg:top-[92px] lg:self-start">
          <h2 className="banner text-[0.92rem] uppercase">
            Lines
          </h2>
          <ul className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
            {rows.map((l) => {
              const on = filter === l.id;
              return (
                <li key={l.id} className="shrink-0 lg:w-full">
                  <button
                    type="button"
                    onClick={() => choose(l.id)}
                    aria-pressed={on}
                    className={[
                      "flex w-full items-center gap-2 whitespace-nowrap border-[3px] px-3 py-2 text-left lg:whitespace-normal lg:border-0 lg:border-b-[3px] lg:px-0 lg:py-3",
                      on
                        ? "border-[var(--hair)] lg:border-[var(--hair)]"
                        : "border-transparent lg:border-[var(--hair)] lg:opacity-70",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden
                      className={[
                        "flex h-[18px] w-[18px] shrink-0 items-center justify-center border-[3px] border-[var(--hair)]",
                        on ? "bg-[var(--ink)] text-[var(--ground)]" : "",
                      ].join(" ")}
                    >
                      {on ? <Check size={9} weight="bold" /> : null}
                    </span>
                    <span>
                      <span className="block banner text-[0.82rem] leading-tight">
                        {l.label}
                      </span>
                      <span className="hidden text-[0.78rem] leading-tight opacity-70 lg:block">
                        {l.note}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="min-w-0">
          {pending ? (
            // Skeleton matches the plate it replaces, so nothing shifts.
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="border-[3px] border-[var(--hair)] opacity-45">
                  <div className="screen-dots-coarse aspect-4/5 border-b-[3px] border-[var(--hair)]" />
                  <div className="space-y-2 px-4 py-4">
                    <div className="h-4 w-2/3 bg-[var(--hair)] opacity-30" />
                    <div className="h-3 w-1/3 bg-[var(--hair)] opacity-20" />
                    <div className="h-8 w-full bg-[var(--hair)] opacity-15" />
                  </div>
                </li>
              ))}
            </ul>
          ) : shown.length === 0 ? (
            <div className="border-[3px] border-[var(--hair)] px-6 py-16 text-center">
              <p className="banner text-[1.3rem]">
                Nothing on this shelf yet
              </p>
              <p className="mx-auto mt-3 max-w-[40ch] text-[0.97rem] leading-relaxed">
                This line is still being photographed. Try another line, or message
                the shop and ask what is coming.
              </p>
              <button
                type="button"
                onClick={() => choose("all")}
                className="mt-6 banner text-[0.84rem] uppercase underline decoration-[3px] underline-offset-[6px]"
              >
                Show everything
              </button>
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {shown.map((p) => (
                <li key={p.id} className="flex">
                  <div className="flex w-full">
                    <ProductPlate product={p} onAdd={add} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
