"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sun, Moon } from "@phosphor-icons/react";

const ROUTES = [
  { href: "/proto-2", label: "Stall" },
  { href: "/proto-2/products", label: "Everything" },
];

/**
 * The stall's board. Chalk wordmark on the left, the way in on the right, and
 * a rule under the whole thing. It is the page's masthead and its only large
 * mark, because chalk is drawn rather than typeset.
 */
export function Board() {
  const pathname = usePathname();
  const [lamp, setLamp] = useState<"day" | "dusk" | null>(null);

  useEffect(() => {
    const stored = document.documentElement.getAttribute("data-lamp");
    if (stored === "day" || stored === "dusk") {
      setLamp(stored);
      return;
    }
    setLamp(
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dusk" : "day",
    );
  }, []);

  function flip() {
    const next = lamp === "dusk" ? "day" : "dusk";
    setLamp(next);
    document.documentElement.setAttribute("data-lamp", next);
    try {
      localStorage.setItem("finestra-lamp", next);
    } catch {
      /* storage blocked; the flip still holds for this visit */
    }
  }

  return (
    <header className="sticky top-[46px] z-40 border-b border-[var(--mark)] bg-[var(--board)]">
      <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-5 px-4 py-3 sm:px-6">
        <Link href="/proto-2" className="chalk text-[2.1rem] leading-none sm:text-[2.5rem]">
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
                data-struck={here ? "true" : undefined}
                className="struck stencil-2 py-1"
              >
                {r.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={flip}
            aria-label={
              lamp === "dusk" ? "Raise the shutters" : "Lower the shutters"
            }
            className="flex h-8 w-8 items-center justify-center border border-[var(--mark)]"
          >
            {lamp === "dusk" ? (
              <Sun size={16} weight="bold" />
            ) : (
              <Moon size={16} weight="bold" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
