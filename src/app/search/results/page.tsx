import type { Metadata } from "next";
import HotelSearchForm from "@/components/HotelSearchForm";
import AffiliateLink from "@/components/AffiliateLink";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { buildBookingLink } from "@/lib/booking";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";

export const metadata: Metadata = {
  title: "Search Results — Hotels",
  description:
    "Search results from our partner inventory. Compare hotels by price, rating, and location.",
  robots: {
    index: false,
    follow: true,
  },
};

interface PlaceholderHotel {
  slug: string;
  name: string;
  stars: number;
  rating: number;
  reviews: number;
  neighborhood: string;
  nightlyPrice: number;
  currency: string;
  blurb: string;
}

const PLACEHOLDER_HOTELS: PlaceholderHotel[] = [
  {
    slug: "the-grand-park-hotel",
    name: "The Grand Park Hotel",
    stars: 5,
    rating: 9.2,
    reviews: 1842,
    neighborhood: "City Center",
    nightlyPrice: 289,
    currency: "USD",
    blurb:
      "Five-star property with rooftop pool, spa, and walking distance to top attractions.",
  },
  {
    slug: "harbor-view-suites",
    name: "Harbor View Suites",
    stars: 4,
    rating: 8.7,
    reviews: 1024,
    neighborhood: "Waterfront",
    nightlyPrice: 184,
    currency: "USD",
    blurb:
      "Suite-style rooms with kitchenettes and harbor views — great for longer stays.",
  },
  {
    slug: "the-corner-boutique",
    name: "The Corner Boutique",
    stars: 4,
    rating: 8.9,
    reviews: 612,
    neighborhood: "Arts District",
    nightlyPrice: 142,
    currency: "USD",
    blurb:
      "Independent boutique with locally curated rooms and a popular ground-floor cafe.",
  },
  {
    slug: "midtown-comfort-inn",
    name: "Midtown Comfort Inn",
    stars: 3,
    rating: 8.1,
    reviews: 2310,
    neighborhood: "Midtown",
    nightlyPrice: 98,
    currency: "USD",
    blurb:
      "Reliable mid-range pick with free breakfast and easy access to public transit.",
  },
];

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{
    dest?: string;
    checkin?: string;
    checkout?: string;
    guests?: string;
    rooms?: string;
  }>;
}) {
  const params = await searchParams;
  const destination = (params.dest ?? "").trim();
  const guests = clampInt(params.guests, 2, 1, 8);
  const rooms = clampInt(params.rooms, 1, 1, 5);
  const nights = countNights(params.checkin, params.checkout);

  const summaryBits: string[] = [];
  if (params.checkin && params.checkout) {
    summaryBits.push(formatDateRange(params.checkin, params.checkout));
  }
  summaryBits.push(`${guests} ${guests === 1 ? "guest" : "guests"}`);
  summaryBits.push(`${rooms} ${rooms === 1 ? "room" : "rooms"}`);

  return (
    <div className="min-h-screen bg-surface">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Search", url: `${siteUrl}/search` },
          { name: "Results", url: `${siteUrl}/search/results` },
        ]}
      />

      {/* Compact search-edit bar at top */}
      <section className="border-b border-gray-100 bg-white px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <HotelSearchForm
            initialDestination={destination}
            initialCheckin={params.checkin}
            initialCheckout={params.checkout}
            initialGuests={guests}
            initialRooms={rooms}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
            {destination
              ? `Searching for hotels in ${destination}…`
              : "Searching for hotels…"}
          </h1>
          <p className="text-sm text-text-muted">{summaryBits.join(" · ")}</p>
        </div>

        {/* Loading shimmer indicator */}
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Fetching live availability
        </div>

        {/* Placeholder result cards */}
        <ol className="mt-8 space-y-4">
          {PLACEHOLDER_HOTELS.map((hotel) => (
            <li
              key={hotel.slug}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="grid sm:grid-cols-[260px_1fr]">
                {/* Photo placeholder */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 sm:aspect-auto sm:h-full sm:min-h-[200px]">
                  <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                    <svg
                      className="h-10 w-10 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        className="flex items-center gap-0.5 text-amber-500"
                        aria-label={`${hotel.stars}-star hotel`}
                      >
                        {Array.from({ length: hotel.stars }).map((_, i) => (
                          <svg
                            key={i}
                            className="h-3.5 w-3.5 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 1.5l2.598 5.86 6.402.516-4.878 4.16 1.498 6.214L10 14.93l-5.62 3.32 1.498-6.214L1 7.876l6.402-.516L10 1.5z" />
                          </svg>
                        ))}
                      </div>
                      <h2 className="mt-1 text-lg font-bold text-foreground">
                        {hotel.name}
                      </h2>
                      <p className="mt-0.5 text-xs text-text-muted">
                        <span className="font-medium text-foreground">
                          {hotel.neighborhood}
                        </span>
                        {destination ? ` · ${destination}` : ""}
                      </p>
                    </div>

                    <div className="hidden shrink-0 text-right sm:block">
                      <p className="text-xs text-text-muted">From</p>
                      <p className="text-xl font-extrabold text-foreground">
                        ${hotel.nightlyPrice}
                      </p>
                      <p className="text-xs text-text-muted">per night</p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {hotel.blurb}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <span className="rounded-md bg-primary px-2 py-0.5 font-bold text-white">
                      {hotel.rating.toFixed(1)}
                    </span>
                    <span className="font-medium text-foreground">
                      {ratingLabel(hotel.rating)}
                    </span>
                    <span className="text-text-muted">
                      · {hotel.reviews.toLocaleString()} reviews
                    </span>
                  </div>

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                    <div className="sm:hidden">
                      <p className="text-xs text-text-muted">From</p>
                      <p className="text-lg font-extrabold text-foreground">
                        ${hotel.nightlyPrice}
                        <span className="text-xs font-normal text-text-muted">
                          {" "}
                          / night
                        </span>
                      </p>
                    </div>
                    <p className="text-xs text-text-muted">
                      {nights > 0
                        ? `~$${(hotel.nightlyPrice * nights).toLocaleString()} for ${nights} ${nights === 1 ? "night" : "nights"}`
                        : "Select dates for total price"}
                    </p>
                    <AffiliateLink
                      href={buildBookingLink(
                        destination || undefined,
                        params.checkin,
                        params.checkout,
                        {
                          label: `reservationsnew-results-${hotel.slug}`,
                          adults: guests,
                        },
                      )}
                      provider="Booking.com"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white transition hover:bg-accent-hover"
                    >
                      View deal
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </AffiliateLink>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 rounded-xl border border-dashed border-gray-200 bg-white p-4 text-center text-xs text-text-muted">
          Showing placeholder results. Live hotel inventory will replace these
          cards once the partner search is connected.
        </p>
      </section>
    </div>
  );
}

function clampInt(
  raw: string | undefined,
  fallback: number,
  min: number,
  max: number,
): number {
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function countNights(checkin?: string, checkout?: string): number {
  if (!checkin || !checkout) return 0;
  const inMs = Date.parse(checkin);
  const outMs = Date.parse(checkout);
  if (!Number.isFinite(inMs) || !Number.isFinite(outMs)) return 0;
  const diff = Math.round((outMs - inMs) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function formatDateRange(checkin: string, checkout: string): string {
  const fmt = (s: string) => {
    const d = new Date(`${s}T00:00:00`);
    if (Number.isNaN(d.getTime())) return s;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };
  return `${fmt(checkin)} – ${fmt(checkout)}`;
}

function ratingLabel(rating: number): string {
  if (rating >= 9) return "Superb";
  if (rating >= 8) return "Very good";
  if (rating >= 7) return "Good";
  return "Review score";
}
