import { ImageResponse } from "next/og";
import { hotels, getHotel } from "@/lib/hotels";
import { getDestination } from "@/lib/destinations";

export const alt = "ReservationsNew hotel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return hotels.map((h) => ({ slug: h.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hotel = getHotel(slug);
  const name = hotel?.name ?? "Hotel";
  const dest = hotel ? getDestination(hotel.destinationSlug) : undefined;
  const location = dest ? `${dest.name}, ${dest.country}` : hotel?.neighborhood ?? "";
  const hero = hotel?.gallery[0]?.src ?? "";
  const price = hotel?.pricePerNight ?? "";
  const score = hotel?.reviewScore ?? 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#0f4c75",
          backgroundImage: hero ? `url(${hero})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 64,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,76,117,0.05) 0%, rgba(15,76,117,0.55) 55%, rgba(15,76,117,0.92) 100%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            color: "white",
          }}
        >
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#cfe3ff",
              marginBottom: 8,
              display: "flex",
            }}
          >
            {location}
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: 20,
              display: "flex",
            }}
          >
            {name}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            {score > 0 && (
              <div
                style={{
                  background: "#0f4c75",
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: 22,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ background: "#e8553d", padding: "4px 8px", borderRadius: 6 }}>
                  {score.toFixed(1)}
                </span>
                <span>{score >= 9 ? "Exceptional" : "Excellent"}</span>
              </div>
            )}
            {price && (
              <div
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: 10,
                  fontSize: 22,
                  fontWeight: 600,
                  display: "flex",
                }}
              >
                From {price} / night
              </div>
            )}
          </div>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#e8553d",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 20,
              }}
            >
              R
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "white",
                display: "flex",
              }}
            >
              ReservationsNew
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
