import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";

function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .map((s) => (s.length ? s[0].toUpperCase() + s.slice(1) : s))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = humanizeSlug(slug);
  return {
    title: `${name} — Hotel Details`,
    description: `Photos, room types, amenities, and current pricing for ${name}. Compare room options and book at the best available price.`,
    alternates: {
      canonical: `${siteUrl}/hotels/${slug}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

interface PlaceholderRoom {
  id: string;
  name: string;
  bed: string;
  capacity: string;
  cancellation: string;
  breakfast: boolean;
  nightlyPrice: number;
}

const PLACEHOLDER_ROOMS: PlaceholderRoom[] = [
  {
    id: "standard-double",
    name: "Standard Double Room",
    bed: "1 queen bed",
    capacity: "Sleeps 2",
    cancellation: "Free cancellation until 24h before check-in",
    breakfast: false,
    nightlyPrice: 142,
  },
  {
    id: "deluxe-king",
    name: "Deluxe King Room",
    bed: "1 king bed",
    capacity: "Sleeps 2",
    cancellation: "Free cancellation until 48h before check-in",
    breakfast: true,
    nightlyPrice: 189,
  },
  {
    id: "family-suite",
    name: "Family Suite",
    bed: "1 king bed + 2 twin beds",
    capacity: "Sleeps 4",
    cancellation: "Free cancellation until 48h before check-in",
    breakfast: true,
    nightlyPrice: 268,
  },
];

const PLACEHOLDER_AMENITIES = [
  "Free Wi-Fi",
  "24-hour front desk",
  "Air conditioning",
  "Fitness center",
  "Rooftop pool",
  "On-site restaurant",
  "Concierge",
  "Family rooms",
];

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = humanizeSlug(slug);

  return (
    <div className="min-h-screen bg-surface">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Search", url: `${siteUrl}/search` },
          { name, url: `${siteUrl}/hotels/${slug}` },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/search"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-light"
        >
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to search
        </Link>
      </div>

      {/* Photo gallery placeholder */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-2 sm:grid-cols-4 sm:grid-rows-2 sm:gap-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 sm:col-span-2 sm:row-span-2 sm:aspect-auto">
            <PhotoPlaceholder large />
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="relative hidden aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 sm:block"
            >
              <PhotoPlaceholder />
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto mt-8 grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div>
          {/* Hotel name + description */}
          <header>
            <div className="flex items-center gap-0.5 text-amber-500" aria-label="5-star hotel">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 1.5l2.598 5.86 6.402.516-4.878 4.16 1.498 6.214L10 14.93l-5.62 3.32 1.498-6.214L1 7.876l6.402-.516L10 1.5z" />
                </svg>
              ))}
            </div>
            <h1 className="mt-1 text-3xl font-extrabold text-foreground sm:text-4xl">
              {name}
            </h1>
            <p className="mt-1 text-sm text-text-muted">
              City Center · Walkable to top attractions
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-white">
                9.2
              </span>
              <span className="font-semibold text-foreground">Superb</span>
              <span className="text-xs text-text-muted">· 1,842 reviews</span>
            </div>
          </header>

          <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-foreground">About this hotel</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Hotel description will appear here once the partner inventory is
              connected. Expect a few sentences covering style, location, and
              what makes the property stand out — pool, rooftop bar, design,
              service quality, neighborhood vibe.
            </p>
          </section>

          {/* Amenities */}
          <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-foreground">Amenities</h2>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700 sm:grid-cols-3">
              {PLACEHOLDER_AMENITIES.map((amenity) => (
                <li key={amenity} className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 shrink-0 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {amenity}
                </li>
              ))}
            </ul>
          </section>

          {/* Rooms */}
          <section className="mt-6">
            <h2 className="text-xl font-bold text-foreground">Available rooms</h2>
            <p className="mt-1 text-sm text-text-muted">
              Pick the room that fits your trip. Cancellation and breakfast
              policies vary by rate.
            </p>
            <div className="mt-4 space-y-4">
              {PLACEHOLDER_ROOMS.map((room) => (
                <article
                  key={room.id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="grid gap-4 p-5 sm:grid-cols-[1fr_220px] sm:items-center">
                    <div>
                      <h3 className="text-base font-bold text-foreground">
                        {room.name}
                      </h3>
                      <p className="mt-1 text-xs text-text-muted">
                        {room.bed} · {room.capacity}
                      </p>
                      <ul className="mt-3 space-y-1 text-xs text-gray-700">
                        <li className="flex items-center gap-1.5">
                          <span className="text-emerald-600">✓</span>
                          {room.cancellation}
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span
                            className={
                              room.breakfast ? "text-emerald-600" : "text-gray-400"
                            }
                          >
                            {room.breakfast ? "✓" : "—"}
                          </span>
                          {room.breakfast
                            ? "Breakfast included"
                            : "Breakfast not included"}
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-col items-stretch gap-2 sm:items-end sm:text-right">
                      <div>
                        <p className="text-xs text-text-muted">From</p>
                        <p className="text-xl font-extrabold text-foreground">
                          ${room.nightlyPrice}
                          <span className="text-xs font-normal text-text-muted">
                            {" "}
                            / night
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled
                        className="cursor-not-allowed rounded-lg bg-accent/60 px-5 py-2.5 text-sm font-bold text-white"
                      >
                        Book this room
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky booking sidebar */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-text-muted">
              Lowest available rate
            </p>
            <p className="mt-1 text-3xl font-extrabold text-foreground">$142</p>
            <p className="text-xs text-text-muted">per night, taxes included</p>

            <div className="mt-4 space-y-2 text-xs text-gray-700">
              <div className="flex items-center justify-between">
                <span>Check-in</span>
                <span className="font-medium text-foreground">Select date</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Check-out</span>
                <span className="font-medium text-foreground">Select date</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Guests</span>
                <span className="font-medium text-foreground">2 guests</span>
              </div>
            </div>

            <button
              type="button"
              disabled
              className="mt-4 w-full cursor-not-allowed rounded-lg bg-accent/60 px-5 py-3 text-sm font-bold text-white"
            >
              Choose a room
            </button>

            <p className="mt-3 text-center text-[11px] leading-relaxed text-text-muted">
              Booking placeholder. Live availability and checkout will be wired
              up to the partner API.
            </p>
          </div>
        </aside>
      </div>

      <p className="mx-auto mt-10 max-w-6xl px-4 pb-12 text-center text-xs text-text-muted sm:px-6 lg:px-8">
        This page is a placeholder. Hotel content, photos, and pricing will
        come from the partner inventory once API access is connected.
      </p>
    </div>
  );
}

function PhotoPlaceholder({ large = false }: { large?: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-text-muted">
      <svg
        className={large ? "h-14 w-14 opacity-40" : "h-8 w-8 opacity-40"}
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
  );
}
