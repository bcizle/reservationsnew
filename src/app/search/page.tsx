import type { Metadata } from "next";
import Link from "next/link";
import BookingSearchWidget from "@/components/BookingSearchWidget";
import TravelPayoutsFlightWidget from "@/components/TravelPayoutsFlightWidget";
import AffiliateBanner from "@/components/AffiliateBanner";
import OptimizedImage from "@/components/OptimizedImage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { AwinPartners } from "@/app/components/AwinPartners";
import { buildAwinLink } from "@/lib/awin";

export const metadata: Metadata = {
  title: "Search Hotel Deals — ReservationsNew",
  description:
    "Search and compare hotel prices across top booking platforms. Find the best deals for your next trip.",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";
const BOOKING_AID = process.env.NEXT_PUBLIC_BOOKING_AID || "YOUR_AID";
const B0ARDING_ID = "116441";

const UNSPLASH = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

interface SampleHotel {
  name: string;
  stars: number;
  price: string;
  originalPrice?: string;
  description: string;
  neighborhood: string;
  platform: "Booking.com" | "Expedia" | "Hotels.com";
  image: string;
  amenities: string[];
  reviewScore: number;
  reviewCount: number;
}

const SAMPLE_HOTELS: SampleHotel[] = [
  {
    name: "The Grand Central Hotel",
    stars: 4,
    price: "$189",
    originalPrice: "$239",
    description:
      "Elegant rooms with panoramic city views, rooftop bar, on-site fine dining, and a heated indoor pool.",
    neighborhood: "City Center",
    platform: "Booking.com",
    image: UNSPLASH("photo-1566073771259-6a8506099945"),
    amenities: ["Free Wi-Fi", "Pool", "Fitness Center", "Restaurant"],
    reviewScore: 9.1,
    reviewCount: 2841,
  },
  {
    name: "Park Avenue Inn",
    stars: 3,
    price: "$125",
    description:
      "Comfortable boutique stay steps from top attractions with complimentary breakfast and 24/7 concierge.",
    neighborhood: "Downtown",
    platform: "Expedia",
    image: UNSPLASH("photo-1551882547-ff40c63fe5fa"),
    amenities: ["Free Breakfast", "Free Wi-Fi", "Concierge"],
    reviewScore: 8.3,
    reviewCount: 1204,
  },
  {
    name: "Skyline Suites",
    stars: 4,
    price: "$215",
    originalPrice: "$279",
    description:
      "Spacious all-suite property with full kitchens, separate living areas, and floor-to-ceiling city views.",
    neighborhood: "Financial District",
    platform: "Booking.com",
    image: UNSPLASH("photo-1445019980597-93fa8acb246c"),
    amenities: ["Kitchen", "Free Wi-Fi", "Workspace", "Laundry"],
    reviewScore: 8.9,
    reviewCount: 1867,
  },
  {
    name: "Harbor View Resort & Spa",
    stars: 5,
    price: "$345",
    originalPrice: "$425",
    description:
      "Luxury beachfront resort with private beach access, full-service spa, infinity pool, and four restaurants.",
    neighborhood: "Waterfront",
    platform: "Hotels.com",
    image: UNSPLASH("photo-1520250497591-112f2f40a3f4"),
    amenities: ["Spa", "Beach Access", "Pool", "4 Restaurants"],
    reviewScore: 9.4,
    reviewCount: 3502,
  },
  {
    name: "City Center Hotel",
    stars: 3,
    price: "$98",
    description:
      "Budget-friendly hotel with modern amenities in the heart of the city — a smart pick for short stays.",
    neighborhood: "Old Town",
    platform: "Expedia",
    image: UNSPLASH("photo-1590490360182-c33d57733427"),
    amenities: ["Free Wi-Fi", "24h Front Desk", "AC"],
    reviewScore: 7.8,
    reviewCount: 892,
  },
  {
    name: "The Beachfront",
    stars: 4,
    price: "$275",
    originalPrice: "$329",
    description:
      "Award-winning oceanfront property with infinity pool, sunset terrace, and direct access to the beach.",
    neighborhood: "Beachfront",
    platform: "Booking.com",
    image: UNSPLASH("photo-1571003123894-1f0594d2b5d9"),
    amenities: ["Beach Access", "Infinity Pool", "Bar", "Breakfast"],
    reviewScore: 9.2,
    reviewCount: 2156,
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

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; checkin?: string; checkout?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const displayQuery = query || "your destination";

  const b0ardingDestUrl = `https://b0arding.com/${query ? `?s=${encodeURIComponent(query)}` : ""}`;
  const viewDealLink = buildAwinLink(B0ARDING_ID, b0ardingDestUrl);

  function platformLink(platform: string): string {
    if (platform === "Booking.com") {
      return `https://www.booking.com/searchresults.html?aid=${BOOKING_AID}&ss=${encodeURIComponent(query || "hotels")}`;
    }
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
          Sample listings from our partner platforms — click through to book at the best price.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_HOTELS.map((hotel) => (
            <article
              key={hotel.name}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <OptimizedImage
                  variant="card"
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-full w-full object-cover"
                />
                {hotel.originalPrice && (
                  <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow">
                    Deal
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{hotel.name}</h3>
                    <p className="mt-0.5 text-xs text-text-muted">{hotel.neighborhood}</p>
                  </div>
                  <StarRating count={hotel.stars} />
                </div>

                <div className="mt-3">
                  <ReviewBadge score={hotel.reviewScore} count={hotel.reviewCount} />
                </div>

                <p className="mt-3 flex-1 text-xs leading-relaxed text-gray-500">
                  {hotel.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {hotel.amenities.slice(0, 3).map((a) => (
                    <span
                      key={a}
                      className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600"
                    >
                      {a}
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
                      {hotel.price}
                      <span className="text-xs font-normal text-text-muted">/night</span>
                    </p>
                    <a
                      href={platformLink(hotel.platform)}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="mt-0.5 inline-block text-[11px] text-blue-600 underline-offset-2 hover:underline"
                    >
                      on {hotel.platform}
                    </a>
                  </div>
                  <a
                    href={viewDealLink}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white transition hover:bg-accent-hover"
                  >
                    View Deal →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-center text-[11px] text-gray-400">
          Sample listings shown for demonstration. Live pricing and inventory are fetched from our
          partner booking platforms at checkout.
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
      </div>
    </div>
  );
}
