import { StampLink } from "@/proto3/components/ui/Stamp";

export function ClosingStamp() {
  return (
    <section>
      <div className="mx-auto max-w-[1600px] px-4 py-14 sm:px-7 sm:py-20">
        <p className="plate text-[2.6rem] leading-[0.96] sm:text-[3.8rem] lg:text-[4.8rem]">
          Visualize. Stylize. Execute.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <StampLink href="/proto-3/products" stamp="foil">
            Open the set
          </StampLink>
          <p className="max-w-[46ch] text-[0.97rem] leading-relaxed">
            Or message the shop on Facebook or Instagram, the way you always
            have.
          </p>
        </div>
      </div>
    </section>
  );
}
