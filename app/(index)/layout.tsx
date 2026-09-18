import type { Metadata } from "next";
import "./index.css";

export const metadata: Metadata = {
  title: "Finestra prototypes",
  description: "Three design concepts for Finestra Bangladesh.",
};

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
