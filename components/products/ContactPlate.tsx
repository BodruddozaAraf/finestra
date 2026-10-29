import { LozengeLink } from "@/components/ui/Lozenge";
import { CHANNEL_MARKS, OUTBOUND, PRIMARY, SECONDARY } from "@/lib/contact";

/**
 * The handoff, defined once.
 *
 * The site's job ends here: it has shown the product, and the order is placed in
 * the shop's inbox. Instagram and WhatsApp sit side by side as equal lozenges,
 * Instagram first because that is where this audience already is; Facebook
 * follows as a marked link, in the grammar the footer already uses.
 *
 * The copy claims nothing the brand has not supplied: no reply time, no
 * delivery time, no delivery charge, no payment method.
 */
export function ContactPlate({
  action = "Order on",
  note = "Send the shop the name of the piece and the options you want.",
  className = "",
}: {
  action?: string;
  note?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="banner mb-3 text-[0.76rem] uppercase leading-none">
        {action}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {PRIMARY.map((c) => {
          const Mark = CHANNEL_MARKS[c.id];
          return (
            <LozengeLink
              key={c.id}
              href={c.href}
              tone="field"
              className="gap-1.5 px-2 py-4 text-[0.76rem] sm:gap-2 sm:text-[0.82rem]"
              {...OUTBOUND}
            >
              <Mark size={18} weight="fill" className="shrink-0" />
              {c.name}
            </LozengeLink>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        {SECONDARY.map((c) => {
          const Mark = CHANNEL_MARKS[c.id];
          return (
            <a
              key={c.id}
              href={c.href}
              {...OUTBOUND}
              className="banner flex items-center gap-2 text-[0.76rem] uppercase leading-none underline decoration-[3px] underline-offset-[6px]"
            >
              <Mark size={17} weight="fill" />
              {c.name}
            </a>
          );
        })}
      </div>

      <p className="mt-4 max-w-[40ch] text-[0.88rem] leading-relaxed opacity-75">
        {note}
      </p>
    </div>
  );
}
