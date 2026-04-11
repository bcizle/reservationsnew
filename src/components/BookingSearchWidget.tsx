"use client";

interface BookingSearchWidgetProps {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
}

export default function BookingSearchWidget({ destination, checkIn, checkOut }: BookingSearchWidgetProps) {
  const aid = process.env.NEXT_PUBLIC_BOOKING_AID || "YOUR_BOOKING_AID";

  // Build Booking.com deep link
  const params = new URLSearchParams({
    aid,
    label: "reservationsnew-search",
    lang: "en-us",
    ...(destination && { ss: destination }),
    ...(checkIn && { checkin: checkIn }),
    ...(checkOut && { checkout: checkOut }),
  });

  const bookingUrl = `https://www.booking.com/searchresults.html?${params.toString()}`;

  function handleClick() {
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "affiliate_click", {
        event_category: "affiliate",
        event_label: "Booking.com",
        destination: destination || "general",
      });
    }
  }

  return (
    <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">B</div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Booking.com</p>
          <p className="text-xs text-gray-500">Search real-time hotel prices</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {destination
          ? `Find the best hotel deals in ${destination}. Compare prices, read reviews, and book with free cancellation on most rooms.`
          : "Search over 28 million accommodation listings. Free cancellation on most rooms."}
      </p>
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
      >
        {destination ? `Search Hotels in ${destination}` : "Search Hotels on Booking.com"}
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
      <p className="mt-3 text-xs text-gray-400">
        Affiliate link — we may earn a commission at no extra cost to you.
      </p>
    </div>
  );
}
