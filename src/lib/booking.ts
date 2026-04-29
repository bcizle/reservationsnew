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
  if (options.aid) params.set("aid", options.aid);
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
  const bookingUrl = `https://www.booking.com/index.html?${params.toString()}`;
  return `https://www.awin1.com/cread.php?awinmid=${BOOKING_AWIN_ADVERTISER_ID}&awinaffid=${AWIN_PUBLISHER_ID}&ued=${encodeURIComponent(
    bookingUrl,
  )}`;
}
