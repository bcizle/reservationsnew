import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingSearchWidget from "@/components/BookingSearchWidget";
import BookingFlightWidget from "@/components/BookingFlightWidget";
import BookingCarWidget from "@/components/BookingCarWidget";
import AffiliateBanner from "@/components/AffiliateBanner";
import OptimizedImage from "@/components/OptimizedImage";
import PhotoGallery from "@/components/PhotoGallery";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { AwinPartners } from "@/app/components/AwinPartners";
import { destinations, getDestination } from "@/lib/destinations";
import { buildBookingLink } from "@/lib/booking";

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
    title: `Hotels in ${dest.name} — Compare Booking.com Deals`,
    description: `Find the best hotel deals in ${dest.name}, ${dest.country} on Booking.com. Compare ${dest.hotels} hotels with free cancellation, verified reviews, and live pricing — typical rates ${dest.avgPrice}.`,
    openGraph: {
      title: `Hotels in ${dest.name} — Compare Booking.com Deals | ReservationsNew`,
      description: `Search ${dest.hotels} hotels in ${dest.name}, ${dest.country} on Booking.com. Live prices, free cancellation, verified guest reviews.`,
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

  const bookingLink = buildBookingLink(
    `${dest.name}, ${dest.country}`,
    undefined,
    undefined,
    { label: `reservationsnew-destination-${slug}` },
  );

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

        {/* Primary Booking.com CTA */}
        <section className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#003580] via-[#013d92] to-[#0f4c75] p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                Hotel prices powered by Booking.com
              </div>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Search Hotels in {dest.name} on Booking.com
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-blue-100">
                Compare {dest.hotels} hotels in {dest.name} with live availability, free cancellation
                on most rooms, and verified guest reviews. Typical rates {dest.avgPrice}.
              </p>
              <a
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-accent-hover"
              >
                Search Hotels in {dest.name}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
              <p className="mt-3 text-[11px] text-blue-200">
                Affiliate link via Awin — we may earn a commission at no extra cost to you.
              </p>
            </div>
            <div className="hidden shrink-0 rounded-xl bg-white/10 p-5 text-sm shadow-sm backdrop-blur-sm sm:block">
              <p className="font-semibold">Why Booking.com</p>
              <ul className="mt-2 space-y-1.5 text-xs text-blue-50">
                <li className="flex items-center gap-2">
                  <span className="text-amber-300">✓</span> 28M+ accommodations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-300">✓</span> Free cancellation on most rooms
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-300">✓</span> Verified guest reviews
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-300">✓</span> Best price guarantee
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Booking Widgets — secondary search & travel partners */}
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-foreground">
            Round out your trip to {dest.name}
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <BookingSearchWidget destination={dest.name} />
            <BookingFlightWidget destination={dest.iata} />
          </div>
          <div className="mt-6">
            <BookingCarWidget destination={dest.name} />
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
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#003580] to-[#0f4c75] p-8 text-center">
          <h3 className="text-xl font-bold text-white">
            Ready to find your perfect hotel in {dest.name}?
          </h3>
          <p className="mt-2 text-sm text-blue-100">
            Compare live prices on Booking.com — 28M+ properties, free cancellation, verified reviews.
          </p>
          <a
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="mt-5 inline-block rounded-lg bg-accent px-8 py-3 text-sm font-bold text-white transition hover:bg-accent-hover"
          >
            Search Hotels in {dest.name} on Booking.com
          </a>
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
