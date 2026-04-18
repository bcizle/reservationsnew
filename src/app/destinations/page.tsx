import type { Metadata } from "next";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
import { destinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Popular Destinations — Compare Hotel Deals Worldwide | ReservationsNew",
  description:
    "Browse popular travel destinations and compare hotel prices. Find the best deals in New York, Paris, Tokyo, London, Cancun, Dubai, and more.",
};

export default function DestinationsIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Popular Destinations
        </h1>
        <p className="mt-3 text-lg text-text-muted">
          Explore top-rated hotels in the world&apos;s most visited cities. Click a destination to
          see deals, tips, and travel guides.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((dest) => (
          <Link
            key={dest.slug}
            href={`/destinations/${dest.slug}`}
            className="group relative overflow-hidden rounded-2xl shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <OptimizedImage
                variant="card"
                src={dest.cardImage}
                alt={`Hotels in ${dest.name}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <h2 className="text-xl font-bold text-white">{dest.name}</h2>
              <p className="text-sm text-gray-200">
                {dest.country} &mdash; {dest.tagline}
              </p>
              <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {dest.hotels} hotels
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
