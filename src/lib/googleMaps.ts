// Shared loader for the Google Maps JavaScript API.
// Ensures the script is injected only once per page and that all consumers
// get the libraries they need (places for autocomplete, marker for maps).

export interface GooglePlace {
  name?: string;
  formatted_address?: string;
  place_id?: string;
}

export interface GoogleAutocomplete {
  addListener: (event: string, handler: () => void) => void;
  getPlace: () => GooglePlace;
}

// We intentionally don't pull in @types/google.maps — individual consumers
// type what they need. The namespace is exposed as `any` for flexibility while
// still giving a strong type to the loader itself.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MapsNamespace = any;

declare global {
  interface Window {
    google?: { maps?: MapsNamespace };
  }
}

const LIBRARIES = ["places", "marker"] as const;

let loadPromise: Promise<MapsNamespace | null> | null = null;

export function loadGoogleMaps(): Promise<MapsNamespace | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.google?.maps) return Promise.resolve(window.google.maps);
  if (loadPromise) return loadPromise;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  if (!apiKey) return Promise.resolve(null);

  loadPromise = new Promise((resolve) => {
    const onReady = () => resolve(window.google?.maps ?? null);
    const onError = () => resolve(null);

    const existing = document.querySelector<HTMLScriptElement>(
      "script[data-google-maps-loader]",
    );
    if (existing) {
      if (window.google?.maps) {
        resolve(window.google.maps);
        return;
      }
      existing.addEventListener("load", onReady, { once: true });
      existing.addEventListener("error", onError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey,
    )}&libraries=${LIBRARIES.join(",")}&loading=async&v=weekly`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMapsLoader = "true";
    script.addEventListener("load", onReady, { once: true });
    script.addEventListener("error", onError, { once: true });
    document.head.appendChild(script);
  });

  return loadPromise;
}
