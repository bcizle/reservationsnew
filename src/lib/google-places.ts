/**
 * Google Places API (New) utility.
 *
 * Docs: https://developers.google.com/maps/documentation/places/web-service/overview
 *
 * Usage is billed per request — keep calls behind a cache and only run them on
 * the server (or from a build step). Never ship the server key to the browser;
 * NEXT_PUBLIC_GOOGLE_PLACES_API_KEY is for client widgets that do their own
 * key restriction (HTTP referrer), GOOGLE_PLACES_API_KEY is for server calls.
 */

type Nullable<T> = T | undefined;

const SERVER_KEY =
  process.env.GOOGLE_PLACES_API_KEY ?? process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? "";

const PLACES_BASE = "https://places.googleapis.com/v1";

export interface PlacePhoto {
  /** Photo resource name (e.g. "places/XYZ/photos/ABC"). Feed to buildPhotoUrl(). */
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions?: Array<{
    displayName: string;
    uri?: string;
    photoUri?: string;
  }>;
}

export interface PlaceReview {
  name: string;
  rating: number;
  text?: { text: string; languageCode?: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: {
    displayName: string;
    uri?: string;
    photoUri?: string;
  };
  publishTime?: string;
}

export interface Place {
  id: string;
  name: string;
  displayName?: { text: string; languageCode?: string };
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  priceLevel?:
    | "PRICE_LEVEL_FREE"
    | "PRICE_LEVEL_INEXPENSIVE"
    | "PRICE_LEVEL_MODERATE"
    | "PRICE_LEVEL_EXPENSIVE"
    | "PRICE_LEVEL_VERY_EXPENSIVE";
  photos?: PlacePhoto[];
  reviews?: PlaceReview[];
  websiteUri?: string;
  googleMapsUri?: string;
  location?: { latitude: number; longitude: number };
  types?: string[];
}

// ---------------------------------------------------------------------------
// Tiny in-memory cache + rate limiter (per Node process).
// For production you'd back this with KV / Redis; for now a Map is enough.
// ---------------------------------------------------------------------------

interface CacheEntry<T> {
  value: T;
  expires: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL_MS = 1000 * 60 * 60 * 24; // 24h

function cacheGet<T>(key: string): Nullable<T> {
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return undefined;
  }
  return entry.value as T;
}

function cacheSet<T>(key: string, value: T, ttl = DEFAULT_TTL_MS) {
  cache.set(key, { value, expires: Date.now() + ttl });
}

// Naive rate limiter: max N calls per window. Google Places has per-minute
// quotas; this smooths out burst usage from a single process.
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 60;
const rateTimestamps: number[] = [];

async function rateLimit() {
  const now = Date.now();
  while (rateTimestamps.length && now - rateTimestamps[0] > RATE_WINDOW_MS) {
    rateTimestamps.shift();
  }
  if (rateTimestamps.length >= RATE_LIMIT) {
    const waitMs = RATE_WINDOW_MS - (now - rateTimestamps[0]);
    await new Promise((r) => setTimeout(r, waitMs));
  }
  rateTimestamps.push(Date.now());
}

// ---------------------------------------------------------------------------
// API calls
// ---------------------------------------------------------------------------

function requireKey() {
  if (!SERVER_KEY) {
    throw new Error(
      "GOOGLE_PLACES_API_KEY is not set. Add it to .env.local before calling Google Places.",
    );
  }
  return SERVER_KEY;
}

/**
 * Search for hotels near a destination using the Places Text Search (New) endpoint.
 * Returns up to `limit` results (default 10, max 20 per page).
 */
export async function searchHotels(
  destination: string,
  {
    limit = 10,
    fields = [
      "places.id",
      "places.displayName",
      "places.formattedAddress",
      "places.rating",
      "places.userRatingCount",
      "places.priceLevel",
      "places.photos",
      "places.websiteUri",
      "places.googleMapsUri",
      "places.location",
      "places.types",
    ],
    ttlMs,
  }: { limit?: number; fields?: string[]; ttlMs?: number } = {},
): Promise<Place[]> {
  const cacheKey = `hotels:${destination}:${limit}:${fields.join(",")}`;
  const cached = cacheGet<Place[]>(cacheKey);
  if (cached) return cached;

  await rateLimit();
  const res = await fetch(`${PLACES_BASE}/places:searchText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": requireKey(),
      "X-Goog-FieldMask": fields.join(","),
    },
    body: JSON.stringify({
      textQuery: `hotels in ${destination}`,
      pageSize: Math.min(limit, 20),
      includedType: "lodging",
    }),
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Google Places searchText failed (${res.status}): ${body}`);
  }

  const json = (await res.json()) as { places?: Place[] };
  const places = json.places ?? [];
  cacheSet(cacheKey, places, ttlMs);
  return places;
}

/**
 * Fetch full details (including reviews) for a single place.
 */
export async function getPlaceDetails(
  placeId: string,
  {
    fields = [
      "id",
      "displayName",
      "formattedAddress",
      "rating",
      "userRatingCount",
      "priceLevel",
      "photos",
      "reviews",
      "websiteUri",
      "googleMapsUri",
      "location",
      "types",
    ],
    ttlMs,
  }: { fields?: string[]; ttlMs?: number } = {},
): Promise<Place> {
  const cacheKey = `place:${placeId}:${fields.join(",")}`;
  const cached = cacheGet<Place>(cacheKey);
  if (cached) return cached;

  await rateLimit();
  const res = await fetch(`${PLACES_BASE}/places/${encodeURIComponent(placeId)}`, {
    method: "GET",
    headers: {
      "X-Goog-Api-Key": requireKey(),
      "X-Goog-FieldMask": fields.join(","),
    },
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Google Places details failed (${res.status}): ${body}`);
  }

  const place = (await res.json()) as Place;
  cacheSet(cacheKey, place, ttlMs);
  return place;
}

/**
 * Get reviews for a place (convenience wrapper — reviews only).
 */
export async function getPlaceReviews(placeId: string, { ttlMs }: { ttlMs?: number } = {}) {
  const place = await getPlaceDetails(
    placeId,
    {
      fields: ["id", "displayName", "reviews", "rating", "userRatingCount"],
      ttlMs,
    },
  );
  return {
    reviews: place.reviews ?? [],
    rating: place.rating,
    userRatingCount: place.userRatingCount,
  };
}

/**
 * Build a photo-media URL for a Place photo resource name. This hits
 * places.googleapis.com which returns a redirect to lh3.googleusercontent.com —
 * both hostnames are allowlisted in next.config.ts.
 *
 * Use `maxWidthPx` OR `maxHeightPx` (Google requires one).
 */
export function buildPhotoUrl(
  photo: PlacePhoto | string,
  { maxWidthPx, maxHeightPx = 1080 }: { maxWidthPx?: number; maxHeightPx?: number } = {},
): string {
  const name = typeof photo === "string" ? photo : photo.name;
  const params = new URLSearchParams({ key: requireKey() });
  if (maxWidthPx) params.set("maxWidthPx", String(maxWidthPx));
  else params.set("maxHeightPx", String(maxHeightPx));
  return `${PLACES_BASE}/${name}/media?${params.toString()}`;
}

/**
 * Resolve a Place ID from a free-text query (e.g. "Hotel de la Seine, Paris").
 * Returns the best match's place ID + a handful of useful fields, or null.
 *
 * Used to auto-populate Place IDs when hotel data doesn't hardcode one.
 */
export async function findPlaceByQuery(
  query: string,
  { ttlMs }: { ttlMs?: number } = {},
): Promise<Place | null> {
  const cacheKey = `findPlace:${query}`;
  const cached = cacheGet<Place | null>(cacheKey);
  if (cached !== undefined) return cached;

  if (!SERVER_KEY) {
    cacheSet(cacheKey, null, ttlMs);
    return null;
  }

  await rateLimit();
  const fields = [
    "places.id",
    "places.displayName",
    "places.formattedAddress",
    "places.rating",
    "places.userRatingCount",
    "places.photos",
    "places.location",
    "places.types",
  ];

  try {
    const res = await fetch(`${PLACES_BASE}/places:searchText`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": SERVER_KEY,
        "X-Goog-FieldMask": fields.join(","),
      },
      body: JSON.stringify({ textQuery: query, pageSize: 1 }),
      next: { revalidate: 60 * 60 * 24 * 7 },
    });
    if (!res.ok) {
      cacheSet(cacheKey, null, ttlMs);
      return null;
    }
    const json = (await res.json()) as { places?: Place[] };
    const best = json.places?.[0] ?? null;
    cacheSet(cacheKey, best, ttlMs);
    return best;
  } catch {
    cacheSet(cacheKey, null, ttlMs);
    return null;
  }
}

export interface ResolvedHotelPhoto {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  credit?: string;
}

/**
 * Given a hotel (with an optional placeId and a free-text query fallback),
 * return a gallery of photo URLs suitable for the `PhotoGallery` component.
 *
 * Strategy:
 *  1. If `placeId` is provided, fetch photos from getPlaceDetails.
 *  2. Otherwise, run a text search with `query` to resolve a placeId + photos.
 *  3. If either step fails or returns no photos, return null so callers fall back.
 *
 * Safe to call at build/request time — all fetches are rate-limited, cached,
 * and swallow network errors rather than throw.
 */
export async function resolveHotelPhotos({
  placeId,
  query,
  hotelName,
  limit = 8,
  maxWidthPx = 1600,
  thumbWidthPx = 500,
}: {
  placeId?: string;
  query?: string;
  hotelName: string;
  limit?: number;
  maxWidthPx?: number;
  thumbWidthPx?: number;
}): Promise<ResolvedHotelPhoto[] | null> {
  if (!SERVER_KEY) return null;

  let place: Place | null = null;
  try {
    if (placeId) {
      place = await getPlaceDetails(placeId, {
        fields: ["id", "displayName", "photos", "location"],
      });
    } else if (query) {
      place = await findPlaceByQuery(query);
    }
  } catch {
    return null;
  }

  if (!place?.photos?.length) return null;

  const photos = place.photos.slice(0, limit).map((photo, idx): ResolvedHotelPhoto => {
    const attribution = photo.authorAttributions?.[0]?.displayName;
    return {
      id: `${place!.id}-${idx}`,
      src: buildPhotoUrl(photo, { maxWidthPx }),
      thumb: buildPhotoUrl(photo, { maxWidthPx: thumbWidthPx }),
      alt: `${hotelName} — photo ${idx + 1}`,
      credit: attribution ? `Photo © ${attribution} via Google` : undefined,
    };
  });

  return photos;
}

export function clearPlacesCache() {
  cache.clear();
}
