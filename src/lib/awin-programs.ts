/**
 * Approved Awin partner programs.
 *
 * TODO: Fill in the correct `awinmid` for each program from your Awin
 *       dashboard → My Advertisers → select program → view tracking links.
 */

export interface AwinProgram {
  id: string;
  name: string;
  /** Advertiser ID (awinmid) from the Awin dashboard */
  awinmid: number;
  /** Landing page URL to send users to */
  destinationUrl: string;
  description: string;
  category: string;
  /** Emoji or icon identifier for display */
  icon: string;
  badge?: string;
}

export const AWIN_PROGRAMS: AwinProgram[] = [
  {
    id: "campspot",
    name: "Campspot",
    awinmid: 0, // TODO: replace with actual awinmid from Awin dashboard
    destinationUrl: "https://www.campspot.com",
    description: "Book campgrounds, RV parks, and glamping sites across North America.",
    category: "Camping & Outdoors",
    icon: "⛺",
    badge: "Camping",
  },
  {
    id: "shopraise",
    name: "ShopRaise",
    awinmid: 0, // TODO: replace with actual awinmid from Awin dashboard
    destinationUrl: "https://www.shopraise.com",
    description: "Shop online and raise money for causes you care about — at no extra cost.",
    category: "Cause Shopping",
    icon: "🛍️",
    badge: "Cause",
  },
  {
    id: "esimshop-hk",
    name: "eSimShop HK",
    awinmid: 0, // TODO: replace with actual awinmid from Awin dashboard
    destinationUrl: "https://www.esimshop.com.hk",
    description: "Instant eSIM data plans for Hong Kong and Asia — no physical SIM needed.",
    category: "Travel eSIM",
    icon: "📱",
    badge: "eSIM",
  },
  {
    id: "simlocal-latam",
    name: "Sim Local LATAM",
    awinmid: 0, // TODO: replace with actual awinmid from Awin dashboard
    destinationUrl: "https://www.simlocal.com",
    description: "Stay connected across Latin America with affordable local SIM cards.",
    category: "Travel SIM",
    icon: "🌎",
    badge: "SIM",
  },
  {
    id: "b0arding",
    name: "b0arding.com",
    awinmid: 0, // TODO: replace with actual awinmid from Awin dashboard
    destinationUrl: "https://www.b0arding.com",
    description: "Premium travel gear and accessories for the modern adventurer.",
    category: "Travel Gear",
    icon: "🎒",
    badge: "Gear",
  },
  {
    id: "xtv",
    name: "XTV",
    awinmid: 0, // TODO: replace with actual awinmid from Awin dashboard
    destinationUrl: "https://www.xtv.com",
    description: "Stream live TV and on-demand content wherever your travels take you.",
    category: "Streaming",
    icon: "📺",
    badge: "Stream",
  },
];
