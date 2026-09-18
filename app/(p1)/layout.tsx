import type { Metadata } from "next";
import { Bungee, Yellowtail, Bricolage_Grotesque } from "next/font/google";
import { SignBoard } from "@/proto1/components/chrome/SignBoard";
import { FooterPlate } from "@/proto1/components/chrome/FooterPlate";
import { Switcher, BAR_HEIGHT } from "@/showcase/Switcher";
import "@/proto1/styles.css";

/**
 * Root layout for prototype 1. Each concept owns its own root layout, so its
 * stylesheet, tokens, and utilities load only on its own routes and the three
 * worlds never collide.
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
  title: "Rickshaw Cinema | Finestra prototype 1",
  description:
    "Rings, bracelets, pendants, and anime pieces from Finestra Bangladesh. Eat your veggies and style up.",
};

const themeBoot = `(function(){try{var t=localStorage.getItem("finestra-plate");if(t==="day"||t==="night"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`;

export default function Proto1Layout({
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
      <body className="min-h-[100dvh]" style={{ paddingTop: BAR_HEIGHT }}>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <Switcher />
        <SignBoard />
        {children}
        <FooterPlate />
      </body>
    </html>
  );
}
