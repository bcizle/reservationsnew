"use client";

interface TravelPayoutsFlightWidgetProps {
  origin?: string;
  destination?: string;
}

export default function TravelPayoutsFlightWidget({ origin, destination }: TravelPayoutsFlightWidgetProps) {
  const marker = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_TOKEN || "YOUR_TRAVELPAYOUTS_TOKEN";

  const params = new URLSearchParams({
    marker,
    ...(origin && { origin_iata: origin }),
    ...(destination && { destination_iata: destination }),
  });

  const searchUrl = `https://www.aviasales.com/?${params.toString()}`;

  function handleClick() {
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "affiliate_click", {
        event_category: "affiliate",
        event_label: "TravelPayouts-Flights",
        destination: destination || "general",
      });
    }
  }

  return (
    <div className="rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-white p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-white text-lg">✈</div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Flight Search</p>
          <p className="text-xs text-gray-500">Powered by Aviasales</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {destination
          ? `Compare flight prices to ${destination} from hundreds of airlines and travel agencies.`
          : "Find and compare cheap flights from hundreds of airlines and travel sites."}
      </p>
      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
      >
        {destination ? `Find Flights to ${destination}` : "Search Cheap Flights"}
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
