import { ActionLink } from "@/proto2/components/ui/Action";

/**
 * The closing board. The brand statement chalked across the stall, the way
 * in repeated under the same label it carries everywhere else, and the note
 * that the shop still answers a message.
 */
export function ClosingBoard() {
  return (
    <section className="border-t border-[var(--mark)]">
      <div className="mx-auto max-w-[1560px] px-4 py-12 sm:px-6 sm:py-20">
        <p className="chalk text-[2.8rem] leading-[1.02] sm:text-[4rem] lg:text-[5rem]">
          Visualize. Stylize. Execute.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <ActionLink href="/proto-2/products" rank="stock">
            Open the stall
          </ActionLink>
          <p className="note max-w-[52ch]">
            Or message the shop on Facebook or Instagram, the way you always
            have.
          </p>
        </div>
      </div>
    </section>
  );
}
