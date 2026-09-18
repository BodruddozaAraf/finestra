/**
 * A route plate. The brand's stops really are a sequence, so this is the one
 * place on the page where order carries information and the markers earn
 * their keep. Years are the markers; there is no 01 / 02 / 03.
 */
const STOPS = [
  {
    year: "2018",
    title: "Opened as a clothing label",
    body: "Finestra started on 31 October 2018 with the ambition of building a fashion identity of its own.",
  },
  {
    year: "2020",
    title: "Moved to accessories",
    body: "The range narrowed from clothing to men's accessories, and the brand found the thing it was actually good at.",
  },
  {
    year: "2026",
    title: "Added the character line",
    body: "Anime pieces joined the shelf, so a customer's taste in jewelry and their taste in stories are served together.",
  },
  {
    year: "Next",
    title: "Wallets, belts, and everyday carry",
    body: "The plan is a fuller men's lifestyle range, with fan collections continuing alongside it.",
  },
];

export function RouteBoard() {
  return (
    <section className="border-t-[3px] border-[var(--hair)] bg-[var(--ground)] px-4 py-14 sm:px-7 sm:py-20">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="banner text-[1.9rem] leading-none tracking-[-0.02em] sm:text-[2.6rem]">
          The route so far
        </h2>

        <ol className="mt-10 grid gap-0 md:grid-cols-4">
          {STOPS.map((stop, i) => (
            <li
              key={stop.year}
              className="relative pl-9 pb-10 md:pt-12 md:pl-0 md:pr-7 md:pb-0"
            >
              {/* The route line: vertical on phones, horizontal above md. It
                  runs on past the last stop, because the route has not
                  finished. The last stop drops the vertical run so the phone
                  layout ends cleanly. */}
              <span
                aria-hidden
                className={[
                  "absolute bg-[var(--hair)]",
                  i === STOPS.length - 1
                    ? "hidden md:block"
                    : "left-[7px] top-[6px] h-full w-[3px]",
                  "md:left-0 md:top-[7px] md:h-[3px] md:w-full",
                ].join(" ")}
              />
              {/* Stop marker. A painted square, not a decorative dot. */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-[17px] w-[17px] border-[3px] border-[var(--color-ink)] bg-[var(--color-plate)]"
              />

              <p className="banner text-[1.55rem] leading-none sm:text-[1.9rem]">
                {stop.year}
              </p>
              <h3 className="mt-3 text-[1.02rem] font-semibold leading-snug">
                {stop.title}
              </h3>
              <p className="mt-2 max-w-[38ch] text-[0.97rem] leading-relaxed opacity-80">
                {stop.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
