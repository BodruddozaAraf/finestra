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
};

export const CHANNELS: Channel[] = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "finestrabangladesh",
    href: "https://www.instagram.com/finestrabangladesh",
  },
  {
    // wa.me takes the number with the country code and without the local
    // leading 0: 01974441415 becomes 8801974441415.
    id: "whatsapp",
    name: "WhatsApp",
    handle: "+880 1974 441415",
    href: "https://wa.me/8801974441415",
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

/** Instagram and WhatsApp. The pair the product page leads with. */
export const PRIMARY = CHANNELS.slice(0, 2);

/** Facebook. */
export const SECONDARY = CHANNELS.slice(2);

/** Every contact link leaves the site, so it opens beside it, not over it. */
export const OUTBOUND = { target: "_blank", rel: "noopener noreferrer" } as const;
