import { ProductRail } from "@/components/products/ProductRail";
import { getCatalogue } from "@/lib/sanity";

/** The homepage's cut of the shelf, on the shared rail. */
export async function ShelfRail() {
  const { products } = await getCatalogue();
  return (
    <ProductRail
      title="On the shelf this week"
      products={products.filter((p) => p.onShelf)}
    />
  );
}
