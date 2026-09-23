/**
 * The shop's inbox. Swap point for the real handles.
 *
 * The site does not take orders. It shows the range and hands the customer to
 * the shop, so these three links are the only exit the site has, and every
 * place that offers them reads this file rather than writing its own URL.
 *
 * Order matters and is deliberate: Instagram leads because that is where the
 * audience already is, WhatsApp follows, Facebook last.
 */

import {
  FacebookLogo,
  InstagramLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";

export type Channel = {
  id: "instagram" | "whatsapp" | "facebook";
  /** The channel, as a customer would name it. */
  name: string;
  /** The account, where there is one to show. */
  handle: string;
  href: string;
  /** True while the shop has not supplied the link yet. */
  pending?: boolean;
};

export const CHANNELS: Channel[] = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "finestrabangladesh",
    href: "https://www.instagram.com/finestrabangladesh",
  },
  {
    // PENDING: the shop has not supplied a WhatsApp number. Paste the click to
    // chat link here (https://wa.me/<country code><number>) and drop `pending`.
    // Until then this button renders but goes nowhere, so it must not reach a
    // live audience in this state.
    id: "whatsapp",
    name: "WhatsApp",
    handle: "",
    href: "#",
    pending: true,
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "Finestra Bangladesh",
    href: "https://www.facebook.com/FinestraBangladesh",
  },
];

/** The painted mark for each channel. */
export const CHANNEL_MARKS = {
  instagram: InstagramLogo,
  whatsapp: WhatsappLogo,
  facebook: FacebookLogo,
};

/** Instagram. The one the piece page leads with. */
export const PRIMARY = CHANNELS[0];

/** WhatsApp and Facebook, in order. */
export const SECONDARY = CHANNELS.slice(1);
