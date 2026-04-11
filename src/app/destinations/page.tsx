import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Popular Destinations — Compare Hotel Deals Worldwide | ReservationsNew",
  description: "Browse popular travel destinations and compare hotel prices. Find the best deals in New York, Paris, Tokyo, London, Cancun, Dubai, and more.",
};

const destinations = [
  {
    slug: "new-york-city",
    name: "New York City",
    country: "USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80",
    hotels: "2,400+ hotels",
    tagline: "The city that never sleeps",
  },
  {
    slug: "paris",
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    hotels: "1,800+ hotels",
    tagline: "The City of Light",
  },
  {
    slug: "tokyo",
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    hotels: "1,500+ hotels",
    tagline: "Where tradition meets innovation",
  },
  {
    slug: "london",
    name: "London",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
    hotels: "2,100+ hotels",
    tagline: "Centuries of history and culture",
  },
  {
    slug: "cancun",
    name: "Cancun",
    country: "Mexico",
    image: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=600&q=80",
    hotels: "900+ hotels",
    tagline: "Caribbean paradise",
  },
  {
    slug: "dubai",
    name: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    hotels: "1,200+ hotels",
    tagline: "City of superlatives",
  },
];

export default function DestinationsIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Popular Destinations</h1>
        <p className="mt-3 text-lg text-text-muted">
          Explore top-rated hotels in the world&apos;s most visited cities. Click a destination to see deals, tips, and travel guides.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((dest) => (
          <Link
            key={dest.slug}
            href={`/destinations/${dest.slug}`}
            className="group relative overflow-hidden rounded-2xl shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={dest.image}
                alt={`Hotels in ${dest.name}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <h2 className="text-xl font-bold text-white">{dest.name}</h2>
              <p className="text-sm text-gray-200">{dest.country} &mdash; {dest.tagline}</p>
              <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {dest.hotels}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
