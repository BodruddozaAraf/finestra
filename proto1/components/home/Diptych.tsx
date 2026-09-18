import Image from "next/image";
import { EDITORIAL } from "@/proto1/lib/images";

/**
 * The brand's position, made structural: two panes inside one unbroken ink
 * frame, divided by a single rule. Classic pieces and character pieces are
 * not two brands sharing a logo, so they are not two frames.
 */
export function Diptych() {
  const panes = [
    {
      key: "classic",
      title: "The everyday hand",
      body: "Signets, plain bands, chain bracelets, cord pendants. The pieces you put on without thinking about it and take off last.",
      shot: EDITORIAL.classic,
    },
    {
      key: "character",
      title: "The character hand",
      body: "Charms, keyrings, and stands for the series you actually watch. Made to sit on the same wrist as everything above.",
      shot: EDITORIAL.character,
    },
  ];

  return (
    <section className="bg-[var(--ground)] px-4 pb-16 sm:px-7 sm:pb-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="border-[3px] border-[var(--hair)]">
          <div className="border-b-[3px] border-[var(--hair)] bg-[var(--color-plate)] px-5 py-6 text-[var(--color-ink)] sm:px-8 sm:py-8">
            <h2 className="banner max-w-[20ch] text-[1.85rem] leading-[1.02] tracking-[-0.02em] sm:text-[2.7rem]">
              Two hands, one shelf
            </h2>
          </div>

          <div className="grid md:grid-cols-2">
            {panes.map((pane, i) => (
              <article
                key={pane.key}
                className={
                  i === 0
                    ? "border-b-[3px] border-[var(--hair)] md:border-b-0 md:border-r-[3px]"
                    : ""
                }
              >
                <div className="relative aspect-16/10 overflow-hidden border-b-[3px] border-[var(--hair)] bg-[var(--color-ink)]">
                  <Image
                    src={pane.shot.src}
                    alt={pane.shot.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="printed-photo object-cover"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 mix-blend-multiply"
                    style={{
                      background: "var(--color-plate)",
                      opacity: "var(--photo-tint-strength)",
                    }}
                  />
                </div>
                <div className="px-5 py-7 sm:px-8 sm:py-9">
                  <h3 className="banner text-[1.15rem] leading-tight sm:text-[1.35rem]">
                    {pane.title}
                  </h3>
                  <p className="mt-3 max-w-[48ch] text-[1rem] leading-relaxed">
                    {pane.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
