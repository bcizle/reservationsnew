export interface DestinationPhoto {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  credit?: string;
}

export interface Destination {
  slug: string;
  name: string;
  country: string;
  iata?: string;
  heroImage: string;
  cardImage: string;
  gallery: DestinationPhoto[];
  hotels: string;
  tagline: string;
  description: string;
  bestTime: string;
  avgPrice: string;
  highlights: string[];
  tips: string[];
  /** City-center coordinates used to center the destination map. */
  coordinates?: { lat: number; lng: number };
  /** Map zoom override. Defaults to 13 when omitted. */
  mapZoom?: number;
}

const UNSPLASH = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

function photo(id: string, alt: string, credit?: string): DestinationPhoto {
  return {
    id,
    src: UNSPLASH(id, 1600),
    thumb: UNSPLASH(id, 400),
    alt,
    credit,
  };
}

const destinationList: Destination[] = [
  {
    slug: "new-york-city",
    name: "New York City",
    country: "USA",
    iata: "NYC",
    heroImage: UNSPLASH("photo-1496442226666-8d4d0e62e6e9", 1920),
    cardImage: UNSPLASH("photo-1496442226666-8d4d0e62e6e9", 800),
    gallery: [
      photo("photo-1496442226666-8d4d0e62e6e9", "Manhattan skyline at dusk"),
      photo("photo-1543716091-a840c05249ec", "Brooklyn Bridge at sunset"),
      photo("photo-1522083165195-3424ed129620", "Times Square at night"),
      photo("photo-1485871981521-5b1fd3805eee", "Central Park looking south toward Midtown"),
      photo("photo-1459262838948-3e2de6c1ec80", "Yellow cabs on a Manhattan avenue"),
      photo("photo-1518391846015-55a9cc003b25", "Statue of Liberty across New York Harbor"),
    ],
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
    gallery: [
      photo("photo-1502602898657-3e91760cbb34", "Eiffel Tower from the Champ de Mars"),
      photo("photo-1499856871958-5b9627545d1a", "Louvre pyramid at sunset"),
      photo("photo-1549144511-f099e773c147", "Notre-Dame Cathedral across the Seine"),
      photo("photo-1431274172761-fca41d930114", "Arc de Triomphe and the Champs-Elysees"),
      photo("photo-1520939817895-060bdaf4fe1b", "Montmartre with Sacre-Coeur in the distance"),
      photo("photo-1541791131578-8a82dc03fe60", "Parisian cafe terrace on a quiet street"),
    ],
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
    gallery: [
      photo("photo-1540959733332-eab4deabeeaf", "Tokyo skyline at dusk"),
      photo("photo-1503899036084-c55cdd92da26", "Shibuya Crossing at night"),
      photo("photo-1493976040374-85c8e12f0c0e", "Senso-ji Temple in Asakusa"),
      photo("photo-1524413840807-0c3cb6fa808d", "Cherry blossoms in Ueno Park"),
      photo("photo-1542051841857-5f90071e7989", "Neon alley in Shinjuku"),
      photo("photo-1480796927426-f609979314bd", "Traditional ryokan interior"),
    ],
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
    gallery: [
      photo("photo-1513635269975-59663e0ac1ad", "Big Ben and Westminster Bridge"),
      photo("photo-1529655683826-aba9b3e77383", "Tower Bridge over the Thames at dusk"),
      photo("photo-1486299267070-83823f5448dd", "Buckingham Palace gates"),
      photo("photo-1520986606214-8b456906c813", "Red double-decker bus on a London street"),
      photo("photo-1513026705753-bc3fffca8bf4", "The British Museum's Great Court"),
      photo("photo-1533929736458-ca588d08c8be", "A row of colorful Notting Hill houses"),
    ],
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
    gallery: [
      photo("photo-1510097467424-192d713fd8b2", "Turquoise Caribbean waters at Cancun beach"),
      photo("photo-1552074284-5e88ef1aef18", "Overwater hotel villa in the Caribbean"),
      photo("photo-1518638150340-f706e86654de", "Chichen Itza Mayan pyramid"),
      photo("photo-1502086223501-7ea6ecd79368", "Isla Mujeres coastline"),
      photo("photo-1581360742512-021d5b2157d9", "Cenote swimming hole near Cancun"),
      photo("photo-1540541338287-41700207dee6", "Palm trees along a white-sand beach"),
    ],
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
    gallery: [
      photo("photo-1512453979798-5ea266f8880c", "Burj Khalifa rising above the Dubai skyline"),
      photo("photo-1582672060674-bc2bd808a8f5", "Palm Jumeirah from above"),
      photo("photo-1518684079-3c830dcef090", "Dubai Marina at night"),
      photo("photo-1548013146-72479768bada", "Dubai desert dunes at sunset"),
      photo("photo-1518544801976-3e159e50e5bb", "Dubai Mall fountains at night"),
      photo("photo-1580674285054-bed31e145f59", "Burj Al Arab hotel on the coastline"),
    ],
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
  {
    slug: "barcelona",
    name: "Barcelona",
    country: "Spain",
    iata: "BCN",
    heroImage: UNSPLASH("photo-1583422409516-2895a77efded", 1920),
    cardImage: UNSPLASH("photo-1583422409516-2895a77efded", 800),
    gallery: [
      photo("photo-1583422409516-2895a77efded", "Sagrada Familia's surreal spires"),
      photo("photo-1539037116277-4db20889f2d4", "Park Guell mosaic bench"),
      photo("photo-1511527661048-7fe73d85e9a4", "La Rambla buzzing at dusk"),
      photo("photo-1562883676-8c7feb83f09b", "Casa Batllo facade"),
      photo("photo-1551634979-2b11f8c946fe", "Barceloneta beach and Mediterranean"),
      photo("photo-1558642452-9d2a7deb7f62", "Gothic Quarter narrow streets"),
    ],
    hotels: "1,600+",
    tagline: "Gaudi, tapas, and Mediterranean sun",
    description:
      "Barcelona pairs Antoni Gaudi's dreamlike architecture with golden beaches and a late-night tapas culture that spills across the Gothic Quarter. Stay in elegant Eixample hotels for the Modernisme landmarks, or choose the seafront for easy access to Barceloneta and the W-style design hotels along the marina.",
    bestTime:
      "May to June and September to October for warm days, swimmable sea, and fewer crowds than July/August. Winters are mild and dramatically cheaper for city-break travelers.",
    avgPrice: "$110 – $300 per night",
    highlights: [
      "Sagrada Familia — Gaudi's still-rising basilica",
      "Park Guell with mosaics and panoramic city views",
      "La Rambla and the Boqueria food market",
      "Gothic Quarter's medieval streets and tapas bars",
      "Camp Nou — home of FC Barcelona",
      "Barceloneta Beach and the revamped seafront",
    ],
    tips: [
      "Book Sagrada Familia, Park Guell, and Casa Batllo tickets ahead — gate prices and queues are brutal.",
      "Hotels in Eixample put you near Gaudi's works and Passeig de Gracia shopping.",
      "Keep valuables zipped — La Rambla and metros have pickpockets.",
      "Dinners start late (9-10pm); hotel tapas concierges can get you into local favorites.",
    ],
  },
  {
    slug: "rome",
    name: "Rome",
    country: "Italy",
    iata: "ROM",
    heroImage: UNSPLASH("photo-1552832230-c0197dd311b5", 1920),
    cardImage: UNSPLASH("photo-1552832230-c0197dd311b5", 800),
    gallery: [
      photo("photo-1552832230-c0197dd311b5", "Colosseum exterior at golden hour"),
      photo("photo-1531572753322-ad063cecc140", "Trevi Fountain at night"),
      photo("photo-1525874684015-58379d421a52", "Roman Forum ruins"),
      photo("photo-1529260830199-42c24126f198", "Vatican City and St Peter's dome"),
      photo("photo-1515542622106-78bda8ba0e5b", "Pantheon columns"),
      photo("photo-1543429776-2782fc8e1acd", "Piazza Navona fountain"),
    ],
    hotels: "1,400+",
    tagline: "Three thousand years of Dolce Vita",
    description:
      "Rome layers empire, renaissance, and modern Italian life onto the same seven hills. Stay near the Spanish Steps for shopping, in Trastevere for cobblestone charm and trattorias, or inside the historic center for a morning walk to the Pantheon before the crowds arrive.",
    bestTime:
      "April, May, and October offer warm weather without the crushing summer heat. August is hot and many Romans leave the city. Winter is quiet with great hotel rates.",
    avgPrice: "$120 – $350 per night",
    highlights: [
      "Colosseum, Roman Forum, and Palatine Hill",
      "Vatican Museums, Sistine Chapel, and St Peter's Basilica",
      "Trevi Fountain and the Spanish Steps",
      "The Pantheon — free to enter, nearly 2000 years old",
      "Trastevere for evening passeggiata and trattorias",
      "Villa Borghese gardens and the adjoining Galleria",
    ],
    tips: [
      "Buy Colosseum/Forum combo tickets in advance — skip-the-line is worth it.",
      "Hotels near Termini station are cheapest but less scenic; historic center costs more but saves you commutes.",
      "Dress codes apply at the Vatican and major churches — shoulders and knees covered.",
      "Tap water from street fountains (nasoni) is drinkable and free.",
    ],
  },
  {
    slug: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    iata: "LIS",
    heroImage: UNSPLASH("photo-1555881400-74d7acaacd8b", 1920),
    cardImage: UNSPLASH("photo-1555881400-74d7acaacd8b", 800),
    gallery: [
      photo("photo-1555881400-74d7acaacd8b", "Tile-fronted Lisbon streets"),
      photo("photo-1588535257637-2bc1ac07ac1c", "Yellow Tram 28 climbing a hill"),
      photo("photo-1580323956657-a60db7b19ee7", "Belem Tower at the Tagus"),
      photo("photo-1558103816-b1e8ffdcecb3", "Alfama rooftops at sunset"),
      photo("photo-1533105079780-92b9be482077", "Pink Street nightlife"),
      photo("photo-1546412414-e1885e51cfa5", "Jeronimos Monastery cloisters"),
    ],
    hotels: "950+",
    tagline: "Azulejo tiles and Atlantic light",
    description:
      "Lisbon charms with hillside neighborhoods, yellow trams, and miradouros (viewpoints) that frame the Tagus River. Stay in Chiado for central access to museums and shopping, Alfama for the historic fado bars, or Principe Real for trendy design hotels near leafy parks.",
    bestTime:
      "March to May and September to October for warm, dry weather and manageable crowds. Summers are hot but breezy; winters mild and bargain-priced.",
    avgPrice: "$90 – $260 per night",
    highlights: [
      "Alfama district and Castelo de Sao Jorge",
      "Belem Tower and the Jeronimos Monastery",
      "Tram 28 — a rolling tour of Lisbon's hills",
      "LX Factory creative quarter",
      "Pasteis de Belem — the original custard tart",
      "Day trip to Sintra's Pena Palace",
    ],
    tips: [
      "Comfortable shoes matter — Lisbon is steep and paved in slick calcada stones.",
      "The Lisboa Card covers transit and major museums if you're sightseeing heavily.",
      "Book Sintra visits early morning to beat tour-bus arrivals.",
      "Dinner is late and long — plan accordingly.",
    ],
  },
  {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    iata: "DPS",
    heroImage: UNSPLASH("photo-1537996194471-e657df975ab4", 1920),
    cardImage: UNSPLASH("photo-1537996194471-e657df975ab4", 800),
    gallery: [
      photo("photo-1537996194471-e657df975ab4", "Tegallalang rice terraces"),
      photo("photo-1546484475-7f7bd55792da", "Tanah Lot temple silhouette"),
      photo("photo-1555400038-63f5ba517a47", "Ubud jungle villa"),
      photo("photo-1539367628448-4bc5c9d171c8", "Uluwatu cliffs and surf"),
      photo("photo-1559628233-100c798642d4", "Balinese temple offerings"),
      photo("photo-1526481280693-3bfa7568e0f3", "Infinity pool overlooking rice fields"),
    ],
    hotels: "1,100+",
    tagline: "Island of temples, rice terraces, and surf",
    description:
      "Bali blends Hindu temple culture with world-class surf breaks, jungle wellness retreats, and cliffside resorts. Choose Ubud for yoga and rice-paddy villas, Seminyak for buzzy beach clubs, Uluwatu for dramatic cliffs, or Sanur for calmer family-friendly shores.",
    bestTime:
      "April to October is the dry season — sunny days, less humidity, and the best surf. November to March is green and lush but rainy, with steep discounts on luxury villas.",
    avgPrice: "$50 – $400 per night",
    highlights: [
      "Tanah Lot and Uluwatu clifftop temples",
      "Tegallalang rice terraces outside Ubud",
      "Surfing at Kuta, Canggu, and Uluwatu",
      "Mount Batur sunrise hike",
      "Ubud Monkey Forest and Saraswati Temple",
      "Nusa Penida day trip — Kelingking Beach",
    ],
    tips: [
      "Villa stays with private pools are often cheaper than similarly rated hotels.",
      "Rent a scooter only if you're experienced — Bali traffic is unforgiving.",
      "Dress code matters at temples: sarong and sash, usually provided at the entry.",
      "Book Nusa Penida tours a day ahead — boats sell out in high season.",
    ],
  },
  {
    slug: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    iata: "BKK",
    heroImage: UNSPLASH("photo-1508009603885-50cf7c579365", 1920),
    cardImage: UNSPLASH("photo-1508009603885-50cf7c579365", 800),
    gallery: [
      photo("photo-1508009603885-50cf7c579365", "Wat Arun at sunset"),
      photo("photo-1508009603885-50cf7c579365", "Grand Palace spires"),
      photo("photo-1552550049-db097c9480d1", "Bangkok street food stall"),
      photo("photo-1595659220788-9d8cc2ee9d06", "Tuk-tuks on a busy Bangkok street"),
      photo("photo-1519996529931-28324d5a630e", "Chao Phraya river ferry"),
      photo("photo-1520731722483-c5a6c8e8a2cb", "Floating market long-tail boat"),
    ],
    hotels: "1,800+",
    tagline: "Street food capital of Asia",
    description:
      "Bangkok runs on contrast: gilded temples beside glass-tower rooftop bars, century-old markets under elevated BTS tracks. Stay in Sukhumvit for modern hotels and nightlife, Silom for business with nearby shopping, or Rattanakosin for historic temples at your doorstep.",
    bestTime:
      "November to February is cool and dry — the most comfortable months. March to May gets extremely hot; June to October is the rainy season but bargains abound.",
    avgPrice: "$40 – $250 per night",
    highlights: [
      "Grand Palace and Wat Phra Kaew (Temple of the Emerald Buddha)",
      "Wat Arun and Wat Pho (Reclining Buddha)",
      "Chatuchak Weekend Market — 15,000+ stalls",
      "Chao Phraya river cruises and canal tours",
      "Street food on Yaowarat Road (Chinatown)",
      "Rooftop bars at Lebua and Vertigo",
    ],
    tips: [
      "Use the BTS Skytrain and MRT to bypass notorious traffic.",
      "Dress modestly at temples — shoulders covered, long pants/skirts.",
      "Negotiate tuk-tuk fares before getting in; taxis are often cheaper by meter.",
      "Dont drink tap water; ice at established restaurants is fine.",
    ],
  },
  {
    slug: "amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    iata: "AMS",
    heroImage: UNSPLASH("photo-1586872716462-44a71a9ea88b", 1920),
    cardImage: UNSPLASH("photo-1586872716462-44a71a9ea88b", 800),
    gallery: [
      photo("photo-1586872716462-44a71a9ea88b", "Canal-side townhouses at dusk"),
      photo("photo-1586872716462-44a71a9ea88b", "Bicycles on a canal bridge"),
      photo("photo-1512470876302-972faa2aa9a4", "Jordaan neighborhood canal"),
      photo("photo-1512495039889-52a3b799c9bc", "Vondelpark in autumn"),
      photo("photo-1583344464898-d53f9b0d80d7", "Tulip fields near Amsterdam"),
      photo("photo-1576924542622-772281b13aa8", "Rijksmuseum exterior"),
    ],
    hotels: "900+",
    tagline: "Canals, cafes, and cycling culture",
    description:
      "Amsterdam's UNESCO-listed canal ring is made for slow wandering — cross a bridge every block, duck into a brown cafe, browse world-class museums by afternoon. Stay in the Canal Belt for quintessential views, Jordaan for small boutique stays, or De Pijp for markets and a livelier food scene.",
    bestTime:
      "April to May catches tulip season and mild weather. June to August is peak — expect crowds. September to October brings fall color, lower rates, and museum season.",
    avgPrice: "$130 – $350 per night",
    highlights: [
      "Van Gogh Museum and Rijksmuseum",
      "Anne Frank House (book weeks ahead)",
      "Jordaan district and the Nine Little Streets",
      "Canal cruises through the Grachtengordel",
      "Vondelpark bike ride",
      "Day trip to Keukenhof tulip gardens (spring)",
    ],
    tips: [
      "Anne Frank House tickets sell out weeks in advance — reserve early.",
      "Trams run everywhere; the OV-chipkaart or contactless card is easiest.",
      "Watch for bike lanes — they have right of way, and locals ride fast.",
      "Museums close Mondays at several major venues; plan accordingly.",
    ],
  },
];

// City-center coordinates for destination maps. Kept in a side table so the
// main destination definitions stay compact.
const DESTINATION_COORDS: Record<string, { lat: number; lng: number; zoom?: number }> = {
  "new-york-city": { lat: 40.7580, lng: -73.9855, zoom: 13 },
  paris: { lat: 48.8566, lng: 2.3522, zoom: 13 },
  tokyo: { lat: 35.6895, lng: 139.6917, zoom: 12 },
  london: { lat: 51.5074, lng: -0.1278, zoom: 12 },
  cancun: { lat: 21.1619, lng: -86.8515, zoom: 12 },
  dubai: { lat: 25.0772, lng: 55.1304, zoom: 12 },
  barcelona: { lat: 41.3874, lng: 2.1686, zoom: 13 },
  rome: { lat: 41.9028, lng: 12.4964, zoom: 13 },
  lisbon: { lat: 38.7223, lng: -9.1393, zoom: 13 },
  bali: { lat: -8.5069, lng: 115.2625, zoom: 11 },
  bangkok: { lat: 13.7563, lng: 100.5018, zoom: 12 },
  amsterdam: { lat: 52.3676, lng: 4.9041, zoom: 13 },
};

for (const d of destinationList) {
  const coords = DESTINATION_COORDS[d.slug];
  if (coords && !d.coordinates) {
    d.coordinates = { lat: coords.lat, lng: coords.lng };
    if (coords.zoom) d.mapZoom = coords.zoom;
  }
}

export const destinationsBySlug: Record<string, Destination> = Object.fromEntries(
  destinationList.map((d) => [d.slug, d]),
);

export const destinations = destinationList;

export function getDestination(slug: string): Destination | undefined {
  return destinationsBySlug[slug];
}

/**
 * Common name aliases that should resolve to one of our 12 destinations.
 * Lowercase keys, slug values.
 */
const DESTINATION_ALIASES: Record<string, string> = {
  "new york": "new-york-city",
  "new york city": "new-york-city",
  nyc: "new-york-city",
  manhattan: "new-york-city",
  brooklyn: "new-york-city",
  "paris france": "paris",
  "tokyo japan": "tokyo",
  "london uk": "london",
  "london england": "london",
  "barcelona spain": "barcelona",
  "rome italy": "rome",
  "lisbon portugal": "lisbon",
  "bali indonesia": "bali",
  ubud: "bali",
  seminyak: "bali",
  "bangkok thailand": "bangkok",
  "amsterdam netherlands": "amsterdam",
  "amsterdam holland": "amsterdam",
  "cancún": "cancun",
  "cancun mexico": "cancun",
  "dubai uae": "dubai",
};

/**
 * Try to match a free-text query to one of our 12 curated destinations.
 * Returns null if there's no good match — callers should treat that as
 * a "we don't have a guide for this city" case.
 */
export function matchDestination(query: string): Destination | null {
  if (!query) return null;
  const needle = query.trim().toLowerCase().replace(/\s+/g, " ");

  // Exact match
  const exact = destinationList.find(
    (d) =>
      d.name.toLowerCase() === needle ||
      d.slug === needle ||
      d.slug.replace(/-/g, " ") === needle,
  );
  if (exact) return exact;

  // Alias match
  const aliasSlug = DESTINATION_ALIASES[needle];
  if (aliasSlug) return destinationsBySlug[aliasSlug] ?? null;

  // First-token match (e.g. "Paris, France" → "paris")
  const firstToken = needle.split(/[,\s]/)[0];
  if (firstToken && firstToken !== needle) {
    const aliased = DESTINATION_ALIASES[firstToken];
    if (aliased) return destinationsBySlug[aliased] ?? null;
    const byName = destinationList.find(
      (d) => d.name.toLowerCase() === firstToken || d.slug === firstToken,
    );
    if (byName) return byName;
  }

  // Substring match — name contains query (e.g. "tokyo" matches "Tokyo")
  // Only allow when the needle is at least 4 chars to avoid false positives.
  if (needle.length >= 4) {
    const partial = destinationList.find(
      (d) =>
        d.name.toLowerCase().includes(needle) ||
        d.country.toLowerCase().includes(needle) ||
        needle.includes(d.name.toLowerCase()),
    );
    if (partial) return partial;
  }

  return null;
}
