import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";

/**
 * Two tones, each with a place.
 *
 * "ink" takes its colours from the surrounding token scope, so it is the black
 * plate on a yellow field and the page's own ink anywhere else. Use it on a
 * .field-plate.
 *
 * "field" is the yellow plate with black lettering, constant in both readings.
 * Use it on the page ground, where it stays legible whether the ground is tin
 * or ink.
 *
 * Both take their registration offset from the scope they sit in, so the
 * misregistered plate is always the one that shows.
 */

type Tone = "ink" | "field";

const base =
  "reg-plate banner inline-flex items-center justify-center whitespace-nowrap rounded-full border-[3px] border-[var(--hair)] px-6 py-3 text-[0.8rem] uppercase leading-none tracking-[0.02em]";

const tones: Record<Tone, string> = {
  ink: "bg-[var(--ink)] text-[var(--ground)]",
  field: "bg-[var(--color-plate)] text-[var(--color-ink)]",
};

export function Lozenge({
  children,
  tone = "ink",
  className = "",
  ...rest
}: { children: ReactNode; tone?: Tone } & ComponentProps<"button">) {
  return (
    <button className={`${base} ${tones[tone]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function LozengeLink({
  children,
  href,
  tone = "ink",
  className = "",
}: {
  children: ReactNode;
  href: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${tones[tone]} ${className}`}>
      {children}
    </Link>
  );
}
