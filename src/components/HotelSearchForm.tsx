"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

interface HotelSearchFormProps {
  initialDestination?: string;
  initialCheckin?: string;
  initialCheckout?: string;
  initialGuests?: number;
  initialRooms?: number;
}

export default function HotelSearchForm({
  initialDestination = "",
  initialCheckin = "",
  initialCheckout = "",
  initialGuests = 2,
  initialRooms = 1,
}: HotelSearchFormProps) {
  const router = useRouter();
  const [destination, setDestination] = useState(initialDestination);
  const [checkin, setCheckin] = useState(initialCheckin);
  const [checkout, setCheckout] = useState(initialCheckout);
  const [guests, setGuests] = useState(initialGuests);
  const [rooms, setRooms] = useState(initialRooms);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = destination.trim();
    if (!trimmed) return;

    const params = new URLSearchParams();
    params.set("dest", trimmed);
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    params.set("guests", String(guests));
    params.set("rooms", String(rooms));

    router.push(`/search/results?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-4 shadow-xl sm:p-6"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
        <div className="lg:col-span-2">
          <label
            htmlFor="dest"
            className="mb-1 block text-xs font-medium text-gray-500"
          >
            Where to?
          </label>
          <input
            id="dest"
            name="dest"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="City, hotel, or area"
            autoComplete="off"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/20"
          />
        </div>

        <div>
          <label
            htmlFor="checkin"
            className="mb-1 block text-xs font-medium text-gray-500"
          >
            Check-in
          </label>
          <input
            id="checkin"
            name="checkin"
            type="date"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/20"
          />
        </div>

        <div>
          <label
            htmlFor="checkout"
            className="mb-1 block text-xs font-medium text-gray-500"
          >
            Check-out
          </label>
          <input
            id="checkout"
            name="checkout"
            type="date"
            value={checkout}
            min={checkin || undefined}
            onChange={(e) => setCheckout(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:col-span-2 lg:col-span-1 lg:grid-cols-1 lg:gap-2">
          <div>
            <label
              htmlFor="guests"
              className="mb-1 block text-xs font-medium text-gray-500"
            >
              Guests
            </label>
            <select
              id="guests"
              name="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-800 outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/20"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="rooms"
              className="mb-1 block text-xs font-medium text-gray-500"
            >
              Rooms
            </label>
            <select
              id="rooms"
              name="rooms"
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-800 outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/20"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "room" : "rooms"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-accent-hover sm:text-base"
      >
        Search hotels
      </button>
    </form>
  );
}
