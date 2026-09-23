import { LozengeLink } from "@/components/ui/Lozenge";
import { CHANNEL_MARKS, PRIMARY, SECONDARY } from "@/lib/contact";

/**
 * The handoff, defined once.
 *
 * The site's job ends here: it has shown the piece, and the order is placed in
 * the shop's inbox. Instagram leads on the lozenge because that is where this
 * audience already is; WhatsApp and Facebook follow as marked links, in the
 * grammar the footer already uses.
 *
 * The copy claims nothing the brand has not supplied: no reply time, no
 * delivery time, no delivery charge, no payment method.
 */
export function ContactPlate({
  action = `Order on ${PRIMARY.name}`,
  note = "Send the shop the name of the piece and the size you want.",
  className = "",
}: {
  action?: string;
  note?: string;
  className?: string;
}) {
  const Lead = CHANNEL_MARKS[PRIMARY.id];

  return (
    <div className={className}>
      <LozengeLink
        href={PRIMARY.href}
        tone="field"
        className="w-full gap-2 px-6 py-4 text-[0.82rem]"
      >
        <Lead size={19} weight="fill" />
        {action}
      </LozengeLink>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        {SECONDARY.map((c) => {
          const Mark = CHANNEL_MARKS[c.id];
          return (
            <a
              key={c.id}
              href={c.href}
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
