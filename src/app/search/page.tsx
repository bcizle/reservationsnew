import type { Metadata } from "next";
import Link from "next/link";
import BookingSearchWidget from "@/components/BookingSearchWidget";
import BookingFlightWidget from "@/components/BookingFlightWidget";
import BookingCarWidget from "@/components/BookingCarWidget";
import AffiliateBanner from "@/components/AffiliateBanner";
import OptimizedImage from "@/components/OptimizedImage";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { AwinPartners } from "@/app/components/AwinPartners";
import { destinations, matchDestination, type Destination } from "@/lib/destinations";
import { buildBookingLink } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Search Hotel Deals on Booking.com — ReservationsNew",
  description:
    "Hotel prices powered by Booking.com. Search 28+ million accommodations worldwide with free cancellation, verified reviews, and live availability.",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";

interface CategoryCard {
  key: string;
  title: string;
  priceRange: string;
  starRatings: number[];
  description: string;
  icon: string;
  accent: string;
}

function categoryCards(dest: Destination | null): CategoryCard[] {
  // Pull min/max from "$120 – $350 per night" style strings; fall back to generic.
  const range = dest?.avgPrice ?? "$80 – $400 per night";
  const match = range.match(/\$(\d+)\s*[–-]\s*\$(\d+)/);
  const min = match ? Number(match[1]) : 80;
  const max = match ? Number(match[2]) : 400;
  const mid = Math.round((min + max) / 2);

  return [
    {
      key: "budget",
      title: "Budget Hotels",
      priceRange: `From $${Math.max(40, Math.round(min * 0.75))}/night`,
      starRatings: [2, 3],
      description: "Clean, comfortable rooms with the essentials — perfect for travelers who plan to spend more time exploring than in their hotel room.",
      icon: "💰",
      accent: "border-emerald-200 bg-emerald-50/40",
    },
    {
      key: "mid",
      title: "Mid-Range Hotels",
      priceRange: `From $${mid}/night`,
      starRatings: [3, 4],
      description: "The sweet spot — modern amenities, great locations, and quality service without the luxury price tag.",
      icon: "⭐",
      accent: "border-blue-200 bg-blue-50/40",
    },
    {
      key: "luxury",
      title: "Luxury Hotels",
      priceRange: `From $${Math.round(max * 0.9)}/night`,
      starRatings: [5],
      description: "Five-star service, premium locations, and full amenity packages — spas, fine dining, concierge, and signature suites.",
      icon: "✨",
      accent: "border-amber-200 bg-amber-50/40",
    },
  ];
}

function buildFaqs(dest: Destination | null, displayQuery: string) {
  if (dest) {
    return [
      {
        question: `Is ${dest.name} expensive?`,
        answer: `Hotel prices in ${dest.name} typically range from ${dest.avgPrice}, so there's something for every budget. Mid-range hotels strike the best balance between location and value, while luxury properties offer five-star service at the top of that range. ${dest.tips[0] ?? ""}`,
      },
      {
        question: `What's the best area to stay in ${dest.name}?`,
        answer: `${dest.tips[0] ?? `Central neighborhoods near major attractions are ideal for first-time visitors to ${dest.name}.`} ${dest.tips[1] ?? ""}`,
      },
      {
        question: `When is the best time to visit ${dest.name}?`,
        answer: dest.bestTime,
      },
      {
        question: `How do I get around ${dest.name}?`,
        answer: `${dest.tips.find((t) => /metro|subway|tube|skytrain|tram|bts|mrt|transit|station|bike|tuk|taxi/i.test(t)) ??
          `Most major attractions in ${dest.name} are accessible by public transit, taxi, or rideshare. Hotels in central neighborhoods minimize commute times.`}`,
      },
      {
        question: `How many hotels are available in ${dest.name}?`,
        answer: `Booking.com lists ${dest.hotels} accommodations in ${dest.name}, ranging from budget guesthouses to five-star resorts. You can filter by price, star rating, guest review score, and amenities.`,
      },
    ];
  }
  return [
    {
      question: `How do I find the best hotel deal in ${displayQuery}?`,
      answer: `Search Booking.com directly using the button above — they aggregate live pricing from millions of properties and apply real-time availability. Filtering by free cancellation lets you lock in a refundable rate while you keep planning.`,
    },
    {
      question: `Should I book in advance or wait?`,
      answer: `For popular destinations and high-season dates, book 6-8 weeks ahead. For flexible dates and shoulder seasons, last-minute deals can save 20-40%. Setting a price alert on Booking.com lets you watch a specific property without committing.`,
    },
    {
      question: `What does "free cancellation" actually mean?`,
      answer: `Most Booking.com rooms include a free-cancellation window that ends 24-72 hours before check-in. After that, you may be charged the first night or full stay. Always confirm the cancellation date shown at checkout.`,
    },
  ];
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; checkin?: string; checkout?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const displayQuery = query || "your destination";

  const matchedDest = matchDestination(query);
  const ssTarget = matchedDest ? `${matchedDest.name}, ${matchedDest.country}` : query;

  const primaryBookingUrl = buildBookingLink(ssTarget, params.checkin, params.checkout, {
    label: "reservationsnew-search-primary",
  });

  const cards = categoryCards(matchedDest);
  const cardLink = (card: CategoryCard) =>
    buildBookingLink(ssTarget, params.checkin, params.checkout, {
      label: `reservationsnew-search-${card.key}`,
      starRatings: card.starRatings,
    });

  const topReviewedUrl = buildBookingLink(ssTarget, params.checkin, params.checkout, {
    label: "reservationsnew-search-top-reviewed",
    minReviewScore: 8,
    sort: "review_score_and_price",
  });

  const faqs = buildFaqs(matchedDest, displayQuery);

  const headerTitle = query
    ? matchedDest
      ? `Hotels in ${matchedDest.name}, ${matchedDest.country}`
      : `Hotels in ${displayQuery}`
    : "Find your next hotel";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Search", url: `${siteUrl}/search` },
        ]}
      />
      <FAQJsonLd questions={faqs} />

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#003580]/20 bg-[#003580]/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#003580]">
          <span className="flex h-4 w-4 items-center justify-center rounded bg-[#003580] text-[10px] font-extrabold text-white">B</span>
          Hotel prices powered by Booking.com
        </div>
        <h1 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">
          {headerTitle}
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          As a Booking.com Affiliate, we earn from qualifying transactions — at no extra cost to you.
          {params.checkin && ` Check-in ${params.checkin}.`}
          {params.checkout && ` Check-out ${params.checkout}.`}
        </p>
      </div>

      <div className="mt-6">
        <AffiliateBanner />
      </div>

      {/* Destination summary if matched */}
      {matchedDest && (
        <section className="mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[2fr_3fr]">
            <div className="relative h-48 lg:h-full lg:min-h-[280px]">
              <OptimizedImage
                variant="card"
                src={matchedDest.cardImage}
                alt={`Hotels in ${matchedDest.name}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white/0" />
              <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                {matchedDest.country}
              </div>
            </div>
            <div className="p-6 sm:p-7">
              <h2 className="text-xl font-bold text-foreground">
                {matchedDest.name} at a glance
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {matchedDest.description.split(".").slice(0, 2).join(".")}.
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-surface px-3 py-2">
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                    Hotels
                  </dt>
                  <dd className="mt-0.5 text-sm font-bold text-foreground">{matchedDest.hotels}</dd>
                </div>
                <div className="rounded-lg bg-surface px-3 py-2">
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                    Avg price
                  </dt>
                  <dd className="mt-0.5 text-sm font-bold text-foreground">{matchedDest.avgPrice}</dd>
                </div>
                <div className="rounded-lg bg-surface px-3 py-2 sm:col-span-1 col-span-2">
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                    Best time
                  </dt>
                  <dd className="mt-0.5 text-sm font-bold text-foreground">
                    {matchedDest.bestTime.split(".")[0]}
                  </dd>
                </div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={primaryBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#003580] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#002255]"
                >
                  View All Hotels on Booking.com
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <Link
                  href={`/destinations/${matchedDest.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-gray-300"
                >
                  Read the {matchedDest.name} guide
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Generic primary CTA when no destination match */}
      {!matchedDest && (
        <section className="mt-8 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-white p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                {query ? `See live prices in ${displayQuery}` : "Search 28+ million stays worldwide"}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                We send your search directly to Booking.com — the world&apos;s largest accommodation
                platform. Live availability, free cancellation on most rooms, verified guest reviews.
              </p>
              <a
                href={primaryBookingUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#003580] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#002255]"
              >
                {query ? `View hotels in ${displayQuery}` : "Search on Booking.com"}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            <div className="hidden shrink-0 rounded-xl border border-blue-100 bg-white p-5 text-sm text-gray-600 shadow-sm sm:block">
              <p className="font-semibold text-foreground">What you get</p>
              <ul className="mt-2 space-y-1.5 text-xs">
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> 28M+ accommodation listings</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Free cancellation on most rooms</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Verified guest reviews</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Best price guarantee</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Hotel category cards */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-foreground">
          Browse by category{matchedDest ? ` in ${matchedDest.name}` : ""}
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Filtered Booking.com searches for the budget that fits your trip. Prices update in real time.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {cards.map((card) => (
            <a
              key={card.key}
              href={cardLink(card)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={`group flex flex-col rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:shadow-md ${card.accent}`}
            >
              <div className="text-2xl">{card.icon}</div>
              <h3 className="mt-3 text-base font-bold text-foreground">{card.title}</h3>
              <p className="mt-1 text-xs font-semibold text-primary">{card.priceRange}</p>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-gray-600">{card.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#003580] group-hover:gap-1.5">
                Search {card.starRatings.length === 1 ? `${card.starRatings[0]}-star` : "these"} hotels
                <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={topReviewedUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-foreground transition hover:border-gray-300"
          >
            ⭐ Top-reviewed hotels (8+/10)
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href={primaryBookingUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-bold text-white transition hover:bg-accent-hover"
          >
            View All Hotels on Booking.com
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Travel tips + highlights when matched */}
      {matchedDest && (
        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground">
              What travelers say about {matchedDest.name}
            </h2>
            <p className="mt-1 text-xs text-text-muted">
              Insider tips from our editorial team and guest review patterns on Booking.com.
            </p>
            <ul className="mt-4 space-y-3">
              {matchedDest.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground">
              Top things to see in {matchedDest.name}
            </h2>
            <p className="mt-1 text-xs text-text-muted">
              The destinations and attractions most reviewed by Booking.com guests.
            </p>
            <ul className="mt-4 space-y-2.5">
              {matchedDest.highlights.slice(0, 6).map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Map embed when we have coordinates */}
      {matchedDest?.coordinates && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">
            {matchedDest.name} on the map
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Hotels are clustered around the city center and major attractions. Booking.com&apos;s
            map view lets you filter by neighborhood once you click through.
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
            <iframe
              title={`Map of ${matchedDest.name}`}
              src={`https://maps.google.com/maps?q=${matchedDest.coordinates.lat},${matchedDest.coordinates.lng}&hl=en&z=${matchedDest.mapZoom ?? 12}&output=embed`}
              width="100%"
              height="380"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </section>
      )}

      {/* Secondary widgets: flights & cars */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-foreground">Round out your trip</h2>
        <p className="mt-2 text-sm text-text-muted">
          Compare flights and car rentals from our travel partners.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <BookingSearchWidget
            destination={ssTarget || query}
            checkIn={params.checkin}
            checkOut={params.checkout}
          />
          <BookingFlightWidget destination={matchedDest?.iata || query} />
        </div>
        <div className="mt-6">
          <BookingCarWidget destination={ssTarget || query} />
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-foreground">
          {matchedDest ? `Frequently asked questions about ${matchedDest.name}` : "Frequently asked questions"}
        </h2>
        <div className="mt-6 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition open:shadow-md"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-foreground">
                {faq.question}
                <svg
                  className="h-4 w-4 shrink-0 text-text-muted transition group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Other popular destinations */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-foreground">
          {matchedDest ? "Other popular destinations" : "Popular destinations"}
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Read in-depth travel guides for top cities around the world.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations
            .filter((d) => d.slug !== matchedDest?.slug)
            .slice(0, 6)
            .map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <OptimizedImage
                    variant="card"
                    src={dest.cardImage}
                    alt={`Hotels in ${dest.name}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <p className="text-base font-bold text-white">{dest.name}</p>
                    <p className="text-xs text-blue-100">{dest.country}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/destinations"
            className="text-sm font-semibold text-primary underline hover:text-primary-light"
          >
            View all destinations &rarr;
          </Link>
        </div>
      </section>

      {/* SEO content */}
      <section className="mt-12 rounded-xl bg-surface p-8">
        <h2 className="text-lg font-bold text-foreground">
          {matchedDest ? `How to find the best hotel deals in ${matchedDest.name}` : "How to find the best hotel deals"}
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            Hotel pricing varies widely between booking platforms — the same room can cost
            20% to 40% more or less depending on where you book. We send your search directly
            to Booking.com, which tracks live availability for over 28 million properties
            worldwide{matchedDest ? ` — including ${matchedDest.hotels} in ${matchedDest.name}` : ""}.
          </p>
          <p>
            <strong>Be flexible with dates.</strong> Midweek stays and shoulder-season travel
            often save 30–50% over weekend or peak-season rates. {matchedDest && `In ${matchedDest.name} specifically, ${matchedDest.bestTime.split(".")[0].toLowerCase()}.`}
          </p>
          <p>
            <strong>Filter by free cancellation.</strong> When you&apos;re early in trip
            planning, locking in a refundable rate gives you upside if prices drop later.
          </p>
          <p>
            When you click through our links and book, we earn a small commission at no extra
            cost to you. As a Booking.com Affiliate, ReservationsNew earns from qualifying
            transactions —{" "}
            <Link href="/affiliate-disclosure" className="text-primary underline hover:text-primary-light">
              read our full affiliate disclosure
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-br from-[#003580] via-[#013d92] to-[#0f4c75] p-8 text-center text-white shadow-lg">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
          Powered by Booking.com
        </div>
        <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
          Ready to book {matchedDest ? `in ${matchedDest.name}` : "your stay"}?
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-blue-100">
          Live prices, free cancellation on most rooms, and verified guest reviews —
          all on Booking.com.
        </p>
        <a
          href={primaryBookingUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 text-sm font-bold text-white transition hover:bg-accent-hover"
        >
          View All Hotels on Booking.com
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </section>

      {/* Awin partner showcase */}
      <div className="mt-12">
        <AwinPartners />
      </div>
    </div>
  );
}
