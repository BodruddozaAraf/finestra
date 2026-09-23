"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BagRail, type BagLine } from "./BagRail";
import type { Product } from "@/lib/catalogue";

/**
 * The bag belongs to the shop, not to one page.
 *
 * It lives here so the shelf and a piece page write to the same bag: this
 * provider is mounted by app/products/layout.tsx, which survives navigation
 * between the two routes, so a piece added on one is still in the rail on the
 * other. Nothing is persisted beyond the visit, because there is no order
 * backend to persist it to.
 */

type Bag = {
  add: (product: Product, variant: string, qty?: number) => void;
};

const BagContext = createContext<Bag | null>(null);

export function useBag() {
  const bag = useContext(BagContext);
  if (!bag) throw new Error("useBag must be used inside a BagProvider");
  return bag;
}

export function BagProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<BagLine[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  const add = useCallback((product: Product, variant: string, qty = 1) => {
    const key = product.id + "--" + variant;
    setNotice(null);
    setLines((prev) => {
      const at = prev.findIndex((l) => l.key === key);
      if (at > -1) {
        const next = [...prev];
        next[at] = { ...next[at], qty: next[at].qty + qty };
        return next;
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          variant,
          price: product.price,
          qty,
        },
      ];
    });
  }, []);

  const remove = useCallback((key: string) => {
    setNotice(null);
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const checkout = useCallback(() => {
    setNotice(
      "Checkout is not connected in this prototype. On the live site this is where payment and delivery details go.",
    );
  }, []);

  const api = useMemo<Bag>(() => ({ add }), [add]);

  return (
    <BagContext.Provider value={api}>
      {children}

      {/* Clears the pinned rail so the last row is never trapped under it. */}
      <div aria-hidden className="h-[150px] lg:h-[120px]" />

      <BagRail
        lines={lines}
        onRemove={remove}
        onCheckout={checkout}
        notice={notice}
      />
    </BagContext.Provider>
  );
}
