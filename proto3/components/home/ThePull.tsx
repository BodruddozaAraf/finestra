"use client";

import Image from "next/image";
import { StampLink } from "@/proto3/components/ui/Stamp";
import { Pips, Callout, CardBack, useFoil } from "@/proto3/components/ui/Card";
import { CATALOGUE, taka } from "@/proto3/lib/catalogue";
import { PRODUCT_SHOTS } from "@/proto3/lib/images";

/**
 * The first viewport. One card held large and turned, with leader lines
 * running out from the piece to its label blocks, and the rest of the set
 * fanned behind it as backs.
 *
 * No headline block. The object is the opening.
 */
export function ThePull() {
  const hero = CATALOGUE.find((p) => p.id === "ring-signet")!;
  const shot = PRODUCT_SHOTS[hero.id];
  const foil = useFoil();

  return (
    <section className="border-b border-[var(--surface-line)]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-12 sm:px-7 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-14 lg:py-16">
        {/* The held card, with the fanned set behind it. */}
        <div className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:max-w-none">
          <CardBack className="fan-in absolute -left-9 top-9 hidden h-[82%] w-[72%] -rotate-[7deg] lg:block" />
          <CardBack className="fan-in absolute -right-9 top-12 hidden h-[78%] w-[68%] rotate-[8deg] lg:block" />

          <div
            ref={foil.ref}
            onPointerMove={foil.onPointerMove}
            onPointerLeave={foil.onPointerLeave}
            className="card-stock foil lifted-held deal-in relative z-2 overflow-hidden border border-[var(--color-ink)] lg:-rotate-[1.5deg]"
          >
            <div className="relative aspect-4/5 overflow-hidden border-b border-[var(--color-ink)] bg-[var(--color-ink)]">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                priority
                sizes="(max-width: 1024px) 88vw, 440px"
                className="object-cover grayscale contrast-[1.08]"
              />
              <span className="absolute left-2.5 top-2.5 z-2 rounded-[4px] bg-[var(--color-stock)] px-2 py-1">
                <Pips tier={hero.tier} label="Tier 2, solid 925 silver" />
              </span>
            </div>
            <div className="flex items-end justify-between gap-3 px-4 py-3.5">
              <div>
                <p className="plate text-[1.5rem]">{hero.name}</p>
                <p className="stat mt-1 text-[0.85rem] tracking-[0.06em]">
                  {hero.setCode}
                </p>
              </div>
              <p className="stat text-[1.15rem] font-semibold">
                {taka(hero.price)}
              </p>
            </div>
          </div>
        </div>

        {/* Callouts. Each one is attached to the piece by a leader line. */}
        <div>
          <p className="plate text-[2.1rem] leading-[0.98] sm:text-[2.9rem] lg:text-[3.4rem]">
            Every piece is a card.
            <br />
            Collect the set.
          </p>
          <p className="mt-4 max-w-[54ch] text-[1.02rem] leading-relaxed">
            Finestra makes men&apos;s accessories in Bangladesh. Rings,
            bracelets, pendants, and pieces for the characters you already care
            about, issued as one set you can work through.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Callout field="Material">{hero.material}</Callout>
            <Callout field="Sizes">{hero.variants.join(", ")}</Callout>
            <Callout field="Series">Everyday</Callout>
            <Callout field="Tier">Two pips, solid silver</Callout>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <StampLink href="/proto-3/products" stamp="foil">
              Open the set
            </StampLink>
            <p className="text-[0.95rem]">
              Eat your veggies and style up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
