export interface Destination {
  slug: string;
  name: string;
  country: string;
  iata?: string;
  heroImage: string;
  cardImage: string;
  hotels: string;
  tagline: string;
  description: string;
  bestTime: string;
  avgPrice: string;
  highlights: string[];
  tips: string[];
}

const UNSPLASH = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

const destinationList: Destination[] = [
  {
    slug: "new-york-city",
    name: "New York City",
    country: "USA",
    iata: "NYC",
    heroImage: UNSPLASH("photo-1496442226666-8d4d0e62e6e9", 1920),
    cardImage: UNSPLASH("photo-1496442226666-8d4d0e62e6e9", 800),
    hotels: "2,400+",
    tagline: "The city that never sleeps",
    description:
      "The city that never sleeps offers an endless array of accommodation options, from iconic luxury hotels overlooking Central Park to trendy boutique stays in Brooklyn. Whether you are visiting for business, a Broadway show, or exploring world-class museums, New York City has a hotel to match every budget and style.",
    bestTime:
      "April to June and September to November offer pleasant weather and fewer crowds than peak summer. Fall foliage in Central Park is particularly stunning.",
    avgPrice: "$150 – $400 per night",
    highlights: [
      "Times Square and Broadway Theater District",
      "Central Park — 843 acres of green space in Manhattan",
      "Statue of Liberty and Ellis Island",
      "Metropolitan Museum of Art and MoMA",
      "Brooklyn Bridge and DUMBO neighborhood",
      "Fifth Avenue shopping and Rockefeller Center",
    ],
    tips: [
      "Book hotels in Midtown for easy access to major attractions and transit.",
      "Consider hotels in Brooklyn or Queens for better rates — they are just a subway ride from Manhattan.",
      "Many hotels offer discounted rates for stays of 4+ nights.",
      "Check for package deals that include attraction passes for additional savings.",
    ],
  },
  {
    slug: "paris",
    name: "Paris",
    country: "France",
    iata: "PAR",
    heroImage: UNSPLASH("photo-1502602898657-3e91760cbb34", 1920),
    cardImage: UNSPLASH("photo-1502602898657-3e91760cbb34", 800),
    hotels: "1,800+",
    tagline: "The City of Light",
    description:
      "Paris, the City of Light, enchants visitors with its timeless architecture, world-renowned cuisine, and unmatched cultural heritage. From elegant hotels along the Champs-Elysees to charming boutique stays in Le Marais, the city offers accommodations as diverse and beautiful as Paris itself.",
    bestTime:
      "June to August for warm weather and outdoor cafes, or April to May for spring blooms and fewer tourists. September and October offer mild weather and wine harvest season.",
    avgPrice: "$120 – $350 per night",
    highlights: [
      "Eiffel Tower and Champ de Mars",
      "The Louvre — home to the Mona Lisa and 35,000+ works of art",
      "Notre-Dame Cathedral and Ile de la Cite",
      "Montmartre and Sacre-Coeur Basilica",
      "Seine River cruises at sunset",
      "Versailles Palace — a short day trip from the city",
    ],
    tips: [
      "Hotels in the 1st-8th arrondissements are most central but priciest.",
      "The 11th and 12th arrondissements offer great value with easy metro access.",
      "Book at least 2-3 months in advance for summer visits.",
      "Look for hotels offering breakfast — Parisian hotel breakfasts are a treat.",
    ],
  },
  {
    slug: "tokyo",
    name: "Tokyo",
    country: "Japan",
    iata: "TYO",
    heroImage: UNSPLASH("photo-1540959733332-eab4deabeeaf", 1920),
    cardImage: UNSPLASH("photo-1540959733332-eab4deabeeaf", 800),
    hotels: "1,500+",
    tagline: "Where tradition meets innovation",
    description:
      "Tokyo seamlessly blends ultramodern innovation with ancient tradition. From capsule hotels and futuristic pod accommodations to serene ryokans (traditional Japanese inns) and luxury high-rise hotels with stunning city views, Tokyo delivers an unforgettable stay no matter your preference.",
    bestTime:
      "March to May for cherry blossom season, or October to November for autumn colors and comfortable temperatures. Avoid the rainy season in June-July.",
    avgPrice: "$80 – $300 per night",
    highlights: [
      "Shibuya Crossing — the world's busiest pedestrian intersection",
      "Senso-ji Temple in Asakusa",
      "Meiji Shrine and Harajuku's fashion district",
      "Tsukiji Outer Market for fresh sushi and street food",
      "Akihabara — the electric town for anime and electronics",
      "Tokyo Skytree observation deck with panoramic city views",
    ],
    tips: [
      "Shinjuku and Shibuya are ideal bases for first-time visitors.",
      "Consider a hotel near a major JR station for easy access to the rail network.",
      "Business hotels offer excellent value with clean, compact rooms.",
      "Many hotels offer day-use rates — perfect for layovers.",
    ],
  },
  {
    slug: "london",
    name: "London",
    country: "United Kingdom",
    iata: "LON",
    heroImage: UNSPLASH("photo-1513635269975-59663e0ac1ad", 1920),
    cardImage: UNSPLASH("photo-1513635269975-59663e0ac1ad", 800),
    hotels: "2,100+",
    tagline: "Centuries of history and culture",
    description:
      "London is a city where centuries of history meet cutting-edge culture. With hotels ranging from grand heritage properties near Buckingham Palace to modern design hotels in Shoreditch, the British capital caters to every type of traveler and every budget.",
    bestTime:
      "May to September for the warmest weather and longest days. June is especially lovely with gardens in full bloom. Winter offers lower hotel rates and festive holiday markets.",
    avgPrice: "$130 – $380 per night",
    highlights: [
      "Buckingham Palace and the Changing of the Guard",
      "The British Museum — free entry to world-class collections",
      "Tower of London and Tower Bridge",
      "West End theater performances",
      "Hyde Park and Kensington Gardens",
      "Camden Market and Borough Market for food lovers",
    ],
    tips: [
      "Zone 1 hotels are most convenient but expensive. Zone 2 offers great value.",
      "Book hotels near Tube stations — London's Underground makes everything accessible.",
      "Many hotels offer discounted weekend rates aimed at leisure travelers.",
      "Check for hotels that include English breakfast — it can save you significantly.",
    ],
  },
  {
    slug: "cancun",
    name: "Cancun",
    country: "Mexico",
    iata: "CUN",
    heroImage: UNSPLASH("photo-1510097467424-192d713fd8b2", 1920),
    cardImage: UNSPLASH("photo-1510097467424-192d713fd8b2", 800),
    hotels: "900+",
    tagline: "Caribbean paradise",
    description:
      "Cancun is Mexico's premier beach destination, famous for its turquoise Caribbean waters, white-sand beaches, and vibrant nightlife. The Hotel Zone stretches along a narrow strip of land with all-inclusive resorts and luxury beachfront properties, while downtown Cancun offers more affordable stays with authentic Mexican culture.",
    bestTime:
      "December to April for dry, sunny weather. May to June offers lower prices with still-good weather. Avoid September-October (hurricane season).",
    avgPrice: "$100 – $350 per night",
    highlights: [
      "Pristine white-sand beaches along the Hotel Zone",
      "Chichen Itza — one of the New Seven Wonders of the World",
      "Snorkeling and diving at the Mesoamerican Reef",
      "Isla Mujeres — a charming island just a ferry ride away",
      "Xcaret and Xel-Ha eco-archaeological parks",
      "Vibrant nightlife along the Hotel Zone strip",
    ],
    tips: [
      "All-inclusive resorts in the Hotel Zone offer the best value for beach vacations.",
      "Downtown Cancun hotels are significantly cheaper and offer authentic local dining.",
      "Book excursions to cenotes and Mayan ruins for unforgettable day trips.",
      "Compare all-inclusive packages carefully — some include airport transfers and activities.",
    ],
  },
  {
    slug: "dubai",
    name: "Dubai",
    country: "UAE",
    iata: "DXB",
    heroImage: UNSPLASH("photo-1512453979798-5ea266f8880c", 1920),
    cardImage: UNSPLASH("photo-1512453979798-5ea266f8880c", 800),
    hotels: "1,200+",
    tagline: "City of superlatives",
    description:
      "Dubai is a city of superlatives — home to the world's tallest building, largest shopping mall, and some of the most luxurious hotels on Earth. From iconic sail-shaped towers to desert glamping experiences, Dubai offers accommodations that redefine hospitality and luxury.",
    bestTime:
      "November to March for comfortable temperatures (20-30C). Summer months (June-August) are extremely hot but offer the lowest hotel rates — sometimes up to 50% off.",
    avgPrice: "$100 – $500 per night",
    highlights: [
      "Burj Khalifa — observation deck at 555 meters high",
      "Dubai Mall — 1,200+ shops, an aquarium, and ice rink",
      "Palm Jumeirah and Atlantis resort",
      "Dubai Marina and JBR Beach promenade",
      "Desert safari with dune bashing and traditional dinner",
      "Gold Souk and Spice Souk in historic Deira",
    ],
    tips: [
      "Hotels along Sheikh Zayed Road offer central locations and good value.",
      "JBR and Dubai Marina are ideal for beach access with a lively atmosphere.",
      "Book summer stays for dramatic discounts at luxury properties.",
      "Many 5-star hotels are surprisingly affordable compared to European equivalents.",
    ],
  },
];

export const destinationsBySlug: Record<string, Destination> = Object.fromEntries(
  destinationList.map((d) => [d.slug, d]),
);

export const destinations = destinationList;

export function getDestination(slug: string): Destination | undefined {
  return destinationsBySlug[slug];
}
