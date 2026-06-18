import type { Metadata } from "next";
import HotelSearchForm from "@/components/HotelSearchForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";

export const metadata: Metadata = {
  title: "Search Hotels — Compare 2.9M+ Properties Worldwide",
  description:
    "Search hotels by destination, dates, guests, and rooms. Compare real prices, photos, and availability across hundreds of thousands of properties worldwide.",
  alternates: {
    canonical: `${siteUrl}/search`,
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    dest?: string;
    q?: string;
    checkin?: string;
    checkout?: string;
    guests?: string;
    rooms?: string;
  }>;
}) {
  const params = await searchParams;
  const initialDestination = (params.dest ?? params.q ?? "").trim();
  const initialGuests = clampInt(params.guests, 2, 1, 8);
  const initialRooms = clampInt(params.rooms, 1, 1, 5);

  return (
    <div className="min-h-screen bg-surface">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Search", url: `${siteUrl}/search` },
        ]}
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f4c75] via-[#1b6ca8] to-[#3282b8] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Find Your Next Hotel
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-blue-100 sm:text-base">
            Search hotels worldwide. Compare prices, photos, and amenities to
            find the right stay for your trip.
          </p>

          <div className="mt-6 sm:mt-8">
            <HotelSearchForm
              initialDestination={initialDestination}
              initialCheckin={params.checkin}
              initialCheckout={params.checkout}
              initialGuests={initialGuests}
              initialRooms={initialRooms}
            />
          </div>

          <p className="mt-3 text-center text-xs text-blue-200">
            Search powered by our partner inventory of 2.9M+ properties.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          How search works
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Tell us where and when",
              copy: "Enter a destination, your dates, and how many guests and rooms you need.",
            },
            {
              step: "2",
              title: "Compare hotels",
              copy: "Browse hotels with photos, ratings, and prices side by side.",
            },
            {
              step: "3",
              title: "Pick your room",
              copy: "Choose your room type and book at the best available price.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {item.step}
              </div>
              <h3 className="mt-3 text-base font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
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
