import type { Metadata } from "next";
import Link from "next/link";
import BookingSearchWidget from "@/components/BookingSearchWidget";
import TravelPayoutsFlightWidget from "@/components/TravelPayoutsFlightWidget";
import AffiliateBanner from "@/components/AffiliateBanner";
import OptimizedImage from "@/components/OptimizedImage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { AwinPartners } from "@/app/components/AwinPartners";
import { buildAwinLink } from "@/lib/awin";
import { hotels, AMENITY_LABELS, type Hotel } from "@/lib/hotels";
import { destinations, getDestination } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Search Hotel Deals — ReservationsNew",
  description:
    "Search and compare hotel prices across top booking platforms. Find the best deals for your next trip.",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";
const BOOKING_AID = process.env.NEXT_PUBLIC_BOOKING_AID || "YOUR_AID";
const B0ARDING_ID = "116441";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewBadge({ score, count }: { score: number; count: number }) {
  const label =
    score >= 9 ? "Excellent" : score >= 8 ? "Very Good" : score >= 7 ? "Good" : "Pleasant";
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-10 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
        {score.toFixed(1)}
      </div>
      <div>
        <p className="text-xs font-semibold text-foreground">{label}</p>
        <p className="text-[11px] text-text-muted">{count.toLocaleString()} reviews</p>
      </div>
    </div>
  );
}

function filterHotelsByQuery(q: string): Hotel[] {
  if (!q) return hotels;
  const needle = q.toLowerCase();
  const matchedDest = destinations.find(
    (d) =>
      d.name.toLowerCase().includes(needle) ||
      d.slug.toLowerCase().includes(needle) ||
      d.country.toLowerCase().includes(needle),
  );
  if (matchedDest) {
    return hotels.filter((h) => h.destinationSlug === matchedDest.slug);
  }
  return hotels.filter(
    (h) =>
      h.name.toLowerCase().includes(needle) ||
      h.neighborhood.toLowerCase().includes(needle),
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

  const matched = filterHotelsByQuery(query);
  const resultsHotels = matched.length > 0 ? matched : hotels.slice(0, 6);

  const b0ardingDestUrl = `https://b0arding.com/${query ? `?s=${encodeURIComponent(query)}` : ""}`;
  const fastPathDealLink = buildAwinLink(B0ARDING_ID, b0ardingDestUrl);

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
          {matched.length > 0
            ? `Featured Hotels in ${displayQuery}`
            : "Popular Hotels You May Love"}
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          {matched.length > 0
            ? `${matched.length} editor-curated hotel${matched.length === 1 ? "" : "s"} in ${displayQuery}. Click any card for details, photos, and real-time pricing.`
            : "Click any card to see photos, amenities, and real-time pricing on Booking.com."}
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resultsHotels.map((hotel) => {
            const dest = getDestination(hotel.destinationSlug);
            return (
              <article
                key={hotel.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Link href={`/hotels/${hotel.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-gray-100">
                  <OptimizedImage
                    variant="card"
                    src={hotel.gallery[0].src}
                    alt={hotel.gallery[0].alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {hotel.originalPrice && (
                    <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow">
                      Deal
                    </span>
                  )}
                  {dest && (
                    <span className="absolute right-3 top-3 rounded bg-white/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {dest.name}
                    </span>
                  )}
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/hotels/${hotel.slug}`} className="group-hover:text-primary">
                        <h3 className="text-base font-semibold text-foreground">{hotel.name}</h3>
                      </Link>
                      <p className="mt-0.5 text-xs text-text-muted">{hotel.neighborhood}</p>
                    </div>
                    <StarRating count={hotel.stars} />
                  </div>

                  <div className="mt-3">
                    <ReviewBadge score={hotel.reviewScore} count={hotel.reviewCount} />
                  </div>

                  <p className="mt-3 flex-1 text-xs leading-relaxed text-gray-500">
                    {hotel.shortDescription}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {hotel.amenities.slice(0, 3).map((a) => (
                      <span
                        key={a}
                        className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600"
                      >
                        {AMENITY_LABELS[a]}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-2 border-t border-gray-100 pt-4">
                    <div>
                      {hotel.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {hotel.originalPrice}
                        </span>
                      )}
                      <p className="text-lg font-bold text-primary">
                        {hotel.pricePerNight}
                        <span className="text-xs font-normal text-text-muted">/night</span>
                      </p>
                      <p className="mt-0.5 text-[11px] text-text-muted">
                        on {hotel.platforms.join(" · ")}
                      </p>
                    </div>
                    <Link
                      href={`/hotels/${hotel.slug}`}
                      className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white transition hover:bg-accent-hover"
                    >
                      View Deal →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-4 text-center text-[11px] text-gray-400">
          Live pricing and inventory are fetched from our partner booking platforms on the hotel detail page.
        </p>
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
              color: "bg-[#003580]",
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
        {fastPathDealLink && (
          <p className="mt-3 text-[11px] text-gray-400">
            <a
              href={fastPathDealLink}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="hover:underline"
            >
              Browse more partner deals
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
