"use client";

import Image from "next/image";
import { useCallback, useRef, type PointerEvent, type ReactNode } from "react";
import { taka, type Product, type Tier } from "@/proto3/lib/catalogue";
import { PRODUCT_SHOTS } from "@/proto3/lib/images";

/**
 * The tier pips. A declared ramp, published in a legend on the page, derived
 * from material. Never a scarcity claim.
 */
export function Pips({ tier, label }: { tier: Tier; label: string }) {
  return (
    <span className="flex items-center gap-[3px]" title={label}>
      <span className="sr-only">{label}</span>
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          aria-hidden
          className={[
            "block h-[7px] w-[7px] rotate-45 border border-[var(--color-ink)]",
            n <= tier ? "bg-[var(--color-foil)]" : "bg-transparent",
          ].join(" ")}
        />
      ))}
    </span>
  );
}

/**
 * Foil tracking. The sheen position is written straight to the element as CSS
 * custom properties on pointer move, so continuous pointer values never enter
 * React state and nothing re-renders.
 */
export function useFoil() {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = useCallback((e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--fx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--fy", `${((e.clientY - r.top) / r.height) * 100}%`);
  }, []);

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty("--fx");
    el.style.removeProperty("--fy");
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}

/**
 * A card in the spread. The whole set stays present, so an unselected card is
 * never removed or hidden; it simply sits back.
 */
export function SetCard({
  product,
  held = false,
  onPick,
  priority = false,
  sizes = "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px",
}: {
  product: Product;
  held?: boolean;
  onPick?: (id: string) => void;
  priority?: boolean;
  sizes?: string;
}) {
  const foil = useFoil();
  const shot = PRODUCT_SHOTS[product.id];
  const Tag = onPick ? "button" : "div";
  // In the binder one card is held and the rest sit back. Hovering brings a
  // card forward, so the set is never dimmed out of reach.
  const recedes = Boolean(onPick) && !held;

  return (
    <Tag
      {...(onPick
        ? { type: "button" as const, onClick: () => onPick(product.id) }
        : {})}
      aria-pressed={onPick ? held : undefined}
      onPointerMove={foil.onPointerMove}
      onPointerLeave={foil.onPointerLeave}
      className={[
        "card-stock foil pickable group block w-full overflow-hidden border border-[var(--color-ink)] text-left",
        held ? "lifted-held" : "lifted",
        recedes ? "opacity-[0.72] hover:opacity-100 focus-visible:opacity-100" : "",
      ].join(" ")}
      data-held={held ? "true" : undefined}
      ref={foil.ref as never}
    >
      <div className="relative aspect-4/5 overflow-hidden border-b border-[var(--color-ink)] bg-[var(--color-ink)]">
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          priority={priority}
          sizes={sizes}
          className={[
            "object-cover grayscale contrast-[1.08] transition-[filter] duration-200",
            recedes ? "brightness-[0.82] group-hover:brightness-100" : "",
          ].join(" ")}
        />
        <span className="absolute left-1.5 top-1.5 z-2 rounded-[3px] bg-[var(--color-stock)] px-1.5 py-[3px]">
          <Pips tier={product.tier} label={`Tier ${product.tier}`} />
        </span>
        {product.soldOut ? (
          <span className="field absolute bottom-0 left-0 right-0 z-2 bg-[var(--color-ink)] px-2 py-1 text-center text-[var(--color-stock)]">
            Sold out
          </span>
        ) : null}
      </div>

      <div className="px-2.5 pb-2.5 pt-2">
        <p className="plate text-[0.95rem]">{product.name}</p>
        <p className="mt-1 flex items-baseline justify-between gap-2">
          <span className="stat text-[0.82rem] tracking-[0.06em]">
            {product.setCode}
          </span>
          <span className="stat text-[0.9rem] font-semibold">
            {taka(product.price)}
          </span>
        </p>
      </div>
    </Tag>
  );
}

/** A blank card back, used for the fanned ghosts behind the held card. */
export function CardBack({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`card-stock lifted flex items-center justify-center border border-[var(--color-ink)] p-4 ${className}`}
    >
      <div className="h-[46%] w-full rounded-[4px] border border-[var(--color-ink)] bg-[var(--color-foil)]" />
    </div>
  );
}

/** A framed label block at the end of a leader line. */
export function Callout({
  field,
  children,
}: {
  field: string;
  children: ReactNode;
}) {
  return (
    <div className="leader">
      <p className="field">{field}</p>
      <p className="mt-0.5 text-[0.95rem] leading-snug">{children}</p>
    </div>
  );
}
