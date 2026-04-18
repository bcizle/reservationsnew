export type AmenityKey =
  | "wifi"
  | "pool"
  | "gym"
  | "spa"
  | "breakfast"
  | "parking"
  | "pet-friendly"
  | "bar"
  | "restaurant"
  | "beach"
  | "airport-shuttle"
  | "concierge"
  | "air-conditioning"
  | "family-rooms"
  | "workspace"
  | "kitchen"
  | "laundry";

export const AMENITY_LABELS: Record<AmenityKey, string> = {
  wifi: "Free Wi-Fi",
  pool: "Pool",
  gym: "Fitness Center",
  spa: "Spa",
  breakfast: "Breakfast",
  parking: "Parking",
  "pet-friendly": "Pet-friendly",
  bar: "Bar",
  restaurant: "Restaurant",
  beach: "Beach Access",
  "airport-shuttle": "Airport Shuttle",
  concierge: "Concierge",
  "air-conditioning": "Air Conditioning",
  "family-rooms": "Family Rooms",
  workspace: "Workspace",
  kitchen: "Kitchen",
  laundry: "Laundry",
};

export interface HotelPhoto {
  id: string;
  src: string;
  thumb: string;
  alt: string;
}

export interface HotelRoom {
  name: string;
  description: string;
  image: string;
  pricePerNight: string;
  sleeps: number;
}

export interface HotelReviewSnippet {
  /** Curated snippet — replace with real review data when Google Places is wired to hotels */
  quote: string;
  author: string;
  score: number;
}

export interface Hotel {
  slug: string;
  name: string;
  destinationSlug: string;
  neighborhood: string;
  stars: number;
  reviewScore: number;
  reviewCount: number;
  pricePerNight: string;
  originalPrice?: string;
  shortDescription: string;
  description: string;
  gallery: HotelPhoto[];
  amenities: AmenityKey[];
  rooms: HotelRoom[];
  reviews: HotelReviewSnippet[];
  whyBookHere: string[];
  nearbyAttractions: Array<{ name: string; distance: string }>;
  platforms: Array<"Booking.com" | "Expedia" | "Hotels.com">;
}

const UNSPLASH = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

function photo(id: string, alt: string): HotelPhoto {
  return { id, src: UNSPLASH(id, 1600), thumb: UNSPLASH(id, 500), alt };
}

const hotelList: Hotel[] = [
  // ────────────────────── New York City ──────────────────────
  {
    slug: "grand-central-hotel-nyc",
    name: "The Grand Central Hotel",
    destinationSlug: "new-york-city",
    neighborhood: "Midtown Manhattan",
    stars: 4,
    reviewScore: 9.1,
    reviewCount: 2841,
    pricePerNight: "$189",
    originalPrice: "$239",
    shortDescription: "Elegant Midtown stay with rooftop bar and skyline views steps from Grand Central.",
    description:
      "A refined boutique hotel steps from Grand Central Terminal, combining Beaux-Arts charm with floor-to-ceiling city views. Guests enjoy a buzzing rooftop bar, a chef-led restaurant, and an indoor heated pool rare for Manhattan properties.",
    gallery: [
      photo("photo-1566073771259-6a8506099945", "Grand Central Hotel exterior"),
      photo("photo-1590490360182-c33d57733427", "King room with skyline view"),
      photo("photo-1618773928121-c32242e63f39", "Marble-tiled bathroom"),
      photo("photo-1542314831-068cd1dbfeeb", "Rooftop bar at dusk"),
      photo("photo-1578683010236-d716f9a3f461", "Indoor heated pool"),
      photo("photo-1445019980597-93fa8acb246c", "Elegant hotel lobby"),
    ],
    amenities: ["wifi", "pool", "gym", "restaurant", "bar", "concierge", "air-conditioning"],
    rooms: [
      {
        name: "Deluxe King",
        description: "King bed, workspace, rainfall shower. 320 sq ft with skyline view.",
        image: UNSPLASH("photo-1631049307264-da0ec9d70304", 800),
        pricePerNight: "$189",
        sleeps: 2,
      },
      {
        name: "Executive Suite",
        description: "Separate living area, soaking tub, panoramic views. 520 sq ft.",
        image: UNSPLASH("photo-1591088398332-8a7791972843", 800),
        pricePerNight: "$329",
        sleeps: 3,
      },
    ],
    reviews: [
      {
        quote:
          "The rooftop bar alone justified the stay — 15 floors up with unobstructed Midtown views. Room was quiet despite being on a busy avenue.",
        author: "Verified Booking guest",
        score: 9.3,
      },
      {
        quote:
          "Perfect location for a Broadway weekend. Concierge snagged us reservations at a restaurant I'd been told was impossible.",
        author: "Verified Booking guest",
        score: 9.0,
      },
    ],
    whyBookHere: [
      "Two blocks from Grand Central and the B/D/F/M trains",
      "Indoor heated pool — almost unheard of in Midtown",
      "Rooftop bar consistently rated in NYC's top 10",
    ],
    nearbyAttractions: [
      { name: "Grand Central Terminal", distance: "0.2 mi" },
      { name: "Times Square", distance: "0.6 mi" },
      { name: "Bryant Park", distance: "0.4 mi" },
      { name: "Rockefeller Center", distance: "0.5 mi" },
    ],
    platforms: ["Booking.com", "Expedia", "Hotels.com"],
  },
  {
    slug: "park-avenue-inn-nyc",
    name: "Park Avenue Inn",
    destinationSlug: "new-york-city",
    neighborhood: "Murray Hill",
    stars: 3,
    reviewScore: 8.3,
    reviewCount: 1204,
    pricePerNight: "$125",
    shortDescription: "Comfortable boutique stay with complimentary breakfast and 24/7 concierge.",
    description:
      "A family-run boutique hotel on a quiet Murray Hill block, offering a genuine neighborhood feel with easy subway access to Midtown and the Empire State Building.",
    gallery: [
      photo("photo-1551882547-ff40c63fe5fa", "Park Avenue Inn building facade"),
      photo("photo-1611892440504-42a792e24d32", "Queen bedroom"),
      photo("photo-1584132967334-10e028bd69f7", "Continental breakfast spread"),
      photo("photo-1564501049412-61c2a3083791", "Neighborhood block"),
      photo("photo-1540518614846-7eded433c457", "Compact modern bathroom"),
    ],
    amenities: ["wifi", "breakfast", "concierge", "air-conditioning", "family-rooms"],
    rooms: [
      {
        name: "Classic Queen",
        description: "Queen bed, private bath, complimentary breakfast. 240 sq ft.",
        image: UNSPLASH("photo-1611892440504-42a792e24d32", 800),
        pricePerNight: "$125",
        sleeps: 2,
      },
      {
        name: "Family Room",
        description: "Two queen beds, workspace, connecting option. 320 sq ft.",
        image: UNSPLASH("photo-1560448204-e02f11c3d0e2", 800),
        pricePerNight: "$185",
        sleeps: 4,
      },
    ],
    reviews: [
      {
        quote:
          "Great value for NYC. Neighborhood was quiet but we were on the 6 train in 3 minutes. Breakfast was better than expected.",
        author: "Verified Booking guest",
        score: 8.5,
      },
    ],
    whyBookHere: [
      "Rare free breakfast for a NYC hotel",
      "Walk to Empire State Building and Grand Central",
      "Family-run — staff remember your name by day two",
    ],
    nearbyAttractions: [
      { name: "Empire State Building", distance: "0.5 mi" },
      { name: "Grand Central Terminal", distance: "0.6 mi" },
      { name: "Madison Square Park", distance: "0.7 mi" },
    ],
    platforms: ["Expedia", "Booking.com"],
  },

  // ────────────────────── Paris ──────────────────────
  {
    slug: "hotel-de-la-seine-paris",
    name: "Hotel de la Seine",
    destinationSlug: "paris",
    neighborhood: "Saint-Germain-des-Pres",
    stars: 4,
    reviewScore: 9.2,
    reviewCount: 1876,
    pricePerNight: "$245",
    originalPrice: "$299",
    shortDescription: "Boutique Left Bank stay steps from cafes Les Deux Magots and Cafe de Flore.",
    description:
      "Housed in a 17th-century hotel particulier, this intimate property captures the literary Saint-Germain of Hemingway and Beauvoir. Rooms overlook a cobblestone courtyard; breakfast is served under beamed ceilings.",
    gallery: [
      photo("photo-1551218808-94e220e084d2", "Paris hotel facade"),
      photo("photo-1631049307264-da0ec9d70304", "Classic Parisian bedroom"),
      photo("photo-1552566626-52f8b828add9", "Cobblestone courtyard"),
      photo("photo-1520637836862-4d197d17c55a", "Patisserie breakfast"),
      photo("photo-1600891964092-4316c288032e", "Hotel bar"),
    ],
    amenities: ["wifi", "breakfast", "bar", "concierge", "air-conditioning"],
    rooms: [
      {
        name: "Classique",
        description: "Queen bed, marble bath, courtyard view. 200 sq ft.",
        image: UNSPLASH("photo-1631049307264-da0ec9d70304", 800),
        pricePerNight: "$245",
        sleeps: 2,
      },
      {
        name: "Suite Historique",
        description: "Beamed ceilings, separate sitting area, Seine-side view. 430 sq ft.",
        image: UNSPLASH("photo-1591088398332-8a7791972843", 800),
        pricePerNight: "$465",
        sleeps: 3,
      },
    ],
    reviews: [
      {
        quote:
          "Felt like staying in a novel. The courtyard breakfast and five-minute walk to the Louvre made it unforgettable.",
        author: "Verified Booking guest",
        score: 9.4,
      },
    ],
    whyBookHere: [
      "Heart of Saint-Germain — steps from the Seine and Left Bank cafes",
      "Historic 17th-century building with modern updates",
      "Walkable to the Louvre, Notre-Dame, and Musee d'Orsay",
    ],
    nearbyAttractions: [
      { name: "Musee d'Orsay", distance: "0.3 mi" },
      { name: "Louvre Museum", distance: "0.6 mi" },
      { name: "Notre-Dame Cathedral", distance: "0.5 mi" },
      { name: "Luxembourg Gardens", distance: "0.7 mi" },
    ],
    platforms: ["Booking.com", "Hotels.com"],
  },
  {
    slug: "le-marais-boutique-paris",
    name: "Le Marais Boutique",
    destinationSlug: "paris",
    neighborhood: "Le Marais",
    stars: 4,
    reviewScore: 8.9,
    reviewCount: 1342,
    pricePerNight: "$195",
    shortDescription: "Design-forward stay in the Marais with a hidden garden and rooftop terrace.",
    description:
      "A contemporary hideaway in Paris's most fashionable district. Scandinavian-meets-Parisian interiors, a private garden for aperitifs, and a rooftop with rare views of the Pompidou.",
    gallery: [
      photo("photo-1566073771259-6a8506099945", "Marais boutique hotel facade"),
      photo("photo-1540518614846-7eded433c457", "Design bedroom"),
      photo("photo-1568495248636-6432b97bd949", "Private hotel garden"),
      photo("photo-1564501049412-61c2a3083791", "Marais cobblestone street"),
      photo("photo-1445019980597-93fa8acb246c", "Stylish lobby"),
    ],
    amenities: ["wifi", "breakfast", "bar", "concierge", "air-conditioning"],
    rooms: [
      {
        name: "Petite Queen",
        description: "Queen bed, compact bath, garden-facing window. 180 sq ft.",
        image: UNSPLASH("photo-1540518614846-7eded433c457", 800),
        pricePerNight: "$195",
        sleeps: 2,
      },
      {
        name: "Rooftop Suite",
        description: "Private terrace with Pompidou view, soaking tub. 400 sq ft.",
        image: UNSPLASH("photo-1591088398332-8a7791972843", 800),
        pricePerNight: "$420",
        sleeps: 2,
      },
    ],
    reviews: [
      {
        quote:
          "Quietest block in the Marais and a rooftop that we ended up on every night. Concierge booked us a Picasso Museum slot.",
        author: "Verified Booking guest",
        score: 9.0,
      },
    ],
    whyBookHere: [
      "Most walkable district in Paris — galleries, cafes, fashion",
      "Private garden and rooftop terrace",
      "Around the corner from the Picasso and Pompidou",
    ],
    nearbyAttractions: [
      { name: "Centre Pompidou", distance: "0.2 mi" },
      { name: "Picasso Museum", distance: "0.3 mi" },
      { name: "Place des Vosges", distance: "0.4 mi" },
    ],
    platforms: ["Booking.com", "Expedia"],
  },

  // ────────────────────── Tokyo ──────────────────────
  {
    slug: "shinjuku-skyview-tokyo",
    name: "Shinjuku Skyview",
    destinationSlug: "tokyo",
    neighborhood: "Shinjuku",
    stars: 4,
    reviewScore: 9.0,
    reviewCount: 2108,
    pricePerNight: "$175",
    shortDescription: "High-floor rooms overlooking Tokyo's neon core, 6 minutes from Shinjuku Station.",
    description:
      "A modern tower hotel above one of the world's busiest train stations. Rooms from the 20th floor up deliver Blade Runner-level skyline views — especially at dusk when the neon ignites.",
    gallery: [
      photo("photo-1540541338287-41700207dee6", "Shinjuku tower hotel"),
      photo("photo-1590490360182-c33d57733427", "Tokyo high-floor bedroom"),
      photo("photo-1551882547-ff40c63fe5fa", "Shinjuku neon district"),
      photo("photo-1555400038-63f5ba517a47", "Tokyo city view from room"),
      photo("photo-1503899036084-c55cdd92da26", "Shibuya Crossing nearby"),
    ],
    amenities: ["wifi", "restaurant", "bar", "gym", "air-conditioning"],
    rooms: [
      {
        name: "Sky Twin",
        description: "Two single beds, 25th-floor view of Shinjuku. 260 sq ft.",
        image: UNSPLASH("photo-1611892440504-42a792e24d32", 800),
        pricePerNight: "$175",
        sleeps: 2,
      },
      {
        name: "Executive Suite",
        description: "King bed, separate living area, panoramic skyline view. 480 sq ft.",
        image: UNSPLASH("photo-1591088398332-8a7791972843", 800),
        pricePerNight: "$345",
        sleeps: 2,
      },
    ],
    reviews: [
      {
        quote:
          "The view from the 28th floor was unreal at night. Direct access to the station made jet-lagged arrivals painless.",
        author: "Verified Booking guest",
        score: 9.1,
      },
    ],
    whyBookHere: [
      "6 minutes from Shinjuku Station — Tokyo's transit hub",
      "Top-floor rooms with skyline views",
      "On-site 24-hour restaurant and lobby cafe",
    ],
    nearbyAttractions: [
      { name: "Shinjuku Station", distance: "0.4 mi" },
      { name: "Omoide Yokocho alley", distance: "0.5 mi" },
      { name: "Shinjuku Gyoen Garden", distance: "0.8 mi" },
    ],
    platforms: ["Booking.com", "Expedia"],
  },

  // ────────────────────── London ──────────────────────
  {
    slug: "bloomsbury-heritage-london",
    name: "Bloomsbury Heritage",
    destinationSlug: "london",
    neighborhood: "Bloomsbury",
    stars: 4,
    reviewScore: 9.0,
    reviewCount: 1654,
    pricePerNight: "$215",
    originalPrice: "$269",
    shortDescription: "Georgian townhouse hotel between the British Museum and Covent Garden.",
    description:
      "A literary landmark hotel steps from the British Museum, blending Georgian architecture with contemporary British design. Afternoon tea is served daily in the library lounge.",
    gallery: [
      photo("photo-1551882547-ff40c63fe5fa", "Bloomsbury Heritage townhouse"),
      photo("photo-1540518614846-7eded433c457", "Heritage bedroom"),
      photo("photo-1572116469696-31de0f17cc34", "Library lounge"),
      photo("photo-1513026705753-bc3fffca8bf4", "British Museum nearby"),
      photo("photo-1445019980597-93fa8acb246c", "Georgian staircase"),
    ],
    amenities: ["wifi", "breakfast", "bar", "restaurant", "concierge"],
    rooms: [
      {
        name: "Heritage Double",
        description: "Queen bed, period features, walk-in shower. 210 sq ft.",
        image: UNSPLASH("photo-1540518614846-7eded433c457", 800),
        pricePerNight: "$215",
        sleeps: 2,
      },
      {
        name: "Library Suite",
        description: "Two-room suite with writing desk and fireplace. 450 sq ft.",
        image: UNSPLASH("photo-1591088398332-8a7791972843", 800),
        pricePerNight: "$395",
        sleeps: 2,
      },
    ],
    reviews: [
      {
        quote:
          "The afternoon tea and the walk to the British Museum set the tone for the whole London trip.",
        author: "Verified Booking guest",
        score: 9.2,
      },
    ],
    whyBookHere: [
      "Two minutes to the British Museum",
      "Classic afternoon tea served daily",
      "Russell Square and King's Cross within a 10-minute walk",
    ],
    nearbyAttractions: [
      { name: "British Museum", distance: "0.2 mi" },
      { name: "Covent Garden", distance: "0.6 mi" },
      { name: "King's Cross Station", distance: "0.7 mi" },
    ],
    platforms: ["Booking.com", "Hotels.com"],
  },

  // ────────────────────── Cancun ──────────────────────
  {
    slug: "playa-azul-resort-cancun",
    name: "Playa Azul All-Inclusive Resort",
    destinationSlug: "cancun",
    neighborhood: "Hotel Zone",
    stars: 5,
    reviewScore: 9.3,
    reviewCount: 3842,
    pricePerNight: "$345",
    originalPrice: "$449",
    shortDescription: "Beachfront all-inclusive with four pools, seven restaurants, and kids' club.",
    description:
      "A flagship beachfront all-inclusive on the calmest stretch of Cancun's Hotel Zone, with four pools, seven restaurants, nightly entertainment, and a supervised kids' club that frees up parents.",
    gallery: [
      photo("photo-1520250497591-112f2f40a3f4", "Beachfront resort pool"),
      photo("photo-1571003123894-1f0594d2b5d9", "Caribbean beach"),
      photo("photo-1582719478250-c89cae4dc85b", "Resort restaurant"),
      photo("photo-1540541338287-41700207dee6", "Palm-fringed beach"),
      photo("photo-1618773928121-c32242e63f39", "Suite interior"),
      photo("photo-1568495248636-6432b97bd949", "Tropical grounds"),
    ],
    amenities: [
      "wifi",
      "pool",
      "beach",
      "restaurant",
      "bar",
      "spa",
      "gym",
      "family-rooms",
      "concierge",
      "airport-shuttle",
      "air-conditioning",
    ],
    rooms: [
      {
        name: "Deluxe Ocean View",
        description: "King bed, private balcony, direct Caribbean view. 430 sq ft.",
        image: UNSPLASH("photo-1631049307264-da0ec9d70304", 800),
        pricePerNight: "$345",
        sleeps: 3,
      },
      {
        name: "Family Suite",
        description: "Two bedrooms, living area, swim-up access. 780 sq ft.",
        image: UNSPLASH("photo-1591088398332-8a7791972843", 800),
        pricePerNight: "$595",
        sleeps: 5,
      },
    ],
    reviews: [
      {
        quote:
          "Kids' club was a game-changer. We actually got to relax. The seafood restaurant was the standout meal of the trip.",
        author: "Verified Booking guest",
        score: 9.5,
      },
    ],
    whyBookHere: [
      "True all-inclusive — meals, drinks, and activities included",
      "Calmest swimmable beach in Cancun's Hotel Zone",
      "Seven on-site restaurants including adults-only options",
    ],
    nearbyAttractions: [
      { name: "La Isla Shopping Village", distance: "1.5 mi" },
      { name: "Playa Delfines", distance: "2.2 mi" },
      { name: "El Rey Ruins", distance: "2.8 mi" },
    ],
    platforms: ["Booking.com", "Hotels.com"],
  },

  // ────────────────────── Dubai ──────────────────────
  {
    slug: "marina-palm-dubai",
    name: "Marina Palm Hotel",
    destinationSlug: "dubai",
    neighborhood: "Dubai Marina",
    stars: 5,
    reviewScore: 9.2,
    reviewCount: 2918,
    pricePerNight: "$295",
    originalPrice: "$389",
    shortDescription: "Marina-side five-star with infinity pool overlooking the Palm and JBR beach.",
    description:
      "Floor-to-ceiling marina views, an infinity pool on the 34th floor, and walking distance to JBR beach and the marina's promenade dining. Complimentary beach shuttle runs every 20 minutes.",
    gallery: [
      photo("photo-1582672060674-bc2bd808a8f5", "Palm Jumeirah from hotel"),
      photo("photo-1445019980597-93fa8acb246c", "Hotel grand lobby"),
      photo("photo-1571003123894-1f0594d2b5d9", "Infinity pool"),
      photo("photo-1618773928121-c32242e63f39", "Luxury suite"),
      photo("photo-1578683010236-d716f9a3f461", "Rooftop pool view"),
      photo("photo-1518684079-3c830dcef090", "Dubai Marina at night"),
    ],
    amenities: [
      "wifi",
      "pool",
      "beach",
      "spa",
      "gym",
      "restaurant",
      "bar",
      "concierge",
      "airport-shuttle",
      "air-conditioning",
    ],
    rooms: [
      {
        name: "Marina Deluxe",
        description: "King bed, marina view, marble bath with soaking tub. 480 sq ft.",
        image: UNSPLASH("photo-1631049307264-da0ec9d70304", 800),
        pricePerNight: "$295",
        sleeps: 2,
      },
      {
        name: "Panoramic Suite",
        description: "Corner suite with Palm and Marina views. 850 sq ft.",
        image: UNSPLASH("photo-1591088398332-8a7791972843", 800),
        pricePerNight: "$695",
        sleeps: 3,
      },
    ],
    reviews: [
      {
        quote:
          "Infinity pool at sunset = trip highlight. Beach shuttle was frequent and the marina walk right outside was perfect at night.",
        author: "Verified Booking guest",
        score: 9.3,
      },
    ],
    whyBookHere: [
      "34th-floor infinity pool with Palm and Marina views",
      "Complimentary shuttle to JBR beach",
      "Walking distance to Marina Walk restaurants",
    ],
    nearbyAttractions: [
      { name: "JBR Beach", distance: "0.5 mi" },
      { name: "Marina Walk", distance: "0.2 mi" },
      { name: "Palm Jumeirah", distance: "2.8 mi" },
    ],
    platforms: ["Booking.com", "Expedia", "Hotels.com"],
  },

  // ────────────────────── Barcelona ──────────────────────
  {
    slug: "gothic-quarter-hotel-barcelona",
    name: "Gothic Quarter Hotel",
    destinationSlug: "barcelona",
    neighborhood: "Gothic Quarter",
    stars: 4,
    reviewScore: 8.9,
    reviewCount: 1472,
    pricePerNight: "$175",
    shortDescription: "Medieval building reborn as a boutique hotel, minutes from La Rambla.",
    description:
      "A 14th-century building sensitively converted to a contemporary hotel, tucked into Barcelona's Gothic Quarter. Exposed stone walls meet modern Spanish design; tapas bars line the street outside.",
    gallery: [
      photo("photo-1558642452-9d2a7deb7f62", "Gothic Quarter street"),
      photo("photo-1540518614846-7eded433c457", "Modern bedroom with exposed stone"),
      photo("photo-1572116469696-31de0f17cc34", "Stone-walled hotel lounge"),
      photo("photo-1511527661048-7fe73d85e9a4", "La Rambla neighborhood"),
      photo("photo-1445019980597-93fa8acb246c", "Boutique hotel lobby"),
    ],
    amenities: ["wifi", "breakfast", "bar", "concierge", "air-conditioning"],
    rooms: [
      {
        name: "Historic Double",
        description: "Queen bed, stone walls, modern bath. 220 sq ft.",
        image: UNSPLASH("photo-1540518614846-7eded433c457", 800),
        pricePerNight: "$175",
        sleeps: 2,
      },
      {
        name: "Junior Suite",
        description: "Separate sitting area, original wooden beams. 380 sq ft.",
        image: UNSPLASH("photo-1591088398332-8a7791972843", 800),
        pricePerNight: "$295",
        sleeps: 2,
      },
    ],
    reviews: [
      {
        quote:
          "Walked out the door and hit tapas bars within a minute. The staff made incredible local recommendations every single day.",
        author: "Verified Booking guest",
        score: 9.0,
      },
    ],
    whyBookHere: [
      "Literal 14th-century building — not a pastiche",
      "La Rambla and the cathedral within a 5-minute walk",
      "Tapas bars, flamenco venues, and markets all around",
    ],
    nearbyAttractions: [
      { name: "Barcelona Cathedral", distance: "0.1 mi" },
      { name: "La Rambla", distance: "0.2 mi" },
      { name: "Picasso Museum", distance: "0.4 mi" },
    ],
    platforms: ["Booking.com", "Expedia"],
  },

  // ────────────────────── Rome ──────────────────────
  {
    slug: "trastevere-suites-rome",
    name: "Trastevere Suites",
    destinationSlug: "rome",
    neighborhood: "Trastevere",
    stars: 4,
    reviewScore: 9.1,
    reviewCount: 1628,
    pricePerNight: "$195",
    originalPrice: "$249",
    shortDescription: "Cobblestone-lane boutique hotel in Rome's most atmospheric nightlife district.",
    description:
      "Tucked into Trastevere's ivy-draped lanes, this renovated palazzo offers rooftop breakfasts with views of St Peter's dome and a nightly passeggiata just outside the door.",
    gallery: [
      photo("photo-1515542622106-78bda8ba0e5b", "Rome cobblestone street"),
      photo("photo-1540518614846-7eded433c457", "Rome bedroom"),
      photo("photo-1543429776-2782fc8e1acd", "Piazza Navona"),
      photo("photo-1525874684015-58379d421a52", "Roman Forum view"),
      photo("photo-1552832230-c0197dd311b5", "Colosseum exterior"),
      photo("photo-1531572753322-ad063cecc140", "Trevi Fountain at night"),
    ],
    amenities: ["wifi", "breakfast", "bar", "concierge", "air-conditioning"],
    rooms: [
      {
        name: "Classic Double",
        description: "Queen bed, marble bath. 230 sq ft.",
        image: UNSPLASH("photo-1540518614846-7eded433c457", 800),
        pricePerNight: "$195",
        sleeps: 2,
      },
      {
        name: "Rooftop Suite",
        description: "Private terrace with dome views. 400 sq ft.",
        image: UNSPLASH("photo-1591088398332-8a7791972843", 800),
        pricePerNight: "$395",
        sleeps: 3,
      },
    ],
    reviews: [
      {
        quote:
          "Rooftop breakfast with a view of St Peter's dome was magical. Trastevere's evenings just outside were everything we hoped for.",
        author: "Verified Booking guest",
        score: 9.3,
      },
    ],
    whyBookHere: [
      "Rooftop with St Peter's Basilica views",
      "Walk-everywhere location on Rome's prettiest side of the river",
      "Nightlife and restaurants immediately outside",
    ],
    nearbyAttractions: [
      { name: "Santa Maria in Trastevere", distance: "0.1 mi" },
      { name: "Vatican City", distance: "1.0 mi" },
      { name: "Pantheon", distance: "1.1 mi" },
    ],
    platforms: ["Booking.com", "Hotels.com"],
  },

  // ────────────────────── Lisbon ──────────────────────
  {
    slug: "chiado-townhouse-lisbon",
    name: "Chiado Townhouse",
    destinationSlug: "lisbon",
    neighborhood: "Chiado",
    stars: 4,
    reviewScore: 9.0,
    reviewCount: 1104,
    pricePerNight: "$155",
    shortDescription: "Boutique stay with tile-lined facades and rooftop views of the Tagus.",
    description:
      "A townhouse-style hotel wrapped in traditional azulejo tiles, centrally located between Chiado's designer shops and Bairro Alto's nightlife, with a small rooftop bar overlooking the Tagus.",
    gallery: [
      photo("photo-1555881400-74d7acaacd8b", "Lisbon tile street"),
      photo("photo-1540518614846-7eded433c457", "Lisbon bedroom"),
      photo("photo-1558103816-b1e8ffdcecb3", "Alfama rooftops"),
      photo("photo-1588535257637-2bc1ac07ac1c", "Tram 28 passing"),
      photo("photo-1533105079780-92b9be482077", "Pink Street nightlife"),
    ],
    amenities: ["wifi", "breakfast", "bar", "concierge", "air-conditioning"],
    rooms: [
      {
        name: "Townhouse Double",
        description: "Queen bed, azulejo-accent walls. 210 sq ft.",
        image: UNSPLASH("photo-1540518614846-7eded433c457", 800),
        pricePerNight: "$155",
        sleeps: 2,
      },
      {
        name: "Tagus Suite",
        description: "River view, sitting area. 380 sq ft.",
        image: UNSPLASH("photo-1591088398332-8a7791972843", 800),
        pricePerNight: "$295",
        sleeps: 2,
      },
    ],
    reviews: [
      {
        quote:
          "Perfect base — walked everywhere, rode Tram 28 from the corner. Rooftop sunsets over the Tagus nearly every evening.",
        author: "Verified Booking guest",
        score: 9.1,
      },
    ],
    whyBookHere: [
      "Central Chiado location, walk to Bairro Alto and Baixa",
      "Rooftop bar with Tagus River views",
      "Traditional azulejo-tiled facade and interiors",
    ],
    nearbyAttractions: [
      { name: "Santa Justa Lift", distance: "0.2 mi" },
      { name: "Rossio Square", distance: "0.3 mi" },
      { name: "Alfama District", distance: "0.9 mi" },
    ],
    platforms: ["Booking.com", "Expedia"],
  },

  // ────────────────────── Bali ──────────────────────
  {
    slug: "ubud-jungle-retreat-bali",
    name: "Ubud Jungle Retreat",
    destinationSlug: "bali",
    neighborhood: "Ubud",
    stars: 5,
    reviewScore: 9.4,
    reviewCount: 2256,
    pricePerNight: "$255",
    originalPrice: "$339",
    shortDescription: "Rainforest villa resort with private pools and infinity-edge rice paddy views.",
    description:
      "Perched over a river valley outside Ubud, each villa comes with its own plunge pool, open-air bathroom, and unobstructed jungle views. A short walk to rice terraces and a 15-minute drive to central Ubud.",
    gallery: [
      photo("photo-1555400038-63f5ba517a47", "Ubud jungle villa"),
      photo("photo-1526481280693-3bfa7568e0f3", "Infinity pool over rice fields"),
      photo("photo-1537996194471-e657df975ab4", "Rice terrace landscape"),
      photo("photo-1559628233-100c798642d4", "Balinese temple offerings"),
      photo("photo-1546484475-7f7bd55792da", "Tanah Lot sunset"),
      photo("photo-1568495248636-6432b97bd949", "Tropical grounds"),
    ],
    amenities: ["wifi", "pool", "spa", "restaurant", "bar", "concierge", "air-conditioning", "breakfast"],
    rooms: [
      {
        name: "Private Pool Villa",
        description: "King bed, plunge pool, outdoor shower. 750 sq ft.",
        image: UNSPLASH("photo-1631049307264-da0ec9d70304", 800),
        pricePerNight: "$255",
        sleeps: 2,
      },
      {
        name: "Two-Bedroom Retreat",
        description: "Two bedrooms, living pavilion, infinity pool. 1,600 sq ft.",
        image: UNSPLASH("photo-1591088398332-8a7791972843", 800),
        pricePerNight: "$495",
        sleeps: 4,
      },
    ],
    reviews: [
      {
        quote:
          "Waking up to the jungle and a private pool felt unreal. Spa treatments were the best I've had anywhere.",
        author: "Verified Booking guest",
        score: 9.6,
      },
    ],
    whyBookHere: [
      "Every villa has a private plunge pool",
      "Walking access to the Tegallalang rice terraces",
      "Full-service spa with traditional Balinese treatments",
    ],
    nearbyAttractions: [
      { name: "Tegallalang Rice Terraces", distance: "2.1 mi" },
      { name: "Ubud Center", distance: "6.5 mi" },
      { name: "Sacred Monkey Forest", distance: "6.8 mi" },
    ],
    platforms: ["Booking.com", "Hotels.com"],
  },

  // ────────────────────── Bangkok ──────────────────────
  {
    slug: "sukhumvit-skyhigh-bangkok",
    name: "Sukhumvit Skyhigh",
    destinationSlug: "bangkok",
    neighborhood: "Sukhumvit",
    stars: 4,
    reviewScore: 8.8,
    reviewCount: 1720,
    pricePerNight: "$95",
    shortDescription: "Rooftop pool and buzzy Sukhumvit dining scene, steps from the BTS Skytrain.",
    description:
      "A stylish tower hotel connected to Bangkok's BTS network, with a 30th-floor infinity pool, street-food tours with the concierge, and direct access to Sukhumvit's legendary nightlife.",
    gallery: [
      photo("photo-1563492065-1a5c8b6f64f2", "Wat Arun sunset"),
      photo("photo-1540541338287-41700207dee6", "Bangkok tower hotel"),
      photo("photo-1552550049-db097c9480d1", "Bangkok street food"),
      photo("photo-1595659220788-9d8cc2ee9d06", "Tuk-tuk on Sukhumvit"),
      photo("photo-1519996529931-28324d5a630e", "Chao Phraya ferry"),
      photo("photo-1571003123894-1f0594d2b5d9", "Rooftop infinity pool"),
    ],
    amenities: ["wifi", "pool", "gym", "restaurant", "bar", "spa", "concierge", "air-conditioning"],
    rooms: [
      {
        name: "City Room",
        description: "King bed, compact workspace, 20th-floor view. 260 sq ft.",
        image: UNSPLASH("photo-1611892440504-42a792e24d32", 800),
        pricePerNight: "$95",
        sleeps: 2,
      },
      {
        name: "Sky Suite",
        description: "Separate living room, panoramic city view. 520 sq ft.",
        image: UNSPLASH("photo-1591088398332-8a7791972843", 800),
        pricePerNight: "$195",
        sleeps: 3,
      },
    ],
    reviews: [
      {
        quote:
          "Walked out of the hotel directly into the Skytrain station. Rooftop pool was our sunset routine. Great value in a spot that felt way more expensive.",
        author: "Verified Booking guest",
        score: 8.9,
      },
    ],
    whyBookHere: [
      "Connected to BTS Skytrain — skip Bangkok traffic",
      "30th-floor infinity pool with city views",
      "Walkable Sukhumvit dining and markets",
    ],
    nearbyAttractions: [
      { name: "Terminal 21 Mall", distance: "0.3 mi" },
      { name: "Benjakitti Park", distance: "0.6 mi" },
      { name: "Grand Palace (via BTS)", distance: "30 min" },
    ],
    platforms: ["Booking.com", "Expedia"],
  },

  // ────────────────────── Amsterdam ──────────────────────
  {
    slug: "canal-house-amsterdam",
    name: "Canal House Amsterdam",
    destinationSlug: "amsterdam",
    neighborhood: "Canal Belt",
    stars: 4,
    reviewScore: 9.1,
    reviewCount: 1495,
    pricePerNight: "$235",
    originalPrice: "$295",
    shortDescription: "17th-century canal house boutique hotel in the heart of the Grachtengordel.",
    description:
      "Three linked 17th-century canal houses preserved as a boutique hotel, with rooms overlooking the water and a stone-walled garden courtyard. A short walk to the Anne Frank House.",
    gallery: [
      photo("photo-1534351590666-13e3e96c5017", "Amsterdam canal at dusk"),
      photo("photo-1540518614846-7eded433c457", "Canal house bedroom"),
      photo("photo-1586872716462-44a71a9ea88b", "Bicycles on canal bridge"),
      photo("photo-1512470876302-972faa2aa9a4", "Jordaan canal"),
      photo("photo-1445019980597-93fa8acb246c", "Canal house lobby"),
      photo("photo-1568495248636-6432b97bd949", "Hotel garden"),
    ],
    amenities: ["wifi", "breakfast", "bar", "concierge", "air-conditioning"],
    rooms: [
      {
        name: "Canal View Double",
        description: "Queen bed, canal-facing window, beamed ceiling. 215 sq ft.",
        image: UNSPLASH("photo-1540518614846-7eded433c457", 800),
        pricePerNight: "$235",
        sleeps: 2,
      },
      {
        name: "Garden Suite",
        description: "Two-room suite with private garden terrace. 420 sq ft.",
        image: UNSPLASH("photo-1591088398332-8a7791972843", 800),
        pricePerNight: "$445",
        sleeps: 3,
      },
    ],
    reviews: [
      {
        quote:
          "Canal-front window at sunrise was the memory I took home. Staff arranged Anne Frank House tickets we couldn't get ourselves.",
        author: "Verified Booking guest",
        score: 9.3,
      },
    ],
    whyBookHere: [
      "UNESCO canal-belt location in three preserved historic houses",
      "Rooms directly overlook the water",
      "Walking distance to Anne Frank House and Dam Square",
    ],
    nearbyAttractions: [
      { name: "Anne Frank House", distance: "0.3 mi" },
      { name: "Dam Square", distance: "0.5 mi" },
      { name: "Rijksmuseum", distance: "1.0 mi" },
    ],
    platforms: ["Booking.com", "Hotels.com"],
  },
];

export const hotels = hotelList;

export const hotelsBySlug: Record<string, Hotel> = Object.fromEntries(
  hotelList.map((h) => [h.slug, h]),
);

export function getHotel(slug: string): Hotel | undefined {
  return hotelsBySlug[slug];
}

export function getHotelsForDestination(destinationSlug: string): Hotel[] {
  return hotelList.filter((h) => h.destinationSlug === destinationSlug);
}
