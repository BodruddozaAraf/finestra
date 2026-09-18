"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SunHorizon, MoonStars } from "@phosphor-icons/react";
import { Chevron } from "@/proto1/components/ui/Plate";

const ROUTES = [
  { href: "/proto-1", label: "Home" },
  { href: "/proto-1/products", label: "Shop" },
];

export function SignBoard() {
  const pathname = usePathname();
  const [plate, setPlate] = useState<"day" | "night" | null>(null);

  useEffect(() => {
    const stored = document.documentElement.getAttribute("data-theme");
    if (stored === "day" || stored === "night") {
      setPlate(stored);
      return;
    }
    setPlate(
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day",
    );
  }, []);

  function flip() {
    const next = plate === "night" ? "day" : "night";
    setPlate(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("finestra-plate", next);
    } catch {
      /* storage blocked; the flip still holds for this visit */
    }
  }

  return (
    <header className="sticky top-[46px] z-40 field-plate">
      <div className="flex h-[58px] items-center justify-between gap-4 px-4 sm:h-[68px] sm:px-7">
        <Link
          href="/proto-1"
          className="hand text-[1.9rem] leading-none text-[var(--color-ink)] sm:text-[2.3rem]"
        >
          Finestra
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {ROUTES.map((r) => {
            const here = pathname === r.href;
            return (
              <Link
                key={r.href}
                href={r.href}
                aria-current={here ? "page" : undefined}
                className={[
                  "banner px-3 py-2 text-[0.7rem] uppercase leading-none text-[var(--color-ink)] sm:px-4 sm:text-[0.78rem]",
                  // Current route is marked, not coloured: an ink underscore,
                  // painted under the word.
                  here
                    ? "border-b-[4px] border-[var(--color-ink)]"
                    : "border-b-[4px] border-transparent",
                ].join(" ")}
              >
                {r.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={flip}
            aria-label={
              plate === "night"
                ? "Switch to the day plate"
                : "Switch to the night plate"
            }
            className="ml-1 flex h-9 w-9 items-center justify-center border-[3px] border-[var(--color-ink)] text-[var(--color-ink)] sm:h-10 sm:w-10"
          >
            {plate === "night" ? (
              <SunHorizon size={19} weight="bold" />
            ) : (
              <MoonStars size={19} weight="bold" />
            )}
          </button>
        </nav>
      </div>
      <Chevron />
    </header>
  );
}
