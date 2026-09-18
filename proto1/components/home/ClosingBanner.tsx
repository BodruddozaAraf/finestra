import { LozengeLink } from "@/proto1/components/ui/Lozenge";
import { Chevron } from "@/proto1/components/ui/Plate";

/**
 * The closing plate. Same banner grammar as the hero, inverted in weight
 * rather than in theme, and carrying the brand statement as painted lettering
 * across the board.
 */
export function ClosingBanner() {
  return (
    <section className="field-plate">
      <Chevron />
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-7 sm:py-24">
        <p className="banner text-[2.1rem] leading-[0.95] tracking-[-0.025em] sm:text-[3.4rem] md:text-[4.4rem]">
          Visualize.
          <br />
          Stylize.
          <br />
          Execute.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-5">
          <LozengeLink href="/proto-1/products" tone="ink" className="px-9 py-4 text-[0.9rem]">
            Shop the shelf
          </LozengeLink>
          <p className="max-w-[34ch] text-[0.95rem] leading-relaxed">
            Prefer to order the way you always have? Message the shop on
            Facebook or Instagram.
          </p>
        </div>
      </div>
    </section>
  );
}
