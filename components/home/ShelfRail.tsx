import { PieceRail } from "@/components/products/PieceRail";
import { CATALOGUE } from "@/lib/catalogue";

/** The homepage's cut of the shelf, on the shared rail. */
export function ShelfRail() {
  return (
    <PieceRail
      title="On the shelf this week"
      pieces={CATALOGUE.filter((p) => p.onShelf)}
    />
  );
}
