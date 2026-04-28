"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { loadGoogleMaps, type GoogleAutocomplete } from "@/lib/googleMaps";
import { destinations } from "@/lib/destinations";

// Build a lookup from display names (and common aliases) to destination slugs
// so that selecting "Paris, France" in the autocomplete routes to our
// /destinations/paris page instead of the generic /search?q= fallback.
const DESTINATION_ALIASES: Record<string, string> = {
  "new york": "new-york-city",
  "nyc": "new-york-city",
  "manhattan": "new-york-city",
  "cancún": "cancun",
};

const DESTINATION_LOOKUP: Record<string, string> = (() => {
  const out: Record<string, string> = { ...DESTINATION_ALIASES };
  for (const d of destinations) {
    out[d.name.toLowerCase()] = d.slug;
    out[d.slug.replace(/-/g, " ")] = d.slug;
  }
  return out;
})();

function resolveDestinationSlug(name: string): string | null {
  const key = name.trim().toLowerCase();
  if (DESTINATION_LOOKUP[key]) return DESTINATION_LOOKUP[key];
  // "Paris, France" -> "paris"
  const first = key.split(",")[0].trim();
  return DESTINATION_LOOKUP[first] ?? null;
}

export default function SearchWidget() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<GoogleAutocomplete | null>(null);
  const checkInRef = useRef("");
  const checkOutRef = useRef("");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [placesLoaded, setPlacesLoaded] = useState(false);

  useEffect(() => {
    checkInRef.current = checkIn;
  }, [checkIn]);
  useEffect(() => {
    checkOutRef.current = checkOut;
  }, [checkOut]);

  function navigateFor(name: string) {
    const slug = resolveDestinationSlug(name);
    const params = new URLSearchParams();
    if (checkInRef.current) params.set("checkin", checkInRef.current);
    if (checkOutRef.current) params.set("checkout", checkOutRef.current);
    if (slug) {
      const qs = params.toString();
      router.push(`/destinations/${slug}${qs ? `?${qs}` : ""}`);
      return;
    }
    params.set("q", name);
    router.push(`/search?${params.toString()}`);
  }

  // Lazy-load the Maps/Places script the first time the user focuses the
  // input. Keeps the homepage lean for visitors who don't interact with
  // search.
  function ensurePlacesLoaded() {
    if (placesLoaded || autocompleteRef.current) return;
    setPlacesLoaded(true);
    loadGoogleMaps()
      .then((maps) => {
        if (!maps || !inputRef.current || autocompleteRef.current) return;
        const autocomplete = new maps.places.Autocomplete(inputRef.current, {
          types: ["(cities)"],
          fields: ["name", "formatted_address", "place_id"],
        }) as GoogleAutocomplete;
        autocompleteRef.current = autocomplete;
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          const name =
            place?.name ||
            place?.formatted_address ||
            inputRef.current?.value ||
            "";
          const trimmed = name.trim();
          if (!trimmed) return;
          setDestination(trimmed);
          if (inputRef.current) inputRef.current.value = trimmed;
          // Don't auto-navigate — let the user fill in dates first.
          // Navigation happens when they click the Search button.
        });
      })
      .catch((err) => {
        console.warn("Google Places autocomplete unavailable:", err);
      });
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!destination) {
      router.push("/search");
      return;
    }
    navigateFor(destination);
  }

  return (
    <form onSubmit={handleSearch} id="search" className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-3 shadow-2xl sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 block text-left text-xs font-medium text-gray-500">
            Where to?
          </label>
          <input
            ref={inputRef}
            type="text"
            placeholder="City, hotel, or destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onFocus={ensurePlacesLoaded}
            autoComplete="off"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/20"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-left text-xs font-medium text-gray-500">
            Check-in
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/20"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-left text-xs font-medium text-gray-500">
            Check-out
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/20"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-lg bg-accent px-8 py-3 text-sm font-bold text-white transition hover:bg-accent-hover sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
