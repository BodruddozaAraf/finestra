import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";

/**
 * Controls are stamped the way a card's holder is: a hard black block, or a
 * foil block for the action that adds to the collection. Card radius, because
 * radius belongs to cards here and these read as small cut pieces.
 */
type Stamped = "foil" | "ink" | "outline";

const base =
  "plate inline-flex items-center justify-center gap-2 rounded-[var(--radius-card)] border border-[var(--color-ink)] px-5 py-2.5 text-[0.95rem] uppercase tracking-[0.06em] transition-[transform,box-shadow] duration-200 ease-[var(--ease-deal)] hover:-translate-y-[2px] active:translate-y-0";

const stamps: Record<Stamped, string> = {
  foil: "bg-[var(--color-foil)] text-[var(--color-ink)] lifted",
  ink: "bg-[var(--color-ink)] text-[var(--color-stock)] lifted",
  outline:
    "border-[var(--on-surface)] bg-transparent text-[var(--on-surface)]",
};

export function Stamp({
  children,
  stamp = "foil",
  className = "",
  ...rest
}: { children: ReactNode; stamp?: Stamped } & ComponentProps<"button">) {
  return (
    <button className={`${base} ${stamps[stamp]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function StampLink({
  children,
  href,
  stamp = "foil",
  className = "",
}: {
  children: ReactNode;
  href: string;
  stamp?: Stamped;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${stamps[stamp]} ${className}`}>
      {children}
    </Link>
  );
}
