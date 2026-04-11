"use client";

interface TravelPayoutsCarWidgetProps {
  destination?: string;
}

export default function TravelPayoutsCarWidget({ destination }: TravelPayoutsCarWidgetProps) {
  const marker = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_TOKEN || "YOUR_TRAVELPAYOUTS_TOKEN";

  const searchUrl = `https://tp.media/r?marker=${marker}&p=7658&u=https%3A%2F%2Fwww.economybookings.com${destination ? `%2F${encodeURIComponent(destination)}` : ""}`;

  function handleClick() {
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "affiliate_click", {
        event_category: "affiliate",
        event_label: "TravelPayouts-Cars",
        destination: destination || "general",
      });
    }
  }

  return (
    <div className="rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-white p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white text-lg">🚗</div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Car Rentals</p>
          <p className="text-xs text-gray-500">Compare 900+ rental companies</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {destination
          ? `Find the best car rental deals in ${destination}. Compare prices from 900+ rental companies.`
          : "Compare car rental prices from 900+ companies worldwide. Free cancellation available."}
      </p>
      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-700"
      >
        {destination ? `Rent a Car in ${destination}` : "Search Car Rentals"}
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
