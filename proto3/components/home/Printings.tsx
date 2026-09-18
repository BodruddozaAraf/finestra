/**
 * A set has printings, and Finestra's history genuinely is a sequence of
 * them. The years are the markers; there is no invented print run and no
 * serial number anywhere.
 */
const PRINTINGS = [
  {
    year: "2018",
    title: "First printing",
    note: "Founded on 31 October as a clothing label, with the ambition of building a fashion identity of its own.",
  },
  {
    year: "2020",
    title: "Second printing",
    note: "The range narrowed from clothing to men's accessories, and the brand found what it was good at.",
  },
  {
    year: "2026",
    title: "Character series added",
    note: "Anime pieces joined the set, so taste in jewelry and taste in stories are served together.",
  },
  {
    year: "Next",
    title: "Wallets, belts, everyday carry",
    note: "A fuller men's lifestyle range, with fan collections continuing alongside it.",
  },
];

export function Printings() {
  return (
    <section className="border-b border-[var(--surface-line)]">
      <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-7 sm:py-16">
        <h2 className="plate text-[1.6rem] sm:text-[2rem]">Printings</h2>

        <ol className="mt-7 grid gap-x-8 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {PRINTINGS.map((p) => (
            <li key={p.year} className="border-t border-[var(--surface-line)] pt-4">
              <p className="plate text-[1.9rem]">{p.year}</p>
              <p className="field mt-2">{p.title}</p>
              <p className="mt-2 max-w-[38ch] text-[0.97rem] leading-relaxed">
                {p.note}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
