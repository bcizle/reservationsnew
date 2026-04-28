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
  if (window.google?.maps?.places) return Promise.resolve(window.google.maps);
  if (loadPromise) return loadPromise;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  if (!apiKey) return Promise.resolve(null);

  loadPromise = new Promise((resolve) => {
    const onError = () => resolve(null);

    const existing = document.querySelector<HTMLScriptElement>(
      "script[data-google-maps-loader]",
    );
    if (existing) {
      // Script already injected — use importLibrary to wait for Places
      if (window.google?.maps?.importLibrary) {
        window.google.maps
          .importLibrary("places")
          .then(() => resolve(window.google?.maps ?? null))
          .catch(onError);
      } else if (window.google?.maps?.places) {
        resolve(window.google.maps);
      } else {
        // Fallback: poll until places is available (max 5s)
        let attempts = 0;
        const poll = setInterval(() => {
          attempts++;
          if (window.google?.maps?.places) {
            clearInterval(poll);
            resolve(window.google.maps);
          } else if (attempts > 50) {
            clearInterval(poll);
            resolve(null);
          }
        }, 100);
      }
      return;
    }

    // Inject the script WITHOUT loading=async so libraries load synchronously
    // with the script. This avoids the race condition where google.maps exists
    // but google.maps.places is undefined.
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey,
    )}&libraries=${LIBRARIES.join(",")}&v=weekly&callback=__gmapsReady`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMapsLoader = "true";

    // Use a global callback so Google tells us when everything (including
    // libraries) is fully initialized.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__gmapsReady = () => {
      resolve(window.google?.maps ?? null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).__gmapsReady;
    };

    script.addEventListener("error", onError, { once: true });
    document.head.appendChild(script);
  });

  return loadPromise;
}
