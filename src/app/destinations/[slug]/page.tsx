import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingSearchWidget from "@/components/BookingSearchWidget";
import TravelPayoutsFlightWidget from "@/components/TravelPayoutsFlightWidget";
import TravelPayoutsCarWidget from "@/components/TravelPayoutsCarWidget";
import AffiliateBanner from "@/components/AffiliateBanner";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { AwinPartners } from "@/app/components/AwinPartners";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";

const destinations: Record<string, {
  name: string;
  country: string;
  image: string;
  hotels: string;
  description: string;
  bestTime: string;
  avgPrice: string;
  highlights: string[];
  tips: string[];
  iata?: string;
}> = {
  "new-york-city": {
    name: "New York City",
    country: "USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80",
    hotels: "2,400+",
    description: "The city that never sleeps offers an endless array of accommodation options, from iconic luxury hotels overlooking Central Park to trendy boutique stays in Brooklyn. Whether you are visiting for business, a Broadway show, or exploring world-class museums, New York City has a hotel to match every budget and style.",
    bestTime: "April to June and September to November offer pleasant weather and fewer crowds than peak summer. Fall foliage in Central Park is particularly stunning.",
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
    iata: "NYC",
  },
  "paris": {
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
    hotels: "1,800+",
    description: "Paris, the City of Light, enchants visitors with its timeless architecture, world-renowned cuisine, and unmatched cultural heritage. From elegant hotels along the Champs-Elysees to charming boutique stays in Le Marais, the city offers accommodations as diverse and beautiful as Paris itself.",
    bestTime: "June to August for warm weather and outdoor cafes, or April to May for spring blooms and fewer tourists. September and October offer mild weather and wine harvest season.",
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
    iata: "PAR",
  },
  "tokyo": {
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80",
    hotels: "1,500+",
    description: "Tokyo seamlessly blends ultramodern innovation with ancient tradition. From capsule hotels and futuristic pod accommodations to serene ryokans (traditional Japanese inns) and luxury high-rise hotels with stunning city views, Tokyo delivers an unforgettable stay no matter your preference.",
    bestTime: "March to May for cherry blossom season, or October to November for autumn colors and comfortable temperatures. Avoid the rainy season in June-July.",
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
    iata: "TYO",
  },
  "london": {
    name: "London",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80",
    hotels: "2,100+",
    description: "London is a city where centuries of history meet cutting-edge culture. With hotels ranging from grand heritage properties near Buckingham Palace to modern design hotels in Shoreditch, the British capital caters to every type of traveler and every budget.",
    bestTime: "May to September for the warmest weather and longest days. June is especially lovely with gardens in full bloom. Winter offers lower hotel rates and festive holiday markets.",
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
    iata: "LON",
  },
  "cancun": {
    name: "Cancun",
    country: "Mexico",
    image: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=1200&q=80",
    hotels: "900+",
    description: "Cancun is Mexico's premier beach destination, famous for its turquoise Caribbean waters, white-sand beaches, and vibrant nightlife. The Hotel Zone stretches along a narrow strip of land with all-inclusive resorts and luxury beachfront properties, while downtown Cancun offers more affordable stays with authentic Mexican culture.",
    bestTime: "December to April for dry, sunny weather. May to June offers lower prices with still-good weather. Avoid September-October (hurricane season).",
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
    iata: "CUN",
  },
  "dubai": {
    name: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    hotels: "1,200+",
    description: "Dubai is a city of superlatives — home to the world's tallest building, largest shopping mall, and some of the most luxurious hotels on Earth. From iconic sail-shaped towers to desert glamping experiences, Dubai offers accommodations that redefine hospitality and luxury.",
    bestTime: "November to March for comfortable temperatures (20-30C). Summer months (June-August) are extremely hot but offer the lowest hotel rates — sometimes up to 50% off.",
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
    iata: "DXB",
  },
};

export async function generateStaticParams() {
  return Object.keys(destinations).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dest = destinations[slug];
  if (!dest) return { title: "Destination Not Found" };
  return {
    title: `Hotels in ${dest.name} — Compare ${dest.hotels} Deals`,
    description: `Find the best hotel deals in ${dest.name}, ${dest.country}. Compare prices from top booking sites and save on your next trip. ${dest.hotels} hotels available.`,
    openGraph: {
      title: `Hotels in ${dest.name} — Compare ${dest.hotels} Deals | ReservationsNew`,
      description: `Find the best hotel deals in ${dest.name}, ${dest.country}.`,
      images: [{ url: dest.image, alt: `Hotels in ${dest.name}` }],
    },
    alternates: {
      canonical: `${siteUrl}/destinations/${slug}`,
    },
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = destinations[slug];
  if (!dest) notFound();

  const faqQuestions = [
    { question: `What is the average hotel price in ${dest.name}?`, answer: `Hotel prices in ${dest.name} typically range from ${dest.avgPrice}, depending on the season, location, and hotel category.` },
    { question: `When is the best time to visit ${dest.name}?`, answer: dest.bestTime },
    { question: `How many hotels are available in ${dest.name}?`, answer: `There are ${dest.hotels} hotels and accommodations available in ${dest.name} across all major booking platforms.` },
  ];

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Destinations", url: `${siteUrl}/destinations` },
          { name: dest.name, url: `${siteUrl}/destinations/${slug}` },
        ]}
      />
      <FAQJsonLd questions={faqQuestions} />

      {/* Hero */}
      <div className="relative h-72 sm:h-96">
        <img src={dest.image} alt={`Hotels in ${dest.name}`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 sm:p-10">
          <p className="text-sm font-medium text-blue-200">{dest.country}</p>
          <h1 className="mt-1 text-3xl font-extrabold text-white sm:text-5xl">{dest.name}</h1>
          <span className="mt-2 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            {dest.hotels} hotels available
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Affiliate disclosure */}
        <AffiliateBanner />

        {/* Quick Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-xs font-medium text-text-muted">Average Price</p>
            <p className="mt-1 text-lg font-bold text-foreground">{dest.avgPrice}</p>
          </div>
          <div className="rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-xs font-medium text-text-muted">Best Time to Visit</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{dest.bestTime.split(".")[0]}</p>
          </div>
          <div className="rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-xs font-medium text-text-muted">Hotels Available</p>
            <p className="mt-1 text-lg font-bold text-foreground">{dest.hotels}</p>
          </div>
        </div>

        {/* Booking Widgets */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-foreground mb-4">Search Hotels & Flights in {dest.name}</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <BookingSearchWidget destination={dest.name} />
            <TravelPayoutsFlightWidget destination={dest.iata} />
          </div>
          <div className="mt-6">
            <TravelPayoutsCarWidget destination={dest.name} />
          </div>
        </section>

        {/* About */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-foreground">About {dest.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">{dest.description}</p>
        </section>

        {/* Best Time */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-foreground">Best Time to Visit</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">{dest.bestTime}</p>
        </section>

        {/* Highlights */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-foreground">Top Things to Do</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {dest.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {h}
              </li>
            ))}
          </ul>
        </section>

        {/* Tips */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-foreground">Hotel Booking Tips</h2>
          <ul className="mt-3 space-y-2">
            {dest.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 text-accent">&#9679;</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ Section (for SEO) */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-4">
            {faqQuestions.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-gray-100 p-4">
                <h3 className="text-sm font-semibold text-foreground">{faq.question}</h3>
                <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Awin partner showcase */}
        <div className="mt-12">
          <AwinPartners />
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#0f4c75] to-[#3282b8] p-8 text-center">
          <h3 className="text-xl font-bold text-white">Ready to find your perfect hotel in {dest.name}?</h3>
          <p className="mt-2 text-sm text-blue-100">Compare prices from top booking sites and save.</p>
          <Link
            href={`/search?q=${encodeURIComponent(dest.name)}`}
            className="mt-5 inline-block rounded-lg bg-accent px-8 py-3 text-sm font-bold text-white transition hover:bg-accent-hover"
          >
            Search Hotels in {dest.name}
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link href="/destinations" className="text-sm text-primary underline hover:text-primary-light">
            &larr; View all destinations
          </Link>
        </div>
      </div>
    </div>
  );
}
