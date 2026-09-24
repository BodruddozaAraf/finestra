"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { taka, type Product } from "@/lib/catalogue";
import { PRODUCT_SHOTS } from "@/lib/images";

/** Creep speed, in pixels per second. Fast enough to read as motion, still
 * short of a marquee. */
const CREEP_SPEED = 50;
/** How long the rail sits still after a hold is released before it starts
 * creeping again. Short — this rail never really stops. */
const RESUME_DELAY = 500;
/** Pointer travel, in pixels, before a hold counts as a drag rather than a
 * tap through to the piece page. */
const DRAG_THRESHOLD = 6;

/**
 * The shelf rail, defined once.
 *
 * One horizontal run of painted plates. Rank comes from cell count, so the
 * rail carries more pieces than a row of cards could without any plate
 * growing louder than its neighbour. The homepage uses it for the week's
 * shelf and a piece page uses it for the rest of the line; it is the same
 * family both times, which is why it lives in one file.
 *
 * The rail creeps sideways on its own, always — the shelf never sits still.
 * The piece list is rendered twice back to back so the creep can wrap from
 * the second copy to the first with nothing to see: a true loop, not a
 * scroll that hits an end and snaps back. Nothing stops it except a hand
 * actually on the shelf: press and drag to pan it yourself, and it holds
 * still exactly as long as you're holding it.
 */
export function PieceRail({
  title,
  pieces,
  className = "",
}: {
  title: string;
  pieces: Product[];
  className?: string;
}) {
  const railRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || pieces.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = 0;
    let holding = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;

    // The list is doubled in the markup below, so half the scroll width is
    // one full, undoubled run of the shelf — the exact step that wraps the
    // second copy back onto the first without a seam.
    function wrap() {
      const setWidth = rail!.scrollWidth / 2;
      if (setWidth > 0 && rail!.scrollLeft >= setWidth) {
        rail!.scrollLeft -= setWidth;
      }
    }

    // The browser clamps scrollLeft to 0 before a negative write ever lands,
    // so dragging backward past the start has nothing left to detect once
    // it's on screen — the wrap has to happen on the intended value, not on
    // whatever scrollLeft settled for after the fact.
    function normalize(target: number, setWidth: number) {
      if (setWidth <= 0) return target;
      const wrapped = target % setWidth;
      return wrapped < 0 ? wrapped + setWidth : wrapped;
    }

    function tick(now: number) {
      const dt = now - last;
      last = now;
      if (!holding) {
        rail!.scrollLeft += (CREEP_SPEED * dt) / 1000;
        wrap();
      }
      raf = requestAnimationFrame(tick);
    }

    // ---- press, drag, release: the one thing that holds the shelf still ----
    let pointerId: number | null = null;
    let startX = 0;
    let startScrollLeft = 0;
    let dragged = false;

    function onPointerDown(e: PointerEvent) {
      pointerId = e.pointerId;
      startX = e.clientX;
      startScrollLeft = rail!.scrollLeft;
      dragged = false;
      holding = true;
      clearTimeout(resumeTimer);
      // The pointer can already be gone by the time this runs (e.g. a very
      // quick tap); capture is an enhancement for tracking the drag past the
      // rail's own edges, not a requirement for the drag to work at all.
      try {
        rail!.setPointerCapture(e.pointerId);
      } catch {
        /* no active pointer to capture — the drag still tracks via the
           regular pointermove/pointerup listeners below */
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (pointerId === null || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      if (!dragged && Math.abs(dx) > DRAG_THRESHOLD) dragged = true;
      if (dragged) {
        e.preventDefault();
        const setWidth = rail!.scrollWidth / 2;
        rail!.scrollLeft = normalize(startScrollLeft - dx, setWidth);
      }
    }

    function endHold(e: PointerEvent) {
      if (pointerId === null || e.pointerId !== pointerId) return;
      pointerId = null;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        holding = false;
        last = performance.now();
      }, RESUME_DELAY);
    }

    // A drag that ended past the tap threshold shouldn't also fire the
    // piece link's click — the release is a scroll gesture, not a tap.
    function suppressClickAfterDrag(e: MouseEvent) {
      if (dragged) {
        e.preventDefault();
        e.stopPropagation();
        dragged = false;
      }
    }

    rail.addEventListener("pointerdown", onPointerDown);
    rail.addEventListener("pointermove", onPointerMove);
    rail.addEventListener("pointerup", endHold);
    rail.addEventListener("pointercancel", endHold);
    rail.addEventListener("click", suppressClickAfterDrag, true);

    last = performance.now();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resumeTimer);
      rail.removeEventListener("pointerdown", onPointerDown);
      rail.removeEventListener("pointermove", onPointerMove);
      rail.removeEventListener("pointerup", endHold);
      rail.removeEventListener("pointercancel", endHold);
      rail.removeEventListener("click", suppressClickAfterDrag, true);
    };
  }, [pieces]);

  if (pieces.length === 0) return null;

  return (
    <section
      className={`border-t-[3px] border-[var(--hair)] bg-[var(--ground)] py-14 sm:py-20 ${className}`}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-7">
        <h2 className="banner text-[1.9rem] leading-none tracking-[-0.02em] sm:text-[2.6rem]">
          {title}
        </h2>
      </div>

      {/* The rail starts on the container's gutter and runs off the right
          edge, so the shelf reads as longer than the screen. The list is
          doubled — second copy hidden from assistive tech and tab order —
          purely so the loop has a seamless second half to wrap onto. */}
      <ul
        ref={railRef}
        className="mt-8 flex cursor-grab touch-pan-y gap-5 overflow-x-auto pb-6 pl-[max(1rem,calc((100%-1400px)/2+1.75rem))] pr-4 select-none [scrollbar-width:thin] active:cursor-grabbing sm:pr-7"
      >
        {[...pieces, ...pieces].map((p, i) => {
          const dupe = i >= pieces.length;
          const shot = PRODUCT_SHOTS[p.id];
          return (
            <li
              key={`${p.id}-${dupe ? "b" : "a"}`}
              aria-hidden={dupe || undefined}
              className="w-[74vw] shrink-0 sm:w-[320px] lg:w-[340px]"
            >
              <Link
                href={`/products/${p.id}`}
                tabIndex={dupe ? -1 : undefined}
                draggable={false}
                className="reg-plate block border-[3px] border-[var(--hair)] bg-[var(--ground)]"
              >
                <div className="relative aspect-4/5 overflow-hidden border-b-[3px] border-[var(--hair)] bg-[var(--color-ink)]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 74vw, 340px"
                    className="printed-photo object-cover"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 mix-blend-multiply"
                    style={{
                      background: "var(--color-plate)",
                      opacity: "var(--photo-tint-strength)",
                    }}
                  />
                  {/* Sold out is a painted band, not a grey tint. */}
                  {p.soldOut && (
                    <p className="banner absolute top-1/2 w-[140%] -translate-x-[14%] -translate-y-1/2 -rotate-[7deg] border-y-[3px] border-[var(--color-plate)] bg-[var(--color-ink)] py-2 text-center text-[0.95rem] uppercase text-[var(--color-plate)]">
                      Sold out
                    </p>
                  )}
                </div>
                <div className="flex items-baseline justify-between gap-3 px-4 py-4">
                  <span className="banner text-[0.95rem] leading-tight">
                    {p.name}
                  </span>
                  <span className="shrink-0 text-[0.95rem] tabular-nums">
                    {taka(p.price)}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
