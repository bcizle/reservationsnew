import type { Metadata } from "next";
import Link from "next/link";
import BookingSearchWidget from "@/components/BookingSearchWidget";
import TravelPayoutsFlightWidget from "@/components/TravelPayoutsFlightWidget";
import AffiliateBanner from "@/components/AffiliateBanner";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { AwinPartners } from "@/app/components/AwinPartners";
import { buildAwinLink } from "@/lib/awin";

export const metadata: Metadata = {
  title: "Search Hotel Deals — ReservationsNew",
  description: "Search and compare hotel prices across top booking platforms. Find the best deals for your next trip.",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";
const BOOKING_AID = process.env.NEXT_PUBLIC_BOOKING_AID || "YOUR_AID";
const B0ARDING_ID = "116441";

const SAMPLE_HOTELS = [
  {
    name: "Grand Central Hotel",
    stars: 4,
    price: "$189",
    description: "Elegant rooms with city views, free Wi-Fi, and a rooftop bar.",
    platform: "Booking.com",
  },
  {
    name: "Park Avenue Inn",
    stars: 3,
    price: "$125",
    description: "Comfortable stay in a prime location, steps from top attractions.",
    platform: "Expedia",
  },
  {
    name: "Skyline Suites",
    stars: 4,
    price: "$215",
    description: "Spacious suites with panoramic city views and full kitchen facilities.",
    platform: "Booking.com",
  },
  {
    name: "Harbor View Resort",
    stars: 5,
    price: "$345",
    description: "Luxury beachfront resort with private beach access and full-service spa.",
    platform: "Hotels.com",
  },
  {
    name: "City Center Hotel",
    stars: 3,
    price: "$98",
    description: "Budget-friendly hotel with modern amenities in the heart of the city.",
    platform: "Expedia",
  },
  {
    name: "The Beachfront",
    stars: 4,
    price: "$275",
    description: "Award-winning oceanfront property with infinity pool and ocean views.",
    platform: "Booking.com",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <span aria-label={`${count} out of 5 stars`} className="text-sm text-yellow-400">
      {"★".repeat(count)}
      <span className="text-gray-300">{"★".repeat(5 - count)}</span>
    </span>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; checkin?: string; checkout?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const displayQuery = query || "your destination";

  // Affiliate links
  const b0ardingDestUrl = `https://b0arding.com/${query ? `?s=${encodeURIComponent(query)}` : ""}`;
  const viewDealLink = buildAwinLink(B0ARDING_ID, b0ardingDestUrl);

  function platformLink(platform: string): string {
    if (platform === "Booking.com") {
      return `https://www.booking.com/searchresults.html?aid=${BOOKING_AID}&ss=${encodeURIComponent(query || "hotels")}`;
    }
    // Route Expedia / Hotels.com / others through b0arding Awin
    return viewDealLink;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Search", url: `${siteUrl}/search` },
        ]}
      />

      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Hotel deals in {displayQuery}
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Comparing prices across top booking platforms
          {params.checkin && ` for ${params.checkin}`}
          {params.checkout && ` to ${params.checkout}`}
        </p>
      </div>

      <div className="mt-6">
        <AffiliateBanner />
      </div>

      {/* Main affiliate search widgets */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <BookingSearchWidget
          destination={query}
          checkIn={params.checkin}
          checkOut={params.checkout}
        />
        <TravelPayoutsFlightWidget destination={query} />
      </div>

      {/* Hotel listing cards */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-foreground">
          Featured Hotel Deals in {displayQuery}
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Top-rated properties found across our partner booking platforms:
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_HOTELS.map((hotel) => (
            <div
              key={hotel.name}
              className="flex flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold text-foreground">{hotel.name}</h3>
                <span className="shrink-0 text-base font-bold text-primary">
                  {hotel.price}
                  <span className="text-xs font-normal text-text-muted">/night</span>
                </span>
              </div>

              <StarRating count={hotel.stars} />

              <p className="mt-2 flex-1 text-xs leading-relaxed text-gray-500">
                {hotel.description}
              </p>

              <div className="mt-4 flex items-center justify-between gap-2">
                <a
                  href={platformLink(hotel.platform)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="text-xs text-blue-600 underline-offset-2 hover:underline"
                >
                  Found on {hotel.platform}
                </a>
                <a
                  href={viewDealLink}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="rounded-lg bg-accent px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-accent-hover"
                >
                  View Deal →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular booking platforms */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-foreground">Compare Across Top Platforms</h2>
        <p className="mt-2 text-sm text-text-muted">
          Click through to search {displayQuery} on these trusted booking platforms:
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Booking.com",
              description: "28M+ listings, free cancellation on most rooms",
              color: "bg-blue-600",
              url: `https://www.booking.com/searchresults.html?aid=${BOOKING_AID}&ss=${encodeURIComponent(query || "hotels")}`,
            },
            {
              name: "Aviasales",
              description: "Compare flights from 700+ airlines",
              color: "bg-orange-500",
              url: `https://www.aviasales.com/?marker=${process.env.NEXT_PUBLIC_TRAVELPAYOUTS_TOKEN || "YOUR_TOKEN"}`,
            },
            {
              name: "Economy Bookings",
              description: "Compare 900+ car rental companies",
              color: "bg-green-600",
              url: `https://tp.media/r?marker=${process.env.NEXT_PUBLIC_TRAVELPAYOUTS_TOKEN || "YOUR_TOKEN"}&p=7658&u=https%3A%2F%2Fwww.economybookings.com`,
            },
          ].map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 shadow-sm transition hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${platform.color} text-sm font-bold text-white`}
              >
                {platform.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{platform.name}</p>
                <p className="text-xs text-text-muted">{platform.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SEO content section */}
      <section className="mt-12 rounded-xl bg-surface p-8">
        <h2 className="text-lg font-bold text-foreground">How to Find the Best Hotel Deals</h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            Finding the best hotel prices requires comparing across multiple booking platforms. Each
            platform negotiates different rates with hotels, which means the same room can vary in
            price by 20-40% depending on where you book.
          </p>
          <p>
            We partner with trusted booking platforms like Booking.com, Aviasales, and Economy
            Bookings to help you find the best rates. When you click through our links and make a
            booking, we may earn a small commission at no extra cost to you — this is how we keep
            our service free.
          </p>
          <p>
            <strong>Pro tip:</strong> For the best prices, try to be flexible with your travel
            dates. Midweek stays and shoulder-season travel can save you up to 50% compared to peak
            dates.
          </p>
        </div>
      </section>

      {/* Awin partner showcase */}
      <div className="mt-12">
        <AwinPartners />
      </div>

      {/* Info notice */}
      <div className="mt-10 rounded-xl bg-surface p-6 text-center">
        <p className="text-sm text-text-muted">
          Prices are provided by our affiliate partners and may vary. We compare rates from multiple
          booking platforms to help you find the best deal.
          <br />
          <Link
            href="/affiliate-disclosure"
            className="text-primary underline hover:text-primary-light"
          >
            Learn how we earn revenue
          </Link>
        </p>
      </div>
    </div>
  );
}
