import Link from "next/link";
import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";

/** The set's colophon: who printed it and where to find them. */
export function Colophon() {
  return (
    <footer className="border-t border-[var(--surface-line)]">
      <div className="mx-auto grid max-w-[1600px] gap-8 px-4 py-11 sm:px-7 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="plate inline-block rounded-[6px] bg-[var(--color-foil)] px-2.5 py-1 text-[1.15rem] uppercase tracking-[0.1em] text-[var(--color-ink)]">
            Finestra
          </p>
          <p className="mt-3 max-w-[44ch] text-[0.97rem] leading-relaxed">
            Men&apos;s accessories out of Bangladesh since 2018. Rings,
            bracelets, pendants, and pieces for the characters you already care
            about.
          </p>
        </div>

        <nav className="flex flex-col items-start gap-2">
          <Link href="/proto-3/products" className="field py-1">
            All cards
          </Link>
          <Link href="/proto-3/products?line=anime" className="field py-1">
            Character series
          </Link>
        </nav>

        <div className="flex flex-col items-start gap-2">
          <a
            href="https://www.facebook.com/FinestraBangladesh"
            className="flex items-center gap-2 py-1 text-[0.97rem]"
          >
            <FacebookLogo size={19} weight="fill" />
            Finestra Bangladesh
          </a>
          <a
            href="https://www.instagram.com/finestrabangladesh"
            className="flex items-center gap-2 py-1 text-[0.97rem]"
          >
            <InstagramLogo size={19} weight="fill" />
            finestrabangladesh
          </a>
        </div>
      </div>

      <p className="border-t border-[var(--surface-line)] px-4 py-3.5 text-[0.9rem] sm:px-7">
        Design prototype. Products, prices, and photography on this site are
        placeholders.
      </p>
    </footer>
  );
}
