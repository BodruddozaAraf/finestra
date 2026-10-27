import Image from "next/image";
import Link from "next/link";
import { taka, type Product } from "@/lib/catalogue";

/**
 * A plate on the shelf. It shows the product and opens it; it does not take an
 * order. Sizes and the way to the shop live on the product page, so
 * the grid stays quiet enough to scan twenty-one of these on a phone.
 */
export function ProductPlate({ product }: { product: Product }) {
  const shot = product.image;

  return (
    <article className="reveals flex h-full flex-col border-[3px] border-[var(--hair)] bg-[var(--ground)]">
      {/* The photo plate opens the product, because a thumb on a phone aims at
          the picture. It goes to the same place as the name link below, so it
          is out of the tab order rather than doubling the stop; the keyboard
          route to the product is the name. */}
      <Link
        href={`/products/${product.id}`}
        tabIndex={-1}
        className="relative block aspect-4/5 overflow-hidden border-b-[3px] border-[var(--hair)] bg-[var(--color-ink)]"
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 30vw"
          className="printed-photo object-cover"
          style={{ objectPosition: shot.position }}
        />
        <div aria-hidden className="photo-tint" />

        {/* Sold out is a painted band, not a grey tint. State is a mark. */}
        {product.soldOut && (
          <div className="pointer-events-none absolute inset-0 flex items-center">
            <p className="banner w-[140%] -translate-x-[14%] -rotate-[7deg] border-y-[3px] border-[var(--color-plate)] bg-[var(--color-ink)] py-2 text-center text-[0.95rem] uppercase text-[var(--color-plate)]">
              Sold out
            </p>
          </div>
        )}
      </Link>

      <div className="px-4 py-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="banner text-[0.98rem] leading-tight">
            <Link
              href={`/products/${product.id}`}
              className="underline decoration-[3px] underline-offset-[5px]"
            >
              {product.name}
            </Link>
          </h3>
          <p className="shrink-0 text-[0.98rem] tabular-nums">
            {taka(product.price)}
          </p>
        </div>

        <p className="mt-1 text-[0.86rem] leading-snug opacity-70">
          {product.material}
        </p>
      </div>
    </article>
  );
}
