"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sun, Moon } from "@phosphor-icons/react";
import { CATALOGUE } from "@/proto3/lib/catalogue";

const ROUTES = [
  { href: "/proto-3", label: "The set" },
  { href: "/proto-3/products", label: "All cards" },
];

/**
 * The header is the set's own wrapper band: a foil-stamped wordmark, the two
 * ways in, and the card count, which is real information rather than an
 * invented scarcity figure.
 */
export function SetHeader() {
  const pathname = usePathname();
  const [mat, setMat] = useState<"page" | "playmat" | null>(null);

  useEffect(() => {
    const stored = document.documentElement.getAttribute("data-mat");
    if (stored === "page" || stored === "playmat") {
      setMat(stored);
      return;
    }
    setMat(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "playmat"
        : "page",
    );
  }, []);

  function flip() {
    const next = mat === "playmat" ? "page" : "playmat";
    setMat(next);
    document.documentElement.setAttribute("data-mat", next);
    try {
      localStorage.setItem("finestra-mat", next);
    } catch {
      /* storage blocked; the flip still holds for this visit */
    }
  }

  return (
    <header className="sticky top-[46px] z-40 border-b border-[var(--surface-line)] bg-[var(--surface)]/92 backdrop-blur-sm">
      <div className="mx-auto flex h-[62px] max-w-[1600px] items-center justify-between gap-5 px-4 sm:px-7">
        <Link
          href="/proto-3"
          className="plate rounded-[6px] bg-[var(--color-foil)] px-2.5 py-1 text-[1.15rem] uppercase tracking-[0.1em] text-[var(--color-ink)]"
        >
          Finestra
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          {ROUTES.map((r) => {
            const here = pathname === r.href;
            return (
              <Link
                key={r.href}
                href={r.href}
                aria-current={here ? "page" : undefined}
                className={[
                  "field py-1",
                  here
                    ? "border-b-2 border-[var(--color-foil)]"
                    : "border-b-2 border-transparent",
                ].join(" ")}
              >
                {r.label}
              </Link>
            );
          })}

          <span className="field hidden stat sm:inline">
            {CATALOGUE.length} cards
          </span>

          <button
            type="button"
            onClick={flip}
            aria-label={
              mat === "playmat" ? "Lay the set on the page" : "Lay the set on the mat"
            }
            className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-card)] border border-[var(--on-surface)]"
          >
            {mat === "playmat" ? (
              <Sun size={15} weight="bold" />
            ) : (
              <Moon size={15} weight="bold" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
