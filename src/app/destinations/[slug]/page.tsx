import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingSearchWidget from "@/components/BookingSearchWidget";
import TravelPayoutsFlightWidget from "@/components/TravelPayoutsFlightWidget";
import TravelPayoutsCarWidget from "@/components/TravelPayoutsCarWidget";
import AffiliateBanner from "@/components/AffiliateBanner";
import OptimizedImage from "@/components/OptimizedImage";
import PhotoGallery from "@/components/PhotoGallery";
import DestinationMap from "@/components/DestinationMap";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { AwinPartners } from "@/app/components/AwinPartners";
import { destinations, getDestination } from "@/lib/destinations";
import { getHotelsForDestination } from "@/lib/hotels";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) return { title: "Destination Not Found" };
  return {
    title: `Hotels in ${dest.name} — Compare ${dest.hotels} Deals`,
    description: `Find the best hotel deals in ${dest.name}, ${dest.country}. Compare prices from top booking sites and save on your next trip. ${dest.hotels} hotels available.`,
    openGraph: {
      title: `Hotels in ${dest.name} — Compare ${dest.hotels} Deals | ReservationsNew`,
      description: `Find the best hotel deals in ${dest.name}, ${dest.country}.`,
      images: [{ url: dest.heroImage, alt: `Hotels in ${dest.name}` }],
    },
    alternates: {
      canonical: `${siteUrl}/destinations/${slug}`,
    },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) notFound();

  const topHotels = getHotelsForDestination(slug);
  const mapHotels = topHotels
    .filter((h) => h.coordinates)
    .map((h) => ({
      slug: h.slug,
      name: h.name,
      neighborhood: h.neighborhood,
      pricePerNight: h.pricePerNight,
      reviewScore: h.reviewScore,
      coordinates: h.coordinates!,
    }));

  const faqQuestions = [
    {
      question: `What is the average hotel price in ${dest.name}?`,
      answer: `Hotel prices in ${dest.name} typically range from ${dest.avgPrice}, depending on the season, location, and hotel category.`,
    },
    {
      question: `When is the best time to visit ${dest.name}?`,
      answer: dest.bestTime,
    },
    {
      question: `How many hotels are available in ${dest.name}?`,
      answer: `There are ${dest.hotels} hotels and accommodations available in ${dest.name} across all major booking platforms.`,
    },
  ];

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Destinations", url: `${siteUrl}/destinations` },
          { name: dest.name, url: `${siteUrl}/destinations/${slug}` },
        ]}
      />
      <FAQJsonLd questions={faqQuestions} />

      {/* Immersive hero */}
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden sm:h-[72vh] sm:min-h-[520px]">
        <OptimizedImage
          variant="hero"
          src={dest.heroImage}
          alt={`Hotels in ${dest.name}`}
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
            {dest.country}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            {dest.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-blue-100 sm:text-lg">{dest.tagline}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              {dest.hotels} hotels available
            </span>
            <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              {dest.avgPrice}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Affiliate disclosure */}
        <AffiliateBanner />

        {/* Quick Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-xs font-medium text-text-muted">Average Price</p>
            <p className="mt-1 text-lg font-bold text-foreground">{dest.avgPrice}</p>
          </div>
          <div className="rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-xs font-medium text-text-muted">Best Time to Visit</p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              {dest.bestTime.split(".")[0]}
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-xs font-medium text-text-muted">Hotels Available</p>
            <p className="mt-1 text-lg font-bold text-foreground">{dest.hotels}</p>
          </div>
        </div>

        {/* Booking Widgets */}
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-foreground">
            Search Hotels & Flights in {dest.name}
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <BookingSearchWidget destination={dest.name} />
            <TravelPayoutsFlightWidget destination={dest.iata} />
          </div>
          <div className="mt-6">
            <TravelPayoutsCarWidget destination={dest.name} />
          </div>
        </section>

        {/* About */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-foreground">About {dest.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">{dest.description}</p>
        </section>

        {/* Photo gallery with lightbox */}
        <PhotoGallery
          photos={dest.gallery}
          heading={`${dest.name} in Photos`}
          description="Tap any image to open the full-screen gallery."
        />

        {/* Map of hotels in this destination */}
        {dest.coordinates && mapHotels.length > 0 && (
          <DestinationMap
            center={dest.coordinates}
            zoom={dest.mapZoom ?? 13}
            hotels={mapHotels}
            heading={`Hotels on the map in ${dest.name}`}
            description="Click a marker for details and pricing. Use the map to find stays near the neighborhoods you want."
          />
        )}

        {/* Top hotels in this destination */}
        {topHotels.length > 0 && (
          <section className="mt-10">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Top hotels in {dest.name}</h2>
                <p className="mt-1 text-sm text-text-muted">Editor-curated stays across every budget.</p>
              </div>
              <Link
                href="/hotels"
                className="hidden text-sm font-semibold text-primary hover:text-primary-light sm:inline"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topHotels.slice(0, 3).map((h) => (
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
                    <div className="absolute right-3 top-3 rounded bg-primary px-1.5 py-0.5 text-xs font-bold text-white">
                      {h.reviewScore.toFixed(1)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary">
                      {h.name}
                    </h3>
                    <p className="mt-1 text-xs text-text-muted">{h.neighborhood}</p>
                    <p className="mt-3 text-base font-bold text-accent">
                      {h.pricePerNight}
                      <span className="text-[10px] font-normal text-text-muted"> /night</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Best Time */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-foreground">Best Time to Visit</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">{dest.bestTime}</p>
        </section>

        {/* Highlights */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-foreground">Top Things to Do</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {dest.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {h}
              </li>
            ))}
          </ul>
        </section>

        {/* Tips */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-foreground">Hotel Booking Tips</h2>
          <ul className="mt-3 space-y-2">
            {dest.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 text-accent">&#9679;</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ Section (for SEO) */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-4">
            {faqQuestions.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-gray-100 p-4">
                <h3 className="text-sm font-semibold text-foreground">{faq.question}</h3>
                <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Awin partner showcase */}
        <div className="mt-12">
          <AwinPartners />
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#0f4c75] to-[#3282b8] p-8 text-center">
          <h3 className="text-xl font-bold text-white">
            Ready to find your perfect hotel in {dest.name}?
          </h3>
          <p className="mt-2 text-sm text-blue-100">
            Compare prices from top booking sites and save.
          </p>
          <Link
            href={`/search?q=${encodeURIComponent(dest.name)}`}
            className="mt-5 inline-block rounded-lg bg-accent px-8 py-3 text-sm font-bold text-white transition hover:bg-accent-hover"
          >
            Search Hotels in {dest.name}
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/destinations"
            className="text-sm text-primary underline hover:text-primary-light"
          >
            &larr; View all destinations
          </Link>
        </div>
      </div>
    </div>
  );
}
