import { AMENITY_LABELS, type AmenityKey } from "@/lib/hotels";

const ICONS: Record<AmenityKey, string> = {
  wifi: "M5 12a11 11 0 0114 0M8.5 15.5a6 6 0 017 0M12 19h.01",
  pool: "M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0M4 15h16M8 11V5a4 4 0 118 0v6",
  gym: "M6 6l12 12M4 8l2-2m12 12l2-2M8 4l-2 2m12 12l-2 2",
  spa: "M12 3c2 4 6 6 6 10a6 6 0 11-12 0c0-4 4-6 6-10z",
  breakfast: "M4 11h16v2a6 6 0 01-6 6H10a6 6 0 01-6-6v-2zM8 8V5m4 3V4m4 4V5",
  parking: "M6 4h7a5 5 0 010 10H9v6H6V4zm3 3v4h4a2 2 0 100-4H9z",
  "pet-friendly": "M12 14c-3 0-6 2-6 5h12c0-3-3-5-6-5zM7 9a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z",
  bar: "M6 4h12l-6 8v6h3m-6 0h3m-3 0v-6",
  restaurant: "M5 3v18M5 8h4M9 3v5a3 3 0 01-3 3M16 3c-1 0-3 2-3 5s2 3 3 3v10",
  beach: "M3 20h18M12 20V9m0 0l-6 4m6-4l6 4M12 9a4 4 0 100-8 4 4 0 000 8z",
  "airport-shuttle": "M3 16h18M5 16V8a2 2 0 012-2h10a2 2 0 012 2v8m-12 0v2m8-2v2M8 12h8",
  concierge: "M12 12a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0H5z",
  "air-conditioning": "M12 3v18M4 8l16 8M4 16l16-8",
  "family-rooms": "M7 10a3 3 0 100-6 3 3 0 000 6zm10 0a3 3 0 100-6 3 3 0 000 6zM3 20c0-3 2-6 4-6s4 3 4 6m3 0c0-3 2-6 4-6s4 3 4 6",
  workspace: "M4 6h16v10H4zM2 20h20M9 16v4m6-4v4",
  kitchen: "M6 3h12v18H6zM6 9h12M9 6h.01M9 13h.01M9 17h.01",
  laundry: "M5 3h14v18H5zM9 7h.01M15 7h.01M12 17a4 4 0 100-8 4 4 0 000 8z",
};

export default function AmenityIcon({ amenity }: { amenity: AmenityKey }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-white px-3 py-2">
      <svg
        className="h-5 w-5 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={ICONS[amenity]} />
      </svg>
      <span className="text-xs font-medium text-gray-700">{AMENITY_LABELS[amenity]}</span>
    </div>
  );
}
