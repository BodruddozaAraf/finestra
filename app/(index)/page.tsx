import Link from "next/link";

const PROTOS = [
  {
    slug: "proto-1",
    n: "1",
    name: "Rickshaw Cinema",
    world: "Hand-painted Dhaka rickshaw panels and cinema banner hoardings.",
    structure: "Full-width painted panels down a narrative scroll.",
    colour: "Yellow is the page.",
    type: "Bungee, Yellowtail, Bricolage Grotesque.",
  },
  {
    slug: "proto-2",
    n: "2",
    name: "Kacha Bazar",
    world: "A Dhaka morning market stall, priced by hand on a chalk board.",
    structure: "One dense module grid, every word at a single type size.",
    colour: "Yellow is the goods.",
    type: "Archivo and Caveat.",
  },
  {
    slug: "proto-3",
    n: "3",
    name: "The Set",
    world: "A trading-card set. Every piece is issued as a card.",
    structure: "A selector. One card is held, the set stays open behind it.",
    colour: "Yellow is the foil.",
    type: "Big Shoulders and Barlow.",
  },
];

export default function Index() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-white">
        Finestra Bangladesh
      </h1>
      <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-neutral-400">
        Three design concepts, each built as a Homepage and a Products page. Use
        the bar at the top of any concept to switch between them; it keeps you on
        the same page so the two surfaces can be compared directly.
      </p>

      <ul className="mt-10 grid gap-4">
        {PROTOS.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/${p.slug}`}
              className="block rounded-lg border border-neutral-800 bg-neutral-900/60 p-5 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
            >
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-[13px] text-neutral-500">{p.n}</span>
                <span className="text-lg font-medium text-white">{p.name}</span>
              </div>
              <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-300">
                {p.world}
              </p>
              <dl className="mt-4 grid gap-x-8 gap-y-2 text-[13px] sm:grid-cols-3">
                <div>
                  <dt className="text-neutral-500">Structure</dt>
                  <dd className="mt-0.5 text-neutral-300">{p.structure}</dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Colour</dt>
                  <dd className="mt-0.5 text-neutral-300">{p.colour}</dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Type</dt>
                  <dd className="mt-0.5 text-neutral-300">{p.type}</dd>
                </div>
              </dl>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-[70ch] text-[13px] leading-relaxed text-neutral-500">
        Products, prices, set codes, and photography in all three concepts are
        placeholders. Gellatio and Brittany are substituted throughout; each
        concept isolates its display and script faces behind two CSS variables
        so the licensed files can be dropped in without touching a component.
      </p>
    </main>
  );
}
