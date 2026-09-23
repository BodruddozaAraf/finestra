import type { ReactNode } from "react";
import { BagProvider } from "@/components/products/BagProvider";

/**
 * Everything under /products shares one bag. This layout is what makes that
 * true: it is not remounted when the shelf hands off to a piece page, so the
 * rail at the foot of the screen keeps what was put in it.
 */
export default function ShopLayout({ children }: { children: ReactNode }) {
  return <BagProvider>{children}</BagProvider>;
}
