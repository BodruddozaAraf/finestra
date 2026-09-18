import type { ReactNode } from "react";

/**
 * A plate is the structural unit of this world: a square panel held inside an
 * ink keyline, with the colour plate sitting behind it slightly out of
 * register. Everything on the page is a plate. Nothing is a card.
 */
export function Plate({
  children,
  className = "",
  as: Tag = "div",
  field = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "aside";
  field?: boolean;
}) {
  return (
    <Tag
      className={[
        "relative border-[3px] border-[var(--hair)]",
        field ? "field-plate" : "bg-[var(--ground)]",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}

/** The chevron banding that edges a rickshaw panel. */
export function Chevron({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`chevron-band h-[11px] w-full ${flip ? "rotate-180" : ""} ${className}`}
    />
  );
}

/** A row of painted florets, the panel's interior divider. */
export function Florets({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`screen-dots-coarse h-[11px] w-full opacity-70 ${className}`}
    />
  );
}
