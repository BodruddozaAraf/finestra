"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Review chrome, not part of any prototype's design.
 *
 * It is deliberately neutral: system type, no brand colour, no personality of
 * its own, so it never competes with the concept underneath it. It pins to the
 * top at a fixed 46px, which is the offset every prototype's own sticky header
 * is shifted by.
 */

const PROTOS = [
  { slug: "proto-1", n: "1", name: "Rickshaw Cinema" },
  { slug: "proto-2", n: "2", name: "Kacha Bazar" },
  { slug: "proto-3", n: "3", name: "The Set" },
];

export const BAR_HEIGHT = 46;

export function Switcher() {
  const pathname = usePathname();
  const active = PROTOS.find((p) => pathname.startsWith(`/${p.slug}`));
  const onProducts = pathname.endsWith("/products");
  const current = active?.slug ?? "proto-1";

  return (
    <div
      style={{ height: BAR_HEIGHT }}
      className="fixed inset-x-0 top-0 z-[100] flex items-center gap-1 border-b border-neutral-700 bg-neutral-900 px-2 font-sans text-[13px] text-neutral-300 sm:gap-2 sm:px-4"
    >
      <Link
        href="/"
        className="hidden shrink-0 rounded px-2 py-1 text-neutral-400 hover:bg-neutral-800 hover:text-white sm:block"
      >
        Finestra prototypes
      </Link>

      <span aria-hidden className="hidden h-4 w-px shrink-0 bg-neutral-700 sm:block" />

      {/* Keep whichever page you are on when switching concepts, so the same
          surface can be compared side by side. */}
      <nav className="flex min-w-0 items-center gap-1">
        {PROTOS.map((p) => {
          const on = active?.slug === p.slug;
          return (
            <Link
              key={p.slug}
              href={`/${p.slug}${onProducts ? "/products" : ""}`}
              aria-current={on ? "page" : undefined}
              className={[
                "shrink-0 rounded px-2 py-1 sm:px-2.5",
                on
                  ? "bg-white font-medium text-neutral-900"
                  : "hover:bg-neutral-800 hover:text-white",
              ].join(" ")}
            >
              <span className="sm:hidden">{p.n}</span>
              <span className="hidden sm:inline">
                {p.n}. {p.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <span aria-hidden className="h-4 w-px shrink-0 bg-neutral-700" />

      <nav className="flex shrink-0 items-center gap-1">
        <Link
          href={`/${current}`}
          aria-current={!onProducts ? "page" : undefined}
          className={[
            "rounded px-2 py-1",
            !onProducts
              ? "bg-neutral-700 text-white"
              : "hover:bg-neutral-800 hover:text-white",
          ].join(" ")}
        >
          Home
        </Link>
        <Link
          href={`/${current}/products`}
          aria-current={onProducts ? "page" : undefined}
          className={[
            "rounded px-2 py-1",
            onProducts
              ? "bg-neutral-700 text-white"
              : "hover:bg-neutral-800 hover:text-white",
          ].join(" ")}
        >
          Products
        </Link>
      </nav>
    </div>
  );
}
