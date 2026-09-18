/**
 * The rates board. A market board lists what it has and what it costs, in the
 * order it was written. Finestra's own sequence is genuinely a sequence, so
 * the years are the markers and the board carries them as written rows.
 *
 * Rank inside the board comes from case and rule, not from size, like every
 * other block on the page.
 */
const STOPS = [
  {
    year: "2018",
    title: "Opened as a clothing label",
    note: "Started on 31 October with the ambition of building a fashion identity of its own.",
  },
  {
    year: "2020",
    title: "Moved to accessories",
    note: "The range narrowed from clothing to men's accessories, and the brand found what it was good at.",
  },
  {
    year: "2026",
    title: "Added the character line",
    note: "Anime pieces joined the wall, so taste in jewelry and taste in stories are served together.",
  },
  {
    year: "Next",
    title: "Wallets, belts, everyday carry",
    note: "A fuller men's lifestyle range, with fan collections continuing alongside it.",
  },
];

export function RatesBoard() {
  return (
    <section className="border-t border-[var(--mark)]">
      <div className="mx-auto max-w-[1560px] px-4 py-10 sm:px-6 sm:py-14">
        <p className="chalk text-[2rem] leading-none sm:text-[2.6rem]">
          What the stall has done so far
        </p>

        <ol className="mt-7 border-t border-[var(--mark)]">
          {STOPS.map((stop) => (
            <li
              key={stop.year}
              className="grid gap-x-6 gap-y-1 border-b border-[var(--mark)] py-4 sm:grid-cols-[7rem_18rem_1fr] sm:items-baseline"
            >
              <span className="stencil">{stop.year}</span>
              <span className="stencil-2">{stop.title}</span>
              <span className="note max-w-[68ch]">{stop.note}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
