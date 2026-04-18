"use client";

import { useEffect, useRef, useState } from "react";

interface HotelMarker {
  slug: string;
  name: string;
  neighborhood?: string;
  pricePerNight?: string;
  reviewScore?: number;
  coordinates: { lat: number; lng: number };
}

interface Props {
  center: { lat: number; lng: number };
  zoom?: number;
  hotels: HotelMarker[];
  heading?: string;
  description?: string;
  /** Absolute or relative base for hotel detail links. */
  hotelHrefBase?: string;
}

// We don't depend on @types/google.maps — declare the bits we touch ourselves.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MapsNamespace = any;

declare global {
  interface Window {
    google?: { maps?: MapsNamespace };
  }
}

// Keep a single loader promise so multiple mounted maps share it.
let mapsScriptPromise: Promise<MapsNamespace | null> | null = null;

function loadMapsScript(apiKey: string): Promise<MapsNamespace | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.google?.maps) return Promise.resolve(window.google.maps);
  if (mapsScriptPromise) return mapsScriptPromise;

  mapsScriptPromise = new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(
      "script[data-google-maps-loader]",
    );
    const onReady = () => resolve(window.google?.maps ?? null);
    if (existing) {
      existing.addEventListener("load", onReady, { once: true });
      existing.addEventListener("error", () => resolve(null), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey,
    )}&libraries=marker&loading=async&v=weekly`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMapsLoader = "true";
    script.addEventListener("load", onReady, { once: true });
    script.addEventListener("error", () => resolve(null), { once: true });
    document.head.appendChild(script);
  });

  return mapsScriptPromise;
}

export default function DestinationMap({
  center,
  zoom = 13,
  hotels,
  heading = "Map of hotels",
  description,
  hotelHrefBase = "/hotels",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  // If the API key is missing on the client, skip loading entirely.
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "unavailable">(
    apiKey ? "idle" : "unavailable",
  );
  // Initialise shouldLoad based on feature detection so we never need a
  // synchronous setState inside an effect — if IntersectionObserver is
  // unsupported, load immediately; otherwise wait for the observer callback.
  const [shouldLoad, setShouldLoad] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return typeof IntersectionObserver === "undefined";
  });

  // Lazy-load: only fetch the JS when the map enters the viewport.
  useEffect(() => {
    if (shouldLoad) return;
    if (!containerRef.current || typeof IntersectionObserver === "undefined") return;
    const el = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || !apiKey) return;
    let cancelled = false;

    loadMapsScript(apiKey).then((maps) => {
      if (cancelled) return;
      if (!maps || !mapRef.current) {
        setStatus("unavailable");
        return;
      }

      const map = new maps.Map(mapRef.current, {
        center,
        zoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        gestureHandling: "cooperative",
        styles: [
          {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      const bounds = new maps.LatLngBounds();
      const infoWindow = new maps.InfoWindow();

      for (const hotel of hotels) {
        const marker = new maps.Marker({
          position: hotel.coordinates,
          map,
          title: hotel.name,
          label: {
            text: hotel.pricePerNight ?? "•",
            color: "#ffffff",
            fontSize: "11px",
            fontWeight: "600",
          },
          icon: {
            path: maps.SymbolPath.CIRCLE,
            scale: 14,
            fillColor: "#e8553d",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });
        bounds.extend(hotel.coordinates);

        const href = `${hotelHrefBase}/${hotel.slug}`;
        const scoreBadge = hotel.reviewScore
          ? `<span style="display:inline-block;margin-right:6px;padding:1px 6px;background:#0f4c75;color:#fff;border-radius:4px;font-size:11px;font-weight:700;">${hotel.reviewScore.toFixed(
              1,
            )}</span>`
          : "";
        const priceLine = hotel.pricePerNight
          ? `<div style="margin-top:4px;color:#e8553d;font-weight:700;">${hotel.pricePerNight} / night</div>`
          : "";
        const html = `
          <div style="font-family:inherit;max-width:220px;">
            <div style="font-size:14px;font-weight:700;color:#0f172a;">${scoreBadge}${hotel.name}</div>
            ${hotel.neighborhood ? `<div style="margin-top:2px;font-size:12px;color:#64748b;">${hotel.neighborhood}</div>` : ""}
            ${priceLine}
            <a href="${href}" style="display:inline-block;margin-top:8px;font-size:12px;font-weight:600;color:#0f4c75;">View details &rarr;</a>
          </div>
        `;

        marker.addListener("click", () => {
          infoWindow.setContent(html);
          infoWindow.open({ anchor: marker, map });
        });
      }

      // If we have multiple hotels, fit the map to them. Otherwise keep the
      // passed-in center/zoom so single-hotel cases don't zoom to the rooftop.
      if (hotels.length > 1) {
        map.fitBounds(bounds, 60);
      }

      setStatus("ready");
    });

    return () => {
      cancelled = true;
    };
  }, [shouldLoad, apiKey, center, zoom, hotels, hotelHrefBase]);

  return (
    <section ref={containerRef} className="mt-10">
      <div>
        <h2 className="text-xl font-bold text-foreground">{heading}</h2>
        {description && <p className="mt-1 text-sm text-text-muted">{description}</p>}
      </div>
      <div className="relative mt-4 h-[420px] overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 shadow-sm">
        <div ref={mapRef} className="absolute inset-0" />
        {status !== "ready" && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-text-muted">
            {status === "unavailable" ? "Map unavailable" : "Loading map…"}
          </div>
        )}
      </div>
    </section>
  );
}
