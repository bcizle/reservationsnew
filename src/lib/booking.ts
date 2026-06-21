/**
 * Booking.com affiliate link builder — routed through the Awin tracking domain.
 *
 * Awin Publisher ID: 2793280 (ReservationsNew)
 * Booking.com Awin Advertiser ID: 6776
 *
 * Format: https://www.awin1.com/cread.php?awinmid=6776&awinaffid=2793280&ued={ENCODED_BOOKING_URL}
 */

const AWIN_PUBLISHER_ID =
  process.env.NEXT_PUBLIC_AWIN_PUBLISHER_ID ?? "2793280";
const BOOKING_AWIN_ADVERTISER_ID = "6776";

// Legacy Booking.com direct-affiliate id (issued by Booking.com Partner Hub,
// NOT by Awin). Awin's cread.php is the primary attribution path; this env
// var, when set, additionally stamps the inner URL so Booking.com has a
// direct attribution signal on its side. Falls back to undefined (no aid
// param) when the env var is unset.
//
// Safety guard: a common operator mistake is to paste the Awin Publisher ID
// here. The two IDs live in different namespaces — passing the Awin pub ID
// as a Booking.com aid sends Booking.com an aid it doesn't recognize, which
// can suppress the Awin S2S postback and zero out commissions. If the env
// value equals the Awin publisher ID we treat it as a misconfiguration and
// drop the aid entirely (Awin attribution still works via cread.php).
const RAW_BOOKING_AID = process.env.NEXT_PUBLIC_BOOKING_AID || undefined;
const DEFAULT_BOOKING_AID =
  RAW_BOOKING_AID && RAW_BOOKING_AID !== AWIN_PUBLISHER_ID
    ? RAW_BOOKING_AID
    : undefined;
if (RAW_BOOKING_AID && RAW_BOOKING_AID === AWIN_PUBLISHER_ID) {
  console.warn(
    "[booking] NEXT_PUBLIC_BOOKING_AID equals NEXT_PUBLIC_AWIN_PUBLISHER_ID. " +
      "Booking.com aids are issued by partner.booking.com, not by Awin. " +
      "Ignoring the env value to avoid breaking Awin attribution.",
  );
}

interface BookingLinkOptions {
  /** Optional Booking.com label for tracking sub-campaigns. */
  label?: string;
  /** Optional Booking.com aid (legacy direct affiliate id) — falls through Awin. */
  aid?: string;
  /** Star ratings to include (e.g. [4, 5] for 4-and-5 star only). */
  starRatings?: number[];
  /** Number of adult guests. */
  adults?: number;
  /** Min review score (e.g. 8 for 8+/10). */
  minReviewScore?: 6 | 7 | 8 | 9;
  /** Sort order — popular ("popularity"), price low-to-high ("price"), top reviewed ("review_score_and_price"). */
  sort?: "popularity" | "price" | "review_score_and_price";
}

/**
 * Build an Awin-tracked Booking.com search deep link.
 *
 * @param destination  Destination text shown in Booking.com's search box (city, hotel, etc.)
 * @param checkin      ISO date string (YYYY-MM-DD)
 * @param checkout     ISO date string (YYYY-MM-DD)
 * @param options      Optional label / aid / filter overrides
 */
export function buildBookingLink(
  destination?: string,
  checkin?: string,
  checkout?: string,
  options: BookingLinkOptions = {},
): string {
  const params = new URLSearchParams({
    label: options.label ?? "reservationsnew",
    lang: "en-us",
  });
  const aid = options.aid ?? DEFAULT_BOOKING_AID;
  if (aid) params.set("aid", aid);
  if (destination) params.set("ss", destination);
  if (checkin) params.set("checkin", checkin);
  if (checkout) params.set("checkout", checkout);
  if (options.adults) params.set("group_adults", String(options.adults));
  if (options.sort) params.set("order", options.sort);

  const filters: string[] = [];
  if (options.starRatings && options.starRatings.length > 0) {
    for (const star of options.starRatings) {
      filters.push(`class=${star}`);
    }
  }
  if (options.minReviewScore) {
    filters.push(`review_score=${options.minReviewScore * 10}`);
  }
  if (filters.length) {
    params.set("nflt", filters.join(";"));
  }

  const bookingUrl = `https://www.booking.com/searchresults.html?${params.toString()}`;
  return `https://www.awin1.com/cread.php?awinmid=${BOOKING_AWIN_ADVERTISER_ID}&awinaffid=${AWIN_PUBLISHER_ID}&ued=${encodeURIComponent(
    bookingUrl,
  )}`;
}

/** Awin-tracked Booking.com homepage link — for non-search CTAs. */
export function buildBookingHomeLink(label?: string): string {
  const params = new URLSearchParams({
    label: label ?? "reservationsnew-home",
  });
  if (DEFAULT_BOOKING_AID) params.set("aid", DEFAULT_BOOKING_AID);
  const bookingUrl = `https://www.booking.com/index.html?${params.toString()}`;
  return `https://www.awin1.com/cread.php?awinmid=${BOOKING_AWIN_ADVERTISER_ID}&awinaffid=${AWIN_PUBLISHER_ID}&ued=${encodeURIComponent(
    bookingUrl,
  )}`;
}

/**
 * Awin-tracked Booking.com car-rental link.
 * Booking.com's car search lives at /cars/index.html with destination query
 * params (Booking.com does the geocoding).
 */
export function buildBookingCarLink(destination?: string, label?: string): string {
  const params = new URLSearchParams({
    label: label ?? "reservationsnew-cars",
  });
  if (DEFAULT_BOOKING_AID) params.set("aid", DEFAULT_BOOKING_AID);
  if (destination) params.set("ss", destination);
  const carsUrl = `https://www.booking.com/cars/index.html?${params.toString()}`;
  return `https://www.awin1.com/cread.php?awinmid=${BOOKING_AWIN_ADVERTISER_ID}&awinaffid=${AWIN_PUBLISHER_ID}&ued=${encodeURIComponent(
    carsUrl,
  )}`;
}

/**
 * Awin-tracked Booking.com flights link.
 * Booking.com flights live at /flights/index.html — destination passed via the
 * `to` param when known.
 */
export function buildBookingFlightLink(destination?: string, label?: string): string {
  const params = new URLSearchParams({
    label: label ?? "reservationsnew-flights",
  });
  if (DEFAULT_BOOKING_AID) params.set("aid", DEFAULT_BOOKING_AID);
  if (destination) params.set("to", destination);
  const flightsUrl = `https://www.booking.com/flights/index.html?${params.toString()}`;
  return `https://www.awin1.com/cread.php?awinmid=${BOOKING_AWIN_ADVERTISER_ID}&awinaffid=${AWIN_PUBLISHER_ID}&ued=${encodeURIComponent(
    flightsUrl,
  )}`;
}
