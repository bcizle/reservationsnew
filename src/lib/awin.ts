const AWIN_PUBLISHER_ID =
  process.env.NEXT_PUBLIC_AWIN_PUBLISHER_ID ?? "2793280";

/**
 * Build an Awin affiliate deep link.
 * @param advertiserId  The Awin advertiser ID (awinmid). Use "TODO" for programs
 *                      where you still need to retrieve the ID from the Awin dashboard:
 *                      My Account → My Programs → Approved → click program name.
 * @param destinationUrl  The target URL the visitor lands on after clicking.
 */
export function buildAwinLink(
  advertiserId: string,
  destinationUrl: string,
): string {
  if (advertiserId === "TODO") {
    // Fallback to direct link until the advertiser ID is configured
    return destinationUrl;
  }
  const encodedUrl = encodeURIComponent(destinationUrl);
  return `https://www.awin1.com/cread.php?awinmid=${advertiserId}&awinaffid=${AWIN_PUBLISHER_ID}&ued=${encodedUrl}`;
}

export interface AwinPartner {
  id: string;
  name: string;
  /** Awin awinmid value. Get from: Awin Dashboard → My Programs → Approved → click program */
  advertiserId: string;
  category: string;
  description: string;
  icon: string;
  destinationUrl: string;
  badge?: string;
  topPerformer?: boolean;
}

/**
 * Approved Awin partner programs.
 *
 * Confirmed IDs (verified via Awin merchant profile pages):
 *   Campspot    → 22326
 *   ShopRaise   → 115325
 *   Sim Local LATAM → 87123
 *   XTV         → 110558
 *
 * Still need IDs from Awin dashboard:
 *   b0arding.com   → set advertiserId to "TODO" until retrieved
 *   eSimShop HK    → set advertiserId to "TODO" until retrieved
 */
export const AWIN_PARTNERS: AwinPartner[] = [
  {
    id: "xtv",
    name: "XTV",
    advertiserId: "110558",
    category: "Entertainment",
    description:
      "All-in-one streaming hub with live TV and movies — perfect for long trips and layovers.",
    icon: "📺",
    destinationUrl: "https://xtv.ltd/",
    badge: "Top Performer",
    topPerformer: true,
  },
  {
    id: "b0arding",
    name: "b0arding.com",
    // TODO: retrieve this ID from Awin Dashboard → My Programs → Approved → b0arding.com
    advertiserId: "TODO",
    category: "Hotels",
    description:
      "Book hotels worldwide at competitive rates — powered by global Amadeus inventory.",
    icon: "🏨",
    destinationUrl: "https://b0arding.com/",
  },
  {
    id: "campspot",
    name: "Campspot",
    advertiserId: "22326",
    category: "Camping & Outdoors",
    description:
      "Instantly book campgrounds, RV parks, and glamping sites across the US and Canada.",
    icon: "🏕️",
    destinationUrl: "https://www.campspot.com/",
  },
  {
    id: "simlocal",
    name: "Sim Local LATAM",
    advertiserId: "87123",
    category: "Travel SIM",
    description:
      "Stay connected across Latin America with affordable travel SIM and eSIM cards.",
    icon: "🌎",
    destinationUrl: "https://www.simlocal.com/",
  },
  {
    id: "esimshop",
    name: "eSimShop",
    // TODO: retrieve this ID from Awin Dashboard → My Programs → Approved → eSimShop HongKong
    advertiserId: "TODO",
    category: "Travel eSIM",
    description:
      "Instant eSIM activation for Hong Kong and Asia — no physical SIM card required.",
    icon: "📱",
    destinationUrl: "https://esimshop.com/",
  },
  {
    id: "shopraise",
    name: "ShopRaise",
    advertiserId: "115325",
    category: "Shopping",
    description:
      "Shop your favorite stores and raise money for the causes you care about — at no extra cost.",
    icon: "🛍️",
    destinationUrl: "https://www.shopraise.com/",
  },
];
