"use client";

import { useMemo, useState, useTransition } from "react";
import { Check } from "@phosphor-icons/react";
import { ProductPlate } from "./ProductPlate";
import type {
  Category,
  CategoryInfo,
  Collection,
  CollectionInfo,
  Product,
} from "@/lib/catalogue";

/**
 * One filter at a time: the whole shelf, one category (what the piece is), or
 * one collection (the line it belongs to, across categories).
 */
export type Filter =
  | { kind: "all" }
  | { kind: "category"; id: Category }
  | { kind: "collection"; id: Collection };

type FilterRow = { filter: Filter; label: string; note: string };

const same = (a: Filter, b: Filter) =>
  a.kind === b.kind && (a.kind === "all" || a.id === (b as typeof a).id);

export function Catalogue({
  products,
  categories,
  collections,
  initialFilter,
}: {
  products: Product[];
  categories: CategoryInfo[];
  collections: CollectionInfo[];
  initialFilter: Filter;
}) {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [pending, startTransition] = useTransition();

  const shown = useMemo(
    () =>
      filter.kind === "all"
        ? products
        : products.filter((p) => p[filter.kind] === filter.id),
    [filter, products],
  );

  const groups: { title: string; rows: FilterRow[] }[] = [
    {
      title: "Categories",
      rows: [
        {
          filter: { kind: "all" as const },
          label: "Everything",
          note: products.length + " pieces",
        },
        ...categories.map((c) => ({
          filter: { kind: "category" as const, id: c.id },
          label: c.label,
          note: c.note,
        })),
      ],
    },
    {
      title: "Collections",
      rows: collections.map((c) => ({
        filter: { kind: "collection" as const, id: c.id },
        label: c.label,
        note: c.note,
      })),
    },
  ].filter((g) => g.rows.length > 0);

  function choose(next: Filter) {
    startTransition(() => setFilter(next));
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-7">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-10">
        {/* Filter rail. Selection is drawn with a mark, never with colour. */}
        <aside className="min-w-0 space-y-6 lg:sticky lg:top-[92px] lg:self-start lg:space-y-8">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="banner text-[0.92rem] uppercase">
                {group.title}
              </h2>
              <ul className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
                {group.rows.map((row) => {
                  const on = same(filter, row.filter);
                  return (
                    <li key={row.label} className="shrink-0 lg:w-full">
                      <button
                        type="button"
                        onClick={() => choose(row.filter)}
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
                            {row.label}
                          </span>
                          <span className="hidden text-[0.78rem] leading-tight opacity-70 lg:block">
                            {row.note}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
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
                This part of the shelf is still being photographed. Try another one, or message
                the shop and ask what is coming.
              </p>
              <button
                type="button"
                onClick={() => choose({ kind: "all" })}
                className="mt-6 banner text-[0.84rem] uppercase underline decoration-[3px] underline-offset-[6px]"
              >
                Show everything
              </button>
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {shown.map((p) => (
                <li key={p.id}>
                  <ProductPlate product={p} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
