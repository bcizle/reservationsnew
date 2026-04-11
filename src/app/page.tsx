import Link from "next/link";
import SearchWidget from "@/components/SearchWidget";

const popularDestinations = [
  {
    slug: "new-york-city",
    name: "New York City",
    country: "USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80",
    deals: "2,400+ hotels",
  },
  {
    slug: "paris",
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    deals: "1,800+ hotels",
  },
  {
    slug: "tokyo",
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    deals: "1,500+ hotels",
  },
  {
    slug: "london",
    name: "London",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
    deals: "2,100+ hotels",
  },
  {
    slug: "cancun",
    name: "Cancun",
    country: "Mexico",
    image: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=600&q=80",
    deals: "900+ hotels",
  },
  {
    slug: "dubai",
    name: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    deals: "1,200+ hotels",
  },
];

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

const testimonials = [
  {
    name: "Sarah M.",
    location: "Austin, TX",
    text: "Saved over $300 on my Cancun trip by comparing prices here first. The deals are legit!",
    rating: 5,
  },
  {
    name: "James L.",
    location: "Toronto, CA",
    text: "I use this site every time I travel for work. The hotel comparison tool is incredibly fast.",
    rating: 5,
  },
  {
    name: "Priya K.",
    location: "London, UK",
    text: "Found a 4-star hotel in Paris for half the price I saw elsewhere. Absolutely recommend.",
    rating: 5,
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
            {popularDestinations.map((dest) => (
              <Link
                key={dest.name}
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
                  <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                  <p className="text-sm text-gray-200">{dest.country}</p>
                  <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {dest.deals}
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

      {/* Testimonials */}
      <section id="reviews" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What Travelers Say
            </h2>
            <p className="mt-3 text-lg text-text-muted">
              Join thousands of happy travelers saving on every trip.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.location}</p>
                </div>
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
          <Link
            href="/#search"
            className="mt-8 inline-block rounded-lg bg-accent px-8 py-4 text-lg font-bold text-white transition hover:bg-accent-hover"
          >
            Start Searching
          </Link>
        </div>
      </section>
    </div>
  );
}
