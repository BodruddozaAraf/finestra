import Link from "next/link";
import { Crate, Goods, CrateLabel } from "@/proto2/components/ui/Crate";
import { CATALOGUE, SPAN_CLASS, taka, type Product } from "@/proto2/lib/catalogue";
import { PRODUCT_SHOTS } from "@/proto2/lib/images";

/**
 * The wall. One continuous run of crates from edge to edge, with signs
 * hanging across it to name regions. That is the brand's position made
 * structural: everyday pieces and character pieces are stacked on the same
 * wall under two signs, not split into two shops sharing a logo.
 *
 * Crates span whole module cells and the flow packs densely, the way a stall
 * is actually stacked. The region runs are sized to fill their rows.
 */

const EVERYDAY = [
  "ring-signet",
  "pend-cuban-set",
  "brac-cuban",
  "pend-anchor",
  "ring-band-trio",
  "ring-obsidian",
  "brac-shackle",
  "ring-plain-steel",
  "brac-beaded",
];

const CHARACTER = [
  "anime-keyring",
  "anime-acrylic",
  "anime-charm",
  "anime-stand",
  "anime-figure",
];

const pick = (ids: string[]) =>
  ids
    .map((id) => CATALOGUE.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

function Sign({ name, note }: { name: string; note: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-y border-[var(--mark)] bg-[var(--mark)] px-4 py-2 text-[var(--board)] sm:px-6">
      <span className="stencil">{name}</span>
      <span className="note">{note}</span>
    </div>
  );
}

function WallCrate({ product, eager }: { product: Product; eager: boolean }) {
  const shot = PRODUCT_SHOTS[product.id];
  return (
    <Crate as="li" className={SPAN_CLASS[product.span]}>
      <Link
        href={`/proto-2/products?line=${product.line}`}
        className="flex h-full min-h-0 flex-col"
      >
        <Goods
          src={shot.src}
          alt={shot.alt}
          priority={eager}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw"
        />
        <CrateLabel>
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <span className="stencil">{product.name}</span>
            <span className="figure shrink-0">{taka(product.price)}</span>
          </div>
          {product.soldOut ? (
            <p className="stencil-2 mt-1.5 inline-block bg-[var(--color-ink)] px-1.5 py-0.5 text-[var(--color-stock)]">
              Sold out
            </p>
          ) : null}
        </CrateLabel>
      </Link>
    </Crate>
  );
}

function Run({ products, eager }: { products: Product[]; eager: boolean }) {
  return (
    <ul
      className="grid grid-cols-2 [grid-auto-flow:row_dense] md:grid-cols-4 lg:grid-cols-6"
      style={{ gridAutoRows: "var(--module)" }}
    >
      {products.map((p, i) => (
        <WallCrate key={p.id} product={p} eager={eager && i < 4} />
      ))}
    </ul>
  );
}

export function StallWall() {
  return (
    <section>
      <Sign name="Everyday" note="Worn without thinking about it." />
      <Run products={pick(EVERYDAY)} eager />
      <Sign name="Character" note="For the series you actually watch." />
      <Run products={pick(CHARACTER)} eager={false} />
    </section>
  );
}
