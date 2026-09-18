import type { Metadata } from "next";
import { Archivo, Caveat } from "next/font/google";
import { Board } from "@/proto2/components/chrome/Board";
import { Ledger } from "@/proto2/components/chrome/Ledger";
import { Switcher, BAR_HEIGHT } from "@/showcase/Switcher";
import "@/proto2/styles.css";

/**
 * Root layout for prototype 2. Each concept owns its own root layout, so its
 * stylesheet, tokens, and utilities load only on its own routes and the three
 * worlds never collide.
 */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kacha Bazar | Finestra prototype 2",
  description:
    "Rings, bracelets, pendants, and anime pieces from Finestra Bangladesh. Eat your veggies and style up.",
};

const lampBoot = `(function(){try{var l=localStorage.getItem("finestra-lamp");if(l==="day"||l==="dusk"){document.documentElement.setAttribute("data-lamp",l)}}catch(e){}})();`;

export default function Proto2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh]" style={{ paddingTop: BAR_HEIGHT }}>
        <script dangerouslySetInnerHTML={{ __html: lampBoot }} />
        <Switcher />
        <Board />
        {children}
        <Ledger />
      </body>
    </html>
  );
}
