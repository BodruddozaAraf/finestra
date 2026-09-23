import Link from "next/link";
import { Chevron } from "@/components/ui/Plate";
import { CHANNEL_MARKS, CHANNELS } from "@/lib/contact";

export function FooterPlate() {
  return (
    <footer className="field-plate">
      <Chevron flip />

      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:px-7 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
        <div>
          <p className="hand text-[3.1rem] leading-[0.9]">Finestra</p>
          <p className="mt-3 max-w-[38ch] text-[0.95rem] leading-relaxed">
            Men&apos;s accessories out of Bangladesh since 2018. Rings,
            bracelets, pendants, and pieces for the characters you already
            care about.
          </p>
        </div>

        <nav className="flex flex-col items-start gap-3">
          <Link
            href="/products"
            className="banner text-[0.85rem] uppercase underline decoration-[3px] underline-offset-[6px]"
          >
            Shop the shelf
          </Link>
          <Link
            href="/products?line=anime"
            className="banner text-[0.85rem] uppercase underline decoration-[3px] underline-offset-[6px]"
          >
            Anime pieces
          </Link>
        </nav>

        {/* The only way out of the site, so it reads lib/contact.ts rather
            than writing its own URLs. */}
        <div className="flex flex-col items-start gap-3">
          {CHANNELS.map((c) => {
            const Mark = CHANNEL_MARKS[c.id];
            return (
              <a
                key={c.id}
                href={c.href}
                className="flex items-center gap-2 text-[0.95rem]"
              >
                <Mark size={22} weight="fill" />
                {c.handle || c.name}
              </a>
            );
          })}
        </div>
      </div>

      <div className="border-t-[3px] border-[var(--color-ink)] px-4 py-4 text-[0.78rem] sm:px-7">
        Design prototype. Products, prices, and photography on this site are
        placeholders.
      </div>
    </footer>
  );
}
