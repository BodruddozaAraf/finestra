import Link from "next/link";
import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";

/**
 * The ledger at the back of the stall. Ruled rows, one type size, everything
 * ranked by case and rule.
 */
export function Ledger() {
  return (
    <footer className="border-t border-[var(--mark)]">
      <div className="mx-auto grid max-w-[1560px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="chalk text-[2.4rem] leading-none">Finestra</p>
          <p className="note mt-2 max-w-[44ch]">
            Men&apos;s accessories out of Bangladesh since 2018. Rings,
            bracelets, pendants, and pieces for the characters you already care
            about.
          </p>
        </div>

        <nav className="flex flex-col items-start gap-2">
          <Link href="/proto-2/products" className="struck stencil-2 py-1">
            Everything
          </Link>
          <Link href="/proto-2/products?line=anime" className="struck stencil-2 py-1">
            Anime
          </Link>
        </nav>

        <div className="flex flex-col items-start gap-2">
          <a
            href="https://www.facebook.com/FinestraBangladesh"
            className="struck note flex items-center gap-2 py-1"
          >
            <FacebookLogo size={18} weight="fill" />
            Finestra Bangladesh
          </a>
          <a
            href="https://www.instagram.com/finestrabangladesh"
            className="struck note flex items-center gap-2 py-1"
          >
            <InstagramLogo size={18} weight="fill" />
            finestrabangladesh
          </a>
        </div>
      </div>

      <p className="note border-t border-[var(--mark)] px-4 py-3 sm:px-6">
        Design prototype. Products, prices, and photography on this site are
        placeholders.
      </p>
    </footer>
  );
}
