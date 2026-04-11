"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchWidget() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("q", destination);
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} id="search" className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-3 shadow-2xl sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 block text-left text-xs font-medium text-gray-500">
            Where to?
          </label>
          <input
            type="text"
            placeholder="City, hotel, or destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
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
