import type { Metadata } from "next";
import { Big_Shoulders, Barlow } from "next/font/google";
import { SetHeader } from "@/proto3/components/chrome/SetHeader";
import { Colophon } from "@/proto3/components/chrome/Colophon";
import { Switcher, BAR_HEIGHT } from "@/showcase/Switcher";
import "@/proto3/styles.css";

/**
 * Root layout for prototype 3. Each concept owns its own root layout, so its
 * stylesheet, tokens, and utilities load only on its own routes and the three
 * worlds never collide.
 */
const shoulders = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-shoulders",
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Set | Finestra prototype 3",
  description:
    "Rings, bracelets, pendants, and anime pieces from Finestra Bangladesh. Eat your veggies and style up.",
};

const matBoot = `(function(){try{var m=localStorage.getItem("finestra-mat");if(m==="page"||m==="playmat"){document.documentElement.setAttribute("data-mat",m)}}catch(e){}})();`;

export default function Proto3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${shoulders.variable} ${barlow.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh]" style={{ paddingTop: BAR_HEIGHT }}>
        <script dangerouslySetInnerHTML={{ __html: matBoot }} />
        <Switcher />
        <SetHeader />
        {children}
        <Colophon />
      </body>
    </html>
  );
}
