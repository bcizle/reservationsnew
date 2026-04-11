import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { WebSiteJsonLd } from "@/components/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ReservationsNew — Find & Book the Best Hotel Deals",
    template: "%s | ReservationsNew",
  },
  description:
    "Compare hotel prices across top booking platforms. Find exclusive deals on hotels, resorts, and vacation rentals worldwide. Book your perfect stay today.",
  keywords:
    "hotel deals, cheap hotels, hotel booking, travel deals, vacation rentals, resort deals, hotel comparison, flight deals, car rentals",
  openGraph: {
    title: "ReservationsNew — Find & Book the Best Hotel Deals",
    description:
      "Compare hotel prices across top booking platforms. Find exclusive deals worldwide.",
    url: siteUrl,
    siteName: "ReservationsNew",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReservationsNew — Find & Book the Best Hotel Deals",
    description: "Compare hotel prices across top booking platforms.",
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
        <GoogleAnalytics />
        <WebSiteJsonLd
          name="ReservationsNew"
          url={siteUrl}
          description="Compare hotel prices across top booking platforms. Find exclusive deals on hotels, resorts, and vacation rentals worldwide."
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
