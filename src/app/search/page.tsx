import type { Metadata } from "next";
import Link from "next/link";
import BookingSearchWidget from "@/components/BookingSearchWidget";
import TravelPayoutsFlightWidget from "@/components/TravelPayoutsFlightWidget";
import TravelPayoutsCarWidget from "@/components/TravelPayoutsCarWidget";
import AffiliateBanner from "@/components/AffiliateBanner";
import OptimizedImage from "@/components/OptimizedImage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { AwinPartners } from "@/app/components/AwinPartners";
import { destinations } from "@/lib/destinations";
import { buildBookingLink } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Search Hotel Deals on Booking.com — ReservationsNew",
  description:
    "Hotel prices powered by Booking.com. Search 28+ million accommodations worldwide with free cancellation, verified reviews, and live availability.",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";

function findMatchingDestination(q: string) {
  if (!q) return null;
  const needle = q.toLowerCase();
  return (
    destinations.find(
      (d) =>
        d.name.toLowerCase() === needle ||
        d.slug === needle ||
        d.slug.replace(/-/g, " ") === needle,
    ) ??
    destinations.find(
      (d) =>
        d.name.toLowerCase().includes(needle) ||
        d.country.toLowerCase().includes(needle),
    ) ??
    null
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; checkin?: string; checkout?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const displayQuery = query || "your destination";

  const matchedDest = findMatchingDestination(query);
  const bookingUrl = buildBookingLink(query, params.checkin, params.checkout, {
    label: "reservationsnew-search",
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Search", url: `${siteUrl}/search` },
        ]}
      />

      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#003580]/20 bg-[#003580]/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#003580]">
          <span className="flex h-4 w-4 items-center justify-center rounded bg-[#003580] text-[10px] font-extrabold text-white">B</span>
          Hotel prices powered by Booking.com
        </div>
        <h1 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">
          {query ? `Hotels in ${displayQuery}` : "Find your next hotel"}
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          As a Booking.com Affiliate, we earn from qualifying transactions — at no extra cost to you.
          {params.checkin && ` Check-in ${params.checkin}.`}
          {params.checkout && ` Check-out ${params.checkout}.`}
        </p>
      </div>

      <div className="mt-6">
        <AffiliateBanner />
      </div>

      {/* Primary CTA: Booking.com search */}
      <section className="mt-8 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-white p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#003580]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#003580]">
              Powered by Booking.com
            </div>
            <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
              {query ? `See live prices in ${displayQuery}` : "Search 28+ million stays worldwide"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Real-time availability and pricing from Booking.com — the world&apos;s largest
              accommodation platform. Free cancellation on most rooms, verified guest reviews,
              and instant confirmation.
            </p>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#003580] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#002255]"
            >
              {query ? `View hotels in ${displayQuery}` : "Search on Booking.com"}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
          <div className="hidden shrink-0 rounded-xl border border-blue-100 bg-white p-5 text-sm text-gray-600 shadow-sm sm:block">
            <p className="font-semibold text-foreground">What you get</p>
            <ul className="mt-2 space-y-1.5 text-xs">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span> 28M+ accommodation listings
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span> Free cancellation on most rooms
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span> Verified guest reviews
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span> Best price guarantee
              </li>
            </ul>
          </div>
        </div>
      </section>

      {matchedDest && (
        <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="relative h-40 w-full overflow-hidden rounded-xl sm:h-32 sm:w-48 sm:shrink-0">
              <OptimizedImage
                variant="card"
                src={matchedDest.cardImage}
                alt={`Hotels in ${matchedDest.name}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Destination guide
              </p>
              <h3 className="mt-1 text-lg font-bold text-foreground">
                Travel guide for {matchedDest.name}, {matchedDest.country}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{matchedDest.tagline}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-text-muted">
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5">
                  {matchedDest.avgPrice}
                </span>
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5">
                  {matchedDest.hotels} hotels
                </span>
              </div>
              <Link
                href={`/destinations/${matchedDest.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-primary hover:text-primary-light"
              >
                Read the {matchedDest.name} guide &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Secondary widgets: flights & cars */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-foreground">Round out your trip</h2>
        <p className="mt-2 text-sm text-text-muted">
          Compare flights and car rentals from our travel partners.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <BookingSearchWidget
            destination={query}
            checkIn={params.checkin}
            checkOut={params.checkout}
          />
          <TravelPayoutsFlightWidget destination={query} />
        </div>
        <div className="mt-6">
          <TravelPayoutsCarWidget destination={query} />
        </div>
      </section>

      {/* Popular destinations */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-foreground">
          {query ? "Or explore other destinations" : "Popular destinations"}
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Read in-depth travel guides for top cities around the world.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.slice(0, 6).map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <OptimizedImage
                  variant="card"
                  src={dest.cardImage}
                  alt={`Hotels in ${dest.name}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="text-base font-bold text-white">{dest.name}</p>
                  <p className="text-xs text-blue-100">{dest.country}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/destinations"
            className="text-sm font-semibold text-primary underline hover:text-primary-light"
          >
            View all destinations &rarr;
          </Link>
        </div>
      </section>

      {/* SEO content section */}
      <section className="mt-12 rounded-xl bg-surface p-8">
        <h2 className="text-lg font-bold text-foreground">How to find the best hotel deals</h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            Hotel pricing varies widely between booking platforms — the same room can cost
            20% to 40% more or less depending on where you book. We help you cut through that
            noise by sending your search directly to Booking.com, which tracks live availability
            for over 28 million properties worldwide.
          </p>
          <p>
            <strong>Be flexible with dates.</strong> Midweek stays and shoulder-season travel
            often save 30–50% over weekend or peak-season rates. If your dates have any wiggle
            room, try a few combinations on the search above.
          </p>
          <p>
            <strong>Filter by free cancellation.</strong> When you&apos;re early in trip
            planning, locking in a refundable rate gives you upside if prices drop later.
          </p>
          <p>
            When you click through our links and book, we may earn a small commission at no
            extra cost to you. That&apos;s how we keep the site free —{" "}
            <Link href="/affiliate-disclosure" className="text-primary underline hover:text-primary-light">
              read our full affiliate disclosure
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Awin partner showcase */}
      <div className="mt-12">
        <AwinPartners />
      </div>
    </div>
  );
}
