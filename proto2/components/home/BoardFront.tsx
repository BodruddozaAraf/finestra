import { ActionLink } from "@/proto2/components/ui/Action";

/**
 * The stall is already open when you arrive, so this is a board and not a
 * hero. It states who is selling, chalks the line the brand sells under, and
 * points at the way in. The crate wall starts immediately underneath, which
 * is the point: the goods are visible before any scroll.
 */
export function BoardFront() {
  return (
    <section className="border-b border-[var(--mark)]">
      <div className="mx-auto grid max-w-[1560px] gap-6 px-4 py-9 sm:px-6 sm:py-11 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-14">
        <div>
          <p className="chalk write-on text-[2.6rem] leading-[1.05] sm:text-[3.6rem] lg:text-[4.4rem]">
            Eat your veggies and style up
          </p>
          <p className="note mt-4 max-w-[62ch]">
            Men&apos;s accessories out of Bangladesh since 2018. Rings,
            bracelets, pendants, and pieces for the characters you already care
            about, all on one wall and all priced on the board.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:justify-end lg:pb-2">
          <ActionLink href="/proto-2/products" rank="stock">
            Open the stall
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
