// v1.0.3
import Link from "next/link";
import SearchWidget from "@/components/SearchWidget";
import OptimizedImage from "@/components/OptimizedImage";
import { AwinPartners } from "@/app/components/AwinPartners";
import { BookingPartners } from "@/app/components/BookingPartners";
import { destinations } from "@/lib/destinations";

const BOOKING_AID = process.env.NEXT_PUBLIC_BOOKING_AID || "";
const bookingCtaUrl = BOOKING_AID
  ? `https://www.booking.com/index.html?aid=${BOOKING_AID}&label=reservationsnew-home-cta`
  : "https://www.booking.com/";

const dealTypes = [
  {
    icon: "🏨",
    title: "Hotels",
    description: "From budget-friendly stays to luxury resorts — find the perfect room at the best price.",
  },
  {
    icon: "🏖️",
    title: "Vacation Rentals",
    description: "Homes, apartments, and villas for a more personal travel experience.",
  },
  {
    icon: "✈️",
    title: "Flight + Hotel",
    description: "Bundle your flights and hotels together for even bigger savings.",
  },
  {
    icon: "🚗",
    title: "Car Rentals",
    description: "Get around with ease. Compare car rental deals from top providers.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f4c75] via-[#1b6ca8] to-[#3282b8] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6bTAtMzBWNkgwVjRoMzZ6TTYgMzR2Mkgwdi0yaDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="relative mx-auto max-w-7xl text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your Next Adventure Starts with the{" "}
            <span className="text-amber-300">Perfect Stay</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-100 sm:text-xl">
            Compare prices from the world&apos;s top booking sites. Find
            exclusive hotel deals, vacation rentals, and travel packages — all in
            one place.
          </p>

          <SearchWidget />

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200">
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              No booking fees
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Price comparison
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Millions of reviews
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Best price guarantee
            </span>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="destinations" className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Popular Destinations
            </h2>
            <p className="mt-3 text-lg text-text-muted">
              Explore top-rated hotels in the world&apos;s most visited cities.
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
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                  <p className="text-sm text-gray-200">{dest.country}</p>
                  <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {dest.hotels} hotels
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/destinations" className="text-sm font-medium text-primary underline hover:text-primary-light">
              View all destinations &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Deal Types */}
      <section id="deals" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything You Need to Travel
            </h2>
            <p className="mt-3 text-lg text-text-muted">
              One-stop comparison for all your travel booking needs.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {dealTypes.map((deal) => (
              <div
                key={deal.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:border-primary-light/30 hover:shadow-md"
              >
                <div className="text-4xl">{deal.icon}</div>
                <h3 className="mt-4 text-lg font-bold text-foreground">
                  {deal.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {deal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major booking platform logos */}
      <BookingPartners />

      {/* Awin Partner Brands */}
      <AwinPartners />

      {/* How It Works */}
      <section id="how-it-works" className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-lg text-text-muted">
              Save money in three simple steps.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Search",
                description:
                  "Enter your destination, dates, and number of guests. We search hundreds of booking sites instantly.",
              },
              {
                step: "2",
                title: "Compare",
                description:
                  "See prices side by side from all major platforms. Filter by price, rating, amenities, and more.",
              },
              {
                step: "3",
                title: "Book & Save",
                description:
                  "Click through to the best deal and book directly. No hidden fees — what you see is what you pay.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-[#0f4c75] to-[#3282b8] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Find Your Perfect Hotel?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Start comparing prices now and save up to 60% on your next booking.
          </p>
          <a
            href={bookingCtaUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="mt-8 inline-block rounded-lg bg-accent px-8 py-4 text-lg font-bold text-white transition hover:bg-accent-hover"
          >
            Start Searching on Booking.com
          </a>
        </div>
      </section>
    </div>
  );
}
