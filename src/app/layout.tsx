import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleTagManager from "@/components/GoogleTagManager";
import { WebSiteJsonLd } from "@/components/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ReservationsNew - Travel Planning and Partner Search",
    template: "%s | ReservationsNew",
  },
  description:
    "Research destinations and start hotel, flight, and car rental searches through partner booking platforms. Confirm current prices, availability, and checkout terms with the provider.",
  keywords:
    "hotel deals, cheap hotels, hotel booking, travel deals, vacation rentals, resort deals, hotel comparison, flight deals, car rentals",
  openGraph: {
    title: "ReservationsNew - Travel Planning and Partner Search",
    description:
      "Research destinations and continue to partner booking platforms for current prices, availability, and checkout.",
    url: siteUrl,
    siteName: "ReservationsNew",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReservationsNew - Travel Planning and Partner Search",
    description: "Research destinations and start searches through partner booking platforms.",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager />
        <WebSiteJsonLd
          name="ReservationsNew"
          url={siteUrl}
          description="Research destinations and start hotel, flight, and car rental searches through partner booking platforms."
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N8HJKJ3S"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
