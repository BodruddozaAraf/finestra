import { LozengeLink } from "@/components/ui/Lozenge";
import { Chevron } from "@/components/ui/Plate";

/**
 * A missing piece still lands on the sign, not on the browser's own 404. This
 * is what notFound() from a piece page resolves to, and what an unmatched URL
 * gets as well.
 */
export default function NotFound() {
  return (
    <main className="field-plate">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-7 sm:py-24">
        <h1 className="banner max-w-[18ch] text-[2.1rem] leading-[0.95] tracking-[-0.025em] sm:text-[3.2rem]">
          Nothing at this address
        </h1>
        <p className="mt-5 max-w-[46ch] text-[1.02rem] leading-relaxed">
          The piece you were looking for is not on the shelf under that name.
          Try the shelf itself, or message the shop and ask.
        </p>
        <div className="mt-9">
          <LozengeLink
            href="/products"
            tone="ink"
            className="px-9 py-4 text-[0.9rem]"
          >
            Shop the shelf
          </LozengeLink>
        </div>
      </div>
      <Chevron />
    </main>
  );
}
