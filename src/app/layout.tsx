import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReservationsNew — Find & Book the Best Hotel Deals",
  description:
    "Compare hotel prices across top booking platforms. Find exclusive deals on hotels, resorts, and vacation rentals worldwide. Book your perfect stay today.",
  keywords:
    "hotel deals, cheap hotels, hotel booking, travel deals, vacation rentals, resort deals, hotel comparison",
  openGraph: {
    title: "ReservationsNew — Find & Book the Best Hotel Deals",
    description:
      "Compare hotel prices across top booking platforms. Find exclusive deals worldwide.",
    url: "https://reservationsnew.com",
    siteName: "ReservationsNew",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
