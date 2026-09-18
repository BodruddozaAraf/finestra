import Image from "next/image";
import type { ReactNode } from "react";

/**
 * A crate. Yellow stock, slatted, with a keyline and a label wedged at the
 * front. The goods sit inside it, screened toward the stall's two values.
 *
 * This is the only container in the world. There are no cards.
 */
export function Crate({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={`crate-stock relative flex flex-col border border-[var(--color-ink)] ${className}`}
    >
      {children}
    </Tag>
  );
}

/** The goods inside a crate: photograph, slatted, tinted to the stock. */
export function Goods({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden bg-[var(--color-ink)]">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="goods object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{
          background: "var(--color-stock)",
          opacity: "var(--photo-tint)",
        }}
      />
      {/* The slats the goods sit behind. */}
      <div aria-hidden className="slats pointer-events-none absolute inset-0" />
    </div>
  );
}

/** The label wedged at the front of a crate. */
export function CrateLabel({ children }: { children: ReactNode }) {
  return (
    <div className="border-t border-[var(--color-ink)] px-3 py-2.5">
      {children}
    </div>
  );
}
