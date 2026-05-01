"use client";

import { buildBookingFlightLink } from "@/lib/booking";

interface BookingFlightWidgetProps {
  /** Optional destination — IATA code or city name. */
  destination?: string;
}

export default function BookingFlightWidget({ destination }: BookingFlightWidgetProps) {
  const searchUrl = buildBookingFlightLink(destination, "reservationsnew-flight-widget");

  function handleClick() {
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "affiliate_click", {
        event_category: "affiliate",
        event_label: "Booking.com-Flights",
        destination: destination || "general",
      });
    }
  }

  return (
    <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#003580] text-white text-lg">✈️</div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Flights on Booking.com</p>
          <p className="text-xs text-gray-500">Search and compare airline fares</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {destination
          ? `Compare flight prices to ${destination} from hundreds of airlines on Booking.com. Filter by stops, airline, and travel time.`
          : "Find and compare flights from hundreds of airlines worldwide. Filter by stops, airline, and travel time."}
      </p>
      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-lg bg-[#003580] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#002255]"
      >
        {destination ? `Find Flights to ${destination}` : "Search Flights on Booking.com"}
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
      <p className="mt-3 text-xs text-gray-400">
        As a Booking.com Affiliate, we earn from qualifying transactions — at no extra cost to you.
      </p>
    </div>
  );
}
