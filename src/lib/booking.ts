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
}

/**
 * Build an Awin-tracked Booking.com search deep link.
 *
 * @param destination  Destination text shown in Booking.com's search box (city, hotel, etc.)
 * @param checkin      ISO date string (YYYY-MM-DD)
 * @param checkout     ISO date string (YYYY-MM-DD)
 * @param options      Optional label / aid for finer tracking attribution
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
