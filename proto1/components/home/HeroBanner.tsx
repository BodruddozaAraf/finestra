import Image from "next/image";
import { LozengeLink } from "@/proto1/components/ui/Lozenge";
import { Florets } from "@/proto1/components/ui/Plate";
import { HERO_PORTRAIT } from "@/proto1/lib/images";

/**
 * The painted banner plate. Yellow field, lettering left, photograph right
 * inside its own ink frame, breaking the panel's bottom edge the way a
 * cinema-banner portrait breaks its border.
 *
 * The load sequence is the page's one authored moment and runs in CSS, so the
 * finished composition is the default state and reduced motion simply keeps it.
 */
export function HeroBanner() {
  return (
    <section className="relative field-plate">
      <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-4 pt-10 pb-16 sm:px-7 md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:pt-14 md:pb-20">
        <div className="paint-in">
          <h1 className="banner text-[1.95rem] leading-[0.94] tracking-[-0.025em] sm:text-[2.9rem] md:text-[3.5rem] lg:text-[4.35rem]">
            <span className="block">Rings, chains,</span>
            <span className="block">and characters.</span>
          </h1>

          <div className="mt-5 max-w-[520px]">
            <svg
              viewBox="0 0 520 74"
              className="w-full"
              role="img"
              aria-label="Eat your veggies and style up"
            >
              <path
                id="ribbon"
                d="M8,54 C130,14 330,14 512,44"
                fill="none"
                stroke="none"
              />
              <text
                className="hand"
                fill="currentColor"
                fontSize="40"
                letterSpacing="0.5"
              >
                <textPath href="#ribbon" startOffset="2%">
                  Eat your veggies and style up
                </textPath>
              </text>
            </svg>
          </div>

          <p className="mt-4 max-w-[46ch] text-[1.02rem] leading-relaxed sm:text-[1.1rem]">
            Men&apos;s accessories out of Bangladesh. Classic pieces and anime
            pieces, on one shelf.
          </p>

          <div className="mt-8">
            <LozengeLink href="/proto-1/products" tone="ink" className="px-9 py-4 text-[0.9rem]">
              Shop the shelf
            </LozengeLink>
          </div>
        </div>

        <div className="relative z-10 md:self-end">
          <div className="portrait-drop relative mx-auto aspect-4/5 w-full max-w-[380px] border-[3px] border-[var(--color-ink)] bg-[var(--color-ink)] md:mb-[-140px] md:aspect-auto md:h-[min(66vh,600px)] md:max-w-none">
            <Image
              src={HERO_PORTRAIT.src}
              alt={HERO_PORTRAIT.alt}
              fill
              priority
              sizes="(max-width: 768px) 92vw, 42vw"
              className="printed-photo object-cover object-top"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-multiply"
              style={{
                background: "var(--color-plate)",
                opacity: "var(--photo-tint-strength)",
              }}
            />
          </div>
        </div>
      </div>

      <Florets className="absolute bottom-0 left-0" />
    </section>
  );
}
