import type { Metadata } from "next";
import { Bungee, Yellowtail, Bricolage_Grotesque } from "next/font/google";
import { SignBoard } from "@/components/chrome/SignBoard";
import { FooterPlate } from "@/components/chrome/FooterPlate";
import "./globals.css";

/**
 * Type stands in for the licensed brand faces. Gellatio (logo) and Brittany
 * (tagline, statement) are commercial and not on hand, so the script role is
 * held by Yellowtail behind --font-script. Repointing that one variable to the
 * licensed files swaps the brand voice without touching a component.
 */
const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee",
  display: "swap",
});

const yellowtail = Yellowtail({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yellowtail",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Finestra | Men's accessories, Bangladesh",
  description:
    "Rings, bracelets, pendants, and anime pieces from Finestra Bangladesh. Eat your veggies and style up.",
};

/** Sets the painted plate before first paint so the sign never flashes. */
const themeBoot = `(function(){try{var t=localStorage.getItem("finestra-plate");if(t==="day"||t==="night"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bungee.variable} ${yellowtail.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh]">
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <SignBoard />
        {children}
        <FooterPlate />
      </body>
    </html>
  );
}
