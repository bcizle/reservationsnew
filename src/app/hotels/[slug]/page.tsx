import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import OptimizedImage from "@/components/OptimizedImage";
import PhotoGallery from "@/components/PhotoGallery";
import AmenityIcon from "@/components/AmenityIcon";
import AffiliateBanner from "@/components/AffiliateBanner";
import BookingSearchWidget from "@/components/BookingSearchWidget";
import { BreadcrumbJsonLd, HotelJsonLd } from "@/components/JsonLd";
import { hotels, getHotel } from "@/lib/hotels";
import { getDestination } from "@/lib/destinations";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";

export async function generateStaticParams() {
  return hotels.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hotel = getHotel(slug);
  if (!hotel) return { title: "Hotel Not Found" };
  const dest = getDestination(hotel.destinationSlug);
  const location = dest ? `${dest.name}, ${dest.country}` : hotel.neighborhood;
  return {
    title: `${hotel.name} — ${location} | From ${hotel.pricePerNight}/night`,
    description: `${hotel.shortDescription} Compare prices across Booking.com, Expedia, and Hotels.com. ${hotel.reviewScore}/10 from ${hotel.reviewCount.toLocaleString()} reviews.`,
    openGraph: {
      title: `${hotel.name} — ${location}`,
      description: hotel.shortDescription,
      images: hotel.gallery.slice(0, 3).map((p) => ({ url: p.src, alt: p.alt })),
    },
    alternates: { canonical: `${siteUrl}/hotels/${slug}` },
  };
}

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${stars} star hotel`}>
      {Array.from({ length: stars }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hotel = getHotel(slug);
  if (!hotel) notFound();

  const dest = getDestination(hotel.destinationSlug);
  const locationLabel = dest ? `${dest.name}, ${dest.country}` : hotel.neighborhood;
  const ratingLabel =
    hotel.reviewScore >= 9 ? "Exceptional" : hotel.reviewScore >= 8 ? "Excellent" : "Very Good";

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Destinations", url: `${siteUrl}/destinations` },
          ...(dest
            ? [{ name: dest.name, url: `${siteUrl}/destinations/${dest.slug}` }]
            : []),
          { name: hotel.name, url: `${siteUrl}/hotels/${hotel.slug}` },
        ]}
      />
      <HotelJsonLd
        name={hotel.name}
        description={hotel.description}
        url={`${siteUrl}/hotels/${hotel.slug}`}
        image={hotel.gallery.slice(0, 5).map((p) => p.src)}
        priceRange={hotel.pricePerNight}
        starRating={hotel.stars}
        address={
          dest
            ? { addressLocality: dest.name, addressCountry: dest.country }
            : undefined
        }
        aggregateRating={{
          ratingValue: hotel.reviewScore,
          reviewCount: hotel.reviewCount,
        }}
      />

      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden sm:h-[60vh] sm:min-h-[460px]">
        <OptimizedImage
          variant="hero"
          src={hotel.gallery[0].src}
          alt={hotel.gallery[0].alt}
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/0" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8">
          {dest && (
            <Link
              href={`/destinations/${dest.slug}`}
              className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-200 hover:text-white"
            >
              &larr; {dest.name}, {dest.country}
            </Link>
          )}
          <div className="mt-2 flex items-center gap-2">
            <StarRating stars={hotel.stars} />
            <span className="text-xs font-medium text-blue-100">{hotel.neighborhood}</span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            {hotel.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
              <span className="rounded bg-accent px-1.5 py-0.5 text-xs font-bold">
                {hotel.reviewScore.toFixed(1)}
              </span>
              <span className="font-semibold">{ratingLabel}</span>
              <span className="text-blue-100">({hotel.reviewCount.toLocaleString()} reviews)</span>
            </span>
            <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              From {hotel.pricePerNight} / night
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <AffiliateBanner />

        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Main column */}
          <div>
            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-foreground">About this hotel</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">{hotel.description}</p>
            </section>

            {/* Why book here */}
            <section className="mt-8 rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50/50 to-white p-5">
              <h2 className="text-lg font-bold text-foreground">Why book here</h2>
              <ul className="mt-3 space-y-2">
                {hotel.whyBookHere.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-gray-700">
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
                    {bullet}
                  </li>
                ))}
              </ul>
            </section>

            {/* Gallery */}
            <PhotoGallery
              photos={hotel.gallery}
              heading="Photo tour"
              description="Tap any image to open the full-screen gallery."
            />

            {/* Amenities */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-foreground">Amenities</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {hotel.amenities.map((a) => (
                  <AmenityIcon key={a} amenity={a} />
                ))}
              </div>
            </section>

            {/* Rooms */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-foreground">Room types</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {hotel.rooms.map((room) => (
                  <div
                    key={room.name}
                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                  >
                    <div className="relative aspect-[4/3]">
                      <OptimizedImage
                        variant="card"
                        src={room.image}
                        alt={`${room.name} at ${hotel.name}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-foreground">{room.name}</h3>
                      <p className="mt-1 text-xs text-text-muted">Sleeps {room.sleeps}</p>
                      <p className="mt-2 text-xs text-gray-600">{room.description}</p>
                      <p className="mt-3 text-lg font-bold text-accent">
                        {room.pricePerNight}
                        <span className="text-[10px] font-normal text-text-muted"> /night</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-foreground">What guests are saying</h2>
              <p className="mt-1 text-xs text-text-muted">
                {hotel.reviewScore.toFixed(1)}/10 average from {hotel.reviewCount.toLocaleString()} verified reviews
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {hotel.reviews.map((r) => (
                  <div key={r.quote} className="rounded-2xl border border-gray-100 p-4">
                    <div className="flex items-center gap-2">
                      <div className="rounded bg-primary px-1.5 py-0.5 text-xs font-bold text-white">
                        {r.score.toFixed(1)}
                      </div>
                      <p className="text-xs font-semibold text-text-muted">{r.author}</p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">&ldquo;{r.quote}&rdquo;</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Nearby */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-foreground">What's nearby</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {hotel.nearbyAttractions.map((n) => (
                  <li
                    key={n.name}
                    className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2 text-sm"
                  >
                    <span className="text-gray-700">{n.name}</span>
                    <span className="text-xs font-semibold text-primary">{n.distance}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-text-muted">From</p>
                  <p className="text-3xl font-extrabold text-accent">{hotel.pricePerNight}</p>
                  <p className="text-xs text-text-muted">per night</p>
                </div>
                {hotel.originalPrice && (
                  <div className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600">
                    Was {hotel.originalPrice}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <BookingSearchWidget destination={hotel.name} />
              </div>
              <p className="mt-3 text-[11px] text-text-muted">
                Available on: {hotel.platforms.join(" · ")}
              </p>
            </div>
          </aside>
        </div>

        {/* Back link */}
        <div className="mt-10">
          <Link href="/hotels" className="text-sm text-primary underline hover:text-primary-light">
            &larr; Browse all featured hotels
          </Link>
        </div>
      </div>
    </div>
  );
}
