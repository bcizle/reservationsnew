"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import OptimizedImage from "./OptimizedImage";

export interface GalleryPhoto {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  credit?: string;
}

interface Props {
  photos: GalleryPhoto[];
  heading?: string;
  description?: string;
  /** Preview count in the grid. Anything past this is still in the lightbox. Default 6. */
  previewCount?: number;
}

export default function PhotoGallery({ photos, heading, description, previewCount = 6 }: Props) {
  const [index, setIndex] = useState(-1);

  if (!photos || photos.length === 0) return null;

  const previewPhotos = photos.slice(0, previewCount);
  const hiddenCount = Math.max(0, photos.length - previewCount);

  return (
    <section className="mt-10">
      {heading && <h2 className="text-xl font-bold text-foreground">{heading}</h2>}
      {description && <p className="mt-1 text-sm text-text-muted">{description}</p>}

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        {previewPhotos.map((photo, i) => {
          const isLastPreview = i === previewPhotos.length - 1 && hiddenCount > 0;
          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={
                isLastPreview
                  ? `View all ${photos.length} photos`
                  : `Open photo: ${photo.alt}`
              }
              className={[
                "group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100",
                "transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                i === 0 ? "sm:col-span-2 sm:row-span-2 sm:aspect-[2/1]" : "",
              ].join(" ")}
            >
              <OptimizedImage
                variant={i === 0 ? "hero" : "card"}
                src={photo.thumb}
                alt={photo.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
              {isLastPreview && (
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/55 text-white">
                  <span className="text-lg font-bold">+{hiddenCount}</span>
                  <span className="text-xs font-medium uppercase tracking-wider">
                    View all {photos.length} photos
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-3 flex justify-center sm:hidden">
          <button
            type="button"
            onClick={() => setIndex(0)}
            className="rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/10"
          >
            View all {photos.length} photos
          </button>
        </div>
      )}

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos.map((p) => ({
          src: p.src,
          alt: p.alt,
          description: p.credit,
        }))}
        controller={{ closeOnBackdropClick: true }}
      />
    </section>
  );
}
