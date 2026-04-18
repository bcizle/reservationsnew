/**
 * Single-hotel map embed using the free Google Maps Embed API.
 *
 * Docs: https://developers.google.com/maps/documentation/embed/embedding-map
 *
 * No JavaScript, no billed API calls (the Embed API is free), native lazy-loading
 * via `loading="lazy"`. If no API key is configured at build time we silently
 * render a fallback link to Google Maps so the page never breaks.
 */

interface Props {
  hotelName: string;
  /** City label, e.g. "Paris, France" — used for the Embed API text query. */
  locationLabel?: string;
  /** Optional precise coordinates. When present we use the `view` mode for accuracy. */
  coordinates?: { lat: number; lng: number };
  /** Optional Google Places ID. When present we use the `place` mode. */
  placeId?: string;
  zoom?: number;
  heading?: string;
  description?: string;
}

function buildEmbedUrl({
  apiKey,
  hotelName,
  locationLabel,
  coordinates,
  placeId,
  zoom = 15,
}: {
  apiKey: string;
} & Pick<Props, "hotelName" | "locationLabel" | "coordinates" | "placeId" | "zoom">): string {
  const base = "https://www.google.com/maps/embed/v1";
  const params = new URLSearchParams({ key: apiKey, zoom: String(zoom) });

  if (placeId) {
    params.set("q", `place_id:${placeId}`);
    return `${base}/place?${params.toString()}`;
  }
  if (coordinates) {
    params.set("center", `${coordinates.lat},${coordinates.lng}`);
    return `${base}/view?${params.toString()}`;
  }
  const query = locationLabel ? `${hotelName}, ${locationLabel}` : hotelName;
  params.set("q", query);
  return `${base}/place?${params.toString()}`;
}

export default function HotelMapEmbed({
  hotelName,
  locationLabel,
  coordinates,
  placeId,
  zoom,
  heading = "Location",
  description,
}: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  const directionsQuery = encodeURIComponent(
    locationLabel ? `${hotelName}, ${locationLabel}` : hotelName,
  );
  const externalHref = `https://www.google.com/maps/search/?api=1&query=${directionsQuery}`;

  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-foreground">{heading}</h2>
          {description && <p className="mt-1 text-sm text-text-muted">{description}</p>}
        </div>
        <a
          href={externalHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-primary hover:text-primary-light"
        >
          Open in Google Maps &rarr;
        </a>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 shadow-sm">
        {apiKey ? (
          <iframe
            title={`Map of ${hotelName}`}
            src={buildEmbedUrl({ apiKey, hotelName, locationLabel, coordinates, placeId, zoom })}
            width="100%"
            height="380"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="flex h-[380px] w-full flex-col items-center justify-center gap-3 p-6 text-center text-sm text-text-muted">
            <p>Interactive map unavailable.</p>
            <a
              href={externalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-light"
            >
              View on Google Maps
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
