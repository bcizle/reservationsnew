import type { Metadata } from "next";
import Link from "next/link";
import BookingSearchWidget from "@/components/BookingSearchWidget";
import TravelPayoutsFlightWidget from "@/components/TravelPayoutsFlightWidget";
import AffiliateBanner from "@/components/AffiliateBanner";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Search Hotel Deals — ReservationsNew",
  description: "Search and compare hotel prices across top booking platforms. Find the best deals for your next trip.",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; checkin?: string; checkout?: string }> }) {
  const params = await searchParams;
  const query = params.q || "";
  const displayQuery = query || "your destination";

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
        <TravelPayoutsFlightWidget
          destination={query}
        />
      </div>

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
              url: `https://www.booking.com/searchresults.html?aid=${process.env.NEXT_PUBLIC_BOOKING_AID || "YOUR_AID"}&ss=${encodeURIComponent(query || "hotels")}`,
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
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${platform.color} text-sm font-bold text-white`}>
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
            Finding the best hotel prices requires comparing across multiple booking platforms. Each platform negotiates different rates with hotels, which means the same room can vary in price by 20-40% depending on where you book.
          </p>
          <p>
            We partner with trusted booking platforms like Booking.com, Aviasales, and Economy Bookings to help you find the best rates. When you click through our links and make a booking, we may earn a small commission at no extra cost to you — this is how we keep our service free.
          </p>
          <p>
            <strong>Pro tip:</strong> For the best prices, try to be flexible with your travel dates. Midweek stays and shoulder-season travel can save you up to 50% compared to peak dates.
          </p>
        </div>
      </section>

      {/* Info notice */}
      <div className="mt-10 rounded-xl bg-surface p-6 text-center">
        <p className="text-sm text-text-muted">
          Prices are provided by our affiliate partners and may vary. We compare rates from multiple booking platforms to help you find the best deal.
          <br />
          <Link href="/affiliate-disclosure" className="text-primary underline hover:text-primary-light">Learn how we earn revenue</Link>
        </p>
      </div>
    </div>
  );
}
