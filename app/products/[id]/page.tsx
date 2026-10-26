import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { ProductBroadside } from "@/components/products/ProductBroadside";
import { PieceRail } from "@/components/products/PieceRail";
import { Chevron } from "@/components/ui/Plate";
import { alongside } from "@/lib/catalogue";
import { getCatalogue, getPiece } from "@/lib/sanity";

/**
 * Every piece published at build time is prerendered. One published later
 * renders on its first visit and is cached from then on, so a new piece never
 * waits for a redeploy.
 */
export async function generateStaticParams() {
  const { pieces } = await getCatalogue();
  return pieces.map((p) => ({ id: p.id }));
}

export async function generateMetadata(
  props: PageProps<"/products/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const product = await getPiece(id);
  if (!product) return { title: "Piece not found | Finestra" };

  return {
    title: `${product.name} | Finestra`,
    description: `${product.story} ${product.material}. Placeholder piece in the Finestra Bangladesh prototype.`,
  };
}

export default async function PiecePage(props: PageProps<"/products/[id]">) {
  const { id } = await props.params;
  const { pieces } = await getCatalogue();
  const product = pieces.find((p) => p.id === id);
  if (!product) notFound();

  const rest = alongside(product, pieces);

  return (
    <main>
      {/* The route strip. Navigation only: the piece's name is the page's h1,
          down in the broadside, so nothing up here is an eyebrow for it. */}
      <section className="field-plate">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 sm:px-7">
          <Link
            href="/products"
            className="banner flex items-center gap-2 text-[0.76rem] uppercase leading-none underline decoration-[3px] underline-offset-[6px]"
          >
            <CaretLeft size={13} weight="bold" />
            The whole shelf
          </Link>
          <Link
            href={`/products?line=${product.line}`}
            className="banner text-[0.76rem] uppercase leading-none underline decoration-[3px] underline-offset-[6px]"
          >
            {product.lineLabel}
          </Link>
        </div>
        <Chevron />
      </section>

      {/* The prototype says what it is, rather than dressing an invented price
          as fact. */}
      <p className="mx-auto max-w-[1400px] px-4 pt-5 text-[0.88rem] leading-relaxed sm:px-7">
        <strong className="font-semibold">Sample stock.</strong> This piece, its
        price, and its photographs are placeholders for this design prototype,
        not real Finestra stock.
      </p>

      <ProductBroadside product={product} />

      <PieceRail
        title={`The rest of the ${product.lineLabel.toLowerCase()}`}
        pieces={rest}
      />

      <section className="field-plate">
        <Chevron />
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-7 sm:py-16">
          <h2 className="banner max-w-[20ch] text-[1.7rem] leading-[0.98] tracking-[-0.02em] sm:text-[2.4rem]">
            How to order
          </h2>
          <div className="mt-7 grid max-w-[80ch] gap-5 text-[1rem] leading-relaxed sm:grid-cols-2 sm:gap-10">
            <p>
              Nothing is bought or paid for on this site. It shows the range;
              the order itself happens in a message to the shop.
            </p>
            <p>
              Instagram, WhatsApp, or Facebook, whichever you already use. Send
              the name of the piece and the size you want.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
