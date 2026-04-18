import { ImageResponse } from "next/og";
import { getDestination, destinations } from "@/lib/destinations";

export const alt = "ReservationsNew destination";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = getDestination(slug);
  const name = dest?.name ?? "Destination";
  const country = dest?.country ?? "";
  const hero = dest?.heroImage ?? "";

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
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#cfe3ff",
              marginBottom: 8,
              display: "flex",
            }}
          >
            Hotels in {country || "the World"}
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1,
              marginBottom: 16,
              display: "flex",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#cfe3ff",
              display: "flex",
            }}
          >
            Compare deals across Booking.com, Expedia & Hotels.com
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
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "#e8553d",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 22,
              }}
            >
              R
            </div>
            <div
              style={{
                fontSize: 24,
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
