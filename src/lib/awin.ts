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
 *   Caesars Rewards      → 6145
 *   Campspot             → 22326
 *   ShopRaise            → 115325
 *   Sim Local LATAM      → 87123
 *   XTV                  → 110558
 *   b0arding.com         → 116441
 *   eSimShop HongKong    → 124780
 *   Promeed              → 100833
 *   Temptation Experience (US) → 23093
 *   Turbopass US         → 100613
 *   Swimply              → 117149
 *   Station Casinos (US) → 19995
 *   NN Hotels (US)       → 19428
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
    advertiserId: "116441",
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
    advertiserId: "124780",
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
  {
    id: "turbopass",
    name: "Turbopass US",
    advertiserId: "100613",
    category: "City Passes & Attractions",
    description:
      "City passes for top destinations — free entry to museums, attractions, and public transit in cities like New York, London, Barcelona, and more.",
    icon: "🎟️",
    destinationUrl: "https://www.turbopass.com/",
  },
  {
    id: "temptation",
    name: "Temptation Experience",
    advertiserId: "23093",
    category: "Resorts",
    description:
      "Adults-only resort experiences in top destinations — book unforgettable getaways with premium all-inclusive packages.",
    icon: "🌴",
    destinationUrl: "https://www.temptationresorts.com/",
  },
  {
    id: "promeed",
    name: "Promeed",
    advertiserId: "100833",
    category: "Travel Comfort",
    description:
      "Premium silk pillowcases and bedding — Good Housekeeping's 'Best Value' pick for silky sleep comfort at home or on the road.",
    icon: "🛏️",
    destinationUrl: "https://promeed.com/",
  },
  {
    id: "swimply",
    name: "Swimply",
    advertiserId: "117149",
    category: "Activities & Experiences",
    description:
      "Book private pools, courts, and outdoor spaces by the hour — a unique alternative to crowded public venues.",
    icon: "🏊",
    destinationUrl: "https://swimply.com/",
  },
  {
    id: "station-casinos",
    name: "Station Casinos",
    advertiserId: "19995",
    category: "Hotels & Casinos",
    description:
      "Book stays at Las Vegas's leading regional casino resorts — Red Rock, Green Valley Ranch, Palace Station, and more.",
    icon: "🎰",
    destinationUrl: "https://www.sclv.com/",
  },
  {
    id: "caesars-rewards",
    name: "Caesars Rewards",
    advertiserId: "6145",
    category: "Hotels & Casinos",
    description:
      "World's most geographically diversified casino-entertainment company — book stays at Caesars Palace, Harrah's, Horseshoe, Flamingo, and dozens more iconic resorts.",
    icon: "🎲",
    destinationUrl: "https://www.caesars.com/",
  },
  {
    id: "nn-hotels",
    name: "NN Hotels",
    advertiserId: "19428",
    category: "Hotels",
    description:
      "Boutique hotels in the heart of Barcelona — stay near the Ramblas, the Gothic Quarter, and Paseo de Gracia.",
    icon: "🛎️",
    destinationUrl: "https://www.nnhotels.com/en",
  },
];
