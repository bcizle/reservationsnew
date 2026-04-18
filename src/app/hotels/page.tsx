import type { Metadata } from "next";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
import AffiliateBanner from "@/components/AffiliateBanner";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { hotels } from "@/lib/hotels";
import { getDestination } from "@/lib/destinations";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";

export const metadata: Metadata = {
  title: "Featured Hotels — Curated Stays Worldwide",
  description:
    "Browse our editor-curated selection of hotels in top destinations. Compare rates, amenities, and reviews for stays in New York, Paris, Tokyo, London, and more.",
  alternates: { canonical: `${siteUrl}/hotels` },
  openGraph: {
    title: "Featured Hotels — ReservationsNew",
    description: "Editor-curated hotels in the world's top travel destinations.",
  },
};

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${stars} stars`}>
      {Array.from({ length: stars }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function HotelsIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Hotels", url: `${siteUrl}/hotels` },
        ]}
      />

      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Featured Hotels</p>
        <h1 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
          Editor-curated stays in the world's best cities
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-600">
          Every hotel on this list is hand-picked for its location, service, and value. Compare rates
          across Booking.com, Expedia, and Hotels.com.
        </p>
      </header>

      <AffiliateBanner />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.map((h) => {
          const dest = getDestination(h.destinationSlug);
          return (
            <Link
              key={h.slug}
              href={`/hotels/${h.slug}`}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <OptimizedImage
                  variant="card"
                  src={h.gallery[0].src}
                  alt={h.gallery[0].alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {dest?.name ?? h.destinationSlug}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <StarRating stars={h.stars} />
                  <div className="rounded bg-primary px-1.5 py-0.5 text-xs font-bold text-white">
                    {h.reviewScore.toFixed(1)}
                  </div>
                </div>
                <h2 className="mt-2 text-base font-bold text-foreground group-hover:text-primary">
                  {h.name}
                </h2>
                <p className="mt-1 text-xs text-text-muted">{h.neighborhood}</p>
                <p className="mt-2 line-clamp-2 text-xs text-gray-600">{h.shortDescription}</p>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-text-muted">From</p>
                    <p className="text-lg font-bold text-accent">
                      {h.pricePerNight}
                      <span className="text-[10px] font-normal text-text-muted"> /night</span>
                    </p>
                  </div>
                  <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                    View details &rarr;
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
