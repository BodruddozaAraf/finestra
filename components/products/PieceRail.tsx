"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { taka, type Product } from "@/lib/catalogue";

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
 * The piece list is rendered several times back to back and the rail rests
 * in the middle run, wrapping by exactly one run whenever it leaves it, so
 * there is nothing to see: a true loop, not a scroll that hits an end and
 * snaps back. Nothing stops it except a hand actually on the shelf: drag it
 * with a mouse, or swipe it on a phone, and it holds still exactly as long
 * as you're holding it.
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
  // How many back-to-back runs of the shelf are in the markup. Three is the
  // floor — the rail rests in the middle one, so there's a full run of room
  // to pan either way before a wrap. A screen wider than one run needs more.
  const [copies, setCopies] = useState(3);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || pieces.length === 0) return;

    function measure() {
      const items = rail!.children as HTMLCollectionOf<HTMLElement>;
      const period = items[pieces.length].offsetLeft - items[0].offsetLeft;
      if (period > 0) {
        setCopies(Math.max(3, 2 + Math.ceil(rail!.clientWidth / period)));
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pieces]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || pieces.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = 0;
    let holding = false;
    let touching = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;

    // One run of the shelf: from the first plate to its first repeat. Not
    // scrollWidth / copies — that would fold the rail's side padding into
    // the step and the wrap would visibly jump by the difference.
    function period() {
      const items = rail!.children as HTMLCollectionOf<HTMLElement>;
      return items[pieces.length].offsetLeft - items[0].offsetLeft;
    }

    // Keep the position inside the middle run, [P, 2P). Every run looks the
    // same, so moving by a whole P is invisible.
    function normalize(target: number) {
      const p = period();
      if (p <= 0) return target;
      const wrapped = (target - p) % p;
      return p + (wrapped < 0 ? wrapped + p : wrapped);
    }

    // The creep's position is kept here, not read back from scrollLeft each
    // frame: some browsers round scrollLeft to whole pixels, and at 120Hz a
    // sub-pixel step would round away to nothing every frame.
    let pos = normalize(rail.scrollLeft);
    rail.scrollLeft = pos;

    function tick(now: number) {
      const dt = now - last;
      last = now;
      if (!holding) {
        pos = normalize(pos + (CREEP_SPEED * dt) / 1000);
        rail!.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    }

    function hold() {
      holding = true;
      clearTimeout(resumeTimer);
    }

    function release() {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        holding = false;
        pos = normalize(rail!.scrollLeft);
        last = performance.now();
      }, RESUME_DELAY);
    }

    // ---- touch: the phone's own scroll does the panning ----
    // A hand-rolled drag on touch loses to the platform: a press that
    // lingers on a plate turns into iOS's link preview or Android's context
    // menu, which cancels the pointer stream mid-drag. Native horizontal
    // scrolling has none of that and brings momentum with it, so on touch
    // the rail only steps aside — it holds still from the first finger until
    // the fling has settled.
    function onTouchStart() {
      touching = true;
      hold();
    }

    function onTouchEnd() {
      touching = false;
      release();
    }

    // Momentum keeps scrolling after the finger lifts; every frame of it
    // pushes the resume back, so the creep picks up from where it landed.
    function onScroll() {
      if (holding && !touching && pointerId === null) release();
    }

    function suppressMenuWhileTouching(e: Event) {
      if (touching) e.preventDefault();
    }

    // ---- mouse: press, drag, release ----
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
      hold();
    }

    function onPointerMove(e: PointerEvent) {
      if (pointerId === null || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      if (!dragged && Math.abs(dx) > DRAG_THRESHOLD) {
        dragged = true;
        // Capture only once it's a drag: captured from the press, the
        // release lands on the rail rather than the plate, and a plain
        // click never reaches the piece link.
        try {
          rail!.setPointerCapture(e.pointerId);
        } catch {
          /* no active pointer to capture — the drag still tracks via the
             regular pointermove/pointerup listeners below */
        }
      }
      if (dragged) {
        e.preventDefault();
        const target = normalize(startScrollLeft - dx);
        // A wrap mid-drag moves the scroll position by a whole run; carry
        // the anchor with it so the next move doesn't jump back.
        startScrollLeft = target + dx;
        rail!.scrollLeft = target;
      }
    }

    function endHold(e: PointerEvent) {
      if (pointerId === null || e.pointerId !== pointerId) return;
      pointerId = null;
      release();
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

    rail.addEventListener("touchstart", onTouchStart, { passive: true });
    rail.addEventListener("touchend", onTouchEnd);
    rail.addEventListener("touchcancel", onTouchEnd);
    rail.addEventListener("scroll", onScroll, { passive: true });
    rail.addEventListener("contextmenu", suppressMenuWhileTouching);
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
      rail.removeEventListener("touchstart", onTouchStart);
      rail.removeEventListener("touchend", onTouchEnd);
      rail.removeEventListener("touchcancel", onTouchEnd);
      rail.removeEventListener("scroll", onScroll);
      rail.removeEventListener("contextmenu", suppressMenuWhileTouching);
      rail.removeEventListener("pointerdown", onPointerDown);
      rail.removeEventListener("pointermove", onPointerMove);
      rail.removeEventListener("pointerup", endHold);
      rail.removeEventListener("pointercancel", endHold);
      rail.removeEventListener("click", suppressClickAfterDrag, true);
    };
  }, [pieces, copies]);

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
          repeated — only the middle run, where the rail rests, is exposed
          to assistive tech and tab order — purely so the loop always has a
          seamless run on either side to wrap onto. Touch-action is left to
          the browser so a finger pans the rail natively; the callout is off
          so a lingering press on a plate doesn't open a link preview. */}
      <ul
        ref={railRef}
        className="mt-8 flex cursor-grab gap-5 overflow-x-auto pb-6 pl-[max(1rem,calc((100%-1400px)/2+1.75rem))] pr-4 select-none [-webkit-touch-callout:none] [scrollbar-width:thin] active:cursor-grabbing sm:pr-7"
      >
        {Array.from({ length: copies }, () => pieces).flat().map((p, i) => {
          const run = Math.floor(i / pieces.length);
          const dupe = run !== 1;
          const shot = p.image;
          return (
            <li
              key={`${p.id}-${run}`}
              aria-hidden={dupe || undefined}
              className="w-[74vw] shrink-0 sm:w-[320px] lg:w-[340px]"
            >
              <Link
                href={`/products/${p.id}`}
                tabIndex={dupe ? -1 : undefined}
                draggable={false}
                className="reg-plate reveals block border-[3px] border-[var(--hair)] bg-[var(--ground)]"
              >
                <div className="relative aspect-4/5 overflow-hidden border-b-[3px] border-[var(--hair)] bg-[var(--color-ink)]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 74vw, 340px"
                    className="printed-photo object-cover"
                    style={{ objectPosition: shot.position }}
                  />
                  <div aria-hidden className="photo-tint" />
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
