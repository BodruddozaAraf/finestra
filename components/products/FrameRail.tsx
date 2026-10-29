"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { Photo } from "@/lib/catalogue";

/** Pointer travel, in pixels, before a press counts as a drag rather than a
 * click on a frame. */
const DRAG_THRESHOLD = 6;

/**
 * The frame rail under the product photo. The chosen frame is marked with an
 * ink underscore, the same mark the nav uses for the current route.
 *
 * When the frames run past the column it scrolls three ways: a finger swipes
 * it natively, a mouse can hold and drag it, and the arrow buttons at either
 * end step it along by most of a view. The arrows only appear when there is
 * something to scroll to, and each greys out at its end.
 */
export function FrameRail({
  frames,
  frame,
  onSelect,
}: {
  frames: Photo[];
  frame: number;
  onSelect: (i: number) => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    function update() {
      const max = rail!.scrollWidth - rail!.clientWidth;
      setOverflows(max > 1);
      setAtStart(rail!.scrollLeft <= 1);
      setAtEnd(rail!.scrollLeft >= max - 1);
    }
    update();

    // ---- mouse: press, drag, release ----
    // Touch is left to the browser's own scrolling, which brings momentum.
    let pointerId: number | null = null;
    let startX = 0;
    let startScrollLeft = 0;
    let dragged = false;

    function onPointerDown(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      pointerId = e.pointerId;
      startX = e.clientX;
      startScrollLeft = rail!.scrollLeft;
      dragged = false;
    }

    function onPointerMove(e: PointerEvent) {
      if (pointerId === null || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      if (!dragged && Math.abs(dx) > DRAG_THRESHOLD) {
        dragged = true;
        // Captured only once it's a drag, so a plain click still lands on
        // the frame under the pointer.
        try {
          rail!.setPointerCapture(e.pointerId);
        } catch {
          /* the pointer is already gone; the drag still tracks */
        }
      }
      if (dragged) {
        e.preventDefault();
        rail!.scrollLeft = startScrollLeft - dx;
      }
    }

    function endDrag(e: PointerEvent) {
      if (pointerId === null || e.pointerId !== pointerId) return;
      pointerId = null;
    }

    // The release that ends a drag is not also a click on a frame.
    function suppressClickAfterDrag(e: MouseEvent) {
      if (dragged) {
        e.preventDefault();
        e.stopPropagation();
        dragged = false;
      }
    }

    const resize = new ResizeObserver(update);
    resize.observe(rail);
    rail.addEventListener("scroll", update, { passive: true });
    rail.addEventListener("pointerdown", onPointerDown);
    rail.addEventListener("pointermove", onPointerMove);
    rail.addEventListener("pointerup", endDrag);
    rail.addEventListener("pointercancel", endDrag);
    rail.addEventListener("click", suppressClickAfterDrag, true);

    return () => {
      resize.disconnect();
      rail.removeEventListener("scroll", update);
      rail.removeEventListener("pointerdown", onPointerDown);
      rail.removeEventListener("pointermove", onPointerMove);
      rail.removeEventListener("pointerup", endDrag);
      rail.removeEventListener("pointercancel", endDrag);
      rail.removeEventListener("click", suppressClickAfterDrag, true);
    };
  }, [frames]);

  function step(direction: 1 | -1) {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.8, behavior: "smooth" });
  }

  const arrow =
    "grid size-10 shrink-0 place-items-center border-[3px] border-[var(--hair)] disabled:opacity-30";

  return (
    <div className="flex items-center gap-2 border-t-[3px] border-[var(--hair)] px-3 py-4 sm:gap-3 sm:px-4">
      {overflows && (
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label="Earlier photos"
          className={arrow}
        >
          <CaretLeft size={16} weight="bold" />
        </button>
      )}

      <div
        ref={railRef}
        className={`flex min-w-0 flex-1 gap-3 overflow-x-auto select-none [scrollbar-width:none] ${overflows ? "cursor-grab active:cursor-grabbing" : ""}`}
      >
        {frames.map((f, i) => {
          const on = i === frame;
          return (
            <button
              key={`${i}-${f.src}`}
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={on}
              aria-label={`Frame ${i + 1} of ${frames.length}: ${f.alt}`}
              className="block w-[76px] shrink-0 sm:w-[92px]"
            >
              <span className="relative block aspect-square overflow-hidden border-[3px] border-[var(--hair)] bg-[var(--color-ink)]">
                <Image
                  src={f.src}
                  alt=""
                  fill
                  draggable={false}
                  sizes="92px"
                  className={`object-cover ${on ? "" : "opacity-55"}`}
                  style={{ objectPosition: f.position }}
                />
              </span>
              <span
                aria-hidden
                className={`mt-[6px] block h-[5px] ${on ? "bg-[var(--ink)]" : "bg-transparent"}`}
              />
            </button>
          );
        })}
      </div>

      {overflows && (
        <button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label="Later photos"
          className={arrow}
        >
          <CaretRight size={16} weight="bold" />
        </button>
      )}
    </div>
  );
}
