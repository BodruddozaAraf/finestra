import { PieceRail } from "@/components/products/PieceRail";
import { getCatalogue } from "@/lib/sanity";

/** The homepage's cut of the shelf, on the shared rail. */
export async function ShelfRail() {
  const { pieces } = await getCatalogue();
  return (
    <PieceRail
      title="On the shelf this week"
      pieces={pieces.filter((p) => p.onShelf)}
    />
  );
}
