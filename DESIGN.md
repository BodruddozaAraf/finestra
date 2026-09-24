# Design

Prototype 1 for Finestra Bangladesh. Written from the built world, not ahead of
it. Homepage, Products, and a page per piece.

## The world

A two-plate screenprint on white tin, in the grammar of Dhaka's hand-painted
rickshaw panels and cinema banner hoardings: heavy ink keylines, chevron edge
banding, a halftone dot screen, hand lettering, and a cut-out portrait that
breaks its own frame.

Rickshaw painting is polychrome and the brand guideline authorises three
colours, so the world is translated to two printing plates rather than
recoloured. Black is the ink plate. Finestra Yellow is the colour plate. White
is the tin showing through. The ornamental density, the border grammar, and the
painted lettering all survive the translation; only the extra hues are dropped.

## Colour

Committed. Yellow carries whole regions, never scattered accents.

| Token | Value | Role |
| --- | --- | --- |
| `--color-ink` | `#000000` | The ink plate. From the guideline, used as specified. |
| `--color-plate` | `#f8be14` | Finestra Yellow. The colour plate. |
| `--color-tin` | `#ffffff` | The tin. |

There is no fourth colour and no tint ramp. Depth comes from the halftone
screen and from plate misregistration, not from greys.

### Two readings, one field

The page ground flips between readings. The yellow field does not, because a
painted yellow panel looks the same at midnight as at noon.

- **Day**: tin ground, ink lettering.
- **Night**: ink ground, yellow lettering. The same sign under a street lamp.
  Picked from the use scene, not from category habit: this audience arrives
  from a phone, often late.

Because the field is constant, anything sitting on it enters `.field-plate`,
which re-declares `--ground`, `--ink`, `--hair`, `--reg`, and the photo screen
locally. Components then read the same variable names everywhere and resolve
correctly in both readings. This is the one structural rule to preserve when
extending the prototype: **a yellow surface is a `.field-plate`, not a yellow
background utility.**

### Contrast

`#F8BE14` on white is 1.7:1 and is never text on a light ground. It reads 12.3:1
against black, so yellow carries display type, fills, and whole surfaces, and
black carries every mark on the field.

## Type

Three hands, as a banner painter uses three hands on one board.

| Token | Face | Role |
| --- | --- | --- |
| `--font-banner` | Bungee | Painted display. Headlines, nav, buttons, product names. |
| `--font-script` | Yellowtail | The painter's script. Wordmark and tagline only. |
| `--font-block` | Bricolage Grotesque | Prices, running text, controls. |

Bungee and Yellowtail stand in for the licensed brand faces. **Gellatio** (logo)
and **Brittany** (tagline, statement) are commercial and were not supplied.
Repointing `--font-banner` and `--font-script` in `app/globals.css` swaps the
brand voice without touching a component.

Display tracking sits at `-0.025em`. The hero headline holds two lines at every
breakpoint; that is a constraint on the type scale, not on the copy.

## Structure

The plate is the only structural unit: a square panel inside a 3px ink keyline.
Nothing is a card. Sections are plates stacked and butted, edged with chevron
banding and floret dot rows.

Radii: everything square, with one documented exception. Chips and the primary
lozenge are full pill, because a painted button on a rickshaw panel is a
lozenge. There is no middle radius.

Layout families: painted banner hero, horizontal shelf rail, framed diptych,
route board, closing banner, footer plate, and the broadside. Each is used once
per page, and only the shelf rail appears on two routes.

The **broadside** is the piece page: one sheet inside one unbroken ink keyline,
split into the frames on the left and the particulars column on the right, with
a specification band run across the foot of the same frame. It follows the
diptych's rule rather than the catalogue plate's, because a piece and its price
are not two objects and so are not two frames. The particulars column centres
itself against the frames rather than sitting to the top of a taller pane, and
ends in the handoff.

The **shelf rail** is the one family deliberately repeated: the homepage runs it
for the week's shelf and a piece page runs it for the rest of that line. It is
one component, `components/products/PieceRail.tsx`, so the repeat cannot drift.

No eyebrows anywhere. Headings carry their own weight.

## Registration

The signature interaction. Elements sit with their second plate misregistered
5px behind the first, as a hand-pulled two-colour print does. Hover widens the
offset to 7px. Press snaps the plates into register and the offset collapses to
zero. One rule, defined once as `@utility reg-plate`, applied to every control
identically. `--reg` comes from the surrounding scope so the offset is always
the plate that contrasts.

## State

State is a mark, never a hue, so yellow stays the brand's voice instead of
becoming a status light.

- Selected filter: a filled check box.
- Chosen frame: an ink underscore under the thumb, the nav's mark reused. The
  thumb's own keyline stays solid; only the photograph inside an unchosen frame
  is held back.
- Sold out: a painted band struck across the plate.
- Current route: an ink underscore under the nav word.

## Motion

The hero prints itself on load: lettering lifts off the field in sequence,
then the portrait plate drops into place. It still runs once, only there,
written in CSS rather than driven from JavaScript, so reduced motion and a
failed script both land on the finished page rather than on an empty one.

Two things move continuously, both texture rather than a second authored
moment:

- **The chevron band** — nav, footer, and closing banner all read the one
  shared `chevron-band` utility — crawls sideways at a steady pace, reversed
  in direction from its first pass. It never touches a plate or a letterform,
  so it reads as the print feed running, not as a second hero.
- **The shelf rail** creeps sideways on its own, always. The piece list
  renders twice in the markup (second copy hidden from assistive tech) so the
  loop wraps from the second run onto the first with nothing to see. It holds
  still only while a visitor is actually pressing and dragging it — hovering
  never stops it — and can be dragged either direction, mouse or touch.

Registration snap is the one interaction-driven movement: it answers a press,
same as always.

`prefers-reduced-motion: reduce` turns all three off — the hero print-in, the
chevron crawl, and the rail's creep-and-drag system are each gated behind the
same media query in CSS or JavaScript, so none of them run. The rail still
scrolls by hand under reduced motion (trackpad, touch, scrollbar), just
without the auto-creep or the custom drag.

## Photography

Photographs are screened toward the two plates (`printed-photo` plus a yellow
multiply at scope-dependent strength) so they read as printed stock rather than
as someone else's photography. Every image resolves through `lib/images.ts`, a
single swap point.

A piece page wants more than one frame and Finestra has photographed none of
these pieces, so the frame rail is the piece's own stand-in shot followed by two
stand-in frames held per line in `PRODUCT_FRAMES`. Frames are matched to the
lead shot by photograph rather than by URL, because the two are requested at
different widths. Replacing the per-piece shots fills the rail without touching
a component.

## Browser surfaces

Selection, scrollbar track and thumb, and focus rings are themed from the
palette. Prices and sizes use tabular numerals.

## What is placeholder

- `lib/catalogue.ts`: invented products, prices, variants, descriptions, care
  notes, and availability. The products page and every piece page state this on
  the surface.
- `lib/images.ts`: openly licensed stand-in photography, not Finestra product
  shots, including the supporting frames on a piece page.
- `lib/contact.ts`: the WhatsApp link is a placeholder. Instagram and Facebook
  are the shop's real accounts.

No customer counts, ratings, stock levels, delivery times, or press mentions
appear anywhere, invented or otherwise.
