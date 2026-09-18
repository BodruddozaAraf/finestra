import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";

/**
 * Controls rank by fill and rule, never by size, because everything on this
 * page is set at the one type size.
 *
 * "stock" is the top rank on the board and carries the crate stock, so the
 * action that opens the stall is the same yellow as the goods. "reversed" is
 * the top rank inside a crate, where a yellow fill would vanish into yellow
 * stock. "ruled" is a keyline only. All three take the chalk stroke, which is
 * the page's single press rule.
 */
type Rank = "stock" | "reversed" | "ruled";

const base =
  "struck stencil-2 inline-flex items-center justify-center gap-2 border border-[var(--mark)] px-4 py-2.5 text-left";

const ranks: Record<Rank, string> = {
  stock: "crate-stock border-[var(--color-ink)]",
  reversed: "bg-[var(--mark)] text-[var(--board)]",
  ruled: "bg-transparent text-[var(--mark)]",
};

export function Action({
  children,
  rank = "ruled",
  className = "",
  ...rest
}: { children: ReactNode; rank?: Rank } & ComponentProps<"button">) {
  return (
    <button className={`${base} ${ranks[rank]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ActionLink({
  children,
  href,
  rank = "ruled",
  className = "",
}: {
  children: ReactNode;
  href: string;
  rank?: Rank;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${ranks[rank]} ${className}`}>
      {children}
    </Link>
  );
}
